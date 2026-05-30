"use client";

/**
 * Light mode was retired 2026-05-30 — the brand mark (vertical beam + horizontal
 * lens flare) reads as a cross on light surfaces, and the glow only works on
 * dark. The app is now forced-dark via ThemeProvider (forcedTheme="dark").
 *
 * This component is intentionally a no-op so the (few) remaining call sites
 * render nothing instead of a dead toggle. Safe to delete the call sites later.
 */
export function ThemeToggle() {
  return null;
}
