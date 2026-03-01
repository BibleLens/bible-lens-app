"use client";

import { ScrollAnimationSection } from "@/components/ScrollAnimationSection";
import { ThemeToggle } from "@/components/ThemeToggle";

/**
 * Dev-only test route for ScrollAnimationSection visual verification.
 *
 * Verifies:
 *   SCROLL-01 — Lens deconstruction/reconstruction on scroll
 *   SCROLL-02 — Three text overlays appear/disappear in sequence
 *   SCROLL-03 — Spring physics: smooth feel during fast scroll
 *   SCROLL-04 — Reduced motion: static layout, all overlays visible simultaneously
 *   SCROLL-05 — Theme safety: no halos or background bleed in dark/light
 *
 * URL: /dev/scroll-test
 */
export default function ScrollTestPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
      }}
    >
      {/* Header: establishes content above the animation — verifies sticky positioning */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg-primary)",
          padding: "0 1.5rem",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: "var(--color-text-secondary)",
          }}
        >
          Bible Lens — Scroll Animation Dev Test
        </span>
        <ThemeToggle />
      </header>

      {/* Pre-scroll content: ensures animation starts below visible content */}
      <section
        style={{
          padding: "4rem 2rem",
          maxWidth: "640px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "1rem",
          }}
        >
          Scroll Animation Test
        </h1>
        <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
          Scroll down to see the lens deconstruction/reconstruction animation.
          Use the theme toggle above to switch between dark and light modes.
          Enable &quot;Reduce motion&quot; in System Preferences to test the
          static fallback.
        </p>
        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.8125rem",
            color: "var(--color-text-secondary)",
            opacity: 0.6,
          }}
        >
          ↓ scroll to begin ↓
        </p>
      </section>

      {/* The animation component itself — this is what we are testing */}
      <ScrollAnimationSection />

      {/* Post-scroll content: verifies normal page flow resumes after animation */}
      <section
        style={{
          padding: "4rem 2rem",
          maxWidth: "640px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            marginBottom: "0.75rem",
          }}
        >
          Animation complete
        </h2>
        <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
          If you reached this section by scrolling, the animation completed
          correctly and normal page flow has resumed. The scroll container
          released at the bottom as expected.
        </p>
      </section>
    </div>
  );
}
