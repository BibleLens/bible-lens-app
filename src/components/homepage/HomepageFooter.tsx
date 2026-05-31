"use client";

import { LensIcon } from "@/components/LensIcon";
import Link from "next/link";

export function HomepageFooter() {
  return (
    <footer
      className="border-t border-white/5 mt-20"
      style={{ background: "var(--homepage-bg)" }}
    >
      <div className="w-full px-6 py-16 flex flex-col md:flex-row justify-between items-stretch gap-8 max-w-screen-2xl mx-auto">
        {/* Left: Logo block */}
        <div className="footer-card p-8 flex flex-col justify-center">
          <div className="footer-card-spotlight" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <LensIcon size={36} animate={false} />
              <span
                className="text-xl italic cyan-glow-text"
                style={{ fontFamily: "var(--homepage-font-display)", color: "#00e5ff" }}
              >
                Bible Lens
              </span>
            </div>
            <p
              className="text-[10px] uppercase tracking-[0.2rem]"
              style={{ fontFamily: "var(--homepage-font-body)", color: "rgba(243, 243, 245, 0.55)" }}
            >
              &copy; 2026 Context Over Tradition. All Truth is God&apos;s Truth.
            </p>
          </div>
        </div>

        {/* Right: Nav links */}
        <div className="footer-card p-8 flex items-center justify-center">
          <div className="footer-card-spotlight" />

          <div className="relative z-10 flex flex-wrap justify-center gap-10">
            {[
              { label: "Theology", href: "/commentary" },
              { label: "Historical Context", href: "/about" },
              { label: "Hermeneutics", href: "/start-here" },
              { label: "Privacy", href: "/privacy" },
            ].map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[10px] uppercase tracking-[0.2rem] text-[var(--homepage-text)] transition-colors duration-200 hover:text-[#00e5ff]"
                  style={{ fontFamily: "var(--homepage-font-body)" }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[10px] uppercase tracking-[0.2rem] text-[var(--homepage-text)] transition-colors duration-200 hover:text-[#00e5ff]"
                  style={{ fontFamily: "var(--homepage-font-body)" }}
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
