"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function FocusResetOnNav() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the initial render — only act on client-side navigations
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Reset focus to document.body so the next Tab press starts
    // from the top of the DOM (hitting the skip link first)
    document.body.focus({ preventScroll: true });
    // If body isn't focusable, blur the active element instead
    if (document.activeElement !== document.body) {
      (document.activeElement as HTMLElement | null)?.blur();
    }
  }, [pathname]);

  return null; // Render-less component — effect only
}
