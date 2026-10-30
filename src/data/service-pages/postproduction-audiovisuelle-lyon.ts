import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/postproduction-audiovisuelle-lyon/
const page: ServicePage = {
  slug: 'postproduction-audiovisuelle-lyon',
  description: 'Montage vidéo professionnel à Lyon : dérushage, montage narratif, étalonnage, sound design et habillage pour un film clair, fluide et prêt à diffuser.',
  hero: {
    kicker: 'Postproduction audiovisuelle',
    title: 'Montage vidéo professionnel à Lyon',
    hook: 'Vos rushs ont une histoire. Nous lui donnons le rythme.',
    intro: 'Nos monteurs professionnels à Lyon transforment vos images en un film clair, fluide et prêt à diffuser.',
    highlights: [
      { title: 'Une équipe créative' },
      { title: 'Images cinéma et drone' },
      { title: 'Production partout en France' },
    ],
  },
  pitch: {
    title: 'Bien plus qu’un assemblage d’images',
    paragraphs: [
      'Le montage structure votre message, crée le rythme et guide l’attention de votre public.',
      'À partir de vos rushs ou d’une production complète, nous construisons un film fidèle à votre identité et à vos objectifs.',
    ],
    checklist: [
      'Une narration claire et engageante',
      'Un regard extérieur et créatif',
      'Un rythme adapté à votre audience',
      'Des exports prêts pour chaque support',
    ],
  },
  uses: {
    title: 'Un montage adapté à chaque projet',
    items: [
      { title: 'Films d’entreprise', text: 'Valorisez votre marque, vos équipes et vos savoir-faire.' },
      { title: 'Interviews et témoignages', text: 'Des récits authentiques qui crédibilisent votre message.' },
      { title: 'Événements et aftermovies', text: 'Un montage dynamique pour revivre l’énergie de vos événements.' },
      { title: 'Réseaux sociaux et publicités', text: 'Des formats courts et percutants pour capter l’attention.' },
    ],
  },
  method: {
    title: 'Chaque détail renforce votre message',
    items: ['Dérushage', 'Montage narratif', 'Étalonnage', 'Sound design', 'Habillage graphique', 'Utilisation de l’IA'],
  },
  deliverables: {
    title: 'Des fichiers prêts à diffuser',
    items: [
      { title: 'Habillage et motion design' },
      { title: 'Formats verticaux' },
      { title: 'Film master en 4K ou plus' },
      { title: 'Exports multicanaux' },
    ],
  },
  process: {
    title: 'Comment se déroule votre montage vidéo ?',
    steps: [
      { title: 'Brief et réception des rushs', text: 'Objectifs, audience, formats attendus, puis transfert sécurisé de vos fichiers.' },
      { title: 'Dérushage et construction', text: 'Sélection des plans et première narration.' },
      { title: 'Première version et retours', text: 'Une validation collaborative, avec des retours centralisés.' },
      { title: 'Finitions et livraison', text: 'Étalonnage, son, sous-titres et exports définitifs.' },
    ],
  },
  caseStudy: {
    title: 'School of AI – PSL',
    label: 'Une réalisation à la une',
    brief: 'Transformer plusieurs rushs en contenus clairs et incarnés, en suivant la narration du client.',
    mission: 'Dérushage, narration, sous-titres et déclinaisons pour les réseaux sociaux.',
    result: 'Un film principal et plusieurs capsules prêtes à diffuser.',
    quote: 'Une équipe réactive, à l’écoute, capable de donner du rythme à des sujets complexes.',
  },
  closing: {
    title: 'Des monteurs professionnels, du brief à la livraison',
    text: 'Analyse de vos rushs, conseil éditorial, construction narrative : notre équipe vous accompagne de A à Z. Parlons de votre projet.',
  },
  gallery: [
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Montage-video-Les-Drones-Lyonnais-photo-principale.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Montage-video-Les-Drones-Lyonnais-photo-metier.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Montage-video-Les-Drones-Lyonnais-photo-1.webp',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Montage-video-Les-Drones-Lyonnais-photo-2.webp',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Montage-video-Les-Drones-Lyonnais-photo-3.webp',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Montage-video-Les-Drones-Lyonnais-photo-6.jpg',
  ],
};
export default page;
