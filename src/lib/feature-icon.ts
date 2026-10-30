// A line icon (24×24, stroke) for a product feature or an audience, picked from the
// words of its title. Used by ProductStory; paths are drawn on reveal.
const ICONS: [RegExp, string][] = [
  [/thermique|temp[ée]rature/i, 'M10 14V5a2 2 0 1 1 4 0v9a4 4 0 1 1-4 0ZM12 9v7'],
  [/cam[ée]ra|capteur|mp\b|photo|vid[ée]aste|360|zoom|image/i, 'M4 8h3l2-2h6l2 2h3v11H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'],
  [/obstacle|d[ée]tection|s[ée]curit|secours/i, 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6zM9 12l2 2 4-4'],
  [/transmission|port[ée]e|o[34]|signal|diffusion|faisceau/i, 'M12 20v-6M8.5 10.5a5 5 0 0 1 7 0M5.5 7.5a9.5 9.5 0 0 1 13 0M12 14a1 1 0 1 0 0-.01'],
  [/temps de vol|autonomie|minute|batterie/i, 'M4 8h14v8H4zM18 11h2v2h-2M7 11h5v2H7'],
  [/certifi|easa|c[0-6]\b|r[ée]glement|permis/i, 'M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2 8 12.7 4 8.8 9.5 8z'],
  [/rtk|positionnement|pr[ée]cision|g[ée]om[èe]tre|topograph|cartograph/i, 'M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'],
  [/radio|[ée]cran|joystick|simulateur/i, 'M5 7h14v10H5zM8 17v2M16 17v2M9 11h6'],
  [/agence|production|audiovisuel|cin[ée]ma|cr[ée]ateur/i, 'M4 10h16v10H4zM4 10l2-5 14 0-2 5M9 5l-1 5M14 5l-1 5'],
  [/btp|chantier|inspection|industrie|maintenance|[ée]nergie/i, 'M4 18h16M6 18v-4a6 6 0 0 1 12 0v4M12 8V5M9 9l-1-2M15 9l1-2'],
  [/agricult|environnement|pulv[ée]ris/i, 'M12 20V10M12 10c0-4 3-6 7-6 0 4-3 6-7 6ZM12 13c0-3-2-5-6-5 0 3 2 5 6 5Z'],
  [/3d|mod[ée]lisation|maillage|nuage/i, 'M12 3 20 7.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12 4 7.5'],
  [/d[ée]butant|passionn|particulier|loisir/i, 'M12 4l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.4l-4.8 2.5.9-5.4L4.2 9.7l5.4-.8z'],
  [/pilote|t[ée]l[ée]pilote|drone|vol/i, 'M5 5l14 14M19 5 5 19M9.5 9.5h5v5h-5zM5 5a2 2 0 1 0 .01 0M19 5a2 2 0 1 0 .01 0M5 19a2 2 0 1 0 .01 0M19 19a2 2 0 1 0 .01 0'],
];
const DEFAULT = 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM8 12l3 3 5-6';

export const featureIcon = (title = '') => ICONS.find(([re]) => re.test(title))?.[1] ?? DEFAULT;
