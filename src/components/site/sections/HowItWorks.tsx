"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, type ComponentType } from "react";

import {
  DashboardMockup,
  InboxMockup,
  InterviewMockup,
  ProfileMockup,
  ReportMockup,
  SortMockup,
} from "@/components/site/mockups/Mockups";
import { Icon } from "@/components/site/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/site/ui/primitives";
import { solution } from "@/content/site";
import { cn } from "@/lib/cn";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const visuals: Record<(typeof solution.steps)[number]["visual"], ComponentType<{ className?: string }>> = {
  profile: ProfileMockup,
  inbox: InboxMockup,
  sort: SortMockup,
  rank: DashboardMockup,
  interview: InterviewMockup,
  report: ReportMockup,
};

const steps = solution.steps;
const last = steps.length - 1;

/**
 * Parcours en 6 étapes.
 * Ordinateur : la section reste épinglée à l'écran ; le défilement fait
 * avancer les étapes (avec aimantation), l'écran de droite change à chaque
 * étape. Tout reste visible dans la fenêtre. Un clic sur une étape y mène.
 * Mobile : liste verticale, chaque étape avec son écran.
 */
export function HowItWorks() {
  const pinRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  // Épinglage + progression (ordinateur uniquement)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const line = pinRef.current?.querySelector("[data-progress-line]");
        trigger.current = ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${last * window.innerHeight * 0.75}`,
          pin: true,
          scrub: true,
          snap: { snapTo: 1 / last, duration: { min: 0.2, max: 0.5 }, ease: "power1.inOut" },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setActive(Math.round(self.progress * last));
            if (line) gsap.set(line, { scaleY: self.progress });
          },
        });
        return () => {
          trigger.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: pinRef },
  );

  // Transition de l'écran à chaque changement d'étape
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline()
          .fromTo(
            panelRef.current,
            { autoAlpha: 0, y: 30, scale: 0.97 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "expo.out" },
          )
          .from(
            panelRef.current?.querySelectorAll("[data-v], li") ?? [],
            { autoAlpha: 0, y: 12, stagger: 0.04, duration: 0.4, ease: "power2.out" },
            0.1,
          );
      });
      return () => mm.revert();
    },
    { dependencies: [active], scope: pinRef },
  );

  // Clic sur une étape : on fait défiler jusqu'à sa position
  const goTo = (i: number) => {
    const st = trigger.current;
    if (!st) return;
    window.scrollTo({ top: st.start + ((st.end - st.start) * i) / last, behavior: "smooth" });
  };

  const Visual = visuals[steps[active].visual];

  return (
    <Section id="solution" tone="mist" aria-labelledby="solution-title" className="sm:pt-32 lg:pb-0">
      <Container>
        <SectionHeading id="solution-title" eyebrow={solution.eyebrow} title={solution.title} intro={solution.intro} />
      </Container>

      {/* ── Ordinateur : section épinglée ─────────────────────────────── */}
      <div ref={pinRef} className="hidden lg:block">
        <div className="flex h-[100svh] items-center pt-16">
          <Container className="grid grid-cols-[0.9fr_1.1fr] items-center gap-16">
            <ol className="relative">
              <span aria-hidden="true" className="absolute top-6 bottom-6 left-[1.2rem] w-px bg-navy-900/15" />
              <span
                aria-hidden="true"
                data-progress-line
                className="absolute top-6 bottom-6 left-[1.2rem] w-px origin-top scale-y-0 bg-brand-500"
              />
              {steps.map((step, i) => {
                const isActive = i === active;
                return (
                  <li key={step.verb} className="relative">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive ? "step" : undefined}
                      className="flex w-full gap-5 rounded-2xl py-2.5 pr-4 text-left"
                    >
                      <span
                        className={cn(
                          "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors duration-300",
                          isActive
                            ? "border-brand-500 bg-brand-500 text-navy-900"
                            : "border-navy-900/15 bg-mist text-muted",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 pt-1.5">
                        <span
                          className={cn(
                            "block text-xl font-bold tracking-tight transition-colors duration-300",
                            isActive ? "text-navy-900" : "text-navy-900/40 hover:text-navy-900/70",
                          )}
                        >
                          <span className={isActive ? "text-brand-700" : undefined}>{step.verb}</span> {step.title}
                        </span>
                        {/* Description dépliée pour l'étape active */}
                        <span
                          className={cn(
                            "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                            isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <span className="overflow-hidden">
                            <span className="block max-w-md pt-2 text-base leading-relaxed text-muted">{step.text}</span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="relative min-w-0">
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted" aria-live="polite">
                <Icon name={steps[active].icon} className="size-4 text-brand-700" />
                Étape {active + 1} sur {steps.length}
              </p>
              {/* Réduit légèrement sur les écrans peu hauts pour toujours tenir dans la fenêtre */}
              <div className="origin-top-left [@media(max-height:820px)]:scale-90 [@media(max-height:720px)]:scale-[0.8]">
                <div ref={panelRef}>
                  <Visual key={active} />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* ── Mobile et tablette : liste verticale ──────────────────────── */}
      <Container className="lg:hidden">
        <ol className="relative min-w-0">
          <span aria-hidden="true" className="absolute top-5 bottom-5 left-[1.2rem] w-px bg-navy-900/15" />
          {steps.map((step, i) => {
            const StepVisual = visuals[step.visual];
            return (
              <li key={step.verb} className="relative flex gap-5 pb-12 last:pb-0">
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-navy-900">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1 pt-1.5">
                  <h3 className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
                    <span className="text-brand-700">{step.verb}</span> {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{step.text}</p>
                  <div data-reveal className="mt-6">
                    <StepVisual />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
