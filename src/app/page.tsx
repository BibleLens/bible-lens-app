"use client";

import { useState } from "react";
import { LensIcon } from "@/components/LensIcon";

const BIBLE_BOOKS = {
  oldTestament: [
    { name: "Genesis", abbr: "Gen", chapters: 50 },
    { name: "Exodus", abbr: "Exod", chapters: 40 },
    { name: "Leviticus", abbr: "Lev", chapters: 27 },
    { name: "Numbers", abbr: "Num", chapters: 36 },
    { name: "Deuteronomy", abbr: "Deut", chapters: 34 },
    { name: "Joshua", abbr: "Josh", chapters: 24 },
    { name: "Judges", abbr: "Judg", chapters: 21 },
    { name: "Ruth", abbr: "Ruth", chapters: 4 },
    { name: "1 Samuel", abbr: "1Sam", chapters: 31 },
    { name: "2 Samuel", abbr: "2Sam", chapters: 24 },
    { name: "1 Kings", abbr: "1Kgs", chapters: 22 },
    { name: "2 Kings", abbr: "2Kgs", chapters: 25 },
    { name: "1 Chronicles", abbr: "1Chr", chapters: 29 },
    { name: "2 Chronicles", abbr: "2Chr", chapters: 36 },
    { name: "Ezra", abbr: "Ezra", chapters: 10 },
    { name: "Nehemiah", abbr: "Neh", chapters: 13 },
    { name: "Esther", abbr: "Esth", chapters: 10 },
    { name: "Job", abbr: "Job", chapters: 42 },
    { name: "Psalms", abbr: "Ps", chapters: 150 },
    { name: "Proverbs", abbr: "Prov", chapters: 31 },
    { name: "Ecclesiastes", abbr: "Eccl", chapters: 12 },
    { name: "Song of Solomon", abbr: "Song", chapters: 8 },
    { name: "Isaiah", abbr: "Isa", chapters: 66 },
    { name: "Jeremiah", abbr: "Jer", chapters: 52 },
    { name: "Lamentations", abbr: "Lam", chapters: 5 },
    { name: "Ezekiel", abbr: "Ezek", chapters: 48 },
    { name: "Daniel", abbr: "Dan", chapters: 12 },
    { name: "Hosea", abbr: "Hos", chapters: 14 },
    { name: "Joel", abbr: "Joel", chapters: 3 },
    { name: "Amos", abbr: "Amos", chapters: 9 },
    { name: "Obadiah", abbr: "Obad", chapters: 1 },
    { name: "Jonah", abbr: "Jonah", chapters: 4 },
    { name: "Micah", abbr: "Mic", chapters: 7 },
    { name: "Nahum", abbr: "Nah", chapters: 3 },
    { name: "Habakkuk", abbr: "Hab", chapters: 3 },
    { name: "Zephaniah", abbr: "Zeph", chapters: 3 },
    { name: "Haggai", abbr: "Hag", chapters: 2 },
    { name: "Zechariah", abbr: "Zech", chapters: 14 },
    { name: "Malachi", abbr: "Mal", chapters: 4 },
  ],
  newTestament: [
    { name: "Matthew", abbr: "Matt", chapters: 28 },
    { name: "Mark", abbr: "Mark", chapters: 16 },
    { name: "Luke", abbr: "Luke", chapters: 24 },
    { name: "John", abbr: "John", chapters: 21 },
    { name: "Acts", abbr: "Acts", chapters: 28 },
    { name: "Romans", abbr: "Rom", chapters: 16 },
    { name: "1 Corinthians", abbr: "1Cor", chapters: 16 },
    { name: "2 Corinthians", abbr: "2Cor", chapters: 13 },
    { name: "Galatians", abbr: "Gal", chapters: 6 },
    { name: "Ephesians", abbr: "Eph", chapters: 6 },
    { name: "Philippians", abbr: "Phil", chapters: 4 },
    { name: "Colossians", abbr: "Col", chapters: 4 },
    { name: "1 Thessalonians", abbr: "1Thess", chapters: 5 },
    { name: "2 Thessalonians", abbr: "2Thess", chapters: 3 },
    { name: "1 Timothy", abbr: "1Tim", chapters: 6 },
    { name: "2 Timothy", abbr: "2Tim", chapters: 4 },
    { name: "Titus", abbr: "Titus", chapters: 3 },
    { name: "Philemon", abbr: "Phlm", chapters: 1 },
    { name: "Hebrews", abbr: "Heb", chapters: 13 },
    { name: "James", abbr: "Jas", chapters: 5 },
    { name: "1 Peter", abbr: "1Pet", chapters: 5 },
    { name: "2 Peter", abbr: "2Pet", chapters: 3 },
    { name: "1 John", abbr: "1John", chapters: 5 },
    { name: "2 John", abbr: "2John", chapters: 1 },
    { name: "3 John", abbr: "3John", chapters: 1 },
    { name: "Jude", abbr: "Jude", chapters: 1 },
    { name: "Revelation", abbr: "Rev", chapters: 22 },
  ],
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"old" | "new">("old");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg-primary)]/80 border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          </div>
          
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
        <section className="text-center mb-12">
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
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search verses, topics, or ask a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input w-full pl-12 pr-4 py-4 rounded-2xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] text-lg"
            />
          </div>
          
          {/* Quick search suggestions */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["Who is Jesus?", "Matthew 24", "Kingdom of God", "Last Adam"].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSearchQuery(suggestion)}
                className="px-4 py-2 rounded-full text-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-cyan-500)] hover:text-[var(--color-cyan-400)] transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </section>

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
            {(activeTab === "old" ? BIBLE_BOOKS.oldTestament : BIBLE_BOOKS.newTestament).map((book) => (
              <button
                key={book.abbr}
                className="card p-4 text-left hover:border-[var(--color-cyan-500)]/50 group"
              >
                <p className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-cyan-400)] transition-colors truncate">
                  {book.name}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {book.chapters} {book.chapters === 1 ? "chapter" : "chapters"}
                </p>
              </button>
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
              },
              {
                title: "The Kingdom",
                description: "What Jesus actually taught about the coming Kingdom of God.",
                icon: "👑",
                color: "cyan",
              },
              {
                title: "Matthew 24",
                description: "When was the 'end of the age' Jesus predicted? Historical context reveals the answer.",
                icon: "📜",
                color: "gold",
              },
            ].map((topic) => (
              <button
                key={topic.title}
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
              </button>
            ))}
          </div>
        </section>
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
