import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-url";

/** /robots.txt : tout le site est ouvert aux moteurs de recherche, sauf l'API du formulaire. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
