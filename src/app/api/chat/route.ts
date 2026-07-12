// src/app/api/chat/route.ts
// Streaming Claude chat endpoint with RAG context injection and voice constraints
// Node.js runtime (NOT Edge) — fluid compute gives 300s on Hobby; we cap at 30s to be safe

import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getQdrantClient, COLLECTION_NAME } from '@/lib/qdrant';
import { embedQuery } from '@/lib/embeddings';
import { buildSystemPrompt } from '@/lib/system-prompt';
import { checkChatRateLimit, getClientIp } from '@/lib/rate-limit';
import { pruneToTokenBudget, CONVERSATION_TOKEN_BUDGET } from '@/lib/token-budget';

export const maxDuration = 30;

// Lazy singleton — validates API key on first use, not at module import time
let _anthropic: Anthropic | null = null;

function getAnthropicClient(): Anthropic {
  if (_anthropic) return _anthropic;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not configured');
  }
  _anthropic = new Anthropic({ apiKey });
  return _anthropic;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Hard cap on any single message — the token-budget pruner deliberately keeps an
// over-budget latest message, so without this a multi-megabyte question would reach
// the embedding and Claude calls at full length.
const MAX_MESSAGE_CHARS = 4000;

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
  // Accepts either { messages: ConversationMessage[] } (multi-turn) or { question: string } (legacy single-turn)
  const body = await request.json();

  let conversationMessages: ConversationMessage[];

  if (body.messages !== undefined) {
    // Multi-turn: validate messages array
    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "That question didn't quite register — could you rephrase it?" }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate each message entry
    for (const msg of body.messages) {
      if (
        typeof msg !== 'object' ||
        (msg.role !== 'user' && msg.role !== 'assistant') ||
        typeof msg.content !== 'string' ||
        msg.content.trim() === '' ||
        msg.content.length > MAX_MESSAGE_CHARS
      ) {
        return new Response(
          JSON.stringify({ error: "That question didn't quite register — could you rephrase it?" }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Last message must be from the user
    if (body.messages[body.messages.length - 1].role !== 'user') {
      return new Response(
        JSON.stringify({ error: "That question didn't quite register — could you rephrase it?" }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Cap at 50 messages to prevent abuse
    const capped = body.messages.slice(-50);
    conversationMessages = capped.map((m: ConversationMessage) => ({
      role: m.role,
      content: m.content,
    }));
  } else {
    // Legacy single-turn: { question: string }
    const { question } = body;
    if (!question || typeof question !== 'string' || question.length > MAX_MESSAGE_CHARS) {
      return new Response(
        JSON.stringify({ error: "That question didn't quite register — could you rephrase it?" }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    conversationMessages = [{ role: 'user', content: question }];
  }

  // Apply token-budget sliding window — prune to most recent messages within budget
  // (50-message hard cap above is an abuse guard; this is the finer-grained cost control)
  const {
    pruned: prunedMessages,
    originalCount,
    prunedCount,
    estimatedTokens,
  } = pruneToTokenBudget(conversationMessages, CONVERSATION_TOKEN_BUDGET);

  if (prunedCount < originalCount) {
    console.log(
      `[chat/route] Token budget: pruned ${originalCount} → ${prunedCount} messages (~${estimatedTokens} tokens)`
    );
  }

  // Extract latest user message for RAG retrieval (scoped to latest message per v1.6 constraint)
  // Use full conversationMessages — latest user message is always preserved in prunedMessages anyway
  const latestQuestion = conversationMessages[conversationMessages.length - 1].content;

  try {
    const anthropic = getAnthropicClient();

    // Step 3: RAG retrieval — embed latest question, search Qdrant for context
    const embedding = await embedQuery(latestQuestion);
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
    // Pass full conversation history for multi-turn context awareness
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: prunedMessages,
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

          // Append end-of-response citations if RAG returned results.
          // Only web URLs — ingested payloads carry file:// paths from the
          // machine that ran the rebuild, which must never reach the client.
          if (sources.length > 0) {
            const sourcesBlock =
              '\n\n---\n**Sources:**\n' +
              sources
                .map((s) => {
                  const isWebUrl = typeof s.url === 'string' && /^https?:\/\//.test(s.url);
                  return `[${s.index}] ${s.title}${isWebUrl ? ` — ${s.url}` : ''}`;
                })
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
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Something went wrong on our end.';
    console.error('[chat/route] Error:', message);
    return new Response(
      JSON.stringify({
        error: 'Our knowledge engine hit a snag. Please try again in a moment.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
