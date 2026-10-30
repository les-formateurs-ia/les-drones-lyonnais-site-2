// Homepage mode: which activity the visitor is looking at (Prestations, Boutique,
// Location, Formations). It lives on html[data-mode], set before paint by BaseLayout
// (from ?mode= or the session) and changed by the hero. CSS does the rest
// ([data-for] in global.css); scripts can listen with onModeChange.
import type { ActivityId } from '../data/site';

export const MODES: ActivityId[] = ['prestations', 'boutique', 'location', 'formations'];
const KEY = 'ldl-mode';
const EVENT = 'ldl:mode';

export const currentMode = () => document.documentElement.dataset.mode as ActivityId;

export function setMode(mode: ActivityId) {
  const html = document.documentElement;
  if (html.dataset.mode === mode || !MODES.includes(mode)) return;
  html.dataset.mode = mode;
  html.classList.add('mode-switched');
  try {
    sessionStorage.setItem(KEY, mode);
  } catch {}
  // Shareable: the link opens the page in the same mode.
  const url = new URL(location.href);
  url.searchParams.set('mode', mode);
  history.replaceState(history.state, '', url);
  dispatchEvent(new CustomEvent(EVENT, { detail: mode }));
}

export function onModeChange(fn: (mode: ActivityId) => void) {
  addEventListener(EVENT, (e) => fn((e as CustomEvent<ActivityId>).detail));
}
