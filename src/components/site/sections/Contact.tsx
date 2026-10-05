import { Icon, type IconName } from "@/components/site/ui/Icon";
import { ButtonLink, Container, SymbolWatermark } from "@/components/site/ui/primitives";
import { company, contact, cta } from "@/content/site";

import { ContactForm } from "./ContactForm";

export function Contact() {
  const details: { icon: IconName; label: string; value: string; href?: string }[] = [
    { icon: "mail", label: "E-mail", value: company.email, href: `mailto:${company.email}` },
    { icon: "phone", label: "Téléphone / WhatsApp", value: company.phone, href: company.whatsappHref },
    { icon: "mapPin", label: "Ville", value: company.city },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-clip bg-navy-900 py-20 text-white sm:py-24"
    >
      {/* Bandeau vert / bleu marine, dans l'esprit du CTA de l'ancien site */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-900 to-brand-700/60" aria-hidden="true" />
      <SymbolWatermark variant="green" rotate={-60} className="-right-32 -bottom-32 w-[30rem] opacity-[0.08]" />

      <Container className="relative grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div data-reveal="left" className="lg:sticky lg:top-28">
          <h2 id="contact-title" data-split className="text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
            {contact.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-navy-100">{contact.intro}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <ButtonLink href={cta.demo.href} arrow magnetic>
              {cta.demo.label}
            </ButtonLink>
            <ButtonLink href={cta.quote.href} variant="glass" magnetic>
              {cta.quote.label}
            </ButtonLink>
          </div>

          <ul className="mt-10 space-y-4">
            {details.map((d) => (
              <li key={d.label} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-400">
                  <Icon name={d.icon} className="size-5" />
                </span>
                <span>
                  <span className="block text-xs text-navy-200">{d.label}</span>
                  {d.href ? (
                    <a href={d.href} className="block text-sm font-semibold hover:text-brand-400">
                      {d.value}
                    </a>
                  ) : (
                    <span className="block text-sm font-semibold">{d.value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal="right" data-delay="0.1" className="relative">
          {/* Ancres ciblées par les boutons d'appel à l'action */}
          <span id="demo" className="absolute -top-24" aria-hidden="true" />
          <span id="devis" className="absolute -top-24" aria-hidden="true" />
          <div className="rounded-3xl bg-white p-6 text-navy-900 shadow-2xl shadow-black/30 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
