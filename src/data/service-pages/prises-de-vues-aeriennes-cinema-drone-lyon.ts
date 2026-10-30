import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/prises-de-vues-aeriennes-cinema-drone-lyon/
const page: ServicePage = {
  slug: 'prises-de-vues-aeriennes-cinema-drone-lyon',
  description: 'Drone cinéma à Lyon : pilotes professionnels, plans aériens pensés pour votre film, votre publicité ou votre production. Stabilisé, compact ou FPV.',
  hero: {
    kicker: 'Prises de vues aériennes cinéma',
    title: 'Drone cinéma à Lyon',
    hook: 'L’axe aérien devient un véritable choix de mise en scène.',
    intro: 'Pilotes de drone professionnels à Lyon, nous créons des plans aériens pensés pour votre film, votre publicité ou votre production.',
    highlights: [
      { title: 'Une équipe créative' },
      { title: 'Images cinéma et drone' },
      { title: 'Production partout en France' },
    ],
  },
  pitch: {
    title: 'Un plan aérien ne se contente pas d’être spectaculaire',
    paragraphs: [
      'Il révèle un décor, accompagne un personnage et donne de l’échelle à votre récit.',
      'Chaque mouvement est préparé avec la réalisation et la direction de la photographie, pour que le drone s’intègre naturellement à votre projet.',
    ],
  },
  uses: {
    title: 'Des images aériennes pour chaque production',
    items: [
      { title: 'Films et séries', text: 'Des plans au service de la fiction, qui donnent de l’ampleur à votre histoire.' },
      { title: 'Publicité et brand content', text: 'Un produit, une marque, un lieu ou une expérience mis en valeur.' },
      { title: 'Documentaires et télévision', text: 'Le réel raconté avec des images aériennes justes et immersives.' },
      { title: 'Sport et suivi de véhicule', text: 'L’action suivie de près, en sécurité, pour des images dynamiques.' },
    ],
  },
  method: {
    title: 'Stabilisé, compact ou FPV : nous adaptons le drone',
    items: [
      'Drone cinéma stabilisé',
      'Drone FPV professionnel',
      'Configuration adaptée au projet',
      'Retour vidéo pour le réalisateur',
      'Pilotage en double opérateur',
      'Tournage en intérieur ou en extérieur',
    ],
  },
  deliverables: {
    title: 'Des rushs prêts pour la postproduction',
    items: [
      { title: 'Couleurs maîtrisées et cohérentes' },
      { title: 'Images nettes et exploitables' },
      { title: 'Plans triés et identifiés' },
      { title: 'Livraison selon vos formats de diffusion' },
    ],
  },
  process: {
    title: 'Comment se déroule un tournage avec Les Drones Lyonnais ?',
    steps: [
      { title: 'Brief et intention', text: 'Découpage, références, décor et mouvement recherché.' },
      { title: 'Faisabilité et autorisations', text: 'Étude de l’espace aérien, repérage et protocole de sécurité.' },
      { title: 'Tournage', text: 'Pilotage, cadrage et validation des plans avec la réalisation.' },
      { title: 'Sauvegarde et livraison', text: 'Contrôle des rushs, double sauvegarde et livraison organisée.' },
    ],
  },
  caseStudy: {
    title: 'Reportage C8',
    label: 'Une réalisation à la une',
    brief: 'Des prises de vues par drone de cathédrales, à travers toute la France, pour C8.',
    mission: 'Repérage, autorisations, drone stabilisé et double opérateur.',
    result: 'Des plans fluides, intégrés au montage principal.',
    quote: 'Une équipe qui comprend le découpage et livre exactement les plans attendus.',
  },
  reasons: {
    title: 'Pourquoi confier votre projet à notre équipe ?',
    items: [
      { title: 'Une préparation réglementaire complète' },
      { title: 'Des mouvements de caméra maîtrisés' },
      { title: 'Un duo pilotage et cadrage coordonné' },
      { title: 'Un matériel professionnel adapté à votre projet' },
    ],
  },
  closing: {
    title: 'Une équipe cinéma, du repérage à la livraison',
    text: 'Étude du scénario, autorisations de vol, repérage technique : nos pilotes de drone professionnels à Lyon vous accompagnent de A à Z. Parlons de votre projet.',
  },
  gallery: [
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Drone-cinema-Les-Drones-Lyonnais-Photo-principale.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Drone-cinema-Les-Drones-Lyonnais-photo-metier.jpeg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Drone-cinema-Les-Drones-Lyonnais-photo-1.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Drone-cinema-Les-Drones-Lyonnais-photo-2.jpg.webp',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Drone-cinema-Les-Drones-Lyonnais-photo-3.webp',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Drone-cinema-Les-Drones-Lyonnais-photo-4.jpg',
  ],
};
export default page;
