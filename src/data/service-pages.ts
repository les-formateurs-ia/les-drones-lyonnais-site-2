// Content of the 18 service pages (/<slug>/, the URLs indexed on WordPress), one file
// per service in ./service-pages/<slug>.ts, written from the team's current pages
// (typos fixed, headings back to sentence case). The page template is
// src/pages/[service].astro; every block but the hero and the process is optional.
import { SERVICES, type Service } from './services';

export interface Item {
  title: string;
  text?: string;
}

export interface ServicePage {
  /** Same as Service.href without slashes. */
  slug: string;
  /** Meta description (≤ 155 characters). */
  description: string;
  hero: {
    /** Small label above the title, e.g. "Thermographie aérienne et analyse infrarouge". */
    kicker: string;
    /** The h1. */
    title: string;
    /** One strong sentence: the promise. */
    hook: string;
    /** One or two sentences under the hook. */
    intro?: string;
    /** Three short key points (title ≤ 4 words). */
    highlights: Item[];
  };
  /** "Why it matters": a heading, a few paragraphs and a checklist. */
  pitch?: { kicker?: string; title: string; paragraphs: string[]; checklist?: string[] };
  /** Applications, uses or moments covered (3 to 6). */
  uses?: { kicker?: string; title: string; intro?: string; items: Item[] };
  /** Equipment, method or how it works (short list). */
  method?: { kicker?: string; title: string; intro?: string; items: string[] };
  /** What the client receives (3 to 6). */
  deliverables?: { kicker?: string; title: string; items: Item[] };
  /** Who it is for (short labels). */
  audience?: { title: string; items: string[] };
  /** The steps of a mission (3 to 5). */
  process: { title: string; steps: Item[] };
  /** One real (or typical) mission. */
  caseStudy?: {
    title: string;
    /** "Exemple de scénario" or "Une réalisation à la une". */
    label: string;
    brief: string;
    mission: string;
    result: string;
    quote?: string;
  };
  /** Indicative prices, only when the team publishes them. */
  pricing?: { title: string; rows: { label: string; price: string }[]; note?: string };
  /** Reasons to choose the team (3 to 6). */
  reasons?: { title: string; items: Item[] };
  faq?: { q: string; a: string }[];
  /** Hrefs of related services (from SERVICES). */
  related?: string[];
  closing: { title: string; text: string };
  /** Photo URLs of the current page, downloaded by scripts/import-service-photos.mjs. */
  gallery?: string[];
}

const files = import.meta.glob<{ default: ServicePage }>('./service-pages/*.ts', { eager: true });
export const SERVICE_PAGES: ServicePage[] = Object.values(files).map((m) => m.default);

export const slugOf = (s: Service) => s.href.replace(/^\/|\/$/g, '');
export const pageOf = (s: Service) => SERVICE_PAGES.find((p) => p.slug === slugOf(s));
export const serviceOf = (slug: string) => SERVICES.find((s) => slugOf(s) === slug);
