// Search index, built at build time and fetched by the search boxes and Pop's chat the
// first time they are used: products (shop and rental), services, trainings and pages.
import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { PRODUCTS, formatPrice, productImages, productUrl } from '../data/catalog';
import { SERVICES } from '../data/services';
import { FORMATIONS, LEVEL_LABEL } from '../data/formations';
import { NAV, SITE } from '../data/site';

export interface SearchItem {
  /** vente | location | prestation | formation | page */
  t: string;
  /** Name */
  n: string;
  /** URL */
  u: string;
  /** Detail line (price, duration…) */
  d?: string;
  /** Thumbnail */
  i?: string;
  /** Extra words to match */
  k?: string;
}

export const GET: APIRoute = async () => {
  const items: SearchItem[] = [];
  for (const p of PRODUCTS) {
    const img = productImages(p)[0];
    const thumb = img ? await getImage({ src: img, width: 96, height: 96, fit: 'contain', background: '#ffffff', format: 'webp' }) : null;
    items.push({
      t: p.kind,
      n: p.name,
      u: productUrl(p),
      d: `${formatPrice(p.priceTTC)} TTC${p.kind === 'location' ? ' / jour' : ''}`,
      i: thumb?.src,
      k: p.categories.join(' '),
    });
  }
  for (const s of SERVICES) items.push({ t: 'prestation', n: s.label, u: s.href, d: s.summary, k: s.family });
  for (const f of FORMATIONS) {
    items.push({ t: 'formation', n: `${f.title}, ${f.scope}`, u: `/formations-drone-a-lyon/#${f.id}`, d: `${LEVEL_LABEL[f.level]}, ${f.duration}`, k: f.family });
  }
  for (const a of NAV) items.push({ t: 'page', n: a.label, u: a.href });
  items.push({ t: 'page', n: 'Contact et devis', u: SITE.contactPath, k: 'devis contact téléphone email' });
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
};
