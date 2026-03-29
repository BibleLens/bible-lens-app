import type { Metadata } from "next";
import { getAllBooks } from "@/lib/bible";
import { BooksGrid } from "@/components/BooksGrid";

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

export default function BooksPage() {
  const allBooks = getAllBooks();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-bg-primary)" }}
    >
      <main id="main-content" className="flex-1 w-full pt-20">
        {/* Editorial hero (BKS-01) */}
        <section
          className="max-w-7xl mx-auto px-6 py-16"
          style={{ borderTop: "1px solid rgba(0,229,255,0.1)" }}
        >
          <div
            style={{
              borderLeft: "3px solid var(--homepage-primary)",
              paddingLeft: "1.5rem",
            }}
          >
            <p
              className="micro-label mb-3"
              style={{ color: "var(--homepage-primary)" }}
            >
              BIBLE LENS — CANONICAL COLLECTION
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--color-text-primary)",
                lineHeight: 1.1,
              }}
            >
              The Canonical Collection
            </h1>
            <p
              className="mt-4"
              style={{ color: "var(--color-text-muted-warm)", maxWidth: "60ch" }}
            >
              Sixty-six books. Ancient voices speaking to modern seekers.
            </p>
          </div>
        </section>

        {/* Filter tabs + card grid (BKS-02, BKS-03, BKS-04) */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <BooksGrid books={allBooks} />
        </section>
      </main>

      <footer
        className="border-t py-6 mt-auto"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-base" style={{ color: "var(--color-text-muted)" }}>
            Ancient wisdom, modern clarity.
          </p>
          <p
            className="text-base mt-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            &copy; 2026 Bible Lens. Context Over Tradition.
          </p>
        </div>
      </footer>
    </div>
  );
}
