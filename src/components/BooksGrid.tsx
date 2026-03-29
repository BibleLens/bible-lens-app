"use client";

import Link from "next/link";
import { useState } from "react";
import type { BookMeta } from "@/lib/bible";
import { bookMetaMap } from "@/lib/book-meta";
import { COMMENTARY_BOOKS } from "@/lib/commentary-index";

const TABS = [
  "All Books",
  "Old Testament",
  "New Testament",
  "Pentateuch",
  "Poetry",
  "Prophets",
] as const;

type Tab = (typeof TABS)[number];

const FILTER_SETS: Record<string, string[]> = {
  Pentateuch: ["genesis", "exodus", "leviticus", "numbers", "deuteronomy"],
  Poetry: ["job", "psalms", "proverbs", "ecclesiastes", "songofsolomon"],
  Prophets: [
    "isaiah",
    "jeremiah",
    "lamentations",
    "ezekiel",
    "daniel",
    "hosea",
    "joel",
    "amos",
    "obadiah",
    "jonah",
    "micah",
    "nahum",
    "habakkuk",
    "zephaniah",
    "haggai",
    "zechariah",
    "malachi",
  ],
};

interface BooksGridProps {
  books: BookMeta[];
}

export function BooksGrid({ books }: BooksGridProps) {
  const [activeTab, setActiveTab] = useState<Tab>("All Books");

  // Pre-compute canonical index map (1-based position in original unfiltered array)
  const canonicalIndexMap: Record<string, number> = {};
  books.forEach((book, i) => {
    canonicalIndexMap[book.id] = i + 1;
  });

  // Filter books based on active tab
  const filteredBooks = books.filter((book) => {
    if (activeTab === "All Books") return true;
    if (activeTab === "Old Testament") return book.testament === "OT";
    if (activeTab === "New Testament") return book.testament === "NT";
    return (FILTER_SETS[activeTab] ?? []).includes(book.id);
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${-y * 12}deg`);
    el.style.setProperty("--ry", `${x * 12}deg`);
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div>
      {/* Filter tabs */}
      <div
        className="flex gap-1 overflow-x-auto pb-1 mb-8"
        style={{ borderBottom: "1px solid rgba(0,229,255,0.1)" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 whitespace-nowrap text-sm transition-colors"
            style={{
              borderBottom:
                activeTab === tab
                  ? "2px solid var(--homepage-primary)"
                  : "2px solid transparent",
              color:
                activeTab === tab
                  ? "var(--homepage-primary)"
                  : "var(--color-text-muted)",
              fontFamily: "var(--font-interface)",
              background: "transparent",
              marginBottom: "-1px",
              cursor: "pointer",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.map((book) => {
          const meta = bookMetaMap[book.id];
          const hasCommentary = COMMENTARY_BOOKS.includes(book.id);
          const canonicalIndex = canonicalIndexMap[book.id] ?? 0;

          return (
            <div
              key={book.id}
              className="glass-card relative cursor-pointer overflow-hidden"
              style={{ minHeight: "160px" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="shimmer-layer" />
              <div className="card-spotlight" />

              <Link
                href={`/bible/${book.id}`}
                className="absolute inset-0 p-4 flex flex-col justify-between z-10"
              >
                {/* Top row: badge + LENS indicator */}
                <div className="flex items-center justify-between">
                  <span
                    className="micro-label"
                    style={{ color: "var(--homepage-primary)" }}
                  >
                    {String(canonicalIndex).padStart(2, "0")}/66
                  </span>
                  {hasCommentary && (
                    <span
                      className="micro-label"
                      style={{ color: "var(--color-gold-400)" }}
                    >
                      LENS
                    </span>
                  )}
                </div>

                {/* Bottom: book name + chapter count */}
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-text-primary)",
                    }}
                    className="text-lg font-semibold"
                  >
                    {book.name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {book.chapters} {book.chapters === 1 ? "ch" : "chs"}
                  </p>
                </div>
              </Link>

              {/* Metadata overlay (revealed on hover via animate-content) */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 animate-content z-20"
                style={{
                  background: "rgba(5,5,8,0.92)",
                  pointerEvents: "none",
                }}
              >
                {meta ? (
                  <>
                    <div className="mb-2">
                      <p
                        className="micro-label mb-0.5"
                        style={{ color: "var(--homepage-primary)" }}
                      >
                        AUTHOR
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-text-muted-warm)" }}
                      >
                        {meta.author}
                      </p>
                    </div>
                    <div className="mb-2">
                      <p
                        className="micro-label mb-0.5"
                        style={{ color: "var(--homepage-primary)" }}
                      >
                        DATE
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-text-muted-warm)" }}
                      >
                        {meta.date}
                      </p>
                    </div>
                    <div>
                      <p
                        className="micro-label mb-0.5"
                        style={{ color: "var(--homepage-primary)" }}
                      >
                        CONTEXT
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-text-muted-warm)" }}
                      >
                        {meta.context}
                      </p>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
