import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/site/ui/primitives";
import { company, navLinks, slogan } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-200">
      {/* Slogan en grand */}
      <Container className="border-b border-white/10 py-16 sm:py-20">
        <p
          data-split
          className="max-w-5xl text-4xl leading-[1.08] font-extrabold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl"
        >
          {slogan}
        </p>
      </Container>
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/injara-full-white.webp"
            alt="INJARA"
            width={640}
            height={662}
            loading="lazy"
            className="h-20 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{company.tagline}</p>
          <ul className="mt-4 space-y-1.5 text-sm">
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-brand-400">
                {company.email}
              </a>
            </li>
            <li>
              <a href={company.phoneHref} className="hover:text-brand-400">
                {company.phone}
              </a>
            </li>
            <li>{company.city}</li>
          </ul>
        </div>

        <nav aria-label="Plan du site">
          <p className="mb-4 text-xs font-bold tracking-widest text-white uppercase">Navigation</p>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors duration-200 hover:text-brand-400">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/#contact" className="transition-colors duration-200 hover:text-brand-400">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-xs font-bold tracking-widest text-white uppercase">Suivez-nous</p>
          <ul className="space-y-2.5 text-sm">
            {company.socials.map((s) => (
              <li key={s.label}>
                {/* Lien externe → nouvel onglet ; tant que le compte n'existe pas, "/" ramène au site. */}
                {s.href.startsWith("http") ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-brand-400">
                    {s.label}
                  </a>
                ) : (
                  <Link href={s.href} className="hover:text-brand-400">
                    {s.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {company.year} INJARA. Tous droits réservés.</p>
          <ul className="flex gap-5">
            <li>
              <a href="/mentions-legales" className="hover:text-brand-400">
                Mentions légales
              </a>
            </li>
            <li>
              <a href="/politique-de-confidentialite" className="hover:text-brand-400">
                Politique de confidentialité
              </a>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
