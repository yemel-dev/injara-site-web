import { Icon, type IconName } from "@/components/site/ui/Icon";
import { Container, IconBadge, Section, SectionHeading, SymbolWatermark } from "@/components/site/ui/primitives";
import { privacy } from "@/content/site";

/** Schéma honnête : ce qui passe par l'extérieur, ce qui reste sur le poste. */
function DataFlowVisual() {
  const external: { icon: IconName; title: string; text: string }[] = [
    { icon: "mail", title: "Gmail (Google)", text: "Réception des e-mails" },
    { icon: "link", title: "Navigateur du candidat", text: "Lien d'entretien" },
  ];
  const local = ["CV chiffrés", "Analyses et scores", "Enregistrements d'entretien"];

  return (
    <div
      className="relative mx-auto w-full max-w-md"
      role="img"
      aria-label="Schéma : les e-mails arrivent par Gmail et le candidat rejoint par un lien web ; les CV, analyses et enregistrements restent chiffrés sur l'ordinateur du recruteur, sans serveur tiers de stockage."
    >
      <div data-stagger className="grid grid-cols-2 gap-3">
        {external.map((e) => (
          <div key={e.title} className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center backdrop-blur">
            <Icon name={e.icon} className="mx-auto size-5 text-navy-100" />
            <p className="mt-2 text-xs font-semibold text-white">{e.title}</p>
            <p className="text-[11px] text-navy-200">{e.text}</p>
          </div>
        ))}
      </div>

      {/* Connecteurs dessinés à l'apparition */}
      <svg viewBox="0 0 400 56" className="block h-14 w-full" fill="none" aria-hidden="true">
        <path data-draw d="M100 0 C100 30, 200 26, 200 56" stroke="#00bf63" strokeWidth="2" strokeLinecap="round" />
        <path data-draw data-delay="0.15" d="M300 0 C300 30, 200 26, 200 56" stroke="#00bf63" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <div
        data-reveal="scale"
        className="relative rounded-3xl border border-brand-500/40 bg-navy-800/80 p-6 shadow-2xl shadow-black/40 backdrop-blur"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-500 text-navy-900">
            <Icon name="laptop" className="size-6" />
          </span>
          <div>
            <p className="font-bold text-white">Votre ordinateur</p>
            <p className="text-xs text-navy-200">Protégé par mot de passe</p>
          </div>
          <span className="relative ml-auto flex size-10 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/20 [animation-duration:2.5s]" />
            <Icon name="shield" className="relative size-7 text-brand-400" />
          </span>
        </div>
        <ul data-stagger className="mt-5 space-y-2">
          {local.map((item) => (
            <li key={item} className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2.5 text-sm text-white">
              <span className="flex size-6 items-center justify-center rounded-lg bg-brand-500/15">
                <Icon name="lock" className="size-3.5 text-brand-400" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div data-reveal="fade" data-delay="0.4" className="mt-5 flex items-center justify-center gap-2 text-xs text-navy-200">
        <span className="relative">
          <Icon name="cloud" className="size-5" />
          <span className="absolute top-1/2 left-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-navy-200" />
        </span>
        Pas de serveur tiers de stockage
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <Section id="confidentialite" tone="navy" aria-labelledby="confidentialite-title" className="sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" aria-hidden="true" />
      <SymbolWatermark rotate={90} className="top-1/2 -left-48 w-[44rem] -translate-y-1/2 opacity-[0.05] lg:-left-32" />

      <Container className="relative">
        <SectionHeading
          dark
          id="confidentialite-title"
          eyebrow={privacy.eyebrow}
          title={privacy.title}
          intro={privacy.intro}
        />

        <div className="grid items-center gap-14 lg:grid-cols-2">
          <DataFlowVisual />

          <ul data-stagger="right" className="space-y-4">
            {privacy.items.map((item) => (
              <li
                key={item.title}
                className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-[border-color,background-color] duration-300 hover:border-brand-500/40 hover:bg-white/10"
              >
                <IconBadge dark>
                  <Icon name={item.icon} className="size-6" />
                </IconBadge>
                <div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy-100">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-reveal
          className="mx-auto mt-14 flex max-w-3xl gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-navy-100"
        >
          <Icon name="info" className="mt-0.5 size-5 shrink-0 text-brand-400" />
          <p>{privacy.honestNote}</p>
        </div>
      </Container>
    </Section>
  );
}
