"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PARTICLE_COUNT = 40;

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const mainTrackRef = useRef<HTMLDivElement>(null);
  const clarifiedTrackRef = useRef<HTMLDivElement>(null);
  const lensFrameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroTitleWrapperRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // --- Particles ---
      if (particlesRef.current) {
        const frag = document.createDocumentFragment();
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const p = document.createElement("div");
          p.className = "hero-particle";
          const size = Math.random() * 3 + 1;
          gsap.set(p, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            width: size,
            height: size,
            opacity: Math.random() * 0.4 + 0.1,
          });
          frag.appendChild(p);
          gsap.to(p, {
            y: "-=200",
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom bottom",
              scrub: Math.random() * 2 + 1,
            },
          });
        }
        particlesRef.current.appendChild(frag);
      }

      // --- Pin the hero viewport for the scroll duration ---
      gsap.to(pinnedRef.current, {
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        },
      });

      // --- Lens entrance animation ---
      gsap.set(lensFrameRef.current, { scale: 0, rotation: 45 });

      const tlEntrance = gsap.timeline({ defaults: { ease: "power4.out" } });
      tlEntrance
        .from(titleRef.current?.children || [], {
          opacity: 0,
          y: 30,
          duration: 1.5,
          stagger: 0.2,
        })
        .to(lensFrameRef.current, { scale: 1, duration: 1.2 }, "-=0.8")
        .from(
          scrollHintRef.current,
          { opacity: 0, y: 20, duration: 1 },
          "-=0.5"
        );

      // --- Title fades quickly on scroll ---
      gsap.to(heroTitleWrapperRef.current, {
        scale: 0.8,
        opacity: 0,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "200px top",
          scrub: true,
        },
      });

      // --- Main track: blurred ancient text scrolls through viewport ---
      gsap.to(mainTrackRef.current, {
        yPercent: -60,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // --- Clarified track: crisp text scrolls UP through the diamond lens ---
      // Content starts at bottom of lens (top: 100%), moves up through the diamond
      gsap.fromTo(
        clarifiedTrackRef.current,
        { y: 0 },
        {
          y: -800,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // --- Lens border pulse ---
      gsap.to(lensFrameRef.current, {
        boxShadow: "0 0 40px rgba(0, 229, 255, 0.8)",
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });

      // --- Fade scroll hint early ---
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: container,
          start: "50px top",
          end: "150px top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative" style={{ height: "250vh" }}>
      <div
        ref={pinnedRef}
        className="h-screen w-full relative overflow-hidden"
        style={{ background: "var(--homepage-bg)" }}
      >
        {/* Parallax Particles */}
        <div
          ref={particlesRef}
          className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        />

        {/* Main Scroll Track — Blurred Ancient Text */}
        <div
          ref={mainTrackRef}
          className="absolute w-full z-10"
          style={{ height: "250vh", top: 0 }}
        >
          {/* Short spacer — title fades during this */}
          <div style={{ height: "60vh" }} />

          {/* Ancient text scrolls through viewport center (where lens is) */}
          <section className="h-[120vh] flex flex-col items-center justify-center px-10">
            <div className="max-w-2xl space-y-16 ancient-text text-2xl text-center">
              <p style={{ fontFamily: "var(--font-noto-samaritan), serif" }}>
                𐤁𐤓𐤀𐤔𐤉𐤕 𐤁𐤓𐤀 𐤀𐤋𐤄𐤉𐤌 𐤀𐤕 𐤄𐤔𐤌𐤉𐤌 𐤅𐤀𐤕 𐤄𐤀𐤓𐤒
              </p>
              <p style={{ fontFamily: "serif" }}>
                Ἐν ἀρχῇ ἐποίησεν ὁ Θεὸς τὸν οὐρανὸν καὶ τὴν γῆν
              </p>
              <p style={{ fontFamily: "serif" }}>
                In principio creavit Deus caelum et terram
              </p>
              <p style={{ fontFamily: "var(--homepage-font-body)" }}>
                The words of the ancients are veiled in time and tradition
              </p>
            </div>
          </section>

          {/* End spacer */}
          <div style={{ height: "70vh" }} />
        </div>

        {/* THE LENS — Diamond Mask at Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-[320px] h-[320px] pointer-events-none">
          {/* Diamond border frame */}
          <div
            ref={lensFrameRef}
            className="absolute inset-0 border border-[#00E5FF] backdrop-blur-sm bg-[#0F0F16]/20 origin-center"
            style={{ boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)" }}
          />

          {/* Clarified content window (clipped to diamond shape) */}
          <div className="absolute inset-0 lens-container overflow-hidden">
            {/* Content starts below the lens, GSAP scrolls it up through the diamond */}
            <div
              ref={clarifiedTrackRef}
              className="absolute inset-x-0 flex flex-col items-center gap-[100px] text-[#00E5FF] text-xl font-bold text-center"
              style={{ top: "100%", padding: "0 20px" }}
            >
              <p className="drop-shadow-[0_0_8px_rgba(0,229,255,0.5)] max-w-[280px]">
                &ldquo;In the beginning, God created...&rdquo;
              </p>
              <p className="text-[#FF6B00] drop-shadow-[0_0_8px_rgba(255,107,0,0.5)] max-w-[280px]">
                Elohim: A complex unity of the divine.
              </p>
              <p className="max-w-[280px]">
                Linguistic roots reveal structural patterns.
              </p>
              <p className="max-w-[280px]">
                Clarity emerges where tradition ends.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Title — Fades on scroll */}
        <div
          ref={heroTitleWrapperRef}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center px-4">
            <h1
              ref={titleRef}
              className="font-bold drop-shadow-2xl"
              style={{
                fontFamily: "var(--homepage-font-display)",
                fontSize: "56px",
                lineHeight: 1,
                letterSpacing: "0.1em",
                color: "var(--homepage-text)",
              }}
            >
              <span className="block">CONTEXT</span>
              <span
                className="block italic font-normal tracking-normal"
                style={{ fontSize: "36px", color: "#00E5FF" }}
              >
                Over
              </span>
              <span className="block">TRADITION</span>
            </h1>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10 opacity-70"
        >
          <span
            className="text-[10px] uppercase tracking-[0.3em] text-[#00E5FF] font-semibold"
            style={{ fontFamily: "var(--homepage-font-body)" }}
          >
            Scroll to reveal
          </span>
          <div className="scroll-indicator" />
        </div>
      </div>
    </div>
  );
}
