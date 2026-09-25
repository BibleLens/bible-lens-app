/** A release date alone does not mean a scheduled film is playable. */
export async function isKingdomVideoAvailable(
  episode: { videoId: string; releaseAt: string },
  now = Date.now(),
  request: typeof fetch = fetch,
): Promise<boolean> {
  if (now < Date.parse(episode.releaseAt) || !Number.isFinite(Date.parse(episode.releaseAt))) return false;
  try {
    const url = new URL("https://www.youtube.com/oembed");
    url.searchParams.set("url", `https://www.youtube.com/watch?v=${episode.videoId}`);
    url.searchParams.set("format", "json");
    const response = await request(url, { next: { revalidate: 300 }, signal: AbortSignal.timeout(4000) });
    if (!response.ok) return false;
    const data = await response.json();
    return data.provider_name === "YouTube" && typeof data.title === "string" && data.title.length > 0;
  } catch {
    return false;
  }
}
