import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/demoussage-par-drone/
const page: ServicePage = {
  slug: 'demoussage-par-drone',
  description: 'Démoussage de toiture par drone à Lyon et dans le Rhône : diagnostic à distance, traitement homogène, sans échafaudage ni nacelle. Tarifs au m².',
  hero: {
    kicker: 'Simple, rapide et sans contrainte',
    title: 'Démoussage par drone',
    hook: 'Retrouvez une toiture propre, sans échafaudage.',
    intro: 'Une intervention rapide, sécurisée et adaptée à votre toiture.',
    highlights: [
      { title: 'Télépilotes professionnels' },
      { title: 'Pression adaptée' },
      { title: 'Intervention sécurisée' },
    ],
  },
  pitch: {
    title: 'Pourquoi démousser sa toiture ?',
    paragraphs: [
      'Avec le temps, mousses, lichens et algues retiennent l’humidité et fragilisent vos tuiles. Un entretien régulier prolonge la durée de vie de la toiture et préserve l’esthétique de votre maison.',
      'Le traitement agit dans la durée : en quelques semaines, sous l’effet du produit et des intempéries, mousses et lichens se dégradent naturellement.',
    ],
    checklist: ['Préserver les matériaux', 'Éviter les infiltrations', 'Retrouver une toiture saine'],
  },
  uses: {
    title: 'Pour quels bâtiments ?',
    items: [
      { title: 'Maisons individuelles', text: 'Protégez votre maison et valorisez votre bien.' },
      { title: 'Copropriétés', text: 'Des toitures communes entretenues efficacement, sans nuisance.' },
      { title: 'Bâtiments professionnels', text: 'Des bâtiments maintenus en parfait état.' },
    ],
  },
  method: {
    title: 'Une méthode sans contrainte',
    items: ['Diagnostic à distance', 'Aucune nacelle', 'Traitement homogène', 'Contrôle final'],
  },
  process: {
    title: 'Comment se déroule l’intervention ?',
    steps: [
      { title: 'Vous nous envoyez vos photos', text: 'Quelques photos suffisent pour un diagnostic précis à distance.' },
      { title: 'Nous préparons la mission', text: 'Nous analysons votre toiture et préparons un plan de traitement adapté.' },
      { title: 'Le drone applique le traitement', text: 'Une application homogène et maîtrisée, sans échafaudage ni risque pour votre toiture.' },
      { title: 'Vous recevez le compte rendu', text: 'Photos, détail de l’intervention et conseils d’entretien.' },
    ],
  },
  pricing: {
    title: 'Des tarifs clairs, sans surprise',
    rows: [
      { label: 'Jusqu’à 100 m²', price: '9 € / m²' },
      { label: '101 à 200 m²', price: '8 € / m²' },
      { label: '201 à 400 m²', price: '7 € / m²' },
      { label: 'Plus de 400 m²', price: 'Sur devis' },
    ],
    note: 'Le prix dépend principalement de la surface de votre toiture. Minimum d’intervention : 750 € HT. Tarifs indicatifs selon la surface, la hauteur, l’accès, l’état du support et la localisation.',
  },
  reasons: {
    title: 'Les avantages du démoussage par drone',
    items: [
      { title: 'Application ciblée', text: 'Le drone pulvérise uniquement sur la toiture : efficacité maximale, sans surdosage.' },
      { title: 'Dosage maîtrisé', text: 'La quantité de produit est ajustée à l’état et à la surface à traiter.' },
      { title: 'Moins de matériel au sol', text: 'Sans échafaudage, votre extérieur est préservé et l’accès facilité.' },
      { title: 'Moins de gêne pour les occupants', text: 'Une intervention rapide et discrète, pour votre confort au quotidien.' },
    ],
  },
  faq: [
    { q: 'Qu’est-ce que le démoussage de toiture par drone ?', a: 'C’est l’application, par drone, d’un traitement adapté pour éliminer les mousses, les algues et les lichens de la couverture. Le drone atteint les surfaces à traiter en limitant les déplacements sur le toit. La méthode dépend du matériau, de l’état de la toiture et de l’importance des dépôts.' },
    { q: 'Pourquoi faut-il enlever la mousse sur une toiture ?', a: 'Mousses et débris végétaux retiennent l’humidité et gênent l’écoulement des eaux de pluie. Leur accumulation complique l’entretien et peut favoriser certaines dégradations. Un démoussage adapté aide à préserver la toiture, mais ne remplace pas la réparation de tuiles déjà abîmées.' },
    { q: 'Le démoussage par drone suffit-il pour une toiture très envahie ?', a: 'Pas toujours. Face à des couches épaisses de mousse ou à des dépôts très accrochés, une préparation ou un retrait mécanique complémentaire peut être nécessaire. L’examen préalable permet de savoir si le traitement par drone convient ou si une autre intervention est à prévoir.' },
    { q: 'Peut-on démousser une toiture en tuiles ou en ardoises par drone ?', a: 'Oui, c’est envisageable sur différentes couvertures, dont les tuiles et les ardoises, sous réserve de leur état et de la compatibilité du traitement. Nous vérifions le matériau, ses éventuels revêtements et les recommandations du fabricant. Une toiture fragile ou dégradée demande une attention particulière.' },
    { q: 'Au bout de combien de temps voit-on les résultats d’un démoussage ?', a: 'Avec un traitement à action progressive, le résultat n’est pas immédiat : il peut s’étaler sur plusieurs semaines, voire plusieurs mois, selon le produit, les organismes présents et la météo. Les dépôts visibles disparaissent parfois plus lentement que le traitement n’agit. Le délai attendu est précisé pour chaque intervention.' },
    { q: 'Quelle est la meilleure période pour démousser une toiture ?', a: 'Tout dépend de la météo et des exigences du traitement : température d’application et délai sans pluie indiqués par le fabricant. Pour une application par drone, le vent doit aussi permettre un vol maîtrisé et une pulvérisation précise. La date est donc fixée selon les conditions réelles.' },
    { q: 'À quelle fréquence faut-il faire démousser sa toiture ?', a: 'Il n’existe pas de fréquence unique. L’ombre, l’humidité, la proximité des arbres et le type de couverture influencent la repousse des mousses. Mieux vaut un contrôle visuel régulier et un entretien quand il devient nécessaire qu’un traitement systématique chaque année.' },
    { q: 'Quelles précautions faut-il prendre pour le jardin et les récupérateurs d’eau ?', a: 'Elles dépendent du produit et de l’environnement du bâtiment. Végétaux, bassins et équipements sensibles sont identifiés avant le traitement, et la récupération des eaux de pluie peut devoir être interrompue selon les consignes du fabricant. Signalez-nous tout potager, bassin ou cuve dans votre demande de devis.' },
    { q: 'Quel est le prix d’un démoussage de toiture par drone ?', a: 'Il dépend de la surface réelle de la toiture, du niveau d’encrassement, du matériau et des contraintes d’intervention. Une préparation complémentaire ou des protections particulières peuvent aussi le faire varier. Le devis personnalisé précise les surfaces traitées, la méthode et les prestations comprises.' },
    { q: 'Proposez-vous le démoussage de toiture par drone à Lyon et dans le Rhône ?', a: 'Oui, Les Drones Lyonnais étudie vos projets à Lyon, dans la métropole lyonnaise et dans le Rhône. La faisabilité dépend de la couverture, des accès et de l’environnement du bâtiment. Pour une première étude, envoyez-nous l’adresse, quelques photos et une estimation de la surface à traiter.' },
  ],
  closing: {
    title: 'Estimez le tarif de votre démoussage',
    text: 'Envoyez-nous l’adresse, quelques photos et une estimation de la surface à traiter : nous étudions votre toiture à Lyon, dans la métropole lyonnaise et dans le Rhône.',
  },
  gallery: ['https://www.lesdroneslyonnais.com/wp-content/uploads/2026/09/Nettoyage-par-drone-Grande-1024x576.jpeg'],
};
export default page;
