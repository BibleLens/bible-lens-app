"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { TempleId } from "@/data/temples/types";

const Model = dynamic(() => import("./TempleStudy").then((module) => module.TempleStudyClient), {
  ssr: false,
  loading: () => <p role="status">Preparing the 3D study…</p>,
});

export function TempleModelDisclosure({ id }: { id: TempleId }) {
  const params = useSearchParams();
  const [open, setOpen] = useState(["part", "separation", "isolate", "cutaway", "lens"].some((key) => params.has(key)));
  return (
    <section className="tf-model">
      <div className="tf-model-heading"><div><span className="dw-eyebrow">Look a little closer</span><h2>Explore the spaces for yourself.</h2><p>Open the 3D study to examine the layout, objects and their sources.</p></div><button className="dw-primary" aria-expanded={open} aria-controls="temple-model" onClick={() => setOpen(!open)}>{open ? "Close the 3D study" : "Explore the 3D model"}</button></div>
      <div id="temple-model">{open && <Model id={id} embedded />}</div>
    </section>
  );
}
