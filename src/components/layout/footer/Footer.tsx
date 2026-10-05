import Link from "next/link";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Container } from "@/components/ui/Container";
import { footerNavigation, legalLinks } from "@/data/navigation";

import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-evergreen-800 pt-25 pb-18 text-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <nav aria-label="Footer menu" className="columns-1 sm:columns-2 md:columns-3">
            {footerNavigation.map((section) => (
              <div key={section.title} className="max-w-[88%] break-inside-avoid pb-8">
                <p className="mb-2.5 text-[0.8125rem] leading-[1.6] text-mint-500">{section.title}</p>
                <ul>
                  {section.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="font-serif text-xl leading-[1.3] hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div>
            <p className="mb-3 text-base leading-[1.7] tracking-[-0.01em]">Modern Recruiter newsletter</p>
            <p className="text-sm leading-[1.6]">
              Our bi-weekly newsletter full of inspiration, podcasts, trends and news.
            </p>
            <NewsletterForm />
            <LanguageSwitcher className="mt-12" />
          </div>
        </div>

        <SocialLinks className="mt-6 mb-6" />

        <div className="flex flex-col gap-6 text-[0.8125rem] leading-[1.7] lg:flex-row lg:items-end lg:justify-between">
          <p>
            © {new Date().getFullYear()} Greenhouse Software, Inc.
            <br />
            All rights reserved. Greenhouse, the G Logo, “Hire for what’s next,” “The/your all-together hiring
            platform,”
            <br />
            “Talent Makers,” “Real Talent” and “Strong Yes” are among the trademarks of Greenhouse Software, Inc.
          </p>
          <ul className="flex gap-6 text-[0.6875rem]">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:no-underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
