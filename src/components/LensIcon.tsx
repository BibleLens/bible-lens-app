"use client";

interface LensIconProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export function LensIcon({ size = 64, className = "", animate = true }: LensIconProps) {
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
        <linearGradient id="lensGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="glowGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#facc15" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.6" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer glow */}
      <path
        d="M50 10 L70 50 L50 90 L30 50 Z"
        fill="url(#glowGradient)"
        filter="url(#glow)"
        opacity="0.3"
      />
      
      {/* Main diamond/lens shape with lines */}
      <g stroke="url(#lensGradient)" strokeWidth="0.5" opacity="0.8">
        {/* Radiating lines from center to edges */}
        {Array.from({ length: 20 }).map((_, i) => {
          const topY = 10;
          const bottomY = 90;
          const centerY = 50;
          const leftX = 30;
          const rightX = 70;
          const centerX = 50;
          
          // Lines from top to sides
          const tLeft = i / 19;
          const xLeft = leftX + (centerX - leftX) * tLeft;
          const yLeft = centerY + (topY - centerY) * tLeft;
          
          const xRight = rightX - (rightX - centerX) * tLeft;
          const yRight = centerY + (topY - centerY) * tLeft;
          
          return (
            <g key={i}>
              {/* Top half lines */}
              <line x1={centerX} y1={topY} x2={xLeft} y2={yLeft} />
              <line x1={centerX} y1={topY} x2={xRight} y2={yRight} />
              {/* Bottom half lines */}
              <line x1={centerX} y1={bottomY} x2={leftX + (centerX - leftX) * tLeft} y2={centerY + (bottomY - centerY) * tLeft} />
              <line x1={centerX} y1={bottomY} x2={rightX - (rightX - centerX) * tLeft} y2={centerY + (bottomY - centerY) * tLeft} />
            </g>
          );
        })}
      </g>
      
      {/* Diamond outline */}
      <path
        d="M50 10 L70 50 L50 90 L30 50 Z"
        fill="none"
        stroke="url(#lensGradient)"
        strokeWidth="1.5"
      />
      
      {/* Center horizontal line with glow */}
      <line
        x1="25"
        y1="50"
        x2="75"
        y2="50"
        stroke="#22d3ee"
        strokeWidth="1"
        filter="url(#glow)"
      />
      
      {/* Center point */}
      <circle
        cx="50"
        cy="50"
        r="2"
        fill="#22d3ee"
        filter="url(#glow)"
      />
    </svg>
  );
}

