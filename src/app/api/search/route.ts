// src/app/api/search/route.ts
// Semantic search endpoint — vectorizes query, searches Qdrant, returns ranked results
import { NextRequest, NextResponse } from 'next/server';
import { getQdrantClient, COLLECTION_NAME } from '@/lib/qdrant';
import { embedQuery } from '@/lib/embeddings';
import { checkSearchRateLimit, getClientIp } from '@/lib/rate-limit';
import { crossOrigin, readJsonObject } from '@/lib/request-guards';

export const maxDuration = 15; // Search should be fast; 15s is generous

export async function POST(request: NextRequest) {
  if (crossOrigin(request)) return Response.json({ error: 'Forbidden.' }, { status: 403 });
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

  const parsed = await readJsonObject(request, 20_000);
  if (parsed.response) return parsed.response;
  const { query, limit = 5, source } = parsed.body;
  if (typeof query !== 'string' || !query.trim() || query.length > 4000 ||
      typeof limit !== 'number' || !Number.isInteger(limit) || limit < 1 || limit > 10 ||
      (source !== undefined && (typeof source !== 'string' || !source.trim() || source.length > 80))) {
    return NextResponse.json({ error: 'Please enter a valid search.' }, { status: 400 });
  }

  try {
    const embedding = await embedQuery(query.trim());
    const filter = source ? { must: [{ key: 'source', match: { value: source } }] } : undefined;
    const results = await getQdrantClient().search(COLLECTION_NAME, {
      vector: embedding, limit, with_payload: true, score_threshold: 0.3, filter,
    });
    return NextResponse.json({
      results: results.map((r) => ({
        score: r.score,
        text: r.payload?.text,
        title: r.payload?.title,
        // Ingested files can carry local paths, which must remain private.
        url: publicUrl(r.payload?.url),
        source: r.payload?.source,
        priority: r.payload?.priority,
        chunkIndex: r.payload?.chunkIndex,
      })),
      remaining,
    });
  } catch {
    return NextResponse.json({ error: 'Search is temporarily unavailable. Please try again.' }, { status: 503 });
  }
}

function publicUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}
