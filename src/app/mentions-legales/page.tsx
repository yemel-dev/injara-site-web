import type { Metadata } from "next";

import { LegalPage } from "@/components/site/layout/LegalPage";

export const metadata: Metadata = { title: "Mentions légales", robots: { index: false } };

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>INJARA, [forme juridique À COMPLÉTER], Dschang, Cameroun.</p>
      <p>Numéro d&apos;immatriculation (RCCM) : [À COMPLÉTER]. Contact : yemelwork@gmail.com · +237 696 10 10 88.</p>
      <h2>Directeur de la publication</h2>
      <p>[À COMPLÉTER]</p>
      <h2>Hébergement</h2>
      <p>[Nom et adresse de l&apos;hébergeur À COMPLÉTER]</p>
      <h2>Propriété intellectuelle</h2>
      <p>
        La marque INJARA, les logos et les contenus de ce site sont la propriété d&apos;INJARA. Toute
        reproduction sans autorisation est interdite.
      </p>
    </LegalPage>
  );
}
