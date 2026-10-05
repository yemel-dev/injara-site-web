import type { Metadata } from "next";

import { LegalPage } from "@/components/site/layout/LegalPage";

export const metadata: Metadata = { title: "Politique de confidentialité", robots: { index: false } };

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité">
      <h2>Données collectées sur ce site</h2>
      <p>
        Le formulaire de contact recueille votre nom, votre e-mail professionnel, le nom de votre entreprise, une
        estimation du nombre de CV reçus par mois et votre message.
      </p>
      <h2>Utilisation</h2>
      <p>
        Ces informations servent uniquement à répondre à votre demande (démo ou devis). Elles ne sont ni
        vendues ni cédées.
      </p>
      <h2>Prestataire d&apos;envoi</h2>
      <p>Les formulaires sont transmis via [nom du service de formulaire, ex. Formspree, À COMPLÉTER].</p>
      <h2>Durée de conservation et vos droits</h2>
      <p>[À COMPLÉTER] Pour exercer vos droits d&apos;accès, de rectification ou de suppression : yemelwork@gmail.com.</p>
      <h2>L&apos;application INJARA</h2>
      <p>
        Les données des candidats traitées par l&apos;application INJARA sont stockées localement et chiffrées sur
        l&apos;ordinateur du recruteur.
      </p>
    </LegalPage>
  );
}
