// Service photos, cropped at build time so every service picture of a given use shares
// the exact same proportions, whatever the source file: 16:10 by default (screens,
// catalogue cards), 4:5 for the portrait cards of the /prestations/ deck.
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/services/*.jpg', { eager: true });
const WIDTHS = [480, 640, 960, 1280];

export interface ServicePhoto {
  src: string;
  srcset: string;
  width: number;
  height: number;
}

export async function servicePhoto(name: string, ratio = 16 / 10): Promise<ServicePhoto> {
  const mod = files[`../assets/services/${name}`];
  if (!mod) throw new Error(`Missing service photo: src/assets/services/${name}`);
  const crops = await Promise.all(
    WIDTHS.map((w) => getImage({ src: mod.default, width: w, height: Math.round(w / ratio), fit: 'cover', format: 'webp' })),
  );
  return {
    src: crops[2].src,
    srcset: crops.map((c, i) => `${c.src} ${WIDTHS[i]}w`).join(', '),
    width: 960,
    height: Math.round(960 / ratio),
  };
}
