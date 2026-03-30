'use client'

interface ArticleDropCapProps {
  char: string
  color?: string
}

export function ArticleDropCap({ char, color = '#facc15' }: ArticleDropCapProps) {
  return (
    <span
      aria-hidden="true"
      className="float-left font-newsreader text-[54px] leading-[1] font-normal select-none"
      style={{
        color,
        marginRight: '8px', // DROP_CAP_GAP = 8px (sm token)
        lineHeight: '0.8', // Tight line-height so cap sits flush with first line
      }}
    >
      {char}
    </span>
  )
}

// Canvas-based drop cap width measurement.
// Must be called AFTER usePretextReady() returns true (fonts loaded).
export function measureDropCapWidth(char: string): number {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  ctx.font = '400 54px "Newsreader"' // Drop cap font string per UI-SPEC
  return Math.ceil(ctx.measureText(char).width)
}

export const DROP_CAP_FONT_SIZE = 54
export const DROP_CAP_GAP = 8
export const DROP_CAP_LINES = 3
