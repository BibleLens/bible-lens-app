"use client";

import { useState } from "react";
import type { BookMeta } from "@/lib/bible-meta";
import { MasonryBooksGrid } from "@/components/masonry/MasonryBooksGrid";

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
  ssrEstimatedHeights: number[];
}

export function BooksGrid({ books, ssrEstimatedHeights }: BooksGridProps) {
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

      {/* Masonry card grid */}
      <MasonryBooksGrid
        books={filteredBooks}
        ssrEstimatedHeights={filteredBooks.map((book) => {
          const fullIndex = books.indexOf(book);
          return ssrEstimatedHeights[fullIndex] ?? 160;
        })}
        canonicalIndexMap={canonicalIndexMap}
      />
    </div>
  );
}
