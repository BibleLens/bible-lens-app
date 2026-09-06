"use client";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createDwelling, poseDwelling } from "./model";
import { PARTS, type PartId } from "@/data/tabernacle/study";
import type { StudyState } from "@/lib/tabernacle/state";

export type CameraCommand = {
  action: "home" | "top" | "left" | "right" | "in" | "out";
  sequence: number;
};
type Props = {
  state: StudyState;
  labels: boolean;
  reducedMotion: boolean;
  command: CameraCommand;
  onSelect: (part: PartId) => void;
  onReady: () => void;
};
type Controller = {
  update: (
    state: StudyState,
    labels: boolean,
    reducedMotion: boolean,
    dark: boolean,
  ) => void;
  command: (command: CameraCommand) => void;
};

export default function DwellingScene({
  state,
  labels,
  reducedMotion,
  command,
  onSelect,
  onReady,
}: Props) {
  const host = useRef<HTMLDivElement>(null),
    labelHost = useRef<HTMLDivElement>(null);
  const controller = useRef<Controller | null>(null);
  const [error, setError] = useState(false);
  const { resolvedTheme } = useTheme();
  const pick = useEffectEvent(onSelect),
    ready = useEffectEvent(onReady);

  useEffect(() => {
    const container = host.current,
      labelContainer = labelHost.current;
    if (!container || !labelContainer) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      queueMicrotask(() => setError(true));
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.93;
    renderer.domElement.setAttribute(
      "aria-label",
      "Circular Tabernacle model. Drag to orbit; use the camera buttons or component list for keyboard exploration.",
    );
    renderer.domElement.setAttribute("role", "img");
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const model = createDwelling();
    scene.add(model.root, model.ground);
    const camera = new THREE.PerspectiveCamera(37, 1, 0.05, 250);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controls.maxPolarAngle = Math.PI / 2 - 0.025;
    controls.minPolarAngle = 0.02;
    controls.minDistance = 2;
    controls.maxDistance = 150;
    controls.enablePan = false;
    controls.zoomSpeed = 0.75;
    controls.rotateSpeed = 0.7;
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.8;
    room.dispose();
    pmrem.dispose();
    scene.add(new THREE.HemisphereLight("#eaf1ff", "#a88b59", 1.15));
    const sun = new THREE.DirectionalLight("#fff1d2", 2.1);
    sun.position.set(-12, 24, 12);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = sun.shadow.camera.bottom = -20;
    sun.shadow.camera.right = sun.shadow.camera.top = 20;
    sun.shadow.camera.far = 65;
    sun.shadow.normalBias = 0.05;
    sun.shadow.bias = -0.0002;
    scene.add(sun);
    const rim = new THREE.DirectionalLight("#bed6ff", 0.85);
    rim.position.set(15, 10, -15);
    scene.add(rim);
    let targetState: StudyState = {
      part: null,
      separation: 0,
      isolated: false,
      lens: "object",
    };
    let currentSeparation = 0,
      showLabels = false,
      reduce = false,
      disposed = false;
    let frame: number | null = null,
      lastTime = 0,
      lastLabels = 0;
    let cameraMoving = false,
      firstFit = true;
    const desiredCamera = new THREE.Vector3(),
      desiredTarget = new THREE.Vector3();
    const labelsById = new Map<PartId, HTMLButtonElement>();
    for (const part of PARTS) {
      const button = document.createElement("button");
      button.className = "dw-model-label";
      button.textContent = part.name;
      button.setAttribute("aria-label", `Inspect ${part.name.toLowerCase()}`);
      button.onclick = () => pick(part.id);
      labelContainer.appendChild(button);
      labelsById.set(part.id, button);
    }
    function invalidate() {
      if (!disposed && frame === null && !document.hidden)
        frame = requestAnimationFrame(render);
    }
    function fit(top = false, resetDirection = false) {
      poseDwelling(
        model,
        targetState.separation,
        targetState.part,
        targetState.isolated,
      );
      const object =
        targetState.isolated && targetState.part
          ? model.assemblies.get(targetState.part)!.group
          : model.root;
      const bounds = new THREE.Box3().setFromObject(object);
      const sphere = bounds.getBoundingSphere(new THREE.Sphere());
      const direction = top
        ? new THREE.Vector3(0.001, 1, 0.001).normalize()
        : resetDirection || firstFit
          ? new THREE.Vector3(0.85, 0.76, 1.1).normalize()
          : camera.position.clone().sub(controls.target).normalize();
      const right = new THREE.Vector3()
        .crossVectors(camera.up, direction)
        .normalize();
      const up = new THREE.Vector3().crossVectors(direction, right).normalize();
      const tanVertical =
        Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 0.92;
      const tanHorizontal =
        tanVertical *
        camera.aspect *
        Math.max(0.6, 1 - 62 / container!.clientWidth);
      let distance = 3;
      const corner = new THREE.Vector3();
      for (const item of model.pickables) {
        if (targetState.isolated && item.userData.part !== targetState.part)
          continue;
        if (!item.geometry.boundingBox) item.geometry.computeBoundingBox();
        const local = item.geometry.boundingBox!;
        for (const x of [local.min.x, local.max.x])
          for (const y of [local.min.y, local.max.y])
            for (const z of [local.min.z, local.max.z]) {
              corner
                .set(x, y, z)
                .applyMatrix4(item.matrixWorld)
                .sub(sphere.center);
              distance = Math.max(
                distance,
                corner.dot(direction) +
                  Math.max(
                    Math.abs(corner.dot(right)) / tanHorizontal,
                    Math.abs(corner.dot(up)) / tanVertical,
                  ),
              );
            }
      }
      distance *= 1.035;
      desiredTarget.copy(sphere.center);
      desiredCamera.copy(sphere.center).addScaledVector(direction, distance);
      if (firstFit || reduce) {
        camera.position.copy(desiredCamera);
        controls.target.copy(desiredTarget);
        firstFit = false;
        controls.update();
      } else cameraMoving = true;
      poseDwelling(
        model,
        currentSeparation,
        targetState.part,
        targetState.isolated,
      );
      invalidate();
    }
    const projected = new THREE.Vector3();
    function positionLabels() {
      const width = container!.clientWidth,
        height = container!.clientHeight;
      const placed: { x: number; y: number }[] = [];
      const ordered = [...PARTS].sort(
        (a, b) =>
          Number(b.id === targetState.part) - Number(a.id === targetState.part),
      );
      for (const part of ordered) {
        const assembly = model.assemblies.get(part.id)!,
          button = labelsById.get(part.id)!;
        if (!showLabels || !assembly.group.visible) {
          button.hidden = true;
          continue;
        }
        const center = new THREE.Box3()
          .setFromObject(assembly.group)
          .getCenter(projected);
        center.project(camera);
        const x = (center.x * 0.5 + 0.5) * width,
          y = (-center.y * 0.5 + 0.5) * height;
        const hidden =
          center.z > 1 ||
          center.z < -1 ||
          x < 60 ||
          x > width - 60 ||
          y < 25 ||
          y > height - 25 ||
          placed.some((p) => Math.abs(x - p.x) < 115 && Math.abs(y - p.y) < 30);
        button.hidden = hidden;
        if (!hidden) {
          button.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
          button.dataset.selected = String(part.id === targetState.part);
          placed.push({ x, y });
        }
      }
    }
    function render(time: number) {
      frame = null;
      if (disposed || document.hidden) return;
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.06) : 0.016;
      lastTime = time;
      const alpha = reduce ? 1 : 1 - Math.exp(-delta * 5.5);
      const separating =
        Math.abs(currentSeparation - targetState.separation) > 0.025;
      currentSeparation = separating
        ? THREE.MathUtils.lerp(currentSeparation, targetState.separation, alpha)
        : targetState.separation;
      poseDwelling(
        model,
        currentSeparation,
        targetState.part,
        targetState.isolated,
      );
      if (cameraMoving) {
        camera.position.lerp(desiredCamera, alpha);
        controls.target.lerp(desiredTarget, alpha);
        if (camera.position.distanceTo(desiredCamera) < 0.005) {
          camera.position.copy(desiredCamera);
          controls.target.copy(desiredTarget);
          cameraMoving = false;
        }
      }
      const moved = controls.update(delta);
      renderer.render(scene, camera);
      if (time - lastLabels > 80 || (!separating && !cameraMoving)) {
        positionLabels();
        lastLabels = time;
      }
      if (separating || cameraMoving || moved) invalidate();
    }
    function resize() {
      const width = container!.clientWidth,
        height = container!.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.setViewOffset(width, height, 15, -5, width, height);
      camera.updateProjectionMatrix();
      fit(false);
    }
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    controls.addEventListener("change", invalidate);
    controls.addEventListener("start", () => {
      cameraMoving = false;
    });
    const raycaster = new THREE.Raycaster(),
      pointer = new THREE.Vector2();
    let downX = 0,
      downY = 0,
      downId = -1;
    const pointerDown = (event: PointerEvent) => {
      downX = event.clientX;
      downY = event.clientY;
      downId = event.isPrimary ? event.pointerId : -1;
    };
    const pointerCancel = () => {
      downId = -1;
    };
    const pointerUp = (event: PointerEvent) => {
      if (
        event.pointerId !== downId ||
        Math.hypot(event.clientX - downX, event.clientY - downY) > 5
      )
        return;
      downId = -1;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        (-(event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      const eligible = model.pickables.filter((m) => {
        const assembly = model.assemblies.get(m.userData.part as PartId)!;
        return assembly.group.visible;
      });
      const hit = raycaster.intersectObjects(eligible, false)[0];
      if (hit) pick(hit.object.userData.part as PartId);
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      setError(true);
    };
    const visibilityChanged = () => {
      if (document.hidden && frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      } else invalidate();
    };
    renderer.domElement.addEventListener("pointerdown", pointerDown);
    renderer.domElement.addEventListener("pointerup", pointerUp);
    renderer.domElement.addEventListener("pointercancel", pointerCancel);
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    document.addEventListener("visibilitychange", visibilityChanged);
    controller.current = {
      update(next, nextLabels, reduced, dark) {
        const refit =
          next.separation !== targetState.separation ||
          next.isolated !== targetState.isolated ||
          (next.isolated && next.part !== targetState.part);
        targetState = next;
        showLabels = nextLabels;
        reduce = reduced;
        controls.enableDamping = !reduce;
        model.floorMaterial.color.set(dark ? "#666b65" : "#d2c5a6");
        model.lineMaterial.color.set(dark ? "#c5b68d" : "#9a774a");
        scene.environmentIntensity = dark ? 0.8 : 1;
        if (refit) fit();
        invalidate();
      },
      command(next) {
        if (next.action === "home" || next.action === "top")
          fit(next.action === "top", true);
        if (next.action === "left") {
          cameraMoving = false;
          controls.rotateLeft(Math.PI / 8);
        }
        if (next.action === "right") {
          cameraMoving = false;
          controls.rotateLeft(-Math.PI / 8);
        }
        if (next.action === "in") {
          cameraMoving = false;
          controls.dollyIn(1 / 1.2);
        }
        if (next.action === "out") {
          cameraMoving = false;
          controls.dollyOut(1 / 1.2);
        }
        controls.update();
        invalidate();
      },
    };
    resize();
    ready();
    return () => {
      disposed = true;
      if (frame !== null) cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      model.dispose();
      environment.dispose();
      sun.shadow.dispose();
      renderer.dispose();
      document.removeEventListener("visibilitychange", visibilityChanged);
      renderer.domElement.removeEventListener("pointerdown", pointerDown);
      renderer.domElement.removeEventListener("pointerup", pointerUp);
      renderer.domElement.removeEventListener("pointercancel", pointerCancel);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      renderer.domElement.remove();
      labelContainer.replaceChildren();
      controller.current = null;
    };
  }, []);
  useEffect(() => {
    controller.current?.update(
      state,
      labels,
      reducedMotion,
      resolvedTheme !== "light",
    );
  }, [state, labels, reducedMotion, resolvedTheme]);
  useEffect(() => {
    if (command.sequence) controller.current?.command(command);
  }, [command]);
  return (
    <>
      <div ref={host} className="dw-canvas" data-testid="dwelling-canvas" />
      <div ref={labelHost} className="dw-model-labels" />
      {error && (
        <div className="dw-scene-fallback" role="status">
          <span>3D view unavailable</span>
          <p>
            This browser couldn’t keep the 3D view open. The component
            descriptions, passages and connections are still available below.
          </p>
          <button onClick={() => window.location.reload()}>
            Reload the view
          </button>
        </div>
      )}
    </>
  );
}
