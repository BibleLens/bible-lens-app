"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LensIcon } from "@/components/LensIcon";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "Explore", href: "/books" },
  { label: "Context", href: "/commentary" },
  { label: "Archive", href: "/start-here" },
  { label: "Scholar", href: "/chat" },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/books") {
    return pathname.startsWith("/books") || pathname.startsWith("/bible");
  }
  if (href === "/commentary") {
    return pathname.startsWith("/commentary") || pathname.startsWith("/topics");
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
      <div className="flex items-center justify-between px-6 h-16">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="Bible Lens home">
          <LensIcon size={56} animate={true} />
          <span
            style={{ fontFamily: "var(--font-display)" }}
            className="text-xl font-bold tracking-wide"
          >
            <span style={{ color: "#facc15" }}>Bible</span>
            <span className="text-cyan-400"> Lens</span>
          </span>
        </Link>

        {/* Right: Nav links + ThemeToggle */}
        <div className="flex items-center gap-4">
          <nav aria-label="Main navigation">
            <ul className="hidden md:flex items-center gap-6">
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
