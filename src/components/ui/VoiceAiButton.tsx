import Image from "next/image";
import Link from "next/link";

const waveDelays = ["[animation-delay:0s]", "[animation-delay:0.12s]", "[animation-delay:0.24s]", "[animation-delay:0.36s]"];
const waveHeights = ["h-2.5", "h-2", "h-2.5", "h-4"];

/** Bouton « Voice AI » : l'icône micro se transforme en ondes sonores au survol. */
export function VoiceAiButton({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-center rounded-full border border-mint-900 bg-mint-900 px-5 py-2 text-[0.9375rem] leading-none text-white transition-colors duration-150 hover:border-mint-950 hover:bg-mint-950"
    >
      <span className="flex aspect-square w-5 flex-none items-center justify-center overflow-hidden opacity-100 transition-all duration-250 group-hover:w-0 group-hover:opacity-0 motion-reduce:transition-none">
        <Image src="/images/icons/microphone.svg" alt="" width={11} height={17} />
      </span>
      <span
        aria-hidden
        className="flex aspect-square w-0 flex-none items-center justify-center gap-1 overflow-hidden opacity-0 transition-all duration-250 group-hover:w-5 group-hover:opacity-100 motion-reduce:transition-none"
      >
        {waveDelays.map((delay, i) => (
          <span
            key={i}
            className={`w-px rounded-full bg-white ${waveHeights[i]} ${delay} group-hover:animate-soundbar motion-reduce:group-hover:animate-none`}
          />
        ))}
      </span>
      <span className="ml-3">{label}</span>
    </Link>
  );
}
