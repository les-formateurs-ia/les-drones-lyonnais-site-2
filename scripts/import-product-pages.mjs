// Imports the rich content of each product page of the current site (Elementor sections
// written by the team) into src/data/product-pages.json, keyed by product slug:
// documents, "Louer / Acheter ce produit", "Complétez votre équipement", "Découvrez le"
// (text and key figures), "Ce qu'il faut savoir", "Pop vous conseille", "Pour qui ?",
// "Quel permis ?". Run after scripts/import-catalog.mjs:
//
//   node scripts/import-product-pages.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const SITE = 'https://www.lesdroneslyonnais.com';
const products = JSON.parse(readFileSync('src/data/catalog.json', 'utf8'));

const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&rsquo;/g, '’')
    .replace(/&hellip;/g, '…')
    .replace(/&euro;/g, '€');

/** The page as a list of text lines, in reading order. */
function lines(html) {
  let s = html.replace(/<(script|style|svg|noscript|header|nav)[^>]*>[\s\S]*?<\/\1>/g, '');
  s = s.replace(/<img [^>]*src="([^"]+)"[^>]*>/g, '\n[[IMG $1]]\n');
  s = s.replace(/<\/?(p|div|h[1-6]|li|br|tr|td|th|section|ul|ol|button|figure)[^>]*>/g, '\n');
  s = s.replace(/<[^>]+>/g, '');
  const out = [];
  for (let l of decode(s).split('\n')) {
    l = l.replace(/\s+/g, ' ').trim();
    if (l && out[out.length - 1] !== l) out.push(l);
  }
  return out;
}

// Headings are written in capitals on the current site: back to sentence case, keeping
// acronyms, units and references.
const KEEP = /^(DJI|EASA|RTK|CMOS|LIDAR|FPV|HDR|RAW|GPS|4K|6K|8K|STS-0\d|A1|A2|A3|A1\/A3|C\d|BAPD|CATS|BTP|LED|SD|HD|ND|CE|O4\+?|IP\d+|USB-?C?|TTC|HT|RGB|COB|PRS|FTS|MP|EU|RC|SSD|ProRes|Hasselblad)$/i;
function sentence(text) {
  const letters = text.replace(/[^A-Za-zÀ-ÿ]/g, '');
  const upper = letters.replace(/[^A-ZÀ-Þ]/g, '').length / Math.max(letters.length, 1);
  if (upper < 0.6) return text;
  return text
    .split(' ')
    .map((w, i) => {
      const core = w.replace(/[^\wÀ-ÿ/+-]/g, '');
      if (KEEP.test(core) || /\d/.test(core)) return w.replace(/X$/, 'x');
      const lw = w.toLowerCase();
      return i === 0 ? lw.charAt(0).toUpperCase() + lw.slice(1) : lw;
    })
    .join(' ')
    .replace(/\bdji\b/gi, 'DJI');
}
const unquote = (s) => s.replace(/^[«"\s]+|[»«"\s]+$/g, '').trim();

const MARKERS = [/^POP VOUS CONSEILLE/i, /^LA FICHE TECHNIQUE/i, /^POUR QUI ?\?/i, /^Quel Permis ?\?/i, /^CE QU.IL FAUT SAVOIR/i];
const isMarker = (l) => MARKERS.some((re) => re.test(l));
const isUpperHeading = (l) => {
  const letters = l.replace(/[^A-Za-zÀ-ÿ]/g, '');
  return l.length < 70 && letters.length > 1 && letters.replace(/[^A-ZÀ-Þ]/g, '').length / letters.length > 0.75;
};

function anchorHref(html, label) {
  const re = new RegExp(`<a[^>]*href="([^"]*)"[^>]*>(?:(?!</a>)[\\s\\S])*?${label}`, 'i');
  const m = html.match(re);
  return m && m[1] && m[1] !== '#' ? decode(m[1]) : undefined;
}

function parse(html) {
  const all = lines(html);
  const end = all.findIndex((l) => l.includes('Logo-Lyon-Noir'));
  const L = all.slice(0, end < 0 ? all.length : end).filter((l) => !l.startsWith('[[IMG'));
  const at = (re, from = 0) => L.findIndex((l, i) => i >= from && re.test(l));
  const until = (from) => {
    const j = L.findIndex((l, i) => i > from && isMarker(l));
    return j < 0 ? L.length : j;
  };
  const page = {};

  const spec = anchorHref(html, 'Fichier technique');
  const manual = anchorHref(html, 'Manuel utilisateur');
  if (spec || manual) page.docs = { spec, manual };
  const other = anchorHref(html, 'Louer ce produit') ?? anchorHref(html, 'Acheter ce produit');
  if (other) page.other = decodeURIComponent(other.match(/\/produit\/([^/]+)/)?.[1] ?? '') || undefined;

  const cs = at(/^Ajoutez les accessoires/);
  if (cs >= 0) {
    const stop = at(/^Prix des accessoires/, cs);
    page.crossSell = L.slice(cs + 1, stop < 0 ? cs + 12 : stop).filter((l) => !/€/.test(l));
  }

  const disc = at(/^Découvrez le$/i);
  if (disc >= 0) {
    page.discover = { title: L[disc + 1], text: L[disc + 2] && !/NOUS CONTACTER/i.test(L[disc + 2]) ? L[disc + 2] : undefined, stats: [] };
    for (let i = disc + 3; i < L.length - 1 && !/NOUS CONTACTER/i.test(L[i]) && !isMarker(L[i]); i += 2) {
      page.discover.stats.push({ value: L[i], label: L[i + 1] });
    }
  }

  const know = at(/^CE QU.IL FAUT SAVOIR/i);
  if (know >= 0) {
    const block = L.slice(know + 1, until(know));
    const items = [];
    for (let i = 0; i < block.length; i++) {
      if (isUpperHeading(block[i]) && block[i + 1] && !isUpperHeading(block[i + 1])) {
        items.push({ title: sentence(block[i]), text: block[i + 1] });
        i++;
      } else if (isUpperHeading(block[i])) {
        items.push({ title: sentence(block[i]) });
      } else items.push({ text: block[i] });
    }
    if (items.length) page.know = items;
  }

  page.pop = [];
  L.forEach((l, i) => {
    if (/^POP VOUS CONSEILLE/i.test(l) && L[i + 1] && !isMarker(L[i + 1])) page.pop.push(unquote(L[i + 1]));
  });
  if (!page.pop.length) delete page.pop;

  const who = at(/^POUR QUI ?\?/i);
  if (who >= 0) {
    const block = L.slice(who + 1, until(who));
    page.forWho = [];
    for (let i = 0; i + 1 < block.length; i += 2) page.forWho.push({ title: sentence(block[i]), text: block[i + 1] });
  }

  const permis = at(/^Quel Permis ?\?/i);
  if (permis >= 0) {
    const b = L.slice(permis + 1);
    const allows = b.findIndex((l) => /^Ce que la classe/i.test(l));
    const req = b.findIndex((l) => /(NÉCESSAIRE|CONSEILLÉE?) POUR VOLER/i.test(l));
    const form = b.findIndex((l) => /^FORMATION$/i.test(l));
    page.permis = {
      category: b[0],
      cls: b[1],
      scenario: b[3]?.replace(/^Scénario\s*/i, ''),
      allowsTitle: allows >= 0 ? b[allows] : undefined,
      allows: allows >= 0 && req > allows ? b.slice(allows + 3, req) : [],
      requirement: req >= 0 ? sentence(b[req]) : undefined,
      requirementDetail: req >= 0 && b[req + 1] && !/^FORMATION$/i.test(b[req + 1]) ? b[req + 1] : undefined,
      formation: form >= 0 ? { level: b[form + 1], family: b[form + 2], text: b[form + 3] } : undefined,
    };
  }
  return page;
}

const result = {};
const queue = [...products];
let done = 0;
async function worker() {
  for (let p = queue.shift(); p; p = queue.shift()) {
    try {
      const res = await fetch(`${SITE}/produit/${p.slug}/`);
      if (res.ok) result[decodeURIComponent(p.slug)] = parse(await res.text());
    } catch (e) {
      console.warn(`\n${p.slug}: ${e.message}`);
    }
    process.stdout.write(++done % 10 ? '.' : String(done));
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
writeFileSync('src/data/product-pages.json', JSON.stringify(result, null, 1) + '\n');
const count = (k) => Object.values(result).filter((r) => r[k]).length;
console.log(`\n${Object.keys(result).length} pages — docs ${count('docs')}, discover ${count('discover')}, know ${count('know')}, pop ${count('pop')}, forWho ${count('forWho')}, permis ${count('permis')}, crossSell ${count('crossSell')}, other ${count('other')}`);
