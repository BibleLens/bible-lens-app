import * as THREE from "three";
import { PARTS, type PartId } from "@/data/tabernacle/study";

export type MovingPiece = {
  object: THREE.Object3D;
  origin: THREE.Vector3;
  offset: THREE.Vector3;
};
export type Assembly = {
  id: PartId;
  group: THREE.Group;
  offset: THREE.Vector3;
  pieces: MovingPiece[];
  materials: THREE.MeshStandardMaterial[];
};
export type DwellingModel = ReturnType<typeof createDwelling>;
const TAU = Math.PI * 2;
const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

function fabricTexture(kind: "cover" | "linen" | "veil") {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle =
    kind === "cover" ? "#b76f50" : kind === "veil" ? "#514977" : "#e7dbc1";
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 512; i += 2) {
    ctx.strokeStyle = i % 6 ? "#ffffff0b" : "#0000000b";
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }
  if (kind !== "cover") {
    for (const y of [24, 36, 476, 488]) {
      ctx.strokeStyle = "#c5a575";
      ctx.lineWidth = y % 24 ? 2 : 5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }
    // Abstract paired wings acknowledge the imagery without specifying an ancient figure.
    ctx.strokeStyle = kind === "veil" ? "#dfc48c" : "#9f8864";
    ctx.lineWidth = 2.5;
    for (const cx of [128, 384])
      for (const cy of [160, 348]) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, 5, 12, 0, 0, TAU);
        ctx.stroke();
        for (const side of [-1, 1])
          for (let feather = 0; feather < 5; feather++) {
            ctx.beginPath();
            ctx.moveTo(cx + side * 8, cy + 8);
            ctx.quadraticCurveTo(
              cx + side * (26 + feather * 5),
              cy - 4,
              cx + side * (24 + feather * 8),
              cy - 38 + feather * 5,
            );
            ctx.stroke();
          }
      }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

export function createDwelling(textured = true) {
  const root = new THREE.Group();
  const textures: THREE.Texture[] = [];
  const assemblies = new Map<PartId, Assembly>();
  const pickables: THREE.Mesh[] = [];
  for (const part of PARTS) {
    const group = new THREE.Group();
    group.name = part.id;
    root.add(group);
    assemblies.set(part.id, {
      id: part.id,
      group,
      offset: v(0, 0, 0),
      pieces: [],
      materials: [],
    });
  }
  const mat = (
    id: PartId,
    color: THREE.ColorRepresentation,
    metalness = 0.05,
    roughness = 0.7,
    texture?: "cover" | "linen" | "veil",
  ) => {
    const map = textured && texture ? fabricTexture(texture) : null;
    if (map) textures.push(map);
    const material = new THREE.MeshStandardMaterial({
      color: map ? "#ffffff" : color,
      metalness,
      roughness,
      side: THREE.DoubleSide,
      map,
      transparent: true,
    });
    assemblies.get(id)!.materials.push(material);
    return material;
  };
  const mesh = (
    id: PartId,
    geometry: THREE.BufferGeometry,
    material: THREE.MeshStandardMaterial,
    parent: THREE.Object3D = assemblies.get(id)!.group,
    position = v(0, 0, 0),
  ) => {
    const object = new THREE.Mesh(geometry, material);
    object.position.copy(position);
    object.userData.part = id;
    object.castShadow = object.receiveShadow = true;
    parent.add(object);
    pickables.push(object);
    return object;
  };
  const box = (
    id: PartId,
    size: [number, number, number],
    position: THREE.Vector3,
    material: THREE.MeshStandardMaterial,
    parent?: THREE.Object3D,
  ) => mesh(id, new THREE.BoxGeometry(...size), material, parent, position);
  const tube = (
    id: PartId,
    points: THREE.Vector3[],
    radius: number,
    material: THREE.MeshStandardMaterial,
    parent?: THREE.Object3D,
  ) =>
    mesh(
      id,
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        32,
        radius,
        8,
        false,
      ),
      material,
      parent,
    );
  const pole = (
    id: PartId,
    x: number,
    z: number,
    height: number,
    radius: number,
    material: THREE.MeshStandardMaterial,
    parent?: THREE.Object3D,
  ) =>
    mesh(
      id,
      new THREE.CylinderGeometry(radius, radius * 1.1, height, 12),
      material,
      parent,
      v(x, height / 2, z),
    );
  const ring = (
    id: PartId,
    radius: number,
    thickness: number,
    y: number,
    material: THREE.MeshStandardMaterial,
    parent?: THREE.Object3D,
  ) => {
    const m = mesh(
      id,
      new THREE.TorusGeometry(radius, thickness, 8, 80),
      material,
      parent,
      v(0, y, 0),
    );
    m.rotation.x = Math.PI / 2;
    return m;
  };
  function cloth(
    id: PartId,
    a: THREE.Vector3,
    b: THREE.Vector3,
    height: number,
    material: THREE.MeshStandardMaterial,
    parent?: THREE.Object3D,
  ) {
    const geometry = new THREE.PlaneGeometry(a.distanceTo(b), height, 40, 12);
    const attr = geometry.attributes.position;
    for (let i = 0; i < attr.count; i++)
      attr.setZ(i, 0.06 * Math.sin((attr.getX(i) + 5) * 8));
    geometry.computeVertexNormals();
    const object = mesh(
      id,
      geometry,
      material,
      parent,
      a
        .clone()
        .add(b)
        .multiplyScalar(0.5)
        .add(v(0, height / 2 + 0.05, 0)),
    );
    object.rotation.y = -Math.atan2(b.z - a.z, b.x - a.x);
    return object;
  }
  function movable(id: PartId, object: THREE.Object3D, offset: THREE.Vector3) {
    assemblies
      .get(id)!
      .pieces.push({ object, origin: object.position.clone(), offset });
  }

  // Outer canopy: an original illustrative dome, not a dimensioned Project 314 reproduction.
  const skin = mat("covering", "#b76f50", 0.02, 0.9, "cover");
  const paleSkin = mat("covering", "#ecdbb8", 0.02, 0.92);
  const seam = mat("covering", "#7d4933", 0.1, 0.7);
  const domePoint = (r: number, angle: number) =>
    v(
      Math.sin(angle) * r,
      3.6 + 3.1 * Math.pow(Math.max(0, 1 - (r / 8.2) ** 2), 0.65),
      Math.cos(angle) * r,
    );
  function domePanel(
    start: number,
    end: number,
    inner: number,
    outer: number,
    material: THREE.MeshStandardMaterial,
    parent: THREE.Object3D,
  ) {
    const positions: number[] = [],
      uvs: number[] = [],
      indices: number[] = [];
    const segments = 16,
      rows = 14;
    for (let row = 0; row <= rows; row++)
      for (let col = 0; col <= segments; col++) {
        const angle = start + ((end - start) * col) / segments;
        const radius = inner + ((outer - inner) * row) / rows;
        const point = domePoint(radius, angle);
        point.y +=
          (0.035 * Math.cos((col / segments) * Math.PI * 6) * radius) / 8.2;
        positions.push(...point.toArray());
        uvs.push(col / segments, row / rows);
      }
    for (let row = 0; row < rows; row++)
      for (let col = 0; col < segments; col++) {
        const a = row * (segments + 1) + col,
          b = a + segments + 1;
        indices.push(a, a + 1, b, a + 1, b + 1, b);
      }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    mesh("covering", geometry, material, parent);
  }
  for (let i = 0; i < 10; i++) {
    const segment = new THREE.Group();
    assemblies.get("covering")!.group.add(segment);
    const start = (i * TAU) / 10,
      end = ((i + 1) * TAU) / 10;
    domePanel(start, end, 0.015, 2.2, paleSkin, segment);
    domePanel(start, end, 2.2, 8.2, skin, segment);
    tube(
      "covering",
      Array.from({ length: 20 }, (_, j) =>
        domePoint(0.1 + (j / 19) * 8.1, start).add(v(0, 0.015, 0)),
      ),
      0.022,
      seam,
      segment,
    );
    movable(
      "covering",
      segment,
      v(
        Math.sin((start + end) / 2) * 1.4,
        0,
        Math.cos((start + end) / 2) * 1.4,
      ),
    );
  }
  assemblies.get("covering")!.offset.set(0, 8.2, 0);

  const linen = mat("linen", "#ddcfb3", 0, 0.95, "linen");
  const trim = mat("linen", "#536e98", 0.1, 0.8);
  for (let i = 0; i < 10; i++) {
    if (i === 0) continue;
    const a = (i * TAU) / 10 - Math.PI / 10,
      b = ((i + 1) * TAU) / 10 - Math.PI / 10;
    const segment = new THREE.Group();
    assemblies.get("linen")!.group.add(segment);
    cloth(
      "linen",
      v(Math.sin(a) * 7.08, 0, Math.cos(a) * 7.08),
      v(Math.sin(b) * 7.08, 0, Math.cos(b) * 7.08),
      3.25,
      linen,
      segment,
    );
    cloth(
      "linen",
      v(Math.sin(a) * 7.1, 0.18, Math.cos(a) * 7.1),
      v(Math.sin(b) * 7.1, 0.18, Math.cos(b) * 7.1),
      0.22,
      trim,
      segment,
    );
    movable(
      "linen",
      segment,
      v(Math.sin((a + b) / 2) * 2.5, 0, Math.cos((a + b) / 2) * 2.5),
    );
  }
  assemblies.get("linen")!.offset.set(0, 4.2, 0);

  const gold = mat("frame", "#d1ae66", 0.72, 0.32),
    silver = mat("frame", "#b6c0c3", 0.8, 0.35);
  for (let i = 0; i < 10; i++) {
    const angle = (i * TAU) / 10 - Math.PI / 10;
    const segment = new THREE.Group();
    assemblies.get("frame")!.group.add(segment);
    const x = Math.sin(angle) * 7.3,
      z = Math.cos(angle) * 7.3;
    pole("frame", x, z, 3.5, 0.12, gold, segment);
    box("frame", [0.38, 0.14, 0.38], v(x, 0.07, z), silver, segment);
    tube(
      "frame",
      [
        v(x, 3.45, z),
        v(x * 0.87, 4.7, z * 0.87),
        v(x * 0.55, 5.95, z * 0.55),
        v(x * 0.14, 6.55, z * 0.14),
      ],
      0.095,
      gold,
      segment,
    );
    movable(
      "frame",
      segment,
      v(Math.sin(angle) * 1.2, 0.4, Math.cos(angle) * 1.2),
    );
  }
  ring("frame", 1.05, 0.105, 6.55, gold);
  ring("frame", 7.3, 0.07, 3.4, gold);
  assemblies.get("frame")!.offset.set(0, 0.7, 0);

  const veilMat = mat("veil", "#655880", 0.05, 0.84, "veil"),
    veilGold = mat("veil", "#ceae6e", 0.65, 0.35);
  cloth("veil", v(-4.8, 0, -1.65), v(4.8, 0, -1.65), 3.65, veilMat);
  for (const x of [-4.95, -1.65, 1.65, 4.95]) {
    pole("veil", x, -1.73, 3.95, 0.085, veilGold);
    mesh(
      "veil",
      new THREE.SphereGeometry(0.14, 12, 8),
      veilGold,
      undefined,
      v(x, 3.99, -1.73),
    );
  }
  box("veil", [10.1, 0.1, 0.1], v(0, 3.74, -1.73), veilGold);
  assemblies.get("veil")!.offset.set(0, 2.2, 8);

  const arkGold = mat("ark", "#dabd75", 0.76, 0.28);
  const ark = assemblies.get("ark")!.group;
  box("ark", [1.5, 0.9, 0.9], v(0, 0.69, -4.15), arkGold);
  box("ark", [1.64, 0.09, 1.04], v(0, 1.185, -4.15), arkGold);
  for (const z of [-4.8, -3.5]) {
    const m = mesh(
      "ark",
      new THREE.CylinderGeometry(0.036, 0.036, 3.1, 10),
      arkGold,
      ark,
      v(0, 0.76, z),
    );
    m.rotation.z = Math.PI / 2;
    for (const x of [-0.6, 0.6]) {
      const r = mesh(
        "ark",
        new THREE.TorusGeometry(0.12, 0.025, 8, 16),
        arkGold,
        ark,
        v(x, 0.76, z),
      );
      r.rotation.y = Math.PI / 2;
    }
  }
  for (const side of [-1, 1]) {
    mesh(
      "ark",
      new THREE.SphereGeometry(0.15, 12, 8),
      arkGold,
      ark,
      v(side * 0.5, 1.4, -4.15),
    );
    const wing = new THREE.Shape();
    wing.moveTo(0, 0);
    wing.quadraticCurveTo(0.15, 0.8, 0.7, 1);
    wing.quadraticCurveTo(0.6, 0.35, 0, 0);
    const geometry = new THREE.ExtrudeGeometry(wing, {
      depth: 0.035,
      bevelEnabled: true,
      bevelSize: 0.025,
      bevelThickness: 0.02,
      bevelSegments: 2,
      steps: 1,
    });
    const w = mesh("ark", geometry, arkGold, ark, v(side * 0.53, 1.43, -4.15));
    w.scale.x = -side;
  }
  assemblies.get("ark")!.offset.set(-2.3, 1, -3.5);

  const lampGold = mat("lampstand", "#e0bd73", 0.75, 0.27);
  const lampRoot = new THREE.Group();
  lampRoot.position.set(-3.3, 0, 1.15);
  assemblies.get("lampstand")!.group.add(lampRoot);
  const base = mesh(
    "lampstand",
    new THREE.CylinderGeometry(0.42, 0.56, 0.15, 6),
    lampGold,
    lampRoot,
    v(0, 0.075, 0),
  );
  base.rotation.y = Math.PI / 6;
  pole("lampstand", 0, 0, 2.15, 0.055, lampGold, lampRoot);
  for (let n = 1; n <= 3; n++)
    for (const side of [-1, 1]) {
      tube(
        "lampstand",
        [
          v(0, 0.42 + n * 0.2, 0),
          v(side * n * 0.3, 0.85 + n * 0.17, 0),
          v(side * n * 0.38, 1.7, 0),
          v(side * n * 0.38, 2.15, 0),
        ],
        0.044,
        lampGold,
        lampRoot,
      );
    }
  const flameMat = mat("lampstand", "#ffe2a2", 0.1, 0.6);
  flameMat.emissive.set("#eaaa40");
  flameMat.emissiveIntensity = 0.7;
  for (let i = -3; i <= 3; i++) {
    mesh(
      "lampstand",
      new THREE.SphereGeometry(0.105, 16, 8, 0, TAU, 0, Math.PI * 0.65),
      lampGold,
      lampRoot,
      v(i * 0.38, 2.17, 0),
    );
    const flame = mesh(
      "lampstand",
      new THREE.SphereGeometry(0.035, 8, 8),
      flameMat,
      lampRoot,
      v(i * 0.38, 2.29, 0),
    );
    flame.scale.y = 2.4;
  }
  assemblies.get("lampstand")!.offset.set(-4.4, 1.7, 1.8);

  const tableGold = mat("table", "#cfa965", 0.7, 0.35),
    bread = mat("table", "#c3975c", 0, 0.96);
  const table = new THREE.Group();
  table.position.set(3.3, 0, 1.15);
  assemblies.get("table")!.group.add(table);
  box("table", [1.4, 0.12, 0.7], v(0, 1.05, 0), tableGold, table);
  for (const x of [-0.6, 0.6])
    for (const z of [-0.25, 0.25])
      box("table", [0.1, 1, 0.1], v(x, 0.5, z), tableGold, table);
  for (const x of [-0.36, 0.36])
    for (let i = 0; i < 6; i++) {
      const loaf = mesh(
        "table",
        new THREE.SphereGeometry(0.21, 14, 8),
        bread,
        table,
        v(x, 1.2 + i * 0.085, 0),
      );
      loaf.scale.set(1, 0.25, 1.1);
    }
  assemblies.get("table")!.offset.set(4.4, 1.7, 1.8);

  const incenseGold = mat("incense", "#cbaa6f", 0.65, 0.35);
  box("incense", [0.65, 1.3, 0.65], v(0, 0.65, -0.3), incenseGold);
  box("incense", [0.8, 0.08, 0.8], v(0, 1.34, -0.3), incenseGold);
  for (const x of [-0.3, 0.3])
    for (const z of [-0.6, 0])
      mesh(
        "incense",
        new THREE.ConeGeometry(0.075, 0.2, 10),
        incenseGold,
        undefined,
        v(x, 1.47, z),
      );
  assemblies.get("incense")!.offset.set(3, 1.5, 4);

  const bronze = mat("basin", "#b48156", 0.8, 0.33),
    water = mat("basin", "#7dafb4", 0.55, 0.15);
  const basin = new THREE.Group();
  basin.position.set(0, 0, 8.1);
  assemblies.get("basin")!.group.add(basin);
  mesh(
    "basin",
    new THREE.CylinderGeometry(0.36, 0.52, 0.13, 28),
    bronze,
    basin,
    v(0, 0.07, 0),
  );
  pole("basin", 0, 0, 0.72, 0.17, bronze, basin);
  const bowlPoints = [
    new THREE.Vector2(0.13, 0.5),
    new THREE.Vector2(0.3, 0.6),
    new THREE.Vector2(0.57, 0.77),
    new THREE.Vector2(0.66, 1.02),
    new THREE.Vector2(0.69, 1.08),
  ];
  mesh("basin", new THREE.LatheGeometry(bowlPoints, 40), bronze, basin);
  const waterSurface = mesh(
    "basin",
    new THREE.CircleGeometry(0.61, 40),
    water,
    basin,
    v(0, 0.98, 0),
  );
  waterSurface.rotation.x = -Math.PI / 2;
  assemblies.get("basin")!.offset.set(-3, 0.8, 2.8);

  const altarBronze = mat("altar", "#966b48", 0.68, 0.48),
    darkBronze = mat("altar", "#443d37", 0.35, 0.7);
  const altar = new THREE.Group();
  altar.position.set(0, 0, 10.3);
  assemblies.get("altar")!.group.add(altar);
  for (const x of [-0.95, 0.95])
    box("altar", [0.1, 1.2, 2], v(x, 0.6, 0), altarBronze, altar);
  for (const z of [-0.95, 0.95])
    box("altar", [2, 1.2, 0.1], v(0, 0.6, z), altarBronze, altar);
  for (let i = -4; i <= 4; i++) {
    box("altar", [1.8, 0.025, 0.035], v(0, 1.06, i * 0.2), darkBronze, altar);
    box("altar", [0.035, 0.025, 1.8], v(i * 0.2, 1.065, 0), darkBronze, altar);
  }
  for (const x of [-0.9, 0.9])
    for (const z of [-0.9, 0.9])
      mesh(
        "altar",
        new THREE.ConeGeometry(0.11, 0.28, 10),
        altarBronze,
        altar,
        v(x, 1.32, z),
      );
  for (const x of [-1.15, 1.15]) {
    const p = mesh(
      "altar",
      new THREE.CylinderGeometry(0.055, 0.055, 3.5, 10),
      altarBronze,
      altar,
      v(x, 0.65, 0),
    );
    p.rotation.x = Math.PI / 2;
  }
  assemblies.get("altar")!.offset.set(1.5, 0.45, 3.6);

  const courtLinen = mat("court", "#e7dcc2", 0, 0.95),
    courtPole = mat("court", "#9a805b", 0.6, 0.5);
  const postCount = 48;
  for (let i = 2; i < postCount - 1; i++) {
    const a = (i * TAU) / postCount,
      b = ((i + 1) * TAU) / postCount;
    const panel = new THREE.Group();
    assemblies.get("court")!.group.add(panel);
    const x = Math.sin(a) * 12.5,
      z = Math.cos(a) * 12.5;
    pole("court", x, z, 1.45, 0.055, courtPole, panel);
    cloth(
      "court",
      v(x, 0.12, z),
      v(Math.sin(b) * 12.5, 0.12, Math.cos(b) * 12.5),
      1.1,
      courtLinen,
      panel,
    );
    movable(
      "court",
      panel,
      v(Math.sin((a + b) / 2) * 1.7, 0.15, Math.cos((a + b) / 2) * 1.7),
    );
  }
  assemblies.get("court")!.offset.set(0, 0.15, 0);

  const ground = new THREE.Group();
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: "#99947f",
    roughness: 1,
    metalness: 0.08,
  });
  const floor = new THREE.Mesh(
    new THREE.CylinderGeometry(13.35, 13.5, 0.18, 128),
    floorMaterial,
  );
  floor.position.y = -0.14;
  floor.receiveShadow = true;
  ground.add(floor);
  const lineMaterial = new THREE.MeshBasicMaterial({
    color: "#bba575",
    transparent: true,
    opacity: 0.45,
  });
  for (const radius of [8.45, 12.95, 13.3]) {
    const line = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.012, 6, 120),
      lineMaterial,
    );
    line.rotation.x = Math.PI / 2;
    line.position.y = -0.038;
    ground.add(line);
  }
  const ticks = new THREE.Group();
  ground.add(ticks);
  for (let i = 0; i < 120; i++) {
    const a = (i / 120) * TAU;
    const line = new THREE.Mesh(
      new THREE.BoxGeometry(0.016, 0.012, i % 10 === 0 ? 0.26 : 0.1),
      lineMaterial,
    );
    line.position.set(Math.sin(a) * 13.1, -0.035, Math.cos(a) * 13.1);
    line.rotation.y = a;
    ticks.add(line);
  }

  function dispose() {
    const geometries = new Set<THREE.BufferGeometry>(),
      materials = new Set<THREE.Material>();
    for (const parent of [root, ground])
      parent.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          (Array.isArray(object.material)
            ? object.material
            : [object.material]
          ).forEach((m) => materials.add(m));
        }
      });
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    textures.forEach((t) => t.dispose());
  }
  return {
    root,
    ground,
    assemblies,
    pickables,
    floorMaterial,
    lineMaterial,
    dispose,
  };
}

export function poseDwelling(
  model: DwellingModel,
  separation: number,
  selected: PartId | null,
  isolated: boolean,
) {
  const amount = THREE.MathUtils.clamp(separation / 100, 0, 1);
  for (const assembly of model.assemblies.values()) {
    assembly.group.position.copy(assembly.offset).multiplyScalar(amount);
    assembly.group.visible = !isolated || assembly.id === selected;
    for (const piece of assembly.pieces)
      piece.object.position
        .copy(piece.origin)
        .addScaledVector(piece.offset, amount);
    for (const material of assembly.materials) {
      const dim = selected && selected !== assembly.id;
      material.opacity = dim ? 0.26 : 1;
      material.depthWrite = !dim;
      if (material.emissiveIntensity < 0.7) {
        material.emissive.set(selected === assembly.id ? "#50401c" : "#000000");
        material.emissiveIntensity = selected === assembly.id ? 0.16 : 0;
      }
    }
  }
  model.ground.visible = !isolated;
  model.root.updateMatrixWorld(true);
}
