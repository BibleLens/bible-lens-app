"use client";

import { useId } from "react";

interface LensIconProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

/**
 * Bible Lens canonical mark — tall mesh diamond with gold ribs, a cyan lens
 * flare and a glowing cyan core. Lightweight programmatic vector (scales +
 * animates cleanly down to ~12px). Palette matches the canonical brand SVGs in
 * Assets/Brand/bible-lens-logo. Gradient IDs are made unique per instance via
 * useId() to avoid cross-instance collisions (see ScrollAnimationSection note).
 */
export function LensIcon({ size = 64, className = "", animate = true }: LensIconProps) {
  const uid = useId().replace(/:/g, "");
  const gold = `gold-${uid}`;
  const cyan = `cyan-${uid}`;
  const glow = `glow-${uid}`;

  // Tall diamond geometry (canonical width:height ~0.59).
  const top = 10, bottom = 90, mid = 50, left = 27, right = 73, cx = 50;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animate ? "lens-icon" : ""} ${className}`}
    >
      <defs>
        <linearGradient id={gold} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ff7924" />
          <stop offset="42%" stopColor="#ffb23a" />
          <stop offset="78%" stopColor="#fff58f" />
          <stop offset="100%" stopColor="#ffc13c" />
        </linearGradient>
        <linearGradient id={cyan} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#13b4e4" stopOpacity="0" />
          <stop offset="50%" stopColor="#80fff0" />
          <stop offset="100%" stopColor="#13b4e4" stopOpacity="0" />
        </linearGradient>
        <filter id={glow} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Radiating ribs from each apex to the equator */}
      <g stroke={`url(#${gold})`} strokeWidth="0.4" opacity="0.55">
        {Array.from({ length: 16 }).map((_, i) => {
          const t = i / 15;
          const x = left + (right - left) * t;
          return (
            <g key={i}>
              <line x1={cx} y1={top} x2={x} y2={mid} />
              <line x1={cx} y1={bottom} x2={x} y2={mid} />
            </g>
          );
        })}
      </g>

      {/* Diamond outline */}
      <path
        d={`M${cx} ${top} L${right} ${mid} L${cx} ${bottom} L${left} ${mid} Z`}
        fill="none"
        stroke={`url(#${gold})`}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* Horizontal lens flare */}
      <line
        x1="14"
        y1={mid}
        x2="86"
        y2={mid}
        stroke={`url(#${cyan})`}
        strokeWidth="1.4"
        strokeLinecap="round"
        filter={`url(#${glow})`}
      />

      {/* Glowing cyan core */}
      <circle cx={cx} cy={mid} r="2.1" fill="#80fff0" filter={`url(#${glow})`} />
      <circle cx={cx} cy={mid} r="1" fill="#ffffff" />
    </svg>
  );
}
