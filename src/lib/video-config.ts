/**
 * VIDEO_CONFIG — deploy-gated YouTube video activation.
 *
 * To enable a video embed on a chapter page:
 * 1. Add the YouTube video ID as the value for the chapter key
 * 2. Deploy — the embed appears immediately on next build
 *
 * To disable a video without removing the config entry:
 * Set the value to "" (empty string) — getVideoId() returns undefined
 *
 * Chapter key format: "{bookId}-{chapterNumber}" (matches COMMENTARY_DESCRIPTIONS)
 *
 * Deploy-gated activation: updating this file and redeploying activates the embed.
 * Actual video IDs must exist before activation. Ship with empty strings for
 * infrastructure-first delivery.
 */
export const VIDEO_CONFIG: Record<string, string> = {
  "genesis-1": "",   // TODO: Add YouTube video ID when available
  "genesis-2": "",   // TODO: Add YouTube video ID when available
  "genesis-3": "",   // TODO: Add YouTube video ID when available
  "matthew-24": "",  // TODO: Add YouTube video ID when available
};

/**
 * Returns the YouTube video ID for a chapter, or undefined if not configured.
 * Chapters with empty string values are treated as "not configured".
 */
export function getVideoId(bookId: string, chapter: number): string | undefined {
  const key = `${bookId}-${chapter}`;
  const id = VIDEO_CONFIG[key];
  return id && id.length > 0 ? id : undefined;
}
