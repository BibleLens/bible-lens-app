import { Suspense } from "react";
import Link from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import { TabernacleStudy } from "@/components/tabernacle/TabernacleStudy";
import "./tabernacle.css";
export const metadata = {
  ...pageMetadata({
    title: "Inside the Dwelling | Bible Lens Explorer",
    description:
      "Take apart a circular Tabernacle study. Explore its materials, read the passages, and follow the imagery.",
    path: "/explore/tabernacle",
  }),
  robots: { index: false, follow: true },
};
export default function TabernaclePage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="dw-loading">
          <h1>Inside the Dwelling</h1>
          <p>Preparing the study…</p>
          <Link href="/bible/exodus/26">Read Exodus 26</Link>
        </main>
      }
    >
      <TabernacleStudy />
    </Suspense>
  );
}
