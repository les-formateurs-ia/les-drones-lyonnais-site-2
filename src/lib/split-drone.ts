// A procedural quadcopter, rendered "cut in two" in one canvas:
// - left of the cut, the artistic drone: graphite and gold, warm light, cinema gimbal;
// - right of the cut, the technical drone: blueprint wireframe and outlines.
// The cut follows the border between the two panels of the section (setSplit) and the
// drone stays centred on it; it turns gently towards the pointer and its propellers spin. Three.js is loaded only when
// the section comes near the screen.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export interface SplitDrone {
  /** Position of the cut inside the canvas, 0–1 from the left. */
  setSplit(x: number): void;
  /** Pointer position over the section, -1…1 on each axis. */
  setPointer(x: number, y: number): void;
  setActive(active: boolean): void;
}

const GOLD = 0xaf854a;
const BLUEPRINT = 0x9fd3ff;

function buildDrone(kind: 'art' | 'tech') {
  const drone = new THREE.Group();
  const art = kind === 'art';
  const body = art ? new THREE.MeshStandardMaterial({ color: 0x4a4a50, metalness: 0.45, roughness: 0.3 }) : null;
  const accent = art ? new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0.9, roughness: 0.3 }) : null;
  const dark = art ? new THREE.MeshStandardMaterial({ color: 0x0b0b0c, metalness: 0.3, roughness: 0.6 }) : null;
  const glass = art ? new THREE.MeshStandardMaterial({ color: 0x223344, metalness: 1, roughness: 0.05 }) : null;
  const wire = new THREE.MeshBasicMaterial({ color: BLUEPRINT, wireframe: true, transparent: true, opacity: 0.18 });
  const line = new THREE.LineBasicMaterial({ color: BLUEPRINT, transparent: true, opacity: 0.85 });
  const goldLine = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.55 });
  const props: THREE.Object3D[] = [];

  // In the technical version, every part is a faint wireframe plus crisp outlines.
  const part = (geo: THREE.BufferGeometry, mat: THREE.Material | null, angle = 30) => {
    if (art && mat) {
      // Solid part with a faint gold outline, so it reads over dark photos.
      const g = new THREE.Group();
      g.add(new THREE.Mesh(geo, mat));
      g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, angle), goldLine));
      return g;
    }
    const g = new THREE.Group();
    g.add(new THREE.Mesh(geo, wire));
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, angle), line));
    return g;
  };

  // Body and top shell
  drone.add(part(new RoundedBoxGeometry(1.5, 0.42, 2.1, 4, 0.18), body));
  const shell = part(new RoundedBoxGeometry(1.1, 0.22, 1.5, 4, 0.1), accent);
  shell.position.y = 0.3;
  drone.add(shell);
  const battery = part(new RoundedBoxGeometry(0.8, 0.16, 1.2, 3, 0.06), dark);
  battery.position.set(0, 0.47, -0.05);
  drone.add(battery);

  // Arms, motors, propellers
  for (const [sx, sz] of [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ]) {
    const arm = part(new THREE.CylinderGeometry(0.07, 0.09, 2.2, 10), body, 20);
    arm.rotation.z = Math.PI / 2;
    const armPivot = new THREE.Group();
    armPivot.add(arm);
    armPivot.rotation.y = Math.atan2(sz, sx) * -1;
    arm.position.x = 1.1;
    drone.add(armPivot);

    const end = new THREE.Vector3(sx, 0, sz).normalize().multiplyScalar(2.15);
    const motor = part(new THREE.CylinderGeometry(0.2, 0.22, 0.28, 18), accent, 20);
    motor.position.set(end.x, 0.12, end.z);
    drone.add(motor);

    const prop = new THREE.Group();
    prop.position.set(end.x, 0.3, end.z);
    const blade = part(new RoundedBoxGeometry(1.7, 0.02, 0.16, 2, 0.01), dark);
    prop.add(blade);
    const blade2 = part(new RoundedBoxGeometry(1.7, 0.02, 0.16, 2, 0.01), dark);
    blade2.rotation.y = Math.PI / 2;
    prop.add(blade2);
    prop.userData.dir = sx * sz;
    drone.add(prop);
    props.push(prop);
    // A faint disc where the blades spin.
    if (art) {
      const disc = new THREE.Mesh(
        new THREE.CircleGeometry(0.85, 40),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.05, side: THREE.DoubleSide }),
      );
      disc.rotation.x = -Math.PI / 2;
      disc.position.set(end.x, 0.31, end.z);
      drone.add(disc);
    }

    // Landing legs
    const leg = part(new THREE.CylinderGeometry(0.035, 0.035, 0.7, 8), dark, 20);
    leg.position.set(end.x * 0.35, -0.45, end.z * 0.35);
    drone.add(leg);
  }

  // Gimbal camera
  const gimbal = new THREE.Group();
  gimbal.position.set(0, -0.42, 0.75);
  const yoke = part(new RoundedBoxGeometry(0.5, 0.36, 0.12, 3, 0.04), accent);
  yoke.position.y = -0.05;
  gimbal.add(yoke);
  const cam = part(new RoundedBoxGeometry(0.42, 0.34, 0.42, 4, 0.08), body);
  cam.position.set(0, -0.28, 0.06);
  gimbal.add(cam);
  const lens = part(new THREE.CylinderGeometry(0.11, 0.13, 0.16, 24), glass, 20);
  lens.rotation.x = Math.PI / 2;
  lens.position.set(0, -0.28, 0.3);
  gimbal.add(lens);
  drone.add(gimbal);

  return { drone, props };
}

export function createSplitDrone(canvas: HTMLCanvasElement): SplitDrone {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setScissorTest(true);

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 5.6, 15.5);
  camera.lookAt(0, 0, 0);

  // Artistic scene: warm key light, cool rim, gold bounce.
  const artScene = new THREE.Scene();
  artScene.add(new THREE.HemisphereLight(0xfff1dc, 0x202024, 1.6));
  const key = new THREE.DirectionalLight(0xffd9a8, 3.4);
  key.position.set(-4, 6, 5);
  artScene.add(key);
  const rim = new THREE.DirectionalLight(0xffc98a, 2.2);
  rim.position.set(5, 2, -6);
  artScene.add(rim);
  const art = buildDrone('art');
  artScene.add(art.drone);

  // Technical scene: no light needed.
  const techScene = new THREE.Scene();
  const tech = buildDrone('tech');
  techScene.add(tech.drone);

  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let split = 0.5;
  let target = { x: 0, y: 0 };
  const look = { x: 0, y: 0 };
  let active = false;
  let raf = 0;

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    if (canvas.width !== Math.round(w * renderer.getPixelRatio())) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
  };

  const frame = (now: number) => {
    raf = 0;
    resize();
    const t = now / 1000;
    look.x += (target.x - look.x) * 0.05;
    look.y += (target.y - look.y) * 0.05;
    for (const d of [art, tech]) {
      d.drone.rotation.y = -0.55 + look.x * 0.5 + (still ? 0 : Math.sin(t * 0.4) * 0.08);
      d.drone.rotation.x = 0.08 + look.y * 0.15;
      d.drone.position.y = still ? 0 : Math.sin(t * 1.3) * 0.08;
      if (!still) d.props.forEach((p) => (p.rotation.y += 0.45 * p.userData.dir));
    }
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const cut = Math.round(w * split);
    // Keep the drone centred on the cut, so it is always split in two halves.
    camera.setViewOffset(w, h, (0.5 - split) * w, 0, w, h);
    renderer.setViewport(0, 0, w, h);
    renderer.setScissor(0, 0, cut, h);
    renderer.render(artScene, camera);
    renderer.setScissor(cut, 0, w - cut, h);
    renderer.render(techScene, camera);
    if (active) raf = requestAnimationFrame(frame);
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };

  return {
    setSplit(x) {
      split = Math.max(0, Math.min(1, x));
      kick();
    },
    setPointer(x, y) {
      target = { x, y };
      kick();
    },
    setActive(a) {
      active = a;
      if (a) kick();
    },
  };
}
