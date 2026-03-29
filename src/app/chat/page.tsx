import type { Metadata } from "next";
import { ChatInterface } from "@/components/ChatInterface";
import { ChatSidebar } from "@/components/ChatSidebar";

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
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-obsidian)" }}
    >
      {/* Main content */}
      <main id="main-content" className="flex-1 flex flex-col pt-20">
        <div className="flex-1 flex lg:grid lg:grid-cols-[280px_1fr]">
          <ChatSidebar />
          <div className="flex-1 flex flex-col min-h-0 px-4 py-4">
            <ChatInterface initialQuery={q} />
          </div>
        </div>
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
