// src/app/api/commentary/route.ts
// Commentary lookup — returns personal-source content for a specific book/chapter/verse
import { NextRequest, NextResponse } from 'next/server';
import { getQdrantClient, COLLECTION_NAME } from '@/lib/qdrant';
import { embedQuery } from '@/lib/embeddings';
import { titleCoversChapter } from '@/lib/commentary';
import { checkCommentaryRateLimit, getClientIp } from '@/lib/rate-limit';

export const maxDuration = 15;

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed, resetAt } = checkCommentaryRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests — try again in a minute.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)) },
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');
  const chapter = searchParams.get('chapter');
  const verse = searchParams.get('verse');

  if (!book || !chapter) {
    return NextResponse.json(
      { error: 'Need at least a book and chapter to find commentary.' },
      { status: 400 }
    );
  }

  // Build semantic query from passage reference
  const query = verse
    ? `${book} chapter ${chapter} verse ${verse}`
    : `${book} chapter ${chapter}`;

  const embedding = await embedQuery(query);
  const client = getQdrantClient();

  const results = await client.search(COLLECTION_NAME, {
    vector: embedding,
    limit: 20,
    with_payload: true,
    score_threshold: 0.3,
    filter: {
      must: [{ key: 'source', match: { value: 'personal' } }],
    },
  });
  const chapterNum = parseInt(chapter, 10);
  const filtered = results
    .filter((r) => titleCoversChapter(r.payload?.title as string, book, chapterNum))
    .slice(0, 5);

  return NextResponse.json({
    book,
    chapter,
    verse: verse || null,
    commentary: filtered.map((r) => ({
      text: r.payload?.text,
      title: r.payload?.title,
      score: r.score,
      chunkIndex: r.payload?.chunkIndex,
    })),
  });
}
