import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { Footer } from "@/components/site/layout/Footer";
import { Navbar } from "@/components/site/layout/Navbar";
import { Motion } from "@/components/site/motion/Motion";
import { company, faq } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

import "./globals.css";

// Police géométrique arrondie, en harmonie avec le logo (déjà utilisée par l'ancien frontend).
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });

// Le titre reprend les mots que tapent les recruteurs sur Google (logiciel, tri de CV, IA, Cameroun).
const title = "INJARA : logiciel de recrutement et tri de CV par IA au Cameroun";
const description =
  "INJARA récupère les CV reçus sur votre Gmail, les classe par offre avec un score de pertinence et sécurise vos entretiens vidéo. Vos données restent chiffrées sur votre ordinateur. Pensé pour les PME camerounaises.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s · INJARA" },
  description,
  applicationName: "INJARA",
  keywords: [
    "INJARA",
    "logiciel de recrutement",
    "logiciel de recrutement Cameroun",
    "tri de CV",
    "tri automatique de CV",
    "recrutement IA",
    "recrutement intelligent",
    "ATS",
    "entretien vidéo",
    "RH",
    "PME",
    "Cameroun",
  ],
  authors: [{ name: "INJARA" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  // Code fourni par Google Search Console (méthode « Balise HTML »), à mettre dans les variables Vercel.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
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

// Données structurées (schema.org) : le site, la société, le logiciel et la FAQ. Aucun prix ni avis.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "INJARA",
      url: `${siteUrl}/`,
      inLanguage: "fr",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "INJARA",
      url: `${siteUrl}/`,
      logo: `${siteUrl}/brand/injara-vertical.webp`,
      email: company.email,
      telephone: company.phoneHref.replace("tel:", ""),
      address: { "@type": "PostalAddress", addressLocality: "Dschang", addressCountry: "CM" },
      areaServed: "CM",
    },
    {
      "@type": "SoftwareApplication",
      name: "INJARA",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Desktop",
      description,
      inLanguage: "fr",
      url: `${siteUrl}/`,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.items.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
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
