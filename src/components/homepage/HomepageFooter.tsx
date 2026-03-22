"use client";

import { LensIcon } from "@/components/LensIcon";

export function HomepageFooter() {
  return (
    <footer
      className="border-t border-white/5 mt-20"
      style={{ background: "var(--homepage-bg)" }}
    >
      <div className="w-full px-6 py-16 flex flex-col md:flex-row justify-between items-center max-w-screen-2xl mx-auto">
        {/* Left: Logo block */}
        <div className="mb-10 md:mb-0">
          <div className="flex items-center gap-3 mb-4">
            <LensIcon size={28} animate={false} />
            <span
              className="text-xl opacity-50 italic"
              style={{ fontFamily: "var(--homepage-font-display)", color: "#00e5ff" }}
            >
              Bible Lens
            </span>
          </div>
          <p
            className="text-[10px] uppercase tracking-[0.2rem]"
            style={{ fontFamily: "var(--homepage-font-body)", color: "rgba(220, 193, 180, 0.6)" }}
          >
            &copy; 2026 Context Over Tradition. All Truth is God&apos;s Truth.
          </p>
        </div>

        {/* Right: Nav links */}
        <div className="flex flex-wrap justify-center gap-10">
          {[
            { label: "Theology", href: "/commentary" },
            { label: "Historical Context", href: "/about" },
            { label: "Hermeneutics", href: "/start-here" },
            { label: "Privacy", href: "#" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.2rem] transition-all hover:text-[#00e5ff]"
              style={{ fontFamily: "var(--homepage-font-body)", color: "#DCC1B4" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
