import assert from "node:assert/strict";
import test from "node:test";
import * as THREE from "three";
import { PARTS, TOUR } from "../src/data/tabernacle/study";
import {
  INITIAL_STATE,
  parseStudyState,
  studyHref,
} from "../src/lib/tabernacle/state";
import {
  createDwelling,
  poseDwelling,
} from "../src/components/tabernacle/model";
import exodus from "../src/data/bibles/bsb/exodus.json";

test("every displayed excerpt matches the BSB chapter used by the reader", () => {
  const chapters = exodus.chapters as Record<string, { text: string }[]>;
  for (const part of PARTS) {
    const chapter = chapters[part.passage.split("/").at(-1)!];
    assert.ok(
      chapter.some((verse) => verse.text.includes(part.excerpt)),
      `${part.id}: excerpt does not match its chapter`,
    );
  }
});

test("every selectable assembly has passages, reconstruction notes and traceable connections", () => {
  assert.equal(PARTS.length, 11);
  assert.equal(new Set(PARTS.map((part) => part.id)).size, 11);
  for (const part of PARTS) {
    assert.match(part.passage, /^\/bible\/exodus\/\d+$/);
    assert.ok(part.reference && part.excerpt && part.modelNote);
    assert.ok(part.connections.length);
    for (const connection of part.connections) {
      assert.ok(connection.kind && connection.reference && connection.text);
      assert.match(
        connection.href,
        /^(\/bible\/[a-z]+\/\d+|https:\/\/penelope\.uchicago\.edu\/josephus\/ant-3\.html)$/,
      );
    }
  }
});

test("malformed shared views have safe, visible defaults", () => {
  assert.deepEqual(
    parseStudyState(
      new URLSearchParams("part=unknown&separation=NaN&isolate=1&lens=invalid"),
    ),
    INITIAL_STATE,
  );
  assert.equal(
    parseStudyState(new URLSearchParams("separation=Infinity")).separation,
    0,
  );
  assert.equal(
    parseStudyState(new URLSearchParams("separation=-8")).separation,
    0,
  );
  assert.equal(
    parseStudyState(new URLSearchParams("separation=150")).separation,
    100,
  );
  assert.equal(
    parseStudyState(new URLSearchParams("part=veil&isolate=1")).isolated,
    true,
  );
});

test("shared views preserve the part, separation, isolation and reading lens", () => {
  for (const part of PARTS)
    for (const lens of ["object", "passage", "connections"] as const) {
      const state = { part: part.id, separation: 73, isolated: true, lens };
      assert.deepEqual(
        parseStudyState(
          new URL(studyHref(state), "http://localhost").searchParams,
        ),
        state,
      );
    }
});

test("the guided reveal selects existing components and returns to the assembled whole", () => {
  assert.equal(TOUR.length, 5);
  for (const moment of TOUR) {
    assert.ok(
      moment.part === null || PARTS.some((part) => part.id === moment.part),
    );
    assert.ok(moment.separation >= 0 && moment.separation <= 100);
    assert.ok(!moment.isolated || moment.part);
  }
  assert.equal(TOUR.at(-1)!.separation, 0);
  assert.equal(TOUR.at(-1)!.part, null);
});

test("all model meshes resolve to study records and have finite geometry", () => {
  const model = createDwelling(false);
  try {
    assert.equal(model.assemblies.size, PARTS.length);
    for (const part of PARTS)
      assert.ok(model.assemblies.get(part.id)!.group.children.length);
    for (const object of model.pickables) {
      assert.ok(PARTS.some((part) => part.id === object.userData.part));
      for (const value of object.geometry.attributes.position.array)
        assert.ok(Number.isFinite(value));
    }
    const bounds = new THREE.Box3().setFromObject(model.root);
    assert.ok(bounds.max.y > 6 && bounds.max.y < 8);
    assert.ok(bounds.min.x < -12 && bounds.max.x > 12);
  } finally {
    model.dispose();
  }
});

test("repeated separation and reassembly return every piece to its original transform", () => {
  const model = createDwelling(false);
  try {
    poseDwelling(model, 0, null, false);
    const origins = model.pickables.map((object) =>
      object.matrixWorld.elements.slice(),
    );
    for (let cycle = 0; cycle < 3; cycle++) {
      poseDwelling(model, 100, null, false);
      assert.ok(new THREE.Box3().setFromObject(model.root).max.y > 14);
      poseDwelling(model, 0, null, false);
    }
    model.pickables.forEach((object, i) =>
      assert.deepEqual(object.matrixWorld.elements, origins[i]),
    );
  } finally {
    model.dispose();
  }
});

test("isolating each component leaves it visible and returning restores all assemblies", () => {
  const model = createDwelling(false);
  try {
    for (const selected of PARTS) {
      poseDwelling(model, 85, selected.id, true);
      for (const assembly of model.assemblies.values())
        assert.equal(assembly.group.visible, assembly.id === selected.id);
      assert.equal(model.ground.visible, false);
      const bounds = new THREE.Box3().setFromObject(
        model.assemblies.get(selected.id)!.group,
      );
      assert.equal(bounds.isEmpty(), false);
    }
    poseDwelling(model, 0, null, false);
    assert.ok(
      [...model.assemblies.values()].every(
        (assembly) => assembly.group.visible,
      ),
    );
    assert.equal(model.ground.visible, true);
  } finally {
    model.dispose();
  }
});
