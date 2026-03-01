"use client";

import { useRef } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  motion,
} from "framer-motion";

// Overlay copy — decided in Phase 14, Task 1 (user-approved)
const OVERLAY_COPY = [
  "Through this lens, the ancient world comes back into focus.",
  "What the original audience would have understood — grounded in history, not tradition alone.",
  "Ancient wisdom, modern clarity. No confusion. No agenda. Just honest discovery.",
] as const;

// Radiating lines generated programmatically — 20 lines, same as LensIcon
// Each line: two endpoints of a spoke inside the diamond (viewBox 0 0 100 100)
interface SpokeLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  scatterX: number;
  scatterY: number;
}

function generateSpokeLines(): SpokeLine[] {
  const lines: SpokeLine[] = [];
  const cx = 50;
  const cy = 50;
  const innerR = 4;  // inner radius (near center)
  const outerR = 34; // outer radius (toward diamond edge)

  for (let i = 0; i < 20; i++) {
    const angleDeg = i * 18; // 360 / 20 = 18 degrees apart
    const angleRad = (angleDeg * Math.PI) / 180;

    const x1 = cx + innerR * Math.cos(angleRad);
    const y1 = cy + innerR * Math.sin(angleRad);
    const x2 = cx + outerR * Math.cos(angleRad);
    const y2 = cy + outerR * Math.sin(angleRad);

    // Scatter direction: radially outward from center
    const scatterX = Math.cos(angleRad) * 18;
    const scatterY = Math.sin(angleRad) * 18;

    lines.push({ x1, y1, x2, y2, scatterX, scatterY });
  }
  return lines;
}

const SPOKE_LINES = generateSpokeLines();

// Static fallback for prefers-reduced-motion
function StaticLensFallback() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-10">
        {/* Static inline SVG — no motion bindings */}
        <svg
          width="192"
          height="192"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[var(--color-cyan-400)]"
          shapeRendering="geometricPrecision"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="scrollLensGradientStatic"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          {/* Radiating lines */}
          <g stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.8">
            {SPOKE_LINES.map((line, i) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
              />
            ))}
          </g>

          {/* Diamond outline */}
          <path
            d="M50 10 L70 50 L50 90 L30 50 Z"
            fill="none"
            stroke="url(#scrollLensGradientStatic)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* Center horizontal line */}
          <line
            x1="25"
            y1="50"
            x2="75"
            y2="50"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          {/* Center circle */}
          <circle
            cx="50"
            cy="50"
            r="2"
            fill="currentColor"
          />
        </svg>

        {/* All three overlays visible at once */}
        <div className="space-y-6 text-center">
          {OVERLAY_COPY.map((text, i) => (
            <p
              key={i}
              className="text-xl text-[var(--color-text-primary)] max-w-lg mx-auto leading-relaxed"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

// Individual animated spoke line — derives its own scatter from smoothProgress
interface AnimatedSpokeProps {
  line: SpokeLine;
  smoothProgress: ReturnType<typeof useSpring>;
}

function AnimatedSpoke({ line, smoothProgress }: AnimatedSpokeProps) {
  // Each line scatters outward in its own radial direction
  const spokeX = useTransform(
    smoothProgress,
    [0, 0.45, 0.55, 1],
    [0, line.scatterX, line.scatterX, 0]
  );
  const spokeY = useTransform(
    smoothProgress,
    [0, 0.45, 0.55, 1],
    [0, line.scatterY, line.scatterY, 0]
  );
  const spokeOpacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 0, 0, 0.8]
  );

  return (
    <motion.line
      x1={line.x1}
      y1={line.y1}
      x2={line.x2}
      y2={line.y2}
      stroke="currentColor"
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
      style={{
        opacity: spokeOpacity,
        x: spokeX,
        y: spokeY,
      }}
    />
  );
}

export function ScrollAnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress through the outer container.
  // framer-motion v12 resolves the production layoutEffect measurement issue internally;
  // the `layoutEffect: false` option from older versions is not present in v12 types.
  // Using target: containerRef is the recommended v12 pattern for element-relative progress.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring-smoothed progress — ALL useTransform calls derive from smoothProgress,
  // NOT from raw scrollYProgress. This prevents jarring jumps on rapid scroll
  // by applying spring physics inertia to the animation pipeline.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  // --- SVG element motion values ---

  // Diamond outline: fades and scales outward during mid-scroll, returns at end
  const outlineOpacity = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    [1, 0, 0, 1]
  );
  const outlineScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [1, 1.4, 1]
  );

  // Center horizontal line: last to scatter, first to return
  const centerLineOpacity = useTransform(
    smoothProgress,
    [0, 0.4, 0.6, 1],
    [1, 0, 0, 1]
  );

  // Center circle: same timing as center line
  const centerCircleOpacity = useTransform(
    smoothProgress,
    [0, 0.4, 0.6, 1],
    [1, 0, 0, 1]
  );
  const centerCircleScale = useTransform(
    smoothProgress,
    [0, 0.45, 0.55, 1],
    [1, 0, 0, 1]
  );

  // --- Text overlay motion values (SCROLL-02) ---
  // Each overlay maps a segment of smoothProgress to opacity 0→1→1→0
  // and y offset 20→0→0→-20 (slide in from below, slide out upward)

  // Overlay 1: visible during first third of scroll
  const overlay1Opacity = useTransform(
    smoothProgress,
    [0.05, 0.20, 0.35, 0.45],
    [0, 1, 1, 0]
  );
  const overlay1Y = useTransform(
    smoothProgress,
    [0.05, 0.20, 0.35, 0.45],
    [20, 0, 0, -20]
  );

  // Overlay 2: visible during middle third of scroll
  const overlay2Opacity = useTransform(
    smoothProgress,
    [0.42, 0.55, 0.72, 0.82],
    [0, 1, 1, 0]
  );
  const overlay2Y = useTransform(
    smoothProgress,
    [0.42, 0.55, 0.72, 0.82],
    [20, 0, 0, -20]
  );

  // Overlay 3: visible at end, stays visible (progress reaches 1.0 and holds)
  const overlay3Opacity = useTransform(
    smoothProgress,
    [0.76, 0.88, 1.0, 1.0],
    [0, 1, 1, 1]
  );
  const overlay3Y = useTransform(
    smoothProgress,
    [0.76, 0.88, 1.0, 1.0],
    [20, 0, 0, 0]
  );

  // Reduced motion: render completely static layout — no sticky scroll, no height: 300vh
  if (shouldReduceMotion) {
    return <StaticLensFallback />;
  }

  return (
    // Outer scroll container — 300vh provides the scroll distance for the animation
    <div ref={containerRef} style={{ height: "300vh" }}>
      {/* Sticky inner container — stays in viewport while outer div scrolls past */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          // SCROLL-05: explicit background prevents transparency bleed-through
          // when page content scrolls underneath this sticky element.
          // Must use CSS custom property (not hardcoded hex) so it updates on theme switch.
          backgroundColor: "var(--color-bg-primary)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* SVG container — color: sets currentColor for all child SVG strokes */}
        <div
          className="relative flex items-center justify-center text-[var(--color-cyan-400)]"
          style={{ width: 192, height: 192 }}
        >
          {/* Inline animated SVG — NOT the LensIcon component (avoids gradient ID collision
              with the header LensIcon per research Pitfall 6). Uses unique gradient ID
              `scrollLensGradient` instead of `lensGradient`. */}
          <svg
            width="192"
            height="192"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            aria-hidden="true"
          >
            <defs>
              {/* Unique gradient ID: scrollLensGradient (not lensGradient) */}
              <linearGradient
                id="scrollLensGradient"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
              >
                {/* Hardcoded brand hex values — brand colors that render correctly on both themes.
                    Do NOT use CSS custom properties here: gradient stop colors cannot be animated
                    to CSS var() strings reliably in Framer Motion (RESEARCH anti-pattern). */}
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>

            {/* Radiating lines — animated individually for per-line radial scatter */}
            {SPOKE_LINES.map((line, i) => (
              <AnimatedSpoke
                key={i}
                line={line}
                smoothProgress={smoothProgress}
              />
            ))}

            {/* Diamond outline — scales outward and fades during deconstruction */}
            <motion.path
              d="M50 10 L70 50 L50 90 L30 50 Z"
              fill="none"
              stroke="url(#scrollLensGradient)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              style={{
                opacity: outlineOpacity,
                scale: outlineScale,
              }}
            />

            {/* Center horizontal line — last to scatter, first to return */}
            <motion.line
              x1="25"
              y1="50"
              x2="75"
              y2="50"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{
                opacity: centerLineOpacity,
              }}
            />

            {/* Center circle — disappears with center line timing */}
            <motion.circle
              cx="50"
              cy="50"
              r="2"
              fill="currentColor"
              style={{
                opacity: centerCircleOpacity,
                scale: centerCircleScale,
              }}
            />
          </svg>
        </div>

        {/* Text overlays — absolutely positioned over the sticky section.
            Each overlay covers one phase of the scroll. They fade/slide in and out. */}
        <div
          className="relative w-full max-w-2xl px-6"
          style={{ marginTop: "2.5rem" }}
        >
          {/* Overlay 1 — Phase 1 of 3 */}
          <motion.div
            className="absolute left-0 right-0 text-center pointer-events-none"
            style={{
              opacity: overlay1Opacity,
              y: overlay1Y,
            }}
          >
            <p className="text-xl text-[var(--color-text-primary)] leading-relaxed mx-auto max-w-xl">
              {OVERLAY_COPY[0]}
            </p>
          </motion.div>

          {/* Overlay 2 — Phase 2 of 3 */}
          <motion.div
            className="absolute left-0 right-0 text-center pointer-events-none"
            style={{
              opacity: overlay2Opacity,
              y: overlay2Y,
            }}
          >
            <p className="text-xl text-[var(--color-text-primary)] leading-relaxed mx-auto max-w-xl">
              {OVERLAY_COPY[1]}
            </p>
          </motion.div>

          {/* Overlay 3 — Phase 3 of 3 (stays visible at end of scroll) */}
          <motion.div
            className="absolute left-0 right-0 text-center pointer-events-none"
            style={{
              opacity: overlay3Opacity,
              y: overlay3Y,
            }}
          >
            <p className="text-xl text-[var(--color-text-primary)] leading-relaxed mx-auto max-w-xl">
              {OVERLAY_COPY[2]}
            </p>
          </motion.div>

          {/* Spacer so the parent div has non-zero height for absolute children */}
          <p className="invisible text-xl leading-relaxed">placeholder</p>
        </div>
      </div>
    </div>
  );
}
