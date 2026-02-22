// scripts/pipeline/ingest-file.ts
// Incremental ingest: add a single markdown file to the existing Qdrant collection
// Usage: npx tsx --env-file=.env.local scripts/pipeline/ingest-file.ts <path-to-md-file>

import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import { readFileSync } from 'fs';
import { basename } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createQdrantClient, COLLECTION_NAME } from './lib/qdrant-client.js';
import { chunkText } from './lib/chunker.js';
import { embedAll } from './lib/openai-client.js';

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: npx tsx scripts/pipeline/ingest-file.ts <path-to-md-file>');
  process.exit(1);
}

async function main() {
  const content = readFileSync(filePath, 'utf-8');
  const title = basename(filePath, '.md');
  const wordCount = content.split(/\s+/).filter(Boolean).length;

  console.log(`File: ${title}`);
  console.log(`Words: ${wordCount}`);

  // Chunk
  const chunks = chunkText(content);
  console.log(`Chunks: ${chunks.length}`);

  // Embed
  console.log('Embedding chunks...');
  const texts = chunks.map(c => c.text);
  const embeddings = await embedAll(texts);

  // Upsert to Qdrant (append, not replace)
  const client = createQdrantClient();
  const points = chunks.map((chunk, i) => ({
    id: uuidv4(),
    vector: embeddings[i],
    payload: {
      text: chunk.text,
      title,
      url: `file://${resolve(filePath)}`,
      source: 'personal',
      priority: 10,
      chunkIndex: chunk.chunkIndex,
      totalChunks: chunk.totalChunks,
    },
  }));

  await client.upsert(COLLECTION_NAME, { points });
  console.log(`Upserted ${points.length} points to ${COLLECTION_NAME}`);

  // Verify
  const info = await client.getCollection(COLLECTION_NAME);
  console.log(`Collection total: ${info.points_count} points`);
  console.log('Done!');
}

main().catch(console.error);
