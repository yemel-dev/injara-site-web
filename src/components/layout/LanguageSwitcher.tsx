import Link from "next/link";

import { locales } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="mb-2 text-[0.8125rem] leading-[1.6] text-mint-500">Choose your language</p>
      <ul>
        {locales.map((locale) => (
          <li key={locale.href}>
            <Link
              href={locale.href}
              aria-current={locale.current ? "page" : undefined}
              className={cn("text-base leading-7 text-white hover:underline", locale.current && "underline")}
            >
              {locale.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
