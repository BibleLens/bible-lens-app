// scripts/pipeline/validate-retrieval.ts — TEMPORARY, delete after use
import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import { createQdrantClient, COLLECTION_NAME } from './lib/qdrant-client.js';
import { embedAll } from './lib/openai-client.js';

const QUERIES = [
  { query: "What is the ANE coronation adoption formula in Psalm 2 and what does mashiach mean in its original context?", expectTitle: "psalm-2-commentary" },
  { query: "What does ben enosh mean in Psalm 8 and how does the creation hymn frame humanity's role?", expectTitle: "psalm-8-commentary" },
  { query: "What is the individual lament structure in Psalm 22 and what does eli eli mean?", expectTitle: "psalm-22-commentary" },
  { query: "What is the shepherd-king royal ideology in Psalm 23 and what does tsalmaveth mean?", expectTitle: "psalm-23-commentary" },
  { query: "What is the royal wedding psalm genre in Psalm 45 and how is elohim used at verse 6?", expectTitle: "psalm-45-commentary" },
  { query: "What is the penitential psalm structure in Psalm 51 and how does ruach function in verse 11?", expectTitle: "psalm-51-commentary" },
  { query: "What is the adat-el divine assembly in Psalm 82 and what judgment does YHWH pronounce on the elohim?", expectTitle: "psalm-82-commentary" },
  { query: "What is the covenant lament structure in Psalm 89 and how does hesed function in its theology?", expectTitle: "psalm-89-commentary" },
  { query: "What is the adoni vs adonai distinction in Psalm 110:1 and what is the Melchizedek priesthood?", expectTitle: "psalm-110-commentary" },
  { query: "What does yada mean in Psalm 139 and how does ruach function as divine presence?", expectTitle: "psalm-139-commentary" },
];

async function main() {
  const client = createQdrantClient();
  const embeddings = await embedAll(QUERIES.map(q => q.query));
  let passed = 0;

  for (let i = 0; i < QUERIES.length; i++) {
    const { query, expectTitle } = QUERIES[i];
    const results = await client.search(COLLECTION_NAME, {
      vector: embeddings[i],
      limit: 5,
      with_payload: true,
      score_threshold: 0.3,
      filter: { must: [{ key: "source", match: { value: "personal" } }] },
    });

    const topTitle = results[0]?.payload?.title as string || 'N/A';
    const topScore = results[0]?.score?.toFixed(3) || 'N/A';
    const rank1Match = (results[0]?.payload?.title as string)?.includes(expectTitle);

    if (rank1Match) {
      const score = results[0]?.score || 0;
      if (score < 0.60) {
        console.log(`PASS-WARNING: "${query}" -> ${topTitle} (score: ${topScore}) — BELOW 0.60 FLOOR`);
      } else {
        console.log(`PASS: "${query}" -> ${topTitle} (score: ${topScore})`);
      }
      passed++;
    } else {
      const titles = results.map(r => `${r.payload?.title} (${r.score?.toFixed(3)})`).join(', ');
      console.log(`FAIL: "${query}" -> expected ${expectTitle} at rank 1, got: [${titles}]`);
    }
  }

  console.log(`\n${passed}/${QUERIES.length} passed`);
  if (passed < QUERIES.length) process.exit(1);
}

main().catch(console.error);
