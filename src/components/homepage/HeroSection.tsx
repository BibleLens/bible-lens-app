"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PARTICLE_COUNT = 40;

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const mainTrackRef = useRef<HTMLDivElement>(null);
  const clarifiedTrackRef = useRef<HTMLDivElement>(null);
  const lensFrameRef = useRef<HTMLDivElement>(null);
  const lensContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroTitleWrapperRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const endCtaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      // --- Reduced motion: set final state immediately ---
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(titleRef.current?.children || [], { opacity: 1, y: 0 });
        gsap.set(lensFrameRef.current, { scale: 1, rotation: 0 });
        gsap.set(scrollHintRef.current, { opacity: 0.7, y: 0 });
        gsap.set(endCtaRef.current, { opacity: 1, y: 0 });
        gsap.set(clarifiedTrackRef.current, {
          opacity: 1,
          xPercent: -50,
          yPercent: -50,
        });
      });

      // --- Full motion: all animations ---
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Mobile particle optimization
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 20 : PARTICLE_COUNT;

        // --- Particles ---
        if (particlesRef.current) {
          const frag = document.createDocumentFragment();
          for (let i = 0; i < particleCount; i++) {
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

        // --- Lens entrance ---
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

        // --- Title fades in first 100px ---
        gsap.to(heroTitleWrapperRef.current, {
          scale: 0.8,
          opacity: 0,
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "100px top",
            scrub: true,
          },
        });

        // --- Clarified track: set initial position via GSAP (not CSS) to avoid transform conflicts ---
        gsap.set(clarifiedTrackRef.current, {
          xPercent: -50,
          yPercent: -50,
        });

        // --- Clarified track fades in immediately ---
        gsap.to(clarifiedTrackRef.current, {
          opacity: 1,
          scrollTrigger: {
            trigger: container,
            start: "10px top",
            end: "100px top",
            scrub: true,
          },
        });

        // --- Main track: -700px over full scroll range ---
        gsap.to(mainTrackRef.current, {
          y: -700,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        // --- Clarified track: same -700px, same range ---
        gsap.to(clarifiedTrackRef.current, {
          y: -700,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        // --- Lens pulse ---
        gsap.to(lensFrameRef.current, {
          boxShadow: "0 0 40px rgba(0, 229, 255, 0.8)",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "sine.inOut",
        });

        // --- Fade lens out near end ---
        if (lensContainerRef.current) {
          gsap.to(lensContainerRef.current, {
            opacity: 0,
            scrollTrigger: {
              trigger: container,
              start: "85% top",
              end: "95% top",
              scrub: true,
            },
          });
        }

        // --- Fade scroll hint ---
        gsap.to(scrollHintRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: container,
            start: "50px top",
            end: "150px top",
            scrub: true,
          },
        });

        // --- End-of-scroll CTA: fades in centered inside the diamond, while the
        // sticky hero is still pinned (the sticky unpins around 63% of the
        // container, so the fade must COMPLETE before then or it scrolls off
        // screen unseen). Fades in 42%→56%, holds for the rest of the pin. ---
        gsap.set(endCtaRef.current, { opacity: 0, y: 16 });
        gsap.to(endCtaRef.current, {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: container,
            start: "42% top",
            end: "56% top",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="h-[330vh]">
      {/* Sticky viewport — stays in place while container scrolls (230vh of scroll) */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: "var(--homepage-bg)" }}
      >
        {/* Parallax Particles */}
        <div
          ref={particlesRef}
          className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        />

        {/* Main Scroll Track — Blurred Ancient Text */}
        <div ref={mainTrackRef} className="relative z-10 w-full">
          {/* Opening spacer — clears the ~230px fixed nav so the first text
              panel isn't hidden beneath it */}
          <div style={{ height: "25vh" }} />

          {/* Ancient manuscripts scroll through */}
          <section className="h-[120vh] flex flex-col items-center justify-center px-10">
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

          {/* Constellation dots */}
          <section className="h-[120vh] flex items-center justify-center relative">
            <div className="w-full max-w-4xl h-[600px] relative opacity-30">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#4A4A5A] rounded-full" />
              <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-[#4A4A5A] rounded-full" />
              <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-[#4A4A5A] rounded-full" />
              <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-[#4A4A5A] rounded-full" />
            </div>
          </section>

          {/* End spacer */}
          <div style={{ height: "60vh" }} />
        </div>

        {/* THE LENS — Diamond Mask at Center */}
        <div
          ref={lensContainerRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-[320px] h-[320px] pointer-events-none"
        >
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
              className="absolute w-screen h-screen opacity-0"
              style={{ top: "80%", left: "50%" }}
            >
              {/* Clarified Section 1 — insights revealed through the lens */}
              <div className="absolute w-full top-[50vh] flex flex-col items-center justify-center px-10 text-[#00E5FF]">
                <div className="max-w-2xl space-y-16 text-2xl text-center font-bold">
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

              {/* Clarified Section 2 — timeline nodes */}
              <div className="absolute w-full top-[220vh] flex items-center justify-center">
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
          className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center px-4">
            <h1
              ref={titleRef}
              className="font-bold drop-shadow-2xl"
              style={{
                fontFamily: "var(--homepage-font-display)",
                fontSize: "44px",
                lineHeight: 1.1,
                letterSpacing: "0.04em",
                color: "var(--homepage-text)",
              }}
            >
              <span className="block">CONTEXT</span>
              <span
                className="block italic font-normal tracking-normal"
                style={{ fontSize: "30px", color: "#00E5FF" }}
              >
                Over
              </span>
              <span className="block">TRADITION</span>
            </h1>

            {/* Primary CTA → onboarding */}
            <div className="mt-10 flex justify-center pointer-events-auto">
              <Link
                href="/start-here"
                className="px-8 py-3 border border-[#00E5FF]/60 bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-bold uppercase tracking-widest hover:bg-[#00E5FF] hover:text-[#050508] transition-all"
                style={{ fontFamily: "var(--homepage-font-body)" }}
              >
                Start Here
              </Link>
            </div>
          </div>
        </div>

        {/* End-of-scroll CTA — reappears centered inside the diamond once the
            lens animation completes */}
        <div
          ref={endCtaRef}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-3 opacity-0 pointer-events-none"
        >
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-slate-300"
            style={{ fontFamily: "var(--homepage-font-body)" }}
          >
            Ready to begin?
          </span>
          <Link
            href="/start-here"
            className="px-8 py-3 border border-[#00E5FF]/60 bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-bold uppercase tracking-widest hover:bg-[#00E5FF] hover:text-[#050508] transition-all pointer-events-auto"
            style={{ fontFamily: "var(--homepage-font-body)" }}
          >
            Start Here
          </Link>
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
