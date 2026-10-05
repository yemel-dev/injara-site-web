import { Icon } from "@/components/site/ui/Icon";
import { Container, IconBadge, Section, SectionHeading } from "@/components/site/ui/primitives";
import { audience } from "@/content/site";

export function Audience() {
  return (
    <Section id="pour-qui" tone="mist" aria-labelledby="pour-qui-title" className="sm:py-32">
      <Container>
        <SectionHeading id="pour-qui-title" eyebrow={audience.eyebrow} title={audience.title} />
        <ul data-stagger className="grid gap-5 md:grid-cols-3">
          {audience.items.map((a, i) => (
            <li
              key={a.title}
              className="group relative overflow-hidden rounded-3xl border border-line bg-white p-8 transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-brand-100 hover:shadow-2xl hover:shadow-navy-900/10"
            >
              {/* Trait vert qui se déploie au survol */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-500 transition-transform duration-500 group-hover:scale-x-100"
              />
              <span aria-hidden="true" className="text-sm font-extrabold text-navy-900/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <IconBadge className="mt-4">
                <Icon name={a.icon} className="size-6" />
              </IconBadge>
              <h3 className="mt-6 text-xl font-bold text-navy-900">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{a.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
