// src/lib/qdrant.ts
// Singleton Qdrant client factory — create once, reuse across warm invocations
import { QdrantClient } from '@qdrant/js-client-rest';

export const COLLECTION_NAME = 'bible_lens_knowledge';

let _client: QdrantClient | null = null;

export function getQdrantClient(): QdrantClient {
  if (_client) return _client;

  const url = process.env.QDRANT_URL;
  const apiKey = process.env.QDRANT_API_KEY;

  if (!url || !apiKey) {
    throw new Error('QDRANT_URL and QDRANT_API_KEY must be set');
  }

  // Keep URL exactly as-is from env (includes :6333 port) — do NOT strip the port
  _client = new QdrantClient({ url, apiKey });
  return _client;
}
