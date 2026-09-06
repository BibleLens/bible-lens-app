import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isTempleId, TEMPLE_IDS, TEMPLE_STUDIES } from "@/data/temples/studies";
import { TempleStudyClient } from "@/components/temples/TempleStudy";
import { pageMetadata } from "@/lib/page-metadata";
import "../../tabernacle/tabernacle.css";
import "../temples.css";
export function generateStaticParams() {
  return TEMPLE_IDS.map((temple) => ({ temple }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ temple: string }>;
}) {
  const { temple } = await params;
  if (!isTempleId(temple)) notFound();
  return {
    ...pageMetadata({
      title: `${TEMPLE_STUDIES[temple].name} in 3D | Bible Lens Explorer`,
      description: TEMPLE_STUDIES[temple].introduction,
      path: `/explore/temples/${temple}`,
    }),
    robots: { index: false, follow: true },
  };
}
export default async function TemplePage({
  params,
}: {
  params: Promise<{ temple: string }>;
}) {
  const { temple } = await params;
  if (!isTempleId(temple)) notFound();
  return (
    <Suspense
      fallback={
        <main id="main-content" className="dw-loading">
          <h1>{TEMPLE_STUDIES[temple].name}</h1>
          <p>Preparing the study…</p>
          <Link href="/explore/temples">Explore the collection</Link>
        </main>
      }
    >
      <TempleStudyClient key={temple} id={temple} />
    </Suspense>
  );
}
