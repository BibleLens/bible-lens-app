import { genesis1AncientCosmology } from './genesis-1-ancient-cosmology'
import type { Article } from './types'

const articles: Record<string, Article> = {
  'genesis-1-ancient-cosmology': genesis1AncientCosmology,
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles[slug]
}

export function getAllArticleSlugs(): string[] {
  return Object.keys(articles)
}

export type { Article, ArticleBlock } from './types'
