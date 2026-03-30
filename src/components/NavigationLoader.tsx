"use client";

import NextTopLoader from "nextjs-toploader";

export function NavigationLoader() {
  return <NextTopLoader color="var(--color-cyan-400)" height={2} showSpinner={false} />;
}
