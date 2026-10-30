// The shop and rental catalogue, imported from the WooCommerce site
// (scripts/import-catalog.mjs → catalog.json + src/assets/products/).
// Prices are stored excluding VAT (HT), as on the current site; rentals are per day.
import type { ImageMetadata } from 'astro';
import raw from './catalog.json';

export type ProductKind = 'vente' | 'location';

export interface Product {
  slug: string;
  name: string;
  kind: ProductKind;
  priceHT: number;
  priceTTC: number;
  categories: string[];
  summary: string;
  description: { type: 'p' | 'li' | 'h'; text: string }[];
  images: string[];
}

// WooCommerce stores some slugs percent-encoded (″ in a name): decode them so the pages
// are generated at the same URLs as on the current site.
export const PRODUCTS = (raw as Product[]).map((p) => ({ ...p, slug: decodeURIComponent(p.slug) }));
export const productUrl = (p: Product) => `/produit/${p.slug}/`;

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/products/*.webp', { eager: true });
export const productImages = (p: Product) => p.images.map((f) => files[`../assets/products/${f}`]?.default).filter(Boolean) as ImageMetadata[];

const euroWhole = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const euroCents = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
// Whole amounts without decimals (2 099 €), otherwise always two (94,80 €).
const euro = { format: (n: number) => (Number.isInteger(n) ? euroWhole : euroCents).format(n) };
export const formatPrice = (n: number) => euro.format(n).replace(/ /g, ' ');

/** Filters of the shop and the rental pages: a label and the WooCommerce categories it covers. */
export interface Filter {
  id: string;
  label: string;
  match: (p: Product) => boolean;
}
const has = (...cats: string[]) => (p: Product) => cats.some((c) => p.categories.includes(c));

export const SHOP_FILTERS: Filter[] = [
  { id: 'drones', label: 'Drones', match: (p) => has('drones')(p) && !has('kit-c5')(p) },
  { id: 'c5', label: 'Certifiés C5 et kits', match: has('c5', 'kit-c5', 'c6') },
  { id: 'capteurs', label: 'Capteurs et nacelles', match: (p) => p.categories.some((c) => c.startsWith('capteur')) },
  { id: 'batteries', label: 'Batteries et recharge', match: has('batterie') },
  { id: 'accessoires', label: 'Accessoires', match: (p) => has('accessoires', 'accessoires-pieces')(p) && !has('batterie')(p) },
];

export const RENTAL_FILTERS: Filter[] = [
  { id: 'packs', label: 'Packs', match: has('pack') },
  { id: 'drones', label: 'Drones', match: (p) => has('drones')(p) && !has('pack')(p) },
  { id: 'cameras', label: 'Caméras et objectifs', match: (p) => has('camera')(p) && !has('pack')(p) },
  { id: 'audio', label: 'Son', match: has('audio') },
  { id: 'lumiere', label: 'Lumière', match: has('eclairage') },
  { id: 'accessoires', label: 'Accessoires', match: (p) => has('accessoires')(p) && !has('pack', 'eclairage', 'audio', 'camera')(p) },
];

/** EASA drone class shown as a badge on shop drones. */
export const droneClass = (p: Product) => {
  const order = ['c6', 'c5', 'c3', 'c2', 'c1', 'co_c1', 'c0'];
  const c = order.find((k) => p.categories.includes(k));
  return c ? (c === 'co_c1' ? 'C0/C1' : c.toUpperCase()) : null;
};

// Catalogue order: as the filters list them (drones first), then by price, highest first.
const rank = (filters: Filter[]) => (p: Product) => {
  const i = filters.findIndex((f) => f.match(p));
  return i < 0 ? filters.length : i;
};
const ordered = (list: Product[], filters: Filter[]) => [...list].sort((a, b) => rank(filters)(a) - rank(filters)(b) || b.priceTTC - a.priceTTC);

export const forSale = ordered(PRODUCTS.filter((p) => p.kind === 'vente'), SHOP_FILTERS);
export const forRent = ordered(PRODUCTS.filter((p) => p.kind === 'location'), RENTAL_FILTERS);
export const bestSellers = PRODUCTS.filter((p) => p.categories.includes('meilleures-ventes'));

// ---------------------------------------------------------------------------
// Shop mega menu, after the current site's: five tabs of visual category tiles.
// Each tile is also a catalogue filter (?filtre=<tile id>).
const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
const nameHas = (...terms: string[]) => (p: Product) => terms.some((t) => norm(p.name).includes(t));
const isDrone = (p: Product) => p.categories.includes('drones');
const and =
  (...fs: ((p: Product) => boolean)[]) =>
  (p: Product) =>
    fs.every((f) => f(p));
const not = (f: (p: Product) => boolean) => (p: Product) => !f(p);

export interface MenuTile extends Filter {
  text: string;
}
export interface MenuTab {
  id: string;
  label: string;
  title: string;
  tiles: MenuTile[];
}

export const SHOP_MENU: MenuTab[] = [
  {
    id: 'grand-public',
    label: 'Grand public',
    title: 'Drones grand public',
    tiles: [
      { id: 'dji-mini', label: 'DJI Mini', text: 'Moins de 250 g, idéal pour débuter.', match: and(isDrone, nameHas('mini')) },
      { id: 'dji-neo', label: 'DJI Neo', text: 'Ultra-léger, se pilote même à la main.', match: and(isDrone, nameHas('neo')) },
      { id: 'dji-lito', label: 'DJI Lito', text: 'Compact et simple, pour bien démarrer.', match: and(isDrone, nameHas('lito')) },
      { id: 'dji-air', label: 'DJI Air', text: 'Le polyvalent : léger et très bien équipé.', match: and(isDrone, nameHas('air 3')) },
      { id: 'dji-avata', label: 'DJI Avata', text: 'Immersif, pour voler en FPV.', match: and(isDrone, nameHas('avata')) },
      { id: 'dji-mavic', label: 'DJI Mavic', text: 'Trois caméras, qualité d’image de référence.', match: and(isDrone, nameHas('mavic'), not(has('c5'))) },
    ],
  },
  {
    id: 'pro',
    label: 'Drones pro',
    title: 'Drones professionnels',
    tiles: [
      { id: 'mavic-c5', label: 'Mavic 4 Pro C5', text: 'Le Mavic certifié pour les scénarios STS.', match: and(isDrone, nameHas('mavic'), has('c5')) },
      { id: 'matrice-4', label: 'DJI Matrice 4', text: 'Inspection et cartographie, compact et précis.', match: and(isDrone, nameHas('matrice 4e', 'matrice 4t')) },
      { id: 'matrice-400', label: 'DJI Matrice 400', text: 'La plateforme industrielle la plus endurante.', match: and(isDrone, nameHas('matrice 400')) },
      { id: 'inspire-3', label: 'DJI Inspire 3', text: 'Cinéma aérien plein format 8K.', match: and(isDrone, nameHas('inspire 3')) },
    ],
  },
  {
    id: 'reglementation',
    label: 'Par réglementation',
    title: 'Choisir selon la classe du drone',
    tiles: [
      { id: 'classe-c0', label: 'Classe C0', text: 'Moins de 250 g, catégorie Open A1.', match: and(isDrone, has('c0')) },
      { id: 'classe-c1', label: 'Classe C1', text: 'Catégorie Open A1, formation en ligne A1/A3.', match: and(isDrone, has('c1', 'co_c1')) },
      { id: 'classe-c2', label: 'Classe C2', text: 'Catégorie Open A2, certificat A2.', match: and(isDrone, has('c2')) },
      { id: 'classe-c3', label: 'Classe C3', text: 'Catégorie Open A3, loin des personnes.', match: and(isDrone, has('c3')) },
      { id: 'classe-c5', label: 'Classes C5 et C6', text: 'Catégorie Spécifique, scénarios STS.', match: has('c5', 'c6', 'kit-c5') },
    ],
  },
  {
    id: 'capteurs',
    label: 'Capteurs',
    title: 'Capteurs et nacelles',
    tiles: [
      { id: 'capteur-thermographie', label: 'Thermographie', text: 'Détecter les anomalies thermiques.', match: has('capteur-thermographie') },
      { id: 'capteur-inspections', label: 'Inspection', text: 'Observer et contrôler les ouvrages.', match: has('capteur-inspections') },
      { id: 'capteur-modelisation', label: 'Modélisation', text: 'Photogrammétrie et LiDAR.', match: has('capteur-modelisation') },
      { id: 'capteur-positionnement', label: 'Positionnement', text: 'RTK pour une précision centimétrique.', match: has('capteur-positionnement') },
      { id: 'capteur-son-lumiere', label: 'Son et lumière', text: 'Haut-parleurs et projecteurs embarqués.', match: has('capteur-son-lumiere') },
      { id: 'capteur-agriculture', label: 'Agriculture', text: 'Suivi des cultures et interventions.', match: has('capteur-agriculture') },
    ],
  },
  {
    id: 'accessoires',
    label: 'Accessoires',
    title: 'Accessoires et pièces',
    tiles: [
      { id: 'batteries', label: 'Batteries', text: 'Pour voler plus longtemps.', match: and(has('batterie'), nameHas('batterie')) },
      { id: 'recharge', label: 'Recharge', text: 'Hubs et stations de charge.', match: nameHas('hub', 'station de charge', 'station de recharge') },
      { id: 'pilotage', label: 'Pilotage', text: 'Radiocommandes et casques FPV.', match: and(not(isDrone), nameHas('radiocommande', 'goggles', 'rc motion', 'rc pro')) },
      { id: 'stockage', label: 'Stockage', text: 'Cartes mémoire et SSD.', match: nameHas('carte micro', 'prossd') },
      { id: 'terrain', label: 'Sur le terrain', text: 'Pistes, harnais et tours de cou.', match: nameHas('piste', 'harnais', 'tour de cou', 'sangle') },
      { id: 'kit-c5', label: 'Kits C5', text: 'Certifier son drone pour les STS.', match: has('kit-c5') },
    ],
  },
];
export const MENU_TILES = SHOP_MENU.flatMap((t) => t.tiles);

// ---------------------------------------------------------------------------
// Rich content of each product page, imported from the current site
// (scripts/import-product-pages.mjs → product-pages.json).
import pagesRaw from './product-pages.json';

export interface ProductPage {
  docs?: { spec?: string; manual?: string };
  /** Slug of the same product in the other mode (rent ↔ buy). */
  other?: string;
  crossSell?: string[];
  discover?: { title: string; text?: string; stats: { value: string; label: string }[] };
  know?: { title?: string; text?: string }[];
  pop?: string[];
  forWho?: { title: string; text: string }[];
  permis?: {
    category: string;
    cls: string;
    scenario?: string;
    allowsTitle?: string;
    allows: string[];
    requirement?: string;
    requirementDetail?: string;
    formation?: { level: string; family: string; text?: string };
  };
}
const PAGES = pagesRaw as Record<string, ProductPage>;
export const productPage = (p: Product): ProductPage => PAGES[p.slug] ?? {};

const key = (s: string) => norm(s).replace(/[^a-z0-9]+/g, ' ').trim();
/** Products named in "Complétez votre équipement", found in the catalogue. */
export const crossSellOf = (p: Product) =>
  (productPage(p).crossSell ?? []).map((name) => PRODUCTS.find((q) => q.kind === p.kind && key(q.name) === key(name)) ?? PRODUCTS.find((q) => key(q.name) === key(name))).filter((q): q is Product => !!q && q.slug !== p.slug);
export const otherModeOf = (p: Product) => {
  const slug = productPage(p).other;
  return slug && slug !== p.slug ? PRODUCTS.find((q) => q.slug === slug) : undefined;
};

/** Rental: the daily rate goes down with the length of the rental. Placeholder tiers
 *  until the team gives its real grid; the booking estimate uses them too. */
export const RENTAL_TIERS = [
  { from: 1, to: 1, label: '1 jour', discount: 0 },
  { from: 2, to: 2, label: '2 jours', discount: 0.1 },
  { from: 3, to: 4, label: '3 à 4 jours', discount: 0.2 },
  { from: 5, to: 7, label: '5 à 7 jours', discount: 0.3 },
  { from: 8, to: Infinity, label: '8 jours et +', discount: 0.4 },
];
export const tierFor = (days: number) => RENTAL_TIERS.find((t) => days >= t.from && days <= t.to) ?? RENTAL_TIERS[RENTAL_TIERS.length - 1];
/** Daily rate (TTC) for a rental of `days` days, rounded to the cent. */
export const dailyRate = (base: number, days: number) => Math.round(base * (1 - tierFor(days).discount) * 100) / 100;
