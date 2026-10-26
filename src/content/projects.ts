import type { Project } from "./types";

// Ajouter un projet : copier un objet ci-dessous, changer le slug,
// déposer ses images dans public/work/<slug>/. L'ordre de la liste est l'ordre du site.
// Tout ce qui est entre crochets est à remplacer par une information réelle.

export const projects: Project[] = [
  {
    slug: "kholi-na-mma",
    title: "Kholi na m'ma",
    artist: "[Artiste]",
    year: "2026",
    category: "clip",
    location: "[Lieu]",
    format: "[Format]",
    duration: "[Durée]",
    // TODO : lien YouTube ou Vimeo du clip.
    videoUrl: undefined,
    cover: undefined,
    stills: [],
    bts: [],
    credits: {
      artist: "[Artiste]",
      director: "Alim Aliue Andy",
      dop: "[Image / DOP]",
      production: "[Production]",
      editing: "[Montage]",
      grading: "[Étalonnage]",
      label: "[Label]",
    },
    intention: {
      fr: "Une histoire d’amour, entre énergie et tradition. [Note d’intention d’Andy à compléter : 2 à 4 phrases.]",
      en: "A love story, between energy and tradition. [Andy’s note to complete: 2 to 4 sentences.]",
    },
    featured: true,
  },
  {
    slug: "la-ligne",
    title: "La Ligne",
    artist: "Alim Aliue Andy",
    year: "2026",
    category: "brand",
    format: "16:9",
    duration: "0:40",
    videoUrl: "/media/showreel.mp4",
    cover: "/work/la-ligne/cover.jpg",
    // still-01 sert déjà de couverture.
    stills: [
      "/work/la-ligne/still-02.jpg",
      "/work/la-ligne/still-03.jpg",
      "/work/la-ligne/still-04.jpg",
    ],
    bts: [],
    credits: {
      images: "Alim Aliue Andy",
      motion: "Karfalla",
    },
    intention: {
      fr: "Le film d’identité d’Andy. Quarante secondes pour poser la signature : le contraste, le mouvement, la lumière, puis l’étoile.",
      en: "Andy’s identity film. Forty seconds to set the signature: contrast, movement, light, then the star.",
    },
    featured: true,
  },
  // PLACEHOLDER : projet d'exemple, à remplacer par un vrai clip.
  {
    slug: "exemple-clip",
    title: "[Titre du clip]",
    artist: "[Artiste]",
    year: "[Année]",
    category: "clip",
    location: "[Lieu]",
    format: "[Format]",
    duration: "[Durée]",
    cover: "/brand/photos/still-01.jpg",
    stills: ["/brand/photos/still-01.jpg", "/brand/photos/still-02.jpg"],
    bts: ["/brand/photos/bts-02.jpg", "/brand/photos/bts-03.jpg"],
    credits: {
      artist: "[Artiste]",
      director: "Alim Aliue Andy",
      dop: "[Image / DOP]",
      production: "[Production]",
      editing: "[Montage]",
      grading: "[Étalonnage]",
      label: "[Label]",
    },
    intention: {
      fr: "[Note d’intention : 2 à 4 phrases.]",
      en: "[Director’s note: 2 to 4 sentences.]",
    },
    featured: true,
  },
  // PLACEHOLDER : projet d'exemple, à remplacer par un vrai film.
  {
    slug: "exemple-film",
    title: "[Titre du film]",
    artist: "[Production]",
    year: "[Année]",
    category: "film",
    location: "[Lieu]",
    format: "[Format]",
    duration: "[Durée]",
    cover: "/brand/photos/still-03.jpg",
    stills: ["/brand/photos/still-03.jpg", "/brand/photos/still-04.jpg"],
    bts: ["/brand/photos/bts-04.jpg", "/brand/photos/bts-06.jpg"],
    credits: {
      director: "Alim Aliue Andy",
      dop: "[Image / DOP]",
      production: "[Production]",
      editing: "[Montage]",
      grading: "[Étalonnage]",
    },
    intention: {
      fr: "[Note d’intention : 2 à 4 phrases.]",
      en: "[Director’s note: 2 to 4 sentences.]",
    },
    featured: false,
  },
  // PLACEHOLDER : projet d'exemple, à remplacer par un vrai documentaire.
  {
    slug: "exemple-documentaire",
    title: "[Titre du documentaire]",
    artist: "[Production]",
    year: "[Année]",
    category: "documentary",
    location: "[Lieu]",
    format: "[Format]",
    duration: "[Durée]",
    cover: "/brand/photos/teaser-01.jpg",
    stills: ["/brand/photos/teaser-01.jpg", "/brand/photos/teaser-02.jpg"],
    bts: ["/brand/photos/bts-07.jpg", "/brand/photos/bts-08.jpg"],
    credits: {
      director: "Alim Aliue Andy",
      dop: "[Image / DOP]",
      production: "[Production]",
      editing: "[Montage]",
    },
    intention: {
      fr: "[Note d’intention : 2 à 4 phrases.]",
      en: "[Director’s note: 2 to 4 sentences.]",
    },
    featured: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/** Projets voisins, en boucle : le dernier mène au premier. */
export function getAdjacentProjects(slug: string): { previous: Project; next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return { previous: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
}
