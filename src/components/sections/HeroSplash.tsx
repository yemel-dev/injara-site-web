import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { VoiceAiButton } from "@/components/ui/VoiceAiButton";
import { hero } from "@/data/home";

export function HeroSplash() {
  return (
    <section className="bg-marigold-100 lg:bg-marigold-200">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden lg:h-[900px]">
        {/* Illustration desktop (image fixe 1440×900, centrée) */}
        <Image
          src={hero.illustration}
          alt=""
          width={1440}
          height={900}
          priority
          className="absolute top-0 left-1/2 hidden h-[900px] w-[1440px] max-w-none -translate-x-1/2 lg:block"
        />

        <div className="relative z-10 mx-auto w-full px-6 pt-[calc(var(--header-height)+5rem)] pb-10 text-center sm:w-[450px] sm:px-0 lg:w-[600px] lg:pt-[360px] lg:pb-0">
          <h1 className="font-serif text-5xl leading-none tracking-[-0.01em] sm:leading-[1.2] lg:text-display">
            {hero.title}
          </h1>
          <p className="mt-6 text-lg leading-[1.7] lg:text-lead">{hero.description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-8 lg:flex-row">
            <VoiceAiButton {...hero.voiceAi} />
            <Button variant="outline" href={hero.platform.href}>
              {hero.platform.label}
            </Button>
          </div>
        </div>

        {/* Visuel mobile / tablette */}
        <div className="bg-evergreen-900 lg:hidden">
          <Image src={hero.mobileImage} alt="" width={750} height={640} className="h-auto w-full" />
        </div>
      </div>
    </section>
  );
}
