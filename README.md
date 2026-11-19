# Portfolio — rofe06.github.io

Portfolio personnel bilingue (FR/EN) construit avec **React**, **TypeScript** et **Vite**, déployé automatiquement sur **GitHub Pages**.

## Développement

```bash
npm install
npm run dev       # serveur de dev sur http://localhost:5173
npm run lint      # oxlint
npm run build     # vérification TypeScript + build de production dans dist/
npm run preview   # sert le build de production en local
```

## Modifier le contenu

Tout le contenu se trouve dans `src/data/`. Tu n'as pas besoin de toucher aux composants.

| Fichier | Contenu |
| --- | --- |
| `src/data/profile.ts` | Nom, titre, accroche, présentation, liens, photo, CV |
| `src/data/skills.ts` | Catégories de compétences |
| `src/data/projects.ts` | Projets (description, tags, liens repo/démo, image) |
| `src/data/experience.ts` | Parcours : formation et expériences |
| `src/i18n/ui.ts` | Libellés de l'interface (boutons, titres de sections…) |

Chaque texte traduisible s'écrit `{ fr: '…', en: '…' }`. Les champs marqués `TODO` / `EXEMPLE` sont à remplacer.

**Fichiers statiques** : place-les dans `public/` et référence-les avec un chemin absolu :

- photo : `public/avatar.jpg`, puis `photo: '/avatar.jpg'`
- CV : `public/cv-fr.pdf` et `public/cv-en.pdf`, puis `cv: { fr: '/cv-fr.pdf', en: '/cv-en.pdf' }`
- captures de projets : `public/projects/xxx.png`, puis `image: '/projects/xxx.png'`

L'image de partage sur les réseaux sociaux est `public/og-image.png` (1200×630).

## Navigation

Le site est découpé en pages : Accueil, À propos, Compétences, Projets, Parcours et Contact. Ce n'est plus un one-page à faire défiler.

- Le routage se fait par hash (`/#/projects`) dans `src/router.ts`. Cette méthode fonctionne sur GitHub Pages sans configuration : liens directs et rechargement inclus.
- La correspondance entre route et composant de page se trouve dans `src/App.tsx`.
- Les entrées de l'island de navigation (ordre, libellés, icônes) sont définies dans `src/navigation.ts`.
- La page elle-même ne défile pas. Seule la zone de contenu (`<main>`) défile, et uniquement quand une page est plus haute que l'écran (sur mobile, par exemple).

## Démos jouables

Un projet peut avoir une démo jouable directement dans le site, à l'adresse `#/projects/<id>`. Il suffit d'ajouter `play: '<id>'` au projet dans `src/data/projects.ts` pour que sa carte affiche un bouton « Jouer ».

- Les démos sont déclarées dans `src/demos/index.ts`. Chacune est chargée à la demande (code splitting).
- **Cartridge** (`src/demos/cartridge/`) : la ROM Game Boy (`public/demos/cartridge/cartridge.gb`) tourne dans [binjgb](https://github.com/binji/binjgb) v0.1.11 (MIT). Cet émulateur est compilé en WebAssembly et vendu dans `public/demos/binjgb/`.
- Le lecteur `src/demos/gameboy/GameBoyPlayer.tsx` est réutilisable pour n'importe quelle autre ROM `.gb`. Il gère le clavier (QWERTY et AZERTY), une manette tactile sur mobile, la pause, le redémarrage, le son, le plein écran et 3 palettes.

Pour mettre à jour la ROM de Cartridge, recompile-la depuis un état propre (`make re`), puis remplace le fichier :

```bash
cd ~/Delivery/Cartridge && make re && cp game.gb ~/Perso/Rofe06.github.io/public/demos/cartridge/cartridge.gb
```

## Design

Les couleurs, polices et espacements sont des variables CSS définies dans `src/styles/tokens.css`. Chaque composant a son propre fichier `*.module.css`.

## Déploiement

Le workflow `.github/workflows/deploy.yml` lint, build puis publie le site à chaque push sur `main`.

Configuration à faire une seule fois sur GitHub : **Settings → Pages → Build and deployment → Source : GitHub Actions**.

Le site est ensuite servi sur <https://rofe06.github.io/>.
