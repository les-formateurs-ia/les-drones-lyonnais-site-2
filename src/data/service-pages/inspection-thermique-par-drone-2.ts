import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/inspection-thermique-par-drone-2/
const page: ServicePage = {
  slug: 'inspection-thermique-par-drone-2',
  description: 'Inspection thermique par drone à Lyon et partout en France : bâtiments, panneaux solaires, sites industriels. Anomalies localisées et rapport illustré.',
  hero: {
    kicker: 'Thermographie aérienne et analyse infrarouge',
    title: 'Inspection thermique par drone',
    hook: 'Repérez les anomalies invisibles avant qu’elles ne deviennent des pertes, des pannes ou des urgences.',
    intro: 'À Lyon et partout en France, nous inspectons bâtiments, installations photovoltaïques et sites industriels en thermique et en visible. Un protocole de mesure rigoureux, une lecture en contexte, des livrables pensés pour agir.',
    highlights: [
      { title: 'Anomalies localisées', text: 'Contrastes thermiques repérés et remis en contexte' },
      { title: 'Accès sans contact', text: 'Toitures, grandes surfaces et zones difficiles' },
      { title: 'Rapport exploitable', text: 'Thermogrammes, vues visibles et priorités de contrôle' },
    ],
  },
  pitch: {
    kicker: 'Inspection thermique à Lyon et en France',
    title: 'Transformer un contraste thermique en information utile',
    paragraphs: [
      'Une caméra thermique ne voit pas à l’intérieur d’un ouvrage : elle mesure le rayonnement infrarouge émis et réfléchi par les surfaces. Depuis un drone, elle compare vite de vastes zones, atteint les points difficiles et révèle les comportements atypiques, sans aucun contact.',
      'Un bon résultat dépend autant du protocole que du capteur : météo, émissivité, angle de vue, distance, charge de l’équipement, historique du site. Nous réglons ces paramètres avant le vol, puis associons chaque thermogramme à une image visible pour localiser l’anomalie et orienter les contrôles.',
    ],
    checklist: [
      'Caméra thermique radiométrique',
      'Plan de vol adapté à la cible',
      'Anomalies localisées et classées',
      'Images visibles haute résolution',
      'Paramètres de mesure documentés',
      'Restitution adaptée à votre maintenance',
    ],
  },
  uses: {
    kicker: 'Applications',
    title: 'Du bâtiment au photovoltaïque, une acquisition pour chaque usage',
    intro: 'Un même écart de couleur ne veut pas dire la même chose sur une toiture, un panneau solaire ou un équipement électrique. Protocole et interprétation sont donc définis application par application.',
    items: [
      { title: 'Panneaux photovoltaïques', text: 'Échauffements anormaux, points chauds, sous-chaînes ou modules au comportement thermique atypique, repérés et localisés.' },
      { title: 'Bâtiments et toitures', text: 'Contrastes pouvant signaler déperditions, ponts thermiques, défauts d’isolation ou zones d’humidité à investiguer.' },
      { title: 'Industrie et installations électriques', text: 'Recherche d’échauffements sur équipements, réseaux, connexions ou surfaces techniques pour orienter contrôles et maintenance.' },
      { title: 'Réseaux et ouvrages techniques', text: 'Cartographie des écarts de température sur canalisations, enveloppes, réservoirs ou zones peu accessibles.' },
    ],
  },
  method: {
    kicker: 'Expertise Les Drones Lyonnais',
    title: 'De la planification à la restitution, une mission maîtrisée',
    intro: 'Préparation aéronautique, acquisition multi-capteurs et traitement des données : tout est réuni dans un même déroulé. Votre objectif fixe le niveau de détail, du simple repérage au support d’expertise technique, en passant par la campagne comparative ou le pré-diagnostic photovoltaïque.',
    items: [
      'Étude de faisabilité et autorisations',
      'Caméra thermique adaptée à la cible',
      'Réglages radiométriques documentés',
      'Contrôle qualité pendant la mission',
      'Lecture croisée thermique / visible',
      'Formats adaptés à vos équipes',
    ],
  },
  deliverables: {
    kicker: 'Livrables',
    title: 'Des résultats localisés, illustrés et partageables',
    items: [
      { title: 'Thermogrammes radiométriques', text: 'Des images thermiques qui conservent les données de température.' },
      { title: 'Images visibles associées', text: 'Des vues RVB pour situer et contextualiser chaque observation.' },
      { title: 'Plan des anomalies', text: 'Repérage géographique ou implantation sur plan de masse.' },
      { title: 'Rapport illustré', text: 'Constats, niveaux de priorité et planches comparatives.' },
      { title: 'Tableau de synthèse', text: 'Les zones observées et les informations utiles à la maintenance.' },
      { title: 'Données complémentaires', text: 'Exports, orthomosaïque ou cartographie selon le cahier des charges.' },
    ],
  },
  audience: {
    title: 'Des données utiles aux exploitants comme aux experts',
    items: [
      'Exploitants photovoltaïques',
      'Industriels',
      'Gestionnaires immobiliers',
      'Bureaux d’études',
      'Collectivités',
      'Entreprises de maintenance',
      'Couvreurs et façadiers',
      'Assureurs et experts',
    ],
  },
  process: {
    title: 'Quatre étapes, du besoin au rapport',
    steps: [
      { title: 'Cadrage du besoin', text: 'Objectif, périmètre, plans, historique, défauts recherchés et livrables attendus.' },
      { title: 'Préparation de la mission', text: 'Faisabilité aéronautique, protocole thermique, créneau météo et plan de vol.' },
      { title: 'Acquisition sur site', text: 'Captures thermiques radiométriques et visibles, contrôle qualité immédiat.' },
      { title: 'Analyse et livraison', text: 'Localisation, classement des observations et remise des supports convenus.' },
    ],
  },
  caseStudy: {
    title: 'Inspection d’une centrale photovoltaïque en toiture',
    label: 'Exemple de scénario',
    brief: 'Plusieurs zones de production à contrôler, sans multiplier les accès en toiture.',
    mission: 'Plan de vol systématique, images radiométriques et visibles, puis repérage des comportements atypiques.',
    result: 'Un tableau localisé des observations et une liste priorisée des modules à vérifier par l’équipe de maintenance.',
  },
  reasons: {
    title: 'Pourquoi choisir Les Drones Lyonnais',
    items: [
      { title: 'Expertise aérienne et thermique', text: 'Un protocole qui relie les contraintes de vol à l’objectif d’analyse.' },
      { title: 'Capteurs professionnels', text: 'Des images radiométriques et visibles adaptées à la cible inspectée.' },
      { title: 'Lecture contextualisée', text: 'Chaque contraste est rapproché des matériaux, de la météo et du fonctionnement.' },
      { title: 'Livrables adaptés', text: 'Des supports clairs, localisés et vraiment utilisables par vos équipes.' },
      { title: 'Intervention nationale', text: 'À Lyon, en Auvergne-Rhône-Alpes et partout en France.' },
    ],
  },
  faq: [
    { q: 'Que détecte une inspection thermique par drone ?', a: 'La caméra infrarouge révèle des différences de rayonnement thermique. Selon le contexte : point chaud, déperdition, défaut d’isolation, zone humide, module photovoltaïque atypique ou équipement qui chauffe. Ces contrastes s’interprètent toujours au regard des conditions de mesure et se confirment, si besoin, par un contrôle complémentaire.' },
    { q: 'Quelle différence entre inspection visuelle et inspection thermique ?', a: 'L’inspection visuelle documente l’état apparent : fissures, chocs, corrosion, salissures, éléments déplacés. L’inspection thermique observe les contrastes infrarouges invisibles à l’œil nu. On associe souvent les deux pour relier une anomalie thermique à sa position et à son environnement.' },
    { q: 'Quelles conditions météo sont nécessaires ?', a: 'Tout dépend de l’application. Pour un bâtiment, il faut en général un écart de température intérieur-extérieur suffisant, peu de vent, pas de pluie et une influence solaire limitée. Pour le photovoltaïque, les modules doivent produire sous un ensoleillement adapté et assez stable. Nous confirmons ou reportons la mission après vérification des conditions.' },
    { q: 'Peut-on inspecter des panneaux solaires par thermographie aérienne ?', a: 'Oui. Le drone couvre une toiture ou une centrale solaire et localise les modules au comportement thermique atypique. Le protocole tient compte de l’irradiance, du vent, de l’angle de vue, des reflets, de la résolution au sol et du fonctionnement de l’installation. Les résultats servent d’aide au pré-diagnostic et à la maintenance.' },
    { q: 'L’inspection thermique remplace-t-elle un audit énergétique ou un diagnostic réglementaire ?', a: 'Non. La thermographie aérienne est un outil d’observation et d’orientation. Elle ne remplace ni un DPE, ni un audit énergétique réglementaire, ni un diagnostic électrique, ni l’intervention d’un professionnel habilité quand elle est requise. Elle permet en revanche de cibler les zones à contrôler et de documenter une situation.' },
    { q: 'Les températures mesurées sont-elles exactes ?', a: 'Une caméra radiométrique enregistre une valeur par pixel, mais la qualité de la mesure dépend de nombreux paramètres : émissivité, température réfléchie, distance, angle, humidité, vent, résolution et calibration. Nous distinguons la détection qualitative d’un contraste de la mesure quantitative, réservée aux cas où le protocole la justifie.' },
    { q: 'Quels livrables sont remis après la mission ?', a: 'En général : les thermogrammes, les images visibles associées et un rapport illustré qui localise les observations. Selon le projet, s’y ajoutent un tableau d’anomalies, des priorités de contrôle, une cartographie, des fichiers radiométriques ou des exports compatibles avec votre outil de maintenance.' },
    { q: 'Quel est le prix d’une inspection thermique par drone ?', a: 'Le tarif dépend de la surface, du nombre d’équipements, de l’accessibilité, du contexte aéronautique, du niveau d’analyse, des conditions de mesure et des livrables. Envoyez-nous un plan, une adresse, quelques photos et votre objectif : nous établissons rapidement un devis adapté.' },
  ],
  related: ['/inspection-visuelle-par-drone/', '/modelisation-3d-drone/'],
  closing: {
    title: 'Parlons de votre inspection thermique',
    text: 'Envoyez-nous l’adresse, le périmètre, quelques photos et votre objectif. Nous vous proposons le protocole, les conditions d’intervention et les livrables adaptés.',
  },
};
export default page;
