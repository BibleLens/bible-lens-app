'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import type { Verse, BookMeta } from '@/lib/bible'
import { useVirtualPsalms, SSR_COL_WIDTH } from './useVirtualPsalms'

// ── Props ────────────────────────────────────────────────────────────────────

interface PsalmsFullViewProps {
  chapterNums: number[]
  ssrHeights: number[]
  ssrChapters: { chapterNum: number; verses: Verse[] }[]
  allChapters: Record<string, Verse[]>
  bookMeta: BookMeta
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Renders all 150 Psalms in a virtual scroll list.
 *
 * - Only ~10 chapters are in the DOM at any scroll position (4 visible + 3 buffer each side).
 * - Off-screen chapters are represented by aria-hidden spacer divs with Pretext-calculated heights.
 * - Container width is tracked via ResizeObserver — initialized to SSR_COL_WIDTH (not 0)
 *   to avoid zero-height flash before the observer fires.
 * - No loading skeleton needed — SSR delivers first 5 chapters with real verse content.
 */
export function PsalmsFullView({
  chapterNums,
  ssrHeights,
  ssrChapters: _ssrChapters,
  allChapters,
  bookMeta: _bookMeta,
}: PsalmsFullViewProps) {
  // Container width via ResizeObserver — initialized to SSR_COL_WIDTH (640), NOT 0
  // to avoid zero-height flash per virtual list pitfall (see RESEARCH.md Pitfall 5)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(SSR_COL_WIDTH)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        setContainerWidth(entry.contentRect.width)
      }
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Precompute joined verse text per chapter for Pretext batch measurement
  const chapterTexts = useMemo(
    () =>
      chapterNums.map((ch) => {
        const verses = allChapters[ch.toString()]
        return verses ? verses.map((v) => v.text).join(' ') : ''
      }),
    [chapterNums, allChapters]
  )

  // Virtual list state from hook
  const { heights, cumulativeOffsets, totalHeight, visibleRange } =
    useVirtualPsalms(chapterTexts, containerWidth, ssrHeights)

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: totalHeight }}
    >
      {chapterNums.map((chapterNum, i) => {
        const isVisible = i >= visibleRange[0] && i <= visibleRange[1]

        if (isVisible) {
          const verses = allChapters[chapterNum.toString()] ?? []
          return (
            <div
              key={chapterNum}
              id={`psalm-${chapterNum}`}
              style={{
                position: 'absolute',
                top: cumulativeOffsets[i],
                width: '100%',
              }}
              className="pb-6 border-b border-[var(--color-border)]"
            >
              <h2
                className="text-xl font-semibold pt-6 pb-2"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Psalm {chapterNum}
              </h2>
              {verses.map((v: Verse) => (
                <p
                  key={v.verse}
                  style={{
                    fontFamily: 'var(--font-newsreader)',
                    fontSize: '18px',
                    lineHeight: '32px',
                  }}
                  className="text-[var(--color-text-primary)]"
                >
                  <span className="verse-number">{v.verse}</span>
                  {v.text}
                </p>
              ))}
            </div>
          )
        }

        // Off-screen: spacer div preserves scroll height without rendering verse content
        return (
          <div
            key={chapterNum}
            id={`psalm-${chapterNum}`}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: cumulativeOffsets[i],
              height: heights[i],
              width: '100%',
            }}
          />
        )
      })}
    </div>
  )
}
