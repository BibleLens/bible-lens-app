/**
 * Rebuild Qdrant Cloud Collection
 *
 * Reads all source data (Trinity Delusion, preterist PDFs, personal docs),
 * chunks it, embeds with OpenAI text-embedding-3-small, and upserts to Qdrant Cloud.
 */

import dotenv from 'dotenv';
dotenv.config({ path: new URL('../../.env.local', import.meta.url).pathname });
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { QdrantClient } from '@qdrant/js-client-rest';
import OpenAI from 'openai';

// --- Config ---
const COLLECTION_NAME = 'bible_lens_knowledge';
const EMBEDDING_MODEL = 'text-embedding-3-small'; // 1536 dim — DO NOT CHANGE
const CHUNK_SIZE_WORDS = 500;
const CHUNK_OVERLAP_WORDS = 75;
const EMBED_BATCH_SIZE = 50;
const UPSERT_BATCH_SIZE = 100;

// --- Data paths ---
const RAG_DIR = '/Users/patrickrobinson/Desktop/BibleProject/bible-lens-rag';
const TD_JSON = join(RAG_DIR, 'data/raw/trinity_delusion_20251222_155713.json');
const PRETERIST_JSON = join(RAG_DIR, 'data/raw/preterist_library_20251223_121840.json');
const PERSONAL_DIR = join(RAG_DIR, 'data/processed/personal');

// --- Clients ---
const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- Chunker ---
function chunkText(text, chunkSize = CHUNK_SIZE_WORDS, overlap = CHUNK_OVERLAP_WORDS) {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks = [];
  const step = chunkSize - overlap;

  for (let i = 0; i < words.length; i += step) {
    const slice = words.slice(i, i + chunkSize);
    const chunk = slice.join(' ');
    if (chunk.trim()) {
      chunks.push({ text: chunk, chunkIndex: chunks.length });
    }
    if (i + chunkSize >= words.length) break;
  }

  return chunks.map(c => ({ ...c, totalChunks: chunks.length }));
}

// --- Embedding ---
async function embedBatch(texts) {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
  });
  return response.data.map(d => d.embedding);
}

async function embedAll(texts) {
  const results = [];
  for (let i = 0; i < texts.length; i += EMBED_BATCH_SIZE) {
    const batch = texts.slice(i, i + EMBED_BATCH_SIZE);
    const embeddings = await embedBatch(batch);
    results.push(...embeddings);
    console.log(`  Embedded ${Math.min(i + EMBED_BATCH_SIZE, texts.length)}/${texts.length}`);
  }
  return results;
}

// --- Deduplication for preterist PDFs ---
const KNOWN_BOOKS = [
  'beast of revelation',
  'days of vengeance',
  'paradise restored',
  'great tribulation',
  'gog and magog',
  'end time alliance',
  'handwriting on the wall',
  'wars and rumors',
];

function getBookKey(title) {
  const lower = title.toLowerCase();
  for (const book of KNOWN_BOOKS) {
    if (lower.includes(book)) return book;
  }
  return lower.substring(0, 40);
}

// --- Main ---
async function main() {
  console.log('=== Bible Lens Qdrant Cloud Rebuild ===\n');

  // Step 1: Delete existing collection
  console.log('1. Deleting existing collection...');
  try {
    await qdrant.deleteCollection(COLLECTION_NAME);
    console.log('   Deleted existing collection');
  } catch {
    console.log('   No existing collection to delete');
  }

  // Step 2: Create fresh collection
  console.log('2. Creating collection...');
  await qdrant.createCollection(COLLECTION_NAME, {
    vectors: { size: 1536, distance: 'Cosine' },
    hnsw_config: { m: 16, ef_construct: 200 },
  });
  await qdrant.createPayloadIndex(COLLECTION_NAME, {
    field_name: 'source',
    field_schema: 'keyword',
  });
  await qdrant.createPayloadIndex(COLLECTION_NAME, {
    field_name: 'priority',
    field_schema: 'integer',
  });
  console.log('   Collection created with payload indexes\n');

  // Step 3: Load all data sources
  console.log('3. Loading data sources...');

  // Trinity Delusion (293 docs, priority 7)
  const tdDocs = JSON.parse(readFileSync(TD_JSON, 'utf-8'));
  console.log(`   Trinity Delusion: ${tdDocs.length} docs`);

  // Preterist PDFs (deduplicate to unique books, priority 8)
  const rawPreterist = JSON.parse(readFileSync(PRETERIST_JSON, 'utf-8'));
  const dedupMap = new Map();
  for (const doc of rawPreterist) {
    const key = getBookKey(doc.title);
    if (!dedupMap.has(key)) {
      dedupMap.set(key, doc);
    } else {
      console.log(`   Skipping duplicate: ${doc.title.substring(0, 50)}`);
    }
  }
  const preteristDocs = Array.from(dedupMap.values());
  console.log(`   Preterist PDFs: ${preteristDocs.length} unique books (from ${rawPreterist.length} entries)`);

  // Personal theology docs (priority 10)
  const personalFiles = readdirSync(PERSONAL_DIR).filter(f => f.endsWith('.md'));
  const personalDocs = personalFiles.map(f => {
    const content = readFileSync(join(PERSONAL_DIR, f), 'utf-8');
    return {
      url: `file://${join(PERSONAL_DIR, f)}`,
      title: f.replace('.md', '').replace(/_/g, ' '),
      content,
      source: 'personal',
      priority: 10,
      scraped_at: new Date().toISOString(),
      word_count: content.split(/\s+/).filter(Boolean).length,
    };
  });
  console.log(`   Personal docs: ${personalDocs.length} files\n`);

  // Step 4: Chunk all documents
  console.log('4. Chunking documents...');
  const allPoints = [];

  function chunkDocs(docs, sourceLabel) {
    let totalChunks = 0;
    for (const doc of docs) {
      const content = doc.content || '';
      if (content.split(/\s+/).length < 50) {
        continue; // Skip very short docs
      }
      const chunks = chunkText(content);
      totalChunks += chunks.length;
      for (const chunk of chunks) {
        allPoints.push({
          text: chunk.text,
          title: doc.title || 'Untitled',
          url: doc.url || '',
          source: doc.source || sourceLabel,
          priority: doc.priority || 5,
          chunkIndex: chunk.chunkIndex,
          totalChunks: chunk.totalChunks,
        });
      }
    }
    console.log(`   ${sourceLabel}: ${totalChunks} chunks from ${docs.length} docs`);
  }

  chunkDocs(tdDocs, 'trinity_delusion');
  chunkDocs(preteristDocs, 'preterist_pdf');
  chunkDocs(personalDocs, 'personal');
  console.log(`   Total chunks to embed: ${allPoints.length}\n`);

  // Step 5: Embed all chunks
  console.log('5. Embedding chunks (this will take a few minutes)...');
  const texts = allPoints.map(p => p.text);
  const embeddings = await embedAll(texts);
  console.log(`   Embedding complete: ${embeddings.length} vectors\n`);

  // Step 6: Upsert to Qdrant Cloud
  console.log('6. Upserting to Qdrant Cloud...');
  for (let i = 0; i < allPoints.length; i += UPSERT_BATCH_SIZE) {
    const batchPoints = allPoints.slice(i, i + UPSERT_BATCH_SIZE);
    const batchEmbeddings = embeddings.slice(i, i + UPSERT_BATCH_SIZE);

    await qdrant.upsert(COLLECTION_NAME, {
      points: batchPoints.map((p, j) => ({
        id: randomUUID(),
        vector: batchEmbeddings[j],
        payload: {
          text: p.text,
          title: p.title,
          url: p.url,
          source: p.source,
          priority: p.priority,
          chunkIndex: p.chunkIndex,
          totalChunks: p.totalChunks,
        },
      })),
    });

    console.log(`   Upserted ${Math.min(i + UPSERT_BATCH_SIZE, allPoints.length)}/${allPoints.length}`);
  }

  // Step 7: Verify
  console.log('\n7. Verifying...');
  const info = await qdrant.getCollection(COLLECTION_NAME);
  console.log(`   Collection: ${COLLECTION_NAME}`);
  console.log(`   Vectors: ${info.vectors_count}`);
  console.log(`   Status: ${info.status}`);

  // Check source distribution
  for (const source of ['trinity_delusion', 'preterist_pdf', 'personal']) {
    const count = await qdrant.count(COLLECTION_NAME, {
      filter: { must: [{ key: 'source', match: { value: source } }] },
      exact: true,
    });
    console.log(`   ${source}: ${count.count} vectors`);
  }

  console.log('\n=== DONE! ===');
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
