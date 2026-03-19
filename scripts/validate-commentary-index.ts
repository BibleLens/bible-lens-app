// Validates TOPIC_PAGES data integrity against COMMENTARY_DESCRIPTIONS.
// Run with: npx tsx scripts/validate-commentary-index.ts
// Exit 0 on success, Exit 1 on any failure.

import { TOPIC_PAGES, CHAPTER_TOPICS, COMMENTARY_DESCRIPTIONS } from "../src/lib/commentary-index";

let errors = 0;

function fail(msg: string): void {
  console.error(`FAIL: ${msg}`);
  errors++;
}

// 1. TOPIC_PAGES has exactly 6 entries
if (TOPIC_PAGES.length !== 6) {
  fail(`TOPIC_PAGES should have exactly 6 entries, found ${TOPIC_PAGES.length}`);
} else {
  console.log(`OK: TOPIC_PAGES has 6 entries`);
}

const allDescriptionKeys = new Set(Object.keys(COMMENTARY_DESCRIPTIONS));
const allTopicSlugs = new Set(TOPIC_PAGES.map((t) => t.slug));
let totalChapterMappings = 0;

// 2. Per-topic checks
for (const topic of TOPIC_PAGES) {
  // slug non-empty
  if (!topic.slug || topic.slug.trim() === "") {
    fail(`Topic at index ${TOPIC_PAGES.indexOf(topic)} has empty slug`);
  }

  // title non-empty
  if (!topic.title || topic.title.trim() === "") {
    fail(`Topic "${topic.slug}" has empty title`);
  }

  // description 100-170 characters
  const descLen = topic.description.length;
  if (descLen < 100 || descLen > 170) {
    fail(
      `Topic "${topic.slug}" description is ${descLen} chars (expected 100-170). Description: "${topic.description}"`
    );
  }

  // keywords has at least 2 entries
  if (!topic.keywords || topic.keywords.length < 2) {
    fail(
      `Topic "${topic.slug}" has ${topic.keywords?.length ?? 0} keywords (minimum 2 required)`
    );
  }

  // every chapterKey exists in COMMENTARY_DESCRIPTIONS
  for (const key of topic.chapterKeys) {
    if (!allDescriptionKeys.has(key)) {
      fail(
        `Topic "${topic.slug}" references chapter key "${key}" which does not exist in COMMENTARY_DESCRIPTIONS`
      );
    }
    totalChapterMappings++;
  }

  // prose word count 200-400
  const words = topic.prose.trim().split(/\s+/);
  const wordCount = words.length;
  if (wordCount < 200 || wordCount > 400) {
    fail(
      `Topic "${topic.slug}" prose is ${wordCount} words (expected 200-400)`
    );
  } else {
    console.log(`OK: "${topic.slug}" — ${wordCount} words prose, ${topic.chapterKeys.length} chapterKeys`);
  }
}

// 3. CHAPTER_TOPICS has entries (is not empty)
const chapterTopicKeys = Object.keys(CHAPTER_TOPICS);
if (chapterTopicKeys.length === 0) {
  fail(`CHAPTER_TOPICS is empty — expected derived reverse index from TOPIC_PAGES`);
} else {
  console.log(`OK: CHAPTER_TOPICS has ${chapterTopicKeys.length} chapter key entries`);
}

// 4. Every slug in CHAPTER_TOPICS values exists in TOPIC_PAGES
for (const [chapterKey, slugs] of Object.entries(CHAPTER_TOPICS)) {
  for (const slug of slugs) {
    if (!allTopicSlugs.has(slug)) {
      fail(
        `CHAPTER_TOPICS["${chapterKey}"] contains slug "${slug}" which does not exist in TOPIC_PAGES`
      );
    }
  }
}

// Final result
if (errors > 0) {
  console.error(`\nValidation FAILED with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log(
    `\nValidated ${TOPIC_PAGES.length} topics, ${totalChapterMappings} total chapter mappings, all checks passed.`
  );
  process.exit(0);
}
