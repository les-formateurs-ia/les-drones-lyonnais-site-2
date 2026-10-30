import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/live-streaming-captation-evenementielle-lyon/
const page: ServicePage = {
  slug: 'live-streaming-captation-evenementielle-lyon',
  description: 'Captation live à Lyon : conférences, séminaires, tables rondes et événements filmés en multicaméra, avec prise de son, diffusion en direct et replay.',
  hero: {
    kicker: 'Live streaming et captation événementielle',
    title: 'Captation live à Lyon',
    hook: 'Diffusez votre événement en direct et partagez-le sans limite.',
    intro: 'Conférences, séminaires, tables rondes, événements : nous les filmons à Lyon avec une régie multicaméra, une prise de son professionnelle et une diffusion en direct.',
    highlights: [
      { title: 'Une équipe créative' },
      { title: 'Images cinéma et drone' },
      { title: 'Production partout en France' },
    ],
  },
  pitch: {
    title: 'Une captation vidéo à Lyon pour tous vos événements',
    paragraphs: [
      'Public sur place ou à distance, votre direct doit être fiable. Nous prenons en charge l’image, le son, la réalisation et la diffusion.',
      'Résultat : un direct fluide, puis un replay de qualité qui prolonge la portée de vos prises de parole et de vos contenus.',
    ],
    checklist: [
      'Élargir votre audience',
      'Connecter les participants à distance',
      'Conserver un replay',
      'Créer un événement hybride',
    ],
  },
  uses: {
    title: 'Un dispositif adapté à chaque événement',
    items: [
      { title: 'Conférence et séminaire', text: 'Touchez à la fois le public présent dans la salle et celui qui suit à distance.' },
      { title: 'Table ronde et webinar', text: 'Animez des échanges interactifs et impliquez votre audience à distance.' },
      { title: 'Événement corporate', text: 'Valorisez vos temps forts, internes comme externes, avec un direct professionnel.' },
      { title: 'Spectacle et lancement', text: 'Donnez une nouvelle ampleur à vos shows, lancements et performances.' },
    ],
  },
  method: {
    title: 'Votre événement en direct, sans compromis',
    items: [
      'Plusieurs caméras',
      'Intervenants à distance',
      'Diffusion sécurisée',
      'Enregistrement en direct',
      'Réalisation en temps réel',
      'Habillage graphique',
    ],
  },
  deliverables: {
    title: 'Un dispositif complet, du direct au replay',
    items: [
      { title: 'Diffusion HD sécurisée', text: 'Un direct en haute définition, diffusé en toute sécurité.' },
      { title: 'Enregistrement intégral', text: 'Tout le direct est enregistré, pour une relecture immédiate.' },
      { title: 'Plusieurs angles', text: 'Plusieurs caméras pour varier les plans et capter l’essentiel.' },
      { title: 'Habillage en direct', text: 'Insertions, titres et supports intégrés pendant la diffusion.' },
    ],
  },
  process: {
    title: 'Captation live à Lyon : notre méthode',
    steps: [
      { title: 'Brief et audience', text: 'Nous définissons vos objectifs, le format adapté et le nombre de spectateurs attendus.' },
      { title: 'Étude technique', text: 'Repérage du lieu, réseau, sonorisation et choix de la plateforme de diffusion.' },
      { title: 'Installation et tests', text: 'Caméras et régie installées, répétitions générales et tests de secours.' },
      { title: 'Direct et replay', text: 'Réalisation et diffusion en direct, enregistrement, puis livraison du replay.' },
    ],
  },
  caseStudy: {
    title: 'Ma Thèse en 180 secondes – PSL',
    label: 'Une réalisation à la une',
    brief: 'Permettre à un public distant de suivre l’événement.',
    mission: 'Quatre caméras, une régie, la prise de son et une diffusion privée.',
    result: 'Un direct fluide et un replay intégral livré après l’événement.',
    quote: 'La diffusion a été fluide et parfaitement maîtrisée.',
  },
  closing: {
    title: 'Une organisation technique de A à Z',
    text: 'Étude de faisabilité, préparation en amont, replay : notre équipe vous accompagne jusqu’à la livraison. Parlons de votre événement.',
  },
  gallery: [
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Live-video-Les-Drones-Lyonnais-photo-principale.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Live-video-Les-Drones-Lyonnais-photo-metier.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Live-video-Les-Drones-Lyonnais-photo-1.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Live-video-Les-Drones-Lyonnais-photo-2.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Live-video-Les-Drones-Lyonnais-photo-3.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Live-video-Les-Drones-Lyonnais-photo-6.jpeg',
  ],
};
export default page;
