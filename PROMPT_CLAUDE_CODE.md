# Prompt — Portfolio d'Andy (à coller dans Claude Code, Antigravity)

> Ouvre le dossier `06_Site-Web/andy-portfolio` dans Antigravity, lance `npm install`, puis colle tout ce qui suit dans Claude Code.

---

## Rôle

Tu es un directeur artistique web et un développeur front-end senior, spécialisé dans les sites de réalisateurs et de studios de cinéma (références de niveau : sites de réalisateurs représentés par Pulse Films, Iconoclast, Somesuch, Prettybird). Tu construis le portfolio officiel d'**Alim Aliue Andy**, réalisateur de clips et de films, basé en Guinée et tourné vers l'international.

Le site doit donner, en moins de 10 secondes, l'impression d'un réalisateur de niveau international : cinématographique, minimaliste, sûr de lui. Un visiteur (artiste, label, marque, agence) doit pouvoir : voir le showreel, parcourir tous les projets, comprendre qui est Andy et le contacter pour un booking.

## Contexte du projet (déjà en place)

- Projet Next.js 16 (App Router, TypeScript, Tailwind CSS v4, `src/`, alias `@/*`) déjà créé. Ne recrée pas le projet.
- Les assets de la marque sont déjà copiés dans `public/brand/` :
  - `public/brand/logo/` : étoile (`star-white.svg`, `star-black.svg`, `star-red.svg`), wordmark, lockup horizontal et vertical, signature « Directed by Andy » (`signature-white.svg`, `signature-black.svg`).
  - `public/brand/photos/` : `bts-01..08.jpg` (coulisses, noir et blanc), `still-01..04.jpg` (images de clips étalonnées), `teaser-01..02.jpg` (images floutées « Coming soon »), `portrait.png`, `film-stills.jpg`.
  - `public/brand/texture/grain-dark.png` : texture de grain.
- Le dossier source de la marque est deux niveaux au-dessus du projet (`../../`). Tu peux le lire pour t'imprégner de l'identité :
  - `../../05_Livrable/ANDY_Identite-Visuelle_v1.0/01_Brand-Book/ANDY_BrandBook_v1.1.pdf` (charte complète, 35 pages)
  - `../../03_Sources/Illustrator/BrandBook_build/_source/html/brandbook_v1.1.html` et `head.html` (la charte en HTML/CSS : reprends-en les tokens exacts)
  - `../../03_Sources/Illustrator/BrandBook_build/_preview/check/bb-01.jpg … bb-35.jpg` (aperçus des pages, à regarder)
- **Copie toi-même** le film d'identité dans le projet : `../../04_Exports/Behance_Andy/ANDY_Film_La-Ligne_behance.mp4` → `public/media/showreel.mp4`. Génère aussi un poster (première image nette) en `public/media/showreel-poster.jpg` si `ffmpeg` est disponible ; sinon utilise `still-01.jpg`.

## Identité visuelle à respecter (non négociable)

- **Philosophie : « Less, but better. Chaque détail a un objectif. »** Chaque élément ajouté doit avoir une raison. Si ce n'est pas utile, on l'enlève.
- **Couleurs** : noir `#000`, blanc `#FFF`, deux gris (récupère les valeurs exactes dans la charte HTML), et un seul rouge signal `#F50311`. Le rouge est un signal (un point, une ligne, un mot), **jamais un fond**. Site majoritairement sur fond noir.
- **Typographies** :
  - Titres : GT Sectra Display (Light, Light Italic surtout). Titres de clips **en Light Italic**.
  - Texte : GT America Standard. Labels : GT America Extended Medium, capitales, interlettrage large (~0.2em).
  - Données / HUD : GT America Mono, capitales, ~0.08em.
  - Les polices GT sont en version d'essai, leur licence web n'est pas encore achetée. Cherche les fichiers `.otf` / `.woff2` sur la machine (dossier `03_Typographies` du livrable ou ailleurs). S'ils existent, branche-les avec `next/font/local` derrière des variables CSS (`--font-display`, `--font-sans`, `--font-ext`, `--font-mono`). Sinon, utilise des remplaçants Google gratuits via `next/font/google` (proposition : Instrument Serif ou Fraunces pour le titrage, Inter Tight pour le texte, JetBrains Mono pour les données) en gardant les mêmes variables, pour qu'on puisse changer de police en une ligne le jour où les licences sont achetées. Ajoute un `TODO(licence)` clair.
- **Les 5 signes reconnaissables d'Andy** (à utiliser dans tout le site) :
  1. La fenêtre **2.39:1** : les vidéos et images clés sont présentées dans un cadre cinémascope, noir tout autour.
  2. Le **point rouge** (type « REC ») : seule touche de couleur.
  3. Le titre en **Sectra Light Italic**.
  4. La **ligne de données en mono** : timecode, date, lieu, format (ex. `TC 00:01:24:12 · CONAKRY · 2026 · 2.39:1`).
  5. Le **grain** (overlay subtil sur tout le site, `pointer-events: none`) et les **repères de cadrage** (coins en équerre) aux angles des médias.
- **Logo** : jamais retapé au clavier, toujours le SVG. Logo blanc sur fond sombre, noir sur fond clair. Ne pas déformer, recolorer, ajouter d'ombre. « The Andy Production » n'existe plus : ne l'écris nulle part.
- **Photos** : les coulisses restent en noir et blanc ; une image de film garde toujours son étalonnage (jamais de filtre N&B dessus).

## Architecture du site

1. **Accueil `/`**
   - Intro : écran noir, la signature « Directed by Andy » apparaît (≈1,5 s, une seule fois par session, passable au clic / à la touche Échap, désactivée si `prefers-reduced-motion`).
   - Hero : showreel en lecture auto, muet, en boucle, dans la fenêtre 2.39, avec HUD (point rouge + `REC`, timecode qui défile, `SHOWREEL 2026`). Bouton « Voir le showreel avec le son » qui ouvre un lecteur plein écran.
   - Sélection de 3 à 6 projets phares.
   - Bloc philosophie : « Less, but better. » en grand, Sectra Light Italic.
   - Appel au contact (booking).
2. **Projets `/work`**
   - Index de tous les projets. Deux vues commutables : **liste** (titre en Sectra Light Italic géant, artiste, année, type ; au survol, l'image ou un extrait vidéo apparaît dans une fenêtre 2.39 qui suit le curseur) et **grille**.
   - Filtres : Tous · Clips · Films · Pubs / Brand content · Documentaire.
3. **Page projet `/work/[slug]`**
   - Lecteur principal (YouTube ou Vimeo intégré en mode « lite » : vignette + chargement de l'iframe au clic, pour la performance) dans la fenêtre 2.39.
   - Ligne de données mono (année, lieu, format, durée).
   - Crédits complets (Artiste, Réalisation : Andy, Image / DOP, Production, Montage, Étalonnage, Label…).
   - Note d'intention courte (2 à 4 phrases).
   - Galerie de stills (étalonnés) puis coulisses (noir et blanc).
   - Navigation projet précédent / suivant.
4. **À propos `/about`**
   - Portrait, bio courte (FR et EN), philosophie, approche (lumière, composition, mouvement, étalonnage, récit), artistes et marques avec qui il a travaillé, presse / sélections si elles existent.
5. **Coulisses `/on-set`**
   - Mur de photos de tournage en noir et blanc (masonry), avec légende mono.
6. **Contact `/contact`**
   - E-mail de booking, WhatsApp, Instagram, YouTube, TikTok, Vimeo.
   - Formulaire de brief (nom, artiste/marque, type de projet, budget indicatif, date souhaitée, message). Pour l'instant, envoi via un `mailto:` prérempli ; prévois une Server Action prête à brancher sur Resend plus tard (`TODO(resend)`).
7. **Pied de page** : étoile, « Directed by Andy », réseaux, © année, crédit « Identité visuelle : Karfalla ».

## Contenu

- Centralise tout le contenu dans des fichiers typés : `src/content/projects.ts`, `src/content/site.ts` (bio, réseaux, contact), avec un type `Project` complet (`slug, title, artist, year, category, location, format, duration, videoUrl, cover, stills[], bts[], credits{}, intention, featured`).
- Pré-remplis avec :
  - **« Kholi na m'ma »** (clip, 2026, imagerie énergique et traditionnelle, histoire d'amour) : artiste et lien vidéo à compléter.
  - **« La Ligne »** (film d'identité, 40 s, 16:9) : utilise `public/media/showreel.mp4`.
  - 3 projets d'exemple clairement marqués `// PLACEHOLDER` avec les stills disponibles.
  - Partout où une info réelle manque (bio, e-mail, réseaux, crédits), mets un texte d'attente évident entre crochets, par ex. `[E-MAIL DE BOOKING]`. **N'invente jamais** de collaborations, récompenses ou chiffres.
- Ajouter un projet = ajouter un objet dans `projects.ts` et déposer ses images dans `public/work/<slug>/`. Documente ça dans le README.

## Bilingue

- Français par défaut, anglais disponible (`/en/...`), sélecteur discret « FR / EN » dans l'en-tête. Utilise une solution légère (dictionnaires typés + segment `[locale]`), sans dépendance lourde.

## Motion et interactions

- Animations sobres et cinématographiques : fondus, révélations ligne par ligne des titres, transitions de page en « coupe » (rideau noir rapide). Utilise `motion` (ex-Framer Motion). Défilement doux avec `lenis`, désactivé si `prefers-reduced-motion`.
- Curseur personnalisé discret (petit point, devient « PLAY » au survol d'une vidéo) uniquement sur pointeur fin.
- Pas d'effet gratuit : chaque animation doit servir le récit.

## Qualité technique

- Server Components par défaut, `"use client"` uniquement là où il faut.
- `next/image` pour toutes les images (formats AVIF/WebP, tailles responsives, `placeholder="blur"` si possible). Vidéos : `preload="metadata"`, `playsInline`, `muted` pour l'autoplay, poster obligatoire.
- Responsive impeccable du mobile 360 px au 4K. Sur mobile, le showreel reste en 2.39 avec bandes noires, la navigation passe en menu plein écran.
- Accessibilité : contrastes AA, focus visibles, navigation clavier, `alt` descriptifs, sous-titres possibles sur le showreel, respect de `prefers-reduced-motion`.
- SEO : `metadata` par page, Open Graph et Twitter cards (image OG générée avec `next/og` : fond noir, étoile, titre en Sectra), `sitemap.ts`, `robots.ts`, JSON-LD `Person` (réalisateur) et `VideoObject` sur chaque projet. Favicon et icône à partir de `star-white.svg` sur fond noir.
- Objectif Lighthouse ≥ 90 partout. Pas d'erreur TypeScript ni ESLint.

## Méthode de travail

1. Commence par lire la charte (PDF et HTML) et regarde 5 ou 6 aperçus `bb-xx.jpg`. Résume-moi en 10 lignes ce que tu as compris de l'identité et les tokens retenus (couleurs, polices, espacements).
2. Propose l'arborescence des fichiers et des composants (ex. `CinemaFrame`, `Hud`, `Timecode`, `Grain`, `CropMarks`, `RedDot`, `ProjectRow`, `LiteVideo`, `SignatureIntro`). **Attends ma validation.**
3. Construis dans cet ordre : tokens et polices → composants de marque → layout (en-tête, pied de page, grain) → accueil → projets → page projet → à propos → coulisses → contact → i18n → SEO.
4. Après chaque grande étape, lance `npm run build` et `npm run lint`, corrige, puis lance `npm run dev` et vérifie visuellement.
5. Termine par un `README.md` en français : lancer le projet, ajouter un projet, changer les polices quand les licences sont achetées, déployer sur Vercel (et brancher un domaine, par exemple `directedbyandy.com`).

Pose-moi tes questions avant de coder si quelque chose n'est pas clair.
