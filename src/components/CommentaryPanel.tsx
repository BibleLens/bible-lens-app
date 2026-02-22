"use client";

import { useState, useEffect } from "react";

interface CommentaryChunk {
  text: string;
  title: string;
  score: number;
  chunkIndex: number;
}

interface CommentaryResponse {
  book: string;
  chapter: string;
  verse: string | null;
  commentary: CommentaryChunk[];
}

interface CommentaryPanelProps {
  book: string;
  chapter: number;
}

export function CommentaryPanel({ book, chapter }: CommentaryPanelProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [commentary, setCommentary] = useState<CommentaryChunk[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setCommentary([]);

    fetch(`/api/commentary?book=${encodeURIComponent(book)}&chapter=${chapter}`)
      .then((res) => res.json())
      .then((data: CommentaryResponse) => {
        setCommentary(data.commentary ?? []);
      })
      .catch(() => {
        setCommentary([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [book, chapter]);

  // Empty state — hide completely, no broken UI
  if (!isLoading && commentary.length === 0) {
    return null;
  }

  // Loading state — subtle shimmer
  if (isLoading) {
    return (
      <div
        className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5"
        aria-hidden="true"
      >
        <div className="animate-pulse space-y-3">
          <div
            className="h-4 w-40 rounded"
            style={{ background: "var(--color-bg-elevated)" }}
          />
          <div
            className="h-3 w-full rounded"
            style={{ background: "var(--color-bg-elevated)" }}
          />
          <div
            className="h-3 w-5/6 rounded"
            style={{ background: "var(--color-bg-elevated)" }}
          />
        </div>
      </div>
    );
  }

  // Content state
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      {/* Collapsible header */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[var(--color-bg-elevated)] transition-colors rounded-xl"
        aria-expanded={isExpanded}
      >
        <span
          className="text-lg font-semibold tracking-wide"
          style={{
            fontFamily: "var(--font-cinzel), serif",
            color: "var(--color-gold-400)",
          }}
        >
          Through This Lens
        </span>
        <svg
          className="w-5 h-5 flex-shrink-0 transition-transform duration-200"
          style={{
            color: "var(--color-text-muted)",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-5 pb-5">
          <div className="space-y-0">
            {commentary.map((chunk, index) => (
              <div key={index}>
                {index > 0 && (
                  <div className="border-t border-[var(--color-border)] my-4" />
                )}
                <p
                  className="text-lg leading-relaxed text-[var(--color-text-secondary)]"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {chunk.text}
                </p>
              </div>
            ))}
          </div>

          {/* Attribution */}
          <p
            className="mt-5 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Bible Lens Commentary
          </p>
        </div>
      )}
    </div>
  );
}
