import type { ServicePage } from '../service-pages';

// From https://www.lesdroneslyonnais.com/nettoyage-par-drone/
const page: ServicePage = {
  slug: 'nettoyage-par-drone',
  description: 'Nettoyage par drone à Lyon et partout en France : façades, panneaux solaires, vitres et sites industriels nettoyés haute pression, sans échafaudage.',
  hero: {
    kicker: 'Nettoyage haute pression par drone',
    title: 'Nettoyage par drone à Lyon et partout en France',
    hook: 'Façades, panneaux solaires, vitres et sites industriels nettoyés haute pression, sans échafaudage.',
    intro: 'Le drone travaille en hauteur, nos télépilotes restent au sol : pas de nacelle à mobiliser, pas d’échafaudage à monter.',
    highlights: [
      { title: 'Télépilotes professionnels' },
      { title: 'Pression adaptée' },
      { title: 'Intervention sécurisée' },
    ],
  },
  pitch: {
    title: 'La solution rapide pour les surfaces difficiles d’accès',
    paragraphs: [
      'Nous intervenons depuis le sol avec un drone haute pression relié à une pompe. Les surfaces hautes ou complexes sont nettoyées efficacement, sans installer d’échafaudage ni mobiliser de nacelle.',
      'Basés à Lyon, nous intervenons dans le Rhône, en Auvergne-Rhône-Alpes et partout en France, pour les entreprises, les industriels, les gestionnaires de patrimoine et les collectivités.',
    ],
  },
  uses: {
    title: 'Quelle surface souhaitez-vous nettoyer ?',
    items: [
      { title: 'Panneaux solaires', text: 'Poussières, pollen, fientes ou dépôts industriels font baisser le rendement. Le drone nettoie sans marcher sur les modules, même sur de grandes surfaces ou des toitures fragiles.' },
      { title: 'Façades et bardages', text: 'Pollution, traces, salissures, dépôts verts : vos façades et bardages métalliques retrouvent leur éclat, jusque dans les zones les plus hautes, sans nacelle.' },
      { title: 'Vitres en hauteur', text: 'Immeubles de bureaux, verrières, surfaces complexes : les grands vitrages sont nettoyés à l’eau, sans traces, en toute sécurité depuis le sol.' },
      { title: 'Industrie et énergie', text: 'Éoliennes, silos, cuves, toitures et bâtiments industriels : moins d’arrêts de production et des équipements qui durent plus longtemps.' },
    ],
  },
  method: {
    title: 'Comment fonctionne le nettoyage haute pression par drone ?',
    intro: 'Le drone est relié au sol par un flexible haute pression qui l’alimente en eau. Pression et débit sont réglés selon le support et le niveau d’encrassement.',
    items: [
      'Pression réglable selon le support',
      'Eau adaptée au support, eau pure pour les vitrages',
      'Accès grande hauteur, sans nacelle',
      'Aucun passage sur les panneaux solaires',
      'Moins de gêne sur site',
      'Résultat immédiat',
    ],
  },
  audience: {
    title: 'Pour qui intervenons-nous ?',
    items: ['Entreprises', 'Sites industriels', 'Exploitants photovoltaïques', 'Syndics', 'Collectivités'],
  },
  process: {
    title: 'Le déroulement d’une intervention',
    steps: [
      { title: 'Analyse du support', text: 'Étude du site, des matériaux et du niveau d’encrassement pour définir le protocole.' },
      { title: 'Méthode et protections', text: 'La méthode de nettoyage, la pression et les protections nécessaires sont définies.' },
      { title: 'Intervention sécurisée', text: 'Le jour J, la zone est sécurisée au sol avant le travail du drone.' },
    ],
  },
  pricing: {
    title: 'Quel est le prix d’un nettoyage par drone ?',
    rows: [
      { label: 'Panneaux solaires', price: '6 à 10 € / m² HT' },
      { label: 'Façades et bardages', price: '7 à 12 € / m² HT' },
      { label: 'Vitrages en hauteur', price: '8 à 15 € / m² HT' },
      { label: 'Éoliennes, silos et industrie', price: 'Sur devis' },
    ],
    note: 'Minimum d’intervention : 750 € HT. Tarifs indicatifs selon la surface, la hauteur, l’accès, l’état du support et la localisation.',
  },
  reasons: {
    title: 'Pourquoi choisir Les Drones Lyonnais pour votre nettoyage ?',
    items: [
      { title: 'Expertise technique', text: 'La maîtrise du nettoyage haute pression sur tous types de supports.' },
      { title: 'Télépilotes déclarés', text: 'Des télépilotes certifiés et déclarés à la DGAC pour chaque mission.' },
      { title: 'Matériel professionnel', text: 'Des drones et des pompes haute pression performants et entretenus.' },
      { title: 'Protocole sécurisé', text: 'Une analyse préalable et un plan de prévention pour chaque intervention.' },
      { title: 'Intervention nationale', text: 'Basés à Lyon, nous intervenons partout en France.' },
      { title: 'Devis détaillé', text: 'Un devis clair, sans surprise, sous 24 à 48 h.' },
    ],
  },
  faq: [
    { q: 'Quelle est la différence entre le nettoyage et le démoussage d’une toiture ?', a: 'Le nettoyage retire les salissures et les dépôts présents sur la couverture. Le démoussage cible les mousses, les algues et les lichens, avec un traitement adapté si nécessaire. Les deux sont complémentaires : le choix dépend de la nature des salissures et de l’état du toit.' },
    { q: 'Quelles salissures peut-on enlever lors d’un nettoyage de toiture ?', a: 'Poussières, certains dépôts liés à la pollution, résidus organiques… Les traces noires ou vertes doivent être identifiées pour choisir la bonne méthode. Certaines marques viennent du vieillissement du matériau et ne partent pas avec un simple nettoyage.' },
    { q: 'Le nettoyage de toiture par drone utilise-t-il forcément de la haute pression ?', a: 'Non. La méthode, la pression et les éventuels produits sont adaptés à la couverture : sur un matériau sensible, un nettoyage trop agressif peut l’abîmer. Les recommandations du fabricant et l’état du support guident notre choix.' },
    { q: 'Quels sont les avantages du nettoyage de toiture par drone ?', a: 'Le drone atteint les surfaces en hauteur en limitant les déplacements d’un intervenant sur la couverture. Selon le bâtiment, il peut aussi éviter une nacelle ou un échafaudage. Ces avantages dépendent des accès, des obstacles et de la possibilité de sécuriser la zone au sol.' },
    { q: 'Comment se déroule une prestation de nettoyage de toiture par drone ?', a: 'Nous étudions d’abord la toiture et son environnement : matériau, salissures, état apparent, accès et obstacles. Nous définissons ensuite la méthode et les protections nécessaires. Le jour de l’intervention, la zone est sécurisée avant le travail du drone. Les éventuelles opérations complémentaires sont précisées dans le devis.' },
    { q: 'Le nettoyage permet-il de retrouver une toiture comme neuve ?', a: 'Il améliore nettement l’aspect d’une toiture, mais ne remet pas un matériau ancien à neuf. Le résultat dépend des salissures, de l’usure et des altérations de surface, et certaines traces peuvent persister. Un nettoyage avec rinçage et un traitement à action progressive n’ont pas non plus le même délai de résultat.' },
    { q: 'Combien de temps dure un nettoyage de toiture par drone ?', a: 'Cela dépend de la surface, de la forme du toit, du niveau d’encrassement et de la méthode retenue, sans oublier l’installation, la sécurisation des abords et les éventuels rinçages. Le temps passé sur place ne doit pas être confondu avec le délai d’action d’un produit, qui peut se poursuivre après l’intervention.' },
    { q: 'Le nettoyage d’une toiture peut-il supprimer une fuite ?', a: 'Non. Un nettoyage ne répare pas une fuite et ne remplace pas des travaux de couverture. Tuiles cassées, joints défectueux ou raccords endommagés demandent une intervention adaptée. Si nous repérons des signes de dégradation avant le nettoyage, un contrôle par un couvreur peut être nécessaire.' },
    { q: 'Le nettoyage des gouttières et des panneaux solaires est-il compris ?', a: 'Pas automatiquement. Le retrait des débris dans les gouttières peut nécessiter une intervention distincte, et les panneaux photovoltaïques demandent une méthode compatible avec les consignes de leur fabricant. Signalez ces équipements pour que le devis précise le périmètre.' },
    { q: 'Comment obtenir un devis pour un nettoyage de toiture à Lyon ?', a: 'Envoyez-nous l’adresse du bâtiment, des photos et, si possible, le matériau et la surface approximative de la toiture. Le prix dépend notamment de l’encrassement, des accès et des opérations nécessaires. Nous étudions votre projet à Lyon ou dans le Rhône et vous proposons une intervention adaptée.' },
  ],
  closing: {
    title: 'Nettoyage par drone à Lyon, en Auvergne-Rhône-Alpes et partout en France',
    text: 'Basés à Lyon, nous intervenons rapidement dans le Rhône, en Auvergne-Rhône-Alpes et sur tout le territoire. Demandez votre estimation gratuite.',
  },
  gallery: ['https://www.lesdroneslyonnais.com/wp-content/uploads/2026/09/Nettoyage-par-drone-Grande-1024x576.jpeg'],
};
export default page;
