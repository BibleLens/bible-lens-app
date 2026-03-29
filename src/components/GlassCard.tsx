import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}

export function GlassCard({
  children,
  className,
  as: Tag = "div",
  ...props
}: GlassCardProps) {
  return (
    <Tag className={cn("glass-card", className)} {...props}>
      {children}
    </Tag>
  );
}
