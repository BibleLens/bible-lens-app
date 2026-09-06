import Link from "next/link";
import { TEMPLE_IDS, TEMPLE_STUDIES } from "@/data/temples/studies";
import type { TempleId } from "@/data/temples/types";
import { pageMetadata } from "@/lib/page-metadata";
import "./collection.css";
export const metadata = {
  ...pageMetadata({
    title: "Three Temple studies in 3D | Bible Lens Explorer",
    description:
      "Explore Solomon’s Temple, Herod’s Temple and Ezekiel’s vision. Open the structures, read their sources and follow three guided journeys.",
    path: "/explore/temples",
  }),
  robots: { index: false, follow: true },
};
function Plan({ id }: { id: TempleId }) {
  return (
    <svg
      viewBox="0 0 340 210"
      aria-hidden="true"
      className={`tc-plan tc-plan-${id}`}
      fill="none"
    >
      {id === "solomon" ? (
        <>
          <path d="M54 181V29h232v152h-94m-44 0H54" />
          <path d="M136 50h68v87h-68zM143 57h54v27h-54zM143 84h54v46h-54zM125 48v90m90-90v90M136 140v12h68v-12" />
          <circle cx="143" cy="156" r="3" />
          <circle cx="196" cy="156" r="3" />
          <path d="M155 162h30v19h-30z" />
          <circle cx="240" cy="151" r="12" />
          <path d="m233 166 4 6m7-6 4 6M156 65l7 7 7-7m0 0 7 7 7-7" />
        </>
      ) : id === "herod" ? (
        <>
          <path d="M66 18h208v174H66zM91 27h158v148H91zM100 34h140v82H100zM100 116h140v57H100zM152 34h36v48h-36zM138 80h64v12h-64zM160 99h20v12h-20zM146 122q24 20 48 0m-51 3q27 24 54 0m-56 3q29 29 58 0M108 143h19v22h-19zM213 143h19v22h-19z" />
          {Array.from({ length: 15 }, (_, i) => (
            <path key={i} d={`M75 ${28 + i * 10}h5m180 0h5`} />
          ))}
        </>
      ) : (
        <>
          <path d="M78 13h184v172H78zM145 66h50v54h-50zM157 46h26v27h-26zM163 80h14v18h-14zM158 15h24v24h-24zM80 85h23v20H80zM239 85h21v20h-21zM107 84h26v22h-26zM207 84h26v22h-26zM158 124h24v25h-24zM103 28h30v43h-30zM207 28h30v43h-30z" />
          <path
            className="tc-water"
            d="M185 68c16 13 10 38 13 58s1 37 8 58 15 21 19 22m-32-136c11 19 8 36 12 56s0 35 8 57 21 16 24 23"
          />
        </>
      )}
      <path className="tc-plan-axis" d="M170 5v193" strokeDasharray="3 6" />
    </svg>
  );
}
export default function TemplesCollection() {
  return (
    <main id="main-content" className="tc-collection">
      <header>
        <Link className="site-text-link" href="/explore">
          ← The Explorer
        </Link>
        <span className="site-eyebrow">
          Sacred spaces · Three interactive studies
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
              className="tc-drawing"
              href={`/explore/temples/${id}`}
              tabIndex={-1}
              aria-hidden="true"
            >
              <Plan id={id} />
              <span>0{i + 1} / SPATIAL STUDY</span>
            </Link>
            <div className="tc-card-body">
              <span className="site-eyebrow">{TEMPLE_STUDIES[id].status}</span>
              <h2>{TEMPLE_STUDIES[id].name}</h2>
              <p>{TEMPLE_STUDIES[id].introduction}</p>
              <div className="tc-facts">
                <span>{TEMPLE_STUDIES[id].parts.length} assemblies</span>
                <span>90-second journey</span>
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
            The drawings introduce each layout. They aren’t at a common scale,
            and Ezekiel’s vision isn’t presented as the next completed building
            in a timeline.
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
