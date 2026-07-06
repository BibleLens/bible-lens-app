"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ZoomableTimelineImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  /** sizes hint for the inline (non-zoomed) render */
  sizes?: string;
}

/**
 * Timeline infographics carry fine print baked into the PNG that shrinks with the
 * image. Clicking/tapping opens a full-screen lightbox so the detail is legible;
 * the readable content also lives as HTML text alongside each image.
 */
export function ZoomableTimelineImage({
  src,
  alt,
  width,
  height,
  priority,
  className,
  sizes,
}: ZoomableTimelineImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in"
        aria-label={`Enlarge infographic: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={className}
          sizes={sizes}
        />
      </button>
      <figcaption
        className="text-center micro-label mt-2"
        style={{ color: "var(--color-text-muted)" }}
        aria-hidden="true"
      >
        Click to enlarge
      </figcaption>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-auto p-4 cursor-zoom-out"
          style={{ background: "rgba(5,5,8,0.94)", backdropFilter: "blur(4px)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="h-auto w-auto max-h-[92vh] max-w-[92vw] cursor-default"
            style={{ borderRadius: 0 }}
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="fixed top-4 right-4 flex items-center justify-center transition-colors"
            style={{
              width: 44,
              height: 44,
              color: "var(--color-text-primary)",
              background: "rgba(20,28,32,0.7)",
              border: "1px solid rgba(0,229,255,0.3)",
            }}
          >
            <span aria-hidden="true" style={{ fontSize: 22, lineHeight: 1 }}>
              ×
            </span>
          </button>
        </div>
      )}
    </>
  );
}
