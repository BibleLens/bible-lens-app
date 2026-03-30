// src/app/api/commentary/route.ts
// Commentary lookup — returns personal-source content for a specific book/chapter/verse
import { NextRequest, NextResponse } from 'next/server';
import { getQdrantClient, COLLECTION_NAME } from '@/lib/qdrant';
import { embedQuery } from '@/lib/embeddings';

export const maxDuration = 15;

export async function GET(request: NextRequest) {
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

  // Fetch extra results then post-filter by title (title field is not indexed in Qdrant)
  const expectedTitle = `${book}-${chapter}-commentary`;
  const results = await client.search(COLLECTION_NAME, {
    vector: embedding,
    limit: 20,
    with_payload: true,
    score_threshold: 0.3,
    filter: {
      must: [{ key: 'source', match: { value: 'personal' } }],
    },
  });
  const filtered = results
    .filter((r) => r.payload?.title === expectedTitle)
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
