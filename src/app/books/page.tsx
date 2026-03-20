import type { Metadata } from "next";
import Link from "next/link";
import { getAllBooks } from "@/lib/bible";
import { COMMENTARY_BOOKS } from "@/lib/commentary-index";
import { LensIcon } from "@/components/LensIcon";
import { ThemeToggle } from "@/components/ThemeToggle";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Bible Books | Bible Lens",
  description:
    "Browse all 66 books of the Bible grouped by category — Pentateuch, History, Poetry, Prophets, Gospels, Epistles, and more.",
  alternates: { canonical: "https://biblelens.faith/books" },
  openGraph: {
    title: "Bible Books | Bible Lens",
    description: "Browse all 66 books of the Bible grouped by category.",
    url: "https://biblelens.faith/books",
    siteName: "Bible Lens",
    type: "website",
  },
};

const BOOK_CATEGORIES = [
  {
    name: "Pentateuch",
    subtitle: "Genesis through Deuteronomy",
    ids: ["genesis", "exodus", "leviticus", "numbers", "deuteronomy"],
  },
  {
    name: "History",
    subtitle: "Joshua through Esther",
    ids: [
      "joshua",
      "judges",
      "ruth",
      "1samuel",
      "2samuel",
      "1kings",
      "2kings",
      "1chronicles",
      "2chronicles",
      "ezra",
      "nehemiah",
      "esther",
    ],
  },
  {
    name: "Poetry & Wisdom",
    subtitle: "Job through Song of Solomon",
    ids: ["job", "psalms", "proverbs", "ecclesiastes", "songofsolomon"],
  },
  {
    name: "Major Prophets",
    subtitle: "Isaiah through Daniel",
    ids: ["isaiah", "jeremiah", "lamentations", "ezekiel", "daniel"],
  },
  {
    name: "Minor Prophets",
    subtitle: "Hosea through Malachi",
    ids: [
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
  },
  {
    name: "Gospels",
    subtitle: "Matthew through John",
    ids: ["matthew", "mark", "luke", "john"],
  },
  {
    name: "Acts",
    subtitle: "The Acts of the Apostles",
    ids: ["acts"],
  },
  {
    name: "Pauline Epistles",
    subtitle: "Romans through Philemon",
    ids: [
      "romans",
      "1corinthians",
      "2corinthians",
      "galatians",
      "ephesians",
      "philippians",
      "colossians",
      "1thessalonians",
      "2thessalonians",
      "1timothy",
      "2timothy",
      "titus",
      "philemon",
    ],
  },
  {
    name: "General Epistles",
    subtitle: "Hebrews through Jude",
    ids: ["hebrews", "james", "1peter", "2peter", "1john", "2john", "3john", "jude"],
  },
  {
    name: "Revelation",
    subtitle: "The Apocalypse of John",
    ids: ["revelation"],
  },
] as const;

export default function BooksPage() {
  const allBooks = getAllBooks();
  const bookMap = Object.fromEntries(allBooks.map((b) => [b.id, b]));

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg-primary)]/80 border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <LensIcon size={48} animate={false} />
            <h1
              className="text-2xl font-semibold tracking-wide"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              <span className="text-[var(--color-gold-400)]">Bible</span>
              <span className="text-[var(--color-cyan-400)]"> Lens</span>
            </h1>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/start-here"
              className="text-lg transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-gold-400)] min-h-[44px] flex items-center"
            >
              Start Here
            </Link>
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Chat
            </Link>
            <Link
              href="/commentary"
              className="text-lg transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-cyan-400)] min-h-[44px] flex items-center font-medium"
            >
              Commentary
            </Link>
            <Link
              href="/books"
              className="text-lg transition-colors font-semibold text-[var(--color-gold-400)] min-h-[44px] flex items-center"
              aria-current="page"
            >
              Books
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Page title */}
        <section className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1
            className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            Bible Books
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            All 66 books of the Bible, grouped by category.
          </p>
        </section>

        {/* Categories */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          {BOOK_CATEGORIES.map((category) => (
            <div key={category.name} className="mb-10">
              <h2
                className="text-xl font-semibold text-[var(--color-text-primary)] mb-1"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                {category.name}
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">{category.subtitle}</p>

              <div className="border-t border-[var(--color-border)]">
                {category.ids.map((id) => {
                  const book = bookMap[id];
                  if (!book) return null;
                  const hasCommentary = COMMENTARY_BOOKS.includes(id as typeof COMMENTARY_BOOKS[number]);
                  return (
                    <Link
                      key={id}
                      href={`/bible/${book.id}`}
                      className={`group flex items-center justify-between px-4 py-4 border-b transition-colors hover:bg-[var(--color-bg-elevated)] ${
                        hasCommentary
                          ? "border-[var(--color-border)] hover:border-[var(--color-gold-400)]"
                          : "border-[var(--color-border)] hover:border-[var(--color-cyan-500)]/50"
                      }`}
                    >
                      <span
                        className={`text-lg font-semibold transition-colors ${
                          hasCommentary
                            ? "text-[var(--color-gold-400)] group-hover:text-[var(--color-gold-300)]"
                            : "text-[var(--color-text-primary)] group-hover:text-[var(--color-cyan-400)]"
                        }`}
                      >
                        {book.name}
                      </span>
                      <span className="flex items-center gap-2">
                        {hasCommentary && <LensIcon size={14} animate={false} />}
                        <span className="text-[var(--color-text-muted)] text-base">
                          {book.chapters} {book.chapters === 1 ? "chapter" : "chapters"}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-base text-[var(--color-text-muted)]">Ancient wisdom, modern clarity.</p>
          <p className="text-base text-[var(--color-text-muted)] mt-2">
            © 2026 Bible Lens. Context Over Tradition.
          </p>
        </div>
      </footer>
    </div>
  );
}
