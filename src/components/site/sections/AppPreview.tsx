"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, type KeyboardEvent } from "react";

import {
  CandidateMockup,
  DashboardMockup,
  InterviewMockup,
  ReportMockup,
  StatsMockup,
} from "@/components/site/mockups/Mockups";
import { Container, Section, SectionHeading } from "@/components/site/ui/primitives";
import { preview } from "@/content/site";
import { cn } from "@/lib/cn";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const panels = {
  dashboard: DashboardMockup,
  candidate: CandidateMockup,
  interview: InterviewMockup,
  report: ReportMockup,
  stats: StatsMockup,
};

const AUTOPLAY_SECONDS = 6;

/**
 * Onglets accessibles (tablist / tab / tabpanel, flèches du clavier).
 * Lecture automatique avec barre de progression, uniquement quand la section
 * est visible ; elle s'arrête dès que le visiteur choisit un onglet.
 * Pour de vraies captures : remplacez le composant de maquette par un <Image />.
 */
export function AppPreview() {
  const root = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const progress = useRef<gsap.core.Tween | null>(null);

  const last = preview.tabs.length - 1;

  // Visibilité de la section (la lecture auto ne tourne que si elle est à l'écran)
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 75%",
        end: "bottom 25%",
        onToggle: (self) => setInView(self.isActive),
      });
    },
    { scope: root },
  );

  // Barre de progression de l'onglet actif → passe à l'onglet suivant
  useGSAP(
    () => {
      const bar = root.current?.querySelector(`[data-tab-progress="${active}"]`);
      if (!bar || !autoplay) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: AUTOPLAY_SECONDS,
            ease: "none",
            paused: !inView || paused,
            onComplete: () => setActive((a) => (a === last ? 0 : a + 1)),
          },
        );
        progress.current = tween;
        return () => {
          tween.kill();
          progress.current = null;
        };
      });
      return () => mm.revert();
    },
    { dependencies: [active, autoplay], scope: root, revertOnUpdate: true },
  );

  // Pause quand la section est hors écran ou survolée (sans repartir de zéro)
  useGSAP(
    () => {
      progress.current?.paused(!inView || paused);
    },
    { dependencies: [inView, paused, active, autoplay] },
  );

  // Transition de l'écran
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          panelRef.current,
          { autoAlpha: 0, y: 30, scale: 0.97, filter: "blur(6px)" },
          { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "expo.out", clearProps: "filter" },
        );
      });
      return () => mm.revert();
    },
    { dependencies: [active], scope: root },
  );

  const choose = (i: number) => {
    setAutoplay(false);
    setActive(i);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    let next = active;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    choose(next);
    tabRefs.current[next]?.focus();
  };

  const tab = preview.tabs[active];
  const Panel = panels[tab.id as keyof typeof panels];

  return (
    <Section id="apercu" aria-labelledby="apercu-title" className="sm:py-32">
      <Container>
        <SectionHeading id="apercu-title" eyebrow={preview.eyebrow} title={preview.title} intro={preview.intro} />

        <div
          ref={root}
          data-reveal
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <div
            role="tablist"
            aria-label="Écrans de l'application"
            onKeyDown={onKeyDown}
            className="mx-auto flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-mist p-1.5 sm:w-fit"
          >
            {preview.tabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${t.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => choose(i)}
                className={cn(
                  "relative shrink-0 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-300",
                  i === active ? "bg-navy-900 text-white shadow-lg" : "text-muted hover:text-navy-900",
                )}
              >
                {t.label}
                {/* Progression de la lecture automatique */}
                <span
                  aria-hidden="true"
                  data-tab-progress={i}
                  className={cn(
                    "absolute inset-x-4 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-brand-400",
                    (i !== active || !autoplay) && "hidden",
                  )}
                />
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            className="relative mx-auto mt-10 max-w-4xl"
          >
            <div ref={panelRef} className="relative">
              <Panel key={tab.id} />
            </div>
          </div>
          <p className="mt-5 text-center text-xs font-medium text-muted">{preview.notice}</p>
        </div>
      </Container>
    </Section>
  );
}
