'use client'
import { useState, useEffect } from 'react'

/**
 * Returns true only after document.fonts.ready has resolved.
 * ALL Pretext prepare() calls MUST be gated behind this hook.
 * Calling prepare() before fonts are ready causes canvas to measure with
 * fallback fonts, producing permanently wrong cached measurements.
 */
export function usePretextReady(): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    document.fonts.ready.then(() => {
      setReady(true)
    })
  }, [])

  return ready
}
