'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import type { Verse, BookMeta } from '@/lib/bible-meta'
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
 * - Sticky Jump-to-Psalm nav with bidirectional scroll sync: selecting scrolls to chapter,
 *   scrolling updates the select to reflect the current visible Psalm.
 */
export function PsalmsFullView({
  chapterNums,
  ssrHeights,
  ssrChapters: _ssrChapters,
  allChapters,
  bookMeta: _bookMeta,
}: PsalmsFullViewProps) {
  // Guard: no chapters to render
  if (chapterNums.length === 0) {
    return (
      <p className="text-center text-[var(--color-text-muted)] py-8">
        Couldn&apos;t load Psalms. Try refreshing the page.
      </p>
    )
  }

  return <PsalmsFullViewInner
    chapterNums={chapterNums}
    ssrHeights={ssrHeights}
    ssrChapters={_ssrChapters}
    allChapters={allChapters}
    bookMeta={_bookMeta}
  />
}

/**
 * Inner component rendered only when chapterNums.length > 0.
 * Hooks are always called unconditionally here (no conditional hook issue).
 */
function PsalmsFullViewInner({
  chapterNums,
  ssrHeights,
  allChapters,
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

  // ── Jump-to-Psalm: current Psalm derived from visible range ──────────────────
  // visibleRange already tracks scroll via the threshold-based scroll listener
  // in useVirtualPsalms, so no additional scroll event listener is needed here.
  const currentPsalm = useMemo(() => {
    const scrollTop = typeof window !== 'undefined' ? window.scrollY : 0
    for (let i = visibleRange[1]; i >= visibleRange[0]; i--) {
      if (cumulativeOffsets[i] <= scrollTop + 100) return chapterNums[i]
    }
    return chapterNums[0]
  }, [visibleRange, cumulativeOffsets, chapterNums])

  // ── Jump-to-Psalm: scroll callback ──────────────────────────────────────────
  const scrollToChapter = useCallback(
    (chapterIndex: number) => {
      window.scrollTo({ top: cumulativeOffsets[chapterIndex], behavior: 'smooth' })
    },
    [cumulativeOffsets]
  )

  return (
    <>
      {/* Jump-to-Psalm sticky nav bar */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between h-11 px-4 md:px-6 border-b border-[var(--color-border)]"
        style={{
          backgroundColor: 'rgba(var(--color-bg-secondary-rgb, 17,17,17), 0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <label
          htmlFor="jump-to-psalm"
          className="text-sm font-semibold text-[var(--color-text-muted)]"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Jump to Psalm
        </label>
        <select
          id="jump-to-psalm"
          aria-label="Jump to Psalm"
          value={currentPsalm}
          onChange={(e) => {
            const chapterNum = Number(e.target.value)
            const index = chapterNums.indexOf(chapterNum)
            if (index >= 0) scrollToChapter(index)
          }}
          className="h-9 px-3 text-sm font-semibold border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] focus:outline-2 focus:outline-[var(--color-cyan-400)] focus:outline-offset-2"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {chapterNums.map((ch) => (
            <option key={ch} value={ch}>
              Psalm {ch}
            </option>
          ))}
        </select>
      </nav>

      {/* Virtual list container — absolute-positioned chapters inside */}
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
    </>
  )
}
