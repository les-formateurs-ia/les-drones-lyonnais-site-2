// Renders the "Livrables" previews of /bureau-detude-drone/ from ONE synthetic site
// (a quarry with benches, a stock yard, a building, a road, trees), so the six previews
// are the same data seen as each deliverable. Illustrations, labelled "Exemple" on the page.
// Runs in Chromium (canvas), driven by scripts/render-deliverables.mjs.

const W = 1200;
const H = 900;
const SX = 300; // metres across the image
const SY = 225; // metres down the image
const PX = SX / W; // metres per pixel

// ---------- Noise ----------
function hash(i, j) {
  let h = Math.imul(i, 374761393) + Math.imul(j, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}
const sm = (t) => t * t * (3 - 2 * t);
function vnoise(x, y) {
  const i = Math.floor(x);
  const j = Math.floor(y);
  const fx = sm(x - i);
  const fy = sm(y - j);
  const a = hash(i, j);
  const b = hash(i + 1, j);
  const c = hash(i, j + 1);
  const d = hash(i + 1, j + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}
function fbm(x, y, oct) {
  let s = 0;
  let a = 0.5;
  let n = 0;
  for (let o = 0; o < oct; o++) {
    s += a * vnoise(x, y);
    n += a;
    x *= 2.03;
    y *= 2.03;
    a *= 0.5;
  }
  return s / n;
}
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smoothstep = (a, b, x) => sm(clamp((x - a) / (b - a), 0, 1));

// ---------- The site (metres) ----------
const PIT = { x: 132, y: 142, rx: 92, ry: 60, depth: 24, benches: 4 };
const YARD = { x0: 200, y0: 108, x1: 300, y1: 225, h: 0 };
const PILES = [
  { x: 242, y: 172, r: 26, h: 10 },
  { x: 272, y: 132, r: 16, h: 6 },
  { x: 222, y: 130, r: 13, h: 4.5 },
];
const BUILDINGS = [
  { x0: 28, y0: 26, x1: 72, y1: 54, wall: 7, ridge: 2.2 },
  { x0: 80, y0: 30, x1: 97, y1: 45, wall: 4.5, ridge: 0 },
];
const ROAD = [
  [-5, 96],
  [64, 88],
  [186, 66],
  [252, 80],
  [284, 128],
  [262, 178],
];
const ROAD_HALF = 4.5;
const SECTION = [
  [24, 126],
  [292, 172],
];

function segDist(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const t = clamp(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy), 0, 1);
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
}
function roadDist(x, y) {
  let d = 1e9;
  for (let i = 1; i < ROAD.length; i++) d = Math.min(d, segDist(x, y, ...ROAD[i - 1], ...ROAD[i]));
  return d;
}

/** Terrain before the works. */
function initial(x, y) {
  return 236 + 9 * (1 - y / SY) + 4 * (x / SX) + 7 * fbm(x / 120 + 3, y / 120 + 7, 4) + 1.2 * fbm(x / 22, y / 22, 3);
}
const PIT_CENTER_H = initial(PIT.x, PIT.y);
// The yard is levelled at its mean natural height (balanced cut and fill).
{
  let sum = 0;
  let n = 0;
  for (let x = YARD.x0; x < YARD.x1; x += 4)
    for (let y = YARD.y0; y < YARD.y1; y += 4) {
      sum += initial(x, y);
      n++;
    }
  YARD.h = sum / n;
}
/** Irregular pit outline: the elliptic distance is warped by noise. */
const pitWarp = (x, y) => 1 + 0.09 * (fbm(x / 38 + 4, y / 38 + 9, 3) - 0.5);
const pitD = (x, y) => Math.hypot((x - PIT.x) / PIT.rx, (y - PIT.y) / PIT.ry) * pitWarp(x, y);
const pitPoint = (a, c) => {
  const x0 = PIT.x + Math.cos(a) * PIT.rx * c;
  const y0 = PIT.y + Math.sin(a) * PIT.ry * c;
  const k = 1 / pitWarp(x0, y0);
  return [PIT.x + Math.cos(a) * PIT.rx * c * k, PIT.y + Math.sin(a) * PIT.ry * c * k];
};
function pitRing(ctx, c) {
  ctx.beginPath();
  for (let a = 0; a < Math.PI * 2; a += 0.02) ctx.lineTo(...pitPoint(a, c));
  ctx.closePath();
}

// Cover codes
const C = { grass: 0, road: 1, face: 2, bench: 3, floor: 4, yard: 5, pile: 6, roof: 7, tree: 8, water: 9 };

/** Ground (DTM) + cover, without buildings and trees. */
function ground(x, y) {
  let h = initial(x, y);
  let cover = C.grass;
  let t = 0;
  // Stock yard, levelled.
  const yx = smoothstep(YARD.x0 - 8, YARD.x0 + 6, x) * smoothstep(YARD.y0 - 8, YARD.y0 + 6, y);
  if (yx > 0) {
    h = lerp(h, YARD.h + 0.4 * fbm(x / 8, y / 8, 2), yx);
    if (yx > 0.5) cover = C.yard;
  }
  // Quarry pit, in benches.
  const d = pitD(x, y);
  if (d < 1) {
    t = 1 - d;
    const w = smoothstep(0, 0.15, t);
    const s = Math.min(t / 0.8, 1) * PIT.benches;
    const k = Math.floor(s);
    const f = s - k;
    const stepped = s >= PIT.benches ? 1 : (k + Math.min(f / 0.3, 1)) / PIT.benches;
    h = lerp(h, PIT_CENTER_H, w) - PIT.depth * stepped;
    if (t >= 0.8) {
      cover = C.floor;
      h += 0.3 * fbm(x / 6, y / 6, 2);
      if (Math.hypot((x - 118) / 16, (y - 150) / 8) < 1) cover = C.water;
    } else cover = f < 0.3 ? C.face : C.bench;
  }
  // Stockpiles.
  for (const p of PILES) {
    const r = Math.hypot(x - p.x, y - p.y);
    if (r < p.r) {
      const q = 1 - r / p.r;
      const hp = p.h * (1 - (1 - q) ** 1.15) * (0.94 + 0.06 * fbm(x / 3, y / 3, 2));
      if (hp > 0.05) {
        h += hp;
        cover = C.pile;
      }
    }
  }
  if (cover !== C.face && cover !== C.bench && cover !== C.floor && cover !== C.water && roadDist(x, y) < ROAD_HALF) cover = C.road;
  return { h, cover, t };
}

function building(x, y) {
  for (const b of BUILDINGS) {
    if (x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1) {
      const cy = (b.y0 + b.y1) / 2;
      const half = (b.y1 - b.y0) / 2;
      return { b, roof: b.wall + b.ridge * (1 - Math.abs(y - cy) / half) };
    }
  }
  return null;
}

// Trees, placed on grass away from the road.
const TREES = [];
for (let n = 0; n < 2600 && TREES.length < 240; n++) {
  const x = rnd() * SX;
  const y = rnd() * SY;
  const g = ground(x, y);
  if (g.cover !== C.grass || building(x, y) || roadDist(x, y) < 9) continue;
  if (fbm(x / 45 + 11, y / 45 + 2, 3) < 0.5) continue;
  const r = 2.6 + rnd() * 3.4;
  if (TREES.some((t) => Math.hypot(t.x - x, t.y - y) < (t.r + r) * 0.8)) continue;
  TREES.push({ x, y, r, h: 8 + rnd() * 7, g: g.h, tone: rnd() });
}
const CELL = 10;
const grid = new Map();
for (const t of TREES) {
  const k = `${Math.floor(t.x / CELL)},${Math.floor(t.y / CELL)}`;
  (grid.get(k) ?? grid.set(k, []).get(k)).push(t);
}
function treeAt(x, y) {
  const cx = Math.floor(x / CELL);
  const cy = Math.floor(y / CELL);
  let best = null;
  for (let i = -1; i <= 1; i++)
    for (let j = -1; j <= 1; j++)
      for (const t of grid.get(`${cx + i},${cy + j}`) ?? []) {
        const r = Math.hypot(x - t.x, y - t.y) / t.r;
        if (r < 1) {
          const top = t.g + t.h * Math.sqrt(1 - r * r) * (0.92 + 0.08 * vnoise(x * 1.3, y * 1.3));
          if (!best || top > best.top) best = { t, r, top };
        }
      }
  return best;
}

// ---------- Rasters (one value per output pixel) ----------
const N = W * H;
const DTM = new Float32Array(N);
const DSM = new Float32Array(N);
const COVER = new Uint8Array(N);
const INIT = new Float32Array(N);
for (let j = 0; j < H; j++)
  for (let i = 0; i < W; i++) {
    const x = (i + 0.5) * PX;
    const y = (j + 0.5) * PX;
    const k = j * W + i;
    const g = ground(x, y);
    DTM[k] = g.h;
    INIT[k] = initial(x, y);
    let s = g.h;
    let c = g.cover;
    const b = building(x, y);
    if (b) {
      s = g.h + b.roof;
      c = C.roof;
    } else if (c === C.grass) {
      const t = treeAt(x, y);
      if (t && t.top > s) {
        s = t.top;
        c = C.tree;
      }
    }
    DSM[k] = s;
    COVER[k] = c;
  }
const at = (A, x, y) => {
  const i = clamp(Math.round(x / PX - 0.5), 0, W - 1);
  const j = clamp(Math.round(y / PX - 0.5), 0, H - 1);
  return A[j * W + i];
};
function shade(A, k, i, j, ex = 2.2) {
  const l = A[j * W + Math.max(0, i - 1)];
  const r = A[j * W + Math.min(W - 1, i + 1)];
  const u = A[Math.max(0, j - 1) * W + i];
  const d = A[Math.min(H - 1, j + 1) * W + i];
  const dx = ((r - l) / (2 * PX)) * ex;
  const dy = ((d - u) / (2 * PX)) * ex;
  const n = Math.hypot(dx, dy, 1);
  // Light from the north-west, 45° up.
  return clamp((dx * 0.5 + dy * 0.5 + 0.707) / n / 1.0, 0, 1.3);
}
function hmin(A) {
  let a = 1e9;
  let b = -1e9;
  for (const v of A) {
    if (v < a) a = v;
    if (v > b) b = v;
  }
  return [a, b];
}

function canvas(w = W, h = H) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

// ---------- Orthophoto ----------
const PALETTE = {
  [C.grass]: [[104, 124, 66], [146, 152, 92]],
  [C.road]: [[132, 128, 120], [158, 154, 146]],
  [C.face]: [[150, 118, 82], [176, 142, 100]],
  [C.bench]: [[196, 170, 128], [214, 192, 150]],
  [C.floor]: [[188, 166, 128], [206, 186, 150]],
  [C.yard]: [[170, 164, 152], [192, 186, 174]],
  [C.pile]: [[208, 198, 178], [226, 218, 200]],
  [C.roof]: [[118, 122, 128], [140, 144, 150]],
  [C.tree]: [[40, 66, 34], [74, 98, 50]],
  [C.water]: [[78, 104, 110], [92, 120, 124]],
};
let ORTHO = null;
function orthoPixels() {
  if (ORTHO) return ORTHO;
  const out = new Uint8ClampedArray(N * 4);
  for (let j = 0; j < H; j++)
    for (let i = 0; i < W; i++) {
      const k = j * W + i;
      const x = (i + 0.5) * PX;
      const y = (j + 0.5) * PX;
      const c = COVER[k];
      const [a, b] = PALETTE[c];
      let n = fbm(x / 9, y / 9, 3) * 0.7 + vnoise(x * 1.7, y * 1.7) * 0.3;
      if (c === C.grass) n = n * 0.6 + fbm(x / 40 + 5, y / 40, 3) * 0.4;
      if (c === C.road) {
        // Tyre tracks.
        const d = roadDist(x, y);
        if (Math.abs(d - 1.6) < 0.45) n -= 0.45;
      }
      if (c === C.roof) {
        const b0 = BUILDINGS.find((bb) => x >= bb.x0 && x <= bb.x1 && y >= bb.y0 && y <= bb.y1);
        const cy = (b0.y0 + b0.y1) / 2;
        n = y < cy || !b0.ridge ? 0.85 : 0.25;
        if (Math.min(x - b0.x0, b0.x1 - x, y - b0.y0, b0.y1 - y) < 0.6) n = 0.05;
        // Roof panels.
        if (((x - b0.x0) % 2.4) < 0.15) n -= 0.12;
      }
      let col = [lerp(a[0], b[0], n), lerp(a[1], b[1], n), lerp(a[2], b[2], n)];
      let s = shade(DSM, k, i, j, c === C.tree ? 1.2 : 2.2);
      if (c === C.tree) {
        const t = treeAt(x, y);
        if (t) s *= 0.75 + 0.35 * (1 - t.r) + 0.2 * (t.t.tone - 0.5);
      }
      // Cast shadows (sun from the north-west).
      const here = DSM[k];
      for (let d = 1; d <= 16; d += 1) {
        if (at(DSM, x - d * 0.7, y - d * 0.7) > here + d * 1.05) {
          s *= 0.55;
          break;
        }
      }
      const grain = 0.94 + 0.12 * hash(i, j);
      const f = (0.5 + 0.62 * s) * grain;
      out[k * 4] = col[0] * f;
      out[k * 4 + 1] = col[1] * f;
      out[k * 4 + 2] = col[2] * f;
      out[k * 4 + 3] = 255;
    }
  return (ORTHO = out);
}
function scaleBar(ctx, x, y, light = true) {
  const len = 50 / PX;
  ctx.save();
  ctx.fillStyle = light ? 'rgba(255,255,255,0.92)' : '#111';
  ctx.strokeStyle = light ? 'rgba(0,0,0,0.5)' : '#111';
  ctx.fillRect(x, y, len / 2, 8);
  ctx.strokeRect(x, y, len, 8);
  ctx.font = '600 15px system-ui, sans-serif';
  ctx.shadowColor = light ? 'rgba(0,0,0,0.6)' : 'transparent';
  ctx.shadowBlur = 3;
  ctx.fillText('0', x - 4, y - 7);
  ctx.fillText('50 m', x + len - 18, y - 7);
  ctx.restore();
}
function north(ctx, x, y, color = '#fff') {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = color === '#fff' ? 3 : 0;
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.lineTo(9, 12);
  ctx.lineTo(0, 5);
  ctx.lineTo(-9, 12);
  ctx.closePath();
  ctx.fill();
  ctx.font = '700 15px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('N', 0, -28);
  ctx.restore();
}
function orthophoto() {
  const c = canvas();
  const ctx = c.getContext('2d');
  ctx.putImageData(new ImageData(orthoPixels(), W, H), 0, 0);
  // Georeferenced grid: crosses every 50 m.
  ctx.strokeStyle = 'rgba(255,255,255,0.75)';
  ctx.lineWidth = 1.5;
  for (let x = 50; x < SX; x += 50)
    for (let y = 50; y < SY; y += 50) {
      const px = x / PX;
      const py = y / PX;
      ctx.beginPath();
      ctx.moveTo(px - 9, py);
      ctx.lineTo(px + 9, py);
      ctx.moveTo(px, py - 9);
      ctx.lineTo(px, py + 9);
      ctx.stroke();
    }
  scaleBar(ctx, 40, H - 40);
  north(ctx, W - 50, 60);
  return c;
}

// ---------- Colour ramps ----------
function ramp(stops, t) {
  t = clamp(t, 0, 1) * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(t));
  const f = t - i;
  return [0, 1, 2].map((k) => lerp(stops[i][k], stops[i + 1][k], f));
}
const HYPSO = [
  [44, 110, 92],
  [102, 158, 96],
  [196, 200, 120],
  [222, 176, 102],
  [176, 112, 72],
  [140, 92, 70],
];
const LIDAR = [
  [48, 18, 160],
  [30, 110, 240],
  [20, 200, 210],
  [70, 220, 90],
  [240, 230, 40],
  [250, 140, 30],
  [230, 40, 40],
];

// ---------- MNT ----------
function contourAlpha(A, k, i, j, step, width) {
  const h = A[k];
  const gx = (A[j * W + Math.min(W - 1, i + 1)] - A[j * W + Math.max(0, i - 1)]) / 2;
  const gy = (A[Math.min(H - 1, j + 1) * W + i] - A[Math.max(0, j - 1) * W + i]) / 2;
  const g = Math.hypot(gx, gy) + 1e-6;
  const d = Math.abs(h - Math.round(h / step) * step) / g;
  return clamp(width - d, 0, 1);
}
function mnt() {
  const c = canvas();
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(W, H);
  const [lo, hi] = hmin(DTM);
  for (let j = 0; j < H; j++)
    for (let i = 0; i < W; i++) {
      const k = j * W + i;
      const col = ramp(HYPSO, (DTM[k] - lo) / (hi - lo));
      const s = 0.45 + 0.65 * shade(DTM, k, i, j, 3);
      const major = contourAlpha(DTM, k, i, j, 5, 1.6);
      const minor = contourAlpha(DTM, k, i, j, 1, 1.0) * 0.55;
      const a = Math.max(major, minor);
      const lineCol = major > minor ? 50 : 70;
      for (let q = 0; q < 3; q++) img.data[k * 4 + q] = lerp(col[q] * s, lineCol, a * 0.85);
      img.data[k * 4 + 3] = 255;
    }
  ctx.putImageData(img, 0, 0);
  // Elevation legend.
  const lx = W - 70;
  const ly = 120;
  const lh = 360;
  ctx.fillStyle = 'rgba(15,18,22,0.72)';
  ctx.fillRect(lx - 24, ly - 46, 86, lh + 80);
  for (let y = 0; y < lh; y++) {
    const col = ramp(HYPSO, 1 - y / lh);
    ctx.fillStyle = `rgb(${col.map(Math.round).join(',')})`;
    ctx.fillRect(lx - 8, ly + y, 16, 1);
  }
  ctx.fillStyle = '#fff';
  ctx.font = '600 14px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Alt. (m)', lx + 14, ly - 22);
  ctx.textAlign = 'left';
  for (let s = 0; s <= 4; s++) {
    const v = hi - ((hi - lo) * s) / 4;
    ctx.fillText(v.toFixed(0), lx + 14, ly + (lh * s) / 4 + 5);
  }
  scaleBar(ctx, 40, H - 40);
  north(ctx, 50, 60);
  return c;
}

// ---------- Volumes ----------
function volumes() {
  const c = canvas();
  const ctx = c.getContext('2d');
  const base = orthoPixels();
  const img = ctx.createImageData(W, H);
  let cut = 0;
  let fill = 0;
  const cell = PX * PX;
  for (let j = 0; j < H; j++)
    for (let i = 0; i < W; i++) {
      const k = j * W + i;
      const g = (base[k * 4] * 0.3 + base[k * 4 + 1] * 0.55 + base[k * 4 + 2] * 0.15) * 0.55 + 105;
      const diff = DTM[k] - INIT[k];
      let col = [g, g, g];
      let a = 0;
      if (diff < -0.3) {
        cut -= diff * cell;
        col = ramp([[255, 214, 120], [242, 120, 50], [190, 40, 40]], -diff / PIT.depth);
        a = 0.82;
      } else if (diff > 0.3) {
        fill += diff * cell;
        col = ramp([[150, 220, 255], [50, 140, 240], [30, 60, 170]], diff / 10);
        a = 0.85;
      }
      for (let q = 0; q < 3; q++) img.data[k * 4 + q] = lerp(g, col[q], a);
      img.data[k * 4 + 3] = 255;
    }
  ctx.putImageData(img, 0, 0);
  // Iso-lines of the difference, every 2 m.
  const D = new Float32Array(N);
  for (let k = 0; k < N; k++) D[k] = DTM[k] - INIT[k];
  const lines = ctx.getImageData(0, 0, W, H);
  for (let j = 1; j < H - 1; j++)
    for (let i = 1; i < W - 1; i++) {
      const k = j * W + i;
      if (Math.abs(D[k]) < 0.5) continue;
      const a = contourAlpha(D, k, i, j, 2, 1.1) * 0.7;
      for (let q = 0; q < 3; q++) lines.data[k * 4 + q] = lerp(lines.data[k * 4 + q], 255, a);
    }
  ctx.putImageData(lines, 0, 0);
  const fmt = (v) => Math.round(v / 10) * 10;
  const nf = new Intl.NumberFormat('fr-FR');
  // Legend.
  ctx.fillStyle = 'rgba(15,18,22,0.82)';
  ctx.fillRect(36, 36, 330, 166);
  ctx.font = '700 15px system-ui, sans-serif';
  ctx.fillStyle = '#fff';
  ctx.fillText('CUBATURES', 58, 68);
  ctx.font = '500 13px system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  ctx.fillText('Référence : état initial', 58, 90);
  ctx.fillStyle = '#e8563a';
  ctx.fillRect(58, 110, 18, 18);
  ctx.fillStyle = '#3a8ff0';
  ctx.fillRect(58, 148, 18, 18);
  ctx.fillStyle = '#fff';
  ctx.font = '600 17px system-ui, sans-serif';
  ctx.fillText('Déblai', 88, 125);
  ctx.fillText('Remblai', 88, 163);
  ctx.textAlign = 'right';
  ctx.font = '700 17px system-ui, sans-serif';
  ctx.fillText(`${nf.format(fmt(cut))} m³`, 344, 125);
  ctx.fillText(`${nf.format(fmt(fill))} m³`, 344, 163);
  ctx.textAlign = 'left';
  ctx.font = '500 12px system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.fillText('Iso-écarts tous les 2 m', 58, 190);
  scaleBar(ctx, 40, H - 40);
  north(ctx, W - 50, 60);
  return c;
}

// ---------- 3D views ----------
function camera(yawDeg, pitchDeg, dist, fovDeg, target = [SX / 2, SY / 2, 244]) {
  const yaw = (yawDeg * Math.PI) / 180;
  const pitch = (pitchDeg * Math.PI) / 180;
  // World: x east, y south (image down), z up. Camera south of the site, looking north.
  const dir = [Math.sin(yaw) * Math.cos(pitch), -Math.cos(yaw) * Math.cos(pitch), -Math.sin(pitch)];
  const pos = [target[0] - dir[0] * dist, target[1] - dir[1] * dist, target[2] - dir[2] * dist];
  const up0 = [0, 0, 1];
  const right = norm(cross(dir, up0));
  const up = cross(right, dir);
  const f = 1 / Math.tan(((fovDeg * Math.PI) / 180) / 2);
  return (x, y, z) => {
    const v = [x - pos[0], y - pos[1], z - pos[2]];
    const zc = dot(v, dir);
    const xc = dot(v, right);
    const yc = dot(v, up);
    return [W / 2 + (xc / zc) * f * (W / 2), H / 2 - (yc / zc) * f * (W / 2), zc];
  };
}
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => {
  const l = Math.hypot(...a);
  return a.map((v) => v / l);
};
const ZEX = 1.6; // vertical exaggeration for the 3D views

function pointCloud() {
  const c = canvas();
  const ctx = c.getContext('2d');
  const bg = ctx.createRadialGradient(W / 2, H * 0.4, 50, W / 2, H / 2, W * 0.75);
  bg.addColorStop(0, '#111a26');
  bg.addColorStop(1, '#04060a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  const proj = camera(-28, 36, 330, 46);
  const [lo, hi] = hmin(DSM);
  const pts = [];
  const add = (x, y, z) => {
    const p = proj(x, y, 236 + (z - 236) * ZEX);
    if (p[2] > 1) pts.push(p[0], p[1], p[2], z);
  };
  for (let y = 0; y < SY; y += 0.42)
    for (let x = 0; x < SX; x += 0.42) {
      const jx = x + (hash(x * 100, y * 100) - 0.5) * 0.4;
      const jy = y + (hash(y * 100, x * 100) - 0.5) * 0.4;
      add(jx, jy, at(DSM, jx, jy));
    }
  // Walls of the buildings.
  for (const b of BUILDINGS) {
    const g = at(DTM, (b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2);
    for (let z = 0; z < b.wall; z += 0.4)
      for (let s = 0; s <= 1; s += 0.008) {
        add(lerp(b.x0, b.x1, s), b.y1, g + z);
        add(b.x0, lerp(b.y0, b.y1, s), g + z);
        add(b.x1, lerp(b.y0, b.y1, s), g + z);
      }
  }
  const n = pts.length / 4;
  const order = new Uint32Array(n).map((_, i) => i);
  order.sort((a, b) => pts[b * 4 + 2] - pts[a * 4 + 2]);
  for (const i of order) {
    const [x, y, z, h] = [pts[i * 4], pts[i * 4 + 1], pts[i * 4 + 2], pts[i * 4 + 3]];
    const col = ramp(LIDAR, (h - lo) / (hi - lo));
    const s = clamp(330 / z, 0.8, 2.2) * 1.15;
    const fade = clamp(1.25 - z / 520, 0.45, 1);
    ctx.fillStyle = `rgba(${col[0] | 0},${col[1] | 0},${col[2] | 0},${fade})`;
    ctx.fillRect(x, y, s, s);
  }
  return c;
}

function model3d() {
  const c = canvas();
  const ctx = c.getContext('2d');
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#2a3442');
  bg.addColorStop(1, '#0e131a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  const ortho = orthoPixels();
  const proj = camera(32, 34, 300, 46, [SX / 2 + 6, SY / 2 + 8, 244]);
  const step = 1.6;
  const nx = Math.floor(SX / step);
  const ny = Math.floor(SY / step);
  const V = [];
  for (let j = 0; j <= ny; j++)
    for (let i = 0; i <= nx; i++) {
      const x = Math.min(SX - 0.01, i * step);
      const y = Math.min(SY - 0.01, j * step);
      const z = at(DSM, x, y);
      V.push({ x, y, z, p: proj(x, y, 236 + (z - 236) * ZEX) });
    }
  const tris = [];
  const idx = (i, j) => j * (nx + 1) + i;
  for (let j = 0; j < ny; j++)
    for (let i = 0; i < nx; i++) {
      const a = V[idx(i, j)];
      const b = V[idx(i + 1, j)];
      const cc = V[idx(i, j + 1)];
      const d = V[idx(i + 1, j + 1)];
      tris.push([a, b, d], [a, d, cc]);
    }
  const L = norm([-0.5, -0.6, 0.8]);
  const depth = (t) => (t[0].p[2] + t[1].p[2] + t[2].p[2]) / 3;
  tris.sort((p, q) => depth(q) - depth(p));
  ctx.lineJoin = 'round';
  for (const t of tris) {
    const [a, b, d] = t;
    const u = [b.x - a.x, b.y - a.y, (b.z - a.z) * ZEX];
    const v = [d.x - a.x, d.y - a.y, (d.z - a.z) * ZEX];
    let nrm = norm(cross(u, v));
    if (nrm[2] < 0) nrm = nrm.map((q) => -q);
    const s = 0.45 + 0.75 * Math.max(0, dot(nrm, L));
    const cx = (a.p[0] + b.p[0] + d.p[0]) / 3;
    const cy = (a.p[1] + b.p[1] + d.p[1]) / 3;
    // Textured on the left, wireframe on the right, a soft split in between.
    const split = clamp((cx - (W * 0.6 + (cy - H / 2) * 0.35)) / 70, 0, 1);
    const ox = clamp(Math.round((a.x + b.x + d.x) / 3 / PX), 0, W - 1);
    const oy = clamp(Math.round((a.y + b.y + d.y) / 3 / PX), 0, H - 1);
    const k = (oy * W + ox) * 4;
    const tex = [ortho[k] * s, ortho[k + 1] * s, ortho[k + 2] * s];
    const dark = [16 * s + 8, 30 * s + 10, 44 * s + 14];
    const col = tex.map((q, n) => lerp(q, dark[n], split) | 0);
    ctx.beginPath();
    ctx.moveTo(a.p[0], a.p[1]);
    ctx.lineTo(b.p[0], b.p[1]);
    ctx.lineTo(d.p[0], d.p[1]);
    ctx.closePath();
    ctx.fillStyle = `rgb(${col.join(',')})`;
    ctx.fill();
    if (split > 0) {
      ctx.strokeStyle = `rgba(120,215,255,${0.55 * split})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    } else {
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }
  return c;
}

// ---------- Plans, coupes et profils ----------
function plans() {
  const c = canvas();
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#f6f5f0';
  ctx.fillRect(0, 0, W, H);
  // Plan frame: 800 × 600 px for 300 × 225 m.
  const P = { x: 30, y: 30, w: 800, h: 600 };
  const s = P.w / SX;
  const img = ctx.getImageData(P.x, P.y, P.w, P.h);
  for (let j = 0; j < P.h; j++)
    for (let i = 0; i < P.w; i++) {
      const si = clamp(Math.round(((i + 0.5) / P.w) * W - 0.5), 1, W - 2);
      const sj = clamp(Math.round(((j + 0.5) / P.h) * H - 0.5), 1, H - 2);
      const k = sj * W + si;
      const major = contourAlpha(DTM, k, si, sj, 5, 2.1);
      const minor = contourAlpha(DTM, k, si, sj, 1, 1.4) * 0.45;
      const a = Math.max(major, minor);
      const o = (j * P.w + i) * 4;
      const col = major >= minor ? [150, 98, 60] : [170, 130, 100];
      for (let q = 0; q < 3; q++) img.data[o + q] = lerp(img.data[o + q], col[q], a);
    }
  ctx.putImageData(img, P.x, P.y);
  ctx.save();
  ctx.beginPath();
  ctx.rect(P.x, P.y, P.w, P.h);
  ctx.clip();
  ctx.translate(P.x, P.y);
  ctx.scale(s, s);
  // Road.
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const roadPath = () => {
    ctx.beginPath();
    ROAD.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  };
  roadPath();
  ctx.strokeStyle = '#2b2b2b';
  ctx.lineWidth = ROAD_HALF * 2 + 0.6;
  ctx.stroke();
  roadPath();
  ctx.strokeStyle = '#f6f5f0';
  ctx.lineWidth = ROAD_HALF * 2 - 0.6;
  ctx.stroke();
  roadPath();
  ctx.setLineDash([3, 3]);
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 0.25;
  ctx.stroke();
  ctx.setLineDash([]);
  // Pit: crest (solid) and toe (dashed) of each bench, with slope hachures.
  for (let k = 0; k < PIT.benches; k++) {
    const dTop = 1 - (0.8 * k) / PIT.benches;
    const dToe = 1 - (0.8 * (k + 0.3)) / PIT.benches;
    ctx.lineWidth = 0.45;
    ctx.strokeStyle = '#1d1d1d';
    pitRing(ctx, dTop);
    ctx.stroke();
    ctx.setLineDash([2, 1.4]);
    pitRing(ctx, dToe);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.lineWidth = 0.25;
    for (let a = 0, n = 0; a < Math.PI * 2; a += 0.045, n++) {
      const len = n % 2 ? 0.5 : 1;
      const d1 = dTop;
      const d2 = lerp(dTop, dToe, len);
      ctx.beginPath();
      ctx.moveTo(...pitPoint(a, d1));
      ctx.lineTo(...pitPoint(a, d2));
      ctx.stroke();
    }
  }
  // Stockpiles: toe circle and hachures.
  for (const p of PILES) {
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 0.2;
    for (let a = 0, n = 0; a < Math.PI * 2; a += 0.12, n++) {
      const r2 = p.r * (n % 2 ? 0.7 : 0.45);
      ctx.beginPath();
      ctx.moveTo(p.x + Math.cos(a) * p.r, p.y + Math.sin(a) * p.r);
      ctx.lineTo(p.x + Math.cos(a) * r2, p.y + Math.sin(a) * r2);
      ctx.stroke();
    }
  }
  // Buildings, hatched.
  for (const b of BUILDINGS) {
    ctx.fillStyle = '#f6f5f0';
    ctx.fillRect(b.x0, b.y0, b.x1 - b.x0, b.y1 - b.y0);
    ctx.save();
    ctx.beginPath();
    ctx.rect(b.x0, b.y0, b.x1 - b.x0, b.y1 - b.y0);
    ctx.clip();
    ctx.lineWidth = 0.18;
    ctx.strokeStyle = '#444';
    for (let d = -60; d < 80; d += 1.6) {
      ctx.beginPath();
      ctx.moveTo(b.x0 + d, b.y0);
      ctx.lineTo(b.x0 + d + 40, b.y0 + 40);
      ctx.stroke();
    }
    ctx.restore();
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = '#111';
    ctx.strokeRect(b.x0, b.y0, b.x1 - b.x0, b.y1 - b.y0);
    if (b.ridge) {
      ctx.lineWidth = 0.3;
      ctx.beginPath();
      ctx.moveTo(b.x0, (b.y0 + b.y1) / 2);
      ctx.lineTo(b.x1, (b.y0 + b.y1) / 2);
      ctx.stroke();
    }
  }
  // Trees: plan symbol.
  ctx.strokeStyle = '#5c7d4a';
  ctx.lineWidth = 0.25;
  for (const t of TREES) {
    ctx.beginPath();
    ctx.arc(t.x, t.y, t.r * 0.8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(t.x, t.y, 0.25, 0, Math.PI * 2);
    ctx.stroke();
  }
  // Section line A–A'.
  const [[ax, ay], [bx, by]] = SECTION;
  ctx.strokeStyle = '#c0392b';
  ctx.lineWidth = 0.6;
  ctx.setLineDash([5, 1.5, 1, 1.5]);
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
  const toPx = (x, y) => [P.x + x * s, P.y + y * s];
  ctx.fillStyle = '#c0392b';
  ctx.font = '700 22px system-ui, sans-serif';
  const [pax, pay] = toPx(ax, ay);
  const [pbx, pby] = toPx(bx, by);
  ctx.fillText('A', pax - 6, pay - 14);
  ctx.fillText('A′', pbx - 30, pby - 14);
  // Spot heights.
  ctx.fillStyle = '#222';
  ctx.font = '500 13px system-ui, sans-serif';
  const spots = [
    [PIT.x, PIT.y + 22],
    [242, 172],
    [150, 40],
    [40, 190],
    [270, 40],
  ];
  for (const [x, y] of spots) {
    const [px, py] = toPx(x, y);
    ctx.fillRect(px - 2, py - 2, 4, 4);
    ctx.fillText(at(DTM, x, y).toFixed(2), px + 6, py + 4);
  }
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(P.x, P.y, P.w, P.h);

  // Right column: north, legend, title block.
  north(ctx, 1000, 80, '#222');
  const lx = 862;
  let ly = 150;
  ctx.font = '700 14px system-ui, sans-serif';
  ctx.fillStyle = '#222';
  ctx.fillText('LÉGENDE', lx, ly);
  const legend = [
    ['line', '#96623c', 'Courbe maîtresse (5 m)'],
    ['line', '#aa8264', 'Courbe intermédiaire (1 m)'],
    ['line', '#1d1d1d', 'Crête de talus'],
    ['dash', '#1d1d1d', 'Pied de talus'],
    ['hatch', '#444', 'Bâti'],
    ['circle', '#5c7d4a', 'Arbre'],
    ['axis', '#c0392b', 'Axe de coupe'],
    ['dot', '#222', 'Point coté'],
  ];
  ctx.font = '500 13px system-ui, sans-serif';
  for (const [type, col, label] of legend) {
    ly += 30;
    ctx.strokeStyle = col;
    ctx.fillStyle = col;
    ctx.lineWidth = 1.5;
    ctx.setLineDash(type === 'dash' ? [5, 3] : type === 'axis' ? [12, 4, 2, 4] : []);
    if (type === 'line' || type === 'dash' || type === 'axis') {
      ctx.beginPath();
      ctx.moveTo(lx, ly - 4);
      ctx.lineTo(lx + 40, ly - 4);
      ctx.stroke();
    } else if (type === 'hatch') {
      ctx.strokeRect(lx, ly - 12, 40, 16);
    } else if (type === 'circle') {
      ctx.beginPath();
      ctx.arc(lx + 20, ly - 4, 8, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.fillRect(lx + 18, ly - 6, 4, 4);
    }
    ctx.setLineDash([]);
    ctx.fillStyle = '#222';
    ctx.fillText(label, lx + 54, ly);
  }
  // Title block.
  const tb = { x: 856, y: 470, w: 314, h: 160 };
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(tb.x, tb.y, tb.w, tb.h);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(tb.x, tb.y + 56);
  ctx.lineTo(tb.x + tb.w, tb.y + 56);
  ctx.moveTo(tb.x, tb.y + 108);
  ctx.lineTo(tb.x + tb.w, tb.y + 108);
  ctx.moveTo(tb.x + 157, tb.y + 108);
  ctx.lineTo(tb.x + 157, tb.y + tb.h);
  ctx.stroke();
  ctx.fillStyle = '#222';
  ctx.font = '800 17px system-ui, sans-serif';
  ctx.fillText('PLAN TOPOGRAPHIQUE', tb.x + 14, tb.y + 26);
  ctx.font = '500 13px system-ui, sans-serif';
  ctx.fillText('Relevé par drone — exemple', tb.x + 14, tb.y + 45);
  ctx.fillText('Système : RGF93 / CC46', tb.x + 14, tb.y + 78);
  ctx.fillText('Altitudes : NGF-IGN69', tb.x + 14, tb.y + 97);
  ctx.fillText('Éch. 1/1 000', tb.x + 14, tb.y + 138);
  ctx.fillText('Équidistance 1 m', tb.x + 171, tb.y + 138);

  // Profile A–A'.
  const R = { x: 90, y: 680, w: 1060, h: 170 };
  const len = Math.hypot(bx - ax, by - ay);
  const prof = [];
  for (let d = 0; d <= len; d += len / 400) {
    const x = ax + ((bx - ax) * d) / len;
    const y = ay + ((by - ay) * d) / len;
    prof.push([d, at(DTM, x, y), at(INIT, x, y)]);
  }
  const zmin = Math.floor(Math.min(...prof.map((p) => p[1])) / 5) * 5 - 5;
  const zmax = Math.ceil(Math.max(...prof.map((p) => Math.max(p[1], p[2]))) / 5) * 5 + 5;
  const px = (d) => R.x + (d / len) * R.w;
  const py = (z) => R.y + R.h - ((z - zmin) / (zmax - zmin)) * R.h;
  ctx.font = '700 14px system-ui, sans-serif';
  ctx.fillStyle = '#c0392b';
  ctx.fillText('PROFIL EN LONG A – A′', R.x, R.y - 16);
  ctx.strokeStyle = '#d8d4c8';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#555';
  ctx.font = '500 12px system-ui, sans-serif';
  for (let z = zmin; z <= zmax; z += 5) {
    ctx.beginPath();
    ctx.moveTo(R.x, py(z));
    ctx.lineTo(R.x + R.w, py(z));
    ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText(`${z}`, R.x - 8, py(z) + 4);
  }
  for (let d = 0; d <= len; d += 50) {
    ctx.beginPath();
    ctx.moveTo(px(d), R.y);
    ctx.lineTo(px(d), R.y + R.h);
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.fillText(`${d} m`, px(d), R.y + R.h + 18);
  }
  ctx.textAlign = 'left';
  // Ground, hatched below.
  ctx.beginPath();
  ctx.moveTo(px(0), R.y + R.h);
  for (const [d, z] of prof) ctx.lineTo(px(d), py(z));
  ctx.lineTo(px(len), R.y + R.h);
  ctx.closePath();
  ctx.save();
  ctx.clip();
  ctx.strokeStyle = 'rgba(150,98,60,0.45)';
  ctx.lineWidth = 1;
  for (let x = R.x - R.h; x < R.x + R.w; x += 8) {
    ctx.beginPath();
    ctx.moveTo(x, R.y + R.h);
    ctx.lineTo(x + R.h, R.y);
    ctx.stroke();
  }
  ctx.restore();
  // Initial terrain, dashed.
  ctx.setLineDash([6, 4]);
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  prof.forEach(([d, , z0], i) => (i ? ctx.lineTo(px(d), py(z0)) : ctx.moveTo(px(d), py(z0))));
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 2;
  ctx.beginPath();
  prof.forEach(([d, z], i) => (i ? ctx.lineTo(px(d), py(z)) : ctx.moveTo(px(d), py(z))));
  ctx.stroke();
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(R.x, R.y, R.w, R.h);
  ctx.fillStyle = '#555';
  ctx.font = '500 12px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('Terrain naturel initial - - -   Terrain actuel ——', R.x + R.w, R.y - 16);
  ctx.textAlign = 'left';
  return c;
}

const RENDERERS = {
  'nuage-de-points': pointCloud,
  orthophoto,
  mnt,
  plans,
  volumes,
  'modele-3d': model3d,
};
window.renderDeliverable = (name) => RENDERERS[name]().toDataURL('image/webp', 0.9);
window.DELIVERABLES = Object.keys(RENDERERS);
