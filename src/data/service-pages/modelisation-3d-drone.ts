import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/modelisation-3d-drone/
const page: ServicePage = {
  slug: 'modelisation-3d-drone',
  description: 'Modélisation 3D par drone à Lyon et partout en France : LiDAR ou photogrammétrie, nuages de points, modèles texturés, orthophotos et MNT.',
  hero: {
    kicker: 'Relevé et numérisation du réel',
    title: 'Modélisation 3D par drone',
    hook: 'LiDAR ou photogrammétrie : la méthode qui colle à votre terrain, à vos données et à leur usage final.',
    intro: 'À Lyon et partout en France, nous transformons bâtiments, terrains, ouvrages et sites industriels en données 3D mesurables. Nuage de points, modèle texturé, orthophoto, MNT ou maquette : chaque livrable est défini avant le vol.',
    highlights: [
      { title: 'Acquisition sur mesure', text: 'LiDAR, photographie ou méthode hybride' },
      { title: 'Données géoréférencées', text: 'RTK, points de contrôle et référentiel adapté' },
      { title: 'Livrables compatibles', text: 'DAO, SIG, BIM, 3D et visualisation web' },
    ],
  },
  pitch: {
    kicker: 'Modélisation 3D à Lyon et en France',
    title: 'Du relevé terrain à une donnée vraiment exploitable',
    paragraphs: [
      'Un bon modèle 3D ne se résume pas à un beau rendu. Il répond à une question précise : mesurer un volume, documenter un bâtiment, préparer des travaux, alimenter une maquette BIM ou conserver l’état numérique d’un ouvrage.',
      'Nous construisons le protocole d’acquisition à partir de votre cahier des charges. Plan de vol, capteur, géoréférencement, densité de données et exports sont pensés ensemble, pour éviter un modèle trop lourd, incomplet ou inutilisable dans vos logiciels.',
    ],
    checklist: [
      'Drone RTK et trajectoires planifiées',
      'LiDAR ou prises de vues haute résolution',
      'Points de contrôle selon la précision visée',
      'Nuage de points nettoyé et contrôlé',
      'Formats adaptés à votre chaîne métier',
      'Accompagnement jusqu’à l’exploitation',
    ],
  },
  uses: {
    kicker: 'Applications et projets',
    title: 'Que peut-on modéliser en 3D par drone ?',
    intro: 'Du bâtiment isolé au terrain de plusieurs hectares, la stratégie d’acquisition s’adapte à l’échelle, à la précision et au niveau de détail attendu.',
    items: [
      { title: 'Bâtiments et maquettes BIM', text: 'Façades, toitures et volumes relevés pour l’étude d’existant, la rénovation, l’intégration architecturale ou le Scan to BIM.' },
      { title: 'Terrains et terrassements', text: 'Modèles numériques, courbes de niveau, profils, cubatures et comparaison d’états pour suivre un chantier.' },
      { title: 'Industrie et infrastructures', text: 'Ouvrages, sites de production, réseaux et équipements numérisés pour l’inspection, la maintenance ou la conception.' },
      { title: 'Patrimoine et architecture', text: 'Un état numérique détaillé pour conserver, documenter les formes complexes et valoriser les édifices remarquables.' },
    ],
  },
  method: {
    kicker: 'Expertise Les Drones Lyonnais',
    title: 'De la captation à l’exploitation de la donnée',
    intro: 'Notre travail ne s’arrête pas au vol. Notre bureau d’étude contrôle la reconstruction, nettoie les données et prépare les exports pour votre usage métier.',
    items: [
      'Analyse du cahier des charges et de la précision',
      'Choix entre LiDAR, photo ou acquisition hybride',
      'Plan de vol RTK et points de contrôle si nécessaire',
      'Traitement, classification et contrôle qualité',
      'Découpage, allègement et formats personnalisés',
      'Accompagnement pour l’ouverture et l’exploitation',
    ],
  },
  deliverables: {
    kicker: 'Livrables sur mesure',
    title: 'Des données prêtes pour vos logiciels',
    items: [
      { title: 'Nuage de points', text: 'LAS, LAZ, E57 ou format compatible.' },
      { title: 'Modèle 3D texturé', text: 'OBJ, MTL, textures et maillage.' },
      { title: 'Orthophotographie', text: 'GeoTIFF ou image géoréférencée.' },
      { title: 'MNT et MNS', text: 'Modèles numériques du terrain et de surface.' },
      { title: 'Plans et courbes', text: 'Profils, contours, DXF et mesures.' },
      { title: 'Visualisation web', text: 'Une consultation et un partage simplifiés.' },
    ],
  },
  audience: {
    title: 'Une donnée 3D pensée pour les professionnels',
    items: [
      'Architectes',
      'Géomètres et topographes',
      'Bureaux d’études',
      'Entreprises du BTP',
      'Industriels',
      'Collectivités',
      'Carrières et plateformes',
      'Acteurs du patrimoine',
    ],
  },
  process: {
    title: 'Du cahier des charges au modèle final',
    steps: [
      { title: 'Cadrage du besoin', text: 'Usage, précision, périmètre, système de coordonnées, logiciels et livrables attendus.' },
      { title: 'Choix de la méthode', text: 'Photogrammétrie, LiDAR ou hybride, plan de vol, RTK et points de contrôle.' },
      { title: 'Acquisition terrain', text: 'Captation méthodique, contrôle de la couverture et sécurisation des données.' },
      { title: 'Traitement et livraison', text: 'Calcul, nettoyage, contrôle qualité, exports et aide à la prise en main.' },
    ],
  },
  caseStudy: {
    title: 'Modélisation d’un site et de ses volumes',
    label: 'Exemple de scénario',
    brief: 'Disposer d’un état complet du terrain, des ouvrages et des zones de stockage.',
    mission: 'Vol RTK, acquisition 3D, points de contrôle et traitement dans le référentiel demandé.',
    result: 'Nuage de points, modèle de surface, orthophoto, cubatures et fichier de visualisation.',
  },
  reasons: {
    title: 'Pourquoi choisir Les Drones Lyonnais',
    items: [
      { title: 'Double technologie', text: 'LiDAR et photogrammétrie, choisis selon le terrain et l’usage.' },
      { title: 'Acquisition RTK', text: 'Un positionnement défini selon la précision recherchée.' },
      { title: 'Traitement maîtrisé', text: 'Contrôle, nettoyage et préparation des données en interne.' },
      { title: 'Livrables adaptés', text: 'Des formats compatibles avec vos logiciels et votre méthode de travail.' },
      { title: 'Intervention France', text: 'Une équipe basée à Lyon, mobile sur tout le territoire.' },
    ],
  },
  faq: [
    { q: 'Quelle est la différence entre LiDAR et photogrammétrie ?', a: 'Le LiDAR mesure directement des distances par impulsions laser et produit un nuage de points. La photogrammétrie reconstruit la géométrie à partir de nombreuses photos qui se recouvrent. Le LiDAR excelle sur le relief, la végétation ou les géométries difficiles ; la photogrammétrie offre en général un rendu visuel et des textures plus riches.' },
    { q: 'Comment choisir la bonne méthode de modélisation 3D ?', a: 'Nous partons de l’usage final : mesures, plans, MNT, BIM, inspection, communication ou archivage. Végétation, matériaux, lumière, taille du site, précision attendue et formats demandés orientent ensuite le choix entre LiDAR, photogrammétrie ou acquisition hybride.' },
    { q: 'Quelle précision peut-on obtenir avec un relevé 3D par drone ?', a: 'Il n’existe pas de précision universelle. Elle dépend du capteur, de la hauteur de vol, du relief, de la résolution, du positionnement RTK/PPK, des points de contrôle et du traitement. Nous définissons avant la mission un protocole et un niveau de précision cohérents avec votre besoin.' },
    { q: 'Peut-on prendre des mesures dans le modèle 3D ?', a: 'Oui, si le relevé a été conçu pour cela. Selon le livrable, vous mesurez distances, surfaces, hauteurs, pentes et volumes, extrayez des profils ou comparez plusieurs états d’un site.' },
    { q: 'Le LiDAR permet-il de relever le sol sous la végétation ?', a: 'Certaines impulsions LiDAR atteignent le sol à travers les ouvertures du couvert végétal. Le nuage de points est ensuite classé pour distinguer terrain, végétation et bâti. Le résultat dépend toutefois de la densité du couvert et des conditions d’acquisition.' },
    { q: 'Quels formats de fichiers pouvez-vous livrer ?', a: 'Nous adaptons les exports à vos logiciels : LAS/LAZ ou E57 pour les nuages de points, OBJ/MTL/JPG pour les modèles texturés, GeoTIFF pour les orthophotos et modèles numériques, DXF, PDF ou autres formats convenus pour les plans et profils.' },
    { q: 'La modélisation 3D par drone remplace-t-elle un géomètre ?', a: 'Non. Le drone est un moyen d’acquisition très performant, mais il ne remplace ni les actes réservés ni les validations réglementaires d’un géomètre-expert. Nous pouvons produire les données demandées par votre géomètre ou travailler en complément de son intervention.' },
    { q: 'Quel est le prix d’une modélisation 3D par drone ?', a: 'Le prix dépend de la surface, de la complexité, des autorisations, de la méthode d’acquisition, de la précision et des livrables. Envoyez-nous le périmètre, vos plans éventuels et le cahier des charges : nous établissons un devis détaillé.' },
  ],
  related: ['/inspection-visuelle-par-drone/', '/bureau-detude-drone/'],
  closing: {
    title: 'Parlons de vos données et de leur usage',
    text: 'Indiquez-nous le périmètre, la précision recherchée et les formats souhaités : nous vous recommandons la méthode la plus cohérente.',
  },
};
export default page;
