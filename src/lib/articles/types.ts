export type ArticleBlock =
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'paragraph'; text: string; dropCap?: boolean }
  | { type: 'pullQuote'; text: string; attribution?: string; position: 'left' | 'right'; widthFraction: number }
  | { type: 'scriptureInset'; reference: string; verses: Array<{ number: number; text: string }> }

export interface Article {
  slug: string
  title: string
  subtitle?: string
  author: string
  publishedAt: string
  description: string
  blocks: ArticleBlock[]
}
