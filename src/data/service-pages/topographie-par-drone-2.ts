import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/topographie-par-drone-2/
const page: ServicePage = {
  slug: 'topographie-par-drone-2',
  description: 'Topographie par drone à Lyon et partout en France : photogrammétrie ou LiDAR, orthophotos, MNT, courbes de niveau, cubatures et plans exploitables.',
  hero: {
    kicker: 'Relevé, cartographie, données géoréférencées',
    title: 'Topographie par drone',
    hook: 'Mesurez de grandes surfaces, sans jamais perdre de vue l’usage final de la donnée.',
    intro: 'À Lyon, en Auvergne-Rhône-Alpes et partout en France, nous réalisons vos relevés par photogrammétrie ou LiDAR : orthophotos, nuages de points, MNT/MNS, courbes de niveau, cubatures, profils et plans exploitables.',
    highlights: [
      { title: 'Couverture étendue', text: 'Grandes surfaces et zones difficiles documentées efficacement' },
      { title: 'Altimétrie exploitable', text: 'Relief, pentes, profils et volumes selon le cahier des charges' },
      { title: 'Formats métier', text: 'Des fichiers préparés pour vos outils CAO et SIG' },
    ],
  },
  pitch: {
    kicker: 'Relevé topographique par drone à Lyon et en France',
    title: 'Décrire précisément l’existant pour mieux concevoir et suivre',
    paragraphs: [
      'La topographie par drone transforme une acquisition aérienne en représentation mesurable du site. Avant de voler, nous fixons avec vous la zone utile, le système de coordonnées, la précision recherchée, les objets à restituer et les formats attendus.',
      'Les données sont ensuite calculées, nettoyées, géoréférencées et contrôlées. Le résultat sert à documenter un terrain, préparer un projet, suivre des terrassements, comparer plusieurs états ou alimenter votre chaîne CAO et SIG.',
    ],
    checklist: [
      'Plan de mission adapté au relief',
      'Photogrammétrie ou LiDAR',
      'RTK et points de contrôle selon besoin',
      'Orthophoto et nuage de points',
      'MNT, profils, pentes et cubatures',
      'Exports dans votre référentiel',
    ],
  },
  uses: {
    kicker: 'Applications',
    title: 'Du chantier à la carrière, une donnée au service de la décision',
    intro: 'Chaque mission associe une méthode d’acquisition, un protocole de contrôle et des livrables définis selon le terrain et votre métier.',
    items: [
      { title: 'Terrassements et chantiers', text: 'État des lieux, courbes de niveau, profils, pentes et comparaison d’états pour préparer ou suivre les mouvements de terrain.' },
      { title: 'Carrières et stocks', text: 'Cubatures de granulats, déblais et remblais, inventaires périodiques et cartes de volumes sur une surface de référence validée.' },
      { title: 'Voiries et infrastructures', text: 'Orthophotos, modèles altimétriques et données géoréférencées pour documenter routes, talus, corridors et réseaux visibles.' },
      { title: 'Aménagement et environnement', text: 'Cartographie de sites, analyse du relief, suivi d’évolution et appui aux études d’urbanisme, d’énergie ou d’environnement.' },
    ],
  },
  method: {
    kicker: 'Expertise Les Drones Lyonnais',
    title: 'Une mission pensée depuis le livrable attendu',
    intro: 'Un bon relevé commence avant le décollage. Objectif, référentiel, contrôles, visibilité du terrain, chaîne de restitution : nous cadrons tout pour choisir le capteur, la géométrie de vol et le niveau de traitement adaptés.',
    items: [
      'Analyse de faisabilité aérienne',
      'Plan de vol et recouvrement',
      'Acquisition RTK et contrôles au sol',
      'Photogrammétrie ou traitement LiDAR',
      'Analyse altimétrique et volumétrique',
      'Préparation CAO et SIG',
    ],
  },
  deliverables: {
    kicker: 'Livrables topographiques',
    title: 'Des données géoréférencées prêtes à intégrer',
    items: [
      { title: 'Orthophoto', text: 'Raster géoréférencé GeoTIFF, homogène et mesurable selon le cahier des charges.' },
      { title: 'Nuage de points', text: 'LAS, LAZ ou format compatible, colorisé ou classifié selon la méthode.' },
      { title: 'MNT / MNS', text: 'Modèles numériques du terrain ou des surfaces, pour l’analyse altimétrique.' },
      { title: 'Courbes et profils', text: 'Courbes de niveau, coupes, profils en long ou en travers et cartes de pentes.' },
      { title: 'Volumes et cubatures', text: 'Stocks, déblais-remblais et comparaisons entre états, hypothèses documentées.' },
      { title: 'Plans et exports', text: 'DXF, DWG, SHP, GeoPackage, PDF ou formats définis avec votre équipe.' },
    ],
  },
  audience: {
    title: 'Une base commune pour les métiers du terrain',
    items: [
      'Bureaux d’études et ingénieries',
      'Entreprises du BTP',
      'Maîtres d’œuvre et aménageurs',
      'Carrières et plateformes',
      'Gestionnaires de voirie',
      'Collectivités',
      'Exploitants industriels',
      'Énergies et environnement',
    ],
  },
  process: {
    title: 'Quatre étapes, du cahier des charges à l’export',
    steps: [
      { title: 'Cadrage du besoin', text: 'Périmètre, précision, référentiel, livrables, formats, dates et contraintes du site.' },
      { title: 'Préparation et acquisition', text: 'Faisabilité aérienne, choix du capteur, plan de mission et contrôles au sol.' },
      { title: 'Calcul et contrôle', text: 'Traitement, géoréférencement, nettoyage, classification et vérification des écarts.' },
      { title: 'Restitution', text: 'Orthophoto, modèles, profils, volumes, plans et exports documentés.' },
    ],
  },
  caseStudy: {
    title: 'Cubature périodique d’une plateforme de matériaux',
    label: 'Exemple de projet',
    brief: 'Un exploitant doit suivre plusieurs stocks et partager un état daté avec ses équipes de production.',
    mission: 'Acquisition photogrammétrique géoréférencée, calcul de la surface, délimitation des stocks et validation de la référence de volume.',
    result: 'Orthophoto, modèle numérique, tableau de cubatures et plan de localisation, livrés dans les formats convenus. Chaque résultat est lié à une date, un périmètre et une surface de référence pour faciliter la comparaison avec les campagnes suivantes.',
  },
  reasons: {
    title: 'Pourquoi choisir Les Drones Lyonnais',
    items: [
      { title: 'Cadrage technique', text: 'Nous partons de la décision métier et du format final avant de préparer le vol.' },
      { title: 'Double technologie', text: 'Photogrammétrie ou LiDAR selon la visibilité, le relief et le résultat attendu.' },
      { title: 'Contrôle qualité', text: 'Référentiel, points de contrôle, hypothèses et limites sont explicités.' },
      { title: 'Formats exploitables', text: 'Des exports préparés pour vos environnements CAO, SIG et métiers.' },
      { title: 'Intervention nationale', text: 'À Lyon, en Auvergne-Rhône-Alpes et partout en France.' },
    ],
  },
  faq: [
    { q: 'Qu’est-ce que la topographie par drone ?', a: 'Un drone acquiert des images ou des mesures LiDAR au-dessus d’un site. Leur traitement produit des données géoréférencées : orthophoto, nuage de points, modèle numérique, courbes de niveau, profils ou volumes. Le protocole dépend de la surface, du relief, de la végétation, de la précision recherchée et de l’usage final.' },
    { q: 'Quelle précision peut-on obtenir avec un relevé topographique par drone ?', a: 'Il n’existe pas de précision universelle. Elle dépend du capteur, de la hauteur et de la géométrie de vol, de la couverture GNSS, des points d’appui et de contrôle, du relief, de la végétation, des conditions d’acquisition et du traitement. L’objectif de précision et le protocole de contrôle sont fixés au cahier des charges.' },
    { q: 'Quels livrables topographiques pouvez-vous fournir ?', a: 'Selon le besoin : orthophoto GeoTIFF, nuage de points LAS ou LAZ, MNT, MNS, courbes de niveau, profils, cartes de pentes, cubatures, plans et exports DXF, DWG, SHP, GeoPackage ou PDF. Système de coordonnées, unités et formats sont validés avant la mission.' },
    { q: 'Pouvez-vous calculer des cubatures de stocks, déblais et remblais ?', a: 'Oui. Les volumes sont calculés à partir d’un relevé contrôlé et d’une surface de référence définie avec vous. Le rapport précise le périmètre, la date, la référence, les exclusions et les hypothèses, pour un résultat interprétable et comparable dans le temps.' },
    { q: 'Peut-on suivre l’évolution d’un chantier avec des relevés répétés ?', a: 'Oui. Un protocole reproductible permet de comparer plusieurs dates, suivre les terrassements, visualiser les écarts, mettre à jour une orthophoto ou quantifier des volumes. Fréquence et indicateurs sont calés sur le rythme du chantier et les décisions à documenter.' },
    { q: 'Un relevé topographique par drone remplace-t-il un bornage ?', a: 'Non. En France, la délimitation juridique d’une propriété et le bornage sont réservés au géomètre-expert. Nos relevés servent à documenter l’existant, aux études, à la conception, au suivi et à l’aide à la décision ; ils ne fixent pas les limites foncières.' },
    { q: 'Combien coûte une mission de topographie par drone ?', a: 'Le devis dépend de la surface, du relief, de la végétation, des contraintes aériennes, de la méthode d’acquisition, de la précision, des contrôles et des livrables. Envoyez-nous la localisation, le périmètre, le référentiel et un exemple du résultat attendu : nous vous faisons une proposition claire.' },
    { q: 'Où intervenez-vous pour vos relevés topographiques ?', a: 'Basés dans la région lyonnaise, nous intervenons à Lyon, en Auvergne-Rhône-Alpes et partout en France. Une analyse préalable à distance permet de vérifier la faisabilité aérienne, les contraintes du site et la méthode pertinente.' },
  ],
  related: ['/bureau-detude-drone/', '/modelisation-3d-drone/'],
  closing: {
    title: 'Préparons votre relevé topographique',
    text: 'Envoyez-nous la localisation, le périmètre, vos plans disponibles, le référentiel souhaité, le logiciel cible et le résultat attendu. Nous vous proposons la méthode, les contrôles et les livrables adaptés.',
  },
  gallery: ['https://www.lesdroneslyonnais.com/wp-content/uploads/2026/09/topo-hero.webp'],
};
export default page;
