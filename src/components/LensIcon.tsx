"use client";

import { useId } from "react";

interface LensIconProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

// Canonical diamond geometry in the 4096 master space (matches the brand SVGs
// in Assets/Brand/bible-lens-logo). Apexes at top/bottom, equator left/right.
const STRAND_TOP =
  "M2048 1188 L1534 2052 M2048 1188 L1585 2052 M2048 1188 L1637 2052 M2048 1188 L1688 2052 M2048 1188 L1740 2052 M2048 1188 L1791 2052 M2048 1188 L1843 2052 M2048 1188 L1894 2052 M2048 1188 L1946 2052 M2048 1188 L1997 2052 M2048 1188 L2099 2052 M2048 1188 L2150 2052 M2048 1188 L2202 2052 M2048 1188 L2253 2052 M2048 1188 L2305 2052 M2048 1188 L2356 2052 M2048 1188 L2408 2052 M2048 1188 L2459 2052 M2048 1188 L2511 2052 M2048 1188 L2562 2052";
const STRAND_BOTTOM =
  "M2048 2928 L1534 2052 M2048 2928 L1585 2052 M2048 2928 L1637 2052 M2048 2928 L1688 2052 M2048 2928 L1740 2052 M2048 2928 L1791 2052 M2048 2928 L1843 2052 M2048 2928 L1894 2052 M2048 2928 L1946 2052 M2048 2928 L1997 2052 M2048 2928 L2099 2052 M2048 2928 L2150 2052 M2048 2928 L2202 2052 M2048 2928 L2253 2052 M2048 2928 L2305 2052 M2048 2928 L2356 2052 M2048 2928 L2408 2052 M2048 2928 L2459 2052 M2048 2928 L2511 2052 M2048 2928 L2562 2052";

/**
 * Bible Lens canonical mark — the glowy mesh diamond (gold strands, cyan lens
 * flare, glowing core), faithful to Assets/Brand/bible-lens-logo. At small sizes
 * (<20px, e.g. the 12px commentary markers) it falls back to a clean simplified
 * mark so it stays legible. All gradient/filter IDs are made unique per instance
 * via useId() to avoid cross-instance collisions.
 */
export function LensIcon({ size = 64, className = "", animate = true }: LensIconProps) {
  const uid = useId().replace(/:/g, "");
  const cls = `${animate ? "lens-icon" : ""} ${className}`.trim();

  // --- Small-size simplified fallback (keeps the 12px markers crisp) ---
  if (size < 20) {
    const g = `s-gold-${uid}`;
    const top = 10, bottom = 90, mid = 50, left = 30, right = 70, cx = 50;
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={cls}>
        <defs>
          <linearGradient id={g} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ff9325" />
            <stop offset="55%" stopColor="#ffd86b" />
            <stop offset="100%" stopColor="#2ee2e7" />
          </linearGradient>
        </defs>
        <path d={`M${cx} ${top} L${right} ${mid} L${cx} ${bottom} L${left} ${mid} Z`} fill="none" stroke={`url(#${g})`} strokeWidth="6" strokeLinejoin="round" />
        <circle cx={cx} cy={mid} r="7" fill="#80fff0" />
      </svg>
    );
  }

  // --- Full canonical glowy mark ---
  const diamondStroke = `dia-${uid}`;
  const strandStroke = `str-${uid}`;
  const flareV = `fv-${uid}`;
  const flareH = `fh-${uid}`;
  const topBeam = `tb-${uid}`;
  const coreDot = `core-${uid}`;
  const wideGlow = `wide-${uid}`;
  const lineGlow = `line-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="1048 1058 2000 2000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cls}
      role="img"
      aria-label="Bible Lens"
    >
      <defs>
        <linearGradient id={diamondStroke} x1="27%" y1="19%" x2="73%" y2="84%">
          <stop offset="0%" stopColor="#ff8b22" />
          <stop offset="38%" stopColor="#ffe877" />
          <stop offset="56%" stopColor="#78fff0" />
          <stop offset="100%" stopColor="#ff8020" />
        </linearGradient>
        <linearGradient id={strandStroke} x1="40%" y1="22%" x2="58%" y2="80%">
          <stop offset="0%" stopColor="#ffd771" stopOpacity=".86" />
          <stop offset="50%" stopColor="#a6fff1" stopOpacity=".50" />
          <stop offset="100%" stopColor="#ff7b21" stopOpacity=".86" />
        </linearGradient>
        <linearGradient id={flareV} gradientUnits="userSpaceOnUse" x1="2048" y1="1150" x2="2048" y2="2966">
          <stop offset="0%" stopColor="#ff7427" stopOpacity=".45" />
          <stop offset="22%" stopColor="#ff9b25" stopOpacity=".98" />
          <stop offset="45%" stopColor="#ffffbe" stopOpacity="1" />
          <stop offset="56%" stopColor="#28f2ed" stopOpacity=".98" />
          <stop offset="76%" stopColor="#fff18a" stopOpacity=".95" />
          <stop offset="100%" stopColor="#ff7a20" stopOpacity=".70" />
        </linearGradient>
        <linearGradient id={topBeam} gradientUnits="userSpaceOnUse" x1="2048" y1="1210" x2="2048" y2="1930">
          <stop offset="0%" stopColor="#ff7f24" stopOpacity=".92" />
          <stop offset="38%" stopColor="#ffc847" stopOpacity=".98" />
          <stop offset="68%" stopColor="#ffffa8" stopOpacity=".96" />
          <stop offset="100%" stopColor="#2be8ed" stopOpacity=".72" />
        </linearGradient>
        <linearGradient id={flareH} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ab8df" stopOpacity="0" />
          <stop offset="26%" stopColor="#09bfdc" stopOpacity=".34" />
          <stop offset="50%" stopColor="#80fff0" stopOpacity="1" />
          <stop offset="74%" stopColor="#09bfdc" stopOpacity=".34" />
          <stop offset="100%" stopColor="#0ab8df" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={coreDot} cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor="#f4fffb" />
          <stop offset="38%" stopColor="#9ffff4" />
          <stop offset="72%" stopColor="#29e6ee" />
          <stop offset="100%" stopColor="#12aede" />
        </radialGradient>
        <filter id={wideGlow} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="32" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={lineGlow} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="10" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* diamond glow halo */}
      <g opacity=".52" filter={`url(#${wideGlow})`}>
        <path d="M2048 1188 L2562 2052 L2048 2928 L1534 2052 Z" fill="none" stroke={`url(#${diamondStroke})`} strokeWidth="4.5" strokeLinejoin="round" opacity=".78" />
        <ellipse cx="2048" cy="2052" rx="685" ry="44" fill="#0ac7de" opacity=".20" />
      </g>

      {/* diamond outline + mesh strands */}
      <path d="M2048 1188 L2562 2052 L2048 2928 L1534 2052 Z" fill="none" stroke={`url(#${diamondStroke})`} strokeWidth="4.5" strokeLinejoin="round" opacity=".78" />
      <path d={STRAND_TOP} fill="none" stroke={`url(#${strandStroke})`} strokeWidth="3.5" strokeLinecap="round" opacity=".65" />
      <path d={STRAND_BOTTOM} fill="none" stroke={`url(#${strandStroke})`} strokeWidth="3.5" strokeLinecap="round" opacity=".65" />

      {/* lens flares + core */}
      <line x1="450" y1="2052" x2="3646" y2="2052" stroke={`url(#${flareH})`} strokeWidth="58" strokeLinecap="round" opacity=".35" filter={`url(#${wideGlow})`} />
      <line x1="560" y1="2052" x2="3536" y2="2052" stroke={`url(#${flareH})`} strokeWidth="15" strokeLinecap="round" opacity=".96" filter={`url(#${lineGlow})`} />
      <line x1="760" y1="2052" x2="3336" y2="2052" stroke="#84fff0" strokeWidth="3" strokeLinecap="round" opacity=".75" />
      <line x1="2048" y1="1150" x2="2048" y2="2966" stroke={`url(#${flareV})`} strokeWidth="10" strokeLinecap="round" opacity=".96" filter={`url(#${lineGlow})`} />
      <rect x="2038" y="1210" width="20" height="720" rx="4" fill={`url(#${topBeam})`} filter={`url(#${lineGlow})`} />
      <path d="M2048 2930 C2040 2702 2038 2366 2048 2178" fill="none" stroke={`url(#${flareV})`} strokeWidth="19" strokeLinecap="butt" opacity=".98" filter={`url(#${lineGlow})`} />
      <circle cx="2048" cy="2052" r="70" fill="#21e6ee" opacity=".18" filter={`url(#${wideGlow})`} />
      <circle cx="2048" cy="2052" r="36" fill={`url(#${coreDot})`} opacity=".98" filter={`url(#${wideGlow})`} />
    </svg>
  );
}
