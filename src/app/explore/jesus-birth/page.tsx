import { Suspense } from "react";
import Link from "next/link";
import { Explorer } from "@/components/explorer/Explorer";
import { pageMetadata } from "@/lib/page-metadata";
import "../explorer.css";

export const metadata = {
  ...pageMetadata({
    title: "Jesus’ birth: a connected study | Bible Lens",
    description:
      "Read the birth narratives, follow the people and places, and compare proposed dates with their sources and objections.",
    path: "/explore/jesus-birth",
  }),
  robots: { index: false, follow: true },
};

export default function JesusBirthStudy() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="explorer-loading">
          <span className="eyebrow">Bible Lens Explorer</span>
          <h1>Jesus’ birth & its historical setting</h1>
          <p>Opening the passages, connections and map…</p>
          <Link href="/bible/luke/2">Read Luke 2 in the Bible reader</Link>
        </main>
      }
    >
      <Explorer />
    </Suspense>
  );
}
