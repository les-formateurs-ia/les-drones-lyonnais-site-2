// Seasonal campaign shown at the top of /boutique/ (ShopHero). Edit here; the shop goes
// back to its usual band by itself after `until` (checked at build time and again in the
// browser, so a site built in October still drops it on 1 November).
export const OCTOBRE_ROSE = {
  label: 'Octobre Rose',
  amount: '10 €',
  /** Shown under the amount. Name the association here once it is confirmed. */
  text: 'reversés à une association de lutte contre le cancer du sein pour chaque drone acheté.',
  note: 'Tout le mois d’octobre, sur tous les drones de la boutique.',
  link: { label: 'Voir les drones', href: '/boutique/?filtre=drones#catalogue' },
  /** Last day of the campaign (inclusive), local time. */
  until: '2026-10-31',
};

export const campaignEnd = (until: string) => new Date(`${until}T23:59:59`).getTime();
export const isCampaignOn = (until: string, now = Date.now()) => now <= campaignEnd(until);
