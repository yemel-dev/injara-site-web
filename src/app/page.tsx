import { AppPreview } from "@/components/site/sections/AppPreview";
import { Audience } from "@/components/site/sections/Audience";
import { Contact } from "@/components/site/sections/Contact";
import { Faq } from "@/components/site/sections/Faq";
import { Features } from "@/components/site/sections/Features";
import { Hero } from "@/components/site/sections/Hero";
import { HowItWorks } from "@/components/site/sections/HowItWorks";
import { Marquee } from "@/components/site/sections/Marquee";
import { Interviews } from "@/components/site/sections/Interviews";
import { Privacy } from "@/components/site/sections/Privacy";
import { Problem } from "@/components/site/sections/Problem";

/** Page d'accueil INJARA : une section = un composant, dans l'ordre du cahier des charges. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Problem />
      <HowItWorks />
      <Features />
      <Privacy />
      <Interviews />
      <AppPreview />
      <Audience />
      <Faq />
      <Contact />
    </>
  );
}
