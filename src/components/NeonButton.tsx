import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const neonButtonVariants = cva(
  "relative group inline-flex items-center justify-center text-center rounded-full font-medium transition-all duration-300",
  {
    variants: {
      variant: {
        gold: "border border-[rgba(250,204,21,0.2)] bg-[rgba(250,204,21,0.05)] hover:bg-[rgba(250,204,21,0)] text-[var(--color-text-primary)]",
        cyan: "border border-[rgba(34,211,238,0.2)] bg-[rgba(34,211,238,0.05)] hover:bg-[rgba(34,211,238,0)] text-[var(--color-text-primary)]",
        outline:
          "border border-[var(--color-border)] bg-transparent hover:border-[var(--color-gold-400)] hover:bg-[rgba(250,204,21,0.05)] text-[var(--color-text-primary)]",
      },
      size: {
        sm: "px-4 py-1.5 text-base",
        default: "px-7 py-2 text-lg",
        lg: "px-10 py-3 text-xl",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "default",
    },
  }
);

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButtonVariants> {
  href?: string;
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    const glowColor =
      variant === "cyan"
        ? "rgba(34,211,238,0.6)"
        : "rgba(250,204,21,0.6)";

    const glowColorFaded =
      variant === "cyan"
        ? "rgba(34,211,238,0.3)"
        : "rgba(250,204,21,0.3)";

    const inner = (
      <button
        className={cn(neonButtonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {/* Top neon line */}
        <span
          className="absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 top-0 w-3/4 mx-auto"
          style={{
            background: `linear-gradient(to right, transparent, ${glowColor}, transparent)`,
          }}
        />
        {children}
        {/* Bottom neon line */}
        <span
          className="absolute h-px group-hover:opacity-30 opacity-0 transition-all duration-500 ease-in-out inset-x-0 bottom-0 w-3/4 mx-auto"
          style={{
            background: `linear-gradient(to right, transparent, ${glowColorFaded}, transparent)`,
          }}
        />
      </button>
    );

    if (href) {
      return <Link href={href}>{inner}</Link>;
    }

    return inner;
  }
);

NeonButton.displayName = "NeonButton";

export { NeonButton, neonButtonVariants };
