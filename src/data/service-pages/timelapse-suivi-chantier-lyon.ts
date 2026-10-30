import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/timelapse-suivi-chantier-lyon/
const page: ServicePage = {
  slug: 'timelapse-suivi-chantier-lyon',
  description: 'Timelapse de chantier à Lyon : caméra installée et supervisée pour suivre l’avancement des travaux, informer vos équipes et créer un film final.',
  hero: {
    kicker: 'Timelapse et suivi de chantier',
    title: 'Timelapse de chantier à Lyon',
    hook: 'Des mois de travaux résumés en quelques minutes.',
    intro: 'Nous installons et supervisons votre caméra timelapse pour documenter l’avancement du chantier, informer vos équipes et créer un film final spectaculaire.',
    highlights: [
      { title: 'Une équipe créative' },
      { title: 'Images cinéma et drone' },
      { title: 'Production partout en France' },
    ],
  },
  pitch: {
    title: 'Une vidéo timelapse pour raconter votre chantier',
    paragraphs: [
      'Du premier terrassement à la livraison, le timelapse révèle chaque étape de votre projet dans un format clair, dynamique et mémorable.',
      'Vous suivez l’avancement à distance et disposez d’images régulières pour vos réunions, vos clients et votre communication.',
    ],
    checklist: [
      'Visualiser l’avancement des travaux',
      'Créer des preuves visuelles datées',
      'Partager les grandes étapes du projet',
      'Produire un film final impactant',
    ],
  },
  uses: {
    title: 'Une solution pour chaque type de chantier',
    items: [
      { title: 'Construction neuve' },
      { title: 'Rénovation et réhabilitation' },
      { title: 'Industrie et logistique' },
      { title: 'Infrastructure et énergie' },
    ],
  },
  method: {
    title: 'Chaque étape devient visible',
    items: [
      'Prises de vue automatiques',
      'Contrôle à distance',
      'Sauvegarde régulière',
      'Images haute définition',
      'Exports intermédiaires',
      'Film final monté',
    ],
  },
  deliverables: {
    title: 'Des images pendant et après les travaux',
    items: [
      { title: 'Images régulières', text: 'Suivez l’avancement du chantier au fil des prises de vue.' },
      { title: 'Exports d’étape', text: 'Des exports réguliers pour vos points d’étape et vos réunions.' },
      { title: 'Images nettes', text: 'Pour vos rapports et vos supports de communication.' },
      { title: 'Plateforme sécurisée', text: 'Pour consulter et télécharger vos images.' },
    ],
  },
  process: {
    title: 'Suivi de chantier en timelapse : notre méthode',
    steps: [
      { title: 'Étude du site', text: 'Nous définissons vos objectifs, la durée, l’orientation et le point de vue idéal.' },
      { title: 'Installation', text: 'Fixation, alimentation, connexion et réglage de la caméra.' },
      { title: 'Suivi du chantier', text: 'Contrôle à distance, sauvegarde et mise à disposition régulière des images.' },
      { title: 'Film final', text: 'Sélection, montage, musique, titrage, puis livraison de votre film timelapse.' },
    ],
  },
  caseStudy: {
    title: 'Centre nautique du Martinet',
    label: 'Une réalisation à la une',
    brief: 'Documenter l’évolution du chantier et informer les parties prenantes.',
    mission: 'Une caméra autonome, une connexion 5G et des prises de vue programmées.',
    result: 'Une galerie de suivi et un film final prêt à diffuser.',
    quote: 'Un outil de suivi simple et un film qui valorise tout le travail accompli.',
  },
  closing: {
    title: 'Une solution autonome, suivie de A à Z',
    text: 'Repérage et cadrage, installation sécurisée, supervision à distance : notre équipe vous accompagne jusqu’à la livraison. Parlons de votre chantier.',
  },
  gallery: [
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Timelapse-video-Les-Drones-Lyonnais-photo-principale.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Timelapse-video-Les-Drones-Lyonnais-photo-metier.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Timelapse-video-Les-Drones-Lyonnais-photo-5.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Timelapse-video-Les-Drones-Lyonnais-photo-6.jpg',
  ],
};
export default page;
