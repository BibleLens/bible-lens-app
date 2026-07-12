'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { prepareWithSegments, layoutNextLine, layout } from '@chenglou/pretext'
import type { LayoutCursor } from '@chenglou/pretext'
import { usePretextReady } from '@/lib/pretext'
import type { ArticleBlock } from '@/lib/articles/types'
import { ArticleDropCap, measureDropCapWidth, DROP_CAP_GAP, DROP_CAP_LINES } from './ArticleDropCap'
import { ArticlePullQuote } from './ArticlePullQuote'
import { ArticleScriptureInset } from './ArticleScriptureInset'

// ─── Constants ───────────────────────────────────────────────────────────────

const BODY_FONT = '400 18px "Newsreader"'
const BODY_LINE_HEIGHT = 28 // px
const PULL_QUOTE_FONT = 'italic 400 20px "Newsreader"'
const PULL_QUOTE_LINE_HEIGHT = 30 // px
const COLUMN_GAP = 32 // xl token — gutter between columns
const MOBILE_BREAKPOINT = 768 // px
const PULL_QUOTE_PADDING = 16 // p-4 = 16px

// ─── Types ────────────────────────────────────────────────────────────────────

interface ArticleLayoutProps {
  blocks: ArticleBlock[]
  ssrEstimateHeight: number
}

interface LineElement {
  key: string
  text: string
  x: number
  y: number
  width: number
}

interface LayoutResult {
  elements: React.ReactNode[]
  totalHeight: number
}

// ─── Hook: useContainerWidth ──────────────────────────────────────────────────

function useContainerWidth(): [React.RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setWidth(entry.contentRect.width)
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, width]
}

// ─── SSR Fallback Renderer ────────────────────────────────────────────────────

function renderSSRBlock(block: ArticleBlock, index: number): React.ReactNode {
  switch (block.type) {
    case 'heading':
      return block.level === 2 ? (
        <h2
          key={index}
          className="font-newsreader text-[28px] leading-[34px] text-[#e2e2e2] mt-8 mb-4 border-l-2 border-[#00E5FF] pl-4"
        >
          {block.text}
        </h2>
      ) : null
    case 'paragraph':
      return (
        <p key={index} className="mb-4">
          {block.text}
        </p>
      )
    case 'scriptureInset':
      return (
        <ArticleScriptureInset
          key={index}
          reference={block.reference}
          verses={block.verses}
        />
      )
    case 'pullQuote':
      return (
        <aside
          key={index}
          className="glass-card p-4 my-6 font-newsreader italic text-[20px] leading-[30px] text-[#e2e2e2]"
        >
          <p>{block.text}</p>
          {block.attribution && (
            <cite className="block mt-2 font-space-grotesk text-[11px] font-semibold tracking-wider uppercase text-[#a3a3a3] not-italic">
              {block.attribution}
            </cite>
          )}
        </aside>
      )
    default:
      return null
  }
}

// ─── Layout Engine ────────────────────────────────────────────────────────────

function layoutBlocks(blocks: ArticleBlock[], columnWidth: number): LayoutResult {
  const elements: React.ReactNode[] = []
  let totalHeight = 0

  // Column A starts at x=0, Column B starts at x = columnWidth + COLUMN_GAP
  const colAX = 0
  const colBX = columnWidth + COLUMN_GAP

  // We track two sections: current column A lines and column B lines
  // When we hit a full-width break (heading, scriptureInset), we flush both columns first.
  let colALines: LineElement[] = []
  let colBLines: LineElement[] = []
  let colAY = 0 // current Y in column A
  let colBY = 0 // current Y in column B (where next line would go)
  let sectionStartY = 0 // Y offset for the current two-column section

  function flushColumns() {
    // Find the max height of both columns in this section
    const sectionHeight = Math.max(colAY, colBY)
    if (sectionHeight === 0) return

    // Render all column A lines
    for (const line of colALines) {
      elements.push(
        <span
          key={line.key}
          className="absolute font-newsreader text-[18px] text-[#e2e2e2] whitespace-pre"
          style={{
            left: `${line.x}px`,
            top: `${line.y}px`,
            width: `${line.width}px`,
          }}
        >
          {line.text}
        </span>
      )
    }
    // Render all column B lines
    for (const line of colBLines) {
      elements.push(
        <span
          key={line.key}
          className="absolute font-newsreader text-[18px] text-[#e2e2e2] whitespace-pre"
          style={{
            left: `${line.x}px`,
            top: `${line.y}px`,
            width: `${line.width}px`,
          }}
        >
          {line.text}
        </span>
      )
    }

    totalHeight = sectionStartY + sectionHeight
    colALines = []
    colBLines = []
    colAY = 0
    colBY = 0
    sectionStartY = totalHeight
  }

  let blockIndex = 0

  for (const block of blocks) {
    if (block.type === 'heading') {
      // Full-width break: flush current columns, render heading, restart
      flushColumns()

      if (block.level === 2) {
        const headingY = totalHeight + 32 // mt-8 = 32px
        elements.push(
          <h2
            key={`heading-${blockIndex}`}
            className="absolute font-newsreader text-[28px] leading-[34px] text-[#e2e2e2] border-l-2 border-[#00E5FF] pl-4"
            style={{
              left: 0,
              top: `${headingY}px`,
              width: '100%',
            }}
          >
            {block.text}
          </h2>
        )
        // heading height = 34px line height + mb-4 (16px) = 50px
        totalHeight = headingY + 34 + 16
        sectionStartY = totalHeight
      }
    } else if (block.type === 'scriptureInset') {
      // Full-width break: flush columns, render scripture inset, restart
      flushColumns()

      const insetY = totalHeight + 24 // my-6 = 24px top
      elements.push(
        <div
          key={`scripture-${blockIndex}`}
          className="absolute w-full"
          style={{ top: `${insetY}px`, left: 0 }}
        >
          <ArticleScriptureInset
            reference={block.reference}
            verses={block.verses}
          />
        </div>
      )

      // Estimate scripture inset height: header + verses + footer
      // Approximate: 32px label + verses * 28px + 24px cite + 16px padding
      const insetEstimatedHeight = 32 + block.verses.length * 28 + 24 + 32
      totalHeight = insetY + insetEstimatedHeight + 24 // my-6 bottom
      sectionStartY = totalHeight
    } else if (block.type === 'pullQuote') {
      // Pull quote floats within the current column pair
      // Determine which column this pull quote belongs to based on its position
      // If column A is not full yet, it goes in column A; otherwise column B
      const pqWidth = Math.floor(columnWidth * block.widthFraction)
      const pqTextPrepared = prepareWithSegments(block.text, PULL_QUOTE_FONT)
      const pqInnerWidth = pqWidth - PULL_QUOTE_PADDING * 2
      const pqResult = layout(pqTextPrepared, pqInnerWidth, PULL_QUOTE_LINE_HEIGHT)
      const pqHeight = pqResult.height + PULL_QUOTE_PADDING * 2 + (block.attribution ? 32 : 0)

      // Place the pull quote in column A (current position)
      const pqY = sectionStartY + colAY
      const isLeft = block.position === 'left'
      const pqX = isLeft ? colAX : colAX + columnWidth - pqWidth

      elements.push(
        <ArticlePullQuote
          key={`pullquote-${blockIndex}`}
          text={block.text}
          attribution={block.attribution}
          position={block.position}
          style={{
            left: `${pqX}px`,
            top: `${pqY}px`,
            width: `${pqWidth}px`,
          }}
        />
      )

      // Advance colAY by the pull quote height (obstacle occupies this space)
      colAY += pqHeight
    } else if (block.type === 'paragraph') {
      const text = block.text

      if (block.dropCap) {
        // Drop cap paragraph: extract first character, measure, flow around it
        const firstChar = text.charAt(0)
        const remainingText = text.slice(1)
        const dropCapWidth = measureDropCapWidth(firstChar)
        const reducedWidth = columnWidth - dropCapWidth - DROP_CAP_GAP

        const prepared = prepareWithSegments(remainingText, BODY_FONT)
        let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }
        let lineIndex = 0

        // Render the drop cap element
        const dropCapY = sectionStartY + colAY
        elements.push(
          <ArticleDropCap
            key={`dropcap-${blockIndex}`}
            char={firstChar}
          />
        )
        // Position the drop cap absolutely
        elements.push(
          <span
            key={`dropcap-pos-${blockIndex}`}
            aria-hidden="true"
            className="absolute font-newsreader text-[54px] select-none"
            style={{
              left: `${colAX}px`,
              top: `${dropCapY}px`,
              color: '#facc15',
              lineHeight: '0.8',
              // Drop cap visual height ≈ 54 * 0.8 = ~43px, covers ~3 body lines of 28px each
            }}
          >
            {firstChar}
          </span>
        )

        const dropCapXOffset = dropCapWidth + DROP_CAP_GAP

        // Flow remaining text: first DROP_CAP_LINES lines are narrower (beside drop cap)
        let colAFull = false
        const TARGET_COLUMN_HEIGHT = 600

        while (true) {
          const isInDropCapZone = lineIndex < DROP_CAP_LINES
          const maxWidth = isInDropCapZone ? reducedWidth : columnWidth
          const xOffset = isInDropCapZone ? dropCapXOffset : 0
          const currentY = colAFull ? colBY : colAY

          const line = layoutNextLine(prepared, cursor, maxWidth)
          if (!line) break

          const lineY = sectionStartY + currentY
          const lineX = (colAFull ? colBX : colAX) + xOffset

          const lineEl: LineElement = {
            key: `p-${blockIndex}-line-${lineIndex}`,
            text: line.text,
            x: lineX,
            y: lineY,
            width: line.width,
          }

          if (colAFull) {
            colBLines.push(lineEl)
            colBY += BODY_LINE_HEIGHT
          } else {
            colALines.push(lineEl)
            colAY += BODY_LINE_HEIGHT
            if (colAY >= TARGET_COLUMN_HEIGHT) {
              colAFull = true
            }
          }

          cursor = line.end
          lineIndex++
        }

        // Add paragraph bottom margin
        if (!colAFull) colAY += 16
        else colBY += 16
      } else {
        // Normal paragraph
        const prepared = prepareWithSegments(text, BODY_FONT)
        let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }
        let lineIndex = 0
        let colAFull = false
        const TARGET_COLUMN_HEIGHT = 600

        while (true) {
          const currentY = colAFull ? colBY : colAY
          const maxWidth = columnWidth
          const colX = colAFull ? colBX : colAX

          const line = layoutNextLine(prepared, cursor, maxWidth)
          if (!line) break

          const lineY = sectionStartY + currentY
          const lineEl: LineElement = {
            key: `p-${blockIndex}-line-${lineIndex}`,
            text: line.text,
            x: colX,
            y: lineY,
            width: line.width,
          }

          if (colAFull) {
            colBLines.push(lineEl)
            colBY += BODY_LINE_HEIGHT
          } else {
            colALines.push(lineEl)
            colAY += BODY_LINE_HEIGHT
            if (colAY >= TARGET_COLUMN_HEIGHT) {
              colAFull = true
            }
          }

          cursor = line.end
          lineIndex++
        }

        // Add paragraph bottom margin
        if (!colAFull) colAY += 16
        else colBY += 16
      }
    }

    blockIndex++
  }

  // Flush any remaining columns
  flushColumns()

  return { elements, totalHeight }
}

// ─── ArticleLayout Component ─────────────────────────────────────────────────

export function ArticleLayout({ blocks, ssrEstimateHeight }: ArticleLayoutProps) {
  const ready = usePretextReady()
  const [containerRef, containerWidth] = useContainerWidth()
  const isMobile = containerWidth > 0 && containerWidth < MOBILE_BREAKPOINT

  const columnWidth = useMemo(() => {
    if (containerWidth === 0) return 0
    return Math.floor((containerWidth - COLUMN_GAP) / 2)
  }, [containerWidth])

  // Full Pretext multi-column layout
  const layoutResult = useMemo<LayoutResult | null>(() => {
    if (!ready || containerWidth === 0) return null
    if (isMobile) return null // mobile uses CSS flow

    return layoutBlocks(blocks, columnWidth)
  }, [ready, containerWidth, isMobile, columnWidth, blocks])

  return (
    <div ref={containerRef} className="relative w-full">
      {layoutResult ? (
        // Pretext-rendered two-column layout
        <div className="relative" style={{ height: `${layoutResult.totalHeight}px` }}>
          {layoutResult.elements}
        </div>
      ) : (
        // SSR fallback / mobile: simple block rendering with minHeight
        <div
          style={{ minHeight: `${ssrEstimateHeight}px` }}
          className="text-[#e2e2e2] font-newsreader text-[18px] leading-[28px]"
        >
          {blocks.map((block, i) => renderSSRBlock(block, i))}
        </div>
      )}
    </div>
  )
}
