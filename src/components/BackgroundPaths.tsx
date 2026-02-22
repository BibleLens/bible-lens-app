"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => {
    // Blend from gold (top paths) to cyan (bottom paths)
    const t = i / 35;
    const r = Math.round(250 - t * 216); // 250 → 34
    const g = Math.round(204 - t * 7);   // 204 → 211 (approx)
    const b = Math.round(21 + t * 217);  // 21 → 238

    return {
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
        380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
        152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
        684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
      color: `rgba(${r},${g},${b},${0.08 + i * 0.02})`,
      width: 0.5 + i * 0.03,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
