'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import type { BookMeta } from '@/lib/bible'
import { bookMetaMap } from '@/lib/book-meta'
import { COMMENTARY_BOOKS } from '@/lib/commentary-index'
import { useMasonryLayout } from './useMasonryLayout'

// ── Props ────────────────────────────────────────────────────────────────────

export interface MasonryBooksGridProps {
  books: BookMeta[]
  ssrEstimatedHeights: number[]
  canonicalIndexMap: Record<string, number>
}

// ── BookCard sub-component ───────────────────────────────────────────────────

interface BookCardProps {
  book: BookMeta
  canonicalIndex: number
  style: React.CSSProperties
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void
}

function BookCard({ book, canonicalIndex, style, onMouseMove, onMouseLeave }: BookCardProps) {
  const meta = bookMetaMap[book.id]
  const hasCommentary = COMMENTARY_BOOKS.includes(book.id)

  return (
    <div
      className="glass-card group relative cursor-pointer overflow-hidden"
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="shimmer-layer" />
      <div className="card-spotlight" />

      <Link
        href={`/bible/${book.id}`}
        className="absolute inset-0 p-4 flex flex-col justify-between z-10"
      >
        {/* Top row: badge + LENS indicator */}
        <div className="flex items-center justify-between">
          <span
            className="micro-label"
            style={{ color: 'var(--homepage-primary)' }}
          >
            {String(canonicalIndex).padStart(2, '0')}/66
          </span>
          {hasCommentary && (
            <span
              className="micro-label"
              style={{ color: 'var(--color-gold-400)' }}
            >
              LENS
            </span>
          )}
        </div>

        {/* Bottom: book name + chapter count */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
            className="text-lg font-semibold"
          >
            {book.name}
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {book.chapters} {book.chapters === 1 ? 'ch' : 'chs'}
          </p>
        </div>
      </Link>

      {/* Metadata overlay (revealed on hover via animate-content) */}
      <div
        className="absolute inset-0 flex flex-col justify-start p-4 pt-6 pb-6 overflow-y-auto animate-content z-20 opacity-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 group-hover:pointer-events-auto"
        style={{
          background: 'rgba(5,5,8,0.92)',
        }}
      >
        {meta ? (
          <>
            <div className="mb-2">
              <p
                className="micro-label mb-0.5"
                style={{ color: 'var(--homepage-primary)' }}
              >
                AUTHOR
              </p>
              <p
                className="text-xs"
                style={{ color: 'var(--color-text-muted-warm)' }}
              >
                {meta.author}
              </p>
            </div>
            <div className="mb-2">
              <p
                className="micro-label mb-0.5"
                style={{ color: 'var(--homepage-primary)' }}
              >
                DATE
              </p>
              <p
                className="text-xs"
                style={{ color: 'var(--color-text-muted-warm)' }}
              >
                {meta.date}
              </p>
            </div>
            <div>
              <p
                className="micro-label mb-0.5"
                style={{ color: 'var(--homepage-primary)' }}
              >
                CONTEXT
              </p>
              <p
                className="text-xs"
                style={{ color: 'var(--color-text-muted-warm)' }}
              >
                {meta.context}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

/**
 * MasonryBooksGrid — client component that renders the books index as masonry.
 *
 * **Two render modes:**
 * - Mode A (SSR / pre-ready): CSS grid with ssrEstimatedHeights, no JS required.
 * - Mode B (Masonry): Absolute-positioned cards after fonts resolve via Pretext.
 *
 * **Positioning strategy:** Uses `left`/`top` (NOT `transform: translate`).
 * The `.glass-card:hover` CSS uses `transform: scale rotateX rotateY` — any
 * `transform` on the same element would conflict.
 *
 * **Transition:** 300ms ease-out on `left` and `top` for SSR-to-masonry animation.
 *
 * **Reduced motion:** Respects `prefers-reduced-motion: reduce` — transition is
 * disabled and 3D tilt handlers are skipped.
 */
export function MasonryBooksGrid({
  books,
  ssrEstimatedHeights,
  canonicalIndexMap,
}: MasonryBooksGridProps) {
  // ── Container width tracking ───────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // ── Reduced motion preference ──────────────────────────────────────────────
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // ── Description extraction ─────────────────────────────────────────────────
  const descriptions = useMemo(
    () => books.map((b) => bookMetaMap[b.id]?.context ?? ''),
    [books]
  )

  // ── Masonry layout ─────────────────────────────────────────────────────────
  const { positions, containerHeight, columnWidth, ready } = useMasonryLayout(
    descriptions,
    containerWidth
  )

  // ── Mouse handlers (3D tilt) ───────────────────────────────────────────────
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--rx', `${-y * 12}deg`)
    el.style.setProperty('--ry', `${x * 12}deg`)
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  // ── Transition style ───────────────────────────────────────────────────────
  const transitionStyle = reducedMotion
    ? 'none'
    : 'left 300ms ease-out, top 300ms ease-out, opacity 300ms ease-out'

  // ── Render: Mode A — SSR / pre-ready ──────────────────────────────────────
  if (!ready || containerWidth === 0) {
    return (
      <div
        ref={containerRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {books.map((book, i) => (
          <BookCard
            key={book.id}
            book={book}
            canonicalIndex={canonicalIndexMap[book.id] ?? i + 1}
            style={{ minHeight: ssrEstimatedHeights[i] ?? 160 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    )
  }

  // ── Render: Mode B — Absolute-positioned masonry ───────────────────────────
  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: containerHeight }}
    >
      {books.map((book, i) => (
        <BookCard
          key={book.id}
          book={book}
          canonicalIndex={canonicalIndexMap[book.id] ?? i + 1}
          style={{
            position: 'absolute',
            left: positions[i]?.x ?? 0,
            top: positions[i]?.y ?? 0,
            width: columnWidth,
            height: positions[i]?.height,
            transition: transitionStyle,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  )
}
