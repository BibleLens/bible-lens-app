import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapter, getBook, findBookById, getAdjacentBooks } from "@/lib/bible";
import { LensIcon } from "@/components/LensIcon";
import { CommentaryPanel } from "@/components/CommentaryPanel";
import { BackButton } from "@/components/BackButton";

interface ChapterPageProps {
  params: Promise<{ bookId: string; chapter: string }>;
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { bookId, chapter } = await params;
  const bookMeta = findBookById(bookId);
  
  if (!bookMeta) {
    return { title: "Not Found | Bible Lens" };
  }
  
  return {
    title: `${bookMeta.name} ${chapter} | Bible Lens`,
    description: `Read ${bookMeta.name} chapter ${chapter} from the Berean Standard Bible with historical context and commentary.`,
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { bookId, chapter: chapterStr } = await params;
  const chapterNum = parseInt(chapterStr, 10);
  
  const book = getBook(bookId);
  const bookMeta = findBookById(bookId);
  const verses = getChapter(bookId, chapterNum);
  
  if (!book || !bookMeta || !verses) {
    notFound();
  }
  
  const { prev: prevBook, next: nextBook } = getAdjacentBooks(bookId);
  const totalChapters = book.chapterCount;

  const hasCommentary =
    (bookId === "genesis" && chapterNum >= 1 && chapterNum <= 3) ||
    (bookId === "matthew" && chapterNum === 24);

  const hasPrevChapter = chapterNum > 1;
  const hasNextChapter = chapterNum < totalChapters;
  
  // Determine prev/next navigation
  const prevLink = hasPrevChapter 
    ? `/bible/${bookId}/${chapterNum - 1}`
    : prevBook 
      ? `/bible/${prevBook.id}/${prevBook.chapters}`
      : null;
      
  const nextLink = hasNextChapter
    ? `/bible/${bookId}/${chapterNum + 1}`
    : nextBook
      ? `/bible/${nextBook.id}/1`
      : null;
  
  const prevLabel = hasPrevChapter
    ? `${bookMeta.abbr} ${chapterNum - 1}`
    : prevBook
      ? `${prevBook.abbr} ${prevBook.chapters}`
      : null;
      
  const nextLabel = hasNextChapter
    ? `${bookMeta.abbr} ${chapterNum + 1}`
    : nextBook
      ? `${nextBook.abbr} 1`
      : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg-primary)]/80 border-b border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton />
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <LensIcon size={40} animate={false} />
              <span
                className="text-2xl font-semibold tracking-wide hidden sm:inline"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                <span className="text-[var(--color-gold-400)]">Bible</span>
                <span className="text-[var(--color-cyan-400)]"> Lens</span>
              </span>
            </Link>
          </div>

          {/* Current location */}
          <Link
            href={`/bible/${bookId}`}
            className="text-base font-medium text-[var(--color-text-primary)] hover:text-[var(--color-cyan-400)] transition-colors min-h-[44px] flex items-center"
          >
            {bookMeta.name} {chapterNum}
          </Link>
          
          {/* Chapter navigation */}
          <div className="flex items-center gap-1 text-base">
            {prevLink && (
              <Link 
                href={prevLink}
                className="p-2.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={prevLabel || undefined}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            )}
            {nextLink && (
              <Link 
                href={nextLink}
                className="p-2.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={nextLabel || undefined}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        {/* Chapter Title */}
        <div className="text-center mb-8">
          <Link
            href={`/bible/${bookId}`}
            className="text-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
          >
            {bookMeta.testament === 'OT' ? 'Old Testament' : 'New Testament'} • {bookMeta.name}
          </Link>
          <h1 
            className="text-3xl font-bold mt-2"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            <span className={bookMeta.testament === 'OT' ? 'text-[var(--color-gold-400)]' : 'text-[var(--color-cyan-400)]'}>
              Chapter {chapterNum}
            </span>
          </h1>
        </div>

        {/* Verses */}
        <div className="space-y-4">
          {verses.map((verse) => (
            <p 
              key={verse.verse} 
              className="text-xl leading-relaxed text-[var(--color-scripture)]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <span className="verse-number">{verse.verse}</span>
              {verse.text}
            </p>
          ))}
        </div>

        {/* Commentary Panel — only for genesis 1-3 and matthew 24 */}
        {hasCommentary && (
          <div className="mt-8">
            <CommentaryPanel book={bookId} chapter={chapterNum} />
          </div>
        )}

        {/* Chapter Navigation */}
        <div className="mt-12 flex items-center justify-between gap-4">
          {prevLink ? (
            <Link
              href={prevLink}
              className="flex-1 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors text-left"
            >
              <p className="text-base text-[var(--color-text-muted)] mb-1">Previous</p>
              <p className="font-medium text-[var(--color-text-primary)]">← {prevLabel}</p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          
          <Link
            href={`/bible/${bookId}`}
            className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors text-center"
          >
            <p className="text-base text-[var(--color-text-muted)] mb-1">All Chapters</p>
            <p className="font-medium text-[var(--color-text-primary)]">{bookMeta.name}</p>
          </Link>
          
          {nextLink ? (
            <Link
              href={nextLink}
              className="flex-1 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors text-right"
            >
              <p className="text-base text-[var(--color-text-muted)] mb-1">Next</p>
              <p className="font-medium text-[var(--color-text-primary)]">{nextLabel} →</p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
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

