import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook, findBookById, getAdjacentBooks } from "@/lib/bible";
import { LensIcon } from "@/components/LensIcon";
import { chapterHasCommentary } from "@/lib/commentary-index";

interface BookPageProps {
  params: Promise<{ bookId: string }>;
}

export async function generateMetadata({ params }: BookPageProps) {
  const { bookId } = await params;
  const bookMeta = findBookById(bookId);
  
  if (!bookMeta) {
    return { title: "Book Not Found | Bible Lens" };
  }
  
  return {
    title: `${bookMeta.name} | Bible Lens`,
    description: `Read ${bookMeta.name} from the Berean Standard Bible with historical context and commentary.`,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { bookId } = await params;
  const book = getBook(bookId);
  const bookMeta = findBookById(bookId);
  
  if (!book || !bookMeta) {
    notFound();
  }
  
  const { prev, next } = getAdjacentBooks(bookId);
  const chapters = Object.keys(book.chapters).map(Number).sort((a, b) => a - b);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg-primary)]/80 border-b border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <LensIcon size={48} animate={false} />
            <span 
              className="text-2xl font-semibold tracking-wide"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              <span className="text-[var(--color-gold-400)]">Bible</span>
              <span className="text-[var(--color-cyan-400)]"> Lens</span>
            </span>
          </Link>
          
          {/* Book navigation */}
          <div className="flex items-center gap-2 text-base">
            {prev && (
              <Link
                href={`/bible/${prev.id}`}
                className="px-3 py-1.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-colors"
              >
                ← {prev.abbr}
              </Link>
            )}
            {next && (
              <Link
                href={`/bible/${next.id}`}
                className="px-3 py-1.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-colors"
              >
                {next.abbr} →
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {/* Book Title */}
        <div className="text-center mb-8">
          <p className="text-lg text-[var(--color-text-muted)] mb-2">
            {bookMeta.testament === 'OT' ? 'Old Testament' : 'New Testament'}
          </p>
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            <span className={bookMeta.testament === 'OT' ? 'text-[var(--color-gold-400)]' : 'text-[var(--color-cyan-400)]'}>
              {bookMeta.name}
            </span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            {chapters.length} {chapters.length === 1 ? 'Chapter' : 'Chapters'}
          </p>
        </div>

        {/* Chapter Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {chapters.map((chapter) => {
            const hasCommentary = chapterHasCommentary(bookId, chapter);
            return (
              <Link
                key={chapter}
                href={`/bible/${bookId}/${chapter}`}
                title={hasCommentary ? "Bible Lens commentary" : undefined}
                className={`relative aspect-square flex items-center justify-center rounded-lg bg-[var(--color-bg-secondary)] font-medium transition-colors ${
                  hasCommentary
                    ? "border border-[var(--color-gold-500)] text-[var(--color-gold-400)] hover:border-[var(--color-gold-400)] hover:bg-[var(--color-gold-500)]/10"
                    : "border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-cyan-500)] hover:text-[var(--color-cyan-400)]"
                }`}
              >
                {chapter}
                {hasCommentary && (
                  <span className="absolute top-0.5 right-0.5">
                    <LensIcon size={12} animate={false} />
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick jump to chapter 1 */}
        <div className="mt-8 text-center">
          <Link
            href={`/bible/${bookId}/1`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--color-gold-500)] to-[var(--color-cyan-500)] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Start Reading {bookMeta.name}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-base text-[var(--color-text-muted)]">
            Berean Standard Bible • Context Over Tradition
          </p>
        </div>
      </footer>
    </div>
  );
}

