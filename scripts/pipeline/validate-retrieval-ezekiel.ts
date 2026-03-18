// scripts/pipeline/validate-retrieval-ezekiel.ts
// TEMPORARY validation script — deleted on successful run (not a production artifact)
// Usage: npx tsx scripts/pipeline/validate-retrieval-ezekiel.ts

import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import { createQdrantClient, COLLECTION_NAME } from './lib/qdrant-client.js';
import { embedAll } from './lib/openai-client.js';

// -----------------------------------------------------------------------
// CATEGORY 1: Four mandatory query chains (source=personal filter)
// DEPLOY-06 — all must PASS at score >= 0.6 with correct title in top 5
// -----------------------------------------------------------------------
const MANDATORY_QUERIES = [
  {
    query: "Ezekiel chariot ophanim wheels",
    expectTitle: "ezekiel-1-3-commentary",
    mustNotBe: "daniel-7-8-commentary",
    filterPersonal: true,
    label: "DEPLOY-06 Chain 1: Ezekiel chariot retrieval"
  },
  {
    query: "Daniel 7 Ancient of Days son of man",
    expectTitle: "daniel-7-8-commentary",
    mustNotBe: "ezekiel-1-3-commentary",
    filterPersonal: true,
    label: "DEPLOY-06 Chain 2: Daniel 7 cross-contamination check"
  },
  {
    query: "Gog Magog Revelation 20 end Millennium",
    expectTitle: "revelation-19-22-commentary",
    mustNotBe: "ezekiel-38-39-commentary",
    filterPersonal: true,
    label: "DEPLOY-06 Chain 3: Gog Magog Rev 20 cross-contamination check"
  },
  {
    query: "Ezekiel dry bones valley national restoration Israel ruach",
    expectTitle: "ezekiel-37-commentary",
    mustNotBe: null,
    filterPersonal: true,
    label: "DEPLOY-06 Chain 4: Ezekiel 37 dry bones retrieval"
  },
];

// -----------------------------------------------------------------------
// CATEGORY 2: Three cross-reference chains (NO source filter)
// Assert expected titles appear in the same result set (any source)
// -----------------------------------------------------------------------
const CROSS_REF_QUERIES = [
  {
    query: "Ezekiel 1 throne room creatures Revelation 4 four living creatures",
    expectTitles: ["ezekiel-1-3", "revelation-4-5"],
    label: "DEPLOY-06 XRef: Ezek 1 -> Rev 4 throne room"
  },
  {
    query: "Ezekiel 37 dry bones national restoration Daniel Revelation",
    expectTitles: ["ezekiel-37", "daniel"],
    label: "DEPLOY-06 XRef: Ezek 37 -> Dan/Rev restoration"
  },
  {
    query: "Ezekiel 38-39 Gog Magog Revelation 20:8 post-Millennial",
    expectTitles: ["ezekiel-38-39", "revelation-19-22"],
    label: "DEPLOY-06 XRef: Ezek 38-39 -> Rev 20:8"
  },
];

interface MandatoryResult {
  label: string;
  query: string;
  expectTitle: string;
  mustNotBe: string | null;
  topTitle: string;
  topScore: number;
  expectedInTop5: boolean;
  expectedScore: number;
  pass: boolean;
  failReason?: string;
}

interface CrossRefResult {
  label: string;
  query: string;
  expectTitles: string[];
  allTitlesFound: boolean;
  foundTitles: string[];
  missingTitles: string[];
  pass: boolean;
}

async function main() {
  const client = createQdrantClient();

  console.log('='.repeat(80));
  console.log('DEPLOY-06 Cross-Contamination Validation — Ezekiel Ingest');
  console.log('='.repeat(80));
  console.log('');

  // -----------------------------------------------------------------------
  // CATEGORY 1: Mandatory chains
  // -----------------------------------------------------------------------
  console.log('CATEGORY 1: Mandatory Query Chains (source=personal filter)');
  console.log('-'.repeat(80));

  const mandatoryTexts = MANDATORY_QUERIES.map(q => q.query);
  console.log('Embedding mandatory queries...');
  const mandatoryEmbeddings = await embedAll(mandatoryTexts);

  const mandatoryResults: MandatoryResult[] = [];

  for (let i = 0; i < MANDATORY_QUERIES.length; i++) {
    const q = MANDATORY_QUERIES[i];
    const embedding = mandatoryEmbeddings[i];

    const response = await client.search(COLLECTION_NAME, {
      vector: embedding,
      limit: 5,
      score_threshold: 0.3,
      filter: {
        must: [
          { key: 'source', match: { value: 'personal' } }
        ]
      },
      with_payload: true,
    });

    const topResult = response[0];
    const topTitle = (topResult?.payload?.title as string) ?? 'N/A';
    const topScore = topResult?.score ?? 0;

    // Find expected title in top 5
    const expectedHit = response.find(r => {
      const t = (r.payload?.title as string) ?? '';
      return t === q.expectTitle;
    });
    const expectedInTop5 = !!expectedHit;
    const expectedScore = expectedHit?.score ?? 0;

    // PASS criteria:
    // 1. expected title in top 5
    // 2. expected title score >= 0.6
    // 3. if mustNotBe is set, that title must NOT be rank 1
    let pass = true;
    let failReason: string | undefined;

    if (!expectedInTop5) {
      pass = false;
      failReason = `"${q.expectTitle}" not found in top 5 results`;
    } else if (expectedScore < 0.6) {
      pass = false;
      failReason = `"${q.expectTitle}" score ${expectedScore.toFixed(4)} < 0.6 threshold`;
    } else if (q.mustNotBe && topTitle === q.mustNotBe) {
      pass = false;
      failReason = `"${q.mustNotBe}" is rank 1 (cross-contamination detected)`;
    }

    mandatoryResults.push({
      label: q.label,
      query: q.query,
      expectTitle: q.expectTitle,
      mustNotBe: q.mustNotBe,
      topTitle,
      topScore,
      expectedInTop5,
      expectedScore,
      pass,
      failReason,
    });

    const status = pass ? 'PASS' : 'FAIL';
    console.log(`\n[${status}] ${q.label}`);
    console.log(`  Query: "${q.query}"`);
    console.log(`  Expected: ${q.expectTitle}`);
    console.log(`  Top 5 results:`);
    response.forEach((r, idx) => {
      const t = (r.payload?.title as string) ?? 'N/A';
      const marker = t === q.expectTitle ? ' <-- expected' : (t === q.mustNotBe ? ' <-- MUST NOT BE RANK 1' : '');
      console.log(`    ${idx + 1}. ${t} (score: ${r.score.toFixed(4)})${marker}`);
    });
    if (!response.length) {
      console.log('    (no results above score_threshold=0.3)');
    }
    if (!pass) {
      console.log(`  FAIL REASON: ${failReason}`);
    }
  }

  // -----------------------------------------------------------------------
  // CATEGORY 2: Cross-reference chains (no source filter)
  // -----------------------------------------------------------------------
  console.log('\n' + '='.repeat(80));
  console.log('CATEGORY 2: Cross-Reference Chains (no source filter)');
  console.log('-'.repeat(80));

  const crossRefTexts = CROSS_REF_QUERIES.map(q => q.query);
  console.log('Embedding cross-reference queries...');
  const crossRefEmbeddings = await embedAll(crossRefTexts);

  const crossRefResults: CrossRefResult[] = [];

  for (let i = 0; i < CROSS_REF_QUERIES.length; i++) {
    const q = CROSS_REF_QUERIES[i];
    const embedding = crossRefEmbeddings[i];

    const response = await client.search(COLLECTION_NAME, {
      vector: embedding,
      limit: 15,
      score_threshold: 0.3,
      with_payload: true,
    });

    const allTitles = response.map(r => (r.payload?.title as string) ?? '');

    const foundTitles: string[] = [];
    const missingTitles: string[] = [];

    for (const expected of q.expectTitles) {
      const found = allTitles.some(t => t.includes(expected));
      if (found) {
        foundTitles.push(expected);
      } else {
        missingTitles.push(expected);
      }
    }

    const pass = missingTitles.length === 0;

    crossRefResults.push({
      label: q.label,
      query: q.query,
      expectTitles: q.expectTitles,
      allTitlesFound: pass,
      foundTitles,
      missingTitles,
      pass,
    });

    const status = pass ? 'PASS' : 'FAIL';
    console.log(`\n[${status}] ${q.label}`);
    console.log(`  Query: "${q.query}"`);
    console.log(`  Expected titles (partial match): ${q.expectTitles.join(', ')}`);
    console.log(`  Top 15 results:`);
    response.slice(0, 15).forEach((r, idx) => {
      const t = (r.payload?.title as string) ?? 'N/A';
      const isExpected = q.expectTitles.some(e => t.includes(e));
      const marker = isExpected ? ' <-- expected' : '';
      console.log(`    ${idx + 1}. ${t} (score: ${r.score.toFixed(4)})${marker}`);
    });
    if (!response.length) {
      console.log('    (no results above score_threshold=0.3)');
    }
    if (!pass) {
      console.log(`  MISSING: ${missingTitles.join(', ')}`);
    }
  }

  // -----------------------------------------------------------------------
  // SUMMARY
  // -----------------------------------------------------------------------
  const mandatoryPassed = mandatoryResults.filter(r => r.pass).length;
  const crossRefPassed = crossRefResults.filter(r => r.pass).length;
  const allPass = mandatoryPassed === 4 && crossRefPassed === 3;

  console.log('\n' + '='.repeat(80));
  console.log('RESULTS SUMMARY');
  console.log('='.repeat(80));
  console.log('');
  console.log('Mandatory chains:');
  mandatoryResults.forEach(r => {
    const status = r.pass ? 'PASS' : 'FAIL';
    console.log(`  [${status}] ${r.label}`);
    console.log(`         expected: ${r.expectTitle} | top: ${r.topTitle} | score: ${r.expectedScore.toFixed(4)}`);
  });
  console.log('');
  console.log('Cross-reference chains:');
  crossRefResults.forEach(r => {
    const status = r.pass ? 'PASS' : 'FAIL';
    console.log(`  [${status}] ${r.label}`);
    if (!r.pass) {
      console.log(`         missing: ${r.missingTitles.join(', ')}`);
    }
  });

  console.log('');
  console.log(`Mandatory chains: ${mandatoryPassed}/4 PASS`);
  console.log(`Cross-reference chains: ${crossRefPassed}/3 PASS`);
  console.log('');

  if (allPass) {
    console.log('ALL CHAINS PASS — ready for Phase 46');
    console.log('');
    console.log('Deleting validation script (not a production artifact)...');
    const { unlinkSync } = await import('fs');
    unlinkSync(resolve(process.cwd(), 'scripts/pipeline/validate-retrieval-ezekiel.ts'));
    console.log('Script deleted.');
  } else {
    console.log('SOME CHAINS FAILED — review failures above before proceeding to Phase 46');
    console.log('');
    if (!mandatoryResults[1].pass) {
      console.log('Chain 2 (Daniel 7) FAILED: Ezekiel 1-3 RAG file needs vocabulary revision + re-ingest cycle');
      console.log('  See RESEARCH.md Pitfall 1 for vocabulary guidance');
    }
    if (!mandatoryResults[2].pass) {
      console.log('Chain 3 (Gog/Magog) FAILED: Try refined query "post-Millennial rebellion Satan released Revelation 20:8"');
      console.log('  See RESEARCH.md Pitfall 3 for vocabulary guidance');
    }
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Validation script error:', err);
  process.exit(1);
});
