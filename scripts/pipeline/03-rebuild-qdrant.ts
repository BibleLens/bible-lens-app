import 'dotenv/config';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createQdrantClient, COLLECTION_NAME } from './lib/qdrant-client.js';
import { chunkText } from './lib/chunker.js';
import { embedAll } from './lib/openai-client.js';
import type { ScrapedDoc, EmbedPoint } from './lib/types.js';

const PERSONAL_DIR = '/Users/patrickrobinson/Desktop/BibleProject/bible-lens-rag/data/processed/personal';
const TD_JSON = new URL('../data/trinity-delusion.json', import.meta.url).pathname;
const PDF_JSON = new URL('../data/preterist-pdfs.json', import.meta.url).pathname;

async function main() {
  const client = createQdrantClient();

  // Step 1: Delete existing collection
  console.log('Deleting existing collection...');
  try {
    await client.deleteCollection(COLLECTION_NAME);
    console.log('Deleted existing collection');
  } catch {
    console.log('No existing collection to delete');
  }

  // Step 2: Create fresh collection
  console.log('Creating collection...');
  await client.createCollection(COLLECTION_NAME, {
    vectors: { size: 1536, distance: 'Cosine' },
    hnsw_config: { m: 16, ef_construct: 200 },
  });
  await client.createPayloadIndex(COLLECTION_NAME, { field_name: 'source', field_schema: 'keyword' });
  await client.createPayloadIndex(COLLECTION_NAME, { field_name: 'priority', field_schema: 'integer' });
  console.log('Collection created with payload indexes');

  // Step 3: Load all data sources
  const tdDocs: ScrapedDoc[] = JSON.parse(readFileSync(TD_JSON, 'utf-8'));
  const pdfDocs: ScrapedDoc[] = JSON.parse(readFileSync(PDF_JSON, 'utf-8'));

  // Load personal theology docs (markdown files, priority 10)
  const personalDocs: ScrapedDoc[] = readdirSync(PERSONAL_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const content = readFileSync(join(PERSONAL_DIR, f), 'utf-8');
      return {
        url: `file://${join(PERSONAL_DIR, f)}`,
        title: f.replace('.md', ''),
        content,
        source: 'personal' as const,
        priority: 10,
        scraped_at: new Date().toISOString(),
        word_count: content.split(/\s+/).filter(Boolean).length,
        your_notes: '',
      };
    });

  console.log(`Loaded: ${tdDocs.length} TD docs, ${pdfDocs.length} PDF books, ${personalDocs.length} personal docs`);

  // Step 4: Chunk all docs into EmbedPoints
  const allDocs = [...tdDocs, ...pdfDocs, ...personalDocs];
  const points: EmbedPoint[] = [];

  for (const doc of allDocs) {
    const chunks = chunkText(doc.content);
    for (const chunk of chunks) {
      points.push({
        text: chunk.text,
        title: doc.title,
        url: doc.url,
        source: doc.source,
        priority: doc.priority,
        chunkIndex: chunk.chunkIndex,
        totalChunks: chunk.totalChunks,
      });
    }
  }

  console.log(`Total chunks to embed: ${points.length}`);

  // Step 5: Embed all chunks
  console.log('Embedding chunks...');
  const texts = points.map(p => p.text);
  const embeddings = await embedAll(texts);

  // Step 6: Upsert to Qdrant in batches of 100
  console.log('Upserting to Qdrant Cloud...');
  const BATCH_SIZE = 100;
  for (let i = 0; i < points.length; i += BATCH_SIZE) {
    const batchPoints = points.slice(i, i + BATCH_SIZE);
    const batchEmbeddings = embeddings.slice(i, i + BATCH_SIZE);

    await client.upsert(COLLECTION_NAME, {
      points: batchPoints.map((p, j) => ({
        id: uuidv4(),
        vector: batchEmbeddings[j],
        payload: p as unknown as Record<string, unknown>,
      })),
    });

    console.log(`Upserted ${Math.min(i + BATCH_SIZE, points.length)}/${points.length}`);
  }

  // Step 7: Verify
  const info = await client.getCollection(COLLECTION_NAME);
  console.log('DONE!');
  console.log('Points count:', info.points_count);
  console.log('Collection status:', info.status);
}

main().catch(console.error);
