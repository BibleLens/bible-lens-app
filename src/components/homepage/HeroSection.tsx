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
      const pinned = pinnedRef.current;
      if (!container || !pinned) return;

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

      // --- Pin the hero viewport ---
      gsap.to(pinned, {
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        },
      });

      // --- Set initial lens state ---
      gsap.set(lensFrameRef.current, { scale: 0, rotation: 45 });

      // --- Entrance animation ---
      const tlEntrance = gsap.timeline({ defaults: { ease: "power4.out" } });
      tlEntrance
        .from(titleRef.current?.children || [], {
          opacity: 0,
          y: 30,
          duration: 1.5,
          stagger: 0.2,
        })
        .to(
          lensFrameRef.current,
          { scale: 1, duration: 1.2 },
          "-=0.8"
        )
        .from(
          scrollHintRef.current,
          { opacity: 0, y: 20, duration: 1 },
          "-=0.5"
        );

      // --- Hero title fade/scale on scroll ---
      gsap.to(heroTitleWrapperRef.current, {
        scale: 0.8,
        opacity: 0,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "300px top",
          scrub: true,
        },
      });

      // --- Dual-track scroll sync ---
      gsap.to(mainTrackRef.current, {
        y: "-100%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      gsap.to(clarifiedTrackRef.current, {
        y: "-100%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // --- Lens border pulse ---
      gsap.to(lensFrameRef.current, {
        boxShadow: "0 0 40px rgba(0, 229, 255, 0.8)",
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });

      // --- Fade scroll hint ---
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: container,
          start: "50px top",
          end: "200px top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
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
          style={{ height: "400vh", top: 0 }}
        >
          {/* Spacer for hero title area */}
          <div className="h-screen" />

          {/* Section 1: Ancient manuscripts */}
          <section className="h-[150vh] flex flex-col items-center justify-center px-10">
            <div className="max-w-2xl space-y-32 ancient-text text-2xl text-center">
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

          {/* Section 2: Constellation dots */}
          <section className="h-[150vh] flex items-center justify-center relative">
            <div className="w-full max-w-4xl h-[600px] relative opacity-30">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#4A4A5A] rounded-full" />
              <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-[#4A4A5A] rounded-full" />
              <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-[#4A4A5A] rounded-full" />
              <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-[#4A4A5A] rounded-full" />
            </div>
          </section>

          {/* End spacer */}
          <div className="h-screen" />
        </div>

        {/* THE LENS — Diamond Mask at Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-[320px] h-[320px] pointer-events-none">
          {/* Diamond border frame */}
          <div
            ref={lensFrameRef}
            className="absolute inset-0 border border-[#00E5FF] backdrop-blur-sm bg-[#0F0F16]/20 origin-center"
            style={{ boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)" }}
          />
          {/* Clarified content window (clipped to diamond) */}
          <div className="absolute inset-0 lens-container overflow-hidden">
            <div
              ref={clarifiedTrackRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen"
              style={{ height: "400vh" }}
            >
              {/* Clarified Section 1 — Translated insights */}
              <div className="absolute w-full top-[100vh] flex flex-col items-center justify-center px-10 text-[#00E5FF]">
                <div className="max-w-2xl space-y-32 text-2xl text-center font-bold">
                  <p className="drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
                    &ldquo;In the beginning, God created...&rdquo;
                  </p>
                  <p className="text-[#FF6B00] drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]">
                    Elohim: A complex unity of the divine.
                  </p>
                  <p>Linguistic roots reveal structural patterns.</p>
                  <p>Clarity emerges where tradition ends.</p>
                </div>
              </div>

              {/* Clarified Section 2 — Timeline nodes */}
              <div className="absolute w-full top-[250vh] flex items-center justify-center">
                <div className="w-full max-w-4xl h-[600px] relative">
                  <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
                    <div
                      className="w-4 h-4 bg-[#FF6B00] rounded-full"
                      style={{
                        boxShadow: "0 0 20px rgba(255, 107, 0, 0.4)",
                      }}
                    />
                    <span className="text-[10px] mt-2 whitespace-nowrap">
                      Babylonian Exile (586 BCE)
                    </span>
                  </div>
                  <div className="absolute top-3/4 left-1/2 flex flex-col items-center">
                    <div
                      className="w-4 h-4 bg-[#FF6B00] rounded-full"
                      style={{
                        boxShadow: "0 0 20px rgba(255, 107, 0, 0.4)",
                      }}
                    />
                    <span className="text-[10px] mt-2 whitespace-nowrap">
                      Writing of Genesis
                    </span>
                  </div>
                </div>
              </div>
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
