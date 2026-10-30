// Prepares the hero's 3D drone for the web: media-src/drone/mavic-3.glb (Sketchfab,
// "DJI Mavic 3" by llirikslon, CC BY 4.0 — credited in the footer) → public/models/drone.glb.
//   node scripts/prepare-drone.mjs [source.glb]
// - names the four rotors prop_1…prop_4 and their motor bell prop_N_hub, so that
//   lib/hero-drone.ts can spin each propeller around its own motor;
// - compresses geometry (meshopt) and textures (WebP, 1024 px max).
import { NodeIO, getBounds } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, prune, textureCompress, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';
import sharp from 'sharp';
import { statSync } from 'node:fs';

const src = process.argv[2] ?? 'media-src/drone/mavic-3.glb';
const out = 'public/models/drone.glb';

await MeshoptEncoder.ready;
const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });
const doc = await io.read(src);
const root = doc.getRoot();

// The rotors are the parts of the airframe that sit far from its centre.
const airframe = root.listNodes().find((n) => n.listChildren().length >= 6 && n.listChildren().some((c) => c.getName().startsWith('JT')));
if (!airframe) throw new Error('Airframe node not found: is this the Mavic 3 model?');
const box = getBounds(airframe);
const cx = (box.min[0] + box.max[0]) / 2;
const width = box.max[0] - box.min[0];
let n = 0;
for (const part of airframe.listChildren()) {
  const b = getBounds(part);
  const px = (b.min[0] + b.max[0]) / 2;
  if (Math.abs(px - cx) < width * 0.25) continue;
  n++;
  part.setName(`prop_${n}`);
  // The first piece of the rotor is the motor bell, centred on the axis.
  const pieces = part.listChildren()[0]?.listChildren() ?? [];
  pieces[0]?.setName(`prop_${n}_hub`);
}
if (n !== 4) throw new Error(`Expected 4 rotors, found ${n}`);

await doc.transform(
  dedup(),
  prune({ keepLeaves: true }),
  textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [1024, 1024], quality: 88 }),
  meshopt({ encoder: MeshoptEncoder, level: 'medium' }),
);
await io.write(out, doc);
console.log(`${out}: ${(statSync(out).size / 1e6).toFixed(2)} MB (from ${(statSync(src).size / 1e6).toFixed(2)} MB)`);
