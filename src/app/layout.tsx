import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { Footer } from "@/components/site/layout/Footer";
import { Navbar } from "@/components/site/layout/Navbar";
import { Motion } from "@/components/site/motion/Motion";

import "./globals.css";

// Police géométrique arrondie, en harmonie avec le logo (déjà utilisée par l'ancien frontend).
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });

// URL publique du site (liens Open Graph absolus) : NEXT_PUBLIC_SITE_URL si défini (ex. domaine
// personnalisé), sinon l'adresse de production fournie automatiquement par Vercel.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "INJARA : la solution de recrutement intelligent";
const description =
  "INJARA récupère les CV reçus sur votre Gmail, les classe par offre avec un score de pertinence et sécurise vos entretiens vidéo. Vos données restent chiffrées sur votre ordinateur. Pensé pour les PME camerounaises.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s · INJARA" },
  description,
  applicationName: "INJARA",
  keywords: ["recrutement", "tri de CV", "IA", "PME", "Cameroun", "entretien vidéo", "RH", "INJARA", "recrutement intelligent"],
  authors: [{ name: "INJARA" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "INJARA",
    title,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#031E40" };

// Données structurées simples (schema.org) : la société et le logiciel. Aucun prix ni avis.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "INJARA",
      url: siteUrl,
      logo: `${siteUrl}/brand/injara-vertical.webp`,
      address: { "@type": "PostalAddress", addressCountry: "CM" },
    },
    {
      "@type": "SoftwareApplication",
      name: "INJARA",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Desktop",
      description,
      publisher: { "@type": "Organization", name: "INJARA" },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={jakarta.variable} suppressHydrationWarning>
      <head>
        {/* Signale que JavaScript est actif avant le premier affichage (évite un flash du hero). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
