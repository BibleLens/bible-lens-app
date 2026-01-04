"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LensIcon } from "./LensIcon";
import { parseVerseReference } from "@/lib/search";

interface HeaderProps {
  showSearch?: boolean;
  initialQuery?: string;
}

export function Header({ showSearch = true, initialQuery = "" }: HeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    
    if (!query || query.length < 2) return;

    // Check if it's a verse reference
    const reference = parseVerseReference(query);
    if (reference) {
      const url = reference.verse 
        ? `/bible/${reference.bookId}/${reference.chapter}#verse-${reference.verse}`
        : `/bible/${reference.bookId}/${reference.chapter}`;
      router.push(url);
      return;
    }

    // Navigate to home with search query
    router.push(`/?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg-primary)]/80 border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
          <LensIcon size={32} animate={false} />
          <span 
            className="text-base font-semibold tracking-wide hidden sm:inline"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            <span className="text-[var(--color-gold-400)]">Bible</span>
            <span className="text-[var(--color-cyan-400)]"> Lens</span>
          </span>
        </Link>
        
        {/* Search Bar */}
        {showSearch && (
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search verses or references..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-20 py-2 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] text-sm focus:border-[var(--color-cyan-500)] focus:outline-none transition-colors"
            />
            <div className="absolute inset-y-0 right-1 flex items-center">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                type="submit"
                className="px-3 py-1.5 bg-[var(--color-cyan-500)] hover:bg-[var(--color-cyan-600)] text-black text-xs font-medium rounded-full transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        )}
        
        {/* User menu placeholder */}
        <button className="w-9 h-9 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-border-hover)] transition-colors shrink-0">
          <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </header>
  );
}

