"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BibleSearchResult {
  id: string;
  book: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  score: number;
}

interface BibleSearchProps {
  query: string;
}

export function BibleSearch({ query }: BibleSearchProps) {
  const [results, setResults] = useState<BibleSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch results from the server-side index — the full Bible + MiniSearch
  // no longer ship to the browser (see /api/bible-search)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    fetch(`/api/bible-search?q=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : { results: [] }))
      .then((data) => {
        setResults(data.results ?? []);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setResults([]);
        setLoading(false);
      });

    return () => controller.abort();
  }, [query]);

  return (
    <div className="glass-card p-5">
      {/* Section heading */}
      <div className="mb-4">
        <span className="micro-label" style={{ color: "var(--homepage-primary)" }}>BIBLE TEXT</span>
      </div>

      {/* States */}
      {loading && (
        <p
          className="text-base animate-pulse"
          style={{ color: "var(--color-text-muted)" }}
        >
          Searching...
        </p>
      )}

      {!loading && query.trim() && results.length === 0 && (
        <p className="text-base" style={{ color: "var(--color-text-muted)" }}>
          No Bible results for &ldquo;{query}&rdquo;
        </p>
      )}

      {!query.trim() && (
        <p className="text-base" style={{ color: "var(--color-text-muted)" }}>
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
                  className="block glass-card p-3 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-lg font-medium"
                      style={{ color: refColor }}
                    >
                      {result.bookName} {result.chapter}:{result.verse}
                    </span>
                    <span className="micro-label" style={{ color: "var(--homepage-primary)" }}>
                      {isOT ? "OT VERSE" : "NT VERSE"}
                    </span>
                  </div>
                  <p
                    className="text-lg leading-relaxed"
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
