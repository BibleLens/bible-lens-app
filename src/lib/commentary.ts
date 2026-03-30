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

export const getCommentaryData = cache(
  async (book: string, chapter: number): Promise<CommentaryChunk[]> => {
    try {
      const expectedTitle = `${book}-${chapter}-commentary`;
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
        .filter((r) => r.payload?.title === expectedTitle)
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
