"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Icon } from "@/components/site/ui/Icon";
import { ButtonLink, Container } from "@/components/site/ui/primitives";
import { cta, navLinks } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Barre de navigation fixe.
 * - En haut de page (sur le hero bleu marine) : transparente, logo blanc.
 * - Après défilement : fond blanc flouté, logo bleu marine (comme l'ancien site).
 * - Mobile : menu burger, fermeture par Échap ou au clic sur un lien.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Fond plein après défilement ; la barre se cache en descendant et revient en remontant.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 480);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
        hidden && !open && "-translate-y-full focus-within:translate-y-0",
        solid ? "border-b border-line bg-white/90 shadow-sm backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-900"
      >
        Aller au contenu
      </a>
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-18">
        <Link href="/#top" className="flex shrink-0 items-center" aria-label="INJARA, retour en haut de page">
          <Image
            src={solid ? "/brand/injara-horizontal-navy.webp" : "/brand/injara-horizontal-white.webp"}
            alt="INJARA"
            width={480}
            height={171}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "transition-colors duration-200",
                    solid ? "text-muted hover:text-navy-900" : "text-navy-100 hover:text-white",
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <ButtonLink href={cta.demo.href} className="px-5 py-2.5">
              {cta.demo.label}
            </ButtonLink>
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className={cn(
              "rounded-full p-2.5 transition-colors lg:hidden",
              solid ? "text-navy-900 hover:bg-mist" : "text-white hover:bg-white/10",
            )}
          >
            <Icon name={open ? "x" : "menu"} className="size-6" />
          </button>
        </div>
      </Container>

      {/* Menu mobile */}
      <nav
        id="mobile-menu"
        aria-label="Navigation mobile"
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        <Container className="py-4">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-base font-semibold text-navy-900 hover:bg-mist"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink href={cta.demo.href} onClick={() => setOpen(false)} className="mt-4 w-full" arrow>
            {cta.demo.label}
          </ButtonLink>
        </Container>
      </nav>
    </header>
  );
}
