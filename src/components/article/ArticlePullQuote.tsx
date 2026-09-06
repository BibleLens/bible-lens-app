'use client'

interface ArticlePullQuoteProps {
  text: string
  attribution?: string
  position: 'left' | 'right'
  style?: React.CSSProperties
}

export function ArticlePullQuote({ text, attribution, style }: ArticlePullQuoteProps) {
  return (
    <aside className="glass-card p-4 absolute" style={style}>
      <p className="font-newsreader italic text-[20px] leading-[30px] text-[var(--color-commentary-body)]">
        {text}
      </p>
      {attribution && (
        <cite className="block mt-2 font-space-grotesk text-[11px] font-semibold tracking-wider uppercase text-[var(--color-text-muted)] not-italic">
          From the Deep Dive: {attribution}
        </cite>
      )}
    </aside>
  )
}
