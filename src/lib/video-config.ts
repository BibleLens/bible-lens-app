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
 *
 * See VIDEO_ACTIVATION.md (in this directory) for step-by-step activation instructions.
 */
export const VIDEO_CONFIG: Record<string, string> = {
  // Genesis
  "genesis-1": "",
  "genesis-2": "",
  "genesis-3": "",
  "genesis-6": "",
  "genesis-7": "",
  "genesis-8": "",
  "genesis-9": "",
  "genesis-11": "",
  "genesis-12": "",
  "genesis-22": "",
  "genesis-28": "",
  "genesis-37": "",
  // Daniel
  "daniel-1": "",
  "daniel-2": "",
  "daniel-3": "",
  "daniel-4": "",
  "daniel-5": "",
  "daniel-6": "",
  "daniel-7": "",
  "daniel-8": "",
  "daniel-9": "",
  "daniel-10": "",
  "daniel-11": "",
  "daniel-12": "",
  // Matthew
  "matthew-24": "",
  // Revelation
  "revelation-1": "",
  "revelation-2": "",
  "revelation-3": "",
  "revelation-4": "",
  "revelation-5": "",
  "revelation-6": "",
  "revelation-7": "",
  "revelation-12": "",
  "revelation-13": "",
  "revelation-14": "",
  "revelation-17": "",
  "revelation-18": "",
  "revelation-19": "",
  "revelation-20": "",
  "revelation-21": "",
  "revelation-22": "",
};

const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

function isValidYouTubeId(id: string): boolean {
  return YOUTUBE_ID_PATTERN.test(id);
}

/**
 * Returns the YouTube video ID for a chapter, or undefined if not configured.
 * Chapters with empty string values are treated as "not configured".
 * Non-empty values are validated against the YouTube ID format (11-character
 * alphanumeric + hyphen + underscore). Invalid IDs produce a console warning
 * and return undefined (graceful no-render).
 */
export function getVideoId(bookId: string, chapter: number): string | undefined {
  const key = `${bookId}-${chapter}`;
  const id = VIDEO_CONFIG[key];
  if (!id || id.length === 0) {
    return undefined;
  }
  if (!isValidYouTubeId(id)) {
    console.warn(
      `[VIDEO_CONFIG] Invalid YouTube ID for "${key}": "${id}" — expected 11-character alphanumeric ID. Skipping embed.`
    );
    return undefined;
  }
  return id;
}
