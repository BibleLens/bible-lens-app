"use client";

import Link from "next/link";

const navLinks = [
  { label: "Explore", href: "/books" },
  { label: "Context", href: "/commentary" },
  { label: "Topics", href: "/topics" },
  { label: "Archive", href: "/start-here" },
  { label: "Scholar", href: "/chat" },
];

export function NavBar() {
  return (
    <nav
      className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-cyan-400/10 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)]"
      aria-label="Main navigation"
    >
      <div className="flex flex-col items-center px-6 pt-3 pb-2">
        {/* Centered full Bible Lens logo (wordmark baked in — no separate text) */}
        <Link href="/" className="flex justify-center" aria-label="Bible Lens home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/bible-lens-logo-no-tagline.svg"
            alt="Bible Lens"
            className="h-44 w-auto logo-pulse"
          />
        </Link>

        {/* Nav links centered beneath the crest */}
        <ul className="hidden md:flex items-center justify-center gap-9 mt-1">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="min-h-[44px] flex items-center text-lg tracking-wide text-slate-200 hover:text-cyan-300 border-b-2 border-transparent hover:border-cyan-400/60 transition-colors"
                style={{ fontFamily: "var(--homepage-font-body)" }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
