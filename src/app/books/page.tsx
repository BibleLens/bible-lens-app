import type { Metadata } from "next";
import { getAllBooks } from "@/lib/bible";
import type { BookMeta } from "@/lib/bible";
import { BooksGrid } from "@/components/BooksGrid";
import { estimateTextHeight, AVG_CHAR_WIDTHS } from "@/lib/pretext";
import { bookMetaMap } from "@/lib/book-meta";

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

// SSR estimation constants
const CARD_CHROME_HEIGHT = 102;
const CARD_MIN_HEIGHT = 118;
const SSR_COL_WIDTH = 280; // conservative estimate for 2-col on 768px viewport
const DESC_LINE_HEIGHT = 20;
const DESC_AVG_CHAR_WIDTH = AVG_CHAR_WIDTHS.manrope16 * (14 / 16); // scale 6.8 to 14px = 5.95

function computeSSRHeights(books: BookMeta[]): number[] {
  return books.map((book) => {
    const meta = bookMetaMap[book.id];
    if (!meta?.context) return CARD_MIN_HEIGHT;
    const textHeight = estimateTextHeight(
      meta.context,
      DESC_AVG_CHAR_WIDTH,
      SSR_COL_WIDTH,
      DESC_LINE_HEIGHT
    );
    return Math.max(CARD_MIN_HEIGHT, CARD_CHROME_HEIGHT + textHeight);
  });
}

export default function BooksPage() {
  const allBooks = getAllBooks();
  const ssrEstimatedHeights = computeSSRHeights(allBooks);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-bg-primary)" }}
    >
      <main id="main-content" className="flex-1 w-full pt-[248px]">
        {/* Editorial hero (BKS-01) */}
        <section
          className="max-w-7xl mx-auto px-6 pt-4 pb-16"
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
          <BooksGrid books={allBooks} ssrEstimatedHeights={ssrEstimatedHeights} />
        </section>
      </main>
    </div>
  );
}
