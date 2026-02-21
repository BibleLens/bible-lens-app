// scripts/pipeline/lib/chunker.ts
export interface Chunk {
  text: string;
  chunkIndex: number;
  totalChunks: number;
}

export function chunkText(
  text: string,
  chunkSizeWords = 500,
  overlapWords = 75
): Chunk[] {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks: Chunk[] = [];
  const step = chunkSizeWords - overlapWords;

  for (let i = 0; i < words.length; i += step) {
    const chunkWords = words.slice(i, i + chunkSizeWords);
    const chunk = chunkWords.join(' ');
    if (chunk.trim()) {
      chunks.push({ text: chunk, chunkIndex: chunks.length, totalChunks: 0 });
    }
    if (i + chunkSizeWords >= words.length) break;
  }

  // Backfill totalChunks now that we know the count
  return chunks.map(c => ({ ...c, totalChunks: chunks.length }));
}
