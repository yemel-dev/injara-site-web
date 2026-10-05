"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef, type MouseEvent } from "react";

import { Icon } from "@/components/site/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/site/ui/primitives";
import { faq } from "@/content/site";

gsap.registerPlugin(useGSAP);

/**
 * Accordéon basé sur <details> : accessible et fonctionnel sans JavaScript.
 * Avec JavaScript, l'ouverture et la fermeture sont animées par GSAP.
 */
export function Faq() {
  const root = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: root });

  const toggle = contextSafe((e: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const details = e.currentTarget.parentElement as HTMLDetailsElement;
    const content = details.querySelector<HTMLElement>("[data-answer]");
    if (!content) return;
    e.preventDefault();

    if (details.open) {
      gsap.to(content, {
        height: 0,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          details.open = false;
          gsap.set(content, { clearProps: "all" });
        },
      });
    } else {
      details.open = true;
      gsap.fromTo(
        content,
        { height: 0, autoAlpha: 0 },
        { height: "auto", autoAlpha: 1, duration: 0.5, ease: "power3.out", clearProps: "height" },
      );
    }
  });

  return (
    <Section id="faq" tone="mist" aria-labelledby="faq-title" className="sm:py-32">
      <Container className="max-w-3xl">
        <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />
        <div ref={root} data-stagger className="space-y-3">
          {faq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-line bg-white transition-[box-shadow,border-color] duration-300 open:border-brand-100 open:shadow-lg open:shadow-navy-900/5"
            >
              <summary
                onClick={toggle}
                className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-semibold text-navy-900 sm:p-6 [&::-webkit-details-marker]:hidden"
              >
                {item.q}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mist text-navy-900 transition-all duration-500 group-open:rotate-180 group-open:bg-brand-500">
                  <Icon name="chevronDown" className="size-4" />
                </span>
              </summary>
              <div data-answer className="overflow-hidden">
                <p className="px-5 pb-6 text-sm leading-relaxed text-muted sm:px-6 sm:text-base">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
