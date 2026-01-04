/**
 * Bible Search Utilities
 * Basic text search across all books
 */

import { getAllBooks, getBook, BookMeta, Verse } from './bible';

export interface SearchResult {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  // For highlighting
  matchStart: number;
  matchEnd: number;
}

/**
 * Search all books for verses containing the query
 * Returns up to maxResults matches
 */
export function searchBible(query: string, maxResults: number = 50): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];
  const books = getAllBooks();

  for (const bookMeta of books) {
    if (results.length >= maxResults) break;

    const book = getBook(bookMeta.id);
    if (!book) continue;

    for (const [chapterNum, verses] of Object.entries(book.chapters)) {
      if (results.length >= maxResults) break;

      for (const verse of verses) {
        if (results.length >= maxResults) break;

        const lowerText = verse.text.toLowerCase();
        const matchIndex = lowerText.indexOf(normalizedQuery);

        if (matchIndex !== -1) {
          results.push({
            bookId: bookMeta.id,
            bookName: bookMeta.name,
            chapter: parseInt(chapterNum),
            verse: verse.verse,
            text: verse.text,
            matchStart: matchIndex,
            matchEnd: matchIndex + normalizedQuery.length,
          });
        }
      }
    }
  }

  return results;
}

/**
 * Get highlighted text with the match wrapped
 */
export function highlightMatch(text: string, matchStart: number, matchEnd: number): {
  before: string;
  match: string;
  after: string;
} {
  return {
    before: text.substring(0, matchStart),
    match: text.substring(matchStart, matchEnd),
    after: text.substring(matchEnd),
  };
}

/**
 * Parse a verse reference like "John 3:16" or "1 Cor 15:45"
 * Returns null if not a valid reference
 */
export function parseVerseReference(input: string): {
  bookId: string;
  chapter: number;
  verse?: number;
} | null {
  const normalized = input.trim();
  
  // Common book name mappings
  const bookMappings: Record<string, string> = {
    'gen': 'genesis',
    'genesis': 'genesis',
    'ex': 'exodus',
    'exod': 'exodus',
    'exodus': 'exodus',
    'lev': 'leviticus',
    'leviticus': 'leviticus',
    'num': 'numbers',
    'numbers': 'numbers',
    'deut': 'deuteronomy',
    'deuteronomy': 'deuteronomy',
    'josh': 'joshua',
    'joshua': 'joshua',
    'judg': 'judges',
    'judges': 'judges',
    'ruth': 'ruth',
    '1 sam': '1samuel',
    '1 samuel': '1samuel',
    '1sam': '1samuel',
    '2 sam': '2samuel',
    '2 samuel': '2samuel',
    '2sam': '2samuel',
    '1 kings': '1kings',
    '1 kgs': '1kings',
    '1kings': '1kings',
    '2 kings': '2kings',
    '2 kgs': '2kings',
    '2kings': '2kings',
    '1 chr': '1chronicles',
    '1 chronicles': '1chronicles',
    '1chronicles': '1chronicles',
    '2 chr': '2chronicles',
    '2 chronicles': '2chronicles',
    '2chronicles': '2chronicles',
    'ezra': 'ezra',
    'neh': 'nehemiah',
    'nehemiah': 'nehemiah',
    'esth': 'esther',
    'esther': 'esther',
    'job': 'job',
    'ps': 'psalms',
    'psalm': 'psalms',
    'psalms': 'psalms',
    'prov': 'proverbs',
    'proverbs': 'proverbs',
    'eccl': 'ecclesiastes',
    'ecclesiastes': 'ecclesiastes',
    'song': 'songofsolomon',
    'song of solomon': 'songofsolomon',
    'isa': 'isaiah',
    'isaiah': 'isaiah',
    'jer': 'jeremiah',
    'jeremiah': 'jeremiah',
    'lam': 'lamentations',
    'lamentations': 'lamentations',
    'ezek': 'ezekiel',
    'ezekiel': 'ezekiel',
    'dan': 'daniel',
    'daniel': 'daniel',
    'hos': 'hosea',
    'hosea': 'hosea',
    'joel': 'joel',
    'amos': 'amos',
    'obad': 'obadiah',
    'obadiah': 'obadiah',
    'jonah': 'jonah',
    'mic': 'micah',
    'micah': 'micah',
    'nah': 'nahum',
    'nahum': 'nahum',
    'hab': 'habakkuk',
    'habakkuk': 'habakkuk',
    'zeph': 'zephaniah',
    'zephaniah': 'zephaniah',
    'hag': 'haggai',
    'haggai': 'haggai',
    'zech': 'zechariah',
    'zechariah': 'zechariah',
    'mal': 'malachi',
    'malachi': 'malachi',
    'matt': 'matthew',
    'matthew': 'matthew',
    'mark': 'mark',
    'luke': 'luke',
    'john': 'john',
    'jn': 'john',
    'acts': 'acts',
    'rom': 'romans',
    'romans': 'romans',
    '1 cor': '1corinthians',
    '1 corinthians': '1corinthians',
    '1cor': '1corinthians',
    '2 cor': '2corinthians',
    '2 corinthians': '2corinthians',
    '2cor': '2corinthians',
    'gal': 'galatians',
    'galatians': 'galatians',
    'eph': 'ephesians',
    'ephesians': 'ephesians',
    'phil': 'philippians',
    'philippians': 'philippians',
    'col': 'colossians',
    'colossians': 'colossians',
    '1 thess': '1thessalonians',
    '1 thessalonians': '1thessalonians',
    '1thess': '1thessalonians',
    '2 thess': '2thessalonians',
    '2 thessalonians': '2thessalonians',
    '2thess': '2thessalonians',
    '1 tim': '1timothy',
    '1 timothy': '1timothy',
    '1tim': '1timothy',
    '2 tim': '2timothy',
    '2 timothy': '2timothy',
    '2tim': '2timothy',
    'titus': 'titus',
    'philem': 'philemon',
    'philemon': 'philemon',
    'heb': 'hebrews',
    'hebrews': 'hebrews',
    'james': 'james',
    'jas': 'james',
    '1 pet': '1peter',
    '1 peter': '1peter',
    '1pet': '1peter',
    '2 pet': '2peter',
    '2 peter': '2peter',
    '2pet': '2peter',
    '1 john': '1john',
    '1 jn': '1john',
    '1john': '1john',
    '2 john': '2john',
    '2 jn': '2john',
    '2john': '2john',
    '3 john': '3john',
    '3 jn': '3john',
    '3john': '3john',
    'jude': 'jude',
    'rev': 'revelation',
    'revelation': 'revelation',
  };

  // Try to match patterns like "John 3:16" or "1 Cor 15:45" or "Genesis 1"
  const pattern = /^(\d?\s*[a-zA-Z]+)\s*(\d+)(?::(\d+))?$/i;
  const match = normalized.match(pattern);

  if (!match) return null;

  const bookPart = match[1].toLowerCase().trim();
  const chapter = parseInt(match[2]);
  const verse = match[3] ? parseInt(match[3]) : undefined;

  const bookId = bookMappings[bookPart];
  if (!bookId) return null;

  return { bookId, chapter, verse };
}

