import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/suivi-de-chantier-timelapse/
const page: ServicePage = {
  slug: 'suivi-de-chantier-timelapse',
  description: 'Suivi de chantier TimeLapse à Lyon et partout en France : caméra autonome, consultation à distance et film final pour valoriser vos travaux.',
  hero: {
    kicker: 'Caméra autonome · Suivi à distance · Vidéo finale',
    title: 'Suivi de chantier TimeLapse',
    hook: 'Suivez, documentez et valorisez chaque étape de vos travaux, même à distance.',
    intro: 'Partout en France, nous installons des caméras TimeLapse professionnelles qui enregistrent votre chantier sur quelques jours ou plusieurs années. Vous gagnez un historique visuel régulier, un accès de consultation et un film final prêt à diffuser.',
    highlights: [
      { title: 'Consultation à distance', text: 'L’avancement du chantier, sous vos yeux, régulièrement' },
      { title: 'Historique visuel continu', text: 'Les étapes clés documentées depuis un cadrage stable' },
      { title: 'Film TimeLapse final', text: 'Un contenu dynamique pour valoriser votre réalisation' },
    ],
  },
  pitch: {
    kicker: 'Suivi de chantier TimeLapse à Lyon et en France',
    title: 'Rendre l’avancement visible sans être présent chaque jour',
    paragraphs: [
      'Le TimeLapse transforme une évolution lente en une histoire lisible en un instant. Fixée sur un point haut, la caméra photographie le chantier automatiquement, selon le calendrier que vous définissez : jours travaillés, plages horaires, cadence et durée de mission.',
      'Pendant les travaux, les images servent à suivre les grandes phases, à illustrer vos réunions et à informer les parties prenantes. À la livraison, nous sélectionnons et montons les meilleures séquences : un film fluide, cohérent et fidèle à la transformation du site.',
    ],
    checklist: [
      'Étude du point de vue et du support',
      'Programmation selon le rythme du chantier',
      'Caméra autonome et connectée',
      'Contrôle à distance du dispositif',
      'Sélection et traitement des images',
      'Montage final adapté à vos supports',
    ],
  },
  uses: {
    kicker: 'Applications du TimeLapse de chantier',
    title: 'Des chantiers de quelques jours aux opérations pluriannuelles',
    intro: 'Point de vue, nombre de caméras, rythme de capture : tout est défini selon votre chantier, les étapes à documenter et l’usage futur des images.',
    items: [
      { title: 'Construction neuve et immobilier', text: 'Une vue continue du gros œuvre aux finitions, pour montrer la progression à la maîtrise d’ouvrage, aux investisseurs ou aux futurs occupants.' },
      { title: 'Rénovation et réhabilitation', text: 'Déconstruction, interventions successives, avant/après : chaque transformation documentée depuis un point de vue stable.' },
      { title: 'Industrie et logistique', text: 'Extension de site, installation d’équipement, construction de plateforme : un historique visuel exploitable.' },
      { title: 'Génie civil et aménagement', text: 'Ouvrages, terrassements, infrastructures et aménagements urbains valorisés par une captation longue durée et des vues complémentaires.' },
    ],
  },
  method: {
    kicker: 'Implantation, autonomie et cadrage',
    title: 'La qualité du film se décide avant la première photo',
    intro: 'Nous anticipons les mouvements du chantier, l’exposition, la sécurité du support et l’évolution des grues, échafaudages et bâtiments. Objectif : un cadrage utile du premier au dernier jour, et des images régulières sans périodes inutiles.',
    items: [
      'Repérage du site et simulation du cadrage',
      'Support stable et accès sécurisé',
      'Orientation compatible avec le soleil',
      'Calendrier de prise de vue personnalisé',
      'Cadence ajustée aux phases du chantier',
      'Synchronisation selon la couverture réseau',
      'Contrôle et maintenance planifiés',
    ],
  },
  deliverables: {
    kicker: 'Livrables remis au client',
    title: 'Des images utiles pendant les travaux, valorisantes après',
    items: [
      { title: 'Accès de suivi en ligne', text: 'Les images synchronisées du chantier, consultables à distance.' },
      { title: 'Photographies HD', text: 'Une sélection pour vos rapports, réunions et communications.' },
      { title: 'Vidéo TimeLapse finale', text: 'Un montage accéléré qui retrace les étapes majeures de l’opération.' },
      { title: 'Versions multi-formats', text: 'Des déclinaisons pour le site web, les écrans et les réseaux sociaux.' },
      { title: 'Comparatifs avant/après', text: 'Des visuels fixes qui rendent la transformation évidente.' },
      { title: 'Archive organisée', text: 'Les médias classés et remis selon le cahier des charges.' },
    ],
  },
  audience: {
    title: 'Un langage visuel commun pour tous les acteurs du chantier',
    items: [
      'Promoteurs immobiliers',
      'Entreprises du BTP',
      'Maîtres d’ouvrage',
      'Architectes et maîtres d’œuvre',
      'Collectivités',
      'Industriels',
      'Agences de communication',
      'Investisseurs et exploitants',
    ],
  },
  process: {
    title: 'Quatre étapes, du repérage au film final',
    steps: [
      { title: 'Cadrage du besoin', text: 'Durée, planning, usages, publics, jalons importants et livrables attendus.' },
      { title: 'Étude et installation', text: 'Repérage, choix du point de vue, support, sécurité, réseau et programmation.' },
      { title: 'Suivi et maintenance', text: 'Contrôle du dispositif, synchronisation des images et ajustements convenus.' },
      { title: 'Montage et livraison', text: 'Sélection, traitement, montage TimeLapse et exports aux formats demandés.' },
    ],
  },
  caseStudy: {
    title: 'Suivi longue durée d’un chantier immobilier sur 18 mois',
    label: 'Exemple de configuration',
    brief: 'Une opération à documenter du terrassement à la livraison, avec une consultation régulière des images.',
    mission: 'Une caméra autonome en hauteur, programmée du lundi au vendredi sur les horaires actifs, avec une cadence adaptée à chaque phase.',
    result: 'Un historique visuel continu, des sélections intermédiaires et un film TimeLapse final décliné pour la livraison et les réseaux sociaux : 18 mois de travaux résumés en quelques minutes.',
  },
  reasons: {
    title: 'Pourquoi choisir Les Drones Lyonnais',
    items: [
      { title: 'Culture du chantier', text: 'Un dispositif implanté en tenant compte des accès, des mouvements et de la sécurité du site.' },
      { title: 'Matériel professionnel', text: 'Une caméra autonome et connectée, programmée selon le rythme réel des travaux.' },
      { title: 'Suivi dans la durée', text: 'Un contrôle régulier et une maintenance dimensionnée selon la mission.' },
      { title: 'Expertise audiovisuelle', text: 'Des images traitées et un montage pensé pour vos supports de communication.' },
      { title: 'Intervention nationale', text: 'À Lyon, en Auvergne-Rhône-Alpes et partout en France.' },
    ],
  },
  faq: [
    { q: 'Qu’est-ce qu’un TimeLapse de chantier ?', a: 'C’est une vidéo accélérée construite à partir de photos prises automatiquement, depuis un point fixe et à intervalles réguliers. Plusieurs semaines ou plusieurs mois de travaux tiennent ainsi en une séquence courte, fluide et compréhensible.' },
    { q: 'Quelle différence entre suivi de chantier et vidéo TimeLapse ?', a: 'Le suivi de chantier, c’est tout le dispositif : étude du point de vue, installation, programmation, contrôle, accès aux images, maintenance et archivage. La vidéo TimeLapse, c’est le film final monté à partir des photos retenues. Une même captation sert donc le pilotage pendant le chantier et la communication après les travaux.' },
    { q: 'Combien de temps peut durer un suivi de chantier TimeLapse ?', a: 'De quelques jours à plusieurs années. La durée, le nombre de caméras et la fréquence des prises de vue dépendent du calendrier, du rythme des travaux, des étapes à documenter et du rendu attendu.' },
    { q: 'La caméra a-t-elle besoin d’électricité et d’une connexion internet ?', a: 'Nous privilégions une caméra professionnelle autonome, alimentée par énergie solaire et connectée au réseau cellulaire. La faisabilité dépend de l’exposition, de la couverture réseau, du support disponible et du rythme de capture : nous le vérifions lors de l’étude d’implantation.' },
    { q: 'Peut-on consulter l’avancement du chantier à distance ?', a: 'Oui. Lorsque la couverture réseau et la configuration le permettent, les images sont synchronisées sur une plateforme de consultation. Les personnes autorisées suivent l’évolution du chantier sans attendre le montage final.' },
    { q: 'À quelle fréquence les photos sont-elles prises ?', a: 'La cadence est personnalisée : quelques secondes pour une opération courte, plusieurs minutes pour un chantier actif, davantage pour une évolution lente. Les prises peuvent aussi être limitées aux jours et horaires de travail, pour éviter les images inutiles et alléger le montage.' },
    { q: 'Comment gérez-vous le droit à l’image sur un chantier ?', a: 'Le cadrage documente l’ouvrage et limite l’identification des personnes. L’information des intervenants et les règles applicables sur site restent de la responsabilité du responsable de chantier. Selon le contexte, nous adaptons la fréquence, l’angle, les plages horaires ou le traitement des images.' },
    { q: 'Quel est le prix d’un suivi de chantier TimeLapse ?', a: 'Il dépend de la durée, du nombre de caméras, de l’accès au point de pose, du support, de la couverture réseau, de la maintenance, des déplacements et du niveau de montage. Envoyez-nous l’adresse, quelques photos du site, le planning et vos usages : nous établissons un devis précis.' },
  ],
  related: ['/inspection-visuelle-par-drone/', '/film-entreprise-corporate-lyon/'],
  closing: {
    title: 'Votre chantier mérite d’être raconté',
    text: 'Envoyez-nous l’adresse, la durée prévisionnelle, quelques photos du site et vos objectifs. Nous vous proposons le point de vue, le dispositif, le rythme de capture et les livrables adaptés.',
  },
  gallery: ['https://www.lesdroneslyonnais.com/wp-content/uploads/2026/09/Suivie-de-chantier-Timelapse-Grande.jpeg'],
};
export default page;
