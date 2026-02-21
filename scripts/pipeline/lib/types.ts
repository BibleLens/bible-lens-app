// scripts/pipeline/lib/types.ts
export interface ScrapedDoc {
  url: string;
  title: string;
  content: string;
  source: 'trinity_delusion' | 'preterist_pdf' | 'personal';
  priority: number;       // personal=10, preterist=8, trinity_delusion=7
  scraped_at: string;     // ISO timestamp
  word_count: number;
  your_notes?: string;
}

export interface EmbedPoint {
  text: string;
  title: string;
  url: string;
  source: string;
  priority: number;
  chunkIndex: number;
  totalChunks: number;
}
