import type { Localized } from "@/i18n/config";

export type Category = "clip" | "film" | "brand" | "documentary";

/** Rôles affichés dans les crédits, dans cet ordre. */
export const creditRoles = [
  "artist",
  "client",
  "director",
  "dop",
  "production",
  "editing",
  "grading",
  "label",
  "motion",
  "images",
  "sound",
] as const;
export type CreditRole = (typeof creditRoles)[number];

export type Project = {
  /** Adresse de la page : /work/<slug>. Minuscules, tirets, sans accents. */
  slug: string;
  /** Titre original du film, jamais traduit. */
  title: string;
  artist: string;
  year: string;
  category: Category;
  location?: string;
  /** Format d'image, ex. "2.39:1" ou "16:9". */
  format: string;
  /** Durée, ex. "3:42". */
  duration: string;
  /** Lien YouTube ou Vimeo, ou fichier local dans public/ (ex. "/media/film.mp4"). */
  videoUrl?: string;
  /** Image de couverture (étalonnée), ex. "/work/<slug>/cover.jpg". */
  cover?: string;
  /** Images du film, avec leur étalonnage. */
  stills: string[];
  /** Photos de coulisses (affichées en noir et blanc). */
  bts: string[];
  credits: Partial<Record<CreditRole, string>>;
  /** Note d'intention, 2 à 4 phrases. */
  intention: Localized;
  /** Affiché dans la sélection de l'accueil. */
  featured: boolean;
  /** Date de sortie AAAA-MM-JJ, pour le référencement de la vidéo. */
  releaseDate?: string;
};
