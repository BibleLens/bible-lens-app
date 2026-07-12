import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy | Bible Lens",
  description:
    "How Bible Lens handles your information. We collect only what's needed to send you updates, never sell your data, and make it easy to leave.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-obsidian)" }}>
      <main
        id="main-content"
        className="flex-1 max-w-3xl mx-auto w-full px-4 pb-16 pt-[248px]"
      >
        <h1
          className="text-3xl font-bold mb-3"
          style={{ fontFamily: "var(--font-cinzel), serif", color: "var(--color-gold-400)" }}
        >
          Privacy
        </h1>
        <p className="text-sm mb-10" style={{ color: "var(--color-text-muted)" }}>
          Last updated June 2026
        </p>

        <div
          className="space-y-6 text-lg leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <p>
            Bible Lens is built to help you read Scripture in its historical context. We
            keep the data side simple, and we&rsquo;d rather tell you plainly what happens
            than bury it in legal boilerplate.
          </p>

          <section className="space-y-3">
            <h2
              className="text-xl font-semibold"
              style={{ fontFamily: "var(--homepage-font-display)", color: "var(--homepage-text)" }}
            >
              What we collect
            </h2>
            <p>
              If you sign up for updates, we store the email address you give us so we can
              send you a note when new work ships. That&rsquo;s the only personal detail we
              ask for. Like most websites, our hosting provider also records standard,
              anonymous traffic information (such as page views) to keep the site running.
            </p>
          </section>

          <section className="space-y-3">
            <h2
              className="text-xl font-semibold"
              style={{ fontFamily: "var(--homepage-font-display)", color: "var(--homepage-text)" }}
            >
              How we use it
            </h2>
            <p>
              Your email is used only to send you Bible Lens updates. Our newsletter runs on
              Buttondown, which stores your address so we can email you. We do not sell,
              rent, or share your information with advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2
              className="text-xl font-semibold"
              style={{ fontFamily: "var(--homepage-font-display)", color: "var(--homepage-text)" }}
            >
              Leaving anytime
            </h2>
            <p>
              Every email includes a one-click unsubscribe link. Use it and your address is
              removed. If you&rsquo;d like your data deleted directly, just ask and
              we&rsquo;ll take care of it.
            </p>
          </section>

          <section className="space-y-3">
            <h2
              className="text-xl font-semibold"
              style={{ fontFamily: "var(--homepage-font-display)", color: "var(--homepage-text)" }}
            >
              Questions
            </h2>
            <p>
              Reach us anytime at{" "}
              <a
                href="mailto:hello@biblelens.faith"
                className="transition-colors hover:text-[var(--color-cyan-400)]"
                style={{ color: "var(--homepage-primary)" }}
              >
                hello@biblelens.faith
              </a>
              .
            </p>
          </section>

          <p className="pt-4">
            <Link
              href="/"
              className="transition-colors hover:text-[var(--color-cyan-400)]"
              style={{ color: "var(--homepage-primary)" }}
            >
              Back to Bible Lens
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
