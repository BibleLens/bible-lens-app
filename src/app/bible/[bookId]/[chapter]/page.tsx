import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapter, getBook, findBookById, getAdjacentBooks } from "@/lib/bible";
import { Header } from "@/components/Header";

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
      {/* Header with Search */}
      <Header />

      {/* Secondary Navigation Bar */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link 
              href={`/bible/${bookId}`}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-cyan-400)] transition-colors"
            >
              {bookMeta.name}
            </Link>
            <span className="text-[var(--color-text-muted)]">/</span>
            <span className="text-[var(--color-text-primary)] font-medium">
              Chapter {chapterNum}
            </span>
          </div>
          
          {/* Chapter navigation */}
          <div className="flex items-center gap-1">
            {prevLink && (
              <Link 
                href={prevLink}
                className="p-2 rounded-lg hover:bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
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
                className="p-2 rounded-lg hover:bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                title={nextLabel || undefined}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        {/* Chapter Title */}
        <div className="text-center mb-8">
          <h1 
            className="text-3xl font-bold"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            <span className={bookMeta.testament === 'OT' ? 'text-[var(--color-gold-400)]' : 'text-[var(--color-cyan-400)]'}>
              {bookMeta.name} {chapterNum}
            </span>
          </h1>
        </div>

        {/* Verses */}
        <div className="space-y-4">
          {verses.map((verse) => (
            <p 
              key={verse.verse}
              id={`verse-${verse.verse}`}
              className="text-lg leading-relaxed text-[var(--color-scripture)] scroll-mt-32 target:bg-[var(--color-cyan-500)]/10 target:rounded-lg target:p-2 target:-mx-2 transition-colors"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <span className="verse-number">{verse.verse}</span>
              {verse.text}
            </p>
          ))}
        </div>

        {/* Chapter Navigation */}
        <div className="mt-12 flex items-center justify-between gap-4">
          {prevLink ? (
            <Link
              href={prevLink}
              className="flex-1 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors text-left"
            >
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Previous</p>
              <p className="font-medium text-[var(--color-text-primary)]">← {prevLabel}</p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          
          <Link
            href={`/bible/${bookId}`}
            className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors text-center"
          >
            <p className="text-xs text-[var(--color-text-muted)] mb-1">All Chapters</p>
            <p className="font-medium text-[var(--color-text-primary)]">{bookMeta.name}</p>
          </Link>
          
          {nextLink ? (
            <Link
              href={nextLink}
              className="flex-1 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors text-right"
            >
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Next</p>
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
          <p className="text-xs text-[var(--color-text-muted)]">
            Berean Standard Bible • Context Over Tradition
          </p>
        </div>
      </footer>
    </div>
  );
}
