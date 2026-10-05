import Image from "next/image";
import type { ReactNode } from "react";

import heroBg from "@/assets/hero-bg.webp";
import { ActivityCard, ClusterLabel, CvAnalysisCard, InboxCard, RankingCard } from "@/components/site/mockups/HeroCards";
import { Icon } from "@/components/site/ui/Icon";
import { ButtonLink, Container } from "@/components/site/ui/primitives";
import { cta, hero } from "@/content/site";
import { cn } from "@/lib/cn";

/** Ligne courbe qui relie une carte à son étiquette (dessinée à l'ouverture). */
function Connector({ d, className }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={cn("h-14 w-28", className)} fill="none" aria-hidden="true">
      <path data-hero-line d={d} stroke="rgb(255 255 255 / 0.45)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Une « grappe » : carte + ligne + étiquette, positionnée autour du titre. */
function Cluster({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div
      data-cluster
      className={cn(
        "absolute flex flex-col [@media(max-height:900px)]:scale-[0.85] [@media(max-height:760px)]:scale-75",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Hero : photo floutée en fond (comme l'ancien site), slogan centré et des
 * grappes d'interface qui apparaissent une à une autour du titre.
 * Animation pilotée par motion/Motion.tsx (data-hero, data-cluster).
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-900 pt-28 pb-20 text-white min-[1400px]:min-h-[max(100svh,800px)]"
    >
      {/* Image de fond floutée */}
      <div className="absolute inset-0" aria-hidden="true">
        <div data-hero-bg className="absolute inset-0 scale-105">
          <Image
            src={heroBg}
            alt=""
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-center blur-[3px]"
          />
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-navy-950/80" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-navy-950/70" />

      {/* Grappes autour du titre (grands écrans uniquement) */}
      <div
        data-hero="clusters"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden min-[1400px]:block"
      >
        <div className="relative mx-auto h-full max-w-[1600px]">
          <Cluster className="top-[14%] left-[3%] origin-top-left items-start">
            <div data-cluster-card>
              <InboxCard />
            </div>
            <Connector className="ml-28" d="M4 2 C4 34, 116 26, 116 58" />
            <div data-cluster-pill className="ml-44">
              <ClusterLabel icon="mail">{hero.clusters.inbox}</ClusterLabel>
            </div>
          </Cluster>

          <Cluster className="bottom-[8%] left-[4%] origin-bottom-left items-start">
            <div data-cluster-pill className="ml-36">
              <ClusterLabel icon="fileText">{hero.clusters.analysis}</ClusterLabel>
            </div>
            <Connector className="ml-24" d="M116 2 C116 34, 4 26, 4 58" />
            <div data-cluster-card>
              <CvAnalysisCard />
            </div>
          </Cluster>

          <Cluster className="top-[13%] right-[3%] origin-top-right items-end">
            <div data-cluster-pill className="mr-40">
              <ClusterLabel icon="trophy">{hero.clusters.ranking}</ClusterLabel>
            </div>
            <Connector className="mr-24" d="M4 2 C4 34, 116 26, 116 58" />
            <div data-cluster-card>
              <RankingCard />
            </div>
          </Cluster>

          <Cluster className="right-[4%] bottom-[9%] origin-bottom-right items-end">
            <div data-cluster-card>
              <ActivityCard />
            </div>
            <Connector className="mr-28" d="M116 2 C116 34, 4 26, 4 58" />
            <div data-cluster-pill className="mr-44">
              <ClusterLabel icon="chart">{hero.clusters.activity}</ClusterLabel>
            </div>
          </Cluster>
        </div>
      </div>

      <Container data-hero-content className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p data-hero="kicker" className="text-sm font-semibold tracking-wide text-brand-400">
            {hero.kicker}
          </p>

          <h1
            id="hero-title"
            data-hero="title"
            className="mt-5 text-6xl leading-[0.98] font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
          >
            {hero.titleStart} <span className="text-brand-400">{hero.titleHighlight}</span>
          </h1>

          <p data-hero="text" className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-navy-50 sm:text-lg">
            {hero.subtitle}
          </p>

          <div data-hero="cta" className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={cta.demo.href} arrow magnetic className="w-full sm:w-auto">
              {cta.demo.label}
            </ButtonLink>
            <ButtonLink href={cta.how.href} variant="glass" magnetic className="w-full sm:w-auto">
              {cta.how.label}
            </ButtonLink>
          </div>

          <ul
            data-hero="chips"
            className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-navy-100"
          >
            {hero.reassurance.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Icon name="check" className="size-4 text-brand-400" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Mêmes cartes, sous le texte, sur les écrans plus étroits */}
        <div
          data-hero="cards"
          aria-hidden="true"
          className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3 min-[1400px]:hidden"
        >
          <CvAnalysisCard className="w-full" />
          <RankingCard className="hidden w-full sm:block" />
          <InboxCard className="hidden w-full lg:block" />
        </div>

        <p
          data-hero="note"
          className="mt-10 text-center text-[11px] text-navy-200/70 min-[1400px]:absolute min-[1400px]:inset-x-0 min-[1400px]:-bottom-14 min-[1400px]:mt-0"
        >
          {hero.illustrationNote}
        </p>
      </Container>
    </section>
  );
}
