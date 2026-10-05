import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { customers } from "@/data/home";

export function CustomerLogos() {
  return (
    <section className="relative bg-white">
      <Container className="grid py-20 lg:grid-cols-2 lg:gap-[8.333%] lg:py-30">
        <div className="flex flex-col items-start justify-center border-b border-mint-500/40 pb-16 lg:border-b-0 lg:pb-0">
          <h2 className="font-serif text-[1.75rem] leading-[1.1] tracking-[-0.01em] md:text-headline">
            {customers.title}
          </h2>
          <Button href={customers.cta.href} className="mt-8">
            {customers.cta.label}
          </Button>
        </div>

        <ul className="flex flex-wrap items-center lg:py-12">
          {customers.logos.map((customer) => {
            const logo = (
              <Image
                src={customer.logo}
                alt={customer.name}
                width={480}
                height={120}
                className="h-auto max-h-16 w-auto max-w-[142px] object-contain md:max-w-[176px]"
              />
            );
            return (
              <li key={customer.name} className="flex min-h-[150px] basis-1/2 items-center justify-center lg:justify-start">
                {customer.href ? (
                  <Link href={customer.href} className="transition-opacity duration-200 hover:opacity-75">
                    {logo}
                  </Link>
                ) : (
                  logo
                )}
              </li>
            );
          })}
        </ul>
      </Container>

      {/* Séparateur vertical central (desktop) */}
      <div aria-hidden className="absolute inset-y-0 left-1/2 hidden w-px bg-mint-500/40 lg:block" />
    </section>
  );
}
