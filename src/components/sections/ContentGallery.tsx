import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import type { ButtonVariant, GalleryItem } from "@/types/content";

type ContentGalleryProps = {
  title?: string;
  items: GalleryItem[];
  ctaVariant?: ButtonVariant;
  className?: string;
};

/** Grille de 3 cartes image + titre + texte + lien. */
export function ContentGallery({ title, items, ctaVariant = "outline", className }: ContentGalleryProps) {
  return (
    <section className={cn("bg-white py-12 md:py-20", className)}>
      <Container>
        {title && (
          <h2 className="mb-12 max-w-[900px] font-serif text-[2.375rem] leading-[1.2] tracking-[-0.01em] md:text-5xl lg:mb-20 lg:text-display">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="border-t border-mint-500 pt-14 first:border-t-0 first:pt-0 md:border-t-0 md:pt-0"
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={720}
                height={480}
                className="mb-4 h-auto w-full rounded md:mb-6"
              />
              <h3 className="font-serif text-title">{item.title}</h3>
              <p className="mt-4 text-base leading-6">{item.description}</p>
              <div className="mt-6">
                <Button variant={ctaVariant} href={item.cta.href}>
                  {item.cta.label}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
