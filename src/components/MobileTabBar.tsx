"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabItems = [
  { label: "Books", href: "/books", icon: "menu_book", ariaLabel: "Books" },
  {
    label: "Notes",
    href: "/commentary",
    icon: "layers",
    ariaLabel: "Commentary",
  },
  {
    label: "Timelines",
    href: "/timelines",
    icon: "timeline",
    ariaLabel: "Bible timelines",
  },
  {
    label: "Explorer",
    href: "/explore",
    icon: "explore",
    ariaLabel: "Bible Lens Explorer",
  },
  {
    label: "Scholar",
    href: "/chat",
    icon: "robot_2",
    ariaLabel: "Ask a Scholar — AI chat",
  },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/books") {
    return pathname.startsWith("/books") || pathname.startsWith("/bible");
  }
  if (href === "/commentary") {
    return pathname.startsWith("/commentary") || pathname.startsWith("/topics");
  }
  if (href === "/timelines") {
    return pathname.startsWith("/timelines");
  }
  if (href === "/explore") {
    return pathname.startsWith("/explore");
  }
  if (href === "/chat") {
    return pathname.startsWith("/chat");
  }
  return false;
}

export function MobileTabBar() {
  const pathname = usePathname();

  // The homepage and Explorer have their own primary navigation.
  if (pathname === "/" || pathname.startsWith("/explore")) return null;

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "var(--color-nav-surface)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid var(--color-accent-line)",
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
                  : "text-[var(--color-text-secondary)]",
              )}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {item.icon === "menu_book" && (
                  <>
                    <path d="M12 5v15M3 4h4a6 6 0 0 1 5 2 6 6 0 0 1 5-2h4v14h-4a6 6 0 0 0-5 2 6 6 0 0 0-5-2H3Z" />
                  </>
                )}
                {item.icon === "layers" && (
                  <>
                    <path d="m12 3 9 5-9 5-9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />
                  </>
                )}
                {item.icon === "timeline" && (
                  <>
                    <path d="M5 4v16m0-12h7m0 0V4m-7 12h13m0 0v4" />
                    <circle cx="12" cy="4" r="2" />
                    <circle cx="18" cy="20" r="2" />
                  </>
                )}
                {item.icon === "explore" && (
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <path d="m16 8-2 6-6 2 2-6Z" />
                  </>
                )}
                {item.icon === "robot_2" && (
                  <>
                    <path d="M12 3v3M5 6h14v12H9l-4 3Z" />
                    <path d="M9 10h.01M15 10h.01M9 14h6" />
                  </>
                )}
              </svg>
              <span className="text-[10px] font-semibold uppercase tracking-[0.04em]">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
