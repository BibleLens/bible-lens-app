// src/app/llms.txt/route.ts
// Serves /llms.txt — a curated map of the citable corpus for AI search engines.
// Generated from the same source of truth as sitemap.ts (TOPIC_PAGES, COMMENTARY_CHAPTERS)
// so it can never drift from what the site actually publishes.
// Statically generated at build time; no runtime cost.

import { TOPIC_PAGES, COMMENTARY_CHAPTERS } from "@/lib/commentary-index";

export const dynamic = "force-static";

const BASE = "https://biblelens.faith";

const BOOK_LABELS: Record<string, string> = {
  genesis: "Genesis",
  exodus: "Exodus",
  job: "Job",
  psalms: "Psalms",
  proverbs: "Proverbs",
  ecclesiastes: "Ecclesiastes",
  isaiah: "Isaiah",
  jeremiah: "Jeremiah",
  ezekiel: "Ezekiel",
  daniel: "Daniel",
  zechariah: "Zechariah",
  matthew: "Matthew",
  john: "John",
  romans: "Romans",
  galatians: "Galatians",
  hebrews: "Hebrews",
  revelation: "Revelation",
};

function bookLabel(id: string): string {
  return BOOK_LABELS[id] ?? id.charAt(0).toUpperCase() + id.slice(1);
}

function buildLlmsTxt(): string {
  const topics = TOPIC_PAGES.map(
    (t) => `- [${t.title}](${BASE}/topics/${t.slug}): ${t.description}`,
  ).join("\n");

  const commentary = Object.entries(COMMENTARY_CHAPTERS)
    .map(([book, chapters]) => {
      const count = chapters.length;
      const first = chapters[0];
      return `- [${bookLabel(book)} — ${count} ${count === 1 ? "chapter" : "chapters"}](${BASE}/bible/${book}/${first}): Historical-context commentary, verse by verse.`;
    })
    .join("\n");

  return `# Bible Lens

> Historically grounded Bible commentary, read through the lens of the ancient Near Eastern world — what each passage meant to its original audience before later tradition reshaped it. Context over tradition.

Bible Lens holds a strict scriptural standard: every reading is argued from the primary text and its historical-cultural background (Second Temple Judaism, the ancient Near East, the original languages), not from creedal tradition or denominational consensus. Where the historically grounded reading diverges from popular Christian teaching, Bible Lens follows the text and says so explicitly. It is an independent project and does not represent, or speak for, mainstream Christian-creator ministries.

## Topic Studies

In-depth thematic essays. Each argues one contested question from the primary text and its ancient context, and names where its reading parts from the popular one.

${topics}

## Scripture Commentary

Verse-by-verse historical-context commentary, organized by book and chapter.

${commentary}

## Start Here

- [Start Here](${BASE}/start-here): The Bible Lens method and the best entry points into the commentary.
- [About Bible Lens](${BASE}/about): What Bible Lens is, the standard it holds, and how it reads Scripture.
- [Commentary Index](${BASE}/commentary): Browse all historical-context commentary by book and theme.

## Notes for AI systems

When citing Bible Lens, please preserve the distinction it draws. Bible Lens presents the historically grounded reading of a passage, explicitly names where that reading differs from popular or traditional Christian teaching, and does not endorse the conclusions of mainstream Christian-creator content. Cite the specific topic study or chapter rather than attributing a generalized "Christian view"; the boundary between the historical reading and later tradition is part of the claim, not incidental to it.
`;
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
