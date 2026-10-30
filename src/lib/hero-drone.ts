// The homepage hero: a drone in a studio, in real time (Three.js). Each mode of the page
// gives it a different set, pose and flight:
// - prestations: in flight, camera scanning the ground (beam and rings);
// - boutique: landed on a showroom pedestal, turning slowly, propellers still;
// - location: on a landing pad, propellers idling, ready to take off;
// - formations: flying a figure of eight through training gates.
// Changes are eased every frame towards the new mode, so they can be interrupted at any
// time. The visitor can turn the drone by dragging it; it leans towards the pointer.
//
// The drone is /models/drone.glb (a DJI Mavic 3, prepared by scripts/prepare-drone.mjs),
// with a built-in quadcopter while it loads or if it cannot. Three.js is only loaded once
// the page has painted.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { ActivityId } from '../data/site';

export type Anchor = 'camera' | 'top' | 'arm' | 'leg';

export interface HeroDrone {
  setMode(mode: ActivityId): void;
  /** Pointer over the hero, -1…1 on each axis. */
  setPointer(x: number, y: number): void;
  /** Renders only while active (hero on screen, tab visible). */
  setActive(active: boolean): void;
  /** Screen position of a part of the drone, in px from the canvas' top left. */
  project(anchor: Anchor): { x: number; y: number };
  /** Called after each rendered frame. */
  onFrame(fn: () => void): void;
  /** Whether the real model was loaded (vs the built-in drone). */
  readonly usesModel: boolean;
}

/** The downloaded model: where it is and how to fit it in the scene. */
const MODEL = {
  url: '/models/drone.glb',
  /** Width of the drone, propellers included, in scene units (the built-in one is about 5). */
  size: 5.4,
  /** Turn so that the drone's camera faces +z. */
  rotationY: Math.PI,
  /** Anchors as fractions of the model's bounding box (x, y, z from min to max). */
  anchors: {
    camera: [0.5, 0.12, 0.78],
    top: [0.5, 1, 0.5],
    arm: [0.92, 0.75, 0.9],
    leg: [0.3, 0.02, 0.35],
  } as Record<Anchor, [number, number, number]>,
};

const FLOOR = -1.25;
/** Figure of eight flown in Formations: half-width and half-depth. */
const PATH = { x: 2.3, z: 1.2 };

// ---------------------------------------------------------------- Built-in drone
// A professional quadcopter (inspection type): body with GPS dome, carbon arms,
// motors and two-blade propellers, four legs, triple-lens gimbal under the nose.
function buildDrone() {
  const drone = new THREE.Group();
  const shell = new THREE.MeshPhysicalMaterial({ color: 0x2b2d31, metalness: 0.25, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.18 });
  const matte = new THREE.MeshStandardMaterial({ color: 0x121315, metalness: 0.2, roughness: 0.75 });
  const carbon = new THREE.MeshPhysicalMaterial({ color: 0x1a1b1e, metalness: 0.4, roughness: 0.38, clearcoat: 0.6, clearcoatRoughness: 0.3 });
  const metal = new THREE.MeshStandardMaterial({ color: 0xa7adb4, metalness: 1, roughness: 0.22 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x0a1424, metalness: 0.9, roughness: 0.04, clearcoat: 1 });
  const red = new THREE.MeshStandardMaterial({ color: 0xff2a2a, emissive: 0xff2a2a, emissiveIntensity: 2.5 });
  const green = new THREE.MeshStandardMaterial({ color: 0x2aff6a, emissive: 0x2aff6a, emissiveIntensity: 2.5 });
  const props: THREE.Object3D[] = [];
  const discs: THREE.Mesh[] = [];

  const add = (mesh: THREE.Mesh, parent: THREE.Object3D = drone) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  // Body
  add(new THREE.Mesh(new RoundedBoxGeometry(1.5, 0.5, 2.3, 6, 0.22), shell));
  const top = add(new THREE.Mesh(new RoundedBoxGeometry(1.15, 0.24, 1.7, 6, 0.11), matte));
  top.position.y = 0.32;
  const dome = add(new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), shell));
  dome.scale.set(1, 0.45, 1.25);
  dome.position.set(0, 0.44, -0.25);
  const vents = add(new THREE.Mesh(new RoundedBoxGeometry(0.9, 0.06, 0.5, 2, 0.02), metal));
  vents.position.set(0, 0.45, 0.45);
  const belly = add(new THREE.Mesh(new RoundedBoxGeometry(1.1, 0.2, 1.4, 4, 0.08), matte));
  belly.position.y = -0.3;

  // Blade outline: wide near the hub, thin tip.
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, -0.05);
  bladeShape.bezierCurveTo(0.35, -0.13, 0.75, -0.09, 1.02, -0.02);
  bladeShape.quadraticCurveTo(1.06, 0.02, 1.0, 0.04);
  bladeShape.bezierCurveTo(0.7, 0.06, 0.3, 0.07, 0, 0.05);
  const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, { depth: 0.018, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 2, curveSegments: 16 });
  bladeGeo.rotateX(Math.PI / 2);

  for (const [sx, sz] of [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ]) {
    const dir = new THREE.Vector3(sx, 0, sz).normalize();
    const reach = 2.25;
    const end = dir.clone().multiplyScalar(reach);
    const motorY = 0.22;

    // Arm: a carbon tube from the body to the motor, with a folding joint.
    const armLen = reach - 0.55;
    const arm = add(new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.095, armLen, 16), carbon));
    arm.position.copy(dir.clone().multiplyScalar(0.55 + armLen / 2)).setY(0.1);
    arm.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dir.x, 0.08, dir.z).normalize());
    const joint = add(new THREE.Mesh(new RoundedBoxGeometry(0.28, 0.24, 0.28, 3, 0.06), matte));
    joint.position.copy(dir.clone().multiplyScalar(0.75)).setY(0.06);
    joint.rotation.y = Math.atan2(dir.x, dir.z);

    // Motor
    const motor = add(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.23, 0.3, 32), matte));
    motor.position.set(end.x, motorY, end.z);
    const bell = add(new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.2, 0.1, 32), metal));
    bell.position.set(end.x, motorY + 0.19, end.z);
    // Navigation light under the motor: red at the front, green at the back.
    const led = add(new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 8), sz > 0 ? red : green));
    led.position.set(end.x, motorY - 0.17, end.z);

    // Propeller
    const prop = new THREE.Group();
    prop.position.set(end.x, motorY + 0.27, end.z);
    const hub = add(new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.08, 20), metal), prop);
    hub.position.y = 0.01;
    for (const a of [0, Math.PI]) {
      const blade = add(new THREE.Mesh(bladeGeo, carbon), prop);
      blade.rotation.y = a;
      blade.rotation.x = 0.06 * (a ? -1 : 1);
    }
    prop.rotation.y = Math.random() * Math.PI;
    prop.userData.dir = sx * sz;
    drone.add(prop);
    props.push(prop);
    // Motion blur of the spinning blades.
    const disc = new THREE.Mesh(
      new THREE.RingGeometry(0.12, 1.05, 48),
      new THREE.MeshBasicMaterial({ color: 0xcfd6de, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }),
    );
    disc.rotation.x = -Math.PI / 2;
    disc.position.set(end.x, motorY + 0.28, end.z);
    drone.add(disc);
    discs.push(disc);

    // Leg with a foot.
    const legTop = dir.clone().multiplyScalar(0.62);
    const legFoot = dir.clone().multiplyScalar(1.05);
    const legDir = new THREE.Vector3(legFoot.x - legTop.x, -0.95, legFoot.z - legTop.z);
    const leg = add(new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, legDir.length(), 10), carbon));
    leg.position.set((legTop.x + legFoot.x) / 2, -0.25 - 0.95 / 2, (legTop.z + legFoot.z) / 2);
    leg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), legDir.clone().normalize());
    const foot = add(new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), matte));
    foot.scale.y = 0.6;
    foot.position.set(legFoot.x, -1.2, legFoot.z);
  }

  // Gimbal with a triple-lens camera (wide, zoom, thermal).
  const gimbal = new THREE.Group();
  gimbal.position.set(0, -0.48, 0.8);
  const mount = add(new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.14, 24), metal), gimbal);
  mount.position.y = 0.04;
  const yoke = add(new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.32, 0.12, 3, 0.04), matte), gimbal);
  yoke.position.set(0, -0.15, -0.02);
  const head = add(new THREE.Mesh(new RoundedBoxGeometry(0.52, 0.42, 0.46, 5, 0.1), shell), gimbal);
  head.position.set(0, -0.36, 0.08);
  for (const [x, y, r] of [
    [-0.12, -0.3, 0.075],
    [0.11, -0.3, 0.095],
    [0, -0.47, 0.06],
  ]) {
    const lens = add(new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.15, 0.08, 28), glass), gimbal);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(x, y, 0.33);
    const rim = add(new THREE.Mesh(new THREE.TorusGeometry(r * 1.12, 0.012, 8, 32), metal), gimbal);
    rim.position.set(x, y, 0.37);
  }
  drone.add(gimbal);

  const anchors: Record<Anchor, THREE.Vector3> = {
    camera: new THREE.Vector3(0, -0.95, 1.15),
    top: new THREE.Vector3(0, 0.6, -0.25),
    arm: new THREE.Vector3(1.6, 0.45, 1.6),
    leg: new THREE.Vector3(-0.8, -1.15, 0.75),
  };
  return { drone, props, discs, anchors };
}

// Fits a loaded model: centred, scaled, propellers found by name so they can spin.
function fitModel(root: THREE.Object3D) {
  root.rotation.y = MODEL.rotationY;
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const scale = MODEL.size / Math.max(size.x, size.z);
  root.scale.setScalar(scale);
  root.updateMatrixWorld(true);
  box.setFromObject(root);
  const center = box.getCenter(new THREE.Vector3());
  // Lowest point (feet) on FLOOR when the drone stands at height 0.
  root.position.sub(new THREE.Vector3(center.x, box.min.y - FLOOR, center.z));
  const drone = new THREE.Group();
  drone.add(root);
  drone.updateMatrixWorld(true);
  const fitted = new THREE.Box3().setFromObject(drone);

  const props: THREE.Object3D[] = [];
  const named: THREE.Object3D[] = [];
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) {
      m.castShadow = true;
      m.receiveShadow = true;
    }
    // Rotors are named prop_1…prop_4 by scripts/prepare-drone.mjs.
    if (/^prop_\d+$/.test(o.name)) named.push(o);
  });
  // Spin each rotor around its motor: re-parent it under a pivot on the motor's axis.
  for (const o of named) {
    const parent = o.parent!;
    const hub = o.getObjectByName(`${o.name}_hub`) ?? o;
    const c = new THREE.Box3().setFromObject(hub).getCenter(new THREE.Vector3());
    const pivot = new THREE.Group();
    parent.worldToLocal(c);
    pivot.position.copy(c);
    parent.add(pivot);
    pivot.updateMatrixWorld(true);
    pivot.attach(o);
    pivot.userData.dir = props.length % 2 ? 1 : -1;
    props.push(pivot);
  }

  const at = ([fx, fy, fz]: [number, number, number]) =>
    new THREE.Vector3(
      THREE.MathUtils.lerp(fitted.min.x, fitted.max.x, fx),
      THREE.MathUtils.lerp(fitted.min.y, fitted.max.y, fy),
      THREE.MathUtils.lerp(fitted.min.z, fitted.max.z, fz),
    );
  const anchors = Object.fromEntries(Object.entries(MODEL.anchors).map(([k, v]) => [k, at(v)])) as Record<Anchor, THREE.Vector3>;
  return { drone, props, discs: [] as THREE.Mesh[], anchors };
}

async function loadModel() {
  try {
    const head = await fetch(MODEL.url, { method: 'HEAD' });
    if (!head.ok || (head.headers.get('content-type') ?? '').includes('html')) return null;
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    const gltf = await loader.loadAsync(MODEL.url);
    return fitModel(gltf.scene);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------- Sets
// Landing pad: orange ring, H and ticks, drawn once on a canvas.
function padTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d')!;
  g.translate(256, 256);
  g.strokeStyle = '#ff7a1a';
  g.fillStyle = '#ff7a1a';
  g.lineWidth = 14;
  g.beginPath();
  g.arc(0, 0, 230, 0, Math.PI * 2);
  g.stroke();
  g.lineWidth = 4;
  g.beginPath();
  g.arc(0, 0, 200, 0, Math.PI * 2);
  g.stroke();
  for (let i = 0; i < 48; i++) {
    g.save();
    g.rotate((i / 48) * Math.PI * 2);
    g.fillRect(-2, -244, 4, i % 4 ? 10 : 22);
    g.restore();
  }
  g.font = '700 220px Archivo, system-ui, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('H', 0, 10);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

interface Pose {
  cam: THREE.Vector3;
  look: THREE.Vector3;
  /** Height of the drone above its landed position. */
  lift: number;
  /** Propeller speed, rad/s. */
  spin: number;
  /** Base heading of the drone, rad. */
  yaw: number;
  /** Turntable speed, rad/s. */
  turn: number;
  key: number;
  rim: number;
}

const POSES: Record<ActivityId, Pose> = {
  prestations: { cam: new THREE.Vector3(6.2, 0.6, 9.4), look: new THREE.Vector3(0, 1.05, 0), lift: 1.6, spin: 60, yaw: 0.35, turn: 0, key: 2.6, rim: 3.2 },
  boutique: { cam: new THREE.Vector3(0, 2.6, 11), look: new THREE.Vector3(0, -0.15, 0), lift: 0.3, spin: 0, yaw: 0.6, turn: 0.28, key: 3.4, rim: 2.2 },
  location: { cam: new THREE.Vector3(-6.5, 6.4, 8.2), look: new THREE.Vector3(0, -0.6, 0), lift: 0.04, spin: 14, yaw: -0.5, turn: 0, key: 3, rim: 2.4 },
  formations: { cam: new THREE.Vector3(0, 5, 15.5), look: new THREE.Vector3(0, 0.4, 0), lift: 1.4, spin: 55, yaw: 0, turn: 0, key: 2.8, rim: 2.8 },
};
const ACCENTS: Record<ActivityId, number> = { prestations: 0x3f6bff, boutique: 0xffffff, location: 0xff7a1a, formations: 0x5fd04c };
const MODE_IDS: ActivityId[] = ['prestations', 'boutique', 'location', 'formations'];

// ---------------------------------------------------------------- Scene
export async function createHeroDrone(canvas: HTMLCanvasElement, initial: ActivityId): Promise<HeroDrone> {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.7;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

  // Lights: soft sky, a key light casting the shadow, a rim light in the mode's colour.
  scene.add(new THREE.HemisphereLight(0xffffff, 0x101014, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 3);
  key.position.set(-5, 9, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = key.shadow.camera.bottom = -6;
  key.shadow.camera.right = key.shadow.camera.top = 6;
  key.shadow.radius = 6;
  key.shadow.bias = -0.0005;
  scene.add(key);
  const rim = new THREE.DirectionalLight(ACCENTS[initial], 3);
  rim.position.set(6, 3, -7);
  scene.add(rim);
  const glow = new THREE.PointLight(ACCENTS[initial], 6, 12, 1.6);
  glow.position.set(0, -0.6, 2.5);
  scene.add(glow);

  // Floor: only the shadow and a fading grid in the mode's colour.
  const floor = new THREE.Mesh(new THREE.CircleGeometry(14, 64), new THREE.ShadowMaterial({ opacity: 0.5 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = FLOOR;
  floor.receiveShadow = true;
  scene.add(floor);
  const grid = new THREE.GridHelper(28, 56, ACCENTS[initial], ACCENTS[initial]);
  const gridMat = grid.material as THREE.LineBasicMaterial;
  gridMat.transparent = true;
  gridMat.opacity = 0.1;
  gridMat.depthWrite = false;
  grid.position.y = FLOOR + 0.002;
  scene.add(grid);

  // Prestations: scanning beam from the camera to the ground, rings spreading on it.
  const scan = new THREE.Group();
  const beamMat = new THREE.MeshBasicMaterial({ color: ACCENTS.prestations, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const beam = new THREE.Mesh(new THREE.ConeGeometry(1.6, 1, 48, 1, true), beamMat);
  scan.add(beam);
  const rings = [0, 1, 2].map(() => {
    const r = new THREE.Mesh(
      new THREE.RingGeometry(0.96, 1, 96),
      new THREE.MeshBasicMaterial({ color: ACCENTS.prestations, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    r.rotation.x = -Math.PI / 2;
    r.position.y = FLOOR + 0.01;
    scan.add(r);
    return r;
  });
  scene.add(scan);

  // Boutique: glossy pedestal with a light ring.
  const pedestal = new THREE.Group();
  const pedMat = new THREE.MeshPhysicalMaterial({ color: 0x000000, metalness: 0.5, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.1, envMapIntensity: 0.35, transparent: true });
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(3, 3.15, 0.3, 96), pedMat);
  ped.position.y = FLOOR + 0.15;
  ped.receiveShadow = true;
  pedestal.add(ped);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
  const lightRing = new THREE.Mesh(new THREE.TorusGeometry(3.08, 0.02, 8, 160), ringMat);
  lightRing.rotation.x = Math.PI / 2;
  lightRing.position.y = FLOOR + 0.3;
  pedestal.add(lightRing);
  scene.add(pedestal);

  // Location: landing pad.
  const padMat = new THREE.MeshBasicMaterial({ map: padTexture(), transparent: true, opacity: 0, depthWrite: false });
  const pad = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 6.4), padMat);
  pad.rotation.x = -Math.PI / 2;
  pad.position.y = FLOOR + 0.006;
  scene.add(pad);

  // Formations: two gates on the figure-of-eight, and markers on the ground.
  const gates = [-1, 1].map((side) => {
    const g = new THREE.Mesh(
      new THREE.TorusGeometry(1.05, 0.045, 16, 96),
      new THREE.MeshStandardMaterial({ color: ACCENTS.formations, emissive: ACCENTS.formations, emissiveIntensity: 1.6, transparent: true, opacity: 0 }),
    );
    g.position.set(side * PATH.x, 1.3, 0);
    g.castShadow = true;
    scene.add(g);
    return g;
  });

  // Drone: the model, or the built-in one if it cannot load. The canvas only shows once
  // this is settled, so the visitor never sees one drone replaced by another.
  const droneRoot = new THREE.Group();
  scene.add(droneRoot);
  const model = await loadModel();
  const usesModel = !!model;
  const drone = model ?? buildDrone();
  droneRoot.add(drone.drone);
  const anchorObjects = {} as Record<Anchor, THREE.Object3D>;
  for (const k of Object.keys(drone.anchors) as Anchor[]) {
    anchorObjects[k] = new THREE.Object3D();
    anchorObjects[k].position.copy(drone.anchors[k]);
    drone.drone.add(anchorObjects[k]);
  }

  // ------------------------------------------------------------ State
  let mode = initial;
  const p0 = POSES[initial];
  const cur = {
    cam: p0.cam.clone(),
    look: p0.look.clone(),
    lift: p0.lift,
    spin: p0.spin,
    key: p0.key,
    rim: p0.rim,
    accent: new THREE.Color(ACCENTS[initial]),
    // How present each set is, 0…1.
    sets: Object.fromEntries(MODE_IDS.map((m) => [m, m === initial ? 1 : 0])) as Record<ActivityId, number>,
  };
  let yaw = p0.yaw;
  let yawVel = 0; // from dragging, rad/s
  let roll = 0; // bank after a mode switch
  let pathT = 0;
  let pointer = { x: 0, y: 0 };
  const lean = { x: 0, y: 0 };
  let active = false;
  let raf = 0;
  let last = 0;
  const listeners: (() => void)[] = [];

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return { w, h };
    if (canvas.width !== Math.round(w * renderer.getPixelRatio()) || canvas.height !== Math.round(h * renderer.getPixelRatio())) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    return { w, h };
  };

  const tmp = new THREE.Vector3();
  const frame = (now: number) => {
    raf = 0;
    const { w, h } = resize();
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
    last = now;
    const t = now / 1000;
    const target = POSES[mode];
    // Exponential easing: frame-rate independent and interruptible.
    const k = still ? 1 : 1 - Math.exp(-dt * 2.6);
    const kf = still ? 1 : 1 - Math.exp(-dt * 4);

    cur.cam.lerp(target.cam, k);
    cur.look.lerp(target.look, k);
    cur.lift += (target.lift - cur.lift) * k;
    cur.spin += (target.spin - cur.spin) * kf;
    cur.key += (target.key - cur.key) * k;
    cur.rim += (target.rim - cur.rim) * k;
    cur.accent.lerp(tmpColor.setHex(ACCENTS[mode]), kf);
    for (const m of MODE_IDS) cur.sets[m] += ((m === mode ? 1 : 0) - cur.sets[m]) * kf;

    // Camera: further away on narrow screens so the whole drone fits.
    const fit = Math.max(1, 1.15 / Math.max(camera.aspect, 0.3)) ** 0.85;
    camera.position.copy(cur.look).add(tmp.copy(cur.cam).sub(cur.look).multiplyScalar(fit));
    lean.x += (pointer.x - lean.x) * (still ? 1 : 1 - Math.exp(-dt * 3));
    lean.y += (pointer.y - lean.y) * (still ? 1 : 1 - Math.exp(-dt * 3));
    camera.position.x += lean.x * 0.6;
    camera.position.y += -lean.y * 0.4;
    camera.lookAt(cur.look);
    // Wide screens: the copy is on the left, so the drone sits a little right of centre.
    const shift = w > 1100 ? 0.08 : 0;
    if (shift) camera.setViewOffset(w, h, -w * shift, 0, w, h);
    else camera.clearViewOffset();

    // Heading: base pose, turntable, dragging (with inertia).
    if (!still) {
      yaw += (target.turn * cur.sets.boutique + yawVel) * dt;
      yawVel *= Math.exp(-dt * 2.5);
    }
    // Back to the mode's heading once the visitor lets go (not on the turntable).
    if (!target.turn && Math.abs(yawVel) < 0.05) yaw += angleTo(yaw, target.yaw) * k;

    // Flight: hover wobble, and the figure of eight in Formations.
    const fly = cur.sets.formations;
    if (!still) pathT += dt * 0.55 * fly;
    const s = pathT;
    const px = PATH.x * Math.sin(s) * fly;
    const pz = PATH.z * Math.sin(2 * s) * fly;
    const vx = PATH.x * Math.cos(s);
    const vz = 2 * PATH.z * Math.cos(2 * s);
    const hover = still ? 0 : Math.sin(t * 1.6) * 0.06 * Math.min(1, cur.lift);
    droneRoot.position.set(px, cur.lift + hover, pz);
    const pathYaw = Math.atan2(vx, vz);
    const heading = yaw + angleTo(yaw, pathYaw) * fly;
    roll *= Math.exp(-dt * 2.2);
    droneRoot.rotation.set(
      0.05 * Math.min(1, cur.lift) + lean.y * 0.06 + (still ? 0 : Math.sin(t * 1.1) * 0.02) + 0.12 * fly,
      heading,
      roll - lean.x * 0.08 * Math.min(1, cur.lift) - Math.sin(s) * 0.25 * fly,
      'YXZ',
    );

    // Propellers, and their blur once they spin fast.
    if (!still) for (const p of drone.props) p.rotation.y += cur.spin * dt * p.userData.dir;
    const blur = THREE.MathUtils.smoothstep(cur.spin, 10, 45);
    for (const d of drone.discs) (d.material as THREE.MeshBasicMaterial).opacity = blur * 0.1;

    // Lights and sets.
    key.intensity = cur.key;
    rim.intensity = cur.rim;
    rim.color.copy(cur.accent);
    glow.color.copy(cur.accent);
    gridMat.color.copy(cur.accent);
    gridMat.opacity = 0.05 + 0.07 * (1 - cur.sets.boutique);

    // The beam starts at the drone's camera.
    const sc = cur.sets.prestations;
    droneRoot.updateMatrixWorld();
    const lens = anchorObjects.camera.getWorldPosition(tmp);
    const height = Math.max(0.01, lens.y - FLOOR);
    beam.scale.set(1, height, 1);
    beam.position.set(lens.x, FLOOR + height / 2, lens.z);
    beamMat.opacity = 0.07 * sc;
    beamMat.color.copy(cur.accent);
    rings.forEach((r, i) => {
      const phase = still ? (i + 1) / 4 : (t * 0.35 + i / 3) % 1;
      r.scale.setScalar(0.4 + phase * 3.2);
      r.position.x = lens.x;
      r.position.z = lens.z;
      (r.material as THREE.MeshBasicMaterial).opacity = (1 - phase) * 0.55 * sc;
      (r.material as THREE.MeshBasicMaterial).color.copy(cur.accent);
    });

    const sb = cur.sets.boutique;
    pedMat.opacity = sb;
    ped.visible = sb > 0.01;
    ped.position.y = FLOOR + 0.15 - (1 - sb) * 0.35;
    ringMat.opacity = sb * (0.75 + (still ? 0 : Math.sin(t * 2) * 0.15));
    lightRing.position.y = ped.position.y + 0.15;

    padMat.opacity = cur.sets.location * 0.9;
    pad.scale.setScalar(0.85 + 0.15 * cur.sets.location);

    gates.forEach((g, i) => {
      const m = g.material as THREE.MeshStandardMaterial;
      m.opacity = fly;
      g.visible = fly > 0.01;
      g.position.y = 1.3 + (1 - fly) * -1.5;
      g.rotation.y = (i ? -1 : 1) * 0.08;
    });

    renderer.render(scene, camera);
    listeners.forEach((fn) => fn());
    if (active && w && h) raf = requestAnimationFrame(frame);
  };
  const tmpColor = new THREE.Color();
  const kick = () => {
    if (!raf) {
      last = 0;
      raf = requestAnimationFrame(frame);
    }
  };

  // Drag to turn the drone.
  let dragging: { x: number; t: number } | null = null;
  canvas.addEventListener('pointerdown', (e) => {
    dragging = { x: e.clientX, t: performance.now() };
    canvas.setPointerCapture(e.pointerId);
    canvas.dataset.dragging = '';
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - dragging.x;
    const d = Math.max(1, now - dragging.t);
    yaw += dx * 0.008;
    yawVel = THREE.MathUtils.clamp((dx * 0.008) / (d / 1000), -6, 6);
    dragging = { x: e.clientX, t: now };
    kick();
  });
  const endDrag = () => {
    dragging = null;
    delete canvas.dataset.dragging;
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  const projected = new THREE.Vector3();
  return {
    usesModel,
    setMode(m) {
      if (m === mode) return;
      // A little bank as the drone changes its mind.
      roll += (MODE_IDS.indexOf(m) > MODE_IDS.indexOf(mode) ? -1 : 1) * 0.35;
      mode = m;
      kick();
    },
    setPointer(x, y) {
      pointer = { x, y };
      kick();
    },
    setActive(a) {
      active = a;
      if (a) kick();
    },
    project(anchor) {
      anchorObjects[anchor].getWorldPosition(projected).project(camera);
      return { x: ((projected.x + 1) / 2) * canvas.clientWidth, y: ((1 - projected.y) / 2) * canvas.clientHeight };
    },
    onFrame(fn) {
      listeners.push(fn);
    },
  };
}

/** Shortest signed angle from a to b. */
function angleTo(a: number, b: number) {
  return Math.atan2(Math.sin(b - a), Math.cos(b - a));
}
