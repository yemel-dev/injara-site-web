import { Icon } from "@/components/site/ui/Icon";
import { Container, IconBadge, ScoreBar, Section, SectionHeading } from "@/components/site/ui/primitives";
import { interviews } from "@/content/site";
import { cn } from "@/lib/cn";

/** Exemple fictif de répartition du regard, pour illustrer le rapport. */
const gazeExample = [
  { label: "Écran", value: 58 },
  { label: "Droite", value: 34 },
  { label: "Autre", value: 8 },
];

export function Interviews() {
  return (
    <Section id="entretiens" tone="mist" aria-labelledby="entretiens-title" className="sm:py-32">
      <Container>
        <SectionHeading
          id="entretiens-title"
          eyebrow={interviews.eyebrow}
          title={interviews.title}
          intro={interviews.intro}
        />

        {/* Deux colonnes : recruteur / candidat */}
        <div data-stagger className="grid gap-5 md:grid-cols-2">
          {interviews.sides.map((side, i) => {
            const dark = i === 0;
            return (
              <div
                key={side.title}
                className={cn(
                  "relative overflow-hidden rounded-3xl p-7 sm:p-9",
                  dark ? "bg-navy-900 text-white" : "border border-line bg-white",
                )}
              >
                <div className="relative flex items-center gap-3">
                  <IconBadge dark={dark}>
                    <Icon name={side.icon} className="size-6" />
                  </IconBadge>
                  <h3 className="text-2xl font-bold">{side.title}</h3>
                </div>
                <ul className="relative mt-7 space-y-3.5">
                  {side.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm sm:text-base">
                      <span
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                          dark ? "bg-brand-500/20 text-brand-400" : "bg-brand-50 text-brand-700",
                        )}
                      >
                        <Icon name="check" className="size-3" strokeWidth={3} />
                      </span>
                      <span className={dark ? "text-navy-100" : "text-muted"}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Trois blocs anti-triche */}
        <ul data-stagger className="mt-5 grid gap-5 lg:grid-cols-3">
          {interviews.blocks.map((b) => (
            <li
              key={b.title}
              className="group flex flex-col rounded-3xl border border-line bg-white p-7 transition-[translate,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/10"
            >
              <IconBadge>
                <Icon name={b.icon} className="size-6" />
              </IconBadge>
              <h3 className="mt-6 text-lg font-bold text-navy-900">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>

              {b.extra === "gaze" && (
                <div className="mt-5 rounded-2xl bg-mist p-4">
                  <p className="mb-2.5 text-[10px] font-bold tracking-wide text-muted uppercase">Exemple fictif</p>
                  <ul className="space-y-2">
                    {gazeExample.map((g, j) => (
                      <li key={g.label} className="grid grid-cols-[3.5rem_1fr_2.5rem] items-center gap-2 text-xs">
                        <span className="text-muted">{g.label}</span>
                        <ScoreBar value={g.value} delay={j * 0.12} />
                        <span className="text-right font-bold tabular-nums" data-count={g.value} data-suffix=" %">
                          {g.value} %
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {b.extra === "score" && (
                <ul className="mt-5 space-y-3">
                  {interviews.interviewWeights.map((w, j) => (
                    <li key={w.label}>
                      <span className="mb-1.5 flex justify-between text-xs">
                        <span className="text-muted">{w.label}</span>
                        <span className="font-bold text-navy-900">{w.value} %</span>
                      </span>
                      <ScoreBar value={w.value * 2.5} delay={j * 0.12} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
