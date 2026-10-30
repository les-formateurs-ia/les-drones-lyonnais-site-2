import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/bureau-detude-drone/
const page: ServicePage = {
  slug: 'bureau-detude-drone',
  description: 'Bureau d’étude drone à Lyon et partout en France : photogrammétrie ou LiDAR, nuages de points, orthophotos, MNT, cubatures, plans et modèles 3D.',
  hero: {
    kicker: 'Acquisition, traitement, exploitation des données',
    title: 'Bureau d’étude drone',
    hook: 'Vos relevés aériens deviennent des plans, des modèles et des mesures vraiment exploitables.',
    intro: 'À Lyon et partout en France, nous étudions votre besoin, choisissons entre photogrammétrie et LiDAR, puis transformons les données en nuages de points, orthophotos, MNT/MNS, cubatures, plans et modèles 3D adaptés à votre chaîne métier.',
    highlights: [
      { title: 'Besoin cadré en amont', text: 'Une acquisition pensée pour le livrable final' },
      { title: 'Données contrôlées', text: 'Référentiel, nettoyage et vérifications documentés' },
      { title: 'Formats métier', text: 'Des exports compatibles avec vos logiciels' },
    ],
  },
  pitch: {
    kicker: 'Bureau d’étude drone à Lyon et en France',
    title: 'Du nuage de points à la décision technique',
    paragraphs: [
      'Un relevé n’a de valeur que s’il répond à une question précise. Avant la mission, nous définissons la zone utile, le système de coordonnées, la précision attendue, les objets à restituer et les formats dont vos équipes ont besoin.',
      'Après l’acquisition, nous alignons, nettoyons, classons et contrôlons les données avant de produire les livrables. Du terrain au bureau, la même équipe : moins de perte d’information, et des résultats plus simples à intégrer dans un flux CAO, SIG, BIM ou 3D.',
    ],
    checklist: [
      'Analyse du besoin et des usages',
      'Choix photogrammétrie ou LiDAR',
      'Référentiel et géoréférencement',
      'Nettoyage du nuage de points',
      'Mesures, profils et cubatures',
      'Exports adaptés aux logiciels métier',
    ],
  },
  uses: {
    kicker: 'Applications',
    title: 'Des données techniques pour concevoir, mesurer et suivre',
    intro: 'Chaque mission associe une méthode d’acquisition, un niveau de traitement et des livrables définis selon la réalité du site et la décision à prendre.',
    items: [
      { title: 'Terrains et topographie', text: 'Orthophoto, nuage de points, MNT, courbes de niveau, profils et plans de surface pour comprendre la géométrie d’un site.' },
      { title: 'Bâtiments et patrimoine', text: 'Enveloppes, façades, toitures et ouvrages relevés pour documenter l’existant et préparer une modélisation 3D ou BIM.' },
      { title: 'Terrassements et stocks', text: 'Calculs de volumes, comparaisons de surfaces et bilans déblai-remblai pour objectiver les mouvements de matériaux.' },
      { title: 'Infrastructures et industrie', text: 'Jumeaux numériques, coupes, mesures et données géoréférencées pour les équipes d’exploitation et de maintenance.' },
    ],
  },
  method: {
    kicker: 'Expertise Les Drones Lyonnais',
    title: 'Une passerelle entre acquisition aérienne et outils métier',
    intro: 'Préparation de mission, photogrammétrie, traitement de nuages de points, SIG, CAO, modélisation 3D : cette culture transversale nous permet de parler le langage de vos équipes et de structurer la donnée selon son usage réel.',
    items: [
      'Plan de vol et stratégie de recouvrement',
      'Acquisition RTK et points de contrôle',
      'Traitement photogrammétrique',
      'Nettoyage et classification 3D',
      'Analyse SIG, surfaces et volumes',
      'Préparation CAO, BIM et 3D',
    ],
  },
  deliverables: {
    kicker: 'Livrables',
    title: 'Des fichiers prêts à être ouverts, mesurés et réutilisés',
    items: [
      { title: 'Nuage de points', text: 'LAS, LAZ, E57 ou format compatible avec votre environnement logiciel.' },
      { title: 'Orthophoto', text: 'Raster géoréférencé GeoTIFF, homogène et mesurable selon le cahier des charges.' },
      { title: 'MNT / MNS', text: 'Modèles numériques du terrain ou des surfaces, maillages et courbes de niveau.' },
      { title: 'Plans, coupes et profils', text: 'Exports 2D structurés en DXF, DWG ou PDF selon le projet.' },
      { title: 'Volumes et cubatures', text: 'Bilans de stocks, déblai-remblai et comparaisons entre états de référence.' },
      { title: 'Modèle 3D', text: 'Maillage texturé, OBJ et formats d’échange pour la conception ou la communication.' },
    ],
  },
  audience: {
    title: 'Un socle de données commun aux métiers du projet',
    items: [
      'Bureaux d’études et ingénieries',
      'Entreprises du BTP',
      'Architectes et maîtres d’œuvre',
      'Exploitants industriels',
      'Carrières et plateformes',
      'Gestionnaires d’infrastructures',
      'Collectivités',
      'Énergies renouvelables',
    ],
  },
  process: {
    title: 'Quatre étapes, de la question au livrable',
    steps: [
      { title: 'Cadrage du besoin', text: 'Périmètre, décision attendue, précision, projection, formats et contraintes d’exploitation.' },
      { title: 'Préparation et acquisition', text: 'Choix photogrammétrie ou LiDAR, autorisations, plan de mission et points de contrôle.' },
      { title: 'Traitement et contrôle', text: 'Calcul, nettoyage, classification, géoréférencement, vérification et analyse des écarts.' },
      { title: 'Restitution et transfert', text: 'Exports métier, rapport de paramètres, livraison sécurisée et aide à l’ouverture des fichiers.' },
    ],
  },
  caseStudy: {
    title: 'Suivi volumétrique d’un site de terrassement',
    label: 'Exemple de projet',
    brief: 'Une entreprise doit quantifier les matériaux déplacés et partager un état visuel avec la maîtrise d’œuvre.',
    mission: 'Acquisition photogrammétrique géoréférencée, création du nuage de points, nettoyage du sol et comparaison avec la surface de référence.',
    result: 'Orthophoto, MNT, carte des écarts, profils et tableau de cubatures, livrés dans les formats convenus. Le rapport précise le périmètre, la date, la référence de comparaison et les hypothèses pour que chaque volume soit interprété correctement.',
  },
  reasons: {
    title: 'Pourquoi choisir Les Drones Lyonnais',
    items: [
      { title: 'Vision du besoin', text: 'Nous partons de la décision métier pour construire le protocole de relevé.' },
      { title: 'Double acquisition', text: 'Photogrammétrie ou LiDAR selon la géométrie, le terrain et le rendu attendu.' },
      { title: 'Contrôle qualité', text: 'Paramètres, référentiel et limites du jeu de données sont explicités.' },
      { title: 'Formats exploitables', text: 'Des exports préparés pour vos environnements CAO, SIG, BIM ou 3D.' },
      { title: 'Intervention nationale', text: 'À Lyon, en Auvergne-Rhône-Alpes et partout en France.' },
    ],
  },
  faq: [
    { q: 'Que fait un bureau d’étude drone ?', a: 'Il transforme une problématique métier en chaîne de mesure : préparation de l’acquisition, relevé par photogrammétrie ou LiDAR, traitement, contrôle qualité, analyse et livraison. L’objectif n’est pas de belles images, mais des plans, modèles, mesures et formats utiles à vos équipes.' },
    { q: 'Quelle différence entre photogrammétrie et LiDAR ?', a: 'La photogrammétrie reconstruit la géométrie à partir de photos qui se recouvrent : idéale pour les rendus texturés et les orthophotos. Le LiDAR mesure directement des distances par impulsions laser : pertinent pour les géométries complexes, les zones peu texturées ou les terrains partiellement végétalisés. Nous choisissons selon le site et le livrable attendu.' },
    { q: 'Quelle précision peut-on obtenir avec un relevé drone ?', a: 'Elle dépend du capteur, de la hauteur de vol, du relief, de la couverture GNSS, des points de contrôle, des conditions de prise de vue et du traitement. Nous fixons l’objectif de précision au cahier des charges et prévoyons les contrôles adaptés, sans promettre une valeur universelle déconnectée du terrain.' },
    { q: 'Pouvez-vous calculer des volumes et des cubatures ?', a: 'Oui. À partir d’une surface de référence et d’un relevé contrôlé, nous calculons des stocks, comparons deux états, produisons un bilan déblai-remblai et illustrons les écarts. Périmètre, référence altimétrique et exclusions sont validés avant calcul.' },
    { q: 'Quels formats de fichiers pouvez-vous livrer ?', a: 'Selon votre chaîne de travail : LAS, LAZ ou E57 pour les nuages de points ; GeoTIFF pour les orthophotos et modèles numériques ; DXF, DWG ou PDF pour les plans ; OBJ et formats 3D pour les maillages. Un échantillon peut être validé avant la livraison complète.' },
    { q: 'Les données sont-elles compatibles avec AutoCAD, Revit, QGIS ou Blender ?', a: 'Oui, à condition de définir le bon format, le système de coordonnées, l’unité et le niveau de détail. Nous préparons les exports pour vos outils CAO, SIG, BIM ou 3D et documentons les paramètres essentiels.' },
    { q: 'Un relevé drone remplace-t-il un bornage par géomètre-expert ?', a: 'Non. En France, la délimitation juridique d’une propriété et le bornage relèvent du géomètre-expert. Nos relevés servent à la documentation, à la conception, au suivi ou à l’aide à la décision ; ils ne fixent pas les limites foncières et ne remplacent pas les études ou validations réservées aux professionnels habilités.' },
    { q: 'Combien coûte une mission de bureau d’étude drone ?', a: 'Le devis dépend de la surface, du relief, des contraintes aériennes, de la méthode d’acquisition, de la précision, du niveau de nettoyage et des livrables. Envoyez-nous la localisation, le périmètre et un exemple du résultat attendu : nous vous faisons une proposition claire.' },
  ],
  related: ['/modelisation-3d-drone/', '/topographie-par-drone-2/'],
  closing: {
    title: 'Étudions votre besoin technique',
    text: 'Envoyez-nous la localisation, le périmètre, vos plans disponibles, le logiciel cible et le résultat attendu. Nous vous proposons la méthode d’acquisition, les contrôles et les livrables adaptés.',
  },
};
export default page;
