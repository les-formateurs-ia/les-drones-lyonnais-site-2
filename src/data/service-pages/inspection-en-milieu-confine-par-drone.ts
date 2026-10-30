import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/inspection-en-milieu-confine-par-drone/
const page: ServicePage = {
  slug: 'inspection-en-milieu-confine-par-drone',
  description: 'Inspection en milieu confiné par drone à Lyon et partout en France : cuves, silos, canalisations et galeries inspectés sans exposer vos équipes.',
  hero: {
    kicker: 'Inspection technique par drone',
    title: 'Inspection en milieu confiné par drone',
    hook: 'Explorez cuves, silos, canalisations et galeries sans exposer vos équipes.',
    intro: 'Basés à Lyon et mobiles partout en France, nous inspectons l’intérieur de vos ouvrages avec un drone compact, protégé et éclairé. Des images précises pour préparer la maintenance, localiser les anomalies et décider plus vite.',
    highlights: [
      { title: 'Zones complexes accessibles', text: 'Volumes étroits, sombres ou en hauteur' },
      { title: 'Exposition humaine limitée', text: 'Reconnaissance depuis une zone maîtrisée' },
      { title: 'Données immédiatement utiles', text: 'Images, vidéo et rapport d’anomalies' },
    ],
  },
  pitch: {
    kicker: 'Inspection visuelle intérieure',
    title: 'Voir l’inaccessible avant d’y engager une équipe',
    paragraphs: [
      'Accès réduits, peu de lumière, parfois une atmosphère ou une structure à risque : un espace confiné se prête mal à l’inspection classique. Elle peut exiger un arrêt de production, un échafaudage, des cordistes ou une procédure d’entrée lourde.',
      'Le drone indoor réalise une reconnaissance visuelle ciblée, piloté depuis un point sécurisé. Son éclairage révèle les surfaces, sa protection périphérique lui permet de voler au plus près des parois, et il n’a pas besoin de GPS.',
    ],
    checklist: [
      'Images nettes en faible luminosité',
      'Drone protégé contre les contacts',
      'Repérage méthodique des anomalies',
      'Navigation en intérieur sans GPS',
      'Contrôle et commentaires en direct',
      'Fichiers exploitables pour la maintenance',
    ],
  },
  uses: {
    kicker: 'Applications et ouvrages',
    title: 'Quels milieux confinés inspecter par drone ?',
    intro: 'Chaque mission commence par une étude de faisabilité : accès, dimensions, atmosphère, obstacles, communication radio et objectifs de contrôle.',
    items: [
      { title: 'Silos, cuves et citernes', text: 'Parois, assemblages, dépôts, traces de corrosion et zones invisibles depuis les accès.' },
      { title: 'Canalisations et collecteurs', text: 'Réseaux visitables, conduites de grand diamètre, égouts, regards et ouvrages d’assainissement.' },
      { title: 'Cheminées, gaines et conduits', text: 'Zones verticales, revêtements, obstacles, fissures apparentes et points singuliers.' },
      { title: 'Galeries et volumes techniques', text: 'Tunnels, vides sanitaires, faux plafonds, ouvrages souterrains et locaux complexes.' },
    ],
  },
  method: {
    kicker: 'Expertise Les Drones Lyonnais',
    title: 'Un protocole construit autour de votre ouvrage',
    intro: 'Contraintes du site, attentes métier, conditions réelles de vol : nous croisons tout pour définir un parcours d’inspection cohérent.',
    items: [
      'Drone compact et protégé, adapté au vol indoor',
      'Éclairage embarqué et retour vidéo en direct',
      'Parcours de contrôle et nomenclature définis en amont',
      'Coordination avec vos équipes techniques et HSE',
      'Livraison sécurisée des données et rapport sur mesure',
      'Options 3D, thermique ou expertise complémentaire sur étude',
    ],
  },
  deliverables: {
    kicker: 'Restitution sur mesure',
    title: 'Des livrables directement exploitables',
    items: [
      { title: 'Photographies HD', text: 'Des vues détaillées des zones contrôlées.' },
      { title: 'Vidéo d’inspection', text: 'La séquence complète, chapitrée si nécessaire.' },
      { title: 'Repérage des anomalies', text: 'Des points d’intérêt indexés et commentés.' },
      { title: 'Rapport illustré', text: 'Une synthèse claire pour vos équipes techniques.' },
      { title: 'Visualisation en direct', text: 'La mission suivie depuis une zone sûre.' },
      { title: 'Modèle 3D en option', text: 'Selon la géométrie et la faisabilité du site.' },
    ],
  },
  audience: {
    title: 'Une solution pensée pour les exploitants et les experts',
    items: [
      'Sites industriels',
      'Exploitants de réseaux',
      'Services maintenance',
      'Bureaux d’études',
      'Énergie et environnement',
      'Agroalimentaire',
      'BTP et génie civil',
      'Experts et assureurs',
    ],
  },
  process: {
    title: 'De votre besoin au rapport d’inspection',
    steps: [
      { title: 'Analyse du besoin', text: 'Ouvrage, plans, accès, objectifs, anomalies recherchées et contraintes du site.' },
      { title: 'Étude de faisabilité', text: 'Risques, atmosphère, zone de pilotage, communication radio et protocole HSE.' },
      { title: 'Inspection sur site', text: 'Reconnaissance, capture HD, visualisation en direct et validation des points clés.' },
      { title: 'Analyse et livraison', text: 'Tri des données, repérage des observations et remise des livrables convenus.' },
    ],
  },
  caseStudy: {
    title: 'Inspection intérieure d’un silo industriel',
    label: 'Exemple de scénario',
    brief: 'Visualiser les parois et les éléments internes avant une opération de maintenance.',
    mission: 'Parcours vertical méthodique, vues rapprochées et suivi en direct par l’exploitant.',
    result: 'Une vidéo structurée, des photos des points d’intérêt et la liste des zones à contrôler.',
  },
  reasons: {
    title: 'Pourquoi choisir Les Drones Lyonnais',
    items: [
      { title: 'Expertise terrain', text: 'Une équipe habituée aux environnements techniques et industriels.' },
      { title: 'Équipement adapté', text: 'Des moyens choisis selon l’accès, la lumière et la géométrie.' },
      { title: 'Mission maîtrisée', text: 'Étude de faisabilité, protocole et coordination avec vos équipes.' },
      { title: 'Livrables utiles', text: 'Des fichiers clairs, organisés et adaptés à votre maintenance.' },
      { title: 'Intervention France', text: 'Une équipe basée à Lyon, mobile sur tout le territoire.' },
    ],
  },
  faq: [
    { q: 'Qu’est-ce qu’une inspection en milieu confiné par drone ?', a: 'Un drone compact, protégé contre les contacts et éclairé, observe l’intérieur d’un ouvrage difficile d’accès. Le télépilote reste dans une zone définie en amont et transmet les images en direct aux équipes présentes.' },
    { q: 'Quels espaces confinés peuvent être inspectés ?', a: 'Silos, cuves, citernes, cheminées, conduits, canalisations visitables, collecteurs, galeries, tunnels, vides techniques et certains volumes industriels, notamment. La faisabilité dépend des accès, de la géométrie, de l’atmosphère et des contraintes du site.' },
    { q: 'Le drone peut-il voler à l’intérieur sans GPS ?', a: 'Oui. Une mission indoor se prépare spécifiquement pour voler sans signal GPS : matériel, protections, éclairage et mode de pilotage sont choisis après étude du volume à inspecter.' },
    { q: 'Quelles anomalies peut-on rechercher ?', a: 'Fissures apparentes, corrosion, infiltrations, dépôts, déformations, défauts de revêtement, obstacles ou anomalies d’assemblage. L’interprétation finale revient à votre expert métier ou à notre bureau d’étude, selon la mission.' },
    { q: 'Une inspection par drone remplace-t-elle un contrôle réglementaire ?', a: 'Non. Le drone est un outil d’acquisition et d’aide au diagnostic. Il limite certaines expositions et guide la maintenance, mais ne remplace pas les contrôles, mesures ou certifications imposés par la réglementation et votre procédure HSE.' },
    { q: 'Pouvez-vous intervenir en zone ATEX ?', a: 'Une zone ATEX fait l’objet d’une étude spécifique. Nous ne proposons une intervention que si l’environnement, le matériel et le protocole sont compatibles, et jamais sans validation préalable des risques avec l’exploitant.' },
    { q: 'Quels livrables sont remis après l’inspection ?', a: 'Selon votre besoin : photographies HD, vidéo de l’inspection, repérage des points d’intérêt, rapport illustré, classement des anomalies et fichiers prêts pour votre suivi de maintenance. Une restitution commentée peut aussi être organisée.' },
    { q: 'Quel est le prix d’une inspection en espace confiné par drone ?', a: 'Le tarif dépend du volume, des accès, des risques, du temps d’immobilisation, du protocole de sécurité et des livrables. À partir de plans, de photos ou d’une visite technique, nous établissons un devis détaillé.' },
  ],
  related: ['/bureau-detude-drone/', '/modelisation-3d-drone/'],
  closing: {
    title: 'Parlons de votre prochaine inspection',
    text: 'Envoyez-nous quelques photos, un plan ou les dimensions du volume : notre équipe étudie la faisabilité de la mission.',
  },
  gallery: ['https://www.lesdroneslyonnais.com/wp-content/uploads/2026/09/hero-confined-drone.webp'],
};
export default page;
