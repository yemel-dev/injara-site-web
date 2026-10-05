"use client";

import Link from "next/link";
import { useState } from "react";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { ChevronIcon } from "@/components/layout/icons";
import { Button } from "@/components/ui/Button";
import { headerActions, legalLinks, mainNavigation } from "@/data/navigation";
import { cn } from "@/lib/cn";

import { MegaMenu } from "./MegaMenu";

export function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div
      id="mobile-menu"
      onClick={(e) => (e.target as HTMLElement).closest("a") && onNavigate()}
      className="fixed inset-x-0 top-[var(--header-height)] bottom-0 overflow-y-auto bg-evergreen-800 px-6 pt-6 pb-16 text-white lg:hidden"
    >
      <ul className="divide-y divide-mint-500/30 border-b border-mint-500/30">
        {mainNavigation.map((item) =>
          item.columns ? (
            <li key={item.id}>
              <button
                type="button"
                aria-expanded={openId === item.id}
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="flex w-full items-center justify-between py-5 font-serif text-2xl"
              >
                {item.label}
                <ChevronIcon className={cn("transition-transform", openId === item.id && "rotate-180")} />
              </button>
              {openId === item.id && (
                <div className="pb-8">
                  <MegaMenu menu={item} />
                </div>
              )}
            </li>
          ) : (
            <li key={item.href}>
              <Link href={item.href} className="block py-5 font-serif text-2xl">
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>

      <div className="mt-10 flex flex-col gap-4">
        <Button variant="blue" href={headerActions.demo.href} className="min-h-11 text-sm">
          {headerActions.demo.label}
        </Button>
        <Button variant="outline-white" href={headerActions.signIn.href} className="min-h-11 text-sm">
          {headerActions.signIn.label}
        </Button>
      </div>

      <LanguageSwitcher className="mt-10" />
      <SocialLinks className="mt-8" />

      <ul className="mt-8 flex gap-6 text-[0.8125rem]">
        {legalLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[0.8125rem]">© {new Date().getFullYear()} Greenhouse Software, Inc.</p>
    </div>
  );
}
