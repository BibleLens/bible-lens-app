/**
 * SSR-safe text height estimation using character-count heuristic.
 * Safe in Server Components — no browser APIs (no document, no canvas).
 *
 * Over-estimates intentionally by ~10-30% to prevent content jump when
 * Pretext reduces to the true height on hydration. A too-tall placeholder
 * that shrinks is less jarring than a too-short placeholder that pushes content down.
 *
 * @param text - The text content to estimate height for
 * @param avgCharWidthPx - Average character width in pixels for the target font.
 *   Use AVG_CHAR_WIDTHS from fonts.ts. Scale linearly for non-16px sizes:
 *   avgCharWidthPx = AVG_CHAR_WIDTHS.newsreader16 * (targetSizePx / 16)
 * @param maxWidthPx - Container width in pixels
 * @param lineHeightPx - Line height in pixels (not unitless ratio)
 * @returns Estimated height in pixels (always >= 0, always integer via Math.ceil)
 */
export function estimateTextHeight(
  text: string,
  avgCharWidthPx: number,
  maxWidthPx: number,
  lineHeightPx: number
): number {
  if (!text || maxWidthPx <= 0 || avgCharWidthPx <= 0 || lineHeightPx <= 0) return 0
  const charsPerLine = Math.floor(maxWidthPx / avgCharWidthPx)
  if (charsPerLine <= 0) return 0
  const estimatedLines = Math.ceil(text.length / charsPerLine)
  return Math.ceil(estimatedLines * lineHeightPx)
}
