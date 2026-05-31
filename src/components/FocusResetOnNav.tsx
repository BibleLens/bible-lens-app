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

    // Focus the sentinel element after client-side navigation.
    //
    // Next.js App Router moves focus into the new page content after
    // navigation, so a plain Tab press would never reach the skip link
    // (which sits before page content in DOM order). Focusing the sentinel
    // resets the keyboard starting point to the top of the page — the
    // user's next Tab will land on the skip link, then main content.
    //
    // We focus a plain div[tabIndex=-1] sentinel rather than the skip-link
    // <a href="#main-content"> element because focusing an anchor with an
    // href can cause the browser to register a hash navigation. When that
    // navigation targets a fragment that doesn't exist in the current page
    // (#main-content is absent from some pages), the browser holds the
    // loading state open for minutes while waiting for the target to appear.
    const sentinel = document.getElementById("focus-sentinel") as HTMLElement | null;
    if (sentinel) {
      sentinel.focus({ preventScroll: true });
    }
  }, [pathname]);

  return null; // Render-less component — effect only
}
