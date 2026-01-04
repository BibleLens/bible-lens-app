/**
 * Bible data types and utilities
 */

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

// Import all book data statically
import genesisData from '@/data/bibles/bsb/genesis.json';
import exodusData from '@/data/bibles/bsb/exodus.json';
import leviticusData from '@/data/bibles/bsb/leviticus.json';
import numbersData from '@/data/bibles/bsb/numbers.json';
import deuteronomyData from '@/data/bibles/bsb/deuteronomy.json';
import joshuaData from '@/data/bibles/bsb/joshua.json';
import judgesData from '@/data/bibles/bsb/judges.json';
import ruthData from '@/data/bibles/bsb/ruth.json';
import samuel1Data from '@/data/bibles/bsb/1samuel.json';
import samuel2Data from '@/data/bibles/bsb/2samuel.json';
import kings1Data from '@/data/bibles/bsb/1kings.json';
import kings2Data from '@/data/bibles/bsb/2kings.json';
import chronicles1Data from '@/data/bibles/bsb/1chronicles.json';
import chronicles2Data from '@/data/bibles/bsb/2chronicles.json';
import ezraData from '@/data/bibles/bsb/ezra.json';
import nehemiahData from '@/data/bibles/bsb/nehemiah.json';
import estherData from '@/data/bibles/bsb/esther.json';
import jobData from '@/data/bibles/bsb/job.json';
import psalmsData from '@/data/bibles/bsb/psalms.json';
import proverbsData from '@/data/bibles/bsb/proverbs.json';
import ecclesiastesData from '@/data/bibles/bsb/ecclesiastes.json';
import songData from '@/data/bibles/bsb/songofsolomon.json';
import isaiahData from '@/data/bibles/bsb/isaiah.json';
import jeremiahData from '@/data/bibles/bsb/jeremiah.json';
import lamentationsData from '@/data/bibles/bsb/lamentations.json';
import ezekielData from '@/data/bibles/bsb/ezekiel.json';
import danielData from '@/data/bibles/bsb/daniel.json';
import hoseaData from '@/data/bibles/bsb/hosea.json';
import joelData from '@/data/bibles/bsb/joel.json';
import amosData from '@/data/bibles/bsb/amos.json';
import obadiahData from '@/data/bibles/bsb/obadiah.json';
import jonahData from '@/data/bibles/bsb/jonah.json';
import micahData from '@/data/bibles/bsb/micah.json';
import nahumData from '@/data/bibles/bsb/nahum.json';
import habakkukData from '@/data/bibles/bsb/habakkuk.json';
import zephaniahData from '@/data/bibles/bsb/zephaniah.json';
import haggaiData from '@/data/bibles/bsb/haggai.json';
import zechariahData from '@/data/bibles/bsb/zechariah.json';
import malachiData from '@/data/bibles/bsb/malachi.json';
import matthewData from '@/data/bibles/bsb/matthew.json';
import markData from '@/data/bibles/bsb/mark.json';
import lukeData from '@/data/bibles/bsb/luke.json';
import johnData from '@/data/bibles/bsb/john.json';
import actsData from '@/data/bibles/bsb/acts.json';
import romansData from '@/data/bibles/bsb/romans.json';
import corinthians1Data from '@/data/bibles/bsb/1corinthians.json';
import corinthians2Data from '@/data/bibles/bsb/2corinthians.json';
import galatiansData from '@/data/bibles/bsb/galatians.json';
import ephesiansData from '@/data/bibles/bsb/ephesians.json';
import philippiansData from '@/data/bibles/bsb/philippians.json';
import colossiansData from '@/data/bibles/bsb/colossians.json';
import thessalonians1Data from '@/data/bibles/bsb/1thessalonians.json';
import thessalonians2Data from '@/data/bibles/bsb/2thessalonians.json';
import timothy1Data from '@/data/bibles/bsb/1timothy.json';
import timothy2Data from '@/data/bibles/bsb/2timothy.json';
import titusData from '@/data/bibles/bsb/titus.json';
import philemonData from '@/data/bibles/bsb/philemon.json';
import hebrewsData from '@/data/bibles/bsb/hebrews.json';
import jamesData from '@/data/bibles/bsb/james.json';
import peter1Data from '@/data/bibles/bsb/1peter.json';
import peter2Data from '@/data/bibles/bsb/2peter.json';
import john1Data from '@/data/bibles/bsb/1john.json';
import john2Data from '@/data/bibles/bsb/2john.json';
import john3Data from '@/data/bibles/bsb/3john.json';
import judeData from '@/data/bibles/bsb/jude.json';
import revelationData from '@/data/bibles/bsb/revelation.json';
import indexData from '@/data/bibles/bsb/index.json';

// Book data map
const bookDataMap: Record<string, BookData> = {
  genesis: genesisData as BookData,
  exodus: exodusData as BookData,
  leviticus: leviticusData as BookData,
  numbers: numbersData as BookData,
  deuteronomy: deuteronomyData as BookData,
  joshua: joshuaData as BookData,
  judges: judgesData as BookData,
  ruth: ruthData as BookData,
  '1samuel': samuel1Data as BookData,
  '2samuel': samuel2Data as BookData,
  '1kings': kings1Data as BookData,
  '2kings': kings2Data as BookData,
  '1chronicles': chronicles1Data as BookData,
  '2chronicles': chronicles2Data as BookData,
  ezra: ezraData as BookData,
  nehemiah: nehemiahData as BookData,
  esther: estherData as BookData,
  job: jobData as BookData,
  psalms: psalmsData as BookData,
  proverbs: proverbsData as BookData,
  ecclesiastes: ecclesiastesData as BookData,
  songofsolomon: songData as BookData,
  isaiah: isaiahData as BookData,
  jeremiah: jeremiahData as BookData,
  lamentations: lamentationsData as BookData,
  ezekiel: ezekielData as BookData,
  daniel: danielData as BookData,
  hosea: hoseaData as BookData,
  joel: joelData as BookData,
  amos: amosData as BookData,
  obadiah: obadiahData as BookData,
  jonah: jonahData as BookData,
  micah: micahData as BookData,
  nahum: nahumData as BookData,
  habakkuk: habakkukData as BookData,
  zephaniah: zephaniahData as BookData,
  haggai: haggaiData as BookData,
  zechariah: zechariahData as BookData,
  malachi: malachiData as BookData,
  matthew: matthewData as BookData,
  mark: markData as BookData,
  luke: lukeData as BookData,
  john: johnData as BookData,
  acts: actsData as BookData,
  romans: romansData as BookData,
  '1corinthians': corinthians1Data as BookData,
  '2corinthians': corinthians2Data as BookData,
  galatians: galatiansData as BookData,
  ephesians: ephesiansData as BookData,
  philippians: philippiansData as BookData,
  colossians: colossiansData as BookData,
  '1thessalonians': thessalonians1Data as BookData,
  '2thessalonians': thessalonians2Data as BookData,
  '1timothy': timothy1Data as BookData,
  '2timothy': timothy2Data as BookData,
  titus: titusData as BookData,
  philemon: philemonData as BookData,
  hebrews: hebrewsData as BookData,
  james: jamesData as BookData,
  '1peter': peter1Data as BookData,
  '2peter': peter2Data as BookData,
  '1john': john1Data as BookData,
  '2john': john2Data as BookData,
  '3john': john3Data as BookData,
  jude: judeData as BookData,
  revelation: revelationData as BookData,
};

export function getBibleIndex(): BibleIndex {
  return indexData as BibleIndex;
}

export function getBook(bookId: string): BookData | null {
  return bookDataMap[bookId] || null;
}

export function getChapter(bookId: string, chapter: number): Verse[] | null {
  const book = getBook(bookId);
  if (!book) return null;
  return book.chapters[chapter.toString()] || null;
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

