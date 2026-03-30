import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/articles'
import { estimateTextHeight, AVG_CHAR_WIDTHS } from '@/lib/pretext'
import { ArticleHero } from '@/components/article/ArticleHero'
import { ArticleLayout } from '@/components/article/ArticleLayout'

interface StudyArticlePageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: StudyArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: `${article.title} — Bible Lens Deep Dive`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  }
}

export default async function StudyArticlePage({ params }: StudyArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  // SSR height estimation: concatenate all paragraph text, estimate single-column height
  // Newsreader 18px body: avgCharWidth = AVG_CHAR_WIDTHS.newsreader16 * (18 / 16)
  const avgCharWidth = AVG_CHAR_WIDTHS.newsreader16 * (18 / 16)
  const ssrColumnWidth = 640 // single-column SSR estimate width
  const lineHeightPx = 28
  const allText = article.blocks
    .filter((b): b is Extract<typeof b, { type: 'paragraph' }> => b.type === 'paragraph')
    .map((b) => b.text)
    .join(' ')
  const ssrEstimateHeight = estimateTextHeight(allText, avgCharWidth, ssrColumnWidth, lineHeightPx)

  return (
    <main className="min-h-screen bg-[#050508]">
      <ArticleHero
        title={article.title}
        subtitle={article.subtitle}
        author={article.author}
        publishedAt={article.publishedAt}
      />
      <div className="max-w-[1200px] mx-auto px-8">
        <ArticleLayout blocks={article.blocks} ssrEstimateHeight={ssrEstimateHeight} />
      </div>
      <footer className="max-w-[1200px] mx-auto px-8 py-12 text-center">
        <a
          href="/commentary"
          className="font-space-grotesk text-[11px] font-semibold tracking-wider uppercase text-[#00E5FF] hover:underline"
        >
          Explore More Deep Dives
        </a>
      </footer>
    </main>
  )
}
