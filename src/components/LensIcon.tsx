import Image from "next/image";

interface LensIconProps {
  size?: number;
  className?: string;
  animate?: boolean;
  alt?: string;
}

/** The original icon on its dark backing, shared by both colour themes. */
export function LensIcon({
  size = 64,
  className = "",
  animate = false,
  alt = "Bible Lens",
}: LensIconProps) {
  return (
    <Image
      src="/brand/bible-lens-symbol-only-chip.svg"
      width={size}
      height={size}
      alt={alt}
      className={`brand-lens ${animate ? "lens-icon" : ""} ${className}`.trim()}
      unoptimized
    />
  );
}
