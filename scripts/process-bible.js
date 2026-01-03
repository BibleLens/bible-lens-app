/**
 * Bible Processing Script
 * Converts BSB text files to JSON format for the Bible Lens app
 */

const fs = require('fs');
const path = require('path');

// Bible book metadata
const BOOKS = {
  oldTestament: [
    { id: 'genesis', name: 'Genesis', abbr: 'Gen', file: '01_Genesis.txt', chapters: 50 },
    { id: 'exodus', name: 'Exodus', abbr: 'Exod', file: '02_Exodus.txt', chapters: 40 },
    { id: 'leviticus', name: 'Leviticus', abbr: 'Lev', file: '03_Leviticus.txt', chapters: 27 },
    { id: 'numbers', name: 'Numbers', abbr: 'Num', file: '04_Numbers.txt', chapters: 36 },
    { id: 'deuteronomy', name: 'Deuteronomy', abbr: 'Deut', file: '05_Deuteronomy.txt', chapters: 34 },
    { id: 'joshua', name: 'Joshua', abbr: 'Josh', file: '06_Joshua.txt', chapters: 24 },
    { id: 'judges', name: 'Judges', abbr: 'Judg', file: '07_Judges.txt', chapters: 21 },
    { id: 'ruth', name: 'Ruth', abbr: 'Ruth', file: '08_Ruth.txt', chapters: 4 },
    { id: '1samuel', name: '1 Samuel', abbr: '1Sam', file: '09_1_Samuel.txt', chapters: 31 },
    { id: '2samuel', name: '2 Samuel', abbr: '2Sam', file: '10_2_Samuel.txt', chapters: 24 },
    { id: '1kings', name: '1 Kings', abbr: '1Kgs', file: '11_1_Kings.txt', chapters: 22 },
    { id: '2kings', name: '2 Kings', abbr: '2Kgs', file: '12_2_Kings.txt', chapters: 25 },
    { id: '1chronicles', name: '1 Chronicles', abbr: '1Chr', file: '13_1_Chronicles.txt', chapters: 29 },
    { id: '2chronicles', name: '2 Chronicles', abbr: '2Chr', file: '14_2_Chronicles.txt', chapters: 36 },
    { id: 'ezra', name: 'Ezra', abbr: 'Ezra', file: '15_Ezra.txt', chapters: 10 },
    { id: 'nehemiah', name: 'Nehemiah', abbr: 'Neh', file: '16_Nehemiah.txt', chapters: 13 },
    { id: 'esther', name: 'Esther', abbr: 'Esth', file: '17_Esther.txt', chapters: 10 },
    { id: 'job', name: 'Job', abbr: 'Job', file: '18_Job.txt', chapters: 42 },
    { id: 'psalms', name: 'Psalms', abbr: 'Ps', file: '19_Psalms.txt', chapters: 150 },
    { id: 'proverbs', name: 'Proverbs', abbr: 'Prov', file: '20_Proverbs.txt', chapters: 31 },
    { id: 'ecclesiastes', name: 'Ecclesiastes', abbr: 'Eccl', file: '21_Ecclesiastes.txt', chapters: 12 },
    { id: 'songofsolomon', name: 'Song of Solomon', abbr: 'Song', file: '22_Song_of_Solomon.txt', chapters: 8 },
    { id: 'isaiah', name: 'Isaiah', abbr: 'Isa', file: '23_Isaiah.txt', chapters: 66 },
    { id: 'jeremiah', name: 'Jeremiah', abbr: 'Jer', file: '24_Jeremiah.txt', chapters: 52 },
    { id: 'lamentations', name: 'Lamentations', abbr: 'Lam', file: '25_Lamentations.txt', chapters: 5 },
    { id: 'ezekiel', name: 'Ezekiel', abbr: 'Ezek', file: '26_Ezekiel.txt', chapters: 48 },
    { id: 'daniel', name: 'Daniel', abbr: 'Dan', file: '27_Daniel.txt', chapters: 12 },
    { id: 'hosea', name: 'Hosea', abbr: 'Hos', file: '28_Hosea.txt', chapters: 14 },
    { id: 'joel', name: 'Joel', abbr: 'Joel', file: '29_Joel.txt', chapters: 3 },
    { id: 'amos', name: 'Amos', abbr: 'Amos', file: '30_Amos.txt', chapters: 9 },
    { id: 'obadiah', name: 'Obadiah', abbr: 'Obad', file: '31_Obadiah.txt', chapters: 1 },
    { id: 'jonah', name: 'Jonah', abbr: 'Jonah', file: '32_Jonah.txt', chapters: 4 },
    { id: 'micah', name: 'Micah', abbr: 'Mic', file: '33_Micah.txt', chapters: 7 },
    { id: 'nahum', name: 'Nahum', abbr: 'Nah', file: '34_Nahum.txt', chapters: 3 },
    { id: 'habakkuk', name: 'Habakkuk', abbr: 'Hab', file: '35_Habakkuk.txt', chapters: 3 },
    { id: 'zephaniah', name: 'Zephaniah', abbr: 'Zeph', file: '36_Zephaniah.txt', chapters: 3 },
    { id: 'haggai', name: 'Haggai', abbr: 'Hag', file: '37_Haggai.txt', chapters: 2 },
    { id: 'zechariah', name: 'Zechariah', abbr: 'Zech', file: '38_Zechariah.txt', chapters: 14 },
    { id: 'malachi', name: 'Malachi', abbr: 'Mal', file: '39_Malachi.txt', chapters: 4 },
  ],
  newTestament: [
    { id: 'matthew', name: 'Matthew', abbr: 'Matt', file: '01_Matthew.txt', chapters: 28 },
    { id: 'mark', name: 'Mark', abbr: 'Mark', file: '02_Mark.txt', chapters: 16 },
    { id: 'luke', name: 'Luke', abbr: 'Luke', file: '03_Luke.txt', chapters: 24 },
    { id: 'john', name: 'John', abbr: 'John', file: '04_John.txt', chapters: 21 },
    { id: 'acts', name: 'Acts', abbr: 'Acts', file: '05_Acts.txt', chapters: 28 },
    { id: 'romans', name: 'Romans', abbr: 'Rom', file: '06_Romans.txt', chapters: 16 },
    { id: '1corinthians', name: '1 Corinthians', abbr: '1Cor', file: '07_1_Corinthians.txt', chapters: 16 },
    { id: '2corinthians', name: '2 Corinthians', abbr: '2Cor', file: '08_2_Corinthians.txt', chapters: 13 },
    { id: 'galatians', name: 'Galatians', abbr: 'Gal', file: '09_Galatians.txt', chapters: 6 },
    { id: 'ephesians', name: 'Ephesians', abbr: 'Eph', file: '10_Ephesians.txt', chapters: 6 },
    { id: 'philippians', name: 'Philippians', abbr: 'Phil', file: '11_Philippians.txt', chapters: 4 },
    { id: 'colossians', name: 'Colossians', abbr: 'Col', file: '12_Colossians.txt', chapters: 4 },
    { id: '1thessalonians', name: '1 Thessalonians', abbr: '1Thess', file: '13_1_Thessalonians.txt', chapters: 5 },
    { id: '2thessalonians', name: '2 Thessalonians', abbr: '2Thess', file: '14_2_Thessalonians.txt', chapters: 3 },
    { id: '1timothy', name: '1 Timothy', abbr: '1Tim', file: '15_1_Timothy.txt', chapters: 6 },
    { id: '2timothy', name: '2 Timothy', abbr: '2Tim', file: '16_2_Timothy.txt', chapters: 4 },
    { id: 'titus', name: 'Titus', abbr: 'Titus', file: '17_Titus.txt', chapters: 3 },
    { id: 'philemon', name: 'Philemon', abbr: 'Phlm', file: '18_Philemon.txt', chapters: 1 },
    { id: 'hebrews', name: 'Hebrews', abbr: 'Heb', file: '19_Hebrews.txt', chapters: 13 },
    { id: 'james', name: 'James', abbr: 'Jas', file: '20_James.txt', chapters: 5 },
    { id: '1peter', name: '1 Peter', abbr: '1Pet', file: '21_1_Peter.txt', chapters: 5 },
    { id: '2peter', name: '2 Peter', abbr: '2Pet', file: '22_2_Peter.txt', chapters: 3 },
    { id: '1john', name: '1 John', abbr: '1John', file: '23_1_John.txt', chapters: 5 },
    { id: '2john', name: '2 John', abbr: '2John', file: '24_2_John.txt', chapters: 1 },
    { id: '3john', name: '3 John', abbr: '3John', file: '25_3_John.txt', chapters: 1 },
    { id: 'jude', name: 'Jude', abbr: 'Jude', file: '26_Jude.txt', chapters: 1 },
    { id: 'revelation', name: 'Revelation', abbr: 'Rev', file: '27_Revelation.txt', chapters: 22 },
  ],
};

// Paths
const BIBLE_SOURCE_PATH = '/Users/patrickrobinson/Desktop/BibleProject/Bibles/Split_Bible';
const OUTPUT_PATH = '/Users/patrickrobinson/Desktop/BibleProject/bible-lens-app/src/data/bibles/bsb';

function parseVerseLine(line) {
  // Format: "Genesis 1:1\tIn the beginning..."
  const tabIndex = line.indexOf('\t');
  if (tabIndex === -1) return null;
  
  const reference = line.substring(0, tabIndex);
  const text = line.substring(tabIndex + 1);
  
  // Parse reference: "Genesis 1:1" or "1 Corinthians 15:45"
  const colonIndex = reference.lastIndexOf(':');
  const spaceBeforeChapter = reference.lastIndexOf(' ', colonIndex);
  
  const chapter = parseInt(reference.substring(spaceBeforeChapter + 1, colonIndex));
  const verse = parseInt(reference.substring(colonIndex + 1));
  
  return { chapter, verse, text };
}

function processBook(bookMeta, testament) {
  const folder = testament === 'oldTestament' ? 'Old_Testament' : 'New_Testament';
  const filePath = path.join(BIBLE_SOURCE_PATH, folder, bookMeta.file);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️  File not found: ${filePath}`);
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  // Organize verses by chapter
  const chapters = {};
  
  for (const line of lines) {
    const parsed = parseVerseLine(line);
    if (!parsed) continue;
    
    if (!chapters[parsed.chapter]) {
      chapters[parsed.chapter] = [];
    }
    
    chapters[parsed.chapter].push({
      verse: parsed.verse,
      text: parsed.text,
    });
  }
  
  return {
    id: bookMeta.id,
    name: bookMeta.name,
    abbr: bookMeta.abbr,
    testament: testament === 'oldTestament' ? 'OT' : 'NT',
    chapterCount: Object.keys(chapters).length,
    chapters,
  };
}

function main() {
  console.log('📖 Processing Bible text files...\n');
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
  }
  
  const allBooks = [];
  
  // Process Old Testament
  console.log('📜 Old Testament:');
  for (const book of BOOKS.oldTestament) {
    process.stdout.write(`  Processing ${book.name}...`);
    const data = processBook(book, 'oldTestament');
    if (data) {
      const outputFile = path.join(OUTPUT_PATH, `${book.id}.json`);
      fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
      allBooks.push({
        id: book.id,
        name: book.name,
        abbr: book.abbr,
        testament: 'OT',
        chapters: data.chapterCount,
      });
      console.log(` ✅ (${data.chapterCount} chapters)`);
    }
  }
  
  // Process New Testament
  console.log('\n📜 New Testament:');
  for (const book of BOOKS.newTestament) {
    process.stdout.write(`  Processing ${book.name}...`);
    const data = processBook(book, 'newTestament');
    if (data) {
      const outputFile = path.join(OUTPUT_PATH, `${book.id}.json`);
      fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
      allBooks.push({
        id: book.id,
        name: book.name,
        abbr: book.abbr,
        testament: 'NT',
        chapters: data.chapterCount,
      });
      console.log(` ✅ (${data.chapterCount} chapters)`);
    }
  }
  
  // Write index file
  const indexFile = path.join(OUTPUT_PATH, 'index.json');
  fs.writeFileSync(indexFile, JSON.stringify({
    translation: 'BSB',
    name: 'Berean Standard Bible',
    books: allBooks,
  }, null, 2));
  
  console.log(`\n✨ Done! Processed ${allBooks.length} books.`);
  console.log(`📁 Output: ${OUTPUT_PATH}`);
}

main();

