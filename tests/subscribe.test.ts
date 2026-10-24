import assert from "node:assert/strict";
import { afterEach, beforeEach, mock, test } from "node:test";
import { NextRequest } from "next/server";
import { POST } from "../src/app/api/subscribe/route";

const originalKey = process.env.BUTTONDOWN_API_KEY;
const originalVercel = process.env.VERCEL;
const email = "reader@example.test";

beforeEach(() => {
  process.env.BUTTONDOWN_API_KEY = "test-only-credential";
  process.env.VERCEL = "1";
  mock.method(globalThis, "fetch", async () => {
    throw new Error("Unexpected provider request in test");
  });
});

afterEach(() => {
  mock.restoreAll();
  if (originalKey === undefined) delete process.env.BUTTONDOWN_API_KEY;
  else process.env.BUTTONDOWN_API_KEY = originalKey;
  if (originalVercel === undefined) delete process.env.VERCEL;
  else process.env.VERCEL = originalVercel;
});

function request(body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest("https://www.biblelens.faith/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

test("new signups preserve double opt-in and send only the validated Vercel IP", async () => {
  const calls: RequestInit[] = [];
  mock.method(globalThis, "fetch", async (url: unknown, init: RequestInit) => {
    assert.equal(url, "https://api.buttondown.com/v1/subscribers");
    calls.push(init);
    return Response.json({ id: "sub_test", type: "unactivated" }, { status: 201 });
  });
  for (const ip of ["192.0.2.10", "2001:db8::10"]) {
    const response = await POST(request({ email: " READER@example.test ", website: "" }, {
      "x-vercel-forwarded-for": ip,
      "x-forwarded-for": "198.51.100.20",
      "cookie": "private-cookie=test",
      "authorization": "Bearer untrusted",
    }));
    assert.equal(response.status, 200);
    assert.match((await response.json()).message, /inbox to confirm/);
    const sent = calls.at(-1)!;
    assert.deepEqual(JSON.parse(String(sent.body)), { email_address: email, ip_address: ip });
    assert.deepEqual(sent.headers, {
      Authorization: "Token test-only-credential",
      "Content-Type": "application/json",
    });
    assert.equal(sent.redirect, "error");
  }
  assert.equal(calls.length, 2);
});

test("untrusted or malformed IP headers are not sent to Buttondown", async () => {
  const bodies: unknown[] = [];
  mock.method(globalThis, "fetch", async (_url: unknown, init: RequestInit) => {
    bodies.push(JSON.parse(String(init.body)));
    return Response.json({ type: "unactivated" }, { status: 201 });
  });
  await POST(request({ email }, { "x-forwarded-for": "192.0.2.10" }));
  await POST(request({ email }, { "x-vercel-forwarded-for": "192.0.2.10, 198.51.100.20" }));
  await POST(request({ email }, { "x-vercel-forwarded-for": "not-an-ip" }));
  delete process.env.VERCEL;
  await POST(request({ email }, { "x-vercel-forwarded-for": "192.0.2.10" }));
  assert.deepEqual(bodies, Array.from({ length: 4 }, () => ({ email_address: email })));
});

test("the observed firewall rejection remains an error and does not leak provider details", async () => {
  mock.method(globalThis, "fetch", async () => Response.json({
    code: "subscriber_blocked",
    detail: "This subscriber was blocked by your firewall.",
    metadata: { email_address: email, internal: "private-data" },
  }, { status: 400 }));
  const response = await POST(request({ email }));
  assert.equal(response.status, 403);
  const body = await response.json();
  assert.equal(typeof body.error, "string");
  assert.equal(body.message, undefined);
  assert.doesNotMatch(JSON.stringify(body), /private-data|reader@example|firewall/);
});

test("unknown HTTP 400 rejections are never reported as successful duplicate signups", async () => {
  mock.method(globalThis, "fetch", async () => Response.json({ code: "unknown_rejection" }, { status: 400 }));
  const response = await POST(request({ email }));
  assert.equal(response.status, 502);
  assert.equal((await response.json()).message, undefined);
});

test("provider email validation and rate limits produce actionable errors", async () => {
  for (const [status, code, expected, message] of [
    [400, "email_invalid", 400, /valid email/],
    [429, "rate_limited", 429, /try again later/],
  ] as const) {
    mock.method(globalThis, "fetch", async () => Response.json({ code }, { status }));
    const response = await POST(request({ email }));
    assert.equal(response.status, expected);
    assert.match((await response.json()).error, message);
  }
});

test("non-JSON provider failures and network errors return safe JSON errors", async () => {
  mock.method(globalThis, "fetch", async () => new Response("<html>Failure</html>", { status: 503 }));
  let response = await POST(request({ email }));
  assert.equal(response.status, 502);
  assert.equal(typeof (await response.json()).error, "string");
  mock.method(globalThis, "fetch", async () => { throw new Error("private transport detail"); });
  response = await POST(request({ email }));
  assert.equal(response.status, 502);
  assert.doesNotMatch(await response.text(), /private transport detail/);
});

test("malformed requests, invalid addresses and missing credentials never contact Buttondown", async () => {
  const fetchMock = mock.method(globalThis, "fetch", async () => { throw new Error("No fetch expected"); });
  const malformed = new NextRequest("https://www.biblelens.faith/api/subscribe", {
    method: "POST", body: "{",
  });
  assert.equal((await POST(malformed)).status, 400);
  for (const body of [null, [], {}, { email: "@" }, { email: "bad value@example.test" }, { email: 42 }]) {
    assert.equal((await POST(request(body))).status, 400);
  }
  delete process.env.BUTTONDOWN_API_KEY;
  assert.equal((await POST(request({ email }))).status, 503);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("honeypot submissions stay silent and never reach the email provider", async () => {
  const fetchMock = mock.method(globalThis, "fetch", async () => { throw new Error("No fetch expected"); });
  const response = await POST(request({ email, website: "https://spam.example" }));
  assert.equal(response.status, 200);
  assert.equal(fetchMock.mock.callCount(), 0);
});
