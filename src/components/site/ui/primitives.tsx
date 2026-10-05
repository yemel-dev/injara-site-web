import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Icon } from "./Icon";

/* ── Conteneur : 16 px de marge sur mobile, largeur max confortable ─────── */

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

/* ── Section : gère le fond et l'espacement vertical ────────────────────── */

const sectionTones = {
  white: "bg-white text-navy-900",
  mist: "bg-mist text-navy-900",
  navy: "bg-navy-900 text-white",
};

export function Section({
  tone = "white",
  className,
  ...props
}: ComponentProps<"section"> & { tone?: keyof typeof sectionTones }) {
  return (
    <section
      className={cn("relative overflow-clip py-20 sm:py-24", sectionTones[tone], className)}
      {...props}
    />
  );
}

/* ── Titre de section : étiquette + titre à gauche, introduction à droite ─ */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
  id,
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 grid gap-6 sm:mb-16 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16", className)}>
      <div>
        <div data-reveal="fade">
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </div>
        <h2
          id={id}
          data-split
          className={cn(
            "mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]",
            dark ? "text-white" : "text-navy-900",
          )}
        >
          {title}
        </h2>
      </div>
      {intro && (
        <p
          data-reveal
          data-delay="0.2"
          className={cn("max-w-md text-base leading-relaxed text-pretty sm:text-lg lg:pb-2", dark ? "text-navy-100" : "text-muted")}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/* ── Boutons (liens) ────────────────────────────────────────────────────── */

const buttonVariants = {
  // Vert INJARA + texte bleu marine : contraste AA (le blanc sur vert ne l'est pas).
  primary:
    "bg-brand-500 text-navy-900 shadow-lg shadow-brand-500/20 hover:bg-brand-400 hover:shadow-xl hover:shadow-brand-500/30",
  // Bouton « verre » de l'ancien site, sur fond sombre.
  glass: "border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/20",
  // Contour bleu marine, sur fond clair.
  outline: "border border-navy-900/15 bg-white text-navy-900 hover:border-navy-900/30 hover:bg-mist",
};

export function ButtonLink({
  variant = "primary",
  arrow = false,
  magnetic = false,
  className,
  children,
  ...props
}: ComponentProps<"a"> & { variant?: keyof typeof buttonVariants; arrow?: boolean; magnetic?: boolean }) {
  return (
    <a
      data-magnetic={magnetic || undefined}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all duration-300",
        buttonVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {arrow && (
        <Icon name="arrowRight" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </a>
  );
}

/* ── Pastille d'icône ───────────────────────────────────────────────────── */

export function IconBadge({ children, dark = false, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
        dark ? "bg-brand-500/15 text-brand-400" : "bg-brand-50 text-brand-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ── Barre de score (maquettes, pondérations) ───────────────────────────── */

export function ScoreBar({
  value,
  dark = false,
  delay,
  className,
}: {
  value: number;
  dark?: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={cn("block h-1.5 overflow-hidden rounded-full", dark ? "bg-white/10" : "bg-navy-900/8", className)}>
      <span
        data-bar
        data-delay={delay || undefined}
        className="block h-full rounded-full bg-brand-500"
        style={{ width: `${value}%` }}
      />
    </span>
  );
}

/* ── Filigrane : symbole INJARA (image d'origine, non redessinée) ────────── */

/** `rotate` : rotation (en degrés) appliquée progressivement au défilement. */
export function SymbolWatermark({
  variant = "white",
  rotate,
  className,
}: {
  variant?: "white" | "navy" | "green";
  rotate?: number;
  className?: string;
}) {
  return (
    <Image
      src={`/brand/symbol-${variant}.webp`}
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      data-rotate={rotate}
      className={cn("pointer-events-none absolute select-none", className)}
    />
  );
}

/* ── Pastille au-dessus des titres ────────────────────────────────────── */

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={cn("flex items-center gap-3 text-sm font-semibold", dark ? "text-brand-400" : "text-brand-700")}>
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}
