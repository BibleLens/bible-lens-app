import type { Metadata } from "next";
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
      {/* Main content — chat fills remaining height */}
      <main id="main-content" className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-4 pt-20 overflow-hidden">
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
