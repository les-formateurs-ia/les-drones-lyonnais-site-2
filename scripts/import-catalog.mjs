// Imports the WooCommerce catalogue of the current site into the repo (one-off, re-runnable):
// products, prices, categories, descriptions → src/data/catalog.json, and up to 4 images
// per product → src/assets/products/ (resized to 900 px WebP).
//
//   node scripts/import-catalog.mjs
//
// Uses the public WooCommerce Store API. WooCommerce prices are excluding VAT (HT);
// rentals ("booking" products) are priced per day.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const API = 'https://www.lesdroneslyonnais.com/wp-json/wc/store/v1/products';
const IMG_DIR = 'src/assets/products';
const MAX_IMAGES = 4;
mkdirSync(IMG_DIR, { recursive: true });

const decode = (s = '') =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&hellip;/g, '…');
const text = (html = '') => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
// Whole sentences only, up to about `max` characters.
const firstSentences = (t, max) => {
  let out = '';
  for (const sentence of t.split(/(?<=[.!?])\s/)) {
    if (out && out.length + sentence.length > max) break;
    out = out ? `${out} ${sentence}` : sentence;
  }
  return out;
};
// Keeps paragraphs and list items of the description as plain blocks.
const blocks = (html = '') =>
  [...html.matchAll(/<(p|li|h[2-4])[^>]*>([\s\S]*?)<\/\1>/g)]
    .map(([, tag, inner]) => ({ type: tag === 'li' ? 'li' : tag.startsWith('h') ? 'h' : 'p', text: text(inner) }))
    .filter((b) => b.text.length > 1);
// Sentence case for names written in capitals on the current site.
const tidyName = (name) => {
  const n = decode(name).replace(/\s+/g, ' ').trim();
  const letters = n.replace(/[^A-Za-zÀ-ÿ]/g, '');
  const upper = letters.replace(/[^A-ZÀ-Þ]/g, '').length / Math.max(letters.length, 1);
  if (upper < 0.7) return n;
  const KEEP = /^(DJI|RTK|LED|HDMI|GPS|SD|RC|RC2|FPV|C5|C0|C1|C2|C3|EASA|EU|STS|BAPD|CATS|ND|NEO|LITO|II|III|IV|X1|X4|4K|8K|IP44|PRO|SDR|O4|COB|RGB|USB|UHS|TB51|TB100|TB100C|BS100|RS6765|RS6766)$/;
  return n
    .split(' ')
    .map((w, i) => {
      const core = w.replace(/[^A-Za-z0-9À-ÿ-]/g, '');
      // Acronyms and model references (anything with a digit) stay as written.
      if (KEEP.test(core.replace(/-/g, '')) || /\d/.test(core)) return w;
      const proper = PROPER[core.toLowerCase()];
      if (proper) return w.replace(core, proper);
      return i === 0 ? w.charAt(0) + w.slice(1).toLowerCase() : w.toLowerCase();
    })
    .join(' ');
};
// Brands and model names, written the way their makers write them.
const PROPER = Object.fromEntries(
  'Sony Sigma SmallRig Nanlite Godox Rode Tilta Hollyland Insta360 GoPro Tikee Motorola Behringer Tonor Lilliput Neewer Vertex Sirui NiSi SanDisk Integral Sunnylife PGYTECH BRDRC Kronos Dronavia Zenmuse Mavic Matrice Inspire Avata Mini Neo Lito Air Alpha Mic CrystalSky Pyro Pavotube Athena Vibe D-RTK Thermal Enterprise Combo Fly More Mirage Prime Contemporary Hero12 Black VideoMic U-Phoria Power Goggles Motion Extreme Lyon Lyonnais Drones Les PROSSD Freewell Standard Day Series'
    .split(' ')
    .map((w) => [w.toLowerCase(), w]),
);

let all = [];
for (let page = 1; ; page++) {
  const res = await fetch(`${API}?per_page=100&page=${page}`);
  const batch = await res.json();
  if (!Array.isArray(batch) || batch.length === 0) break;
  all = all.concat(batch);
}
console.log(`${all.length} products`);

const products = [];
for (const p of all) {
  const images = [];
  for (const [i, img] of p.images.slice(0, MAX_IMAGES).entries()) {
    const file = `${p.slug}-${i + 1}.webp`;
    const path = `${IMG_DIR}/${file}`;
    if (!existsSync(path)) {
      try {
        const buf = Buffer.from(await (await fetch(img.src)).arrayBuffer());
        await sharp(buf).resize(900, 900, { fit: 'inside', withoutEnlargement: true }).flatten({ background: '#ffffff' }).webp({ quality: 82 }).toFile(path);
      } catch (e) {
        console.warn(`  image skipped: ${img.src} (${e.message})`);
        continue;
      }
    }
    images.push(file);
  }
  const unit = Number(p.prices.currency_minor_unit ?? 2);
  const ht = Number(p.prices.price || 0) / 10 ** unit;
  products.push({
    slug: p.slug,
    name: tidyName(p.name),
    kind: p.type === 'booking' ? 'location' : 'vente',
    priceHT: Math.round(ht * 100) / 100,
    priceTTC: Math.round(ht * 1.2 * 100) / 100,
    categories: p.categories.map((c) => c.slug),
    summary: text(p.short_description) || firstSentences(text(p.description), 280),
    description: blocks(p.description),
    images,
  });
  process.stdout.write('.');
}
writeFileSync('src/data/catalog.json', JSON.stringify(products, null, 1) + '\n');
console.log(`\nsrc/data/catalog.json — ${products.length} products`);
