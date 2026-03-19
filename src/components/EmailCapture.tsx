"use client";

// src/components/EmailCapture.tsx
// Self-contained email capture form island — can be dropped into any server component page
// without converting that page to a client component.
import { useState } from "react";

interface EmailCaptureProps {
  headline?: string;
  subtext?: string;
}

export function EmailCapture({
  headline = "Stay in the loop",
  subtext = "Get notified when new commentary drops — no spam, just fresh perspectives on ancient texts.",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Guard against double-submit and re-submit after success
    if (status === "loading" || status === "success") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: honeypot }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error — please try again.");
      setStatus("error");
    }
  }

  return (
    <section className="mt-12 mb-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
          {headline}
        </h2>
        <p className="text-[var(--color-text-secondary)] mt-2 mb-4">{subtext}</p>

        {status === "success" ? (
          <p className="text-[var(--color-gold-400)] font-medium">
            You&apos;re in — check your inbox to confirm.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="relative">
            {/* Honeypot field — hidden from visual users, screen readers, and keyboard nav */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="flex gap-3">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                disabled={status === "loading"}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-400)]/50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-5 py-2.5 rounded-lg bg-[var(--color-gold-400)] text-black font-medium hover:brightness-110 disabled:opacity-50 transition-all whitespace-nowrap"
              >
                {status === "loading" ? "Sending..." : "Subscribe"}
              </button>
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
