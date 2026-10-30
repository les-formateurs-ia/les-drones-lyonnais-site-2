// Business data shared across the site. One source of truth for contact details,
// activities and navigation — pages and components read from here.

export const SITE = {
  name: 'Les Drones Lyonnais',
  url: 'https://www.lesdroneslyonnais.com',
  locale: 'fr_FR',
  city: 'Lyon',
  phone: '04 12 24 03 87',
  phoneHref: 'tel:+33412240387',
  email: 'contact@lesdroneslyonnais.com',
  contactPath: '/contact/',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/les-drones-lyonnais/' },
    { label: 'Instagram', href: 'https://www.instagram.com/lesdroneslyonnais/' },
    { label: 'YouTube', href: 'https://www.youtube.com/@lesdroneslyonnais' },
  ],
} as const;

/** The four activities. `color` is the CSS token of the activity's LDL square. */
export type ActivityId = 'prestations' | 'formations' | 'boutique' | 'location';

export interface Activity {
  id: ActivityId;
  label: string;
  href: string;
  color: string;
}

// URLs are the ones indexed on the current WordPress site.
export const ACTIVITIES: Record<ActivityId, Activity> = {
  prestations: { id: 'prestations', label: 'Prestations', href: '/prestations/', color: 'var(--color-prestations)' },
  formations: { id: 'formations', label: 'Formations', href: '/formations-drone-a-lyon/', color: 'var(--color-formations)' },
  boutique: { id: 'boutique', label: 'Boutique', href: '/boutique/', color: 'var(--color-boutique)' },
  location: { id: 'location', label: 'Location', href: '/location-drone-et-camera/', color: 'var(--color-location)' },
};

export const NAV: Activity[] = [ACTIVITIES.prestations, ACTIVITIES.formations, ACTIVITIES.boutique, ACTIVITIES.location];

// Legal pages: not linked on the current site yet, to be created with the migration.
export const LEGAL = [
  { label: 'Mentions légales', href: '/mentions-legales/' },
  { label: 'Politique de confidentialité', href: '/politique-de-confidentialite/' },
  { label: 'Conditions générales', href: '/conditions-generales/' },
];
