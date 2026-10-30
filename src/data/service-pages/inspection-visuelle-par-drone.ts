import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/inspection-visuelle-par-drone/
const page: ServicePage = {
  slug: 'inspection-visuelle-par-drone',
  description: 'Inspection visuelle par drone à Lyon et partout en France : toitures, façades et infrastructures contrôlées sans échafaudage, en haute résolution.',
  hero: {
    kicker: 'Expertise technique',
    title: 'Inspection visuelle par drone',
    hook: 'Bâtiments, toitures, infrastructures : inspectez vite, en détail et en toute sécurité.',
    intro: 'Nos drones haute résolution repèrent fissures, dégradations et défauts, même dans les zones difficiles d’accès, sans échafaudage ni travail en hauteur. Basés à Lyon, nous intervenons partout en France avec des images prêtes pour le diagnostic et le suivi de vos ouvrages.',
    highlights: [
      { title: 'Rapide et précise', text: 'Des images haute résolution pour détecter fissures, défauts et dégradations.' },
      { title: 'Zones difficiles accessibles', text: 'Toitures, façades et ouvrages complexes, sans nacelle ni échafaudage.' },
      { title: 'Sécurité, coûts réduits', text: 'Limitez les risques, le temps d’intervention et les moyens techniques mobilisés.' },
    ],
  },
  pitch: {
    kicker: 'Une inspection précise, rapide et sécurisée',
    title: 'Inspectez vos bâtiments et infrastructures grâce au drone',
    paragraphs: [
      'Le drone examine en détail les zones difficiles d’accès d’un bâtiment, d’une toiture ou d’une infrastructure. Ses prises de vues haute résolution révèlent fissures, dégradations et défauts apparents, sans recourir systématiquement à une nacelle ou à un échafaudage.',
      'Chaque mission est préparée selon les contraintes du site. Objectif : des images directement exploitables pour le diagnostic, la maintenance, le suivi d’un ouvrage ou la préparation de travaux.',
    ],
    checklist: [
      'Toitures et couvertures',
      'Façades de bâtiments',
      'Ouvrages et infrastructures',
      'Zones difficiles d’accès',
      'Images haute résolution',
      'Rapport photo exploitable',
    ],
  },
  uses: {
    kicker: 'Applications et ouvrages',
    title: 'Quels ouvrages pouvons-nous inspecter par drone ?',
    intro: 'Nos drones professionnels atteignent rapidement les zones difficiles ou dangereuses, pour des inspections précises et sans risque pour vos équipes.',
    items: [
      { title: 'Toitures et couvertures', text: 'Tuiles, zingueries, étanchéité, cheminées, lucarnes, lanterneaux : détection des désordres et des infiltrations.' },
      { title: 'Façades et enveloppes', text: 'Béton, pierre, bardages, menuiseries, joints et enduits : état général et repérage des fissures.' },
      { title: 'Infrastructures et ouvrages d’art', text: 'Ponts, viaducs, murs de soutènement, pylônes et barrages : contrôle des structures et des points sensibles.' },
      { title: 'Sites industriels', text: 'Cuves, cheminées, toitures et structures métalliques : inspection des installations et des équipements.' },
    ],
  },
  method: {
    kicker: 'Notre bureau d’études',
    title: 'Un accompagnement technique adapté à votre projet',
    intro: 'Chaque mission est préparée avec rigueur pour des données fiables, pertinentes et directement exploitables. Nous définissons avec vous :',
    items: [
      'Le type de drone',
      'La résolution et le zoom',
      'Les angles de prise de vue',
      'Le parcours d’inspection',
      'Le format des livrables',
      'L’option thermographie ou modélisation 3D',
    ],
  },
  deliverables: {
    kicker: 'Livrables',
    title: 'Des données pensées pour être exploitées',
    items: [
      { title: 'Photographies HD', text: 'Des images nettes et détaillées pour analyser chaque élément.' },
      { title: 'Vidéos d’inspection', text: 'Des séquences fluides pour comprendre l’environnement et les accès.' },
      { title: 'Retransmission en direct', text: 'La mission suivie en temps réel pour valider les points clés sur site.' },
      { title: 'Rapport d’inspection', text: 'Observations, annotations et recommandations, dans un rapport structuré.' },
      { title: 'Localisation des anomalies', text: 'Les points sensibles repérés sur plans et images géoréférencées.' },
      { title: 'Relevés complémentaires', text: 'Orthophotos, modèles 3D et mesures pour pousser l’analyse plus loin.' },
    ],
  },
  audience: {
    title: 'À qui s’adresse l’inspection par drone ?',
    items: [
      'Entreprises du BTP',
      'Syndics de copropriété',
      'Bailleurs et gestionnaires',
      'Collectivités',
      'Exploitants industriels',
      'Bureaux d’études',
      'Architectes et maîtres d’ouvrage',
      'Experts judiciaires et d’assurance',
    ],
  },
  process: {
    title: 'Comment se déroule la prestation ?',
    steps: [
      { title: 'Analyse de votre besoin', text: 'Vos objectifs, le type d’ouvrage et les points à inspecter.' },
      { title: 'Étude réglementaire et préparation', text: 'Vérification des autorisations et plan de vol sécurisé.' },
      { title: 'Acquisition sur le terrain', text: 'Nos télépilotes capturent des images haute définition, avec précision et rigueur.' },
      { title: 'Traitement et livraison', text: 'Vous recevez un rapport complet, avec nos observations et recommandations.' },
    ],
  },
  caseStudy: {
    title: 'Inspection visuelle par drone d’un bâtiment professionnel',
    label: 'Exemple de projet',
    brief: 'Un gestionnaire de site voulait contrôler l’état de la toiture et des façades d’un bâtiment pour repérer d’éventuelles dégradations, sans engager de moyens d’accès lourds.',
    mission: 'Inspection visuelle par drone en haute résolution sur les zones difficiles d’accès, pour repérer rapidement les anomalies visibles et documenter l’état de l’ouvrage.',
    result: 'Plusieurs défauts apparents détectés, un diagnostic sécurisé et un support visuel exploitable pour la maintenance, le suivi technique et la préparation des travaux.',
    quote: 'Une intervention rapide, claire et efficace. Les images fournies nous ont permis d’identifier immédiatement les points à surveiller et de mieux planifier les actions à engager.',
  },
  reasons: {
    title: 'Pourquoi choisir Les Drones Lyonnais',
    items: [
      { title: 'Expertise aérienne et technique', text: 'Des télépilotes certifiés et une solide expérience de terrain.' },
      { title: 'Équipements professionnels', text: 'Des drones performants et des capteurs adaptés à chaque mission.' },
      { title: 'Mission gérée de A à Z', text: 'De l’étude à la livraison, nous nous occupons de tout.' },
      { title: 'Livrables adaptés', text: 'Des données claires, exploitables et prêtes à l’emploi pour vos équipes.' },
      { title: 'Lyon et partout en France', text: 'Une intervention rapide sur l’ensemble du territoire.' },
    ],
  },
  faq: [
    { q: 'Que peut détecter une inspection visuelle par drone ?', a: 'Fissures, tuiles déplacées, défauts d’étanchéité visibles, traces d’humidité, corrosion, déformations et éléments présentant un risque de chute, notamment.' },
    { q: 'Le drone remplace-t-il une expertise technique ?', a: 'Non, il la facilite. Le drone fournit des données visuelles détaillées qui peuvent compléter l’analyse d’un bureau d’études, d’un architecte ou d’un expert technique.' },
    { q: 'Peut-on inspecter une toiture sans échafaudage ?', a: 'Oui, dans de nombreux cas. Le drone observe la toiture sans échafaudage ni nacelle : moins de délais, moins de coûts et moins de travail en hauteur.' },
    { q: 'Un rapport est-il remis après l’intervention ?', a: 'Oui. Selon la formule choisie : photographies, vidéos, localisation des anomalies et rapport d’inspection avec observations et recommandations.' },
    { q: 'Pouvez-vous intervenir en centre-ville de Lyon ?', a: 'Oui, sous réserve de faisabilité réglementaire et opérationnelle. Avant chaque mission, nous étudions l’environnement, les autorisations nécessaires et les mesures de sécurisation.' },
    { q: 'Combien coûte une inspection par drone ?', a: 'Le prix dépend de la taille du site, de son accessibilité, du niveau de détail attendu et des livrables. Nous établissons un devis précis après un premier échange.' },
    { q: 'Les images peuvent-elles être suivies en direct ?', a: 'Oui. Avec la retransmission en direct, vos équipes suivent l’inspection et peuvent demander le contrôle de points précis pendant la mission.' },
    { q: 'Intervenez-vous uniquement dans la région lyonnaise ?', a: 'Non. Notre équipe est basée près de Lyon et intervient en Auvergne-Rhône-Alpes comme partout en France.' },
  ],
  related: ['/inspection-thermique-par-drone-2/', '/nettoyage-par-drone/'],
  closing: {
    title: 'Un bâtiment ou une infrastructure à inspecter ?',
    text: 'Accédez aux zones difficiles. Obtenez des données précises. Prenez les bonnes décisions.',
  },
  gallery: ['https://www.lesdroneslyonnais.com/wp-content/uploads/2026/09/inspection-batiment.webp'],
};
export default page;
