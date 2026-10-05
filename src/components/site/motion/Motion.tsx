"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Moteur d'animations du site (GSAP + ScrollTrigger + SplitText + DrawSVG)
 *
 *  Les sections restent de simples composants serveur : on y pose des
 *  attributs data-*, et ce composant les anime. Vocabulaire disponible :
 *
 *   data-hero="kicker|title|text|cta|chips|cards|note|clusters"  intro du hero
 *   data-cluster (+ data-cluster-card / -pill, data-hero-line)  grappes du hero
 *   data-hero-bg            image de fond du hero (zoom + parallaxe)
 *   data-hero-content       contenu du hero (s'estompe en quittant l'écran)
 *   data-tilt               inclinaison 3D qui suit la souris
 *   data-reveal="up|left|right|scale|fade"  apparition au défilement
 *   data-delay="0.2"        décalage (secondes) pour data-reveal / data-bar
 *   data-stagger="up|right" les enfants apparaissent en cascade
 *   data-split              titre révélé mot à mot (flou → net)
 *   data-scrub-words        phrase qui s'illumine mot à mot avec le défilement
 *   data-bar                barre de score qui se remplit
 *   data-count + data-suffix  nombre qui défile jusqu'à sa valeur
 *   data-draw               tracé SVG dessiné à l'apparition
 *   data-parallax="-20"     déplacement vertical (yPercent) lié au défilement
 *   data-rotate="45"        rotation liée au défilement (filigranes)
 *   data-float              flottement doux et continu
 *   data-magnetic           bouton « aimanté » par la souris
 *
 *  Tout est désactivé si l'utilisateur demande à réduire les animations.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);
const delayOf = (el: Element) => Number((el as HTMLElement).dataset.delay ?? 0);

const revealFrom: Record<string, gsap.TweenVars> = {
  up: { y: 48 },
  left: { x: -60 },
  right: { x: 60 },
  scale: { scale: 0.92, y: 24 },
  fade: {},
};

function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });

  tl.fromTo("[data-hero-bg]", { scale: 1.25 }, { scale: 1.05, duration: 2.6, ease: "power2.out" }, 0);
  tl.fromTo("[data-hero='kicker']", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0 }, 0.1);

  const title = document.querySelector<HTMLElement>("[data-hero='title']");
  if (title) {
    gsap.set(title, { autoAlpha: 1 });
    const split = SplitText.create(title, { type: "words" });
    tl.from(split.words, { autoAlpha: 0, y: 70, filter: "blur(6px)", duration: 1.3, stagger: 0.08 }, 0.2);
  }

  tl.fromTo("[data-hero='text']", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0 }, 0.6)
    .fromTo("[data-hero='cta']", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0 }, 0.75)
    .fromTo("[data-hero='chips']", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0 }, 0.9)
    .fromTo("[data-hero='cards']", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1.4 }, 1)
    .fromTo("[data-hero='note']", { autoAlpha: 0 }, { autoAlpha: 1 }, 1.6);

  // Grappes : l'une après l'autre, la carte apparaît,
  // la ligne se dessine, puis l'étiquette surgit.
  tl.set("[data-hero='clusters']", { autoAlpha: 1 }, 0);
  const clustersShown = document.querySelector("[data-cluster]")?.getClientRects().length;
  if (clustersShown) gsap.utils.toArray<HTMLElement>("[data-cluster]").forEach((cluster, i) => {
    const at = 0.85 + i * 0.4;
    tl.from(
      cluster.querySelector("[data-cluster-card]"),
      { autoAlpha: 0, y: 40, scale: 0.92, duration: 1.1 },
      at,
    )
      .from(
        cluster.querySelectorAll("[data-hero-line]"),
        { drawSVG: "0%", duration: 0.9, ease: "power2.inOut" },
        at + 0.35,
      )
      .from(
        cluster.querySelector("[data-cluster-pill]"),
        { autoAlpha: 0, scale: 0.7, duration: 0.8, ease: "back.out(2)" },
        at + 0.8,
      );
    // Ensuite, un léger flottement continu
    tl.to(cluster, { y: -8, duration: 3 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 }, at + 1.6);
  });

  // En quittant le hero : l'image glisse, le contenu s'estompe.
  gsap.to("[data-hero-bg]", {
    yPercent: 18,
    ease: "none",
    scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to("[data-hero-content], [data-hero='clusters']", {
    y: -90,
    autoAlpha: 0.15,
    ease: "none",
    scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true },
  });
}

function scrollAnimations() {
  // Apparitions simples
  q("[data-reveal]").forEach((el) => {
    const from = revealFrom[el.dataset.reveal || "up"] ?? revealFrom.up;
    gsap.from(el, {
      autoAlpha: 0,
      ...from,
      duration: 1.1,
      ease: "power3.out",
      delay: delayOf(el),
      clearProps: "transform,opacity,visibility",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  // Cascades (grilles de cartes, listes)
  q("[data-stagger]").forEach((el) => {
    const dir = el.dataset.stagger === "right" ? { x: 50 } : { y: 56 };
    gsap.from(el.children, {
      autoAlpha: 0,
      ...dir,
      duration: 1,
      ease: "power3.out",
      stagger: 0.12,
      clearProps: "transform,opacity,visibility",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });

  // Titres mot à mot
  q("[data-split]").forEach((el) => {
    const split = SplitText.create(el, { type: "words" });
    gsap.from(split.words, {
      autoAlpha: 0,
      y: 30,
      filter: "blur(8px)",
      duration: 1,
      ease: "power3.out",
      stagger: 0.045,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  // Phrase qui s'illumine au rythme du défilement
  q("[data-scrub-words]").forEach((el) => {
    const split = SplitText.create(el, { type: "words" });
    gsap.fromTo(
      split.words,
      { opacity: 0.14 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
      },
    );
  });

  // Barres de score
  q("[data-bar]").forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.5,
      ease: "power3.out",
      delay: delayOf(el),
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });

  // Compteurs
  q("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? "";
    const counter = { v: 0 };
    gsap.to(counter, {
      v: target,
      duration: 1.6,
      ease: "power2.out",
      delay: delayOf(el),
      onUpdate: () => {
        el.textContent = `${Math.round(counter.v)}${suffix}`;
      },
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });

  // Tracés SVG
  q<SVGElement>("[data-draw]").forEach((el) => {
    gsap.from(el, {
      drawSVG: "0%",
      duration: 1.4,
      ease: "power2.inOut",
      delay: delayOf(el),
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });

  // Parallaxe et rotation liées au défilement
  q("[data-parallax]").forEach((el) => {
    gsap.to(el, {
      yPercent: Number(el.dataset.parallax),
      ease: "none",
      scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
    });
  });
  q("[data-rotate]").forEach((el) => {
    gsap.to(el, {
      rotation: Number(el.dataset.rotate),
      ease: "none",
      scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  // Flottement continu
  q("[data-float]").forEach((el, i) => {
    gsap.to(el, { y: -10, duration: 2.6 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 + i * 0.3 });
  });

  // Barre de progression de lecture
  gsap.fromTo(
    "[data-progress]",
    { scaleX: 0 },
    { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
  );
}

/** Interactions à la souris (uniquement avec un pointeur précis). */
function pointerEffects() {
  const cleanups: (() => void)[] = [];

  q("[data-magnetic]").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
    };
    const leave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    cleanups.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    });
  });

  q("[data-tilt]").forEach((el) => {
    const area = el.closest("section") ?? el;
    gsap.set(el, { transformPerspective: 1400 });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3.out" });
    const move = (e: Event) => {
      const { clientX, clientY } = e as PointerEvent;
      const r = area.getBoundingClientRect();
      ry(((clientX - r.left) / r.width - 0.5) * 10);
      rx(-((clientY - r.top) / r.height - 0.5) * 8);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    cleanups.push(() => {
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

export function Motion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          fine: "(pointer: fine) and (prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { motion, fine, reduce } = ctx.conditions as Record<string, boolean>;
          if (reduce) {
            gsap.set("[data-hero]", { autoAlpha: 1 });
            return;
          }
          if (motion) {
            heroIntro();
            scrollAnimations();
          }
          if (fine) return pointerEffects();
        },
      );

      // Recalcule les positions une fois les polices et images chargées.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);

      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <div
      data-progress
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-brand-500"
    />
  );
}
