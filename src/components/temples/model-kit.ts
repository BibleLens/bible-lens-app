import * as THREE from "three";
import type { TempleStudy, TempleView } from "@/data/temples/types";

export type Assembly = {
  id: string;
  group: THREE.Group;
  offset: THREE.Vector3;
  materials: THREE.MeshStandardMaterial[];
};
export type TempleModel = ReturnType<typeof makeModelKit>;
export const COLORS = {
  stone: "#dacaaa",
  white: "#e3ddcd",
  gold: "#cfaa55",
  bronze: "#a87344",
  cedar: "#79563b",
  water: "#589b9a",
  veil: "#60507a",
  leaf: "#63897c",
};

export function makeModelKit(
  study: TempleStudy,
  scale: number,
  textured = true,
) {
  const root = new THREE.Group();
  root.name = study.id;
  const assemblies = new Map<string, Assembly>();
  const pickables: THREE.Mesh[] = [];
  const textures: THREE.Texture[] = [];
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  for (const part of study.parts) {
    const group = new THREE.Group();
    group.name = part.id;
    root.add(group);
    assemblies.set(part.id, {
      id: part.id,
      group,
      offset: new THREE.Vector3(),
      materials: [],
    });
  }
  function texture(kind: "stone" | "wood" | "cloth") {
    if (!textured || typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const c = canvas.getContext("2d");
    if (!c) return null;
    c.fillStyle = "#ffffff";
    c.fillRect(0, 0, 256, 256);
    if (kind === "stone") {
      c.strokeStyle = "#a59e8d";
      c.lineWidth = 1.6;
      for (let y = 0; y < 256; y += 64) {
        c.beginPath();
        c.moveTo(0, y);
        c.lineTo(256, y);
        c.stroke();
        for (let x = y % 128 ? 64 : 0; x < 256; x += 128) {
          c.beginPath();
          c.moveTo(x, y);
          c.lineTo(x, y + 64);
          c.stroke();
        }
      }
      for (let i = 0; i < 1800; i++) {
        c.fillStyle = i % 2 ? "#776e6112" : "#ffffff15";
        c.fillRect((i * 73) % 256, (i * 43) % 256, 2, 1);
      }
    } else {
      for (let i = 0; i < 256; i += kind === "wood" ? 5 : 2) {
        c.strokeStyle = kind === "wood" ? "#68564130" : "#71677b24";
        c.beginPath();
        c.moveTo(i, 0);
        c.bezierCurveTo(i + 4, 80, i - 3, 180, i, 256);
        c.stroke();
        if (kind === "cloth") {
          c.beginPath();
          c.moveTo(0, i);
          c.lineTo(256, i);
          c.stroke();
        }
      }
    }
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 4;
    textures.push(t);
    return t;
  }
  const stoneMap = texture("stone"),
    woodMap = texture("wood"),
    clothMap = texture("cloth");
  function mat(
    id: string,
    color: string,
    metal = 0,
    map?: "stone" | "wood" | "cloth",
  ) {
    const m = new THREE.MeshStandardMaterial({
      color,
      metalness: metal,
      roughness: metal ? 0.36 : 0.83,
      map:
        map === "stone"
          ? stoneMap
          : map === "wood"
            ? woodMap
            : map === "cloth"
              ? clothMap
              : null,
    });
    assemblies.get(id)!.materials.push(m);
    materials.add(m);
    return m;
  }
  function mesh(
    id: string,
    g: THREE.BufferGeometry,
    m: THREE.MeshStandardMaterial,
    x: number,
    y: number,
    z: number,
    hideOnCutaway = false,
  ) {
    const obj = new THREE.Mesh(g, m);
    obj.position.set(x * scale, y * scale, z * scale);
    obj.scale.setScalar(scale);
    obj.castShadow = true;
    obj.receiveShadow = true;
    obj.userData = { part: id, hideOnCutaway };
    assemblies.get(id)!.group.add(obj);
    geometries.add(g);
    pickables.push(obj);
    return obj;
  }
  function box(
    id: string,
    size: [number, number, number],
    at: [number, number, number],
    m: THREE.MeshStandardMaterial,
    hide = false,
  ) {
    return mesh(id, new THREE.BoxGeometry(...size), m, ...at, hide);
  }
  function cylinder(
    id: string,
    radius: number,
    height: number,
    at: [number, number, number],
    m: THREE.MeshStandardMaterial,
    topRadius = radius,
    segments = 20,
  ) {
    return mesh(
      id,
      new THREE.CylinderGeometry(topRadius, radius, height, segments),
      m,
      ...at,
    );
  }
  function ball(
    id: string,
    radius: number,
    at: [number, number, number],
    m: THREE.MeshStandardMaterial,
  ) {
    return mesh(id, new THREE.SphereGeometry(radius, 12, 8), m, ...at);
  }
  function line(
    id: string,
    points: [number, number, number][],
    radius: number,
    m: THREE.MeshStandardMaterial,
  ) {
    const curve = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(...p)),
    );
    return mesh(
      id,
      new THREE.TubeGeometry(curve, 16, radius, 6, false),
      m,
      0,
      0,
      0,
    );
  }
  function ring(
    id: string,
    radius: number,
    tube: number,
    at: [number, number, number],
    m: THREE.MeshStandardMaterial,
  ) {
    const r = mesh(id, new THREE.TorusGeometry(radius, tube, 6, 28), m, ...at);
    r.rotation.x = Math.PI / 2;
    return r;
  }
  function bowl(
    id: string,
    radius: number,
    height: number,
    at: [number, number, number],
    m: THREE.MeshStandardMaterial,
  ) {
    const points = [
      [0.01, 0],
      [radius * 0.38, 0],
      [radius * 0.6, height * 0.13],
      [radius * 0.82, height * 0.52],
      [radius, height],
      [radius * 0.94, height],
      [radius * 0.78, height * 0.56],
      [radius * 0.55, height * 0.2],
      [0.01, height * 0.14],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return mesh(id, new THREE.LatheGeometry(points, 32), m, ...at);
  }
  function column(
    id: string,
    x: number,
    z: number,
    height: number,
    radius: number,
    m: THREE.MeshStandardMaterial,
    y = 0,
  ) {
    cylinder(id, radius * 1.35, 0.8, [x, y + 0.4, z], m);
    cylinder(
      id,
      radius,
      height - 2.1,
      [x, y + (height - 2.1) / 2 + 0.8, z],
      m,
      radius * 0.84,
    );
    cylinder(id, radius * 1.22, 0.5, [x, y + height - 1.1, z], m);
    box(id, [radius * 2.8, 0.6, radius * 2.8], [x, y + height - 0.3, z], m);
  }
  function stairs(
    id: string,
    width: number,
    count: number,
    run: number,
    rise: number,
    x: number,
    z: number,
    y: number,
    m: THREE.MeshStandardMaterial,
    turn = 0,
  ) {
    for (let i = 0; i < count; i++) {
      const depth = run * (count - i),
        h = rise * (i + 1),
        dz = (run * i) / 2;
      const at: [number, number, number] = [
        x + Math.sin(turn) * dz,
        y + h / 2,
        z + Math.cos(turn) * dz,
      ];
      const o = box(id, [width, h, depth], at, m);
      o.rotation.y = turn;
    }
  }
  function palm(
    id: string,
    x: number,
    y: number,
    z: number,
    height: number,
    m: THREE.MeshStandardMaterial,
    wall = false,
  ) {
    cylinder(
      id,
      height * 0.035,
      height * 0.7,
      [x, y + height * 0.35, z],
      m,
      height * 0.023,
      8,
    );
    for (let n = 0; n < 7; n++) {
      const a = (n / 7) * Math.PI * 2;
      const p: [number, number, number][] = wall
        ? [
            [x, y + height * 0.68, z],
            [
              x + Math.cos(a) * height * 0.23,
              y + height * (0.74 + Math.sin(a) * 0.22),
              z,
            ],
            [
              x + Math.cos(a) * height * 0.39,
              y + height * (0.68 + Math.sin(a) * 0.23),
              z,
            ],
          ]
        : [
            [x, y + height * 0.7, z],
            [
              x + Math.cos(a) * height * 0.25,
              y + height * 0.96,
              z + Math.sin(a) * height * 0.25,
            ],
            [
              x + Math.cos(a) * height * 0.4,
              y + height * 0.72,
              z + Math.sin(a) * height * 0.4,
            ],
          ];
      line(id, p, height * 0.025, m);
    }
  }
  function lamp(
    id: string,
    x: number,
    y: number,
    z: number,
    h: number,
    m: THREE.MeshStandardMaterial,
  ) {
    const stem = h * 0.03;
    cylinder(id, h * 0.18, h * 0.06, [x, y + h * 0.03, z], m, h * 0.13, 8);
    cylinder(id, stem, h * 0.85, [x, y + h * 0.48, z], m);
    for (let n = 1; n <= 3; n++)
      for (const s of [-1, 1])
        line(
          id,
          [
            [x, y + h * (0.18 + n * 0.12), z],
            [x + s * n * h * 0.12, y + h * 0.6, z],
            [x + s * n * h * 0.14, y + h * 0.94, z],
          ],
          stem * 0.8,
          m,
        );
    for (let n = -3; n <= 3; n++)
      bowl(id, h * 0.045, h * 0.045, [x + n * h * 0.14, y + h * 0.94, z], m);
  }
  function table(
    id: string,
    x: number,
    y: number,
    z: number,
    m: THREE.MeshStandardMaterial,
  ) {
    box(id, [2.5, 0.22, 1.5], [x, y + 1.5, z], m);
    for (const dx of [-1, 1])
      for (const dz of [-0.5, 0.5])
        box(id, [0.18, 1.45, 0.18], [x + dx, y + 0.74, z + dz], m);
    for (const dx of [-0.55, 0.55])
      for (let n = 0; n < 3; n++)
        cylinder(id, 0.25, 0.14, [x + dx, y + 1.7 + n * 0.14, z], m, 0.25, 12);
  }
  function cherub(
    id: string,
    x: number,
    y: number,
    z: number,
    height: number,
    span: number,
    m: THREE.MeshStandardMaterial,
  ) {
    const body = cylinder(
      id,
      height * 0.1,
      height * 0.66,
      [x, y + height * 0.4, z],
      m,
      height * 0.07,
      8,
    );
    body.name = "stylised-cherub-body";
    ball(id, height * 0.105, [x, y + height * 0.88, z], m);
    for (const s of [-1, 1]) {
      cylinder(
        id,
        height * 0.027,
        height * 0.2,
        [x + s * height * 0.065, y + height * 0.1, z],
        m,
      );
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.quadraticCurveTo(
        span * 0.2,
        height * 0.34,
        span * 0.5,
        height * 0.12,
      );
      shape.lineTo(span * 0.46, -height * 0.12);
      shape.quadraticCurveTo(span * 0.22, -height * 0.08, 0, -height * 0.23);
      shape.closePath();
      const wing = mesh(
        id,
        new THREE.ExtrudeGeometry(shape, {
          depth: height * 0.04,
          bevelEnabled: false,
        }),
        m,
        x,
        y + height * 0.67,
        z,
      );
      wing.scale.x *= s;
      for (let n = 0; n < 5; n++)
        line(
          id,
          [
            [
              x + s * span * 0.14,
              y + height * (0.73 - n * 0.045),
              z + height * 0.046,
            ],
            [
              x + s * span * (0.43 - n * 0.015),
              y + height * (0.77 - n * 0.036),
              z + height * 0.046,
            ],
          ],
          height * 0.009,
          m,
        );
    }
  }
  function wall(
    id: string,
    width: number,
    height: number,
    depth: number,
    x: number,
    z: number,
    y: number,
    m: THREE.MeshStandardMaterial,
    hide = false,
  ) {
    return box(id, [width, height, depth], [x, y + height / 2, z], m, hide);
  }
  function offset(id: string, x: number, y: number, z: number) {
    assemblies.get(id)!.offset.set(x * scale, y * scale, z * scale);
  }
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: "#c2b594",
    roughness: 1,
  });
  const ground = new THREE.Group();
  ground.name = "context-ground";
  materials.add(floorMaterial);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: "#9f8c65",
    transparent: true,
    opacity: 0.45,
  });
  materials.add(lineMaterial);
  function groundPlane(width: number, depth: number, z = 0) {
    const geo = new THREE.BoxGeometry(width * scale, 0.2, depth * scale);
    geometries.add(geo);
    const floor = new THREE.Mesh(geo, floorMaterial);
    floor.position.set(0, -0.17, z * scale);
    floor.receiveShadow = true;
    ground.add(floor);
    const edges = new THREE.EdgesGeometry(geo);
    geometries.add(edges);
    const line = new THREE.LineSegments(edges, lineMaterial);
    line.position.copy(floor.position);
    ground.add(line);
  }
  function dispose() {
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
    scale,
    mat,
    mesh,
    box,
    cylinder,
    ball,
    line,
    ring,
    bowl,
    column,
    stairs,
    palm,
    lamp,
    table,
    cherub,
    wall,
    offset,
    groundPlane,
    dispose,
  };
}

export function poseTemple(
  model: TempleModel,
  view: TempleView,
  separation = view.separation,
) {
  for (const a of model.assemblies.values()) {
    a.group.visible = !view.isolated || a.id === view.part;
    a.group.position.copy(a.offset).multiplyScalar(separation / 100);
    for (const m of a.materials) {
      m.emissive.set(view.part === a.id ? "#a17737" : "#000000");
      m.emissiveIntensity = view.part === a.id ? 0.16 : 0;
    }
  }
  for (const object of model.pickables) {
    object.visible = !(
      view.cutaway &&
      object.userData.hideOnCutaway &&
      !view.isolated
    );
  }
  model.ground.visible = !view.isolated;
  model.root.updateMatrixWorld(true);
}
export function visibleMeshes(model: TempleModel) {
  return model.pickables.filter(
    (m) => m.visible && model.assemblies.get(m.userData.part)!.group.visible,
  );
}
