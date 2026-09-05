import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { pageMetadata } from "@/lib/page-metadata";
import { studyUrl } from "@/lib/explorer/state";

export const metadata = pageMetadata({
  title: "Bible Lens | Discover the world around Scripture",
  description:
    "Read a passage, follow the people and places, and explore the historical evidence. Discover connected Bible study with Bible Lens.",
  path: "/",
});

export default function Home() {
  return (
    <main id="main-content" className="discovery-home">
      <section className="discovery-hero">
        <div className="hero-copy">
          <div className="site-eyebrow">The Bible Lens Explorer</div>
          <h1>
            Read a passage.
            <br />
            <em>Discover its world.</em>
          </h1>
          <p>
            Follow the people, places and questions behind the words. Compare
            interpretations, inspect the evidence and find your way back to the
            text.
          </p>
          <div className="hero-actions">
            <Link className="site-button primary" href={studyUrl()}>
              Begin the study <span aria-hidden="true">→</span>
            </Link>
            <Link className="site-text-link" href="/books">
              Browse the Bible ↗
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="small-gold-line" />
            Scripture at the centre. Sources within reach.
          </div>
        </div>
        <div className="hero-study">
          <div className="sample-top">
            <span>Begin with a familiar story</span>
            <span>LUKE 2</span>
          </div>
          <div className="sample-reading">
            <small>THE BIRTH NARRATIVES</small>
            <h2>A birth in Bethlehem</h2>
            <p className="sample-verse">
              <sup>5</sup> to enroll himself with{" "}
              <Link href={studyUrl({ subject: "person-mary", verse: 5 })}>
                Mary
              </Link>
              , who was pledged to be married to him as wife, being pregnant.
            </p>
            <p className="sample-verse">
              <sup>6</sup> While they were there, the day had come for her to
              give birth.
            </p>
            <span className="sample-credit">
              World English Bible · Luke 2:5–6
            </span>
          </div>
          <div className="sample-follow">
            <span>Follow a detail</span>
            <Link
              href={studyUrl({
                view: "connections",
                subject: "person-mary",
                verse: 5,
              })}
            >
              ○ Mary <small>People & connections ↗</small>
            </Link>
            <Link href={studyUrl({ view: "map", subject: "place-bethlehem" })}>
              ⌖ Bethlehem <small>A place in the story ↗</small>
            </Link>
            <Link href={studyUrl({ view: "map" })}>
              ◇ When was Jesus born? <small>Dates & evidence ↗</small>
            </Link>
          </div>
        </div>
      </section>
      <section className="discovery-paths">
        <div className="section-heading">
          <div>
            <span className="site-eyebrow">One connected study</span>
            <h2>Let your curiosity lead.</h2>
          </div>
          <p>
            Three ways into the same story. Your place stays with you as you
            explore.
          </p>
        </div>
        <div className="path-cards">
          {(
            [
              {
                view: "read",
                n: "01",
                title: "Stay close to the text",
                text: "Read the account. Select a name and bring its historical context into view.",
                label: "Read the passage",
              },
              {
                view: "connections",
                n: "02",
                title: "Follow the connections",
                text: "Move between people, places and events. See what each relationship means and where it comes from.",
                label: "Explore the connections",
              },
              {
                view: "map",
                n: "03",
                title: "See the wider setting",
                text: "Locate the places, compare proposed dates and keep uncertain details in view.",
                label: "Open the map",
              },
            ] as const
          ).map((card) => (
            <Link
              key={card.view}
              className="path-card"
              href={studyUrl({
                view: card.view,
                subject:
                  card.view === "connections"
                    ? "person-mary"
                    : "event-jesus-birth",
              })}
            >
              <span>{card.n}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <strong>{card.label} →</strong>
            </Link>
          ))}
        </div>
      </section>
      <section className="study-feature">
        <div>
          <span className="site-eyebrow">
            The first collection · Study preview
          </span>
          <h2>
            Jesus’ birth.
            <br />A familiar story with open questions.
          </h2>
        </div>
        <div>
          <p>
            How do Matthew and Luke tell the story? Where do the events belong?
            And what can the evidence tell us about the date?
          </p>
          <p>
            This first collection connects ten passages with the people, places
            and historical proposals needed to explore those questions.
          </p>
          <Link className="site-button gold" href={studyUrl()}>
            Explore the birth narratives →
          </Link>
        </div>
      </section>
      <section className="library-section">
        <div className="section-heading">
          <div>
            <span className="site-eyebrow">Keep exploring</span>
            <h2>The wider Bible Lens library.</h2>
          </div>
          <p>
            Read a whole chapter, follow a theme or spend more time with the
            commentary.
          </p>
        </div>
        <div className="library-links">
          {[
            {
              href: "/books",
              title: "The Bible",
              text: "All 66 books, ready to read.",
            },
            {
              href: "/commentary",
              title: "Commentary",
              text: "Historical context, chapter by chapter.",
            },
            {
              href: "/timelines",
              title: "Timelines",
              text: "Chronologies, assumptions and evidence.",
            },
            {
              href: "/topics",
              title: "Topic studies",
              text: "Follow a question across the texts.",
            },
          ].map((item) => (
            <Link href={item.href} key={item.href}>
              <h3>
                {item.title} <span>↗</span>
              </h3>
              <p>{item.text}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="discovery-newsletter">
        <EmailCapture
          headline="Read along with us"
          subtext="New studies and fresh perspectives on ancient texts, delivered when there’s something worth sharing."
        />
      </section>
    </main>
  );
}
