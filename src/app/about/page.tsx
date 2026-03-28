import Link from "next/link";
import type { Metadata } from "next";
import { LensIcon } from "@/components/LensIcon";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "About the Lens | Bible Lens",
  description:
    "Bible Lens reads Scripture through a unitarian, partial-preterist, historical-critical lens. Learn what that means and why it shapes every answer you get.",
};

export default function AboutPage() {
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

          {/* Nav links */}
          <nav className="flex items-center gap-4 ml-auto">
            <Link
              href="/search"
              className="text-lg transition-colors min-h-[44px] flex items-center"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Search
            </Link>
            <Link
              href="/chat"
              className="text-lg transition-colors min-h-[44px] flex items-center"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Chat
            </Link>
            <span
              className="text-lg font-medium min-h-[44px] flex items-center"
              style={{ color: "var(--color-gold-400)" }}
            >
              About
            </span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main id="main-content" className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">

        {/* Section 1: About Bible Lens */}
        <section className="mb-14">
          <h1
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "var(--color-gold-400)" }}
          >
            About Bible Lens
          </h1>

          <div className="space-y-5 text-lg" style={{ color: "var(--color-text-secondary)" }}>
            <p>
              Have you ever sat in a pew — or a lecture hall — with a question you were afraid to ask?
            </p>
            <p>
              Maybe it was about Genesis and dinosaurs. Maybe it was about a doctrine that
              didn&rsquo;t quite add up. Maybe it was a scientific claim that seemed to contradict
              something you&rsquo;d observed.
            </p>
            <p>
              Most of us learned early: some questions aren&rsquo;t welcome. In religious spaces,
              asking the wrong thing can get you labeled a doubter — or worse. In academic spaces,
              questioning the consensus can get you dismissed as uninformed.
            </p>
            <p>
              So we learn to go along to get along. And somewhere along the way, many of us lost
              something — either our faith, our intellectual honesty, or both.
            </p>
            <p className="font-semibold text-xl" style={{ color: "var(--color-text-primary)" }}>
              Bible Lens exists for the people who refused to stop asking.
            </p>
            <p>
              We believe the Bible can handle your hardest questions — and so can you. We bring
              ancient texts into focus using archaeology, history, and the worldview of the original
              audiences. Not to tell you what to think, but to give you the tools to think for
              yourself.
            </p>
            <p>
              No gatekeepers. No fear of expulsion. Just ancient wisdom, examined honestly.
            </p>
          </div>
        </section>

        {/* Section 2: About the Lens */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "var(--color-gold-400)" }}
          >
            About the Lens
          </h2>
          <p className="text-lg mb-8" style={{ color: "var(--color-text-muted)" }}>
            Every reader brings a framework to the text. Here&rsquo;s ours — stated plainly.
          </p>

          {/* Unitarian Monotheism */}
          <div className="mb-10 pl-5 border-l-2" style={{ borderColor: "var(--color-gold-400)" }}>
            <h3
              className="text-xl font-semibold mb-3"
              style={{ fontFamily: "var(--font-cinzel), serif", color: "var(--color-text-primary)" }}
            >
              Unitarian Monotheism
            </h3>
            <div className="space-y-4 text-lg" style={{ color: "var(--color-text-secondary)" }}>
              <p>
                Through this lens, the Shema — &ldquo;Hear, O Israel: the LORD our God, the LORD
                is one&rdquo; — means exactly what it says. God is one person: the Father. Jesus is
                the Messiah, the Son of God, a fully human being chosen and anointed by God.
              </p>
              <p>
                This is a minority position in contemporary Christianity, but it was the
                mainstream reading of Jewish monotheism in the first century. What the original
                audience would have understood when Jesus said &ldquo;the Father is greater than
                I&rdquo; (John 14:28) is straightforward: the one who sends is greater than the
                one who is sent.
              </p>
              <p>
                Key texts we return to often: John 17:3 (&ldquo;the only true God, and Jesus
                Christ whom you have sent&rdquo;), 1 Corinthians 8:6 (&ldquo;one God, the
                Father... and one Lord, Jesus Christ&rdquo;), and the Shema itself (Deuteronomy
                6:4).
              </p>
              <p className="text-lg italic" style={{ color: "var(--color-text-muted)" }}>
                We acknowledge this challenges traditional Trinitarian theology. We hold this view
                because we believe it best reflects the historical, textual evidence — not to
                dismiss those who read differently.
              </p>
            </div>
          </div>

          {/* Partial Preterism */}
          <div className="mb-10 pl-5 border-l-2" style={{ borderColor: "var(--color-cyan-400)" }}>
            <h3
              className="text-xl font-semibold mb-3"
              style={{ fontFamily: "var(--font-cinzel), serif", color: "var(--color-text-primary)" }}
            >
              Partial Preterism
            </h3>
            <div className="space-y-4 text-lg" style={{ color: "var(--color-text-secondary)" }}>
              <p>
                Here&rsquo;s where it gets interesting: most of Matthew 24 and large portions of
                Revelation were not predictions about our future — they were predictions about the
                first century. And they came true in 70 AD when Rome destroyed Jerusalem and the
                temple.
              </p>
              <p>
                When Jesus said &ldquo;this generation will not pass away until all these things
                take place&rdquo; (Matthew 24:34), the most natural reading is that he meant the
                generation he was speaking to. The &ldquo;end of the age&rdquo; he described was
                the end of the Old Covenant era — not the end of the physical world.
              </p>
              <p>
                This view is called partial preterism. It doesn&rsquo;t deny a future return of
                Christ, but it takes seriously the plain time-language of the New Testament:
                &ldquo;soon,&rdquo; &ldquo;near,&rdquo; and &ldquo;quickly&rdquo; meant what
                they say.
              </p>
              <p className="text-lg italic" style={{ color: "var(--color-text-muted)" }}>
                This is another minority view, held by a significant number of scholars and
                theologians across history. We present it as historically-grounded, not as the
                only valid reading.
              </p>
            </div>
          </div>

          {/* Historical-Critical Method */}
          <div className="mb-10 pl-5 border-l-2" style={{ borderColor: "var(--color-gold-400)" }}>
            <h3
              className="text-xl font-semibold mb-3"
              style={{ fontFamily: "var(--font-cinzel), serif", color: "var(--color-text-primary)" }}
            >
              Historical-Critical Method
            </h3>
            <div className="space-y-4 text-lg" style={{ color: "var(--color-text-secondary)" }}>
              <p>
                We read the Bible the way you&rsquo;d read any ancient document: asking first what
                it meant to the people who wrote it and first received it. What did a
                first-century Jew understand by &ldquo;the kingdom of God&rdquo;? What did an
                ancient Israelite hear in the Genesis creation narrative?
              </p>
              <p>
                Through this lens, Genesis 1 isn&rsquo;t a scientific account competing with
                modern cosmology — it&rsquo;s a cosmic temple dedication narrative structured
                around the seven-day pattern of ancient Near Eastern literature. Understanding
                that doesn&rsquo;t diminish the text; it illuminates it.
              </p>
              <p>
                We draw on archaeology, ancient Near Eastern texts, Second Temple Jewish
                literature, and the work of historians and biblical scholars who have devoted
                careers to understanding this world. We try to acknowledge our sources and be
                honest when we&rsquo;re presenting contested interpretations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: What This Means in Practice */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "var(--color-gold-400)" }}
          >
            What This Means in Practice
          </h2>
          <div className="space-y-5 text-lg" style={{ color: "var(--color-text-secondary)" }}>
            <p>
              When you read commentary in Bible Lens, it will reflect this framework. Our analysis
              of Genesis will emphasize ancient cosmological context over modern scientific
              debates. Our reading of Matthew 24 will highlight the 70 AD fulfillment. When the
              identity of Jesus comes up, the AI will present a unitarian perspective grounded in
              the historical text.
            </p>
            <p>
              Our goal is not to tell you what to believe. It&rsquo;s to give you a coherent,
              historically-grounded alternative to the readings you may have grown up with — and
              to let you decide.
            </p>
            <p>
              If you read something that surprises you, good. That&rsquo;s the point. Push back,
              ask follow-up questions, bring your own reading. The text is rich enough to hold the
              conversation.
            </p>
            <p className="font-medium" style={{ color: "var(--color-text-primary)" }}>
              Ancient wisdom, modern clarity. That&rsquo;s what we&rsquo;re after.
            </p>
          </div>
        </section>

        {/* CTA back to app */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg transition-colors min-h-[44px]"
            style={{ color: "var(--color-cyan-400)" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Bible Lens
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="border-t py-6 mt-auto"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-base" style={{ color: "var(--color-text-muted)" }}>
            Ancient wisdom, modern clarity.
          </p>
        </div>
      </footer>
    </div>
  );
}
