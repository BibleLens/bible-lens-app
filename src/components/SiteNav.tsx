"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Explore", href: "/books" },
  { label: "Context", href: "/commentary" },
  { label: "Topics", href: "/topics" },
  { label: "Archive", href: "/start-here" },
  { label: "Scholar", href: "/chat" },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/books") {
    return pathname.startsWith("/books") || pathname.startsWith("/bible");
  }
  if (href === "/commentary") {
    return pathname.startsWith("/commentary");
  }
  if (href === "/topics") {
    return pathname.startsWith("/topics");
  }
  if (href === "/start-here") {
    return pathname === "/start-here" || pathname.startsWith("/start-here/");
  }
  if (href === "/chat") {
    return pathname.startsWith("/chat");
  }
  return false;
}

export function SiteNav() {
  const pathname = usePathname();

  // Suppress on homepage (has its own NavBar)
  if (pathname === "/") return null;

  // Suppress on chapter reader routes (has its own header)
  if (pathname.startsWith("/bible/") && pathname.split("/").length > 3) return null;

  return (
    <header
      className="fixed top-0 w-full z-50"
      style={{
        background: "rgba(5,5,8,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,229,255,0.1)",
        borderRadius: 0,
      }}
    >
      {/* Centered crest over nav — matches the homepage header exactly */}
      <div className="flex flex-col items-center px-6 pt-3 pb-2">
        {/* Centered full Bible Lens logo (wordmark baked in) */}
        <Link href="/" className="flex justify-center" aria-label="Bible Lens home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/bible-lens-logo-no-tagline.svg"
            alt="Bible Lens"
            className="h-44 w-auto logo-pulse"
          />
        </Link>

        {/* Nav links centered beneath the crest */}
        <nav aria-label="Main navigation" className="mt-1">
          <ul className="hidden md:flex items-center justify-center gap-9">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href, pathname) ? "page" : undefined}
                  className={cn(
                    "min-h-[44px] flex items-center text-sm font-medium transition-colors duration-200 border-b-2",
                    isActive(item.href, pathname)
                      ? "text-[var(--color-cyan-400)] border-[var(--color-cyan-400)] font-semibold"
                      : "text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-cyan-300)]"
                  )}
                  style={{ fontFamily: "var(--font-interface)" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
