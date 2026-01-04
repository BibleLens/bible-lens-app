"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LensIcon } from "@/components/LensIcon";
import { SearchResults } from "@/components/SearchResults";
import { getOldTestamentBooks, getNewTestamentBooks } from "@/lib/bible";
import { searchBible, parseVerseReference, SearchResult } from "@/lib/search";

// Main page content that uses useSearchParams
function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<"old" | "new">("old");
  const [hasSearched, setHasSearched] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  
  const oldTestamentBooks = getOldTestamentBooks();
  const newTestamentBooks = getNewTestamentBooks();

  // Handle URL query parameter on load
  useEffect(() => {
    const queryFromUrl = searchParams.get('q');
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
      executeSearchWithQuery(queryFromUrl);
    }
  }, [searchParams]);

  // Execute search with a specific query
  const executeSearchWithQuery = (query: string) => {
    const trimmedQuery = query.trim();
    
    if (!trimmedQuery || trimmedQuery.length < 2) {
      return;
    }

    // Check if it's a verse reference first
    const reference = parseVerseReference(trimmedQuery);
    if (reference) {
      const url = reference.verse 
        ? `/bible/${reference.bookId}/${reference.chapter}#verse-${reference.verse}`
        : `/bible/${reference.bookId}/${reference.chapter}`;
      router.push(url);
      return;
    }

    // Perform text search
    setIsSearching(true);
    setHasSearched(true);
    setLastSearchQuery(trimmedQuery);

    setTimeout(() => {
      const results = searchBible(trimmedQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 100);
  };

  // Execute search (called on Enter or button click)
  const executeSearch = () => {
    executeSearchWithQuery(searchQuery);
    // Update URL without navigation
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`, { scroll: false });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
    setLastSearchQuery("");
    router.push("/", { scroll: false });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg-primary)]/80 border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <button onClick={clearSearch} className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
            <LensIcon size={32} animate={false} />
            <span 
              className="text-base font-semibold tracking-wide hidden sm:inline"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              <span className="text-[var(--color-gold-400)]">Bible</span>
              <span className="text-[var(--color-cyan-400)]"> Lens</span>
            </span>
          </button>
          
          {/* Header Search Bar (always visible) */}
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
                  onClick={clearSearch}
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
          
          {/* User menu placeholder */}
          <button className="w-9 h-9 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-border-hover)] transition-colors shrink-0">
            <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Hero Section - only when not showing results */}
        {!hasSearched && (
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
            
            {/* Quick search suggestions */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {["John 3:16", "1 Cor 15:45", "kingdom", "eternal life"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 rounded-full text-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-cyan-500)] hover:text-[var(--color-cyan-400)] transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Search Results or Bible Browser */}
        {hasSearched ? (
          <section className="max-w-3xl mx-auto">
            <SearchResults 
              results={searchResults} 
              query={lastSearchQuery} 
              isSearching={isSearching} 
            />
            
            {/* Show Bible browser below results */}
            {!isSearching && (
              <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
                <h3 className="text-center text-[var(--color-text-muted)] mb-6">
                  Or browse the Bible directly
                </h3>
                <BibleBrowser 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab}
                  oldTestamentBooks={oldTestamentBooks}
                  newTestamentBooks={newTestamentBooks}
                />
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Bible Books Section */}
            <BibleBrowser 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              oldTestamentBooks={oldTestamentBooks}
              newTestamentBooks={newTestamentBooks}
            />

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

// Main export wrapped in Suspense
export default function Home() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomeContent />
    </Suspense>
  );
}

// Loading fallback
function HomeLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LensIcon size={64} />
        <p className="text-[var(--color-text-muted)] mt-4">Loading...</p>
      </div>
    </div>
  );
}

// Extracted Bible Browser component for reuse
interface BibleBrowserProps {
  activeTab: "old" | "new";
  setActiveTab: (tab: "old" | "new") => void;
  oldTestamentBooks: { id: string; name: string; chapters: number }[];
  newTestamentBooks: { id: string; name: string; chapters: number }[];
}

function BibleBrowser({ activeTab, setActiveTab, oldTestamentBooks, newTestamentBooks }: BibleBrowserProps) {
  return (
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
  );
}
