import { notFound } from 'next/navigation'
import { getBook, findBookById } from '@/lib/bible'
import { estimateTextHeight, AVG_CHAR_WIDTHS } from '@/lib/pretext'
import { PsalmsFullView } from '@/components/psalms/PsalmsFullView'
import { CHAPTER_HEADER_PX } from '@/components/psalms/useVirtualPsalms'

// ── SSR constants ─────────────────────────────────────────────────────────────

/** Number of chapters to include with full verse content in SSR payload */
const SSR_RENDER_COUNT = 5

/** Default container width for SSR height estimation */
const SSR_COL_WIDTH = 640

/** Verse font size in pixels */
const VERSE_FONT_SIZE_PX = 18

/** Must match VERSE_LINE_HEIGHT_PX in useVirtualPsalms */
const VERSE_LINE_HEIGHT_PX = 32

/**
 * Average character width scaled from 16px baseline to 18px.
 * AVG_CHAR_WIDTHS.newsreader16 = 7.0, scaled: 7.0 * (18/16) = 7.875
 */
const AVG_CHAR_W = AVG_CHAR_WIDTHS.newsreader16 * (VERSE_FONT_SIZE_PX / 16)

// ── Route types ───────────────────────────────────────────────────────────────

interface FullPageProps {
  params: Promise<{ bookId: string }>
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: FullPageProps) {
  const { bookId } = await params
  if (bookId !== 'psalms') return { title: 'Not Found | Bible Lens' }
  return {
    title: 'Psalms - Full Text | Bible Lens',
    description: 'Read all 150 Psalms in a single continuous view with smooth navigation.',
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

/**
 * Server Component route for /bible/[bookId]/full.
 *
 * Currently gated to Psalms only — VIRT-03. Non-psalms bookIds return 404.
 * Serves as proof-of-concept for full-book virtual scroll before generalizing.
 *
 * SSR strategy:
 * - Renders first SSR_RENDER_COUNT chapters with real verse content (no blank flash).
 * - Estimates heights for all 150 chapters via character-count heuristic.
 * - Passes allChapters to client for virtual list lookups (~211KB JSON, ~50KB gzipped).
 *   Lazy-fetch alternative deferred to XPRE-02.
 */
export default async function FullPage({ params }: FullPageProps) {
  const { bookId } = await params

  // Gate: only Psalms supported in this proof-of-concept (VIRT-03)
  if (bookId !== 'psalms') notFound()

  const book = getBook(bookId)
  const bookMeta = findBookById(bookId)
  if (!book || !bookMeta) notFound()

  // Build ordered chapter number array
  const chapterNums = Object.keys(book.chapters).map(Number).sort((a, b) => a - b)

  // Compute SSR height estimates for all chapters using character-count heuristic.
  // Over-estimates by ~10-30% intentionally — shrinks on hydration (less jarring than growth).
  const ssrHeights = chapterNums.map((ch) => {
    const verses = book.chapters[ch.toString()]
    const text = verses.map((v) => v.text).join(' ')
    return estimateTextHeight(text, AVG_CHAR_W, SSR_COL_WIDTH, VERSE_LINE_HEIGHT_PX) + CHAPTER_HEADER_PX
  })

  // Extract first 5 chapters with verse arrays for SSR content
  const ssrChapters = chapterNums.slice(0, SSR_RENDER_COUNT).map((ch) => ({
    chapterNum: ch,
    verses: book.chapters[ch.toString()],
  }))

  return (
    <div className="min-h-screen flex flex-col">
      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-6 pt-12 pb-8">
        <h1
          className="text-3xl font-bold text-center mb-6 text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-newsreader)' }}
        >
          Psalms — Full Text
        </h1>
        <PsalmsFullView
          chapterNums={chapterNums}
          ssrHeights={ssrHeights}
          ssrChapters={ssrChapters}
          allChapters={book.chapters}
          bookMeta={bookMeta}
        />
      </main>
    </div>
  )
}
