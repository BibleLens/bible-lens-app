"use client";
import { useRouter } from "next/navigation";

const SUGGESTIONS = [
  "Who are the sons of God in Genesis 6?",
  "What is the heavenly court?",
  "How does Daniel 7 connect to Revelation?",
  "What did the Servant Songs mean to the original audience?",
  "When was Revelation written?",
  "What is partial preterism?",
];

export function SuggestionBubbles() {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2">
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          onClick={() => router.replace(`/search?q=${encodeURIComponent(s)}`)}
          className="px-3 py-1.5 text-sm transition-colors hover:border-[rgba(0,229,255,0.4)]"
          style={{
            border: "1px solid rgba(0,229,255,0.15)",
            background: "rgba(0,229,255,0.03)",
            color: "var(--color-text-muted-warm)",
            fontFamily: "var(--font-interface)",
            borderRadius: 0,
          }}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
