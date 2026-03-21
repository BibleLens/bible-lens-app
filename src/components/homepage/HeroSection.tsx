"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!titleRef.current) return;
    gsap.to(titleRef.current, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 20%",
        end: "bottom top",
        scrub: 0.5,
      },
    });
  });

  return (
    <section
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "var(--homepage-bg)",
        paddingTop: "80px",
        textAlign: "center",
        padding: "80px 1.5rem 0",
      }}
    >
      <h1
        ref={titleRef}
        style={{
          fontFamily: "var(--homepage-font-display)",
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          color: "var(--homepage-text)",
          letterSpacing: "0.02em",
          lineHeight: 1.15,
          margin: 0,
        }}
      >
        Context Over Tradition
      </h1>

      <p
        style={{
          fontFamily: "var(--homepage-font-body)",
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          color: "var(--homepage-muted)",
          maxWidth: "600px",
          marginTop: "1.5rem",
          lineHeight: 1.7,
        }}
      >
        Read Scripture through the lens of history and archaeology — grounded in
        ancient context, written in plain language.
      </p>

      <a
        href="/start-here"
        style={{
          display: "inline-block",
          background: "var(--homepage-primary)",
          color: "var(--homepage-bg)",
          padding: "0.75rem 2rem",
          borderRadius: "9999px",
          fontWeight: 700,
          fontFamily: "var(--homepage-font-body)",
          marginTop: "2rem",
          transition: "all 0.3s ease",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9";
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
        }}
      >
        Start Exploring
      </a>

      {/* Pulsing scroll indicator */}
      <div
        className="scroll-indicator"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
