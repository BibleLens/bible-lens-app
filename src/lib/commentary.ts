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
      const query = `${book} chapter ${chapter}`;
      const embedding = await embedQuery(query);
      const client = getQdrantClient();
      const results = await client.search(COLLECTION_NAME, {
        vector: embedding,
        limit: 5,
        with_payload: true,
        score_threshold: 0.3,
        filter: { must: [{ key: "source", match: { value: "personal" } }] },
      });
      return results.map((r) => ({
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
