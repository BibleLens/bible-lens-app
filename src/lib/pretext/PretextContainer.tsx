'use client'
import { type ReactNode } from 'react'
import { useTextLayout } from './useTextLayout'

interface PretextContainerProps {
  /** The text content being measured (same text rendered as children) */
  text: string
  /** Canvas font shorthand, e.g. "400 16px Newsreader". Use PRETEXT_FONTS builders. */
  font: string
  /** Container width in pixels — typically from a ref or known layout value */
  maxWidth: number
  /** Line height in PIXELS (not unitless ratio) */
  lineHeightPx: number
  /** SSR-estimated height in pixels (from estimateTextHeight in a Server Component parent) */
  ssrEstimateHeight: number
  /** Content to render inside the measured container */
  children: ReactNode
  /** Optional className for the outer div */
  className?: string
}

/**
 * Hydration-safe container that transitions from SSR height estimate to Pretext measurement.
 *
 * Server Component parent provides ssrEstimateHeight via estimateTextHeight().
 * This client component starts with min-height = ssrEstimateHeight (matching SSR HTML).
 * After fonts load, useTextLayout produces the true height and min-height is cleared.
 *
 * The transition is INSTANT (no CSS transition) to avoid CLS-scoring reflows.
 * The SSR estimate intentionally over-estimates, so the container shrinks slightly
 * on hydration — which is less jarring than growing and pushing content down.
 *
 * Architecture note (from Research Pitfall 4): The min-height lives on THIS client
 * component's outer div, not on a Server Component wrapper. This avoids React hydration
 * mismatch because the server-rendered HTML and client initial render both produce
 * the same min-height value.
 */
export function PretextContainer({
  text,
  font,
  maxWidth,
  lineHeightPx,
  ssrEstimateHeight,
  children,
  className,
}: PretextContainerProps) {
  const { height: pretextHeight, ready } = useTextLayout(text, font, maxWidth, lineHeightPx)

  // Before fonts ready: use SSR estimate as min-height (matches server HTML)
  // After fonts ready: use Pretext-calculated height (more accurate, usually shorter)
  const containerStyle = ready
    ? { minHeight: `${pretextHeight}px` }
    : { minHeight: `${ssrEstimateHeight}px` }

  return (
    <div className={className} style={containerStyle}>
      {children}
    </div>
  )
}
