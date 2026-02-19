// src/app/api/chat/route.ts
// Streaming Claude chat endpoint with RAG context injection and voice constraints
// Node.js runtime (NOT Edge) — fluid compute gives 300s on Hobby; we cap at 30s to be safe

import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getQdrantClient, COLLECTION_NAME } from '@/lib/qdrant';
import { embedQuery } from '@/lib/embeddings';
import { buildSystemPrompt } from '@/lib/system-prompt';
import { checkChatRateLimit, getClientIp } from '@/lib/rate-limit';

export const maxDuration = 30;

// Module-scope singleton — persists across warm invocations, not recreated per request
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: NextRequest) {
  // Step 1: Rate limit check
  const ip = getClientIp(request);
  const { allowed, remaining, resetAt } = checkChatRateLimit(ip);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many questions at once — try again in a minute.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  // Step 2: Parse and validate request body
  const body = await request.json();
  const { question } = body;

  if (!question || typeof question !== 'string') {
    return new Response(
      JSON.stringify({ error: "That question didn't quite register — could you rephrase it?" }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Step 3: RAG retrieval — embed question, search Qdrant for context
  const embedding = await embedQuery(question);
  const qdrant = getQdrantClient();
  const ragResults = await qdrant.search(COLLECTION_NAME, {
    vector: embedding,
    limit: 5,
    with_payload: true,
    score_threshold: 0.35, // Slightly higher than search (0.3) — prefer quality in RAG context
  });

  // Step 4: Format RAG context and prepare end-of-response sources
  const sources = ragResults.map((r, i) => ({
    index: i + 1,
    title: r.payload?.title as string,
    url: r.payload?.url as string,
    source: r.payload?.source as string,
    text: (r.payload?.text as string)?.slice(0, 300),
    score: r.score,
  }));

  const ragContext =
    sources.length > 0
      ? sources.map((s) => `[${s.index}] ${s.title}\n${s.text}`).join('\n\n')
      : '';

  // Step 5: Build voice-constrained system prompt with RAG context injected
  const systemPrompt = buildSystemPrompt(ragContext);

  // Step 6: Stream Claude response using messages.stream() helper
  // DO NOT use messages.create({ stream: true }) raw — use .stream() for event handling
  const stream = anthropic.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: question }],
  });

  // Step 7: Pipe Claude stream to ReadableStream for Next.js streaming response
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        // Append end-of-response citations if RAG returned results
        if (sources.length > 0) {
          const sourcesBlock =
            '\n\n---\n**Sources:**\n' +
            sources
              .map((s) => `[${s.index}] ${s.title}${s.url ? ` — ${s.url}` : ''}`)
              .join('\n');
          controller.enqueue(encoder.encode(sourcesBlock));
        }

        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  // Step 8: Return streaming response
  // Use new Response() not NextResponse.json() — streaming content, not JSON
  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-RateLimit-Remaining': String(remaining),
      'Cache-Control': 'no-cache',
      'Transfer-Encoding': 'chunked',
    },
  });
}
