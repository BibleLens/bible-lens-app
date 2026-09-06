import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import "./about.css";

export const metadata: Metadata = pageMetadata({
  title: "About Bible Lens | Our Christian Faith and Hope",
  description:
    "We're Christians who follow Jesus, worship his Father as the one true God, and trust the Bible's promise of resurrection and lasting life on earth.",
  path: "/about",
});

const beliefs = [
  {
    id: "the-father",
    title: "The God Jesus prayed to",
    paragraphs: [
      "We believe in and pray to the same God Jesus did: the Father, the one true God. When Jesus prayed, he addressed his Father as “the only true God” and spoke of himself as the one God had sent. After his resurrection, he still called the Father his God and our God.",
      "That's the relationship at the heart of our faith. We worship the Father and follow Jesus, his Son, our Lord and Messiah.",
    ],
    passages: [
      { label: "John 17:1–3", href: "/bible/john/17" },
      { label: "John 20:17", href: "/bible/john/20" },
      { label: "1 Corinthians 8:6", href: "/bible/1corinthians/8" },
    ],
  },
  {
    id: "jesus-humanity",
    title: "Jesus shared our humanity",
    paragraphs: [
      "We believe Jesus was fully human. He experienced temptation, suffering and the need to trust God. His faithfulness matters because he was one of us.",
      "We don't see how God becoming human would demonstrate what a human being can do. Jesus' life shows us a human being remaining faithful to God under the most extreme circumstances, even when that faithfulness cost him his life.",
      "God is immortal and cannot die. Jesus could die, and did. We understand his death as the real giving of his human life for us.",
    ],
    passages: [
      { label: "Hebrews 2:14–18", href: "/bible/hebrews/2" },
      { label: "Hebrews 4:15", href: "/bible/hebrews/4" },
      { label: "Hebrews 5:7–9", href: "/bible/hebrews/5" },
      { label: "1 Timothy 1:17", href: "/bible/1timothy/1" },
    ],
  },
  {
    id: "raised-to-life",
    title: "God raised him to life",
    paragraphs: [
      "Jesus' story didn't end in the grave. God raised him from the dead and granted him immortality. He can never die again.",
      "His resurrection is the foundation of our hope. The God who brought Jesus back to life can also bring back those we've lost. Everlasting life is God's gift, made possible through his Son.",
    ],
    passages: [
      { label: "Acts 2:24, 32–36", href: "/bible/acts/2" },
      { label: "Romans 6:9", href: "/bible/romans/6" },
      { label: "1 Corinthians 15:20–22", href: "/bible/1corinthians/15" },
    ],
  },
  {
    id: "confidence-in-scripture",
    title: "Why we trust the Bible",
    paragraphs: [
      "Our complete confidence in the Bible is rooted in Jesus and the fulfilment of his words. We believe everything he predicted for his contemporaries came true. His warnings about Jerusalem and its Temple belong to the generation he addressed, with their destruction in AD 70 central to that fulfilment.",
      "For us, this proves his Messianic credentials. His fulfilled words give us reason to trust the promises that still lie ahead, including his future thousand-year reign.",
      "We distinguish those first-century events from his future visible, bodily return. We look forward to one public return, when he gathers his people and brings the promised Kingdom to its fulfilment.",
    ],
    passages: [
      { label: "Matthew 24:2, 34", href: "/bible/matthew/24" },
      { label: "Luke 21:20–32", href: "/bible/luke/21" },
      { label: "Acts 1:9–11", href: "/bible/acts/1" },
      { label: "Revelation 20:4–6", href: "/bible/revelation/20" },
    ],
    history: {
      label: "Historical account: Josephus, Jewish War 6.4",
      href: "https://penelope.uchicago.edu/josephus/war-6.html#Ch.4",
    },
  },
  {
    id: "death-and-deception",
    title: "Death, and the first deception",
    paragraphs: [
      "In Genesis, God warned Adam, “you will surely die.” The serpent told Eve, “You will not surely die.” Those are opposing claims. We believe God's warning.",
      "We understand Adam and Eve's death as a return to the dust. They didn't continue living in another realm. In our reading, death is the loss of life, and human beings don't possess an inherently immortal soul.",
      "We see the belief that people never really die as one of the most far-reaching consequences of that first lie. We believe Satan uses it to draw people away from the Bible's teaching about death and the need for resurrection.",
    ],
    passages: [
      { label: "Genesis 2:17", href: "/bible/genesis/2" },
      { label: "Genesis 3:4, 19", href: "/bible/genesis/3" },
      { label: "Ecclesiastes 9:5, 10", href: "/bible/ecclesiastes/9" },
      { label: "Revelation 12:9", href: "/bible/revelation/12" },
    ],
  },
  {
    id: "resurrection-hope",
    title: "Our hope is resurrection",
    paragraphs: [
      "Death is real, but it needn't be the end. Jesus spoke of waking the dead, and the Bible holds out a resurrection of both the righteous and the unrighteous.",
      "We believe those who have died have the prospect of being resurrected into Jesus' Kingdom, with the opportunity to live forever in perfect conditions here on earth. Our hope is for real people to live again, on a restored earth where life can flourish.",
      "We look forward to Jesus' millennial reign and, ultimately, the complete removal of suffering and death. Resurrection and lasting life are gifts from God. That's the future we want to help people discover in the Bible.",
    ],
    passages: [
      { label: "John 11:11–25", href: "/bible/john/11" },
      { label: "Acts 24:15", href: "/bible/acts/24" },
      { label: "Matthew 5:5", href: "/bible/matthew/5" },
      { label: "Revelation 21:3–4", href: "/bible/revelation/21" },
    ],
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <header className="about-introduction">
        <p className="site-eyebrow">About Bible Lens</p>
        <h1>We’re <em>Christians.</em></h1>
        <p className="about-lead">
          We follow Jesus, worship his Father and look forward to the life God has promised.
        </p>
        <p>
          Acts records that Jesus’ followers were first called Christians at Antioch.
          We believe that name was given through divine providence, and we proudly
          bear it. It expresses who we belong to and whose example we want to follow.
        </p>
        <ul className="about-passages" aria-label="Passages about the name Christian">
          <li><Link href="/bible/acts/11">Acts 11:26 <span aria-hidden="true">↗</span></Link></li>
          <li><Link href="/bible/1peter/4">1 Peter 4:16 <span aria-hidden="true">↗</span></Link></li>
        </ul>
      </header>

      <section aria-labelledby="our-faith" className="about-beliefs">
        <div className="about-section-intro">
          <p className="site-eyebrow">What we believe</p>
          <h2 id="our-faith">The faith behind the lens.</h2>
          <p>
            These convictions shape how we read Scripture. We share them openly,
            with the passages that lead us to them, so you can examine them for yourself.
          </p>
        </div>
        {beliefs.map((belief) => (
          <section key={belief.id} aria-labelledby={belief.id} className="about-belief">
            <h3 id={belief.id}>{belief.title}</h3>
            {belief.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <ul className="about-passages" aria-label={`Passages: ${belief.title}`}>
              {belief.passages.map((passage) => (
                <li key={passage.href}>
                  <Link href={passage.href}>{passage.label} <span aria-hidden="true">↗</span></Link>
                </li>
              ))}
            </ul>
            {belief.history && (
              <a className="about-history" href={belief.history.href} target="_blank" rel="noopener noreferrer">
                {belief.history.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </section>
        ))}
      </section>

      <section className="about-reading" aria-labelledby="how-we-read">
        <p className="site-eyebrow">An invitation to explore</p>
        <h2 id="how-we-read">Confidence, with room for questions.</h2>
        <p>
          Confidence in the Bible doesn’t make our interpretations beyond question.
          We begin with the text, ask what its first readers would have understood,
          and use history, archaeology and careful scholarship to examine the setting.
          We show our sources and distinguish the evidence from the conclusions we draw.
        </p>
        <p>
          Some of these convictions are minority readings within Christianity.
          We respect people who understand the passages differently. You’re welcome
          to bring your questions, examine an argument and disagree with us.
          If we’ve misunderstood the evidence, we want to know.
        </p>
      </section>

      <section className="about-founder" aria-labelledby="pat-robinson">
        <p className="site-eyebrow">Who’s behind Bible Lens</p>
        <h2 id="pat-robinson">Pat Robinson</h2>
        <p>
          I built Bible Lens to make careful Bible study more accessible. I’m an
          independent researcher and publisher. My role is to bring the text,
          historical context and supporting sources together so you can follow
          the argument and test it for yourself.
        </p>
        <p>
          When a question needs specialist knowledge, I draw on the work of
          archaeologists, language scholars and historians, and make those sources
          available. I want the pages here to grow more useful as we learn.
        </p>
      </section>

      <nav className="about-actions" aria-label="Start exploring Bible Lens">
        <Link className="site-button primary" href="/explore">Enter the Explorer <span aria-hidden="true">→</span></Link>
        <Link className="site-text-link" href="/books">Read the Bible <span aria-hidden="true">→</span></Link>
      </nav>
    </main>
  );
}
