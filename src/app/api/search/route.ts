// src/app/api/search/route.ts
// Semantic search endpoint — vectorizes query, searches Qdrant, returns ranked results
import { NextRequest, NextResponse } from 'next/server';
import { getQdrantClient, COLLECTION_NAME } from '@/lib/qdrant';
import { embedQuery } from '@/lib/embeddings';
import { checkSearchRateLimit, getClientIp } from '@/lib/rate-limit';

export const maxDuration = 15; // Search should be fast; 15s is generous

export async function POST(request: NextRequest) {
  // Rate limit check — 30 req/min per IP
  const ip = getClientIp(request);
  const { allowed, remaining, resetAt } = checkSearchRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many searches — try again in a minute.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.floor(resetAt / 1000)),
          'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  // Parse and validate request body
  const body = await request.json();
  const { query, limit = 5, source } = body as {
    query: unknown;
    limit?: number;
    source?: string;
  };

  if (!query || typeof query !== 'string' || query.trim() === '') {
    return NextResponse.json(
      { error: "That search didn't quite register — could you try again?" },
      { status: 400 }
    );
  }

  // Vectorize the query
  const embedding = await embedQuery(query);

  // Build optional source filter
  const filter = source
    ? { must: [{ key: 'source', match: { value: source } }] }
    : undefined;

  // Search Qdrant
  const client = getQdrantClient();
  const results = await client.search(COLLECTION_NAME, {
    vector: embedding,
    limit: Math.min(limit ?? 5, 10),
    with_payload: true,
    score_threshold: 0.3,
    filter,
  });

  return NextResponse.json({
    results: results.map((r) => ({
      score: r.score,
      text: r.payload?.text,
      title: r.payload?.title,
      url: r.payload?.url,
      source: r.payload?.source,
      priority: r.payload?.priority,
      chunkIndex: r.payload?.chunkIndex,
    })),
    remaining,
  });
}
