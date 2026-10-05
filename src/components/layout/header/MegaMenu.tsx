import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Link as LinkType, NavColumn, NavMenu } from "@/types/content";

function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("mb-5 text-sm leading-none text-mint-500", className)}>{children}</p>;
}

function MenuLinks({ links, compact }: { links: LinkType[]; compact?: boolean }) {
  return (
    <ul className={cn("flex flex-col", compact ? "gap-1" : "gap-4")}>
      {links.map((link) => (
        <li key={link.href + link.label}>
          <Link
            href={link.href}
            className={cn(
              "border-b border-transparent text-white hover:border-white",
              compact ? "text-base leading-[1.7]" : "font-serif text-[1.75rem] leading-[1.23]",
            )}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Column({ column }: { column: NavColumn }) {
  return (
    <div>
      <Eyebrow>{column.heading}</Eyebrow>
      <MenuLinks links={column.links} compact={column.compact} />
      {column.secondary && (
        <>
          <Eyebrow className="mt-10">{column.secondary.heading}</Eyebrow>
          <MenuLinks links={column.secondary.links} compact={column.compact} />
        </>
      )}
    </div>
  );
}

/** Contenu d'un menu déroulant (utilisé en desktop et dans le menu mobile). */
export function MegaMenu({ menu }: { menu: NavMenu }) {
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:gap-16 xl:gap-24">
      {menu.columns.slice(0, 1).map((column) => (
        <Column key={column.heading} column={column} />
      ))}

      {menu.topics && (
        <div className="lg:w-[22rem]">
          <Eyebrow>{menu.topics.heading}</Eyebrow>
          <ul className="grid grid-cols-2 gap-4">
            {menu.topics.items.map((topic) => (
              <li key={topic.href}>
                <Link href={topic.href} aria-label={topic.label} className="group block text-white">
                  <Image
                    src={topic.image}
                    alt={topic.alt}
                    width={360}
                    height={240}
                    className="mb-2 aspect-[3/2] w-full rounded object-cover transition-opacity group-hover:opacity-80"
                  />
                  <span className="text-sm group-hover:underline">{topic.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {menu.columns.slice(1).map((column) => (
        <Column key={column.heading} column={column} />
      ))}

      {menu.featured && (
        <div className="flex flex-col gap-6 text-white sm:flex-row lg:flex-1 lg:gap-10">
          <Image
            src={menu.featured.image}
            alt={menu.featured.alt}
            width={426}
            height={414}
            className="w-full max-w-[300px] self-start rounded object-cover"
          />
          <div className="max-w-sm">
            <Eyebrow className="mb-3 leading-normal">{menu.featured.eyebrow}</Eyebrow>
            <p className="mb-2 leading-[1.7] font-medium">{menu.featured.title}</p>
            <p className="text-sm leading-[1.6] text-white/80">{menu.featured.description}</p>
            <Button variant="outline-white" href={menu.featured.cta.href} className="mt-6 min-h-10 px-7 text-sm">
              {menu.featured.cta.label}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
