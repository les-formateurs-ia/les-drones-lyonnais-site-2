// The four "modes" of the homepage: the hero's drone switches between them and the
// whole page follows (texts, highlighted offers, calls to action, accent colour).
// Copy comes from the activity pages; the highlighted items come from the shared data
// (services, catalogue, formations), so they stay in sync with the rest of the site.
import { ACTIVITIES, SITE, type ActivityId } from './site';
import { SERVICES } from './services';
import { FORMATIONS } from './formations';
import { pick } from '../lib/pick';

export const MODE_ORDER: ActivityId[] = ['prestations', 'boutique', 'location', 'formations'];
export const DEFAULT_MODE: ActivityId = 'prestations';

export interface ModeLink {
  label: string;
  href: string;
  /** Opens Pop with this question instead of following the link. */
  popAsk?: string;
}

/** A label pinned to a part of the drone in the 3D view. */
export interface Callout {
  /** Part of the drone it points at. */
  anchor: 'camera' | 'top' | 'arm' | 'leg';
  title: string;
  text: string;
}

export interface Mode {
  id: ActivityId;
  label: string;
  href: string;
  /** Bright version of the activity colour, readable on black (glows, rules, squares). */
  accent: string;
  /** Short line in the mode selector. */
  hint: string;
  kicker: string;
  title: string;
  text: string;
  cta: ModeLink;
  secondary: ModeLink;
  callouts: Callout[];
  /** Status line of the flight display. */
  status: string;
  /** Section under the hero. */
  focus: { title: string; text: string; more: ModeLink };
  /** Closing band. */
  closing: { title: string; text: string };
  pop: string;
}

export const MODES: Record<ActivityId, Mode> = {
  prestations: {
    id: 'prestations',
    label: ACTIVITIES.prestations.label,
    href: ACTIVITIES.prestations.href,
    accent: '#3f6bff',
    hint: 'Inspection, 3D, tournage',
    kicker: 'Prestations par drone',
    title: 'Vos images et vos données, vues du ciel',
    text: 'Inspection thermique, relevés 3D, suivi de chantier, tournages cinéma et événements : nos pilotes interviennent depuis Lyon, partout en France.',
    cta: { label: 'Demander un devis', href: SITE.contactPath },
    secondary: { label: 'Voir les prestations', href: ACTIVITIES.prestations.href },
    callouts: [
      { anchor: 'camera', title: 'Caméra thermique', text: 'Anomalies localisées, rapport illustré' },
      { anchor: 'top', title: 'Relevés 3D', text: 'Topographie et modélisation' },
      { anchor: 'arm', title: 'Cinéma 4K', text: 'Tournages et événements' },
    ],
    status: 'En mission',
    focus: {
      title: 'Les prestations les plus demandées',
      text: 'Techniques ou artistiques, chaque mission est préparée, pilotée et livrée par la même équipe.',
      more: { label: 'Toutes les prestations', href: ACTIVITIES.prestations.href },
    },
    closing: {
      title: 'Un projet de tournage ou d’inspection ?',
      text: 'Décrivez-nous votre besoin : nous revenons vers vous avec une proposition et un devis détaillé.',
    },
    pop: 'Quelle prestation pour mon projet ?',
  },
  boutique: {
    id: 'boutique',
    label: ACTIVITIES.boutique.label,
    href: ACTIVITIES.boutique.href,
    accent: '#ffffff',
    hint: 'Drones et accessoires',
    kicker: 'Boutique drones et accessoires',
    title: 'Le matériel de nos pilotes, conseillé par nos pilotes',
    text: 'Drones DJI de loisir et professionnels, kits C5, batteries et accessoires. Nous vous aidons à choisir l’appareil adapté à votre usage et à votre permis.',
    cta: { label: 'Voir la boutique', href: ACTIVITIES.boutique.href },
    secondary: { label: 'Quel drone choisir ?', href: ACTIVITIES.boutique.href, popAsk: 'Quel drone choisir ?' },
    callouts: [
      { anchor: 'camera', title: 'Drones DJI', text: 'De la gamme Mini à la Matrice' },
      { anchor: 'top', title: 'Kits C5 et C6', text: 'Pour voler en catégorie Spécifique' },
      { anchor: 'leg', title: 'Conseil de pilotes', text: 'Le bon drone pour le bon permis' },
    ],
    status: 'En vitrine',
    focus: {
      title: 'Les drones du moment',
      text: 'Une sélection de la boutique, du premier drone au drone d’inspection professionnel.',
      more: { label: 'Toute la boutique', href: ACTIVITIES.boutique.href },
    },
    closing: {
      title: 'Besoin d’aide pour choisir votre drone ?',
      text: 'Usage, budget, réglementation : nos pilotes vous orientent vers le bon appareil et les bons accessoires.',
    },
    pop: 'Quel drone choisir ?',
  },
  location: {
    id: 'location',
    label: ACTIVITIES.location.label,
    href: ACTIVITIES.location.href,
    accent: '#ff7a1a',
    hint: 'Drones, caméras, son',
    kicker: 'Location de matériel',
    title: 'Le matériel de nos tournages, prêt à partir',
    text: 'Drones, caméras, son et lumière : du matériel professionnel vérifié, loué à la journée, seul ou en pack, avec les conseils de l’équipe.',
    cta: { label: 'Voir la location', href: ACTIVITIES.location.href },
    secondary: { label: 'Quel pack choisir ?', href: ACTIVITIES.location.href, popAsk: 'Quel pack choisir ?' },
    callouts: [
      { anchor: 'camera', title: 'Prix à la journée', text: 'Affichés TTC et HT' },
      { anchor: 'top', title: 'Packs complets', text: 'Audiovisuel, thermique, interview' },
      { anchor: 'leg', title: 'Matériel vérifié', text: 'Celui de nos propres tournages' },
    ],
    status: 'Prêt au décollage',
    focus: {
      title: 'Les packs à louer',
      text: 'Tout le nécessaire pour un tournage ou une inspection, réuni dans un seul pack.',
      more: { label: 'Toute la location', href: ACTIVITIES.location.href },
    },
    closing: {
      title: 'Un tournage en vue ?',
      text: 'Dites-nous vos dates et votre projet : nous vous confirmons la disponibilité du matériel.',
    },
    pop: 'Comment se passe une location ?',
  },
  formations: {
    id: 'formations',
    label: ACTIVITIES.formations.label,
    href: ACTIVITIES.formations.href,
    accent: '#5fd04c',
    hint: 'Pilotage et métiers de l’image',
    kicker: 'Formations de télépilote',
    title: 'Devenez télépilote professionnel',
    text: 'Catégories Open et Spécifique, BTP ou métiers de l’image : des formations certifiantes, puis des spécialisations pour aller plus loin.',
    cta: { label: 'Voir les formations', href: ACTIVITIES.formations.href },
    secondary: { label: 'Quelle formation choisir ?', href: ACTIVITIES.formations.href, popAsk: 'Quelle formation choisir ?' },
    callouts: [
      { anchor: 'camera', title: 'Certifications', text: 'RS6765 et RS6766' },
      { anchor: 'top', title: 'Open et Spécifique', text: 'BAPD, puis CATS' },
      { anchor: 'arm', title: 'Spécialisations', text: 'Thermographie, 3D, audiovisuel' },
    ],
    status: 'Mode école',
    focus: {
      title: 'Les formations',
      text: 'Commencez par une certification, puis spécialisez-vous selon votre métier.',
      more: { label: 'Toutes les formations', href: ACTIVITIES.formations.href },
    },
    closing: {
      title: 'Envie de devenir télépilote ?',
      text: 'Parlez-nous de votre projet professionnel : nous vous orientons vers la bonne formation et son financement.',
    },
    pop: 'Quelle formation choisir ?',
  },
};

export const MODE_LIST = MODE_ORDER.map((id) => MODES[id]);

// Highlighted items of each mode (section under the hero).
const service = (label: string) => SERVICES.find((s) => s.label === label)!;
const formation = (id: string) => FORMATIONS.find((f) => f.id === id)!;

export const FOCUS = {
  prestations: ['Inspection thermique', 'Modélisation 3D', 'Prises de vues aériennes cinéma', 'Suivi de chantier'].map(service),
  boutique: pick('dji-mini-5-pro-standard-combo', 'dji-mavic-4-pro', 'dji-neo-2-fly-more-combo-rc-n3', 'dji-matrice-4t'),
  location: pick('pack-drone-plus-camera-location', 'pack-inspection-thermqiue-par-drone-location', 'location-pack-interview', 'smallrig-rc120d-eclairage-led-cob-120w-pack-duo'),
  formations: ['open-bapd-btp', 'cats-btp', 'thermographie', 'specialisation-audiovisuelle'].map(formation),
};
