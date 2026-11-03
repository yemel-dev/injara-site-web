// URL publique du site (canonique, sitemap, Open Graph) : NEXT_PUBLIC_SITE_URL si défini, sinon le
// domaine officiel en production (jamais l'adresse *.vercel.app, pour que Google n'indexe qu'une seule
// adresse), et localhost en développement.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? "https://injara.site" : "http://localhost:3000")
).replace(/\/$/, "");
