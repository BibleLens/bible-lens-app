// src/lib/commentary.ts
// Server-side commentary fetch wrapped in React cache() for request-level deduplication.
// Allows both generateMetadata and the page component to call getCommentaryData()
// without double Qdrant round-trips on the same request.
import { cache } from "react";
import { getQdrantClient, COLLECTION_NAME } from "@/lib/qdrant";
import { embedQuery } from "@/lib/embeddings";

export interface CommentaryChunk {
  text: string;
  title: string;
  score: number;
  chunkIndex: number;
}

/** Check if a Qdrant title like "matthew-5-7-commentary" covers the given chapter.
 *  Handles single (matthew-13-commentary) and range (matthew-1-2-commentary) titles. */
export function titleCoversChapter(title: string, book: string, chapter: number): boolean {
  const prefix = `${book}-`;
  const suffix = "-commentary";
  if (!title.startsWith(prefix) || !title.endsWith(suffix)) return false;
  const middle = title.slice(prefix.length, -suffix.length);
  const nums = middle.split("-").map(Number);
  if (nums.some(isNaN)) return false;
  if (nums.length === 1) return nums[0] === chapter;
  // Range: check chapter falls between first and last number
  return chapter >= nums[0] && chapter <= nums[nums.length - 1];
}

export const getCommentaryData = cache(
  async (book: string, chapter: number): Promise<CommentaryChunk[]> => {
    try {
      const query = `${book} chapter ${chapter}`;
      const embedding = await embedQuery(query);
      const client = getQdrantClient();
      // Fetch extra results then post-filter by title (title field is not indexed in Qdrant)
      const results = await client.search(COLLECTION_NAME, {
        vector: embedding,
        limit: 20,
        with_payload: true,
        score_threshold: 0.3,
        filter: { must: [{ key: "source", match: { value: "personal" } }] },
      });
      const filtered = results
        .filter((r) => titleCoversChapter(r.payload?.title as string, book, chapter))
        .slice(0, 5);
      return filtered.map((r) => ({
        text: r.payload?.text as string,
        title: r.payload?.title as string,
        score: r.score,
        chunkIndex: r.payload?.chunkIndex as number,
      }));
    } catch {
      return [];
    }
  }
);
