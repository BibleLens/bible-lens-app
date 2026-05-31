import Link from "next/link";
import { LensIcon } from "@/components/LensIcon";

const SUGGESTED_INQUIRIES = [
  "What did Jesus mean in Matthew 24?",
  "Who is the Last Adam?",
  "What is the Kingdom of God?",
  "Ancient cosmology in Genesis 1",
];

export function ChatSidebar() {
  return (
    <aside
      className="hidden lg:flex flex-col gap-6 p-6 border-r"
      style={{
        background: "var(--color-obsidian)",
        borderColor: "rgba(0,229,255,0.1)",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      {/* Header block */}
      <div>
        <span
          className="micro-label mb-2 block"
          style={{ color: "var(--color-cyan-400)" }}
        >
          SCHOLAR AI
        </span>
        <h2
          className="text-xl font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text-primary)",
          }}
        >
          Research Console
        </h2>
      </div>

      {/* New Research link */}
      <Link
        href="/chat"
        className="group relative flex items-center justify-center gap-2 px-4 py-3 glass-card text-sm overflow-hidden"
        style={{ color: "var(--color-cyan-400)" }}
      >
        <div className="shimmer-layer" />
        <LensIcon size={16} animate={false} />
        <span className="relative z-10">New Research</span>
      </Link>

      {/* Diamond divider */}
      <div className="flex items-center gap-3" aria-hidden="true">
        <div className="flex-1 h-px" style={{ background: "rgba(0,229,255,0.1)" }} />
        <div
          className="w-2 h-2"
          style={{
            background: "var(--color-cyan-400)",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            opacity: 0.4,
          }}
        />
        <div className="flex-1 h-px" style={{ background: "rgba(0,229,255,0.1)" }} />
      </div>

      {/* Suggested inquiries section */}
      <div>
        <span
          className="micro-label mb-3 block"
          style={{ color: "var(--color-text-muted-warm)" }}
        >
          SUGGESTED INQUIRIES
        </span>
        <ul className="space-y-2">
          {SUGGESTED_INQUIRIES.map((q) => (
            <li key={q}>
              <Link
                href={"/chat?q=" + encodeURIComponent(q)}
                className="group relative block text-sm py-2.5 px-3 glass-card overflow-hidden transition-all duration-300"
                style={{ color: "var(--color-text-muted-warm)" }}
              >
                <div className="shimmer-layer" />
                <span className="relative z-10">{q}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
