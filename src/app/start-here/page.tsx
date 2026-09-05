import Link from "next/link";
import { READING_PATHS } from "@/lib/commentary-index";
import { pageMetadata } from "@/lib/page-metadata";
import { studyUrl } from "@/lib/explorer/state";
export const metadata = pageMetadata({
  title: "Start here | Bible Lens",
  description:
    "Begin a connected study in the Explorer or choose a reading path through the Bible Lens commentary library.",
  path: "/start-here",
});
export default function StartHere() {
  return (
    <main id="main-content" className="discovery-home collection-page">
      <header>
        <span className="site-eyebrow">New to Bible Lens?</span>
        <h1>
          Start with
          <br />
          <em>one question.</em>
        </h1>
        <p>
          You don’t need to know where the study will lead. Read a passage,
          notice a detail and follow it into the world around the text.
        </p>
      </header>
      <section className="collection-card">
        <div>
          <span className="site-eyebrow">Begin with the Explorer</span>
          <h2>A passage. A person. A place.</h2>
          <p>
            Start in Luke 2. Select Mary in the text, follow her connections and
            locate Bethlehem. Then compare what different birth-date proposals
            explain and what they have to assume.
          </p>
          <Link className="site-button primary" href={studyUrl()}>
            Begin the connected study →
          </Link>
        </div>
        <nav aria-label="Other ways to begin">
          <Link href="/books">
            <span>01</span> Choose a book of the Bible <b>→</b>
          </Link>
          <Link href="/topics">
            <span>02</span> Explore a topic <b>→</b>
          </Link>
          <Link href="/chat">
            <span>03</span> Ask a Scholar <b>→</b>
          </Link>
        </nav>
      </section>
      <section className="guided-paths">
        <div className="section-heading">
          <div>
            <span className="site-eyebrow">Go further</span>
            <h2>Follow a reading path.</h2>
          </div>
          <p>
            These paths draw on the existing commentary library and take you
            through related chapters.
          </p>
        </div>
        <div className="path-cards">
          {READING_PATHS.map((path) => (
            <Link
              className="path-card"
              key={path.id}
              href={`/bible/${path.steps[0].bookId}/${path.steps[0].chapter}`}
            >
              <span>{path.steps.length} chapters</span>
              <h3>{path.title}</h3>
              <p>{path.throughLine}</p>
              <strong>Start reading →</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
