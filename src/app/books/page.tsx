import type { Metadata } from "next";
import Link from "next/link";
import { getAllBooks } from "@/lib/bible";
import { COMMENTARY_BOOKS } from "@/lib/commentary-index";
import { LensIcon } from "@/components/LensIcon";

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
      <main id="main-content" className="flex-1 w-full pt-16">
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
