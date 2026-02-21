// scripts/pipeline/lib/openai-client.ts
import OpenAI from 'openai';
import pLimit from 'p-limit';

// text-embedding-3-small: 1536 dimensions, consistent with existing collection
// DO NOT change model — DATA-04 requires consistency
const EMBEDDING_MODEL = 'text-embedding-3-small';
const BATCH_SIZE = 50;  // ~32,500 tokens per batch, well under 300K limit

const limit = pLimit(5); // max 5 concurrent OpenAI requests

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY must be set in .env.local');
  return new OpenAI({ apiKey });
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  const openai = getClient();
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
  });
  return response.data.map(d => d.embedding);
}

export async function embedAll(texts: string[]): Promise<number[][]> {
  const results: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    const embeddings = await limit(() => embedBatch(batch));
    results.push(...embeddings);
    console.log(`Embedded ${Math.min(i + BATCH_SIZE, texts.length)}/${texts.length}`);
  }

  return results;
}
