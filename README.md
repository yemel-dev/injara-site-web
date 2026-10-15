# INJARA : site vitrine

Site vitrine d'une seule page (navigation par ancres) pour **INJARA**, la solution camerounaise de recrutement intelligent.
Next.js 16 (App Router, TypeScript) + Tailwind CSS v4 + GSAP (ScrollTrigger, SplitText, DrawSVG) pour les animations. Repris et affiné à partir de la page
d'accueil de l'ancien frontend (`recrutement-ia/frontend`).

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production (toutes les pages sont statiques)
npm run lint
```

## Configuration

Copiez `.env.example` en `.env.local` et renseignez :

- `NEXT_PUBLIC_FORM_ENDPOINT` (facultatif) : par défaut, les demandes sont envoyées par [FormSubmit](https://formsubmit.co)
  à l'adresse `company.email` de `src/content/site.ts` (team@injara.site). La première demande déclenche un e-mail
  « Activate Form » à cette adresse, sur lequel il faut cliquer une fois. Renseignez cette variable seulement pour
  utiliser un autre service (ex. Formspree).
- `NEXT_PUBLIC_SITE_URL` : URL publique du site (liens Open Graph absolus).

## Modifier les textes

**Tous les textes sont dans [`src/content/site.ts`](src/content/site.ts)** : coordonnées, sections, FAQ, etc.
Les réseaux sociaux pointent vers `/` tant que les comptes n'existent pas.

## Structure

```
src/
├── app/
│   ├── layout.tsx                  # Police, SEO, Open Graph, données structurées, Navbar + Footer
│   ├── page.tsx                    # Assemble les sections dans l'ordre
│   ├── globals.css                 # Tokens INJARA (brand-*, navy-*, mist, muted, line)
│   ├── icon.png / apple-icon.png   # Favicon (symbole vert)
│   ├── opengraph-image.png         # Image de partage (logo blanc sur bleu marine)
│   ├── mentions-legales/           # Page provisoire
│   └── politique-de-confidentialite/
├── content/site.ts                 # ← TOUS les textes
└── components/site/
    ├── layout/                     # Navbar, Footer, LegalPage
    ├── sections/                   # Une section = un composant (Hero, Problem, …, Contact)
    ├── mockups/Mockups.tsx         # Maquettes de l'application (données fictives)
    ├── motion/Motion.tsx           # Moteur d'animations GSAP piloté par attributs data-*
    └── ui/                         # Icon (SVG inline), primitives (Container, ButtonLink…)
public/brand/                       # Logos INJARA rognés et convertis en WebP (≤ 60 Ko)
```

Les anciens fichiers du clone Greenhouse (`src/components/layout`, `src/components/sections`, `src/components/ui`,
`src/data`, `src/types`, `public/images`, `_source-webflow`) ne sont plus utilisés et peuvent être supprimés.

## Remplacer les maquettes par de vraies captures

Dans `src/components/site/sections/AppPreview.tsx`, remplacez le composant de chaque onglet par un
`<Image src="/captures/....webp" … />` placé dans `public/captures/`.

## Animations (GSAP)

Les sections posent des attributs `data-*` ; [`src/components/site/motion/Motion.tsx`](src/components/site/motion/Motion.tsx)
les anime (vocabulaire complet en tête du fichier) : `data-reveal`, `data-stagger`, `data-split`, `data-scrub-words`,
`data-bar`, `data-count`, `data-draw`, `data-parallax`, `data-rotate`, `data-float`, `data-magnetic`, `data-spotlight`.
Les animations propres à une section (étapes collantes, onglets, bandeau défilant, FAQ) sont dans leur composant.
Tout est désactivé quand le visiteur demande à réduire les animations.

## Déployer sur Vercel

1. Poussez le projet sur GitHub, puis sur [vercel.com](https://vercel.com) : **Add New → Project** et importez le dépôt.
   Vercel détecte Next.js tout seul (build : `next build`), aucun réglage n'est nécessaire.
2. Dans **Settings → Environment Variables**, ajoutez :
   - `NEXT_PUBLIC_FORM_ENDPOINT` : facultatif, seulement pour remplacer FormSubmit par un autre service ;
   - `NEXT_PUBLIC_SITE_URL` : uniquement si vous branchez un domaine personnalisé (ex. `https://injara.cm`).
     Sans elle, le site utilise automatiquement l'adresse de production Vercel pour les aperçus de partage.
3. Redéployez après avoir ajouté les variables.

Le dossier `_source-webflow` est exclu des envois via `.vercelignore`.
