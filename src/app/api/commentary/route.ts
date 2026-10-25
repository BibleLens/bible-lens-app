// src/app/api/commentary/route.ts
// Commentary lookup — returns personal-source content for a specific book/chapter/verse
import { NextRequest, NextResponse } from 'next/server';
import { getQdrantClient, COLLECTION_NAME } from '@/lib/qdrant';
import { embedQuery } from '@/lib/embeddings';
import { titleCoversChapter } from '@/lib/commentary';
import { checkCommentaryRateLimit, getClientIp } from '@/lib/rate-limit';
import { getAllBooks } from '@/lib/bible-meta';
import { crossOrigin } from '@/lib/request-guards';

export const maxDuration = 15;

export async function GET(request: NextRequest) {
  if (crossOrigin(request)) return Response.json({ error: 'Forbidden.' }, { status: 403 });
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
  const suppliedBook = searchParams.get('book')?.trim() ?? '';
  const chapter = searchParams.get('chapter') ?? '';
  const verse = searchParams.get('verse');
  const metadata = getAllBooks().find((b) => [b.id, b.name, b.abbr]
    .some((name) => name.toLowerCase() === suppliedBook.toLowerCase()));
  if (!metadata || !/^[1-9]\d{0,2}$/.test(chapter) || Number(chapter) > metadata.chapters ||
      (verse !== null && (!/^[1-9]\d{0,2}$/.test(verse) || Number(verse) > 176))) {
    return NextResponse.json({ error: 'Please choose a valid Bible book and chapter.' }, { status: 400 });
  }
  const book = metadata.id;
  const query = verse ? `${book} chapter ${chapter} verse ${verse}` : `${book} chapter ${chapter}`;
  try {
    const embedding = await embedQuery(query);
    const results = await getQdrantClient().search(COLLECTION_NAME, {
      vector: embedding, limit: 20, with_payload: true, score_threshold: 0.3,
      filter: { must: [{ key: 'source', match: { value: 'personal' } }] },
    });
    const filtered = results
      .filter((r) => typeof r.payload?.title === 'string' && titleCoversChapter(r.payload.title, book, Number(chapter)))
      .slice(0, 5);
    return NextResponse.json({
      book, chapter, verse: verse || null,
      commentary: filtered.map((r) => ({
        text: r.payload?.text, title: r.payload?.title, score: r.score, chunkIndex: r.payload?.chunkIndex,
      })),
    });
  } catch {
    return NextResponse.json({ error: 'Commentary is temporarily unavailable. Please try again.' }, { status: 503 });
  }
}
