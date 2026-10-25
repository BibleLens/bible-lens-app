import { NextResponse } from 'next/server';
import { getQdrantClient, COLLECTION_NAME } from '@/lib/qdrant';

// Cache and coalesce readiness probes within this instance to avoid a database
// request per visitor. No credentials, collection details or errors are public.
let cached: { healthy: boolean; expires: number } | undefined;
let pending: Promise<boolean> | undefined;

export async function GET() {
  if (!cached || Date.now() >= cached.expires) {
    pending ??= (async () => {
      try {
        await getQdrantClient().getCollection(COLLECTION_NAME);
        return true;
      } catch { return false; }
    })().then((healthy) => {
      cached = { healthy, expires: Date.now() + 30_000 };
      pending = undefined;
      return healthy;
    });
    await pending;
  }
  const healthy = cached?.healthy === true;
  return NextResponse.json({ status: healthy ? 'ok' : 'error' }, {
    status: healthy ? 200 : 503,
    headers: { 'Cache-Control': 'no-store' },
  });
}
