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
    personal: "Personal",
  };
  const label = labels[source] ?? source;

  return (
    <span
      className="text-base px-2 py-0.5 rounded-full border"
      style={{
        color: "var(--color-text-muted)",
        borderColor: "var(--color-border)",
        background: "var(--color-bg-secondary)",
      }}
    >
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
              className="w-full text-left rounded-none p-3 transition-colors"
              style={{
                background: "var(--color-bg-secondary)",
                border: isExpanded
                  ? "1px solid var(--color-border-hover)"
                  : "1px solid var(--color-border)",
              }}
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

export function SemanticSearch({ query }: SemanticSearchProps) {
  const [results, setResults] = useState<SemanticResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);

    fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, limit: 5 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setResults(
          (data.results as SemanticResult[]) ?? []
        );
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div
      className="rounded-none border p-5"
      style={{
        background: "var(--color-bg-elevated)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Section heading */}
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5"
          style={{ color: "var(--color-cyan-400)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <h2
          className="font-semibold text-lg"
          style={{ color: "var(--color-text-primary)" }}
        >
          Theological Insights
        </h2>
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
