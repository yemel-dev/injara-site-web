"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import { marquee } from "@/content/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Bandeau défilant à l'infini : le parcours INJARA en mots-clés.
 * Il accélère avec la vitesse de défilement et change de sens quand on remonte.
 */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loop = gsap.to("[data-track]", { xPercent: -50, ease: "none", duration: 45, repeat: -1 });
        let settle: gsap.core.Tween | undefined;

        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6);
            settle?.kill();
            gsap.to(loop, { timeScale: self.direction * boost, duration: 0.25, overwrite: true });
            settle = gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.25, ease: "power2.out" });
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const items = (hidden: boolean) =>
    marquee.map((word) => (
      <li key={`${word}-${hidden}`} className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden || undefined}>
        <span className="text-lg font-bold whitespace-nowrap text-white sm:text-2xl">{word}</span>
        <Image src="/brand/symbol-green.webp" alt="" width={28} height={28} className="size-6 sm:size-7" aria-hidden="true" />
      </li>
    ));

  return (
    <div
      id="marquee"
      ref={root}
      className="relative overflow-hidden border-y border-white/10 bg-navy-950 py-6 sm:py-8"
      aria-label="Le parcours INJARA"
    >
      {/* Fondu sur les bords */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-950 to-transparent" />
      <ul data-track className="flex w-max">
        {items(false)}
        {items(true)}
      </ul>
    </div>
  );
}
