// Downloads the photos listed in `gallery` of each service page
// (src/data/service-pages/<slug>.ts) into src/assets/services/pages/<slug>/NN.webp,
// resized for the web. Photos already downloaded are kept. Re-run after editing a gallery:
//
//   node scripts/import-service-photos.mjs
import { existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import sharp from 'sharp';

const DIR = 'src/data/service-pages';
for (const file of readdirSync(DIR).filter((f) => f.endsWith('.ts'))) {
  const slug = file.replace(/\.ts$/, '');
  const src = readFileSync(`${DIR}/${file}`, 'utf8');
  const list = src.match(/gallery:\s*\[([\s\S]*?)\]/)?.[1];
  if (!list) continue;
  const urls = [...list.matchAll(/'(https?:[^']+)'|"(https?:[^"]+)"/g)].map((m) => m[1] ?? m[2]);
  const out = `src/assets/services/pages/${slug}`;
  mkdirSync(out, { recursive: true });
  for (const [i, url] of urls.entries()) {
    const dest = `${out}/${String(i + 1).padStart(2, '0')}.webp`;
    if (existsSync(dest)) continue;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ${slug}: ${res.status} ${url}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const meta = await sharp(buf).metadata();
    if ((meta.width ?? 0) < 600) {
      console.warn(`  ${slug}: too small (${meta.width}px), skipped ${url}`);
      continue;
    }
    await sharp(buf).rotate().resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest);
    console.log(`  ${slug}: ${dest}`);
  }
}
