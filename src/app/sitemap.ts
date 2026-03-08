import type { MetadataRoute } from "next";
import { getAllBooks } from "@/lib/bible";

const COMMENTARY_CHAPTERS: Record<string, number[]> = {
  genesis: [1, 2, 3, 6, 7, 8, 9, 11, 12, 28, 37],
  matthew: [24],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://biblelens.faith";
  const books = getAllBooks();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/chat`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/search`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const chapterEntries: MetadataRoute.Sitemap = books.flatMap((book) => {
    const commentaryChapters = COMMENTARY_CHAPTERS[book.id] ?? [];
    return Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => ({
      url: `${base}/bible/${book.id}/${ch}`,
      changeFrequency: "monthly" as const,
      priority: commentaryChapters.includes(ch) ? 0.9 : 0.5,
    }));
  });

  return [...staticEntries, ...chapterEntries];
}
