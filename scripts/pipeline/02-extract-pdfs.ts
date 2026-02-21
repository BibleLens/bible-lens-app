/**
 * 02-extract-pdfs.ts
 *
 * Extracts text from the 6 unique preterist PDF books, deduplicates by title,
 * and outputs clean ScrapedDoc JSON for the embedding pipeline.
 *
 * Source directory: /Users/patrickrobinson/Desktop/BibleProject/bible-lens-rag/data/raw/preterist_pdfs/
 * Output: scripts/pipeline/data/preterist-pdfs.json
 *
 * 6 unique books (12 files on disk — many are duplicates with different filenames):
 *   1. Beast of Revelation (King)
 *   2. Days of Vengeance (Chilton)
 *   3. Paradise Restored (Chilton)
 *   4. The Great Tribulation (Chilton)
 *   5. Gog and Magog / End Time Alliance
 *   6. Handwriting on the Wall
 */

import 'dotenv/config';
import { PDFParse } from 'pdf-parse';
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { ScrapedDoc } from './lib/types.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const PDF_DIR =
  '/Users/patrickrobinson/Desktop/BibleProject/bible-lens-rag/data/raw/preterist_pdfs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, 'data', 'preterist-pdfs.json');

const MIN_WORD_COUNT = 1_000;

/**
 * The 6 canonical book definitions.
 * Each has a canonical title (for display), plus keywords used to match filenames.
 * First file to match a slot wins; duplicates are skipped.
 */
const CANONICAL_BOOKS: Array<{
  id: string;
  title: string;
  keywords: string[];
}> = [
  {
    id: 'beast_of_revelation',
    title: 'Beast of Revelation - Kenneth Gentry',
    keywords: ['beast of revelation', 'beast_of_revelation'],
  },
  {
    id: 'days_of_vengeance',
    title: 'Days of Vengeance - David Chilton',
    keywords: ['days of vengeance', 'days_of_vengeance'],
  },
  {
    id: 'paradise_restored',
    title: 'Paradise Restored - David Chilton',
    keywords: ['paradise restored', 'paradise_restored', 'pr-ebook'],
  },
  {
    id: 'great_tribulation',
    title: 'The Great Tribulation - David Chilton',
    keywords: ['great tribulation', 'greattribe'],
  },
  {
    id: 'gog_and_magog',
    title: 'Gog and Magog: End Time Alliance',
    keywords: ['gog and magog', 'gog_magog', 'end time alliance', 'end-time_alliance'],
  },
  {
    id: 'handwriting_on_the_wall',
    title: 'Handwriting on the Wall',
    keywords: ['handwriting on the wall', 'handwriting_otw', 'handwritingotw'],
  },
];

// ─── Utilities ────────────────────────────────────────────────────────────────

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function matchBook(filename: string): string | null {
  const lower = filename.toLowerCase();
  for (const book of CANONICAL_BOOKS) {
    if (book.keywords.some((kw) => lower.includes(kw))) {
      return book.id;
    }
  }
  return null;
}

function getBookMeta(id: string): { title: string } {
  const book = CANONICAL_BOOKS.find((b) => b.id === id);
  if (!book) throw new Error(`Unknown book id: ${id}`);
  return { title: book.title };
}

// ─── PDF Extraction ───────────────────────────────────────────────────────────

/**
 * Extract all text from a PDF file using pdf-parse v2.x API.
 * pdf-parse v2 uses a class-based API: pass data as a Uint8Array in the constructor,
 * then call getText() to extract text from all pages.
 */
async function extractPdf(filePath: string): Promise<string> {
  const buf = await readFile(filePath);
  const data = new Uint8Array(buf);
  const parser = new PDFParse({ data });
  const result = await parser.getText();
  await parser.destroy();
  return result.text;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('=== Preterist PDF Extractor ===');
  console.log(`Source: ${PDF_DIR}`);
  console.log(`Output: ${OUTPUT}`);
  console.log('');

  // Ensure output dir exists
  await mkdir(dirname(OUTPUT), { recursive: true });

  // List all PDFs
  const allFiles = (await readdir(PDF_DIR)).filter((f) =>
    f.toLowerCase().endsWith('.pdf')
  );
  console.log(`Found ${allFiles.length} PDF files:`);
  allFiles.forEach((f) => console.log(`  ${f}`));
  console.log('');

  // Map: bookId → ScrapedDoc (first match wins)
  const bookMap = new Map<string, ScrapedDoc>();
  const skipped: string[] = [];
  const unmatched: string[] = [];

  const now = new Date().toISOString();

  for (const file of allFiles) {
    const bookId = matchBook(file);

    if (!bookId) {
      console.log(`  [SKIP - no match] ${file}`);
      unmatched.push(file);
      continue;
    }

    if (bookMap.has(bookId)) {
      const existing = bookMap.get(bookId)!;
      console.log(
        `  [SKIP - duplicate] ${file} (already have "${existing.title}")`
      );
      skipped.push(file);
      continue;
    }

    console.log(`  [EXTRACTING] ${file}...`);
    const filePath = join(PDF_DIR, file);

    try {
      const text = await extractPdf(filePath);
      const wc = wordCount(text);

      if (wc < MIN_WORD_COUNT) {
        console.warn(
          `    WARNING: ${file} extracted only ${wc} words — may be image-based PDF`
        );
      }

      const { title } = getBookMeta(bookId);
      const doc: ScrapedDoc = {
        url: `file://${filePath}`,
        title,
        content: text,
        source: 'preterist_pdf',
        priority: 8,
        scraped_at: now,
        word_count: wc,
      };

      bookMap.set(bookId, doc);
      console.log(`    OK — ${wc.toLocaleString()} words`);
    } catch (err) {
      console.error(`    ERROR extracting ${file}:`, (err as Error).message);
    }
  }

  console.log('');
  console.log('=== Deduplication Summary ===');
  console.log(`Matched books: ${bookMap.size} / ${CANONICAL_BOOKS.length}`);
  if (skipped.length)
    console.log(`Skipped duplicates: ${skipped.join(', ')}`);
  if (unmatched.length)
    console.log(`Unmatched files (not in target list): ${unmatched.join(', ')}`);

  // Check for missing books
  const missingBooks = CANONICAL_BOOKS.filter((b) => !bookMap.has(b.id));
  if (missingBooks.length > 0) {
    console.warn('WARNING: Missing books:');
    missingBooks.forEach((b) => console.warn(`  - ${b.title}`));
  }

  // Build output array (ordered by CANONICAL_BOOKS order)
  const docs: ScrapedDoc[] = CANONICAL_BOOKS.flatMap((b) => {
    const doc = bookMap.get(b.id);
    return doc ? [doc] : [];
  });

  // Write output (content may be large — pretty-print is fine for debugging)
  await writeFile(OUTPUT, JSON.stringify(docs, null, 2), 'utf-8');

  console.log('');
  console.log('=== Done ===');
  console.log(`Books written: ${docs.length}`);
  docs.forEach((d) =>
    console.log(`  ${d.title.substring(0, 50)}: ${d.word_count.toLocaleString()} words`)
  );
  const totalWords = docs.reduce((s, d) => s + d.word_count, 0);
  console.log(`Total words: ${totalWords.toLocaleString()}`);
  console.log(`Output: ${OUTPUT}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
