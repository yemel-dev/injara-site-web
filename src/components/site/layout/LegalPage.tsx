import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/site/ui/primitives";

/** Gabarit des pages légales (contenu provisoire, à faire valider). */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <div className="bg-navy-900 pt-32 pb-14 text-white">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-navy-100">Page provisoire : contenu en cours de rédaction.</p>
        </Container>
      </div>
      <Container className="max-w-3xl space-y-4 py-14 text-sm leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-navy-900">
        {children}
        <p className="pt-6">
          <Link href="/" className="font-semibold text-brand-700 hover:underline">
            ← Retour à l&apos;accueil
          </Link>
        </p>
      </Container>
    </>
  );
}
