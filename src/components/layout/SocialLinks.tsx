import Image from "next/image";

import { socialLinks } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socialLinks.map((social) => (
        <li key={social.href}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="block transition-opacity hover:opacity-75"
          >
            <Image src={social.icon} alt="" width={30} height={30} />
          </a>
        </li>
      ))}
    </ul>
  );
}
