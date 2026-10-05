import { Icon } from "@/components/site/ui/Icon";
import { Container, Eyebrow, IconBadge, Section } from "@/components/site/ui/primitives";
import { problem } from "@/content/site";

export function Problem() {
  return (
    <Section id="probleme" aria-labelledby="probleme-title" className="sm:py-32">
      <Container>
        <div className="max-w-5xl">
          <div data-reveal="fade">
            <Eyebrow>{problem.eyebrow}</Eyebrow>
          </div>
          {/* Grande phrase qui s'illumine au rythme du défilement */}
          <p
            data-scrub-words
            className="mt-6 text-3xl leading-[1.15] font-extrabold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl"
          >
            {problem.statement}
          </p>
          <h2 id="probleme-title" data-reveal className="mt-8 max-w-2xl text-lg font-semibold text-muted">
            {problem.title}.
          </h2>
        </div>

        <ul data-stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problem.items.map((item) => (
            <li
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-line bg-white p-7 transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-brand-100 hover:shadow-2xl hover:shadow-navy-900/10"
            >
              <IconBadge>
                <Icon name={item.icon} className="size-6" />
              </IconBadge>
              <h3 className="mt-6 text-lg font-bold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
