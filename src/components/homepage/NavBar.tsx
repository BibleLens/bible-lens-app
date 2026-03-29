"use client";

import Link from "next/link";
import { LensIcon } from "@/components/LensIcon";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { label: "Search", href: "/search" },
  { label: "Chat", href: "/chat" },
  { label: "Commentary", href: "/commentary" },
  { label: "Books", href: "/books" },
  { label: "Topics", href: "/topics/daniel-7-son-of-man" },
];

export function NavBar() {
  return (
    <nav
      className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-cyan-400/10 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)]"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Bible Lens home"
        >
          <LensIcon size={56} animate={true} />
          <span
            style={{ fontFamily: "var(--homepage-font-display)" }}
            className="text-xl font-bold tracking-wide"
          >
            <span className="text-gold-400" style={{ color: "#facc15" }}>Bible</span>
            <span className="text-cyan-400"> Lens</span>
          </span>
        </Link>

        {/* Right: Nav links + ThemeToggle */}
        <div className="flex items-center gap-4">
          <ul className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="min-h-[44px] flex items-center text-slate-400 hover:text-cyan-300 transition-colors"
                  style={{ fontFamily: "var(--homepage-font-body)" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
