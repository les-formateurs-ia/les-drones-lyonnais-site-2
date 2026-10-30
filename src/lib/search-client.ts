// Client-side search over /recherche.json (loaded once, on first use).
import type { SearchItem } from '../pages/recherche.json';

let index: Promise<SearchItem[]> | null = null;
export const loadIndex = (): Promise<SearchItem[]> => (index ??= fetch('/recherche.json').then((r) => r.json() as Promise<SearchItem[]>));

/** Lowercase, no accents, no punctuation: "DJI Néo 2" → "dji neo 2". */
export const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/** Items whose name (or keywords) contain every word of the query, best first. */
export async function search(query: string, types?: string[], limit = 8): Promise<SearchItem[]> {
  const words = normalize(query).split(' ').filter(Boolean);
  if (!words.length) return [];
  const items = await loadIndex();
  return items
    .filter((it: SearchItem) => !types || types.includes(it.t))
    .map((it: SearchItem) => {
      const name = normalize(it.n);
      const all = `${name} ${normalize(it.k ?? '')}`;
      if (!words.every((w) => all.includes(w))) return null;
      // Name matches first, then matches at the start of a word, then shorter names.
      let score = 0;
      for (const w of words) {
        if (name.includes(w)) score += 2;
        if (name.startsWith(w) || name.includes(` ${w}`)) score += 1;
      }
      return { it, score: score - name.length / 200 };
    })
    .filter((x): x is { it: SearchItem; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.it);
}

export const TYPE_LABEL: Record<string, string> = {
  vente: 'Boutique',
  location: 'Location',
  prestation: 'Prestation',
  formation: 'Formation',
  page: 'Page',
};
