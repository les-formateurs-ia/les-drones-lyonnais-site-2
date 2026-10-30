// Photos of one service page: the ones downloaded from its current page
// (scripts/import-service-photos.mjs → src/assets/services/pages/<slug>/), then the
// service's catalogue photo, so every page has at least one.
import type { ImageMetadata } from 'astro';

const pages = import.meta.glob<{ default: ImageMetadata }>('../assets/services/pages/*/*.webp', { eager: true });
const mains = import.meta.glob<{ default: ImageMetadata }>('../assets/services/*.jpg', { eager: true });

export function serviceGallery(slug: string, mainImage: string): ImageMetadata[] {
  const own = Object.entries(pages)
    .filter(([path]) => path.includes(`/pages/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, m]) => m.default);
  const main = mains[`../assets/services/${mainImage}`]?.default;
  return main ? [...own, main] : own;
}
