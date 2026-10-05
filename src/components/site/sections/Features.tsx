import { Icon } from "@/components/site/ui/Icon";
import { Container, IconBadge, ScoreBar, Section, SectionHeading } from "@/components/site/ui/primitives";
import { features, potentialLevels, scoreWeights } from "@/content/site";
import { cn } from "@/lib/cn";

/** Mini-classement illustratif (fictif) pour la grande carte « Classement ». */
const miniRanking = [
  { initials: "AN", score: 92 },
  { initials: "BT", score: 87 },
  { initials: "CF", score: 78 },
];

export function Features() {
  return (
    <Section id="fonctionnalites" aria-labelledby="fonctionnalites-title" className="sm:py-32">
      <Container>
        <SectionHeading
          id="fonctionnalites-title"
          eyebrow={features.eyebrow}
          title={features.title}
          intro={features.intro}
        />

        <ul data-stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.items.map((f, i) => {
            const dark = f.tone === "dark";
            return (
              <li
                key={f.title}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-3xl border p-7 transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1.5 sm:p-8",
                  f.size === "wide" && "md:col-span-2",
                  // Dernière carte : pleine largeur sur tablette pour ne pas rester seule.
                  i === features.items.length - 1 && "md:col-span-2 lg:col-span-1",
                  dark
                    ? "border-navy-800 bg-navy-900 text-white hover:shadow-2xl hover:shadow-navy-900/30"
                    : "border-line bg-white hover:border-brand-100 hover:shadow-2xl hover:shadow-navy-900/10",
                )}
              >
                <div className={cn("flex flex-1 flex-col gap-8", f.size === "wide" && "lg:flex-row lg:items-center")}>
                  <div className="flex-1">
                    <IconBadge dark={dark}>
                      <Icon name={f.icon} className="size-6" />
                    </IconBadge>
                    <h3 className={cn("mt-6 text-xl font-bold", dark ? "text-white" : "text-navy-900")}>{f.title}</h3>
                    <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-navy-100" : "text-muted")}>{f.text}</p>

                    {f.extra === "weights" && (
                      <ul className="mt-6 space-y-3" aria-label="Pondération du score">
                        {scoreWeights.map((w, j) => (
                          <li key={w.label}>
                            <span className="mb-1.5 flex justify-between text-xs">
                              <span className="text-muted">{w.label}</span>
                              <span className="font-bold text-navy-900 tabular-nums" data-count={w.value} data-suffix=" %">
                                {w.value} %
                              </span>
                            </span>
                            <ScoreBar value={w.value * 2.5} delay={j * 0.12} />
                          </li>
                        ))}
                      </ul>
                    )}

                    {f.extra === "levels" && (
                      <ol className="mt-6 grid grid-cols-4 gap-1.5" aria-label="Niveaux de potentiel">
                        {potentialLevels.map((level, n) => (
                          <li key={level} className="text-center">
                            <span
                              data-bar
                              data-delay={n * 0.15}
                              aria-hidden="true"
                              className="block h-2 rounded-full bg-brand-500"
                              style={{ opacity: 0.25 + n * 0.25 }}
                            />
                            <span className="mt-2 block text-[11px] font-semibold text-navy-900">{level}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>

                  {/* Visuels illustratifs des grandes cartes */}
                  {f.extra === "weights" && (
                    <div className="w-full rounded-2xl bg-mist p-4 lg:max-w-xs" aria-hidden="true">
                      <p className="mb-3 flex items-center justify-between text-[11px] font-bold text-navy-900">
                        Comptable senior
                        <span className="text-[9px] font-medium text-muted">Exemple</span>
                      </p>
                      <ul className="space-y-2">
                        {miniRanking.map((c, j) => (
                          <li key={c.initials} className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 shadow-sm">
                            <span className="w-3 text-[11px] font-bold text-muted">{j + 1}</span>
                            <span
                              className={cn(
                                "flex size-8 items-center justify-center rounded-full text-[10px] font-bold",
                                j === 0 ? "bg-brand-500 text-navy-900" : "bg-navy-900 text-white",
                              )}
                            >
                              {c.initials}
                            </span>
                            <ScoreBar value={c.score} className="flex-1" delay={0.3 + j * 0.1} />
                            <span className="w-9 text-right text-xs font-extrabold tabular-nums">{c.score}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {dark && (
                    <div className="w-full lg:max-w-xs" aria-hidden="true">
                      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-navy-950">
                        <span className="flex size-16 items-center justify-center rounded-full bg-white/10 text-navy-100">
                          <Icon name="users" className="size-7" />
                        </span>
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2 py-1 text-[10px] font-bold">
                          <span className="size-2 animate-pulse rounded-full bg-red-500" /> REC
                        </span>
                        <span className="absolute right-3 bottom-3 flex gap-1.5">
                          <span className="rounded-full bg-white/15 p-1.5">
                            <Icon name="mic" className="size-3.5" />
                          </span>
                          <span className="rounded-full bg-white/15 p-1.5">
                            <Icon name="video" className="size-3.5" />
                          </span>
                        </span>
                      </div>
                      <p className="mt-3 flex items-center gap-2 text-xs text-navy-100">
                        <Icon name="link" className="size-3.5 text-brand-400" />
                        Le candidat rejoint par un simple lien
                      </p>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
