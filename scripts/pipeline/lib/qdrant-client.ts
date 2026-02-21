// scripts/pipeline/lib/qdrant-client.ts
import { QdrantClient } from '@qdrant/js-client-rest';

export const COLLECTION_NAME = 'bible_lens_knowledge';

export function createQdrantClient(): QdrantClient {
  const url = process.env.QDRANT_URL;
  const apiKey = process.env.QDRANT_API_KEY;

  if (!url || !apiKey) {
    throw new Error(
      'Missing required env vars: QDRANT_URL and QDRANT_API_KEY must be set in .env.local'
    );
  }

  return new QdrantClient({ url, apiKey });
}
