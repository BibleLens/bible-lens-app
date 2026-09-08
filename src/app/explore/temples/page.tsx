import Image from "next/image";
import films from "@/data/temples/films.json";
import Link from "next/link";
import { TEMPLE_IDS, TEMPLE_STUDIES } from "@/data/temples/studies";
import { pageMetadata } from "@/lib/page-metadata";
import "./collection.css";
export const metadata = {
  ...pageMetadata({
    title: "Three Temple films & interactive studies | Bible Lens Explorer",
    description:
      "Explore Solomon’s Temple, Herod’s Temple and Ezekiel’s vision. Watch three narrated films, read their sources and explore the 3D studies.",
    path: "/explore/temples",
  }),
};
export default function TemplesCollection() {
  return (
    <main id="main-content" className="tc-collection">
      <header>
        <Link className="site-text-link" href="/explore">
          ← The Explorer
        </Link>
        <span className="site-eyebrow">
          Sacred spaces · Three short films
        </span>
        <h1>
          Enter the house.
          <br />
          <em>Follow the story.</em>
        </h1>
        <p>
          A sanctuary described in Kings. A monumental setting for the Gospels.
          A prophet’s vision that flows into living water. Explore each on its
          own terms.
        </p>
      </header>
      <div className="tc-cards">
        {TEMPLE_IDS.map((id, i) => (
          <article key={id} className={`tc-card tc-${id}`}>
            <Link
              className="tc-poster"
              href={`/explore/temples/${id}`}
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image src={films[id].poster} alt="" width={1280} height={720} sizes="(max-width: 650px) 100vw, 33vw" />
              <span>0{i + 1} / WATCH THE FILM</span>
            </Link>
            <div className="tc-card-body">
              <span className="site-eyebrow">{TEMPLE_STUDIES[id].status}</span>
              <h2>{TEMPLE_STUDIES[id].name}</h2>
              <p>{TEMPLE_STUDIES[id].introduction}</p>
              <div className="tc-facts">
                <span>{films[id].duration} second film</span>
                <span>Optional 3D study</span>
              </div>
              <Link
                className="site-button primary"
                href={`/explore/temples/${id}`}
              >
                Explore the {id === "ezekiel" ? "vision" : "temple"} →
              </Link>
            </div>
          </article>
        ))}
      </div>
      <section className="tc-comparison" aria-labelledby="tc-compare-title">
        <div>
          <span className="site-eyebrow">Read the differences</span>
          <h2 id="tc-compare-title">
            A shared theme.
            <br />
            <em>Three distinct studies.</em>
          </h2>
          <p>
            The films offer three ways into the texts, with interactive models
            for a closer look. Ezekiel’s vision is presented on its own terms,
            rather than as the next completed building in a timeline.
          </p>
        </div>
        <div className="tc-table-wrap">
          <table>
            <caption className="sr-only">
              Sources, focus and inner-room differences across the Temple
              studies
            </caption>
            <thead>
              <tr>
                <th scope="col">Study</th>
                <th scope="col">Begin with</th>
                <th scope="col">Notice inside</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Solomon</th>
                <td>
                  1 Kings 6–8
                  <br />2 Chronicles 3–4
                </td>
                <td>The ark beneath the great cherubim</td>
              </tr>
              <tr>
                <th scope="row">Herod</th>
                <td>
                  Josephus, Jewish War 5<br />
                  Mishnah Middot & Yoma
                </td>
                <td>An inner room without the ark</td>
              </tr>
              <tr>
                <th scope="row">Ezekiel</th>
                <td>Ezekiel 40–48</td>
                <td>Measured rooms and water flowing outward</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="tc-return">
        <span className="site-eyebrow">Before the Temple</span>
        <h2>A dwelling on the move.</h2>
        <p>
          Return to the circular Tabernacle study and compare familiar objects,
          materials and questions of access.
        </p>
        <Link className="site-text-link" href="/explore/tabernacle">
          Explore the Tabernacle →
        </Link>
      </section>
    </main>
  );
}
