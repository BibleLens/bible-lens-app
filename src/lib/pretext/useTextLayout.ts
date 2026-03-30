'use client'
import { useMemo } from 'react'
import { prepare, layout } from '@chenglou/pretext'
import { usePretextReady } from './usePretextReady'

export interface TextLayoutResult {
  height: number
  lineCount: number
  ready: boolean
}

/**
 * Measures text layout using Pretext. Returns { height, lineCount, ready }.
 *
 * - `font`: Canvas font shorthand, e.g. "400 16px Newsreader". Use PRETEXT_FONTS builders.
 * - `maxWidth`: Container width in pixels.
 * - `lineHeightPx`: Line height in PIXELS (not unitless ratio). For 16px font with 1.5 ratio, pass 24.
 * - `ready`: false until fonts are loaded and measurement is complete.
 *
 * prepare() (~19ms) is memoized on [text, font, fontsReady].
 * layout() (~0.09ms) re-runs on every maxWidth/lineHeightPx change (safe for resize).
 */
export function useTextLayout(
  text: string,
  font: string,
  maxWidth: number,
  lineHeightPx: number
): TextLayoutResult {
  const fontsReady = usePretextReady()

  // prepare() is expensive (~19ms per call) — only re-run when text, font, or ready state changes
  const prepared = useMemo(() => {
    if (!fontsReady || !text.trim() || maxWidth <= 0) return null
    return prepare(text, font)
  }, [text, font, fontsReady])

  // layout() is cheap (~0.09ms) — safe to re-run on every maxWidth or lineHeight change
  const result = useMemo<TextLayoutResult>(() => {
    if (!prepared || maxWidth <= 0 || lineHeightPx <= 0) {
      return { height: 0, lineCount: 0, ready: false }
    }
    const layoutResult = layout(prepared, maxWidth, lineHeightPx)
    return { height: layoutResult.height, lineCount: layoutResult.lineCount, ready: true }
  }, [prepared, maxWidth, lineHeightPx])

  return result
}
