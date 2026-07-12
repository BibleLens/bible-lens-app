'use client'

import { useState, useEffect, useMemo } from 'react'
import { prepare, layout } from '@chenglou/pretext'
import { usePretextReady, PRETEXT_FONTS } from '@/lib/pretext'

// ── Layout constants ────────────────────────────────────────────────────────

/** Newsreader 18px regular — must match CSS font exactly for accurate measurement */
export const VERSE_FONT = PRETEXT_FONTS.newsreader(18)

/** 18px * 1.78 rounded — must match CSS line-height exactly */
export const VERSE_LINE_HEIGHT_PX = 32

/** Chapter heading + top/bottom padding overhead in pixels */
export const CHAPTER_HEADER_PX = 80

/** Chapters to keep in DOM above/below viewport */
export const BUFFER_CHAPTERS = 3

/** Default container width for SSR (used to avoid zero-height flash on hydration) */
export const SSR_COL_WIDTH = 640

// ── Return type ──────────────────────────────────────────────────────────────

export interface VirtualPsalmsResult {
  heights: number[]
  cumulativeOffsets: number[]
  totalHeight: number
  visibleRange: [number, number]
  ready: boolean
}

// ── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Virtualizes a list of chapters using Pretext batch prepare/layout for height
 * calculation and threshold-based scroll tracking to minimize re-renders.
 *
 * - `prepare()` (~19ms per chapter) gated behind fonts-ready and memoized on text content.
 * - `layout()` (~0.09ms) re-runs on containerWidth change (resize-safe).
 * - Scroll listener uses 25% viewport threshold to avoid 60fps re-renders.
 * - Falls back to ssrHeights until fonts are ready and Pretext has measured.
 *
 * @param chapterTexts  Array of joined verse text per chapter (index = chapter index).
 * @param containerWidth  Current container width in pixels (from ResizeObserver).
 * @param ssrHeights  Pre-estimated heights from server (character-count heuristic).
 */
export function useVirtualPsalms(
  chapterTexts: string[],
  containerWidth: number,
  ssrHeights: number[]
): VirtualPsalmsResult {
  const fontsReady = usePretextReady()

  // Scroll and viewport state — initialized to SSR-safe values, updated from window in effect
  const [scrollY, setScrollY] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(900)

  // Attach scroll + resize listeners after hydration
  useEffect(() => {
    // Initialize from current window values on the next frame — synchronous
    // setState in an effect body triggers a cascading re-render before paint
    const initFrame = requestAnimationFrame(() => {
      setScrollY(window.scrollY)
      setViewportHeight(window.innerHeight)
    })

    const onScroll = () => {
      setScrollY((prev) => {
        const y = window.scrollY
        // Only re-render if scroll moved more than 25% of viewport height
        const threshold = viewportHeight * 0.25
        return Math.abs(y - prev) > threshold ? y : prev
      })
    }

    const onResize = () => {
      setViewportHeight(window.innerHeight)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(initFrame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Batch prepare() ─────────────────────────────────────────────────────────
  // prepare() tokenises and measures glyphs — width-independent, expensive (~19ms each).
  // Gated on fontsReady so canvas measures with correct web fonts.
  // containerWidth intentionally omitted from deps — prepare is width-independent.
  const prepared = useMemo(() => {
    if (!fontsReady || containerWidth <= 0) return null
    return chapterTexts.map((text) => prepare(text, VERSE_FONT))
  }, [chapterTexts, fontsReady]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Batch layout() ──────────────────────────────────────────────────────────
  // layout() resolves line wrapping at a specific width — cheap (~0.09ms), re-runs on resize.
  const pretextHeights = useMemo(() => {
    if (!prepared || containerWidth <= 0) return null
    return prepared.map((p) => layout(p, containerWidth, VERSE_LINE_HEIGHT_PX).height + CHAPTER_HEADER_PX)
  }, [prepared, containerWidth])

  // Use Pretext heights when ready, fall back to SSR heuristic estimates
  const heights = pretextHeights ?? ssrHeights

  // ── Cumulative offsets (prefix sum) ─────────────────────────────────────────
  const { cumulativeOffsets, totalHeight } = useMemo(() => {
    const offsets: number[] = []
    let y = 0
    for (const h of heights) {
      offsets.push(y)
      y += h
    }
    return { cumulativeOffsets: offsets, totalHeight: y }
  }, [heights])

  // ── Visible range (binary search) ───────────────────────────────────────────
  const visibleRange = useMemo((): [number, number] => {
    if (heights.length === 0) return [0, 0]

    const topBound = scrollY - viewportHeight * 0.5
    const bottomBound = scrollY + viewportHeight * 1.5

    // Binary search for first chapter whose bottom edge > topBound
    let lo = 0
    let hi = heights.length - 1
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      const bottomEdge = cumulativeOffsets[mid] + heights[mid]
      if (bottomEdge > topBound) {
        hi = mid
      } else {
        lo = mid + 1
      }
    }

    // Linear scan from lo to find last chapter whose top < bottomBound
    let end = lo
    while (end < heights.length - 1 && cumulativeOffsets[end] < bottomBound) {
      end++
    }

    // Clamp with buffer
    const rangeStart = Math.max(0, lo - BUFFER_CHAPTERS)
    const rangeEnd = Math.min(heights.length - 1, end + BUFFER_CHAPTERS)

    return [rangeStart, rangeEnd]
  }, [scrollY, viewportHeight, heights, cumulativeOffsets])

  return {
    heights,
    cumulativeOffsets,
    totalHeight,
    visibleRange,
    ready: pretextHeights !== null,
  }
}
