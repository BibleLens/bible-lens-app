'use client'

import { useMemo } from 'react'
import { prepare, layout } from '@chenglou/pretext'
import { usePretextReady, PRETEXT_FONTS } from '@/lib/pretext'

// ── Layout constants ────────────────────────────────────────────────────────
// CARD_CHROME_HEIGHT: badge row 24 + book name 28 + chapter count 18 + padding 32
export const CARD_CHROME_HEIGHT = 102
// CARD_MIN_HEIGHT: CARD_CHROME_HEIGHT + 16px breathing room
export const CARD_MIN_HEIGHT = 118
// Description text: 14px Manrope regular, 1.43 line-height (20px)
export const DESC_LINE_HEIGHT_PX = 20
// Gap matches Tailwind gap-4
export const GAP = 16

const DESC_FONT = PRETEXT_FONTS.manrope(14)

// ── Breakpoint helpers ───────────────────────────────────────────────────────

/**
 * Returns column count based on container width (NOT window width).
 * Breakpoints match Tailwind md:grid-cols-3 (768px) and lg:grid-cols-4 (1024px).
 */
export function getColumnCount(containerWidth: number): number {
  if (containerWidth >= 1024) return 4
  if (containerWidth >= 768) return 3
  return 2
}

/**
 * Returns column width in pixels, distributing gaps evenly across columns.
 */
export function getColumnWidth(containerWidth: number, columnCount: number): number {
  return Math.floor((containerWidth - GAP * (columnCount - 1)) / columnCount)
}

// ── Position types ───────────────────────────────────────────────────────────

export interface CardPosition {
  x: number
  y: number
  height: number
}

export interface MasonryResult {
  positions: CardPosition[]
  containerHeight: number
}

// ── Core algorithm ───────────────────────────────────────────────────────────

/**
 * Shortest-column-first masonry placement.
 * Cards are placed in canonical order (caller must pass them in Genesis → Revelation order).
 * Per D-04: ties are broken by lowest column index.
 */
export function computeMasonryPositions(
  cardHeights: number[],
  columnCount: number,
  columnWidth: number,
  gap: number
): MasonryResult {
  const colHeights = new Array(columnCount).fill(0) as number[]
  const colX = Array.from({ length: columnCount }, (_, i) => i * (columnWidth + gap))

  const positions: CardPosition[] = cardHeights.map((cardHeight) => {
    const col = colHeights.indexOf(Math.min(...colHeights))
    const pos: CardPosition = { x: colX[col], y: colHeights[col], height: cardHeight }
    colHeights[col] += cardHeight + gap
    return pos
  })

  return { positions, containerHeight: Math.max(...colHeights) }
}

// ── Main hook ────────────────────────────────────────────────────────────────

export interface UseMasonryLayoutResult {
  positions: CardPosition[]
  containerHeight: number
  columnCount: number
  columnWidth: number
  ready: boolean
}

/**
 * Batch-measures all book description strings via Pretext and returns
 * absolute masonry positions using shortest-column-first algorithm.
 *
 * - Gated behind usePretextReady() — never calls prepare() before fonts load.
 * - prepare() (~19ms/call) memoized on [descriptions, fontsReady].
 * - layout() (~0.09ms) memoized on [prepared, columnWidth] — safe for resize.
 * - Returns ready=false and empty positions until fonts are loaded.
 *
 * @param descriptions  Array of description strings in canonical book order.
 * @param containerWidth  Current width of the card grid container in pixels.
 */
export function useMasonryLayout(
  descriptions: string[],
  containerWidth: number
): UseMasonryLayoutResult {
  const fontsReady = usePretextReady()

  const columnCount = getColumnCount(containerWidth)
  const columnWidth = getColumnWidth(containerWidth, columnCount)

  // prepare() is expensive (~19ms per text). Memoize on descriptions + fontsReady.
  // Width-independent: prepare only tokenises/measures glyphs, not line-wrapping.
  const prepared = useMemo(() => {
    if (!fontsReady || columnWidth <= 0) return null
    return descriptions.map((text) => prepare(text, DESC_FONT))
  }, [descriptions, fontsReady]) // eslint-disable-line react-hooks/exhaustive-deps

  // layout() is cheap (~0.09ms). Re-run on every columnWidth change (free on resize per D-09).
  const cardHeights = useMemo(() => {
    if (!prepared || columnWidth <= 0) return []
    return prepared.map((p) => {
      const { height: textHeight } = layout(p, columnWidth, DESC_LINE_HEIGHT_PX)
      return Math.max(CARD_MIN_HEIGHT, CARD_CHROME_HEIGHT + textHeight)
    })
  }, [prepared, columnWidth])

  // Shortest-column-first placement. Re-runs when heights or column layout changes.
  const { positions, containerHeight } = useMemo(() => {
    if (cardHeights.length === 0 || columnWidth <= 0) {
      return { positions: [] as CardPosition[], containerHeight: 0 }
    }
    return computeMasonryPositions(cardHeights, columnCount, columnWidth, GAP)
  }, [cardHeights, columnCount, columnWidth])

  const ready = fontsReady && prepared !== null && positions.length > 0

  return { positions, containerHeight, columnCount, columnWidth, ready }
}
