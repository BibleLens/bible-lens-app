import type { MetadataRoute } from "next";
import { getAllBooks } from "@/lib/bible";
import { COMMENTARY_CHAPTERS, TOPIC_PAGES } from "@/lib/commentary-index";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://biblelens.faith";
  const books = getAllBooks();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/chat`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/search`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/commentary`, changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const chapterEntries: MetadataRoute.Sitemap = books.flatMap((book) => {
    const commentaryChapters = COMMENTARY_CHAPTERS[book.id] ?? [];
    return Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => ({
      url: `${base}/bible/${book.id}/${ch}`,
      changeFrequency: "monthly" as const,
      priority: commentaryChapters.includes(ch) ? 0.9 : 0.5,
    }));
  });

  const topicEntries: MetadataRoute.Sitemap = TOPIC_PAGES.map((topic) => ({
    url: `${base}/topics/${topic.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...chapterEntries, ...topicEntries];
}
