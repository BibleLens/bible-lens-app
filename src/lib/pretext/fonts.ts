// Font string builders for canvas / Pretext measurement.
// These use the actual Google Fonts family names (not next/font CSS variable hashes).
// document.fonts.ready resolves these by their real name.
// IMPORTANT: system-ui is excluded — Canvas/DOM resolve it differently on macOS.

export const PRETEXT_FONTS = {
  newsreader: (sizePx: number, weight: 400 | 700 = 400) =>
    `${weight} ${sizePx}px Newsreader`,
  manrope: (sizePx: number, weight: 400 | 700 = 400) =>
    `${weight} ${sizePx}px Manrope`,
  sourceSans3: (sizePx: number, weight: 400 | 700 = 400) =>
    `${weight} ${sizePx}px "Source Sans 3"`,
  spaceGrotesk: (sizePx: number, weight: 400 | 600 = 400) =>
    `${weight} ${sizePx}px "Space Grotesk"`,
} as const

// Empirical avgCharWidth values at 16px (used by SSR estimation in Plan 02).
// Scale linearly: multiply by (targetSizePx / 16) for other sizes.
export const AVG_CHAR_WIDTHS = {
  newsreader16: 7.0,
  manrope16: 6.8,
  sourceSans3_16: 6.5,
  spaceGrotesk16: 7.2,
} as const
