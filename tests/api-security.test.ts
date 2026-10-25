import assert from 'node:assert/strict';
import { afterEach, beforeEach, mock, test } from 'node:test';
import { NextRequest } from 'next/server';
import { POST as chat } from '../src/app/api/chat/route';
import { POST as search } from '../src/app/api/search/route';
import { GET as commentary } from '../src/app/api/commentary/route';
import { POST as subscribe } from '../src/app/api/subscribe/route';
import { GET as health } from '../src/app/api/health/route';
import { getQdrantClient } from '../src/lib/qdrant';
import { getClientIp } from '../src/lib/rate-limit';
import { readJsonObject } from '../src/lib/request-guards';

let serial = 0;
beforeEach(() => {
  process.env.VERCEL = '1';
  process.env.OPENAI_API_KEY = 'test-only';
  process.env.QDRANT_URL = 'https://qdrant.example.test';
  process.env.QDRANT_API_KEY = 'test-only';
  process.env.BUTTONDOWN_API_KEY = 'test-only';
  mock.method(globalThis, 'fetch', async () => { throw new Error('Unexpected external request'); });
});
afterEach(() => mock.restoreAll());

function request(path: string, body?: unknown, headers: Record<string, string> = {}) {
  return new NextRequest(`https://www.biblelens.faith/api/${path}`, {
    ...(body === undefined ? {} : { method: 'POST', body: JSON.stringify(body) }),
    headers: { 'content-type': 'application/json', 'x-vercel-forwarded-for': `198.51.100.${++serial}`, ...headers },
  });
}

test('malformed and oversized paid API inputs fail before contacting providers', async () => {
  const fetchMock = mock.method(globalThis, 'fetch', async () => { throw new Error('No external request allowed'); });
  for (const body of [null, [], { messages: [null] }, { messages: [['user']] }, { question: ' ' },
    { question: 'a'.repeat(4001) }, { messages: Array.from({ length: 51 }, () => ({ role: 'user', content: 'hello' })) }]) {
    assert.equal((await chat(request('chat', body))).status, 400);
  }
  for (const body of [null, [], { query: ' ' }, { query: 'a'.repeat(4001) }, { query: 'Jesus', limit: -1 },
    { query: 'Jesus', limit: '5' }, { query: 'Jesus', limit: 1.5 }, { query: 'Jesus', limit: 11 }, { query: 'Jesus', source: {} }]) {
    assert.equal((await search(request('search', body))).status, 400);
  }
  for (const query of ['book=NotABook&chapter=1', 'book=Genesis&chapter=51', 'book=Genesis&chapter=1evil',
    'book=Matthew&chapter=1&verse=999', 'book=Matthew&chapter=-1']) {
    assert.equal((await commentary(request(`commentary?${query}`))).status, 400);
  }
  assert.equal(fetchMock.mock.callCount(), 0);
});

test('JSON body bounds work without Content-Length and stop reading oversized streams', async () => {
  let cancelled = false;
  const stream = new ReadableStream({
    pull(controller) { controller.enqueue(new Uint8Array(9000)); },
    cancel() { cancelled = true; },
  });
  const req = new Request('https://www.biblelens.faith/api/subscribe', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: stream, duplex: 'half',
  } as RequestInit);
  assert.equal((await readJsonObject(req, 8192)).response?.status, 413);
  assert.equal(cancelled, true);
  const malformed = new NextRequest('https://www.biblelens.faith/api/search', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: '{',
  });
  assert.equal((await search(malformed)).status, 400);
  assert.equal((await search(request('search', { query: 'Jesus' }, { 'content-type': 'text/plain' }))).status, 415);
});

test('cross-site requests are blocked and arbitrary forwarding headers cannot evade local limits', async () => {
  for (const handler of [chat, search, subscribe]) {
    assert.equal((await handler(request('endpoint', {}, { origin: 'https://other.example' }))).status, 403);
  }
  assert.equal((await commentary(request('commentary?book=genesis&chapter=1', undefined, { 'sec-fetch-site': 'cross-site' }))).status, 403);
  delete process.env.VERCEL;
  assert.equal(getClientIp(request('chat', {}, { 'x-forwarded-for': '203.0.113.1' })), 'unknown');
});

test('signup burst limit stops excess submissions before the email provider', async () => {
  const fetchMock = mock.method(globalThis, 'fetch', async () => Response.json({}, { status: 201 }));
  for (let i = 0; i < 6; i++) {
    const res = await subscribe(request('subscribe', { email: 'reader@example.test' }, { 'x-vercel-forwarded-for': '203.0.113.77' }));
    assert.equal(res.status, i < 5 ? 200 : 429);
    if (i === 5) assert.ok(Number(res.headers.get('retry-after')) > 0);
  }
  assert.equal(fetchMock.mock.callCount(), 5);
});

test('search and commentary preserve valid results while hiding local source paths', async () => {
  mock.method(globalThis, 'fetch', async () => Response.json({ data: [{ embedding: [0.1, 0.2] }] }));
  const client = getQdrantClient();
  mock.method(client, 'search', async () => [
    { id: 1, score: 0.9, payload: { title: 'matthew-5-7-commentary', text: 'Test commentary', url: 'file:///private/local.md' } },
    { id: 2, score: 0.8, payload: { title: 'A reference', url: 'https://example.com/reference' } },
  ]);
  const result = await search(request('search', { query: 'Matthew 5', limit: 5 }));
  assert.equal(result.status, 200);
  assert.deepEqual((await result.json()).results.map((r: { url: string | null }) => r.url), [null, 'https://example.com/reference']);
  const response = await commentary(request('commentary?book=Matthew&chapter=5'));
  assert.equal(response.status, 200);
  const content = await response.json();
  assert.equal(content.commentary.length, 1);
  assert.equal(content.commentary[0].text, 'Test commentary');
});

test('provider failures return safe errors and health probes share a cached readiness result', async () => {
  mock.method(globalThis, 'fetch', async () => Response.json({ data: [{ embedding: [0.1] }] }));
  const client = getQdrantClient();
  mock.method(client, 'search', async () => { throw new Error('private backend URL and key'); });
  for (const res of [await search(request('search', { query: 'Jesus' })), await commentary(request('commentary?book=genesis&chapter=1'))]) {
    assert.equal(res.status, 503);
    assert.doesNotMatch(await res.text(), /private backend/);
  }
  const probe = mock.method(client, 'getCollection', async () => { throw new Error('private database details'); });
  const responses = await Promise.all([health(), health(), health()]);
  for (const res of responses) {
    assert.equal(res.status, 503);
    assert.deepEqual(await res.json(), { status: 'error' });
  }
  assert.equal(probe.mock.callCount(), 1);
  mock.method(Date, 'now', () => new Date('2099-01-01').getTime());
  mock.method(client, 'getCollection', async () => ({ points_count: 12345 }));
  const recovered = await health();
  assert.equal(recovered.status, 200);
  assert.deepEqual(await recovered.json(), { status: 'ok' });
});
