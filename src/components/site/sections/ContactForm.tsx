"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";

import { Icon } from "@/components/site/ui/Icon";
import { company, contact, FORM_ENDPOINT } from "@/content/site";
import { cn } from "@/lib/cn";

type Intent = "demo" | "quote";
type Status = "idle" | "sending" | "success" | "error" | "unconfigured";
type Errors = Partial<Record<"name" | "email" | "company" | "volume" | "consent", string>>;

/* Les boutons « Demander une démo » (#demo) et « Demander un devis »
   (#devis) pré-sélectionnent le type de demande. */
const subscribeHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const getHash = () => window.location.hash;
const getServerHash = () => "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (String(data.get("name") ?? "").trim().length < 2) errors.name = "Indiquez votre nom.";
  if (!EMAIL_RE.test(String(data.get("email") ?? "").trim())) errors.email = "Indiquez une adresse e-mail valide.";
  if (String(data.get("company") ?? "").trim().length < 2) errors.company = "Indiquez le nom de votre entreprise.";
  if (!data.get("volume")) errors.volume = "Choisissez une estimation.";
  if (!data.get("consent")) errors.consent = "Votre accord est nécessaire pour que nous puissions vous répondre.";
  return errors;
}

const inputClass =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-muted/70 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 aria-[invalid=true]:border-red-500";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-red-600">
      {message}
    </p>
  );
}

export function ContactForm() {
  const hash = useSyncExternalStore(subscribeHash, getHash, getServerHash);
  // Choix manuel de l'utilisateur, valable tant que l'ancre ne change pas.
  const [manual, setManual] = useState<{ hash: string; intent: Intent } | null>(null);
  const intent: Intent =
    manual && manual.hash === hash ? manual.intent : hash === "#devis" ? "quote" : "demo";

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    if (!FORM_ENDPOINT) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    try {
      data.set("demande", intent === "demo" ? "Demande de démo" : "Demande de devis");
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center py-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-brand-500 text-navy-900">
          <Icon name="check" className="size-7" strokeWidth={3} />
        </span>
        <p className="mt-5 max-w-sm text-base font-semibold text-navy-900">{contact.success[intent]}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Type de demande */}
      <fieldset>
        <legend className="text-sm font-semibold text-navy-900">Je souhaite</legend>
        <div className="mt-2 grid grid-cols-2 gap-1 rounded-full bg-mist p-1">
          {(
            [
              ["demo", "Une démo"],
              ["quote", "Un devis"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={cn(
                "cursor-pointer rounded-full px-3 py-2 text-center text-sm font-semibold transition-all has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-500",
                intent === value ? "bg-navy-900 text-white shadow" : "text-muted hover:text-navy-900",
              )}
            >
              <input
                type="radio"
                name="intent"
                value={value}
                checked={intent === value}
                onChange={() => setManual({ hash, intent: value })}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-sm font-semibold text-navy-900">
            Nom complet
          </label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            className={inputClass}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
          />
          <FieldError id="cf-name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="cf-email" className="text-sm font-semibold text-navy-900">
            E-mail professionnel
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="vous@entreprise.cm"
            className={inputClass}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
          />
          <FieldError id="cf-email-error" message={errors.email} />
        </div>
        <div>
          <label htmlFor="cf-company" className="text-sm font-semibold text-navy-900">
            Entreprise
          </label>
          <input
            id="cf-company"
            name="company"
            autoComplete="organization"
            className={inputClass}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "cf-company-error" : undefined}
          />
          <FieldError id="cf-company-error" message={errors.company} />
        </div>
        <div>
          <label htmlFor="cf-volume" className="text-sm font-semibold text-navy-900">
            CV reçus par mois
          </label>
          <select
            id="cf-volume"
            name="volume"
            defaultValue=""
            className={inputClass}
            aria-invalid={!!errors.volume}
            aria-describedby={errors.volume ? "cf-volume-error" : undefined}
          >
            <option value="" disabled>
              Choisir…
            </option>
            {contact.volumes.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <FieldError id="cf-volume-error" message={errors.volume} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="text-sm font-semibold text-navy-900">
          Message <span className="font-normal text-muted">(facultatif)</span>
        </label>
        <textarea id="cf-message" name="message" rows={4} maxLength={2000} className={inputClass} />
      </div>

      {/* Piège à robots (Formspree) : invisible pour les humains */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            name="consent"
            value="oui"
            className="mt-0.5 size-4 shrink-0 accent-brand-600"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "cf-consent-error" : undefined}
          />
          <span>
            {contact.consent}{" "}
            <a href="/politique-de-confidentialite" className="font-semibold text-brand-700 underline-offset-2 hover:underline">
              Politique de confidentialité
            </a>
          </span>
        </label>
        <FieldError id="cf-consent-error" message={errors.consent} />
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
            L&apos;envoi a échoué. Réessayez dans un instant ou écrivez-nous à {company.email}.
          </p>
        )}
        {status === "unconfigured" && (
          <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
            Le formulaire n&apos;est pas encore relié à une messagerie. En attendant, écrivez-nous à{" "}
            <strong>{company.email}</strong>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-bold text-navy-900 shadow-lg shadow-brand-500/20 transition-all duration-300 hover:bg-brand-400 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending"
          ? "Envoi en cours…"
          : intent === "demo"
            ? "Envoyer ma demande de démo"
            : "Envoyer ma demande de devis"}
        <Icon name="send" className="size-4" />
      </button>
    </form>
  );
}
