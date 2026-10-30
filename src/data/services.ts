// The drone services: one source for the homepage screen and the /prestations/ page.
// URLs are the ones indexed on the WordPress site. Summaries come from each service
// page (meta descriptions), shortened.
import type { PopPose } from '../components/ui/PopTip.astro';

/**
 * How the drone camera shows a service:
 * thermal (heat map), survey (line drawing of the terrain), mesh (3D model wireframe),
 * detect (inspection boxes), lowlight (confined spaces), timelapse, cine (framing
 * guides), live (broadcast), grade (colour grading split).
 */
export type Sensor = 'thermal' | 'survey' | 'mesh' | 'detect' | 'lowlight' | 'timelapse' | 'cine' | 'live' | 'grade';

/** The two families of the current site: "Prestation technique" and "Prestation artistique". */
export type ServiceFamily = 'technique' | 'artistique';

export interface Service {
  label: string;
  href: string;
  family: ServiceFamily;
  summary: string;
  /** Photo in src/assets/services */
  image: string;
  sensor: Sensor;
}

export const SENSOR_LABEL: Record<Sensor, string> = {
  thermal: 'Caméra thermique',
  survey: 'Relevé topographique',
  mesh: 'Maillage 3D',
  detect: 'Inspection visuelle',
  lowlight: 'Basse lumière',
  timelapse: 'Timelapse',
  cine: 'Cinéma 4K',
  live: 'Direct multicam',
  grade: 'Étalonnage',
};

export const FAMILIES: Record<ServiceFamily, { title: string; tagline: string; description: string }> = {
  technique: {
    title: 'Prestations techniques',
    tagline: 'La précision comme maître-mot',
    description: 'Inspection, mesure et suivi d’ouvrages : des données fiables sur vos bâtiments et infrastructures, sans échafaudage ni nacelle.',
  },
  artistique: {
    title: 'Prestations artistiques',
    tagline: 'L’art de capturer des images uniques',
    description: 'Du plan aérien cinéma au film d’entreprise, tourné, monté et étalonné par la même équipe.',
  },
};

export const SERVICES: Service[] = [
  // Technique
  {
    label: 'Inspection thermique',
    href: '/inspection-thermique-par-drone-2/',
    family: 'technique',
    summary: 'Bâtiments, panneaux solaires et sites industriels : anomalies localisées et rapport illustré.',
    image: 'inspection-thermique.jpg',
    sensor: 'thermal',
  },
  {
    label: 'Inspection visuelle',
    href: '/inspection-visuelle-par-drone/',
    family: 'technique',
    summary: 'Toitures, façades, ouvrages et infrastructures contrôlés rapidement, en toute sécurité.',
    image: 'inspection-visuelle.jpg',
    sensor: 'detect',
  },
  {
    label: 'Inspection en milieu confiné',
    href: '/inspection-en-milieu-confine-par-drone/',
    family: 'technique',
    summary: 'Cuves, silos et canalisations : images HD et rapport détaillé, sans entrer dans l’ouvrage.',
    image: 'milieu-confine.jpg',
    sensor: 'lowlight',
  },
  {
    label: 'Topographie',
    href: '/topographie-par-drone-2/',
    family: 'technique',
    summary: 'Relevés, orthophotos, courbes de niveau et calculs de volumes pour vos projets BTP.',
    image: 'topographie.jpg',
    sensor: 'survey',
  },
  {
    label: 'Modélisation 3D',
    href: '/modelisation-3d-drone/',
    family: 'technique',
    summary: 'Photogrammétrie et nuages de points de bâtiments et de terrains.',
    image: 'modelisation-3d.jpg',
    sensor: 'mesh',
  },
  {
    label: 'Bureau d’étude',
    href: '/bureau-detude-drone/',
    family: 'technique',
    summary: 'Photogrammétrie, LiDAR, MNT, plans, cubatures et modèles 3D exploitables.',
    image: 'bureau-etude.jpg',
    sensor: 'survey',
  },
  {
    label: 'Suivi de chantier',
    href: '/suivi-de-chantier-timelapse/',
    family: 'technique',
    summary: 'Installation longue durée, images HD et vidéos pour suivre et valoriser vos projets.',
    image: 'suivi-chantier.jpg',
    sensor: 'timelapse',
  },
  {
    label: 'Nettoyage par drone',
    href: '/nettoyage-par-drone/',
    family: 'technique',
    summary: 'Façades, vitrages et toitures nettoyés en hauteur, sans nacelle ni échafaudage.',
    image: 'nettoyage.jpg',
    sensor: 'detect',
  },
  {
    label: 'Démoussage par drone',
    href: '/demoussage-par-drone/',
    family: 'technique',
    summary: 'Traitement des toitures par pulvérisation, sans monter sur le toit.',
    image: 'demoussage.jpg',
    sensor: 'detect',
  },
  // Artistique
  {
    label: 'Prises de vues aériennes cinéma',
    href: '/prises-de-vues-aeriennes-cinema-drone-lyon/',
    family: 'artistique',
    summary: 'Plans cinématographiques et captation haute qualité pour vos productions.',
    image: 'cinema.jpg',
    sensor: 'cine',
  },
  {
    label: 'Tournage immersif en FPV',
    href: '/tournage-immersif-plan-sequence-fpv-lyon/',
    family: 'artistique',
    summary: 'Plans-séquences dynamiques : visites de lieux, événements, productions spectaculaires.',
    image: 'fpv.jpg',
    sensor: 'cine',
  },
  {
    label: 'Film d’entreprise',
    href: '/film-entreprise-corporate-lyon/',
    family: 'artistique',
    summary: 'Tournage, drone, interviews et montage pour valoriser votre entreprise.',
    image: 'film-entreprise.jpg',
    sensor: 'cine',
  },
  {
    label: 'Live streaming et captation',
    href: '/live-streaming-captation-evenementielle-lyon/',
    family: 'artistique',
    summary: 'Vos événements en direct : multicaméra, régie, son et diffusion professionnelle.',
    image: 'live.jpg',
    sensor: 'live',
  },
  {
    label: 'Interview',
    href: '/production-audiovisuelle-interview-lyon/',
    family: 'artistique',
    summary: 'Tournage, cadrage, son, éclairage et montage pour vos témoignages et contenus corporate.',
    image: 'interview.jpg',
    sensor: 'cine',
  },
  {
    label: 'Cadreur',
    href: '/production-audiovisuelle-cadreur-lyon/',
    family: 'artistique',
    summary: 'Un cadreur professionnel pour vos tournages, interviews et événements.',
    image: 'cadreur.jpg',
    sensor: 'cine',
  },
  {
    label: 'Post-production',
    href: '/postproduction-audiovisuelle-lyon/',
    family: 'artistique',
    summary: 'Montage, étalonnage, sound design, habillage graphique et finitions.',
    image: 'post-production.jpg',
    sensor: 'grade',
  },
  {
    label: 'Timelapse',
    href: '/timelapse-suivi-chantier-lyon/',
    family: 'artistique',
    summary: 'Prises de vue régulières sur la durée et montage vidéo final de votre chantier.',
    image: 'timelapse.jpg',
    sensor: 'timelapse',
  },
  {
    label: 'Mariage : photo, vidéo et drone',
    href: '/mariage-photo-video-drone-lyon/',
    family: 'artistique',
    summary: 'Préparatifs, cérémonie, couple et soirée : un film de mariage sur mesure.',
    image: 'mariage.jpg',
    sensor: 'cine',
  },
];

export const servicesOf = (family: ServiceFamily) => SERVICES.filter((s) => s.family === family);

/** The working method shown on /prestations/ — a real sequence, hence numbered.
 *  `pose`: how Pop illustrates the step (src/assets/pop). */
export const METHOD: MethodStep[] = [
  { title: 'Préparation', text: 'Analyse de votre besoin et faisabilité technique.', pose: 'support' },
  { title: 'Autorisations', text: 'Étude aéronautique et autorisations de vol obtenues.', pose: 'manuel' },
  { title: 'Intervention', text: 'Missions réalisées par nos télépilotes professionnels.', pose: 'pilote' },
  { title: 'Contrôle qualité', text: 'Vérification rigoureuse des données collectées.', pose: 'loupe' },
  { title: 'Livrables', text: 'Livrables exploitables, sécurisés et remis dans les délais.', pose: 'livraison' },
];

export interface MethodStep {
  title: string;
  text: string;
  pose: PopPose;
}

/** The three promises of the current page's header. */
export const PROMISES = [
  { title: 'Solutions sur mesure', text: 'Adaptées à chaque projet.' },
  { title: 'Sécurité et conformité', text: 'Autorisations prises en charge.' },
  { title: 'Expertise polyvalente', text: 'Prises de vues et missions techniques.' },
];
