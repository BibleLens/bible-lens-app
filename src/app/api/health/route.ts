// src/app/api/health/route.ts
// Health check — verifies Qdrant connection using shared singleton client
import { NextResponse } from 'next/server';
import { getQdrantClient, COLLECTION_NAME } from '@/lib/qdrant';

export async function GET() {
  try {
    const client = getQdrantClient();
    const info = await client.getCollection(COLLECTION_NAME);

    return NextResponse.json({
      status: 'ok',
      qdrant: 'connected',
      collection: COLLECTION_NAME,
      pointsCount: info.points_count,
      vectorSize: (info.config?.params?.vectors as { size?: number } | undefined)?.size,
      collectionStatus: info.status,
    });
  } catch (err) {
    return NextResponse.json(
      { status: 'error', message: String(err) },
      { status: 503 }
    );
  }
}
