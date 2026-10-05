import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { voiceAiHighlight } from "@/data/home";

export function VoiceAiHighlight() {
  const { title, description, primary, secondary, image, mobileImage } = voiceAiHighlight;

  return (
    <section className="bg-mint-300">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
        <div className="flex items-center px-[8.333%] py-20 lg:px-[16.666%]">
          <div>
            <h2 className="max-w-[600px] font-serif text-[2.375rem] leading-[1.18] tracking-[-0.01em] lg:text-headline">
              {title}
            </h2>
            <p className="mt-8 text-lg leading-[1.7] md:max-w-[90%] lg:max-w-none lg:text-lead">{description}</p>
            <div className="mt-12 flex flex-wrap items-center gap-8 md:mt-8">
              <Button href={primary.href}>{primary.label}</Button>
              <Button variant="text" href={secondary.href}>
                {secondary.label}
              </Button>
            </div>
          </div>
        </div>

        <div className="relative">
          <Image
            src={image}
            alt=""
            width={1440}
            height={1600}
            className="hidden h-full w-full object-cover lg:block"
          />
          <Image src={mobileImage} alt="" width={810} height={720} className="h-auto w-full lg:hidden" />
        </div>
      </div>
    </section>
  );
}
