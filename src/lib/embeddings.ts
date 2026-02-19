// src/lib/embeddings.ts
// OpenAI text-embedding-3-small wrapper — vectorizes query strings for Qdrant search
import OpenAI from 'openai';

let _openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (_openai) return _openai;
  _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return _openai;
}

/**
 * Vectorize a query string into a 1536-dim embedding using text-embedding-3-small.
 * Matches the collection dimension in Qdrant Cloud (bible_lens_knowledge).
 */
export async function embedQuery(text: string): Promise<number[]> {
  const client = getOpenAIClient();
  const response = await client.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}
