// Turns raw team portrait clips into the light, looping videos the site plays.
//
//   1. Drop the raw clips in media-src/team/, named after the member:
//      dylan.mp4, theo.mov, margot.webm, pop.mp4… (any format ffmpeg reads)
//   2. npm run videos            (add --boomerang to loop by playing forward then back)
//
// Each clip is cropped to a centred square, scaled to 720×720, stripped of sound and
// written as public/team/<name>.webm (VP9) and public/team/<name>.mp4 (H.264, for
// Safari). The homepage picks them up on the next build; until a member has a video,
// their photo stays.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import ffmpeg from 'ffmpeg-static';

const SRC = 'media-src/team';
const OUT = 'public/team';
const SIZE = 720;
const boomerang = process.argv.includes('--boomerang');

if (!existsSync(SRC)) {
  mkdirSync(SRC, { recursive: true });
  console.log(`Created ${SRC}/ — put the raw clips there (dylan.mp4, theo.mp4…) and run again.`);
  process.exit(0);
}
mkdirSync(OUT, { recursive: true });

const clips = readdirSync(SRC).filter((f) => /\.(mp4|mov|m4v|webm|mkv)$/i.test(f));
if (clips.length === 0) console.log(`No clip in ${SRC}/.`);

for (const file of clips) {
  const name = path.parse(file).name.toLowerCase();
  const input = path.join(SRC, file);
  const crop = `crop='min(iw,ih)':'min(iw,ih)',scale=${SIZE}:${SIZE}:flags=lanczos,fps=25,format=yuv420p`;
  const filter = boomerang ? `[0:v]${crop},split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0[v]` : `[0:v]${crop}[v]`;
  const common = ['-y', '-hide_banner', '-loglevel', 'error', '-i', input, '-filter_complex', filter, '-map', '[v]', '-an'];

  console.log(`→ ${file}${boomerang ? ' (boomerang)' : ''}`);
  execFileSync(ffmpeg, [...common, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36', '-row-mt', '1', '-deadline', 'good', `${OUT}/${name}.webm`], { stdio: 'inherit' });
  execFileSync(ffmpeg, [...common, '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-profile:v', 'high', '-movflags', '+faststart', `${OUT}/${name}.mp4`], { stdio: 'inherit' });
  const kb = (f) => Math.round(statSync(f).size / 1024);
  console.log(`  ${OUT}/${name}.webm ${kb(`${OUT}/${name}.webm`)} Ko · ${OUT}/${name}.mp4 ${kb(`${OUT}/${name}.mp4`)} Ko`);
}
