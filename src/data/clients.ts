// Client logos: one file per client in assets/clients, named after the client.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/clients/*.png', { eager: true });

const NAMES: Record<string, string> = {
  aaa: 'Alan Allman Associates',
  'adamis-production': 'Adamis Production',
  'credit-agricole': 'Crédit Agricole',
  'canal-plus': 'Canal+',
  'e-leclerc': 'E.Leclerc',
  'fayat-batiment': 'Fayat Bâtiment',
  'france-frais': 'France Frais',
  'groupe-2-fleuves': 'Groupe 2 Fleuves',
  'la-boutique-officielle': 'La Boutique Officielle',
  'marina-rinaldi': 'Marina Rinaldi',
  'pasino-grand': 'Pasino Grand',
  'saint-jean': 'Saint-Jean',
  cnrs: 'CNRS',
  edf: 'EDF',
  psl: 'Université PSL',
  sncf: 'SNCF',
  tf1: 'TF1',
  c8: 'C8',
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Logos have very different shapes. Giving each the same visual area (not the same
// height) keeps a wide wordmark and a square badge at a comparable weight.
const AREA = 2600;
const MAX_HEIGHT = 56;

export interface ClientLogo {
  img: ImageMetadata;
  name: string;
  /** Display size giving every logo the same visual area. */
  width: number;
  height: number;
}

export const CLIENTS: ClientLogo[] = Object.entries(files)
  .map(([path, mod]) => {
    const slug = path.split('/').pop()!.replace('.png', '');
    const img = mod.default;
    const ratio = img.width / img.height;
    const height = Math.min(MAX_HEIGHT, Math.sqrt(AREA / ratio));
    return { img, name: NAMES[slug] ?? capitalize(slug), width: Math.round(height * ratio), height: Math.round(height) };
  })
  .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
