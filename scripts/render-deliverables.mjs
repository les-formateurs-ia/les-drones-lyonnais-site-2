// Renders the deliverable previews of /bureau-detude-drone/ (nuage de points, orthophoto,
// MNT, plans, volumes, modèle 3D) from one synthetic site, with Playwright's Chromium:
//   node scripts/render-deliverables.mjs [name…]
// → src/assets/deliverables/<name>.webp (1200 × 900). Renderer: scripts/deliverables/renderer.js.
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Playwright is not a project dependency: resolved like require() (global install / NODE_PATH).
const { chromium } = createRequire(import.meta.url)('playwright');
const root = new URL('..', import.meta.url);
const out = new URL('src/assets/deliverables/', root);
await mkdir(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
page.on('pageerror', (e) => console.error(e));
await page.setContent('<!doctype html><meta charset="utf-8"><body></body>');
await page.addScriptTag({ path: fileURLToPath(new URL('scripts/deliverables/renderer.js', root)) });
const names = process.argv.slice(2).length ? process.argv.slice(2) : await page.evaluate(() => window.DELIVERABLES);
for (const name of names) {
  const t = Date.now();
  const url = await page.evaluate((n) => window.renderDeliverable(n), name);
  await writeFile(new URL(`${name}.webp`, out), Buffer.from(url.split(',')[1], 'base64'));
  console.log(`${name}.webp  ${Date.now() - t} ms`);
}
await browser.close();
