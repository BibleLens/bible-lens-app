"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export function ShareButton() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}${pathname}`;

    // Progressive enhancement: Web Share API on mobile, clipboard on desktop
    if (navigator.canShare && navigator.canShare({ url })) {
      try {
        await navigator.share({ url, title: document.title });
        // Web Share API opened share sheet — no "copied" state needed
      } catch {
        // User cancelled share sheet — silent fail (AbortError is expected)
      }
    } else {
      // Clipboard fallback for desktop (Firefox, Linux desktop, etc.)
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Clipboard unavailable — silent fail
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share this passage"
      className="p-2.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 text-base"
    >
      {copied ? (
        <>
          <svg
            className="w-4 h-4 text-[var(--color-cyan-400)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-[var(--color-cyan-400)] hidden sm:inline">Copied!</span>
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          <span className="hidden sm:inline">Share</span>
        </>
      )}
    </button>
  );
}
