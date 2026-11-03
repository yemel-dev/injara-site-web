import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-url";

/**
 * /sitemap.xml : la liste des pages à indexer, à soumettre dans Google Search Console.
 * Les pages légales (provisoires, en noindex) n'y figurent pas.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
