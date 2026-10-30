// Product photos at a fixed ratio for cards and decks. Product shots are on white, so
// they are fitted inside (never cropped) on a white background.
import { getImage } from 'astro:assets';
import type { ServicePhoto } from './service-photo';
import { productImages, type Product } from '../data/catalog';

const WIDTHS = [320, 480, 720];

export async function productPhoto(product: Product, ratio = 1, index = 0): Promise<ServicePhoto | null> {
  const img = productImages(product)[index];
  if (!img) return null;
  const crops = await Promise.all(
    WIDTHS.map((w) => getImage({ src: img, width: w, height: Math.round(w / ratio), fit: 'contain', background: '#ffffff', format: 'webp' })),
  );
  return { src: crops[1].src, srcset: crops.map((c, i) => `${c.src} ${WIDTHS[i]}w`).join(', '), width: 480, height: Math.round(480 / ratio) };
}

