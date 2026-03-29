"use client";

import { YouTubeEmbed } from "@next/third-parties/google";

interface VideoEmbedProps {
  videoId: string;
  title?: string;
}

export function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  return (
    // aspectRatio reserves space before the lite-youtube-embed web component upgrades
    // — prevents CLS (Cumulative Layout Shift). Without this, a layout shift occurs
    // from 0px to the video height when the custom element registers itself.
    <div
      className="rounded-none overflow-hidden border border-[var(--color-border)]"
      style={{ aspectRatio: "16/9", width: "100%" }}
    >
      <YouTubeEmbed
        videoid={videoId}
        playlabel={title ? `Play ${title}` : "Play video"}
        style="border-radius: 0; width: 100%; height: 100%;"
      />
    </div>
  );
}
