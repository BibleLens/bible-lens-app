import type { Metadata } from "next";
import Link from "next/link";
import {
  COMMENTARY_CHAPTERS,
  COMMENTARY_BOOKS,
  THEMATIC_SECTIONS,
  COMMENTARY_TEASERS,
  READING_PATHS,
} from "@/lib/commentary-index";
import { findBookById } from "@/lib/bible";
import { EmailCapture } from "@/components/EmailCapture";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Bible Commentary | Bible Lens",
  description:
    "55 chapters of historically-grounded commentary on Genesis, Daniel, Revelation, Isaiah, Ezekiel, and Matthew — organised by theme and book.",
  alternates: { canonical: "https://biblelens.faith/commentary" },
};

function getBookDisplayName(bookId: string): string {
  return findBookById(bookId)?.name ?? bookId;
}

export default function CommentaryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
      <main id="main-content" className="flex-1 w-full pt-16">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            <span className="text-[var(--color-gold-400)]">Bible Lens</span>{" "}
            <span className="text-[var(--color-text-primary)]">Commentary</span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            55 chapters of historically-grounded commentary across 6 books of the Bible. Through
            this lens, ancient wisdom meets modern clarity.
          </p>

          {/* Jump links */}
          <nav className="flex flex-wrap justify-center gap-3 mt-8" aria-label="Jump to section">
            {THEMATIC_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-4 py-2 rounded-full text-base border border-[var(--color-gold-500)]/40 text-[var(--color-gold-400)] hover:border-[var(--color-gold-400)] hover:bg-[var(--color-gold-400)]/10 transition-colors"
              >
                {section.title}
              </a>
            ))}
            <a
              href="#reading-paths"
              className="px-4 py-2 rounded-full text-base border border-[var(--color-gold-500)]/40 text-[var(--color-gold-400)] hover:border-[var(--color-gold-400)] hover:bg-[var(--color-gold-400)]/10 transition-colors"
            >
              Reading Paths
            </a>
            <a
              href="#by-book"
              className="px-4 py-2 rounded-full text-base border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-cyan-500)] hover:text-[var(--color-cyan-400)] transition-colors"
            >
              By Book
            </a>
          </nav>
        </section>

        {/* Thematic Sections */}
        <section className="max-w-6xl mx-auto px-4 pb-12 space-y-16">
          {THEMATIC_SECTIONS.map((section) => (
            <div key={section.id} id={section.id}>
              <h2
                className="text-2xl sm:text-3xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                <span className="text-[var(--color-gold-400)]">{section.title}</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-6">{section.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.chapterKeys.map((key) => {
                  const [bookId, chapterStr] = key.split("-");
                  const chapter = parseInt(chapterStr, 10);
                  const bookName = getBookDisplayName(bookId);
                  const teaser = COMMENTARY_TEASERS[key] ?? "";
                  return (
                    <Link
                      key={key}
                      href={`/bible/${bookId}/${chapter}`}
                      className="card p-4 text-left group border-l-2 border-l-[var(--color-gold-500)] hover:border-l-[var(--color-gold-400)] transition-colors"
                    >
                      <p
                        className="text-base font-semibold text-[var(--color-gold-400)] group-hover:text-[var(--color-gold-300)] mb-1 transition-colors"
                        style={{ fontFamily: "var(--font-cinzel), serif" }}
                      >
                        {bookName} {chapter}
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {teaser}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Reading Paths Section */}
        <section id="reading-paths" className="max-w-6xl mx-auto px-4 pb-16">
          <h2
            className="text-2xl sm:text-3xl font-semibold mb-2"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            <span className="text-[var(--color-gold-400)]">Reading Paths</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Curated journeys through related commentary chapters, each tracing a theological thread across books.
          </p>
          <div className="space-y-10">
            {READING_PATHS.map((path) => (
              <div key={path.id}>
                <h3
                  className="text-xl font-semibold text-[var(--color-gold-400)] mb-2"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  {path.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-4">{path.throughLine}</p>
                <ol className="space-y-2 list-decimal list-inside">
                  {path.steps.map((step) => (
                    <li key={`${step.bookId}-${step.chapter}`} className="text-sm">
                      <Link
                        href={`/bible/${step.bookId}/${step.chapter}`}
                        className="text-[var(--color-gold-400)] hover:text-[var(--color-gold-300)] transition-colors"
                      >
                        {getBookDisplayName(step.bookId)} {step.chapter}
                      </Link>
                      <span className="text-[var(--color-text-muted)] ml-2">— {step.annotation}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* By Book Section */}
        <section id="by-book" className="max-w-6xl mx-auto px-4 pb-16">
          <h2
            className="text-2xl sm:text-3xl font-semibold mb-8"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            <span className="text-[var(--color-text-primary)]">By Book</span>
          </h2>
          <div className="space-y-10">
            {COMMENTARY_BOOKS.map((bookId) => {
              const chapters = COMMENTARY_CHAPTERS[bookId] ?? [];
              const bookName = getBookDisplayName(bookId);
              return (
                <div key={bookId}>
                  <h3
                    className="text-xl font-semibold text-[var(--color-gold-400)] mb-4"
                    style={{ fontFamily: "var(--font-cinzel), serif" }}
                  >
                    {bookName}
                  </h3>
                  <ul className="space-y-3">
                    {chapters.map((chapter) => {
                      const key = `${bookId}-${chapter}`;
                      const teaser = COMMENTARY_TEASERS[key] ?? "";
                      return (
                        <li key={key}>
                          <Link
                            href={`/bible/${bookId}/${chapter}`}
                            className="group flex gap-3 items-start hover:text-[var(--color-gold-400)] transition-colors"
                          >
                            <span className="shrink-0 text-sm font-medium text-[var(--color-gold-500)] group-hover:text-[var(--color-gold-400)] pt-0.5 min-w-[4rem]">
                              Ch. {chapter}
                            </span>
                            <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] leading-relaxed transition-colors">
                              {teaser}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Email Capture */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <EmailCapture />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-base text-[var(--color-text-muted)]">
            Ancient wisdom, modern clarity.
          </p>
          <p className="text-base text-[var(--color-text-muted)] mt-2">
            <Link href="/" className="hover:text-[var(--color-cyan-400)] transition-colors">
              Back to Bible Lens
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
