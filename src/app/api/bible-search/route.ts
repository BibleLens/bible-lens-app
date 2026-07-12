// src/app/api/bible-search/route.ts
// Full-text Bible verse search, server-side.
// The MiniSearch index over all 31,729 BSB verses used to be built in the
// browser, which shipped the entire Bible (~4.5 MB minified) to every visitor
// of /search. It now lives here as a module-scope singleton — built once per
// server instance, reused across warm invocations.
import { NextRequest, NextResponse } from 'next/server';
import MiniSearch from 'minisearch';
import { getAllBooks } from '@/lib/bible-meta';
import { getBook } from '@/lib/bible';

export const maxDuration = 15;

interface VerseDoc {
  id: string;
  book: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

let bibleIndex: MiniSearch<VerseDoc> | null = null;

function getOrBuildBibleIndex(): MiniSearch<VerseDoc> {
  if (bibleIndex) return bibleIndex;

  const index = new MiniSearch<VerseDoc>({
    fields: ['text'],
    storeFields: ['book', 'bookName', 'chapter', 'verse', 'text'],
    idField: 'id',
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
    },
  });

  const seen = new Set<string>();
  const docs: VerseDoc[] = [];

  for (const bookMeta of getAllBooks()) {
    const bookData = getBook(bookMeta.id);
    if (!bookData) continue;
    for (const [chStr, verses] of Object.entries(bookData.chapters)) {
      const chapter = parseInt(chStr, 10);
      for (const v of verses) {
        const id = `${bookMeta.id}-${chapter}-${v.verse}`;
        // Deduplicate — guards against corrupted bible data with repeated verses
        if (seen.has(id)) continue;
        seen.add(id);
        docs.push({
          id,
          book: bookMeta.id,
          bookName: bookMeta.name,
          chapter,
          verse: v.verse,
          text: v.text,
        });
      }
    }
  }

  index.addAll(docs);
  bibleIndex = index;
  return index;
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim() ?? '';

  if (!q) {
    return NextResponse.json({ results: [] });
  }
  if (q.length > 200) {
    return NextResponse.json(
      { error: 'Search query is too long.' },
      { status: 400 }
    );
  }

  const index = getOrBuildBibleIndex();
  const results = index.search(q).slice(0, 20).map((hit) => ({
    id: hit.id as string,
    book: hit.book as string,
    bookName: hit.bookName as string,
    chapter: hit.chapter as number,
    verse: hit.verse as number,
    text: hit.text as string,
    score: hit.score,
  }));

  return NextResponse.json(
    { results },
    {
      // Verse text is static per deploy — let the CDN absorb repeat queries
      headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' },
    }
  );
}
