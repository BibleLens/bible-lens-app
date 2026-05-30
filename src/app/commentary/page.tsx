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
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-obsidian)" }}
    >
      <main id="main-content" className="flex-1 w-full pt-[248px]">

        {/* Editorial Hero (CMT-01) */}
        <section
          className="grain-overlay flex items-end pt-2 pb-12 px-6"
          style={{ background: "var(--color-obsidian)" }}
        >
          <div className="max-w-6xl mx-auto w-full">
            <span className="micro-label text-[var(--color-cyan-400)] mb-4 block">
              THE SCHOLARLY ARCHIVE
            </span>
            <div className="border-l-2 border-[var(--color-cyan-400)] pl-6">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--color-text-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The Scholarly Archive
              </h1>
              <p className="text-[var(--color-text-muted-warm)] mt-3 max-w-2xl text-lg">
                55 chapters of historically-grounded commentary across 6 books of the Bible.
                Ancient wisdom, modern clarity.
              </p>
            </div>
          </div>
        </section>

        {/* Asymmetric Bento Grid — Topic Categories (CMT-02) */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bento-grid">
            {THEMATIC_SECTIONS.map((section, index) => {
              const isFocus = index === 0;
              return (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  className={
                    isFocus
                      ? "col-span-12 md:col-span-8 row-span-2 glass-card group p-10 flex flex-col justify-end min-h-[300px]"
                      : "col-span-12 md:col-span-4 glass-card group p-8 flex flex-col justify-end min-h-[200px]"
                  }
                >
                  <div className="shimmer-layer" />
                  <div className="relative z-10">
                    <span className="micro-label text-[var(--color-cyan-400)] mb-3 block">
                      {section.title.toUpperCase()}
                    </span>
                    <h2
                      className={
                        isFocus
                          ? "text-3xl font-semibold text-[var(--color-text-primary)]"
                          : "text-2xl font-semibold text-[var(--color-text-primary)]"
                      }
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {section.title}
                    </h2>
                    <span className="micro-label text-[var(--color-text-muted-warm)] mt-2 block">
                      {section.chapterKeys.length} CHAPTERS
                    </span>
                    <div className="animate-content mt-4">
                      <p className="text-[var(--color-text-muted-warm)] text-sm leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Diamond Divider */}
        <div className="diamond-divider max-w-6xl mx-auto my-8" />

        {/* Thematic Chapter Sections (CMT-03) */}
        <section
          className="max-w-6xl mx-auto px-6 pb-12 space-y-16"
          style={{ background: "var(--color-obsidian)" }}
        >
          {THEMATIC_SECTIONS.map((section) => (
            <section key={section.id} id={section.id}>
              <h2
                className="text-2xl sm:text-3xl font-semibold text-[var(--color-text-primary)] mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {section.title}
              </h2>
              <p className="text-[var(--color-text-muted-warm)] mb-6">{section.description}</p>
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
                      className="glass-card p-4 text-left group"
                    >
                      <div className="shimmer-layer" />
                      <div className="relative z-10">
                        <p
                          className="text-base font-semibold text-[var(--color-cyan-400)] group-hover:text-[var(--color-cyan-300)] mb-1 transition-colors"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {bookName} {chapter}
                        </p>
                        <p className="text-sm text-[var(--color-text-muted-warm)] leading-relaxed">
                          {teaser}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </section>

        {/* Reading Paths Section */}
        <section
          id="reading-paths"
          className="max-w-6xl mx-auto px-6 pb-16"
          style={{ background: "var(--color-obsidian)" }}
        >
          <h2
            className="text-2xl sm:text-3xl font-semibold text-[var(--color-text-primary)] mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Reading Paths
          </h2>
          <p className="text-[var(--color-text-muted-warm)] mb-8">
            Curated journeys through related commentary chapters, each tracing a theological thread
            across books.
          </p>
          <div className="space-y-10">
            {READING_PATHS.map((path) => (
              <div key={path.id}>
                <h3
                  className="text-xl font-semibold text-[var(--color-cyan-400)] mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {path.title}
                </h3>
                <p className="text-[var(--color-text-muted-warm)] mb-4">{path.throughLine}</p>
                <ol className="space-y-2 list-decimal list-inside">
                  {path.steps.map((step) => (
                    <li key={`${step.bookId}-${step.chapter}`} className="text-sm">
                      <Link
                        href={`/bible/${step.bookId}/${step.chapter}`}
                        className="text-[var(--color-cyan-400)] hover:text-[var(--color-cyan-300)] transition-colors"
                      >
                        {getBookDisplayName(step.bookId)} {step.chapter}
                      </Link>
                      <span className="text-[var(--color-text-muted-warm)] ml-2">
                        — {step.annotation}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* By Book Section */}
        <section
          id="by-book"
          className="max-w-6xl mx-auto px-6 pb-16"
          style={{ background: "var(--color-obsidian)" }}
        >
          <h2
            className="text-2xl sm:text-3xl font-semibold text-[var(--color-text-primary)] mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            By Book
          </h2>
          <div className="space-y-10">
            {COMMENTARY_BOOKS.map((bookId) => {
              const chapters = COMMENTARY_CHAPTERS[bookId] ?? [];
              const bookName = getBookDisplayName(bookId);
              return (
                <div key={bookId}>
                  <h3
                    className="text-xl font-semibold text-[var(--color-cyan-400)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
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
                            className="group flex gap-3 items-start hover:text-[var(--color-cyan-400)] transition-colors"
                          >
                            <span className="shrink-0 text-sm font-medium text-[var(--color-cyan-400)] group-hover:text-[var(--color-cyan-300)] pt-0.5 min-w-[4rem]">
                              Ch. {chapter}
                            </span>
                            <span className="text-sm text-[var(--color-text-muted-warm)] group-hover:text-[var(--color-text-primary)] leading-relaxed transition-colors">
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

        {/* Email CTA (CMT-04) */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="glass-card p-10">
            <EmailCapture
              headline="Contribute to the Archive"
              subtext="New commentary drops monthly — historically grounded, no spam, just fresh perspectives on ancient texts."
            />
          </div>
        </section>

      </main>
    </div>
  );
}
