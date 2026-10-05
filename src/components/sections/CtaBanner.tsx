import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ctaBanner } from "@/data/home";

export function CtaBanner() {
  return (
    <section className="overflow-hidden bg-evergreen-950">
      <Container className="relative grid lg:grid-cols-2">
        <div className="relative z-10 pt-20 pb-[515px] md:pb-[615px] lg:py-40">
          <h2 className="font-serif text-[2.375rem] leading-[1.2] tracking-[-0.01em] text-white md:text-5xl lg:text-display">
            {ctaBanner.title}
          </h2>
          <Button variant="blue" href={ctaBanner.cta.href} className="mt-8 lg:mt-12">
            {ctaBanner.cta.label}
          </Button>
        </div>

        <Image
          src={ctaBanner.image}
          alt=""
          width={1038}
          height={1092}
          className="absolute bottom-0 left-1/2 w-[375px] max-w-none -translate-x-1/2 md:w-[575px] lg:right-[-10%] lg:left-auto lg:w-[525px] lg:translate-x-0 xl:right-[-5%] xl:h-full xl:w-auto"
        />
      </Container>
    </section>
  );
}
