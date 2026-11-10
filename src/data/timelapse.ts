// Page /timelapse-chantier/ : suivi d'un chantier filmé par une caméra Tikee.
//
// MISE À JOUR MENSUELLE — c'est le seul fichier à modifier :
//   1. Dans l'appli Tikee, partagez la vidéo du mois et copiez l'adresse (src="…") de
//      l'iframe proposée. Une vidéo YouTube ou Vimeo en mode « intégrer » marche aussi.
//   2. Ajoutez une ligne EN HAUT de la liste `videos` : la plus récente s'affiche en grand.
//      Exemple :
//        { month: '2026-11', title: 'Novembre 2026', src: 'https://my.tikee.io/…' },
//
// Toutes les iframes de la page sont « sandboxées » : le bouton « Téléchargement » de
// Tikee reste visible mais ne télécharge plus rien (testé sous Chrome le 2026-11-06).

export interface TimelapseVideo {
  /** Mois au format AAAA-MM, sert au tri et à l'ancre de la vidéo. */
  month: string;
  /** Libellé affiché, ex. « Novembre 2026 ». */
  title: string;
  /** Adresse de l'iframe (attribut src), Tikee, YouTube ou Vimeo. */
  src: string;
  /** Une phrase facultative sur ce qui s'est passé ce mois-ci. */
  note?: string;
}

export interface TimelapseGallery {
  title: string;
  /** Adresse de l'iframe « photo gallery » de Tikee (attribut src). */
  src: string;
}

export const TIMELAPSE = {
  /** Nom du chantier, affiché en titre. */
  site: 'École Nat N°2',
  intro:
    'Une caméra timelapse photographie le chantier toute la journée. Retrouvez ici les dernières images en direct et le film de chaque mois.',

  /** Galeries photo Tikee (images mises à jour automatiquement par la caméra). */
  galleries: [
    {
      title: 'Les dernières photos',
      src: 'https://my.tikee.io/time_lapses/106570/photo_gallery/561633e4-f8d1-4240-b4eb-ab13e54e7589?lang=fr',
    },
  ] satisfies TimelapseGallery[],

  /** Vidéos du mois, la plus récente EN PREMIER. */
  videos: [] as TimelapseVideo[],
};

/**
 * Restrictions applied to every embedded player: scripts run (the player needs them)
 * but downloads and new windows are blocked, so Tikee's download link does nothing.
 */
export const IFRAME_SANDBOX = 'allow-scripts allow-same-origin allow-presentation';
