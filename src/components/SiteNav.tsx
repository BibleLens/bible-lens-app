"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Explorer", href: "/explore" },
  { label: "Read the Bible", href: "/books" },
  { label: "Commentary", href: "/commentary" },
  { label: "Timelines", href: "/timelines" },
];
export function SiteNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/bible/") && pathname.split("/").length > 3)
    return null;
  return (
    <header className="site-header">
      <Link href="/" className="site-brand" aria-label="Bible Lens home">
        <svg viewBox="0 0 44 50" fill="none" aria-hidden="true">
          <path
            d="M22 2 41 13v24L22 48 3 37V13Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M22 9 35 17v16L22 41 9 33V17Z" stroke="currentColor" />
          <path
            d="m9 17 13 8 13-8M22 25v16"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
        <span>
          BIBLE LENS<small>Ancient wisdom, modern clarity</small>
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <div className="site-main-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                pathname.startsWith(link.href) ||
                (link.href === "/books" && pathname.startsWith("/bible"))
                  ? "page"
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
        <details className="site-menu">
          <summary>
            More <span aria-hidden="true">⌄</span>
          </summary>
          <div>
            {[
              ...links,
              { label: "Topics", href: "/topics" },
              { label: "Start here", href: "/start-here" },
              { label: "Ask a Scholar", href: "/chat" },
              { label: "About Bible Lens", href: "/about" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) =>
                  e.currentTarget.closest("details")?.removeAttribute("open")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </details>
        <Link
          className="site-search"
          href="/search"
          aria-label="Search the Bible Lens library"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="8"
              cy="8"
              r="5.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="m12 12 5 5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Link>
      </nav>
    </header>
  );
}
