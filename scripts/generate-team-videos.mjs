// Generates the looping team portrait clips with Runware (Kling 2.5 Turbo Pro,
// image-to-video). The same photo is given as first AND last frame, so each clip loops
// seamlessly. Clips land in media-src/team/, then `npm run videos` encodes them.
//
//   node --env-file=.env scripts/generate-team-videos.mjs dylan theo   (or no name = all)
//
// Needs RUNWARE_API_KEY in .env (never committed). About $0.35 per 5-second clip.
import { randomUUID } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const API = 'https://api.runware.ai/v1';
const KEY = process.env.RUNWARE_API_KEY;
if (!KEY) throw new Error('RUNWARE_API_KEY is missing (.env).');

const MODEL = 'klingai:6@1';
const SIZE = 720;
const STILL =
  'Static camera, locked-off shot, no zoom, no camera movement. Same framing, same lighting, same dark background. Photorealistic, natural and subtle.';
const PEOPLE = {
  dylan: 'Living portrait of this smiling young man. He keeps his eyes open and looks at the camera the whole time, keeps a natural friendly smile, blinks once quickly, breathes calmly and moves his head very slightly. Minimal, realistic motion.',
  theo: 'Living portrait of this smiling young man. He keeps his eyes open and looks at the camera the whole time, blinks once quickly, breathes calmly, keeps a warm smile and moves his head very slightly.',
  margot: 'Living portrait of this smiling young woman. She keeps her eyes open and looks at the camera, keeps her natural smile, blinks once quickly, breathes calmly and moves her head very slightly. Minimal, realistic motion.',
  pop: 'Living portrait of this happy white samoyed dog. It stays in place, pants gently with its tongue out, blinks, and its ears twitch slightly.',
};
const NEGATIVE = 'closed eyes, sleepy, camera movement, zoom, pan, talking, morphing, distorted face, extra limbs, text, watermark, blur';

const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(PEOPLE);
mkdirSync('media-src/team', { recursive: true });

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

// The cut-out photo on the dark background of the site's portrait discs.
async function inputImage(name) {
  const bg = Buffer.from(
    `<svg width="${SIZE}" height="${SIZE}"><defs><radialGradient id="g" cx="50%" cy="32%" r="70%"><stop offset="0" stop-color="#3a3a3a"/><stop offset="0.97" stop-color="#0d0d0d"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`,
  );
  const person = await sharp(`src/assets/team/${name}.webp`).resize(SIZE, SIZE, { fit: 'cover' }).toBuffer();
  const jpg = await sharp(bg).composite([{ input: person }]).jpeg({ quality: 95 }).toBuffer();
  writeFileSync(`media-src/team/${name}-input.jpg`, jpg);
  return `data:image/jpeg;base64,${jpg.toString('base64')}`;
}

for (const name of names) {
  if (!PEOPLE[name]) throw new Error(`Unknown member: ${name}`);
  const image = await inputImage(name);
  const taskUUID = randomUUID();
  console.log(`→ ${name}: submitting`);
  await call([
    {
      taskType: 'videoInference',
      taskUUID,
      model: MODEL,
      positivePrompt: `${PEOPLE[name]} ${STILL}`,
      negativePrompt: NEGATIVE,
      width: SIZE,
      height: SIZE,
      duration: 5,
      CFGScale: 0.6,
      inputs: { frameImages: [{ image, frame: 'first' }, { image, frame: 'last' }] },
      outputType: 'URL',
      outputFormat: 'MP4',
      deliveryMethod: 'async',
      includeCost: true,
    },
  ]);

  // Video takes a minute or two: wait, then poll with backoff.
  let wait = 20000;
  for (;;) {
    await new Promise((r) => setTimeout(r, wait));
    wait = Math.min(wait * 1.3, 30000);
    const [result] = await call([{ taskType: 'getResponse', taskUUID }]);
    if (!result || result.status === 'processing') {
      process.stdout.write(`  processing${result?.progress != null ? ` ${result.progress}%` : ''}…\n`);
      continue;
    }
    if (result.status !== 'success') throw new Error(`${name}: ${JSON.stringify(result)}`);
    const video = await fetch(result.videoURL);
    writeFileSync(`media-src/team/${name}.mp4`, Buffer.from(await video.arrayBuffer()));
    console.log(`  done → media-src/team/${name}.mp4 (cost ${result.cost ?? '?'} $)`);
    break;
  }
}
