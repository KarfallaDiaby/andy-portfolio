import { display, ext, fine, mono, sans } from "./fonts-trial";

// TODO(licence) : les polices GT sont en version d'essai, interdites sur un site public.
// Avant la mise en ligne, au choix :
//  - licences web achetées : remplacer les fichiers de src/fonts/ et les chemins de fonts-trial.ts ;
//  - pas encore de licences : remplacer "./fonts-trial" par "./fonts-google" ci-dessus.

export const fontVariables = [display, fine, sans, ext, mono].map((f) => f.variable).join(" ");
