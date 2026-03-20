"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HomepageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--homepage-bg)",
        color: "var(--homepage-text)",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}
