/**
 * 01-scrape-trinity-delusion.ts
 *
 * Scrapes the Trinity Delusion Angelfire site (https://www.angelfire.com/space/thegospeltruth)
 * and outputs clean ScrapedDoc JSON for the embedding pipeline.
 *
 * If Angelfire is unreachable (3 consecutive 502/503 on the index page), falls back to
 * the existing 293-doc scrape at:
 *   /Users/patrickrobinson/Desktop/BibleProject/bible-lens-rag/data/raw/trinity_delusion_20251222_155713.json
 *
 * Output: scripts/pipeline/data/trinity-delusion.json
 */

import 'dotenv/config';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import type { ScrapedDoc } from './lib/types.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE_URL = 'https://www.angelfire.com/space/thegospeltruth';
const DELAY_MS = 750;
const TIMEOUT_MS = 10_000;
const MAX_INDEX_ATTEMPTS = 3;
const MIN_WORD_COUNT = 100;

const FALLBACK_PATH =
  '/Users/patrickrobinson/Desktop/BibleProject/bible-lens-rag/data/raw/trinity_delusion_20251222_155713.json';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = `${__dirname}/data/trinity-delusion.json`;

const USER_AGENT =
  'Mozilla/5.0 (compatible; BibleLens/1.0; +https://biblelens.faith)';

const axiosInstance = axios.create({
  timeout: TIMEOUT_MS,
  headers: { 'User-Agent': USER_AGENT },
});

// ─── Utilities ────────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function normalizeUrl(href: string, base: string): string | null {
  try {
    const url = new URL(href, base);
    // Only follow links within the same Angelfire site (sub-paths of base)
    if (!url.href.startsWith(BASE_URL)) return null;
    // Strip fragments + trailing slash normalisation
    url.hash = '';
    return url.href.replace(/\/$/, '');
  } catch {
    return null;
  }
}

// ─── Angelfire Scraper ────────────────────────────────────────────────────────

async function fetchPage(url: string): Promise<string | null> {
  try {
    const res = await axiosInstance.get<string>(url);
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      console.warn(`  [HTTP ${status ?? 'ERR'}] ${url}`);
      return null;
    }
    console.warn(`  [NETWORK ERR] ${url}: ${(err as Error).message}`);
    return null;
  }
}

async function probeSiteIndex(): Promise<boolean> {
  let failures = 0;
  for (let i = 0; i < MAX_INDEX_ATTEMPTS; i++) {
    if (i > 0) await delay(DELAY_MS * 2);
    try {
      const res = await axiosInstance.get<string>(BASE_URL);
      if (res.status < 400) {
        console.log(`Angelfire index responded OK (status ${res.status})`);
        return true;
      }
      const status = res.status;
      if (status === 502 || status === 503) failures++;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 502 || status === 503) {
          failures++;
          console.warn(`  Attempt ${i + 1}: Angelfire returned ${status}`);
        } else {
          // Other error (timeout, network) — count as failure
          failures++;
          console.warn(`  Attempt ${i + 1}: Network error — ${err.message}`);
        }
      } else {
        failures++;
        console.warn(`  Attempt ${i + 1}: Unknown error`);
      }
    }
  }
  return failures < MAX_INDEX_ATTEMPTS;
}

async function collectLinks(indexHtml: string): Promise<string[]> {
  const $ = cheerio.load(indexHtml);
  const links = new Set<string>();

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;
    const normalized = normalizeUrl(href, BASE_URL);
    if (normalized && normalized !== BASE_URL) {
      links.add(normalized);
    }
  });

  return [...links];
}

function extractDocFromHtml(url: string, html: string): ScrapedDoc | null {
  const $ = cheerio.load(html);

  // Remove nav/menu/footer noise
  $('nav, footer, header, script, style, noscript, iframe').remove();

  const title = $('title').text().trim() || $('h1').first().text().trim() || url;
  const content = $('body').text().replace(/\s+/g, ' ').trim();
  const wc = wordCount(content);

  if (wc < MIN_WORD_COUNT) return null;

  return {
    url,
    title,
    content,
    source: 'trinity_delusion',
    priority: 7,
    scraped_at: new Date().toISOString(),
    word_count: wc,
  };
}

async function scrapeAngelfire(): Promise<ScrapedDoc[]> {
  console.log('Fetching Angelfire index...');
  const indexHtml = await fetchPage(BASE_URL);
  if (!indexHtml) return [];

  const links = await collectLinks(indexHtml);
  console.log(`Found ${links.length} internal links on index page`);

  // Also scrape the index page itself
  const allUrls = [BASE_URL, ...links];
  const seen = new Set<string>();
  const docs: ScrapedDoc[] = [];

  for (let i = 0; i < allUrls.length; i++) {
    const url = allUrls[i];
    if (seen.has(url)) continue;
    seen.add(url);

    if (i > 0) await delay(DELAY_MS);

    process.stdout.write(`  [${i + 1}/${allUrls.length}] ${url.substring(0, 70)}...`);
    const html = await fetchPage(url);
    if (!html) {
      process.stdout.write(' SKIP\n');
      continue;
    }

    const doc = extractDocFromHtml(url, html);
    if (!doc) {
      process.stdout.write(` SKIP (< ${MIN_WORD_COUNT} words)\n`);
      continue;
    }

    docs.push(doc);
    process.stdout.write(` OK (${doc.word_count} words)\n`);
  }

  return docs;
}

// ─── Fallback Loader ──────────────────────────────────────────────────────────

function loadFallback(): ScrapedDoc[] {
  console.warn(
    'WARNING: Angelfire unreachable, using existing 293-doc fallback'
  );
  const raw = JSON.parse(readFileSync(FALLBACK_PATH, 'utf-8')) as ScrapedDoc[];

  // Ensure correct source + priority (the existing file already has these, but be defensive)
  const now = new Date().toISOString();
  return raw.map((doc) => ({
    ...doc,
    source: 'trinity_delusion' as const,
    priority: 7,
    // scraped_at already present from original scrape — keep it
    scraped_at: doc.scraped_at ?? now,
  }));
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('=== Trinity Delusion Scraper ===');
  console.log(`Output: ${OUTPUT}`);
  console.log('');

  // Ensure output directory exists
  mkdirSync(dirname(OUTPUT), { recursive: true });

  // 1. Probe Angelfire index (3 attempts)
  console.log(`Probing Angelfire index at ${BASE_URL} (up to ${MAX_INDEX_ATTEMPTS} attempts)...`);
  const angelfire_live = await probeSiteIndex();

  let rawDocs: ScrapedDoc[];

  if (angelfire_live) {
    console.log('Angelfire is reachable — starting full scrape...');
    rawDocs = await scrapeAngelfire();

    if (rawDocs.length < 50) {
      // Scrape returned very few results — fall back
      console.warn(
        `WARNING: Live scrape returned only ${rawDocs.length} docs (< 50) — using fallback`
      );
      rawDocs = loadFallback();
    }
  } else {
    rawDocs = loadFallback();
  }

  // 2. Deduplicate by URL
  const urlMap = new Map<string, ScrapedDoc>();
  for (const doc of rawDocs) {
    if (!urlMap.has(doc.url)) {
      urlMap.set(doc.url, doc);
    }
  }
  const deduped = [...urlMap.values()];
  console.log(`After URL deduplication: ${rawDocs.length} → ${deduped.length} docs`);

  // 3. Filter out short documents
  const filtered = deduped.filter((d) => d.word_count >= MIN_WORD_COUNT);
  console.log(
    `After filtering (< ${MIN_WORD_COUNT} words): ${deduped.length} → ${filtered.length} docs`
  );

  // 4. Write output
  writeFileSync(OUTPUT, JSON.stringify(filtered, null, 2), 'utf-8');

  const totalWords = filtered.reduce((s, d) => s + d.word_count, 0);
  console.log('');
  console.log('=== Done ===');
  console.log(`Docs: ${filtered.length}`);
  console.log(`Total words: ${totalWords.toLocaleString()}`);
  console.log(`Output: ${OUTPUT}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
