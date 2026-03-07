"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LensIcon } from "@/components/LensIcon";
import { BackgroundPaths } from "@/components/BackgroundPaths";
import { NeonButton } from "@/components/NeonButton";
import { getOldTestamentBooks, getNewTestamentBooks } from "@/lib/bible";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollAnimationSection } from "@/components/ScrollAnimationSection";
import { motion, MotionConfig } from "framer-motion";

export function HomeClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"old" | "new">("old");
  const router = useRouter();

  const oldTestamentBooks = getOldTestamentBooks();
  const newTestamentBooks = getNewTestamentBooks();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg-primary)]/80 border-b border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LensIcon size={48} animate={true} />
              <div>
                <h1
                  className="text-2xl font-semibold tracking-wide title-pulse"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  <span className="text-[var(--color-gold-400)]">Bible</span>
                  <span className="text-[var(--color-cyan-400)]"> Lens</span>
                </h1>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="flex items-center gap-4">
              <Link
                href="/search"
                className="text-lg transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-cyan-400)] min-h-[44px] flex items-center"
              >
                Search
              </Link>
              <Link
                href="/chat"
                className="flex items-center gap-1.5 text-lg transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-cyan-400)] min-h-[44px]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full">
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto px-4">
            <section className="text-center py-8 mb-12">
              {/* Animation zone — icon, tagline, search bar */}
              <div className="relative py-8" style={{ isolation: "isolate" }}>
                <BackgroundPaths />

                <div className="relative z-10" style={{ transform: "translateZ(0)" }}>
                  <div className="flex justify-center mb-6">
                    <LensIcon size={80} />
                  </div>
                  <p
                    className="text-[var(--color-text-secondary)] text-lg mb-4"
                    style={{ fontFamily: "var(--font-cinzel), serif" }}
                  >
                    Context Over Tradition
                  </p>
                  <p className="text-[var(--color-text-secondary)] text-xl sm:text-2xl max-w-2xl mx-auto mb-8 leading-relaxed">
                    Read Scripture through the lens of history and archaeology — grounded in ancient context, written in plain language.
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
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchQuery.trim()) {
                          router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                        }
                      }}
                      className="search-input w-full pl-12 pr-4 py-4 rounded-2xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] text-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Below animation — suggestion chips and CTAs sit in normal flow */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {["Who is Jesus?", "Matthew 24", "Kingdom of God", "Last Adam"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => router.push(`/search?q=${encodeURIComponent(suggestion)}`)}
                    className="px-4 py-2 min-h-[44px] flex items-center rounded-full text-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-cyan-500)] hover:text-[var(--color-cyan-400)] transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <NeonButton variant="gold" size="lg" href="#bible-books">
                  Explore the Bible
                </NeonButton>
                <NeonButton variant="cyan" size="lg" href="/chat">
                  Ask a Question
                </NeonButton>
              </div>
            </section>
          </div>

          {/* Scroll Animation Section — full viewport width, no max-width wrapper */}
          <ScrollAnimationSection />

          {/* Value Proposition */}
          <div className="max-w-6xl mx-auto px-4">
            <section className="py-16 space-y-12">
              <h2
                className="text-2xl sm:text-3xl font-semibold text-center mb-8"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                <span className="text-gradient-lens">Why Bible Lens?</span>
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    title: "Grounded in History",
                    body: "Every insight is backed by archaeology, ancient languages, and historical context — not modern assumptions read back into ancient texts.",
                    icon: "🏛️",
                  },
                  {
                    title: "Written for Everyone",
                    body: "No seminary degree required. Complex ideas explained in plain language, like a knowledgeable friend sharing what they've discovered.",
                    icon: "💬",
                  },
                  {
                    title: "Honest Discovery",
                    body: "No agenda, no denomination to defend. Just honest exploration of what the original audience would have understood.",
                    icon: "🔍",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                    className="card p-6 text-center"
                  >
                    <span className="text-3xl mb-4 block">{item.icon}</span>
                    <h3 className="text-lg font-semibold text-[var(--color-gold-400)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                      {item.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Bible Books Section */}
            <section id="bible-books">
              {/* Testament Tabs */}
              <div className="flex gap-1 mb-6 p-1 bg-[var(--color-bg-secondary)] rounded-lg w-fit mx-auto">
                <button
                  onClick={() => setActiveTab("old")}
                  className={`px-6 py-2 rounded-md text-base font-medium transition-colors ${
                    activeTab === "old"
                      ? "bg-[var(--color-bg-elevated)] text-[var(--color-gold-400)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  Old Testament
                </button>
                <button
                  onClick={() => setActiveTab("new")}
                  className={`px-6 py-2 rounded-md text-base font-medium transition-colors ${
                    activeTab === "new"
                      ? "bg-[var(--color-bg-elevated)] text-[var(--color-cyan-400)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  New Testament
                </button>
              </div>

              {/* Both grids always in DOM — Googlebot sees all 66 books */}
              <div className={activeTab === "old" ? "block" : "hidden"}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {oldTestamentBooks.map((book) => (
                    <Link key={book.id} href={`/bible/${book.id}`} className="card p-4 text-left hover:border-[var(--color-cyan-500)]/50 group">
                      <p className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-cyan-400)] transition-colors truncate">{book.name}</p>
                      <p className="text-base text-[var(--color-text-muted)] mt-1">{book.chapters} {book.chapters === 1 ? "chapter" : "chapters"}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className={activeTab === "new" ? "block" : "hidden"}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {newTestamentBooks.map((book) => (
                    <Link key={book.id} href={`/bible/${book.id}`} className="card p-4 text-left hover:border-[var(--color-cyan-500)]/50 group">
                      <p className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-cyan-400)] transition-colors truncate">{book.name}</p>
                      <p className="text-base text-[var(--color-text-muted)] mt-1">{book.chapters} {book.chapters === 1 ? "chapter" : "chapters"}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[var(--color-border)] py-6 mt-auto">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-base text-[var(--color-text-muted)]">
              Ancient wisdom, modern clarity.
            </p>
            <p className="text-base text-[var(--color-text-muted)] mt-2">
              © 2026 Bible Lens. Context Over Tradition.
            </p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
