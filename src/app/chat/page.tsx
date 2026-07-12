import type { Metadata } from "next";
import { ChatInterface } from "@/components/ChatInterface";
import { ChatSidebar } from "@/components/ChatSidebar";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Ask a Question | Bible Lens",
  description:
    "AI-powered theological Q&A grounded in the Bible Lens knowledge base. Ask questions about Scripture and receive historically-informed answers in a warm, accessible voice.",
  path: "/chat",
});

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div
      className="min-h-screen flex flex-col grain-overlay relative overflow-hidden"
      style={{ background: "var(--color-obsidian)" }}
    >
      {/* Ambient glow orbs */}
      <div
        className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#00e5ff]/5 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-[-15%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#00e5ff]/3 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Main content */}
      <main id="main-content" className="flex-1 flex flex-col pt-20">
        <div className="flex-1 flex lg:grid lg:grid-cols-[280px_1fr]">
          <ChatSidebar />
          <div className="flex-1 flex flex-col min-h-0 px-4 py-4">
            <ChatInterface initialQuery={q} />
          </div>
        </div>
      </main>
    </div>
  );
}
