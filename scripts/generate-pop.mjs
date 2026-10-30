// Generates new poses of Pop (the team's samoyed, the site's mascot) with Runware:
// an existing pose is the reference (FLUX.1 Kontext keeps the same dog and harness),
// then the background is removed. Raw results in media-src/pop/, cut-outs in
// src/assets/pop/<name>.webp. Check each result before using it; re-run a pose that
// looks off (a new seed every run).
//
//   node --env-file=.env scripts/generate-pop.mjs conseil   (or no name = all)
//
// Needs RUNWARE_API_KEY in .env (never committed). A few cents per pose.
import { randomUUID } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const API = 'https://api.runware.ai/v1';
const KEY = process.env.RUNWARE_API_KEY;
if (!KEY) throw new Error('RUNWARE_API_KEY is missing (.env).');

const MODEL = process.env.POP_MODEL ?? 'bfl:3@1'; // FLUX.1 Kontext [pro]
const SAME =
  'Keep exactly the same dog: same fluffy white samoyed, same face, same black eyes and nose, same black harness. Photorealistic, soft studio light, plain pure white background, full body visible, no text.';

const POSES = {
  conseil: {
    ref: 'debout',
    prompt: `The dog now sits facing the camera, head slightly tilted, mouth open in a happy smile, one front paw raised as if explaining something. ${SAME}`,
  },
  drone: {
    ref: 'debout',
    prompt: `The dog now sits next to a small grey folding camera drone placed on the floor, one paw resting proudly on the drone, looking at the camera with a happy smile. ${SAME}`,
  },
  clap: {
    ref: 'debout',
    prompt: `The dog now sits facing the camera, holding a classic black and white film clapperboard in its front paws, the clapper open, happy smile, like a film director. The clapperboard has no writing. ${SAME}`,
  },
  ingenieur: {
    ref: 'debout',
    prompt: `The dog now sits facing the camera wearing a yellow construction safety helmet, holding a tablet computer against its chest with one paw, happy smile, like a site engineer. ${SAME}`,
  },
};

const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(POSES);
mkdirSync('media-src/pop', { recursive: true });

const call = async (tasks) => {
  const res = await fetch(API, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(tasks),
  });
  const json = await res.json();
  if (json.errors?.length) throw new Error(JSON.stringify(json.errors));
  return json.data ?? [];
};

for (const name of names) {
  const pose = POSES[name];
  if (!pose) throw new Error(`Unknown pose: ${name}`);
  // Reference: the existing cut-out on white, square.
  const ref = await sharp(`src/assets/pop/${pose.ref}.webp`)
    .resize(1024, 1024, { fit: 'contain', background: '#ffffff' })
    .flatten({ background: '#ffffff' })
    .jpeg({ quality: 95 })
    .toBuffer();
  console.log(`→ ${name}: generating`);
  const [img] = await call([
    {
      taskType: 'imageInference',
      taskUUID: randomUUID(),
      model: MODEL,
      positivePrompt: pose.prompt,
      referenceImages: [`data:image/jpeg;base64,${ref.toString('base64')}`],
      width: 1024,
      height: 1024,
      numberResults: 1,
      outputType: 'URL',
      outputFormat: 'PNG',
      includeCost: true,
    },
  ]);
  const raw = Buffer.from(await (await fetch(img.imageURL)).arrayBuffer());
  writeFileSync(`media-src/pop/${name}.png`, raw);
  console.log(`  image → media-src/pop/${name}.png (cost ${img.cost ?? '?'} $)`);

  const [cut] = await call([
    {
      taskType: 'imageBackgroundRemoval',
      taskUUID: randomUUID(),
      inputImage: `data:image/png;base64,${raw.toString('base64')}`,
      outputType: 'URL',
      outputFormat: 'PNG',
      includeCost: true,
    },
  ]);
  const png = Buffer.from(await (await fetch(cut.imageURL)).arrayBuffer());
  await sharp(png).trim().resize({ height: 900, withoutEnlargement: true }).webp({ quality: 88, alphaQuality: 90 }).toFile(`src/assets/pop/${name}.webp`);
  console.log(`  cut-out → src/assets/pop/${name}.webp (cost ${cut.cost ?? '?'} $)`);
}
