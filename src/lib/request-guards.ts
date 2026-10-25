// Bounds are enforced while reading, including requests without Content-Length.
export async function readJsonObject(request: Request, maxBytes: number): Promise<
  { body: Record<string, unknown>; response?: never } | { body?: never; response: Response }
> {
  const error = (message: string, status: number) => ({
    response: Response.json({ error: message }, { status }),
  });
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return error('Please send a JSON request.', 415);
  }
  if (Number(request.headers.get('content-length')) > maxBytes) {
    return error('Request is too large.', 413);
  }
  const reader = request.body?.getReader();
  if (!reader) return error('Invalid request.', 400);
  let timer: ReturnType<typeof setTimeout> | undefined;
  let complete = false;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('timeout')), 5000);
  });
  try {
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await Promise.race([reader.read(), deadline]);
      if (done) { complete = true; break; }
      size += value.byteLength;
      if (size > maxBytes) return error('Request is too large.', 413);
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const body: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!body || typeof body !== 'object' || Array.isArray(body)) return error('Invalid request.', 400);
    return { body: body as Record<string, unknown> };
  } catch {
    return error('Invalid or incomplete request.', 400);
  } finally {
    clearTimeout(timer);
    if (!complete) void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

// A browser-origin check, not authentication. Direct clients can still call APIs.
export function crossOrigin(request: Request): boolean {
  if (request.headers.get('sec-fetch-site') === 'cross-site') return true;
  const source = request.headers.get('origin') ?? request.headers.get('referer');
  if (!source) return false;
  try { return new URL(source).origin !== new URL(request.url).origin; }
  catch { return true; }
}
