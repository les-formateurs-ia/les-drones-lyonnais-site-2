import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/production-audiovisuelle-interview-lyon/
const page: ServicePage = {
  slug: 'production-audiovisuelle-interview-lyon',
  description: 'Interview vidéo à Lyon : dirigeants, collaborateurs, experts et clients filmés avec une image soignée et un son professionnel, du brief au montage.',
  hero: {
    kicker: 'Production audiovisuelle – Interview',
    title: 'Interview vidéo à Lyon',
    hook: 'Donnez un visage et une voix à votre entreprise.',
    intro: 'Dirigeants, collaborateurs, experts, clients : nous filmons leurs prises de parole à Lyon avec une image soignée et un son professionnel.',
    highlights: [
      { title: 'Une équipe créative' },
      { title: 'Images cinéma et drone' },
      { title: 'Production partout en France' },
    ],
  },
  pitch: {
    title: 'Votre interview vidéo d’entreprise à Lyon',
    paragraphs: [
      'Une interview humanise votre communication et renforce la confiance.',
      'Nous préparons chaque prise de parole pour obtenir un discours naturel, clair et directement exploitable.',
    ],
    checklist: [
      'Humaniser votre entreprise',
      'Valoriser votre expertise',
      'Créer un lien de confiance',
      'Produire des contenus réutilisables',
    ],
  },
  uses: {
    title: 'Une interview pour chaque objectif',
    items: [
      { title: 'Interview de dirigeant', text: 'Exprimez votre vision, vos décisions et vos projets.' },
      { title: 'Témoignage client', text: 'Donnez la parole à vos clients et renforcez votre crédibilité.' },
      { title: 'Parole d’expert', text: 'Partagez votre expertise sur un sujet précis.' },
      { title: 'Portrait de collaborateur', text: 'Mettez en lumière vos talents et votre culture d’entreprise.' },
    ],
  },
  method: {
    title: 'Votre message, notre savoir-faire',
    items: [
      'Un discours authentique',
      'Un intervenant mis en confiance',
      'Une lumière maîtrisée',
      'Un son parfaitement intelligible',
      'Un rythme naturel',
      'Un cadrage soigné',
    ],
  },
  deliverables: {
    title: 'Un format pour chaque canal',
    items: [
      { title: 'Version complète', text: 'L’interview intégrale, montée et structurée.' },
      { title: 'Formats verticaux', text: 'Des déclinaisons pensées pour les réseaux sociaux.' },
      { title: 'Habillage graphique', text: 'Titres et habillage soignés.' },
      { title: 'Versions multilingues', text: 'Possibles selon vos besoins.' },
    ],
  },
  process: {
    title: 'Comment se déroule votre interview vidéo ?',
    steps: [
      { title: 'Brief et objectifs', text: 'Nous définissons le message, le public et les supports de diffusion.' },
      { title: 'Questions et préparation', text: 'Nous structurons l’échange et préparons l’intervenant.' },
      { title: 'Tournage', text: 'Caméras, lumière et prise de son installées dans vos locaux.' },
      { title: 'Montage et livraison', text: 'Sélection, habillage, sous-titres et déclinaisons.' },
    ],
  },
  caseStudy: {
    title: 'Interview Collegium de Lyon',
    label: 'Une réalisation à la une',
    brief: 'Présenter la vision et les engagements de Luciano Borges.',
    mission: 'Deux caméras, éclairage, prise de son et accompagnement éditorial.',
    result: 'Une interview principale et six capsules pour les réseaux.',
    quote: 'L’équipe a su nous mettre à l’aise et rendre notre message clair.',
  },
  closing: {
    title: 'Votre interview vidéo de A à Z',
    text: 'Définition du message, préparation des questions, coaching face caméra : notre équipe vous accompagne jusqu’à la livraison. Parlons de votre projet.',
  },
  gallery: [
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Interview-video-Les-Drones-Lyonnais-photo-principale.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Interview-video-Les-Drones-Lyonnais-photo-metier.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Interview-video-Les-Drones-Lyonnais-photo-1.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Interview-video-Les-Drones-Lyonnais-photo-2.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Interview-video-Les-Drones-Lyonnais-photo-3.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Interview-video-Les-Drones-Lyonnais-photo-6.jpg',
  ],
};
export default page;
