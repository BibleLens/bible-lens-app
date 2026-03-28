import Link from "next/link";
import type { Metadata } from "next";
import { LensIcon } from "@/components/LensIcon";
import { BackButton } from "@/components/BackButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChatInterface } from "@/components/ChatInterface";

export const metadata: Metadata = {
  title: "Ask a Question | Bible Lens",
  description:
    "AI-powered theological Q&A grounded in the Bible Lens knowledge base. Ask questions about Scripture and receive historically-informed answers in a warm, accessible voice.",
};

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          background: "var(--color-bg-primary)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <BackButton />
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <LensIcon size={48} animate={false} />
              <span
                className="text-2xl font-semibold tracking-wide hidden sm:block"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                <span style={{ color: "var(--color-gold-400)" }}>Bible</span>
                <span style={{ color: "var(--color-cyan-400)" }}> Lens</span>
              </span>
            </Link>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-4 ml-auto" aria-label="Main navigation">
            <Link
              href="/search"
              className="text-lg transition-colors min-h-[44px] flex items-center"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Search
            </Link>
            <span
              className="text-lg font-medium min-h-[44px] flex items-center"
              style={{ color: "var(--color-cyan-400)" }}
            >
              Chat
            </span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main content — chat fills remaining height */}
      <main id="main-content" className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-4 overflow-hidden">
        <ChatInterface initialQuery={q} />
      </main>

      {/* Footer */}
      <footer
        className="border-t py-4 shrink-0"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-base" style={{ color: "var(--color-text-muted)" }}>
            Ancient wisdom, modern clarity.
          </p>
        </div>
      </footer>
    </div>
  );
}
