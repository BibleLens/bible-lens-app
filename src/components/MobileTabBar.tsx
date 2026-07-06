"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabItems = [
  { label: "Books", href: "/books", icon: "menu_book", ariaLabel: "Books" },
  { label: "Commentary", href: "/commentary", icon: "layers", ariaLabel: "Commentary" },
  { label: "Start Here", href: "/start-here", icon: "bookmark", ariaLabel: "Start here — reading paths" },
  { label: "Scholar", href: "/chat", icon: "robot_2", ariaLabel: "Ask a Scholar — AI chat" },
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

export function MobileTabBar() {
  const pathname = usePathname();

  // Suppress on homepage (has its own NavBar)
  if (pathname === "/") return null;

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "rgba(5,5,8,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(0,229,255,0.1)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <ul className="flex items-center justify-around px-2 py-2">
        {tabItems.map((item) => (
          <li key={item.href} className="flex-1">
            <Link
              href={item.href}
              aria-current={isActive(item.href, pathname) ? "page" : undefined}
              aria-label={item.ariaLabel}
              className={cn(
                "flex flex-col items-center gap-1 min-h-[44px] justify-center",
                isActive(item.href, pathname)
                  ? "text-[var(--color-cyan-400)]"
                  : "text-[var(--color-text-secondary)]"
              )}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                {item.icon}
              </span>
              <span className="micro-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
