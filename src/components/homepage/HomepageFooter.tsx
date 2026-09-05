"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function HomepageFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/explore/")) return null;
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" className="footer-wordmark">
          Bible Lens
        </Link>
        <p>Scripture, history and room to think.</p>
        <small>© 2026 Bible Lens</small>
      </div>
      <nav aria-label="Footer navigation">
        {[
          { label: "Explorer", href: "/explore" },
          { label: "Read the Bible", href: "/books" },
          { label: "Topics", href: "/topics" },
          { label: "Start here", href: "/start-here" },
          { label: "About", href: "/about" },
          { label: "Privacy", href: "/privacy" },
        ].map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
