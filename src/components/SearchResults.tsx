"use client";

import Link from "next/link";
import { SearchResult, highlightMatch } from "@/lib/search";

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isSearching: boolean;
}

export function SearchResults({ results, query, isSearching }: SearchResultsProps) {
  if (isSearching) {
    return (
      <div className="text-center py-8">
        <div className="inline-block w-6 h-6 border-2 border-[var(--color-cyan-400)] border-t-transparent rounded-full animate-spin" />
        <p className="text-[var(--color-text-muted)] mt-2">Searching...</p>
      </div>
    );
  }

  if (!query || query.length < 2) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[var(--color-text-muted)]">
          No results found for &ldquo;{query}&rdquo;
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          Try a different search term or check your spelling
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--color-text-muted)] mb-4">
        Found {results.length}{results.length === 50 ? '+' : ''} results for &ldquo;{query}&rdquo;
      </p>
      
      {results.map((result, index) => {
        const { before, match, after } = highlightMatch(
          result.text,
          result.matchStart,
          result.matchEnd
        );

        // Truncate long text
        const maxBefore = 60;
        const maxAfter = 100;
        const displayBefore = before.length > maxBefore 
          ? '...' + before.slice(-maxBefore) 
          : before;
        const displayAfter = after.length > maxAfter 
          ? after.slice(0, maxAfter) + '...' 
          : after;

        return (
          <Link
            key={`${result.bookId}-${result.chapter}-${result.verse}-${index}`}
            href={`/bible/${result.bookId}/${result.chapter}#verse-${result.verse}`}
            className="block p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-cyan-500)]/50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-[var(--color-cyan-400)]">
                {result.bookName} {result.chapter}:{result.verse}
              </span>
            </div>
            <p className="text-[var(--color-scripture)] leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
              {displayBefore}
              <mark className="bg-[var(--color-cyan-500)]/30 text-[var(--color-cyan-300)] px-0.5 rounded">
                {match}
              </mark>
              {displayAfter}
            </p>
          </Link>
        );
      })}
      
      {results.length === 50 && (
        <p className="text-center text-sm text-[var(--color-text-muted)] py-4">
          Showing first 50 results. Try a more specific search for better results.
        </p>
      )}
    </div>
  );
}

