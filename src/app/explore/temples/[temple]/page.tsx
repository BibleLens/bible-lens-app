import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isTempleId, TEMPLE_IDS, TEMPLE_STUDIES } from "@/data/temples/studies";
import films from "@/data/temples/films.json";
import { TempleFilm } from "@/components/temples/TempleFilm";
import { TempleModelDisclosure } from "@/components/temples/TempleModelDisclosure";
import { pageMetadata } from "@/lib/page-metadata";
import "../../tabernacle/tabernacle.css";
import "../temples.css";
import "../films.css";

export function generateStaticParams() {
  return TEMPLE_IDS.map((temple) => ({ temple }));
}
export async function generateMetadata({ params }: { params: Promise<{ temple: string }> }) {
  const { temple } = await params;
  if (!isTempleId(temple)) notFound();
  const metadata = pageMetadata({
    title: `${TEMPLE_STUDIES[temple].name}: film & 3D study | Bible Lens`,
    description: TEMPLE_STUDIES[temple].introduction,
    path: `/explore/temples/${temple}`,
  });
  return { ...metadata,
    openGraph: { ...metadata.openGraph, images: [{ url: films[temple].poster, width: 1280, height: 720, alt: films[temple].title }] },
    twitter: { ...metadata.twitter, images: [films[temple].poster] },
  };
}
export default async function TemplePage({ params }: { params: Promise<{ temple: string }> }) {
  const { temple } = await params;
  if (!isTempleId(temple)) notFound();
  const study = TEMPLE_STUDIES[temple];
  return (
    <main id="main-content" className="dw-study tp-study tf-page">
      <nav className="tp-collection-nav" aria-label="Temple collection">
        {TEMPLE_IDS.map((id, index) => <Link key={id} href={`/explore/temples/${id}`} aria-current={id === temple ? "page" : undefined}><small>0{index + 1}</small>{TEMPLE_STUDIES[id].name}</Link>)}
        <Link className="tp-compare-link" href="/explore/temples">All three studies ↗</Link>
      </nav>
      <header className="tf-heading">
        <span className="dw-eyebrow">{study.status}</span>
        <h1>{study.name}</h1>
        <p>{study.introduction}</p>
      </header>
      <TempleFilm key={temple} id={temple} />
      <Suspense fallback={<p className="tf-note">The interactive study will be available once the page loads.</p>}><TempleModelDisclosure key={temple} id={temple} /></Suspense>
    </main>
  );
}
