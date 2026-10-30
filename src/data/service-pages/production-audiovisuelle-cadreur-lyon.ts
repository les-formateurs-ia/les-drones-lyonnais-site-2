import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/production-audiovisuelle-cadreur-lyon/
const page: ServicePage = {
  slug: 'production-audiovisuelle-cadreur-lyon',
  description: 'Cadreur vidéo à Lyon pour renforcer votre équipe ou assurer vos prises de vues : films, interviews, événements et productions audiovisuelles.',
  hero: {
    kicker: 'Production audiovisuelle – Cadreur',
    title: 'Cadreur vidéo à Lyon',
    hook: 'Une image précise, au service de votre réalisation.',
    intro: 'Il vous manque un cadreur à Lyon, en renfort ou pour assurer toutes les prises de vues ? Nous intervenons sur vos films, interviews, événements et productions audiovisuelles.',
    highlights: [
      { title: 'Une équipe créative' },
      { title: 'Images cinéma et drone' },
      { title: 'Production partout en France' },
    ],
  },
  pitch: {
    title: 'Un cadreur à Lyon pour chaque production',
    paragraphs: [
      'Notre cadreur rejoint votre équipe de tournage, ou prend en charge toutes les prises de vues selon les indications de votre réalisateur.',
      'Cadrage, exposition, mise au point, mouvement : chaque plan est réalisé avec précision et cohérence.',
    ],
    checklist: [
      'Maîtriser le cadre et la composition',
      'Garantir une image homogène',
      'S’adapter à la réalisation',
      'Livrer des rushes directement exploitables',
    ],
  },
  uses: {
    title: 'Un opérateur caméra pour tous vos tournages',
    items: [
      { title: 'Film d’entreprise', text: 'Valorisez vos activités, vos équipes et vos savoir-faire.' },
      { title: 'Interview et témoignage', text: 'Des témoignages sincères, captés avec justesse.' },
      { title: 'Événement et captation', text: 'Conférences, salons, concerts, lancements.' },
      { title: 'Publicité et fiction', text: 'Univers créatifs, spots et fictions courtes.' },
    ],
  },
  method: {
    title: 'Chaque plan répond à une intention',
    items: ['Composition', 'Exposition', 'Mise au point', 'Continuité visuelle', 'Anticipation', 'Discrétion'],
  },
  deliverables: {
    title: 'Une prestation adaptée à votre production',
    items: [
      { title: 'Cadreur équipé', text: 'Il arrive avec un kit caméra complet.' },
      { title: 'Cadreur seul', text: 'Il s’intègre à votre équipe et à votre matériel.' },
      { title: 'Multicaméra', text: 'Un dispositif à plusieurs caméras est possible.' },
      { title: 'Rushes prêts au montage', text: 'Adaptés à votre projet et organisés.' },
    ],
  },
  process: {
    title: 'Prestation cadreur vidéo : notre méthode',
    steps: [
      { title: 'Brief et besoins', text: 'Nous identifions le style, les plans attendus et l’organisation du tournage.' },
      { title: 'Préparation technique', text: 'Caméra, optiques, stabilisation et accessoires adaptés au projet.' },
      { title: 'Tournage', text: 'Le cadreur suit votre réalisation et sécurise chaque prise.' },
      { title: 'Rushes et livraison', text: 'Sauvegarde, classement et transfert dans le format convenu.' },
    ],
  },
  caseStudy: {
    title: 'Campus Tour PSL',
    label: 'Une réalisation à la une',
    brief: 'Assurer des images dynamiques pour un film de présentation.',
    mission: 'Deux cadreurs, des caméras stabilisées et des plans de coupe.',
    result: 'Des rushes homogènes, organisés et prêts au montage.',
    quote: 'Une équipe autonome, discrète et parfaitement intégrée à notre production.',
  },
  closing: {
    title: 'Une prise en charge technique de A à Z',
    text: 'Analyse du brief, choix du matériel, repérage technique : nos cadreurs vous accompagnent jusqu’à la livraison. Parlons de votre tournage.',
  },
  gallery: [
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Operateur-cadreur-video-Les-Drones-Lyonnais-photo-principale.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Operateur-cadreur-video-Les-Drones-Lyonnais-photo-metier.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Operateur-cadreur-video-Les-Drones-Lyonnais-photo-1.jpeg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Operateur-cadreur-video-Les-Drones-Lyonnais-photo-4.webp',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Operateur-cadreur-video-Les-Drones-Lyonnais-photo-5.jpg',
    'https://www.lesdroneslyonnais.com/wp-content/uploads/2026/08/Operateur-cadreur-video-Les-Drones-Lyonnais-photo-6.jpg',
  ],
};
export default page;
