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
      <section className="collection-card collection-sacred-spaces">
        <div>
          <span className="site-eyebrow">
            Collection 02 · Interactive 3D study
          </span>
          <h2>Inside the Dwelling</h2>
          <p>
            Take apart a circular Tabernacle study. Lift the coverings, inspect
            the furnishings and follow their passages and imagery. An
            illustrative model inspired by Andrew Hoy’s reconstruction.
          </p>
          <div className="collection-facts">
            <span>11 assemblies</span>
            <span>Connected passages</span>
            <span>75-second reveal</span>
          </div>
          <Link className="site-button primary" href="/explore/tabernacle">
            Explore the dwelling →
          </Link>
        </div>
        <nav aria-label="Ways into the Tabernacle study">
          <Link href="/explore/tabernacle?separation=65">
            <span>01</span> Open the structure <b>→</b>
          </Link>
          <Link href="/explore/tabernacle?part=veil&separation=80&isolate=1&lens=passage">
            <span>02</span> Begin with the veil <b>→</b>
          </Link>
          <Link href="/explore/tabernacle?part=lampstand&separation=80&isolate=1&lens=connections">
            <span>03</span> Follow the lampstand’s imagery <b>→</b>
          </Link>
        </nav>
      </section>
      <section className="collection-card collection-sacred-spaces">
        <div>
          <span className="site-eyebrow">
            Collection 03 · Three films & 3D studies
          </span>
          <h2>Enter the Temple</h2>
          <p>
            Open Solomon’s sanctuary, explore the courts of Herod’s Temple, and
            follow Ezekiel’s vision into living water. Begin with a short film,
            then look closer through the sources and interactive models.
          </p>
          <div className="collection-facts">
            <span>3 narrated films</span>
            <span>Interactive models</span>
            <span>Connected sources</span>
          </div>
          <Link className="site-button primary" href="/explore/temples">
            Explore the Temple collection →
          </Link>
        </div>
        <nav aria-label="Ways into the Temple studies">
          <Link href="/explore/temples/solomon">
            <span>01</span> Solomon’s house and its imagery <b>→</b>
          </Link>
          <Link href="/explore/temples/herod">
            <span>02</span> Herod’s courts and encounters <b>→</b>
          </Link>
          <Link href="/explore/temples/ezekiel">
            <span>03</span> Ezekiel’s vision and river <b>→</b>
          </Link>
        </nav>
      </section>
      <aside className="collection-note">
        <h2>A small collection with room to grow.</h2>
        <p>
          The Explorer brings connected reading and spatial studies together.
          The wider Bible, commentary and timeline library is already available
          alongside it.
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
