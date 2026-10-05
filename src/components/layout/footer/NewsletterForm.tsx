"use client";

import { useState } from "react";

/**
 * Formulaire newsletter. L'original passait par Marketo ; ici seul l'état
 * côté client est géré — brancher `onSubmit` sur votre propre API.
 */
export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <p className="mt-6 text-sm text-mint-500">Thanks for subscribing!</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="mt-6 flex flex-col gap-3"
    >
      <label htmlFor="newsletter-email" className="text-sm">
        <span className="text-mint-500">*</span> Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        className="h-11 w-full rounded border border-white/40 bg-transparent px-3 text-white outline-none focus:border-mint-500"
      />
      <button
        type="submit"
        className="mt-2 self-start rounded-full border border-mint-900 bg-mint-900 px-8 py-3 text-[0.9375rem] leading-none text-white transition-colors hover:border-mint-950 hover:bg-mint-950"
      >
        Subscribe
      </button>
    </form>
  );
}
