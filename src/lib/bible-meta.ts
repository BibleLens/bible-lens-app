/**
 * Bible metadata types and utilities — safe to import from client components.
 *
 * Only pulls in index.json (book names/ids/chapter counts, a few KB). The full
 * verse data lives in bible.ts, which statically imports all 66 book JSONs
 * (~4.5 MB) and must stay server-side only.
 */

import indexData from '@/data/bibles/bsb/index.json';

export interface Verse {
  verse: number;
  text: string;
}

export interface BookData {
  id: string;
  name: string;
  abbr: string;
  testament: 'OT' | 'NT';
  chapterCount: number;
  chapters: Record<string, Verse[]>;
}

export interface BookMeta {
  id: string;
  name: string;
  abbr: string;
  testament: 'OT' | 'NT';
  chapters: number;
}

export interface BibleIndex {
  translation: string;
  name: string;
  books: BookMeta[];
}

export function getBibleIndex(): BibleIndex {
  return indexData as BibleIndex;
}

export function getAllBooks(): BookMeta[] {
  return (indexData as BibleIndex).books;
}

export function getOldTestamentBooks(): BookMeta[] {
  return (indexData as BibleIndex).books.filter(b => b.testament === 'OT');
}

export function getNewTestamentBooks(): BookMeta[] {
  return (indexData as BibleIndex).books.filter(b => b.testament === 'NT');
}

export function findBookById(bookId: string): BookMeta | undefined {
  return (indexData as BibleIndex).books.find(b => b.id === bookId);
}

// Get next/previous book for navigation
export function getAdjacentBooks(bookId: string): { prev: BookMeta | null; next: BookMeta | null } {
  const books = (indexData as BibleIndex).books;
  const currentIndex = books.findIndex(b => b.id === bookId);

  return {
    prev: currentIndex > 0 ? books[currentIndex - 1] : null,
    next: currentIndex < books.length - 1 ? books[currentIndex + 1] : null,
  };
}
