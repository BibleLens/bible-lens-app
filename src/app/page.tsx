"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LensIcon } from "@/components/LensIcon";
import { SearchResults } from "@/components/SearchResults";
import { getOldTestamentBooks, getNewTestamentBooks } from "@/lib/bible";
import { searchBible, parseVerseReference, SearchResult } from "@/lib/search";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<"old" | "new">("old");
  const [showResults, setShowResults] = useState(false);
  
  const oldTestamentBooks = getOldTestamentBooks();
  const newTestamentBooks = getNewTestamentBooks();

  // Debounced search
  const performSearch = useCallback((query: string) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    // Check if it's a verse reference first
    const reference = parseVerseReference(query);
    if (reference) {
      // Navigate directly to the verse
      const url = reference.verse 
        ? `/bible/${reference.bookId}/${reference.chapter}#verse-${reference.verse}`
        : `/bible/${reference.bookId}/${reference.chapter}`;
      router.push(url);
      setIsSearching(false);
      return;
    }

    // Perform text search (with small delay to prevent UI blocking)
    setTimeout(() => {
      const results = searchBible(query);
      setSearchResults(results);
      setIsSearching(false);
    }, 100);
  }, [router]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg-primary)]/80 border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={clearSearch} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <LensIcon size={36} animate={false} />
            <div>
              <h1 
                className="text-lg font-semibold tracking-wide"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                <span className="text-[var(--color-gold-400)]">Bible</span>
                <span className="text-[var(--color-cyan-400)]"> Lens</span>
              </h1>
            </div>
          </button>
          
          {/* User menu placeholder */}
          <button className="w-9 h-9 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-border-hover)] transition-colors">
            <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <LensIcon size={80} />
          </div>
          <p 
            className="text-[var(--color-text-secondary)] text-lg mb-8"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            Context Over Tradition
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search verses or enter reference (e.g., John 3:16)..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input w-full pl-12 pr-12 py-4 rounded-2xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] text-lg"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-4 flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </form>
          
          {/* Quick search suggestions */}
          {!showResults && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {["John 3:16", "1 Cor 15:45", "kingdom", "eternal life"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-4 py-2 rounded-full text-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-cyan-500)] hover:text-[var(--color-cyan-400)] transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Search Results or Bible Browser */}
        {showResults ? (
          <section className="max-w-3xl mx-auto">
            <button
              onClick={clearSearch}
              className="mb-4 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-cyan-400)] transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Bible
            </button>
            <SearchResults 
              results={searchResults} 
              query={searchQuery} 
              isSearching={isSearching} 
            />
          </section>
        ) : (
          <>
            {/* Bible Books Section */}
            <section>
              {/* Testament Tabs */}
              <div className="flex gap-1 mb-6 p-1 bg-[var(--color-bg-secondary)] rounded-lg w-fit mx-auto">
                <button
                  onClick={() => setActiveTab("old")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "old"
                      ? "bg-[var(--color-bg-elevated)] text-[var(--color-gold-400)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  Old Testament
                </button>
                <button
                  onClick={() => setActiveTab("new")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "new"
                      ? "bg-[var(--color-bg-elevated)] text-[var(--color-cyan-400)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  New Testament
                </button>
              </div>

              {/* Books Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {(activeTab === "old" ? oldTestamentBooks : newTestamentBooks).map((book) => (
                  <Link
                    key={book.id}
                    href={`/bible/${book.id}`}
                    className="card p-4 text-left hover:border-[var(--color-cyan-500)]/50 group"
                  >
                    <p className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-cyan-400)] transition-colors truncate">
                      {book.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      {book.chapters} {book.chapters === 1 ? "chapter" : "chapters"}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Featured Topics */}
            <section className="mt-12">
              <h2 
                className="text-xl font-semibold mb-6 text-center"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                <span className="text-gradient-lens">Featured Topics</span>
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "The Last Adam",
                    description: "Understanding Jesus as the perfect man who succeeded where Adam failed.",
                    icon: "👤",
                    color: "gold",
                    link: "/bible/1corinthians/15",
                  },
                  {
                    title: "The Kingdom",
                    description: "What Jesus actually taught about the coming Kingdom of God.",
                    icon: "👑",
                    color: "cyan",
                    link: "/bible/matthew/6",
                  },
                  {
                    title: "Matthew 24",
                    description: "When was the 'end of the age' Jesus predicted? Historical context reveals the answer.",
                    icon: "📜",
                    color: "gold",
                    link: "/bible/matthew/24",
                  },
                ].map((topic) => (
                  <Link
                    key={topic.title}
                    href={topic.link}
                    className="card p-6 text-left group"
                  >
                    <span className="text-3xl mb-4 block">{topic.icon}</span>
                    <h3 className={`font-semibold mb-2 ${
                      topic.color === "gold" 
                        ? "text-[var(--color-gold-400)]" 
                        : "text-[var(--color-cyan-400)]"
                    }`}>
                      {topic.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {topic.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            Ancient wisdom, modern clarity.
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            © 2026 Bible Lens. Context Over Tradition.
          </p>
        </div>
      </footer>
    </div>
  );
}
