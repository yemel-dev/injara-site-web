"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { CloseIcon, MenuIcon, SearchIcon } from "@/components/layout/icons";
import { Container } from "@/components/ui/Container";
import { headerActions, mainNavigation } from "@/data/navigation";
import { cn } from "@/lib/cn";

import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { SearchBar } from "./SearchBar";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const closeAll = () => {
    setOpenMenu(null);
    setSearchOpen(false);
    setMobileOpen(false);
  };

  // Fermeture au clavier (Échap) et au clic en dehors du header.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAll();
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) closeAll();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Bloque le scroll de la page quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileOpen);
  }, [mobileOpen]);

  const activeMenu = mainNavigation.find((item) => item.columns && item.id === openMenu);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <nav aria-label="Main menu" className="relative z-20 bg-white shadow-header">
        <Container className="flex h-[var(--header-height)] items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" aria-label="Greenhouse home" onClick={closeAll}>
              <Image src="/images/brand/wordmark.png" alt="Greenhouse" width={128} height={29} priority className="h-auto w-32" />
            </Link>

            <ul className="hidden items-center gap-7 lg:flex">
              {mainNavigation.map((item) =>
                item.columns ? (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-expanded={openMenu === item.id}
                      aria-controls={`menu-${item.id}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setOpenMenu(openMenu === item.id ? null : item.id);
                      }}
                      className={cn(
                        "text-base leading-[1.6] tracking-[-0.01em] transition-colors hover:text-mint-500",
                        openMenu === item.id && "text-mint-500",
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-base leading-[1.6] tracking-[-0.01em] transition-colors hover:text-mint-500"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={headerActions.signIn.href}
              className="hidden min-h-10 items-center rounded-full border border-evergreen-800 px-7 text-sm transition-colors hover:border-mint-900 hover:text-mint-900 lg:flex"
            >
              {headerActions.signIn.label}
            </Link>
            <Link
              href={headerActions.demo.href}
              className="ml-3 hidden min-h-10 items-center rounded-full border border-cobalt-600 bg-cobalt-600 px-5 text-sm text-white transition-colors hover:border-cobalt-700 hover:bg-cobalt-700 sm:flex"
            >
              {headerActions.demo.label}
            </Link>
            <button
              type="button"
              aria-label="Toggle search form"
              aria-expanded={searchOpen}
              onClick={() => {
                setOpenMenu(null);
                setMobileOpen(false);
                setSearchOpen(!searchOpen);
              }}
              className="flex size-12 items-center justify-center transition-colors hover:text-mint-900"
            >
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </button>
            <button
              type="button"
              aria-label={mobileOpen ? "Close mobile navigation" : "Open mobile navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => {
                setSearchOpen(false);
                setMobileOpen(!mobileOpen);
              }}
              className="-mr-3 flex size-12 items-center justify-center lg:hidden"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </Container>
      </nav>

      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}

      {activeMenu?.columns && (
        <div
          id={`menu-${activeMenu.id}`}
          onClick={(e) => (e.target as HTMLElement).closest("a") && setOpenMenu(null)}
          className="absolute inset-x-0 top-full hidden max-h-[calc(100vh-var(--header-height))] overflow-y-auto bg-evergreen-800 py-16 lg:block"
        >
          <Container>
            <MegaMenu menu={activeMenu} />
          </Container>
        </div>
      )}

      {mobileOpen && <MobileMenu onNavigate={() => setMobileOpen(false)} />}
    </header>
  );
}
