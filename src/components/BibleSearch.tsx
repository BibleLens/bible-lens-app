"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MiniSearch from "minisearch";
import { getAllBooks, getBook } from "@/lib/bible";

interface BibleSearchResult {
  id: string;
  book: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  score: number;
}

// Module-scope singleton — build index once across all renders
let bibleIndex: MiniSearch | null = null;

function getOrBuildBibleIndex(): MiniSearch {
  if (bibleIndex) return bibleIndex;

  bibleIndex = new MiniSearch({
    fields: ["text"],
    storeFields: ["book", "bookName", "chapter", "verse", "text"],
    idField: "id",
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
    },
  });

  const books = getAllBooks();
  const docs: Array<{
    id: string;
    book: string;
    bookName: string;
    chapter: number;
    verse: number;
    text: string;
  }> = [];

  for (const bookMeta of books) {
    const bookData = getBook(bookMeta.id);
    if (!bookData) continue;
    for (const [chStr, verses] of Object.entries(bookData.chapters)) {
      const chapter = parseInt(chStr, 10);
      for (const v of verses) {
        docs.push({
          id: `${bookMeta.id}-${chapter}-${v.verse}`,
          book: bookMeta.id,
          bookName: bookMeta.name,
          chapter,
          verse: v.verse,
          text: v.text,
        });
      }
    }
  }

  // Deduplicate — guards against corrupted bible data with repeated verses
  const seen = new Set<string>();
  const uniqueDocs = [];
  for (const doc of docs) {
    if (!seen.has(doc.id)) {
      seen.add(doc.id);
      uniqueDocs.push(doc);
    }
  }

  bibleIndex.addAll(uniqueDocs);
  return bibleIndex;
}

interface BibleSearchProps {
  query: string;
}

export function BibleSearch({ query }: BibleSearchProps) {
  const [results, setResults] = useState<BibleSearchResult[]>([]);
  const [indexReady, setIndexReady] = useState(false);

  // Build index on mount — defer with setTimeout so page paints first
  useEffect(() => {
    const timer = setTimeout(() => {
      getOrBuildBibleIndex();
      setIndexReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Run search when query or index readiness changes
  useEffect(() => {
    if (!indexReady || !query.trim()) {
      setResults([]);
      return;
    }
    const idx = getOrBuildBibleIndex();
    const hits = (idx.search(query) as unknown as BibleSearchResult[]).slice(0, 20);
    setResults(hits);
  }, [query, indexReady]);

  return (
    <div
      className="rounded-xl border p-5"
      style={{
        background: "var(--color-bg-elevated)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Section heading */}
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5"
          style={{ color: "var(--color-gold-400)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <h2
          className="font-semibold text-base"
          style={{ color: "var(--color-text-primary)" }}
        >
          Bible Text
        </h2>
      </div>

      {/* States */}
      {!indexReady && (
        <p
          className="text-sm animate-pulse"
          style={{ color: "var(--color-text-muted)" }}
        >
          Building search index...
        </p>
      )}

      {indexReady && query.trim() && results.length === 0 && (
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          No Bible results for &ldquo;{query}&rdquo;
        </p>
      )}

      {indexReady && !query.trim() && (
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Type a word or phrase to search all 31,729 BSB verses.
        </p>
      )}

      {/* Results */}
      {results.length > 0 && (
        <ul className="space-y-3">
          {results.map((result) => {
            const isOT = [
              "genesis","exodus","leviticus","numbers","deuteronomy","joshua",
              "judges","ruth","1samuel","2samuel","1kings","2kings","1chronicles",
              "2chronicles","ezra","nehemiah","esther","job","psalms","proverbs",
              "ecclesiastes","songofsolomon","isaiah","jeremiah","lamentations",
              "ezekiel","daniel","hosea","joel","amos","obadiah","jonah","micah",
              "nahum","habakkuk","zephaniah","haggai","zechariah","malachi",
            ].includes(result.book);
            const refColor = isOT
              ? "var(--color-gold-400)"
              : "var(--color-cyan-400)";
            const truncatedText =
              result.text.length > 120
                ? result.text.slice(0, 120) + "..."
                : result.text;

            return (
              <li key={result.id}>
                <Link
                  href={`/bible/${result.book}/${result.chapter}`}
                  className="block rounded-lg p-3 hover:border-[var(--color-border-hover)] transition-colors"
                  style={{
                    background: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-sm font-medium"
                      style={{ color: refColor }}
                    >
                      {result.bookName} {result.chapter}:{result.verse}
                    </span>
                    <span
                      className="text-xs font-mono"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {Math.round(result.score * 10) / 10}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {truncatedText}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
