# Andy, portfolio

Portfolio officiel d'Alim Aliue Andy, réalisateur de clips et de films.
Next.js 16 (App Router), TypeScript, Tailwind CSS v4. Français par défaut (`/`), anglais sous `/en`.

Les règles de marque sont dans `CLAUDE.md`, le cahier des charges dans `PROMPT_CLAUDE_CODE.md`.

## Lancer le projet

Node.js 20.9 au minimum. Une version 22.13 ou plus récente évite les avertissements d'ESLint à l'installation.

```bash
npm install      # une seule fois, ou après un changement de package.json
npm run dev      # http://localhost:3000, se recharge à chaque modification
```

Avant de mettre en ligne, vérifier que tout passe :

```bash
npm run build    # construit le site comme en production
npm run lint     # vérifie le code
npm start        # sert la version construite sur http://localhost:3000
```

## Où modifier quoi

| Je veux changer… | Fichier |
| --- | --- |
| Les projets | `src/content/projects.ts` |
| E-mail, WhatsApp, réseaux, bio, collaborations, presse, photos de coulisses | `src/content/site.ts` |
| Le showreel de l'accueil | `public/media/showreel.mp4` et `showreel-poster.jpg`, réglages dans `site.ts` |
| Les textes de l'interface (menus, boutons, titres) | `src/i18n/fr.ts` et `src/i18n/en.ts` |
| Les couleurs, la typographie, le grain, l'intro | `src/app/globals.css` |
| Les polices | `src/lib/fonts.ts` |

Tout ce qui est **entre crochets** (`[Artiste]`, `[E-mail de booking]`…) est un texte d'attente :
il faut le remplacer par l'information réelle. Ne rien inventer (clients, récompenses, chiffres).

## Ajouter un projet

1. Créer le dossier `public/work/<slug>/` (le slug est l'adresse du projet : minuscules, tirets, sans accents,
   par exemple `kholi-na-mma`) et y déposer les images :
   - `cover.jpg` : l'image de couverture, étalonnée, idéalement déjà en 2.39 (2400 × 1004 px) ;
   - `still-01.jpg`, `still-02.jpg`… : les images du film, avec leur étalonnage ;
   - `bts-01.jpg`… : les coulisses (elles s'affichent toujours en noir et blanc).
2. Dans `src/content/projects.ts`, copier un projet existant et remplir ses champs :

```ts
{
  slug: "mon-clip",
  title: "Titre du clip",            // affiché en Sectra Light Italic, jamais traduit
  artist: "Nom de l'artiste",
  year: "2026",
  category: "clip",                  // "clip", "film", "brand" ou "documentary"
  location: "Conakry",
  format: "2.39:1",
  duration: "3:42",
  videoUrl: "https://www.youtube.com/watch?v=…",   // ou Vimeo, ou "/media/fichier.mp4"
  cover: "/work/mon-clip/cover.jpg",
  stills: ["/work/mon-clip/still-01.jpg", "/work/mon-clip/still-02.jpg"],
  bts: ["/work/mon-clip/bts-01.jpg"],
  credits: { artist: "…", director: "Alim Aliue Andy", dop: "…", production: "…", editing: "…", grading: "…", label: "…" },
  intention: { fr: "Deux à quatre phrases.", en: "Two to four sentences." },
  featured: true,                    // true = affiché dans la sélection de l'accueil
  releaseDate: "2026-05-14",         // facultatif, aide Google à référencer la vidéo
},
```

L'ordre du tableau est l'ordre du site. Les images sont mesurées et optimisées automatiquement au build.
Les trois projets marqués `// PLACEHOLDER` sont des exemples à supprimer quand les vrais projets arrivent.

## Les polices (licences)

Le site utilise **les versions d'essai** de GT Sectra et GT America (Grilli Type). Elles ont deux limites :

- **elles suppriment les accents** (É devient E, ç devient c) et n'ont pas les signes ’ « » — · ;
- **leur licence interdit un site public.**

Avant la mise en ligne, au choix :

- **Licences achetées** (grillitype.com, licence *Web*) : remplacer les fichiers de `src/fonts/` par les versions
  achetées et mettre à jour leurs noms dans `src/lib/fonts-trial.ts`. Faire de même pour les deux fichiers `.otf`
  de `src/fonts/og/` (utilisés par les images de partage).
- **Pas encore de licences** : dans `src/lib/fonts.ts`, remplacer `"./fonts-trial"` par `"./fonts-google"`.
  Le site passe sur des polices gratuites proches (Fraunces, Inter Tight, JetBrains Mono), accents compris.

## Le formulaire de contact

Aujourd'hui, le bouton « Envoyer le brief » ouvre la messagerie du visiteur avec le brief déjà rempli
(`formMode: "mailto"` dans `site.ts`). Il faut donc que l'e-mail de booking soit renseigné.

Pour un envoi direct depuis le site, sans passer par la messagerie : suivre le `TODO(resend)`
dans `src/app/[locale]/contact/actions.ts`, puis passer `formMode` à `"server"`.

## Mettre en ligne sur Vercel

1. Pousser le projet sur GitHub (dépôt privé).
2. Sur vercel.com : *Add New Project*, importer le dépôt. Vercel reconnaît Next.js, rien à régler.
3. Dans *Settings > Environment Variables*, ajouter `NEXT_PUBLIC_SITE_URL` = `https://directedbyandy.com`
   (l'adresse définitive, sans barre finale). Elle sert aux liens de partage, au sitemap et au référencement.
4. Dans *Settings > Domains*, ajouter le domaine (par exemple `directedbyandy.com` et `www.directedbyandy.com`),
   puis créer chez le registraire du domaine les enregistrements DNS que Vercel indique.
5. Chaque nouveau `git push` sur la branche principale remet le site à jour.

## Avant la mise en ligne

- [ ] Licences web GT Sectra et GT America achetées (ou passage aux polices Google).
- [ ] Tous les textes entre crochets remplacés (`projects.ts`, `site.ts`).
- [ ] Projets d'exemple (`exemple-*`) supprimés.
- [ ] Vrai showreel dans `public/media/showreel.mp4` : pour l'instant c'est le film d'identité « La Ligne ».
      Après remplacement, régler `loopStart` dans `site.ts` (seconde de départ de la boucle) et refaire le poster.
- [ ] Portrait d'Andy validé (`public/brand/photos/portrait.png`).
- [ ] `NEXT_PUBLIC_SITE_URL` défini sur Vercel.

## Organisation du code

```
src/
├─ proxy.ts                 langues : /work affiche la version française, /en/work l'anglaise
├─ app/[locale]/            les pages (accueil, work, work/[slug], about, on-set, contact)
├─ components/brand/        les signes de la marque : CinemaFrame (2.39), CropMarks, Hud, RedDot, Timecode, DataLine, Grain, Logo
├─ components/…             en-tête, pied de page, accueil, projets, contact
├─ content/                 le contenu (projets, informations du site)
├─ i18n/                    les textes de l'interface en français et en anglais
└─ lib/                     polices, SEO, images, utilitaires
```
