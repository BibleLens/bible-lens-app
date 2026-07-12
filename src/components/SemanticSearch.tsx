"use client";

import { useEffect, useState, useCallback } from "react";

interface SemanticResult {
  score: number;
  text: string;
  title: string;
  url?: string;
  source: string;
  priority?: number;
  chunkIndex?: number;
}

interface SemanticSearchProps {
  query: string;
}

function RelevanceBadge({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  let badgeColor: string;
  if (pct >= 70) {
    badgeColor = "var(--color-cyan-400)";
  } else if (pct >= 50) {
    badgeColor = "var(--color-gold-400)";
  } else {
    badgeColor = "var(--color-text-muted)";
  }

  return (
    <span className="text-base font-mono" style={{ color: badgeColor }}>
      {pct}% match
    </span>
  );
}

function SourceBadge({ source }: { source: string }) {
  const labels: Record<string, string> = {
    trinity_delusion: "Trinity Delusion",
    preterist_pdf: "Preterist PDF",
    personal: "Commentary",
  };
  const label = labels[source] ?? source;

  return (
    <span className="micro-label" style={{ color: "var(--homepage-primary)" }}>
      {label}
    </span>
  );
}

/** Split a wall of text into readable paragraphs. Uses existing newlines
 *  first, then falls back to breaking roughly every 3-4 sentences. */
function splitIntoParagraphs(text: string): string[] {
  // If the source already has paragraph breaks, use them
  const byNewline = text.split(/\n{2,}/).filter(Boolean);
  if (byNewline.length > 1) return byNewline;

  // Otherwise, break every ~3 sentences for readability
  const sentences = text.match(/[^.!?]+[.!?]+\s*/g);
  if (!sentences || sentences.length <= 3) return [text];

  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    paragraphs.push(sentences.slice(i, i + 3).join("").trim());
  }
  return paragraphs;
}

function ResultsList({ results }: { results: SemanticResult[] }) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = useCallback((index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  return (
    <ul className="space-y-3">
      {results.map((result, i) => {
        const isLong = result.text.length > 200;
        const isExpanded = expanded.has(i);
        const displayText =
          isLong && !isExpanded
            ? result.text.slice(0, 200) + "..."
            : result.text;

        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className="w-full text-left glass-card p-3 transition-colors"
              style={isExpanded ? { borderColor: "var(--homepage-primary)" } : {}}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p
                  className="text-lg font-medium leading-tight flex-1"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {result.title ?? "Theological Content"}
                </p>
                <RelevanceBadge score={result.score} />
              </div>
              {isExpanded ? (
                <div
                  className="text-lg leading-relaxed mb-2 overflow-y-auto space-y-3 pr-1"
                  style={{
                    color: "var(--color-text-secondary)",
                    maxHeight: "280px",
                  }}
                >
                  {splitIntoParagraphs(result.text).map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              ) : (
                <p
                  className="text-lg leading-relaxed mb-2"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {displayText}
                </p>
              )}
              <div className="flex items-center justify-between">
                <SourceBadge source={result.source} />
                {isLong && (
                  <span
                    className="text-base"
                    style={{ color: "var(--color-cyan-400)" }}
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </span>
                )}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

interface SemanticFetchState {
  forQuery: string;
  results: SemanticResult[];
  error: boolean;
}

export function SemanticSearch({ query }: SemanticSearchProps) {
  // Loading/results/error are derived by comparing fetchState.forQuery with
  // the current query — no synchronous setState inside the effect body
  const [fetchState, setFetchState] = useState<SemanticFetchState>({
    forQuery: "",
    results: [],
    error: false,
  });

  useEffect(() => {
    if (!query.trim()) return;

    let cancelled = false;

    fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, limit: 5 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setFetchState({
          forQuery: query,
          results: (data.results as SemanticResult[]) ?? [],
          error: false,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setFetchState({ forQuery: query, results: [], error: true });
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  const isCurrent = fetchState.forQuery === query;
  const results = isCurrent && query.trim() ? fetchState.results : [];
  const error = isCurrent && Boolean(query.trim()) && fetchState.error;
  const loading = Boolean(query.trim()) && !isCurrent;

  return (
    <div className="glass-card p-5">
      {/* Section heading */}
      <div className="mb-4">
        <span className="micro-label" style={{ color: "var(--homepage-primary)" }}>THEOLOGICAL INSIGHTS</span>
      </div>

      {/* States */}
      {loading && (
        <p
          className="text-base animate-pulse"
          style={{ color: "var(--color-text-muted)" }}
        >
          Searching theological content...
        </p>
      )}

      {error && (
        <p className="text-base" style={{ color: "var(--color-text-muted)" }}>
          Could not search right now. Please try again.
        </p>
      )}

      {!loading && !error && query.trim() && results.length === 0 && (
        <p className="text-base" style={{ color: "var(--color-text-muted)" }}>
          No theological results for &ldquo;{query}&rdquo;
        </p>
      )}

      {!loading && !error && !query.trim() && (
        <p className="text-base" style={{ color: "var(--color-text-muted)" }}>
          Type a query to search theological commentary via semantic AI.
        </p>
      )}

      {/* Results */}
      {!loading && !error && results.length > 0 && (
        <ResultsList results={results} />
      )}
    </div>
  );
}
