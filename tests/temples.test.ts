import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import path from "node:path";
import * as THREE from "three";
import { TEMPLE_IDS, TEMPLE_STUDIES } from "../src/data/temples/studies";
import {
  INITIAL_TEMPLE_VIEW,
  parseTempleView,
  templeHref,
} from "../src/lib/temples/state";
import { createTemple } from "../src/components/temples/models";
import { poseTemple, visibleMeshes } from "../src/components/temples/model-kit";
import type { TempleView } from "../src/data/temples/types";

test("every local Scripture link opens a real BSB chapter", () => {
  for (const study of Object.values(TEMPLE_STUDIES))
    for (const part of study.parts) {
      assert.ok(part.sources.length && part.connections.length && part.note);
      for (const source of [...part.sources, ...part.connections]) {
        if (!source.href.startsWith("/bible/")) continue;
        const [, , book, chapter] = source.href.split("/");
        const file = path.resolve("src/data/bibles/bsb", `${book}.json`);
        assert.ok(fs.existsSync(file), `${source.title}: missing ${book}`);
        const bible = JSON.parse(fs.readFileSync(file, "utf8"));
        assert.ok(
          bible.chapters[chapter]?.length,
          `${source.title}: missing chapter ${chapter}`,
        );
      }
    }
});
test("all shared component views round-trip without borrowing a different temple’s part", () => {
  for (const id of TEMPLE_IDS)
    for (const p of TEMPLE_STUDIES[id].parts)
      for (const lens of ["object", "sources", "connections"] as const) {
        const v: TempleView = {
          part: p.id,
          separation: 73,
          cutaway: true,
          isolated: true,
          lens,
        };
        assert.deepEqual(
          parseTempleView(
            id,
            new URL(templeHref(id, v), "http://localhost").searchParams,
          ),
          v,
        );
      }
  for (const id of ["herod", "ezekiel"] as const)
    assert.equal(
      parseTempleView(id, new URLSearchParams("part=ark&isolate=1")).part,
      null,
    );
});
test("invalid shared state is finite, bounded and recoverable", () => {
  for (const id of TEMPLE_IDS) {
    assert.deepEqual(
      parseTempleView(
        id,
        new URLSearchParams("part=unknown&separation=NaN&isolate=1&lens=bad"),
      ),
      INITIAL_TEMPLE_VIEW,
    );
    assert.equal(
      parseTempleView(id, new URLSearchParams("separation=Infinity"))
        .separation,
      0,
    );
    assert.equal(
      parseTempleView(id, new URLSearchParams("separation=101.5")).separation,
      100,
    );
    assert.equal(
      parseTempleView(id, new URLSearchParams("separation=-99")).separation,
      0,
    );
  }
});
test("all guided moments, entry points and internal study links resolve", () => {
  for (const id of TEMPLE_IDS) {
    const s = TEMPLE_STUDIES[id],
      parts = new Set(s.parts.map((p) => p.id));
    assert.equal(parts.size, s.parts.length);
    assert.equal(s.tour.length, 6);
    for (const m of s.tour) {
      assert.ok(!m.view.part || parts.has(m.view.part));
      assert.ok(!m.view.isolated || m.view.part);
    }
    for (const start of s.starts) assert.ok(parts.has(start.part));
    for (const p of s.parts)
      for (const link of [...p.connections, ...p.sources]) {
        if (!link.href.startsWith("/explore/temples/")) continue;
        const url = new URL(link.href, "http://localhost"),
          target = url.pathname.split("/").at(-1)!;
        assert.ok(TEMPLE_IDS.includes(target as typeof id));
        assert.equal(
          parseTempleView(target as typeof id, url.searchParams).part,
          url.searchParams.get("part"),
        );
      }
  }
});
test("period and vision distinctions remain explicit", () => {
  assert.ok(TEMPLE_STUDIES.solomon.parts.some((p) => p.id === "ark"));
  assert.ok(!TEMPLE_STUDIES.herod.parts.some((p) => p.id === "ark"));
  assert.ok(!TEMPLE_STUDIES.ezekiel.parts.some((p) => p.id === "ark"));
  assert.match(
    TEMPLE_STUDIES.ezekiel.reconstruction.join(" "),
    /five hundred reeds/,
  );
  assert.match(TEMPLE_STUDIES.solomon.reconstruction.join(" "), /120/);
  assert.match(TEMPLE_STUDIES.herod.reconstruction.join(" "), /50-cubit altar/);
});
test("each model has complete selectable geometry and no non-finite positions", () => {
  for (const id of TEMPLE_IDS) {
    const m = createTemple(id, false);
    try {
      assert.equal(m.assemblies.size, TEMPLE_STUDIES[id].parts.length);
      for (const p of TEMPLE_STUDIES[id].parts)
        assert.ok(m.pickables.some((o) => o.userData.part === p.id));
      for (const o of m.pickables) {
        assert.ok(m.assemblies.has(o.userData.part));
        for (const v of o.geometry.attributes.position.array)
          assert.ok(Number.isFinite(v));
      }
      const bounds = new THREE.Box3().setFromObject(m.root);
      assert.ok(!bounds.isEmpty());
      assert.ok(bounds.getSize(new THREE.Vector3()).length() < 60);
    } finally {
      m.dispose();
    }
  }
});
test("opening an interior hides obstructing surfaces; any isolated assembly stays inspectable", () => {
  for (const id of TEMPLE_IDS) {
    const m = createTemple(id, false);
    try {
      const full = visibleMeshes(m).length;
      poseTemple(m, { ...INITIAL_TEMPLE_VIEW, cutaway: true });
      assert.ok(visibleMeshes(m).length < full);
      assert.ok(!visibleMeshes(m).some((o) => o.userData.hideOnCutaway));
      for (const p of TEMPLE_STUDIES[id].parts) {
        poseTemple(m, {
          ...INITIAL_TEMPLE_VIEW,
          part: p.id,
          cutaway: true,
          isolated: true,
        });
        const visible = visibleMeshes(m);
        assert.ok(visible.length, `${id} ${p.id}`);
        assert.ok(visible.every((o) => o.userData.part === p.id));
        assert.equal(m.ground.visible, false);
      }
      poseTemple(m, INITIAL_TEMPLE_VIEW);
      assert.equal(visibleMeshes(m).length, full);
      assert.equal(m.ground.visible, true);
    } finally {
      m.dispose();
    }
  }
});
test("separation is reversible for nested reliefs, gateways and furnishings", () => {
  for (const id of TEMPLE_IDS) {
    const m = createTemple(id, false);
    try {
      const original = m.pickables.map((o) => o.matrixWorld.elements.slice());
      for (let n = 0; n < 3; n++) {
        poseTemple(m, { ...INITIAL_TEMPLE_VIEW, separation: 100 });
        assert.ok(
          m.pickables.some((o, i) =>
            o.matrixWorld.elements.some(
              (v, j) => Math.abs(v - original[i][j]) > 0.001,
            ),
          ),
        );
        poseTemple(m, INITIAL_TEMPLE_VIEW);
      }
      m.pickables.forEach((o, i) =>
        assert.deepEqual(o.matrixWorld.elements, original[i]),
      );
    } finally {
      m.dispose();
    }
  }
});
test("principal source footprints are present at a uniform scale inside each model", () => {
  const cases = [
    { id: "solomon" as const, part: "altar", width: 20, depth: 20, height: 10 },
    {
      id: "herod" as const,
      part: "court",
      width: 135,
      depth: 187,
      height: 9.5,
    },
    { id: "herod" as const, part: "women", width: 135, depth: 135, height: 2 },
    {
      id: "ezekiel" as const,
      part: "enclosure",
      width: 500,
      depth: 500,
      height: 1,
    },
    { id: "ezekiel" as const, part: "table", width: 2, depth: 2, height: 3 },
  ];
  for (const c of cases) {
    const m = createTemple(c.id, false);
    try {
      const o = m.pickables.find(
        (o) =>
          o.userData.part === c.part &&
          o.geometry instanceof THREE.BoxGeometry &&
          o.geometry.parameters.width === c.width &&
          o.geometry.parameters.depth === c.depth &&
          o.geometry.parameters.height === c.height,
      );
      assert.ok(o, `${c.id}: ${c.part} footprint`);
      const actual = new THREE.Box3()
        .setFromObject(o)
        .getSize(new THREE.Vector3());
      assert.ok(Math.abs(actual.x - c.width * m.scale) < 1e-6);
      assert.ok(Math.abs(actual.z - c.depth * m.scale) < 1e-6);
    } finally {
      m.dispose();
    }
  }
});
