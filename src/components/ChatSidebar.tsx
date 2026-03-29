import Link from "next/link";

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
        className="flex items-center gap-2 px-4 py-2 glass-card text-sm"
        style={{ color: "var(--color-cyan-400)" }}
      >
        + New Research
      </Link>

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
                className="block text-sm py-2 px-3 glass-card transition-colors"
                style={{ color: "var(--color-text-muted-warm)" }}
              >
                {q}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
