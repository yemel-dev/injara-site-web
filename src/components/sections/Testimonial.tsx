import Image from "next/image";

import { testimonial } from "@/data/home";

export function Testimonial() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
        <div className="relative overflow-hidden bg-smoke lg:overflow-visible">
          <Image
            src={testimonial.image}
            alt={testimonial.alt}
            width={1440}
            height={1600}
            className="hidden h-full w-full object-cover lg:block"
          />
          <Image
            src={testimonial.mobileImage}
            alt={testimonial.alt}
            width={750}
            height={840}
            className="h-auto w-full lg:hidden"
          />
        </div>

        <figure className="flex items-center px-[12.5%] py-16 lg:px-[16.666%] lg:py-20">
          <div className="relative">
            <span
              aria-hidden
              className="absolute -left-4 font-serif text-[1.75rem] leading-none md:-left-[30px] md:mt-1 md:text-headline"
            >
              “
            </span>
            <blockquote className="font-serif text-[1.75rem] leading-[1.18] md:text-headline">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-8 text-[0.9375rem] leading-[1.7]">
              <strong className="font-medium">{testimonial.author}</strong>
              <br />
              {testimonial.role}
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
