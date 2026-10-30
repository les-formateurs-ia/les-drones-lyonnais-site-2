import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/film-entreprise-corporate-lyon/
const page: ServicePage = {
  slug: 'film-entreprise-corporate-lyon',
  description: 'Vidéo d’entreprise à Lyon : un film corporate imaginé et réalisé de la conception au montage, avec des images au sol et par drone.',
  hero: {
    kicker: 'Film d’entreprise et vidéo corporate',
    title: 'Vidéo d’entreprise à Lyon',
    hook: 'Racontez votre activité. Affirmez votre image.',
    intro: 'Nous imaginons et réalisons votre film d’entreprise à Lyon, de la conception au montage, avec des images au sol et par drone.',
    highlights: [
      { title: 'Une équipe créative' },
      { title: 'Images cinéma et drone' },
      { title: 'Production partout en France' },
    ],
  },
  pitch: {
    title: 'Un film d’entreprise qui donne du sens à votre communication',
    paragraphs: [
      'Présentez votre activité, vos équipes et vos savoir-faire dans un contenu clair, humain et mémorable.',
      'Chaque vidéo est construite autour de vos objectifs, de votre identité et des supports où elle sera diffusée.',
    ],
    checklist: [
      'Renforcez votre image de marque',
      'Présentez clairement votre activité',
      'Valorisez vos équipes',
      'Montrez votre savoir-faire',
    ],
  },
  uses: {
    title: 'Une vidéo pour chaque objectif',
    items: [
      { title: 'Film institutionnel', text: 'Votre entreprise, son histoire et ses valeurs.' },
      { title: 'Film métier et savoir-faire', text: 'Vos métiers, vos techniques et votre expertise au quotidien, mis en lumière.' },
      { title: 'Marque employeur et recrutement', text: 'Votre culture et vos opportunités montrées pour attirer les bons talents.' },
      { title: 'Témoignages et interviews', text: 'La parole donnée à vos collaborateurs, clients ou partenaires.' },
    ],
  },
  method: {
    title: 'Votre entreprise mérite un film qui lui ressemble',
    items: ['Votre vision', 'Vos valeurs', 'Vos équipes', 'Votre savoir-faire', 'Vos clients', 'Vos ambitions'],
  },
  deliverables: {
    title: 'Des contenus adaptés à chaque canal',
    items: [
      { title: 'Le film principal de votre entreprise' },
      { title: 'Des formats verticaux pour les réseaux' },
      { title: 'Sous-titres et habillages pour porter vos messages' },
      { title: 'Des prises de parole authentiques et professionnelles' },
    ],
  },
  process: {
    title: 'Réalisations vidéo corporate à Lyon : notre méthode',
    steps: [
      { title: 'Brief et objectifs', text: 'Nous définissons le message, les publics et les supports de diffusion.' },
      { title: 'Concept et préproduction', text: 'Scénario, planning, lieux, intervenants et préparation technique.' },
      { title: 'Tournage', text: 'Vos équipes, vos métiers, les interviews et les images drone.' },
      { title: 'Postproduction et livraison', text: 'Montage, étalonnage, son, habillage et déclinaisons.' },
    ],
  },
  caseStudy: {
    title: 'E.Leclerc Socara',
    label: 'Une réalisation à la une',
    brief: 'Présenter l’activité, les équipes et les engagements de l’entreprise.',
    mission: 'Écriture, interviews, deux jours de tournage et prises de vue par drone.',
    result: 'Un film principal et plusieurs capsules prêtes à être diffusées.',
    quote: 'Une vidéo fidèle à notre identité et immédiatement exploitable.',
  },
  closing: {
    title: 'Une production audiovisuelle de A à Z',
    text: 'Stratégie et concept, écriture du scénario, repérage des lieux : notre équipe vous accompagne du premier brief à la livraison. Parlons de votre projet.',
  },
  gallery: [
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Film-corporate-Les-Drones-Lyonnais-photo-metier.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Film-corporate-Les-Drones-Lyonnais-photo-1.jpg.webp',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Film-corporate-Les-Drones-Lyonnais-photo-2.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Film-corporate-Les-Drones-Lyonnais-photo-3.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Film-corporate-Les-Drones-Lyonnais-photo-4.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Film-corporate-Les-Drones-Lyonnais-photo-5.jpg',
  ],
};
export default page;
