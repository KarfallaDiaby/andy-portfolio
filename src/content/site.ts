import type { Localized } from "@/i18n/config";

// Informations générales du site. Tout ce qui est entre crochets est à remplacer.

export type Social = { label: string; handle: string; url: string };

export const site = {
  name: "Alim Aliue Andy",
  shortName: "Andy",

  showreel: {
    src: "/media/showreel.mp4",
    poster: "/media/showreel-poster.jpg",
    // Seconde à laquelle démarre la boucle muette de l'accueil (« La Ligne » s'ouvre sur 7 s de noir et un éclair).
    loopStart: 7.5,
    // Sous-titres WebVTT facultatifs, ex. "/media/showreel.fr.vtt".
    captions: undefined as Localized | undefined,
    year: "2026",
  },

  contact: {
    email: "[E-mail de booking]",
    whatsapp: { label: "[WhatsApp]", url: "" },
    // "mailto" : le formulaire ouvre la messagerie. "server" : envoi par la Server Action (Resend).
    formMode: "mailto" as "mailto" | "server",
  },

  // Laisser url vide tant que le compte n'est pas connu : le lien ne s'affiche pas comme cliquable.
  socials: [
    { label: "Instagram", handle: "[@compte]", url: "" },
    { label: "YouTube", handle: "[@chaîne]", url: "" },
    { label: "TikTok", handle: "[@compte]", url: "" },
    { label: "Vimeo", handle: "[compte]", url: "" },
  ] satisfies Social[],

  bio: {
    fr: [
      "Alim Aliue Andy est réalisateur. Clips, films et histoires racontées en images, de la Guinée vers le monde.",
      "[Bio à compléter : parcours, débuts, ce qui le guide. 2 à 3 phrases.]",
    ],
    en: [
      "Alim Aliue Andy is a director. Music videos, films and stories told in images, from Guinea to the world.",
      "[Bio to complete: background, beginnings, what drives him. 2 to 3 sentences.]",
    ],
  } satisfies Localized<string[]>,

  // Les cinq piliers de la charte (brand book v1.1, page Philosophy).
  approach: [
    {
      title: { fr: "Lumière", en: "Light" },
      text: {
        fr: "La lumière écrit l’image. Elle est choisie, jamais simplement disponible.",
        en: "Light writes the image. It is chosen, never just available.",
      },
    },
    {
      title: { fr: "Composition", en: "Composition" },
      text: {
        fr: "Chaque plan est construit. Ce qui reste hors champ compte autant que ce qui est dedans.",
        en: "Every frame is built. What stays out matters as much as what is in.",
      },
    },
    {
      title: { fr: "Mouvement", en: "Movement" },
      text: {
        fr: "La caméra bouge pour une raison, jamais pour remplir le temps.",
        en: "The camera moves for a reason, never to fill time.",
      },
    },
    {
      title: { fr: "Étalonnage", en: "Grade" },
      text: {
        fr: "L’étalonnage fixe l’émotion. Une atmosphère par film, tenue jusqu’à la dernière image.",
        en: "The grade sets the emotion. One mood per film, held to the last frame.",
      },
    },
    {
      title: { fr: "Récit", en: "Story" },
      text: {
        fr: "Même trois minutes racontent une histoire. D’abord les images, puis le montage.",
        en: "Even three minutes tell a story. Images first, then the cut.",
      },
    },
  ] satisfies { title: Localized; text: Localized }[],

  // Artistes et marques. Ne rien inventer : laisser vide tant que la liste n'est pas validée par Andy.
  collaborators: [] as string[],
  collaboratorsPlaceholder: "[Artistes et marques avec qui Andy a travaillé]",

  // Presse, festivals, sélections. La section n'apparaît que si la liste n'est pas vide.
  press: [] as { title: string; outlet: string; year: string; url?: string }[],

  // Mur des coulisses (/on-set), toujours en noir et blanc.
  onSet: [
    "/brand/photos/bts-01.jpg",
    "/brand/photos/bts-02.jpg",
    "/brand/photos/bts-03.jpg",
    "/brand/photos/bts-04.jpg",
    "/brand/photos/bts-05.jpg",
    "/brand/photos/bts-06.jpg",
    "/brand/photos/bts-07.jpg",
    "/brand/photos/bts-08.jpg",
  ],

  portrait: "/brand/photos/portrait.png",

  designCredit: "Karfalla",
};
