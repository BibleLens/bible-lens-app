interface ArticleHeroProps {
  title: string
  subtitle?: string
  author: string
  publishedAt: string
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function ArticleHero({ title, subtitle, author, publishedAt }: ArticleHeroProps) {
  return (
    <header className="px-8 max-w-[1200px] mx-auto pt-16 pb-12">
      <span className="micro-label">DEEP DIVE</span>
      <h1 className="font-newsreader text-[40px] leading-[48px] font-normal text-[#e2e2e2] mt-4">
        {title}
      </h1>
      {subtitle && (
        <p className="font-newsreader text-[18px] leading-[28px] text-[#e8e8ec] mt-3">
          {subtitle}
        </p>
      )}
      <div className="flex items-center gap-3 mt-4">
        <span className="font-space-grotesk text-[11px] font-semibold tracking-wider uppercase text-[#a3a3a3]">
          {author}
        </span>
        <span className="text-[#a3a3a3]">·</span>
        <span className="font-space-grotesk text-[11px] font-semibold tracking-wider uppercase text-[#a3a3a3]">
          Published {formatDate(publishedAt)}
        </span>
      </div>
    </header>
  )
}
