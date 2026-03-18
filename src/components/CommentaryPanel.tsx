"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { CommentaryChunk } from "@/lib/commentary";

interface CommentaryResponse {
  book: string;
  chapter: string;
  verse: string | null;
  commentary: CommentaryChunk[];
}

interface CommentaryPanelProps {
  book: string;
  chapter: number;
  initialCommentary?: CommentaryChunk[];
}

export function CommentaryPanel({ book, chapter, initialCommentary }: CommentaryPanelProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(!(initialCommentary && initialCommentary.length > 0));
  const [commentary, setCommentary] = useState<CommentaryChunk[]>(initialCommentary ?? []);
  const [isExpanded, setIsExpanded] = useState(false);

  const buildPassageQuestion = (): string => {
    const bookTitle = book.charAt(0).toUpperCase() + book.slice(1);
    if (book === "genesis") {
      return `What does ${bookTitle} ${chapter} mean for understanding creation?`;
    }
    if (book === "matthew") {
      return `What does ${bookTitle} ${chapter} mean for understanding the Olivet Discourse?`;
    }
    if (book === "revelation") {
      return `What does ${bookTitle} ${chapter} reveal about first-century events through ancient Jewish apocalyptic imagery?`;
    }
    if (book === "isaiah") {
      return `What did Isaiah ${chapter} mean to the original audience — and how does it connect to New Testament fulfillment?`;
    }
    if (book === "ezekiel") {
      if ([1, 2, 3].includes(chapter)) {
        return `What did Ezekiel's chariot vision mean to the original exilic audience — the chayot, ophanim, and the kabod of YHWH?`;
      }
      if (chapter === 28) {
        return `Is Ezekiel 28 about Satan or a human king? What did the divine council imagery mean to Ezekiel's original audience?`;
      }
      if (chapter === 37) {
        return `What does Ezekiel 37's valley of dry bones mean? How does the text interpret itself at verse 11?`;
      }
      if ([38, 39].includes(chapter)) {
        return `Who is Gog of the land of Magog in Ezekiel ${chapter}, and how does this connect to Revelation 20:8?`;
      }
    }
    return `What is the historical context of ${bookTitle} ${chapter}?`;
  };

  const handleAskAboutPassage = () => {
    const question = buildPassageQuestion();
    router.push(`/chat?q=${encodeURIComponent(question)}&t=${Date.now()}`);
  };

  /** Split a flat commentary blob into headed sections with paragraph breaks. */
  const parseCommentarySections = (
    text: string
  ): { heading: string | null; body: string }[] => {
    // Strip leading # title (redundant with "Read our take on this passage" CTA)
    const stripped = text.replace(/^#\s+[^#]+?(?=\s*##)/, "").trim();
    // Split on ## or ### markers
    const parts = stripped.split(/\s*#{2,3}\s+/);
    return parts
      .filter(Boolean)
      .map((section) => {
        // Heading heuristic: a sentence starts where a capitalized word is
        // followed by two+ lowercase words (e.g. "If you've ever", "The name used").
        // Title words like "Cosmic Temple Framework" won't false-match because
        // they're followed by more capitalized words, not lowercase runs.
        // Pattern: CapitalizedWord + lowercase-word (with apostrophes) + lowercase-word
        // This catches sentence starts like "The serpent's promise", "If you've ever"
        // but not title phrases like "Cosmic Temple Framework" (followed by uppercase)
        const match = section.match(
          /^(.+?)\s+([A-Z][a-z]+[.,:;!?']*\s+[a-z][a-z']*\s+[a-z])/
        );
        if (match) {
          const headingEnd = match.index! + match[1].length;
          return {
            heading: section.substring(0, headingEnd).trim(),
            body: section.substring(headingEnd).trim(),
          };
        }
        return { heading: null, body: section };
      })
      .filter((s) => s.heading || s.body.trim());
  };

  /** Apply inline markdown (bold, italic) to text. */
  const inlineMarkdown = (text: string): string =>
    text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");

  useEffect(() => {
    // Skip client fetch when data was pre-populated by the server (SSR)
    if (initialCommentary && initialCommentary.length > 0) return;

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
  }, [book, chapter, initialCommentary]);

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
    <>
      <style>{`
        @keyframes ctaGlowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0); }
          50% { box-shadow: 0 0 8px 2px rgba(250, 204, 21, 0.15); }
        }
      `}</style>
      <div
        className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
        style={{
          borderLeft: "3px solid var(--color-gold-400)",
          animation: "ctaGlowPulse 3s ease-in-out 1s infinite",
        }}
      >
      {/* Collapsible header — "Read our take on this passage" CTA */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-5 text-left hover:bg-[var(--color-bg-elevated)] transition-colors rounded-xl"
        aria-expanded={isExpanded}
      >
        <span className="flex items-center">
          {/* Inline diamond SVG — unique gradient ID to avoid collision with homepage LensIcon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 100 100"
            fill="none"
            className="flex-shrink-0 mr-2"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ctaLensGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <path
              d="M50 10 L70 50 L50 90 L30 50 Z"
              stroke="url(#ctaLensGradient)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <span className="flex flex-col">
            <span
              className="text-base font-semibold leading-tight"
              style={{
                fontFamily: "var(--font-cinzel), serif",
                color: "var(--color-gold-400)",
              }}
            >
              Bible Lens Commentary
            </span>
            <span
              className="text-sm leading-snug"
              style={{ color: "var(--color-text-muted)" }}
            >
              What the original audience understood
            </span>
          </span>
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
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-cinzel), serif",
              letterSpacing: "0.12em",
            }}
          >
            Through This Lens
          </p>
          <div className="space-y-0">
            {commentary.map((chunk, index) => (
              <div key={index}>
                {index > 0 && (
                  <div className="border-t border-[var(--color-border)] my-4" />
                )}
                <div
                  className="text-lg leading-relaxed text-[var(--color-text-secondary)]"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {parseCommentarySections(chunk.text).map((section, si) => (
                    <div key={si} className={si > 0 ? "mt-5" : ""}>
                      {section.heading && (
                        <h3
                          className="text-xl font-semibold mb-2"
                          style={{ color: "var(--color-text-primary)" }}
                          dangerouslySetInnerHTML={{
                            __html: inlineMarkdown(section.heading),
                          }}
                        />
                      )}
                      {section.body.trim() && (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: inlineMarkdown(section.body.trim()),
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Attribution */}
          <p
            className="mt-5 text-base"
            style={{ color: "var(--color-text-muted)" }}
          >
            Bible Lens Commentary
          </p>

          <button
            type="button"
            onClick={handleAskAboutPassage}
            className="mt-4 w-full px-4 py-3 rounded-xl text-lg font-medium transition-colors hover:opacity-90"
            style={{
              background: "rgba(250, 204, 21, 0.08)",
              border: "1px solid rgba(250, 204, 21, 0.25)",
              color: "var(--color-gold-400)",
            }}
          >
            Ask about this passage
          </button>
        </div>
      )}
    </div>
    </>
  );
}
