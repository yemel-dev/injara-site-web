"use client";

import { useEffect, useRef } from "react";

import { Container } from "@/components/ui/Container";

export function SearchBar({ onClose }: { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="border-t border-evergreen-200 bg-white py-6">
      <Container>
        <form action="/search" role="search" className="flex items-center gap-4">
          <label htmlFor="site-search" className="sr-only">
            Search the site
          </label>
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            name="query"
            placeholder="Search"
            onKeyDown={(e) => e.key === "Escape" && onClose()}
            className="w-full border-b border-evergreen-800 bg-transparent py-2 font-serif text-2xl text-evergreen-800 outline-none placeholder:text-evergreen-700/60 focus:border-mint-900"
          />
          <button
            type="submit"
            className="rounded-full bg-mint-900 px-6 py-3 text-sm text-white transition-colors hover:bg-mint-950"
          >
            Search
          </button>
        </form>
      </Container>
    </div>
  );
}
