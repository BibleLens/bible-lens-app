import * as THREE from "three";
import { TEMPLE_STUDIES } from "@/data/temples/studies";
import type { TempleId } from "@/data/temples/types";
import { COLORS as C, makeModelKit, poseTemple } from "./model-kit";

function solomon(textured: boolean) {
  const k = makeModelKit(TEMPLE_STUDIES.solomon, 0.14, textured);
  const {
    mat,
    box,
    wall,
    cylinder,
    ball,
    ring,
    bowl,
    line,
    palm,
    lamp,
    table,
    cherub,
    offset,
  } = k;
  k.groundPlane(120, 150);
  const stone = mat("court", C.stone, 0, "stone"),
    cedar = mat("court", C.cedar, 0, "wood");
  box("court", [110, 0.7, 140], [0, -0.4, 0], stone);
  wall("court", 2, 3, 140, -54, 0, 0, stone);
  wall("court", 2, 3, 140, 54, 0, 0, stone);
  wall("court", 110, 3, 2, 0, -69, 0, stone);
  for (const s of [-1, 1]) wall("court", 43, 3, 2, s * 33.5, 69, 0, stone);
  box("court", [1.8, 0.45, 140], [-54, 3.2, 0], cedar);
  box("court", [1.8, 0.45, 140], [54, 3.2, 0], cedar);
  box("court", [110, 0.45, 1.8], [0, 3.2, -69], cedar);
  for (let z = -65; z < 65; z += 10)
    box("court", [106, 0.025, 0.06], [0, 0.01, z], cedar);
  for (let x = -50; x <= 50; x += 10)
    box("court", [0.06, 0.025, 136], [x, 0.01, 0], cedar);

  const shell = mat("sanctuary", C.stone, 0, "stone"),
    gold = mat("sanctuary", C.gold, 0.65),
    wood = mat("sanctuary", C.cedar, 0, "wood");
  box("sanctuary", [24, 1, 64], [0, 0.5, -15], shell);
  box("sanctuary", [20, 0.1, 40], [0, 1.07, -5], gold);
  box("sanctuary", [20, 0.1, 20], [0, 1.07, -35], gold);
  wall("sanctuary", 2, 30, 64, -11, -15, 1, shell);
  wall("sanctuary", 2, 30, 64, 11, -15, 1, shell, true);
  wall("sanctuary", 24, 30, 2, 0, -46, 1, shell);
  for (const s of [-1, 1]) {
    box("sanctuary", [0.13, 29.8, 60], [s * 9.95, 16, -15], gold, s === 1);
    wall("sanctuary", 7, 30, 2, s * 7.5, 16, 1, shell, true);
    for (let tier = 0; tier < 3; tier++) {
      const width = 5 + tier;
      box(
        "sanctuary",
        [width, 5, 62],
        [s * (12 + width / 2), 3.5 + tier * 5, -15],
        shell,
        s === 1,
      );
      box(
        "sanctuary",
        [width + 0.3, 0.3, 62],
        [s * (12 + width / 2), 6.1 + tier * 5, -15],
        wood,
        s === 1,
      );
      for (let z = -40; z < 15; z += 8)
        box(
          "sanctuary",
          [0.08, 2, 1.3],
          [s * (12 + width + 0.02), 3.8 + tier * 5, z],
          wood,
          s === 1,
        );
    }
  }
  for (let tier = 0; tier < 3; tier++)
    box(
      "sanctuary",
      [35 + tier * 2, 5, 5 + tier],
      [0, 3.5 + tier * 5, -49.5 - tier * 0.5],
      shell,
    );
  // Relief panels face the room; the facing wall opens with the cutaway.
  for (let z = -40; z < 15; z += 7) {
    for (const s of [-1, 1]) {
      const relief = new THREE.Group();
      const before = k.pickables.length;
      palm("sanctuary", 0, 6, 0, 8, gold, true);
      for (let n = before; n < k.pickables.length; n++) {
        const o = k.pickables[n];
        relief.add(o);
        o.userData.hideOnCutaway = s === 1;
      }
      relief.rotation.y = s === 1 ? -Math.PI / 2 : Math.PI / 2;
      relief.position.set(s * 9.75 * k.scale, 0, z * k.scale);
      k.assemblies.get("sanctuary")!.group.add(relief);
    }
  }
  for (let z = -35; z <= 5; z += 10) {
    box("sanctuary", [0.14, 2.6, 1.7], [-12.04, 25, z], wood);
    box("sanctuary", [0.14, 2.6, 1.7], [12.04, 25, z], wood, true);
  }
  const roof = mat("roof", C.cedar, 0, "wood"),
    roofTrim = mat("roof", "#b89661", 0.15);
  box("roof", [25, 1, 65], [0, 31.7, -15], roof, true);
  for (let z = -45; z <= 15; z += 5)
    box("roof", [24, 1.2, 0.85], [0, 30.7, z], roofTrim, true);
  for (const s of [-1, 1])
    box("roof", [0.6, 1.5, 65], [s * 12.2, 32.7, -15], roofTrim, true);
  box("roof", [20, 0.5, 20], [0, 21.3, -35], roof, true);
  offset("roof", 0, 28, -8);

  const porchStone = mat("porch", C.stone, 0, "stone"),
    porchGold = mat("porch", C.gold, 0.6);
  box("porch", [24, 1, 12], [0, 0.5, 22], porchStone);
  for (const s of [-1, 1])
    wall("porch", 2, 20, 10, s * 11, 21, 1, porchStone, s === 1);
  box("porch", [24, 1, 12], [0, 21.5, 22], porchGold, true);
  k.stairs("porch", 21, 4, 1.2, 0.25, 0, 30, 0, porchStone, Math.PI);
  offset("porch", 0, 0, 20);
  const bronze = mat("pillars", C.bronze, 0.72),
    bronzeLight = mat("pillars", "#c19255", 0.7);
  for (const s of [-1, 1]) {
    const x = s * 7.3,
      z = 32,
      r = 12 / (Math.PI * 2);
    cylinder("pillars", r, 18, [x, 9, z], bronze);
    cylinder("pillars", r * 1.15, 2, [x, 19, z], bronzeLight, r * 0.75);
    bowl("pillars", 2.65, 3, [x, 20, z], bronzeLight);
    for (const y of [18.3, 19.5]) {
      ring("pillars", 2.25, 0.1, [x, y, z], bronzeLight);
      for (let i = 0; i < 20; i++) {
        const a = (i * Math.PI) / 10;
        ball(
          "pillars",
          0.22,
          [x + Math.cos(a) * 2.25, y, z + Math.sin(a) * 2.25],
          bronze,
        );
      }
    }
  }
  offset("pillars", 22, 0, 18);

  const seaBronze = mat("sea", C.bronze, 0.65),
    water = mat("sea", C.water, 0.3);
  bowl("sea", 5, 5, [27, 2.8, 43], seaBronze);
  ring("sea", 5, 0.16, [27, 7.8, 43], seaBronze);
  cylinder("sea", 4.65, 0.035, [27, 7.3, 43], water);
  for (let i = 0; i < 12; i++) {
    const side = Math.floor(i / 3),
      a = (side * Math.PI) / 2,
      across = ((i % 3) - 1) * 1.35;
    const x = 27 + Math.sin(a) * 2.8 + Math.cos(a) * across,
      z = 43 + Math.cos(a) * 2.8 - Math.sin(a) * across;
    const body = box("sea", [0.9, 1.35, 2.2], [x, 1.75, z], seaBronze);
    body.rotation.y = a;
    ball(
      "sea",
      0.56,
      [x + Math.sin(a) * 1.25, 2.2, z + Math.cos(a) * 1.25],
      seaBronze,
    );
    for (const dx of [-0.28, 0.28])
      for (const dz of [-0.75, 0.75])
        box("sea", [0.22, 1.1, 0.22], [x + dx, 0.55, z + dz], seaBronze);
    for (const s of [-1, 1])
      line(
        "sea",
        [
          [
            x + Math.sin(a) * 1.2 + Math.cos(a) * s * 0.35,
            2.5,
            z + Math.cos(a) * 1.2 - Math.sin(a) * s * 0.35,
          ],
          [
            x + Math.sin(a) * 1.15 + Math.cos(a) * s * 0.55,
            2.8,
            z + Math.cos(a) * 1.15 - Math.sin(a) * s * 0.55,
          ],
        ],
        0.065,
        seaBronze,
      );
  }
  offset("sea", 23, 2, 13);
  const basinBronze = mat("basins", C.bronze, 0.6),
    basinWater = mat("basins", C.water, 0.2);
  for (const s of [-1, 1])
    for (let i = 0; i < 5; i++) {
      const x = s * 29,
        z = -34 + i * 12;
      box("basins", [4, 3, 4], [x, 2.25, z], basinBronze);
      bowl("basins", 2, 1.7, [x, 3.75, z], basinBronze);
      cylinder("basins", 1.8, 0.03, [x, 5.25, z], basinWater);
      for (const dx of [-2.1, 2.1])
        for (const dz of [-1.25, 1.25]) {
          const w = cylinder(
            "basins",
            0.75,
            0.16,
            [x + dx, 0.75, z + dz],
            basinBronze,
            0.75,
            12,
          );
          w.rotation.z = Math.PI / 2;
        }
    }
  offset("basins", -20, 2, 0);
  const altar = mat("altar", C.bronze, 0.6);
  box("altar", [20, 10, 20], [0, 5, 49], altar);
  box("altar", [21, 0.3, 21], [0, 10.1, 49], altar);
  for (const x of [-9, 9])
    for (const z of [40, 58])
      cylinder("altar", 0.55, 1.4, [x, 10.9, z], altar, 0.28, 8);
  offset("altar", 0, 0, 25);

  const fg = mat("furnishings", C.gold, 0.76);
  for (const s of [-1, 1])
    for (let i = 0; i < 5; i++) {
      lamp("furnishings", s * 6.8, 1.2, -20 + i * 7, 3.6, fg);
      table("furnishings", s * 3.8, 1.2, -20 + i * 7, fg);
    }
  box("furnishings", [1, 2, 1], [0, 2.2, -20], fg);
  offset("furnishings", -25, 3, 5);
  const cloth = mat("veil", C.veil, 0, "cloth"),
    door = mat("veil", C.gold, 0.5);
  box("veil", [7, 18, 0.15], [0, 10, -24.8], cloth);
  for (const s of [-1, 1]) {
    const d = box("veil", [3.5, 18, 0.3], [s * 5.1, 10, -25.3], door);
    d.rotation.y = s * 0.4;
  }
  offset("veil", 0, 2, 24);
  const cg = mat("cherubim", C.gold, 0.74);
  for (const s of [-1, 1]) cherub("cherubim", s * 5, 1.2, -35, 10, 10, cg);
  offset("cherubim", 0, 5, -20);
  const ag = mat("ark", C.gold, 0.72);
  box("ark", [2.5, 1.5, 1.5], [0, 1.95, -32.5], ag);
  box("ark", [2.65, 0.12, 1.65], [0, 2.76, -32.5], ag);
  for (const x of [-1, 1]) {
    const p = cylinder("ark", 0.065, 4.5, [x, 2.1, -32.5], ag);
    p.rotation.x = Math.PI / 2;
  }
  for (const s of [-1, 1]) cherub("ark", s * 0.75, 2.83, -32.5, 0.65, 1, ag);
  offset("ark", 0, 0, -26);
  return k;
}

function herod(textured: boolean) {
  const k = makeModelKit(TEMPLE_STUDIES.herod, 0.057, textured);
  const { mat, box, wall, column, cylinder, lamp, table, offset } = k;
  k.groundPlane(245, 410, 63);
  const port = mat("porticos", C.white, 0, "stone"),
    timber = mat("porticos", C.cedar, 0, "wood");
  box("porticos", [235, 1, 400], [0, -0.6, 63], port);
  for (const x of [-113, 113]) {
    wall("porticos", 2, 23, 392, x, 63, 0, port);
    for (let z = -125; z < 250; z += 13)
      column("porticos", x + (x < 0 ? 12 : -12), z, 22, 1.2, port);
    box("porticos", [22, 1.2, 400], [x + (x < 0 ? 8 : -8), 23, 63], timber);
  }
  for (const z of [-135, 262]) {
    for (let x = -95; x <= 95; x += 13) column("porticos", x, z, 22, 1.2, port);
    box("porticos", [216, 1.2, 20], [0, 23, z], timber);
  }
  offset("porticos", 0, 0, -20);
  const barrier = mat("soreg", "#c3b9a3", 0, "stone");
  for (const x of [-85, 85]) {
    for (let z = -110; z <= 241; z += 6)
      box("soreg", [0.7, 3, 0.7], [x, 1.5, z], barrier);
    box("soreg", [1, 0.5, 355], [x, 2.8, 66], barrier);
  }
  for (const z of [-111, 244])
    for (const s of [-1, 1]) {
      box("soreg", [73, 0.5, 1], [s * 48, 2.8, z], barrier);
      for (let x = 13; x <= 84; x += 6)
        box("soreg", [0.7, 3, 0.7], [s * x, 1.5, z], barrier);
    }
  for (const z of [-70, 40, 180])
    for (const x of [-85, 85]) box("soreg", [1.6, 2.2, 3], [x, 4, z], barrier);
  offset("soreg", -18, 0, 0);
  const womenStone = mat("women", C.stone, 0, "stone"),
    womenTrim = mat("women", "#c3ae80", 0.12);
  box("women", [135, 2, 135], [0, 1, 161], womenStone);
  for (const s of [-1, 1])
    wall("women", 2, 16, 135, s * 68.5, 161, 2, womenStone);
  for (const s of [-1, 1])
    wall("women", 57, 16, 2, s * 40.5, 229.5, 2, womenStone);
  for (const s of [-1, 1])
    for (const t of [-1, 1]) {
      const x = s * 47.5,
        z = 161 + t * 47.5;
      for (const dx of [-20, 20])
        wall("women", 1.5, 9, 40, x + dx, z, 2, womenStone);
      for (const dz of [-20, 20])
        wall("women", 40, 9, 1.5, x, z + dz, 2, womenStone);
    }
  for (const s of [-1, 1]) {
    box("women", [5, 1, 132], [s * 64.5, 12, 161], womenTrim);
    for (let z = 105; z <= 215; z += 14)
      column("women", s * 62, z, 10, 0.65, womenStone, 2);
  }
  for (let x = -60; x <= 60; x += 12)
    box("women", [0.1, 0.03, 132], [x, 2.02, 161], womenTrim);
  for (let z = 100; z <= 220; z += 12)
    box("women", [132, 0.03, 0.1], [0, 2.02, z], womenTrim);
  offset("women", 0, 0, 40);
  const stepStone = mat("steps", C.white, 0, "stone"),
    gateGold = mat("steps", "#b59459", 0.7);
  for (let i = 0; i < 15; i++) {
    const radius = 24 - i * 0.65,
      h = (i + 1) * 0.5;
    const step = k.mesh(
      "steps",
      new THREE.CylinderGeometry(
        radius,
        radius,
        h,
        40,
        1,
        false,
        -Math.PI / 2,
        Math.PI,
      ),
      stepStone,
      0,
      2 + h / 2,
      94.5,
    );
    step.name = `ascent-${i + 1}`;
  }
  for (const s of [-1, 1])
    wall("steps", 10, 33, 6, s * 13, 93.5, 9.5, stepStone);
  box("steps", [36, 5, 6], [0, 40, 93.5], stepStone);
  for (const s of [-1, 1]) {
    const d = box("steps", [7.8, 25, 0.35], [s * 7.5, 22, 91], gateGold);
    d.rotation.y = s * 0.65;
  }
  offset("steps", 20, 0, 22);
  const court = mat("court", C.stone, 0, "stone"),
    courtLine = mat("court", "#aa976e", 0.15);
  const y = 9.5;
  box("court", [135, y, 187], [0, y / 2, 0], court);
  for (const s of [-1, 1]) wall("court", 2, 20, 187, s * 68.5, 0, y, court);
  wall("court", 135, 20, 2, 0, -94.5, y, court);
  for (const s of [-1, 1]) wall("court", 57, 20, 2, s * 40.5, 94.5, y, court);
  for (const z of [82.5, 71.5])
    box("court", [135, 0.12, 0.35], [0, y + 0.06, z], courtLine);
  for (let z = -86; z < 88; z += 12)
    box("court", [133, 0.025, 0.12], [0, y + 0.02, z], courtLine);
  // Low distinctions in the court mark allocations without inventing tall partitions.
  for (const s of [-1, 1])
    for (let z = -75; z < 75; z += 15)
      column("court", s * 62, z, 18, 0.85, court, y);
  const altar = mat("altar", "#d3c7b3", 0, "stone"),
    red = mat("altar", "#9e6650");
  box("altar", [32, 1, 32], [0, y + 0.5, 55.5], altar);
  box("altar", [30, 5, 30], [0, y + 3.5, 55.5], altar);
  box("altar", [28, 3, 28], [0, y + 7.5, 55.5], altar);
  for (const x of [-13, 13])
    for (const z of [42.5, 68.5])
      box("altar", [1, 1, 1], [x, y + 9.5, z], altar);
  box("altar", [30.05, 0.16, 30.05], [0, y + 5, 55.5], red);
  // Triangular prism for the south-side ramp; positive X is south.
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(32, 0);
  shape.lineTo(0, 9);
  shape.closePath();
  k.mesh(
    "altar",
    new THREE.ExtrudeGeometry(shape, { depth: 16, bevelEnabled: false }),
    altar,
    14,
    y,
    47.5,
  );
  offset("altar", 25, 0, 15);
  const shell = mat("sanctuary", C.white, 0, "stone"),
    gold = mat("sanctuary", C.gold, 0.7);
  const base = y + 6;
  box("sanctuary", [70, 6, 100], [0, y + 3, -32.5], shell);
  box("sanctuary", [100, 6, 16], [0, y + 3, 9.5], shell);
  // Middot 4:7: porch wall 5, porch 11, wall 6, hall 40, veil-space 1, inner room 20, wall 6, cell 6, wall 5.
  for (const s of [-1, 1]) {
    wall("sanctuary", 6, 40, 61, s * 13, -35, base, shell, s === 1);
    box(
      "sanctuary",
      [0.12, 39.8, 60],
      [s * 9.92, base + 20, -35],
      gold,
      s === 1,
    );
    wall("sanctuary", 19, 40, 84, s * 25.5, -40.5, base, shell, s === 1);
    for (let tier = 0; tier < 3; tier++)
      for (let z = -73; z < -3; z += 10)
        box(
          "sanctuary",
          [0.1, 4, 2.2],
          [s * 35.04, base + 5 + tier * 11, z],
          gold,
          s === 1,
        );
    wall("sanctuary", 13, 40, 6, s * 11.5, -1.5, base, shell, true);
    wall("sanctuary", 39, 94, 5, s * 30.5, 15, base, shell, s === 1);
  }
  wall("sanctuary", 32, 40, 6, 0, -68.5, base, shell);
  box("sanctuary", [20, 0.15, 40], [0, base + 0.08, -24.5], gold);
  box("sanctuary", [70, 6, 5], [0, y + 97, 15], gold, true);
  box("sanctuary", [22, 12, 5], [0, base + 76, 15], gold, true);
  for (const x of [-12, 12])
    box("sanctuary", [2, 64, 1], [x, base + 32, 17.65], gold, true);
  k.stairs("sanctuary", 45, 12, 0.7, 0.5, 0, 22, y, shell, Math.PI);
  offset("sanctuary", 0, 0, -10);
  const top = mat("roof", C.white, 0, "stone"),
    topGold = mat("roof", C.gold, 0.65);
  box("roof", [70, 44, 84], [0, y + 69, -40.5], top, true);
  box("roof", [100, 3, 16], [0, y + 98.5, 9.5], top, true);
  box("roof", [72, 1.5, 84], [0, y + 93.75, -40.5], topGold, true);
  for (const x of [-34, 34])
    for (let z = -80; z < 1; z += 8)
      k.mesh(
        "roof",
        new THREE.ConeGeometry(0.45, 3, 6),
        topGold,
        x,
        y + 97,
        z,
        true,
      );
  offset("roof", 0, 55, -8);
  const furniture = mat("furnishings", C.gold, 0.75);
  lamp("furnishings", 5.8, base + 0.2, -25, 4.5, furniture);
  table("furnishings", -5.8, base + 0.2, -25, furniture);
  box("furnishings", [1.8, 3.2, 1.8], [0, base + 1.6, -40], furniture);
  offset("furnishings", -35, 4, 20);
  const veil = mat("veil", C.veil, 0, "cloth"),
    trim = mat("veil", C.gold, 0.55);
  box("veil", [20, 36, 0.2], [0, base + 18, -45], veil);
  for (const x of [-9.6, 9.6])
    box("veil", [0.18, 36, 0.24], [x, base + 18, -44.85], trim);
  offset("veil", 0, 5, 32);
  const inner = mat("inner", "#d2b971", 0.5),
    rock = mat("inner", "#bcad94", 0, "stone");
  box("inner", [20, 0.15, 20], [0, base + 0.08, -55.5], inner);
  cylinder("inner", 2.4, 0.24, [0, base + 0.27, -55.5], rock, 2, 7);
  offset("inner", 0, 0, -30);
  return k;
}

function ezekiel(textured: boolean) {
  const k = makeModelKit(TEMPLE_STUDIES.ezekiel, 0.041, textured);
  const { mat, box, wall, column, cylinder, ball, line, palm, offset } = k;
  k.groundPlane(525, 705, 85);
  const stone = mat("enclosure", "#c9cabb", 0, "stone"),
    paving = mat("enclosure", "#c1c3b0", 0, "stone");
  box("enclosure", [500, 1, 500], [0, -0.5, 0], paving);
  wall("enclosure", 500, 6, 6, 0, -247, 0, stone);
  for (const s of [-1, 1]) {
    for (const t of [-1, 1])
      wall("enclosure", 6, 6, 237, s * 247, t * 131.5, 0, stone);
    wall("enclosure", 237, 6, 6, s * 131.5, 247, 0, stone);
  }
  for (let n = -240; n <= 240; n += 20) {
    box("enclosure", [0.09, 0.025, 490], [n, 0.02, 0], stone);
    box("enclosure", [490, 0.025, 0.09], [0, 0.02, n], stone);
  }
  const gateStone = mat("gates", "#d0ceba", 0, "stone"),
    gateTrim = mat("gates", "#a69872", 0.12);
  function gate(x: number, z: number, turn: number, inner: boolean) {
    const before = k.pickables.length,
      group = new THREE.Group();
    box("gates", [25, 2, 50], [0, 1, 0], gateStone);
    for (const s of [-1, 1]) {
      wall("gates", 2, 20, 50, s * 11.5, 0, 2, gateStone);
      for (let n = 0; n < 3; n++) {
        const cz = -14 + n * 11;
        for (const dz of [-3.5, 3.5])
          wall("gates", 6, 12, 1, s * 8, cz + dz, 2, gateStone);
      }
      column("gates", s * 8, 23, 23, 1.3, gateTrim, 2);
    }
    box("gates", [25, 1, 50], [0, 23, 0], gateStone, true);
    k.stairs("gates", 16, inner ? 8 : 7, 1, 0.3, 0, 29, 0, gateStone, Math.PI);
    for (let n = before; n < k.pickables.length; n++) group.add(k.pickables[n]);
    group.position.set(x * k.scale, 0, z * k.scale);
    group.rotation.y = turn;
    k.assemblies.get("gates")!.group.add(group);
  }
  gate(0, 225, 0, false);
  gate(-225, 0, -Math.PI / 2, false);
  gate(225, 0, Math.PI / 2, false);
  // One hundred cubits of open outer court separate the paired gateways.
  gate(0, 75, Math.PI, true);
  gate(-75, 0, Math.PI / 2, true);
  gate(75, 0, -Math.PI / 2, true);
  offset("gates", 0, 10, 12);
  const court = mat("court", "#c7c4ac", 0, "stone"),
    courtBand = mat("court", "#9e997f", 0.1);
  box("court", [100, 2.4, 100], [0, 1.2, 0], court);
  for (const s of [-1, 1])
    for (const t of [-1, 1]) {
      wall("court", 2, 6, 36, s * 51, t * 32, 2.4, court);
      wall("court", 36, 6, 2, s * 32, 51, 2.4, court);
    }
  for (let n = -40; n <= 40; n += 10) {
    box("court", [0.1, 0.025, 98], [n, 2.42, 0], courtBand);
    box("court", [98, 0.025, 0.1], [0, 2.42, n], courtBand);
  }
  const chamber = mat("chambers", "#b9bca8", 0, "stone"),
    chamberWood = mat("chambers", "#858974", 0, "wood");
  for (const s of [-1, 1]) {
    for (let tier = 0; tier < 3; tier++) {
      box(
        "chambers",
        [50 - tier * 3, 8, 100],
        [s * (76 + tier * 1.5), 4 + tier * 8, -101],
        chamber,
      );
      box(
        "chambers",
        [51 - tier * 3, 0.5, 101],
        [s * (76 + tier * 1.5), 8.3 + tier * 8, -101],
        chamberWood,
        true,
      );
      for (let z = -144; z <= -55; z += 13)
        box(
          "chambers",
          [0.12, 3, 2],
          [s * (101 + 0.07), 4 + tier * 8, z],
          chamberWood,
        );
    }
  }
  box("chambers", [80, 20, 100], [0, 10, -198], chamber);
  for (const s of [-1, 1])
    for (let n = 0; n < 10; n++) {
      const z = -190 + n * 40;
      box("chambers", [14, 9, 16], [s * 230, 4.5, z], chamber);
      box("chambers", [0.1, 5, 4], [s * 222.94, 2.5, z], chamberWood);
    }
  for (const s of [-1, 1])
    for (let n = 0; n < 5; n++)
      box("chambers", [16, 9, 14], [s * (30 + n * 39), 4.5, 230], chamber);
  offset("chambers", -28, 0, -10);
  const shell = mat("sanctuary", "#d2cdb6", 0, "stone"),
    wood = mat("sanctuary", "#a28a60", 0, "wood"),
    inside = mat("sanctuary", "#c3ad7d", 0.08);
  const y = 6,
    front = -64,
    hallMid = -84,
    innerMid = -116;
  box("sanctuary", [64, 6, 100], [0, 3, -100], shell);
  box("sanctuary", [20, 0.2, 40], [0, y + 0.11, hallMid], wood);
  box("sanctuary", [20, 0.2, 20], [0, y + 0.11, innerMid], wood);
  for (const s of [-1, 1]) {
    wall("sanctuary", 6, 30, 68, s * 13, -96, y, shell, s === 1);
    wall("sanctuary", 7, 30, 2, s * 6.5, -105, y, wood, true);
    box(
      "sanctuary",
      [0.14, 29.8, 66],
      [s * 9.93, y + 15, -96],
      inside,
      s === 1,
    );
    for (let tier = 0; tier < 3; tier++)
      box(
        "sanctuary",
        [9 + tier, 6, 80],
        [s * (20.5 + tier * 0.5), y + 3 + tier * 6, -101],
        shell,
        s === 1,
      );
    column("sanctuary", s * 8, -52, 23, 1.2, inside, y);
    wall("sanctuary", 5, 25, 12, s * 12.5, -58, y, shell, s === 1);
  }
  wall("sanctuary", 32, 30, 6, 0, -129, y, shell);
  box("sanctuary", [20, 0.1, 2], [0, y + 0.2, front], inside);
  k.stairs("sanctuary", 22, 10, 1, 0.6, 0, -44, 0, shell, Math.PI);
  offset("sanctuary", 0, 0, -16);
  const roof = mat("roof", "#a8a68f", 0, "wood");
  box("roof", [34, 1.6, 72], [0, y + 30.8, -96], roof, true);
  box("roof", [32, 1.5, 14], [0, y + 25.8, -57], roof, true);
  for (let z = -130; z < -60; z += 9)
    box("roof", [32, 1, 1], [0, y + 29.5, z], roof, true);
  offset("roof", 0, 48, -12);
  const altar = mat("altar", "#b4a38b", 0, "stone");
  box("altar", [18, 1, 18], [0, 2.9, 7], altar);
  box("altar", [16, 2, 16], [0, 4.4, 7], altar);
  box("altar", [14, 4, 14], [0, 7.4, 7], altar);
  box("altar", [12, 4, 12], [0, 11.4, 7], altar);
  for (const x of [-5.5, 5.5])
    for (const z of [1.5, 12.5])
      box("altar", [0.8, 1.2, 0.8], [x, 14, z], altar);
  k.stairs("altar", 6, 12, 0.85, 0.88, 0, 22, 2.4, altar, Math.PI);
  offset("altar", 30, 0, 18);
  const tableWood = mat("table", C.cedar, 0, "wood");
  box("table", [2, 3, 2], [0, y + 1.5, -99], tableWood);
  offset("table", -25, 3, 0);
  const relief = mat("carvings", "#ad8d55", 0.15);
  for (const s of [-1, 1])
    for (let n = 0; n < 8; n++) {
      const z = -121 + n * 7.3,
        before = k.pickables.length,
        g = new THREE.Group();
      palm("carvings", 0, y + 4, 0, 8, relief, true);
      // Abstract wing and two-face motif, placed between the palms.
      for (const t of [-1, 1]) {
        ball("carvings", 0.5, [t * 0.48, y + 10, 3.3], relief);
        line(
          "carvings",
          [
            [0, y + 8, 3.3],
            [t * 1.6, y + 10.5, 3.3],
            [t * 2.1, y + 12, 3.3],
          ],
          0.22,
          relief,
        );
      }
      for (let i = before; i < k.pickables.length; i++) {
        g.add(k.pickables[i]);
        k.pickables[i].userData.hideOnCutaway = s === 1;
      }
      g.rotation.y = s === 1 ? -Math.PI / 2 : Math.PI / 2;
      g.position.set(s * 9.7 * k.scale, 0, z * k.scale);
      k.assemblies.get("carvings")!.group.add(g);
    }
  offset("carvings", 23, 5, -25);
  const water = mat("river", "#499d9e", 0.28),
    bank = mat("river", "#7e9775"),
    trunk = mat("river", "#837357"),
    leaf = mat("river", "#618d76");
  // Channel starts at the south side of the threshold and passes south of the altar.
  const course: [number, number][] = [
    [5, -51],
    [9, -40],
    [20, -20],
    [22, 30],
    [22, 90],
    [20, 150],
    [20, 220],
    [22, 255],
    [31, 285],
    [42, 322],
    [39, 367],
    [47, 411],
  ];
  const positions: number[] = [],
    indices: number[] = [];
  course.forEach(([x, z], i) => {
    const width = i < 7 ? 1.5 + i * 0.23 : 3 + (i - 7) * 2.5;
    const y = i < 4 ? 2.7 : i === 4 ? 1.3 : 0.16;
    positions.push(x - width, y, z, x + width, y, z);
    if (i > 0) {
      const a = (i - 1) * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  water.side = THREE.DoubleSide;
  k.mesh("river", geo, water, 0, 0, 0);
  for (let n = 7; n < course.length; n++) {
    const [x, z] = course[n],
      w = 8 + (n - 7) * 2.5;
    for (const s of [-1, 1]) {
      cylinder("river", 3, 1, [x + s * w, 1.2, z], bank, 3, 12);
      cylinder("river", 0.65, 8, [x + s * w, 5, z], trunk, 0.38, 8);
      const crown = ball("river", 4.5, [x + s * w, 11, z], leaf);
      crown.scale.y *= 1.35;
      for (let j = 0; j < 3; j++)
        ball(
          "river",
          0.5,
          [x + s * w + Math.cos(j * 2) * 3, 10, z + Math.sin(j * 2) * 3],
          bank,
        );
    }
  }
  offset("river", 42, 3, 0);
  return k;
}

export function createTemple(id: TempleId, textured = true) {
  const model =
    id === "solomon"
      ? solomon(textured)
      : id === "herod"
        ? herod(textured)
        : ezekiel(textured);
  poseTemple(model, {
    part: null,
    separation: 0,
    isolated: false,
    cutaway: false,
    lens: "object",
  });
  return model;
}
