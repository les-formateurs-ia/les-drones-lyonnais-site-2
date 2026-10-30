// What a drone's EASA class means for its pilot, in plain words. Used by Pop on product
// pages and in his chat. General guidance: the team confirms for each case.

/** Pose of Pop matching the certificate the class calls for. */
export const classPose = (cls: string) => (cls === 'C5' || cls === 'C6' ? 'permis-cats' : 'permis-a1-a3') as 'permis-cats' | 'permis-a1-a3';

export function classAdvice(cls: string): string {
  if (cls === 'C0') return 'Classe C0 : catégorie Open A1, aucune formation obligatoire, mais lisez la notice et enregistrez-vous comme exploitant si le drone a une caméra.';
  if (cls === 'C1' || cls === 'C0/C1') return 'Classe C1 : catégorie Open A1. Il faut la formation en ligne A1/A3 de la DGAC (gratuite) et s’enregistrer comme exploitant.';
  if (cls === 'C2') return 'Classe C2 : catégorie Open A2. Pour voler près des personnes, il faut le certificat A2 en plus de la formation A1/A3.';
  if (cls === 'C3') return 'Classe C3 : catégorie Open A3, loin des personnes et des zones habitées, avec la formation A1/A3.';
  return `Classe ${cls} : catégorie Spécifique, scénarios standard STS. Il faut un certificat de télépilote adapté : c’est l’objet de notre formation CATS.`;
}
