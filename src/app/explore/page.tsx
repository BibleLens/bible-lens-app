import Link from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import { studyUrl } from "@/lib/explorer/state";
export const metadata = pageMetadata({
  title: "The Explorer | Bible Lens",
  description:
    "Connected Bible studies that bring passages, people, places and evidence together. Begin with the birth narratives.",
  path: "/explore",
});
export default function ExploreIndex() {
  return (
    <main id="main-content" className="discovery-home collection-page">
      <header>
        <span className="site-eyebrow">The Bible Lens Explorer</span>
        <h1>
          Pick up a thread.
          <br />
          <em>See where it leads.</em>
        </h1>
        <p>
          Each collection connects the passages with the people, places and
          questions around them. Start with the text and follow what catches
          your attention.
        </p>
      </header>
      <section className="collection-card">
        <div>
          <span className="site-eyebrow">Collection 01 · Study preview</span>
          <h2>Jesus’ birth & its historical setting</h2>
          <p>
            Matthew and Luke, the people in their accounts, and the questions
            around the date. Compare the proposals with their assumptions,
            sources and objections.
          </p>
          <div className="collection-facts">
            <span>10 passages</span>
            <span>48 subjects</span>
            <span>6 date proposals</span>
          </div>
          <Link className="site-button primary" href={studyUrl()}>
            Begin in Luke 2 →
          </Link>
        </div>
        <nav aria-label="Ways into the birth study">
          <Link href={studyUrl({ view: "read" })}>
            <span>01</span> Read the accounts <b>→</b>
          </Link>
          <Link
            href={studyUrl({ view: "connections", subject: "person-mary" })}
          >
            <span>02</span> Follow Mary’s connections <b>→</b>
          </Link>
          <Link href={studyUrl({ view: "map", subject: "place-bethlehem" })}>
            <span>03</span> Locate Bethlehem <b>→</b>
          </Link>
        </nav>
      </section>
      <aside className="collection-note">
        <h2>A small collection with room to grow.</h2>
        <p>
          The Explorer starts with one connected study. The wider Bible,
          commentary and timeline library is already available alongside it.
        </p>
        <Link className="site-text-link" href="/books">
          Browse the full Bible →
        </Link>
        <Link className="site-text-link" href="/topics">
          Explore topic studies →
        </Link>
      </aside>
    </main>
  );
}
