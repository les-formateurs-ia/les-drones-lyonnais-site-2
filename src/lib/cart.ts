// The shop cart, kept in the browser (localStorage) until the Stripe Worker exists.
// Each line keeps what the drawer shows (name, price, photo, link), written by the page
// that added it. Prices are checked again by the team (later: server side by the Worker).
// Every change fires a `ldl:cart` event on window.

export interface CartItem {
  slug: string;
  name: string;
  /** Price TTC, in euros. */
  price: number;
  url: string;
  image?: string;
}
export interface CartLine extends CartItem {
  qty: number;
}

const KEY = 'ldl-cart';
export const MAX_QTY = 20;

export function lines(): CartLine[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function save(next: CartLine[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode: the cart lives for this page only */
  }
  window.dispatchEvent(new CustomEvent('ldl:cart', { detail: next }));
}

export function add(item: CartItem, qty = 1) {
  const all = lines();
  const line = all.find((l) => l.slug === item.slug);
  if (line) Object.assign(line, item, { qty: Math.min(MAX_QTY, line.qty + qty) });
  else all.unshift({ ...item, qty });
  save(all);
}

export function setQty(slug: string, qty: number) {
  save(qty <= 0 ? lines().filter((l) => l.slug !== slug) : lines().map((l) => (l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)));
}

export const count = (all = lines()) => all.reduce((n, l) => n + l.qty, 0);
export const total = (all = lines()) => all.reduce((n, l) => n + l.qty * l.price, 0);

/** The order request sent to the contact page: ?commande=slug*2,slug2*1 */
export const orderHref = (contact: string, all = lines()) => `${contact}?commande=${encodeURIComponent(all.map((l) => `${l.slug}*${l.qty}`).join(','))}`;
