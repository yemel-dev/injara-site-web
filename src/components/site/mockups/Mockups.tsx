/**
 * Maquettes stylisées de l'application INJARA, dessinées en HTML/CSS.
 * ⚠️ Toutes les données affichées sont FICTIVES et signalées comme telles.
 * Elles pourront être remplacées par de vraies captures d'écran.
 */
import type { ReactNode } from "react";

import { Icon } from "@/components/site/ui/Icon";
import { ScoreBar } from "@/components/site/ui/primitives";
import { cn } from "@/lib/cn";

/* ── Données fictives ───────────────────────────────────────────────────── */

const offers = [
  { name: "Comptable senior", count: 24 },
  { name: "Développeur web", count: 31 },
  { name: "Commercial terrain", count: 18 },
];

const candidates = [
  { initials: "AN", name: "A. Ngono", detail: "Comptabilité · 7 ans", score: 92, potential: "Exceptionnel" },
  { initials: "BT", name: "B. Tchami", detail: "Audit · 5 ans", score: 87, potential: "Élevé" },
  { initials: "CF", name: "C. Fouda", detail: "Finance · 4 ans", score: 78, potential: "Élevé" },
  { initials: "DK", name: "D. Kamga", detail: "Gestion · 2 ans", score: 64, potential: "Moyen" },
];

/* ── Cadre de fenêtre commun ────────────────────────────────────────────── */

export function MockWindow({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-white text-left text-navy-900 shadow-2xl shadow-navy-950/30",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-mist px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-navy-900/15" />
          <span className="size-2.5 rounded-full bg-navy-900/15" />
          <span className="size-2.5 rounded-full bg-navy-900/15" />
        </span>
        <span className="truncate text-xs font-semibold text-muted">{title}</span>
        <span className="ml-auto shrink-0 text-[10px] font-medium text-muted/80">Données d&apos;exemple</span>
      </div>
      {children}
      <figcaption className="sr-only">Maquette illustrative de INJARA : {title}. Données fictives.</figcaption>
    </figure>
  );
}

function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white",
        className,
      )}
    >
      {initials}
    </span>
  );
}

function PotentialChip({ level }: { level: string }) {
  const strong = level === "Exceptionnel" || level === "Élevé";
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-bold whitespace-nowrap",
        strong ? "bg-brand-50 text-brand-700" : "bg-navy-50 text-navy-700",
      )}
    >
      {level}
    </span>
  );
}

/* ── 1. Tableau de bord ─────────────────────────────────────────────────── */

export function DashboardMockup({ className }: { className?: string }) {
  return (
    <MockWindow title="INJARA · Tableau de bord" className={className}>
      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-bold">Classement par offre</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">
            <Icon name="bell" className="size-3.5" />
            12 nouveaux CV récupérés
          </span>
        </div>

        <div className="flex gap-2 overflow-hidden" aria-hidden="true">
          {offers.map((o, i) => (
            <span
              key={o.name}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-semibold",
                i === 0 ? "bg-navy-900 text-white" : "bg-mist text-muted",
              )}
            >
              {o.name} <span className="opacity-60">({o.count})</span>
            </span>
          ))}
        </div>

        <ul className="space-y-2">
          {candidates.map((c, i) => (
            <li key={c.name} className="flex items-center gap-3 rounded-xl border border-line p-2.5">
              <span className="w-4 text-center text-xs font-bold text-muted">{i + 1}</span>
              <Avatar initials={c.initials} className={i === 0 ? "bg-brand-500 text-navy-900" : undefined} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{c.name}</span>
                <span className="block truncate text-[11px] text-muted">{c.detail}</span>
              </span>
              <span className="hidden w-24 sm:block">
                <ScoreBar value={c.score} />
              </span>
              <span className="w-10 text-right text-sm font-extrabold tabular-nums">{c.score}%</span>
              <span className="hidden min-[420px]:block">
                <PotentialChip level={c.potential} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </MockWindow>
  );
}

/* ── 2. Fiche candidat ──────────────────────────────────────────────────── */

function ScoreRing({ value, label }: { value: number; label: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative size-24 shrink-0">
      <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="40" cy="40" r={r} fill="none" strokeWidth="7" className="stroke-mist" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          className="stroke-brand-500"
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-extrabold">{value}%</span>
        <span className="text-[10px] text-muted">{label}</span>
      </span>
    </div>
  );
}

export function CandidateMockup({ className }: { className?: string }) {
  const breakdown = [
    { label: "Compétences (40 %)", value: 90 },
    { label: "Expérience (25 %)", value: 84 },
    { label: "Formation (20 %)", value: 80 },
    { label: "Adéquation (15 %)", value: 88 },
  ];
  return (
    <MockWindow title="INJARA · Fiche candidat" className={className}>
      <div className="grid gap-5 p-4 sm:p-6 md:grid-cols-[auto_1fr]">
        <div className="flex items-center gap-4 md:flex-col md:items-start">
          <ScoreRing value={87} label="score CV" />
          <div>
            <p className="font-bold">B. Tchami</p>
            <p className="text-xs text-muted">Offre : Comptable senior</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs">
              Potentiel : <PotentialChip level="Élevé" />
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <ul className="space-y-2.5">
            {breakdown.map((b) => (
              <li key={b.label}>
                <span className="mb-1 flex justify-between text-xs">
                  <span className="text-muted">{b.label}</span>
                  <span className="font-bold">{b.value}%</span>
                </span>
                <ScoreBar value={b.value} />
              </li>
            ))}
          </ul>
          <div className="rounded-xl bg-mist p-3 text-xs leading-relaxed text-muted">
            <span className="font-bold text-navy-900">Pourquoi « Élevé » ? </span>
            Progression régulière (assistant → chef comptable en 5 ans), expérience dans deux secteurs, encadrement
            d&apos;une petite équipe.
          </div>
          <div className="flex flex-wrap gap-1.5" aria-label="Compétences extraites (exemple)">
            {["SYSCOHADA", "Sage", "Fiscalité", "Excel avancé", "Audit interne"].map((s) => (
              <span key={s} className="rounded-md border border-line px-2 py-0.5 text-[11px] font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

/* ── 3. Salle d'entretien ───────────────────────────────────────────────── */

export function InterviewMockup({ className }: { className?: string }) {
  return (
    <MockWindow title="INJARA · Salle d'entretien" className={className}>
      <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-[1.4fr_1fr]">
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-navy-950">
          <span className="flex size-20 items-center justify-center rounded-full bg-white/10 text-navy-100">
            <Icon name="users" className="size-9" />
          </span>
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2 py-1 text-[10px] font-bold text-white">
            <span className="size-2 animate-pulse rounded-full bg-red-500" /> REC · 12:47
          </span>
          <span className="absolute right-3 bottom-3 flex gap-1.5">
            <span className="rounded-full bg-white/15 p-1.5 text-white">
              <Icon name="mic" className="size-3.5" />
            </span>
            <span className="rounded-full bg-white/15 p-1.5 text-white">
              <Icon name="video" className="size-3.5" />
            </span>
          </span>
          <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-white/80">C. Fouda (fictif)</span>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-line p-3">
            <p className="text-[10px] font-bold tracking-wide text-muted uppercase">Question 3 / 6</p>
            <p className="mt-1 text-sm font-semibold">Décrivez une clôture comptable difficile que vous avez gérée.</p>
          </div>
          <div className="rounded-xl border border-line p-3">
            <p className="mb-2 text-[10px] font-bold tracking-wide text-muted uppercase">Signaux à vérifier</p>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-start gap-2">
                <Icon name="alert" className="mt-0.5 size-3.5 shrink-0 text-amber-600" />
                Sortie de la fenêtre à 08:12
              </li>
              <li className="flex items-start gap-2">
                <Icon name="eye" className="mt-0.5 size-3.5 shrink-0 text-navy-600" />
                Regard hors écran : 12 % du temps
              </li>
            </ul>
          </div>
          <div className="flex items-start gap-2 rounded-xl bg-mist p-3 text-[11px] text-muted">
            <Icon name="message" className="mt-0.5 size-3.5 shrink-0" />
            <span>Transcription en cours…</span>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

/* ── 4. Rapport PDF ─────────────────────────────────────────────────────── */

export function ReportMockup({ className }: { className?: string }) {
  const tiles = [
    { label: "Score CV", value: 78 },
    { label: "Score entretien", value: 81 },
    { label: "Score global", value: 79, highlight: true },
  ];
  return (
    <MockWindow title="Rapport_C-Fouda.pdf" className={className}>
      <div className="bg-mist p-4 sm:p-6">
        <div className="mx-auto max-w-xl rounded-lg bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-start justify-between gap-3 border-b border-line pb-4">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-brand-700 uppercase">Rapport candidat</p>
              <p className="mt-1 text-lg font-extrabold">C. Fouda</p>
              <p className="text-xs text-muted">Offre : Comptable senior</p>
            </div>
            <Icon name="fileCheck" className="size-8 text-navy-900/20" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {tiles.map((t) => (
              <div
                key={t.label}
                className={cn("rounded-lg p-2.5 text-center", t.highlight ? "bg-navy-900 text-white" : "bg-mist")}
              >
                <p className="text-xl font-extrabold">{t.value}%</p>
                <p className={cn("text-[10px]", t.highlight ? "text-navy-100" : "text-muted")}>{t.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-xs">
            <p className="font-bold">Rapport comportemental</p>
            <ul className="space-y-1 text-muted">
              <li>• 1 sortie de la fenêtre (8 s)</li>
              <li>• Regard hors écran : 12 % du temps</li>
              <li>• Aucune application suspecte détectée</li>
            </ul>
            <p className="rounded-md bg-brand-50 p-2 text-[11px] text-brand-700">
              Indicateurs d&apos;aide à la décision, pas une preuve.
            </p>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

/* ── 5. Création d'un profil de poste (étape 1) ─────────────────────────── */

export function ProfileMockup({ className }: { className?: string }) {
  const fields = [
    { label: "Intitulé du poste", value: "Comptable senior" },
    { label: "Expérience souhaitée", value: "5 ans et plus" },
    { label: "Formation", value: "Bac+3 en comptabilité ou finance" },
  ];
  return (
    <MockWindow title="INJARA · Nouveau profil de poste" className={className}>
      <div className="space-y-3 p-4 sm:p-5">
        {fields.map((f) => (
          <div key={f.label} data-v>
            <p className="text-[11px] font-semibold text-muted">{f.label}</p>
            <p className="mt-1 rounded-lg border border-line px-3 py-2 text-sm font-medium">{f.value}</p>
          </div>
        ))}
        <div data-v>
          <p className="text-[11px] font-semibold text-muted">Compétences clés</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {["SYSCOHADA", "Sage", "Fiscalité", "Excel avancé"].map((s) => (
              <span key={s} className="rounded-md bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand-700">
                {s}
              </span>
            ))}
            <span className="rounded-md border border-dashed border-line px-2 py-1 text-[11px] text-muted">+ Ajouter</span>
          </div>
        </div>
        <p data-v className="rounded-lg bg-navy-900 py-2.5 text-center text-sm font-bold text-white">
          Enregistrer le poste
        </p>
      </div>
    </MockWindow>
  );
}

/* ── 6. Récupération automatique des candidatures (étape 2) ─────────────── */

export function InboxMockup({ className }: { className?: string }) {
  const mails = [
    { from: "a.ngono@…", subject: "Candidature – Comptable senior", file: "CV_Ngono.pdf" },
    { from: "b.tchami@…", subject: "Candidature – Comptable senior", file: "CV_Tchami.docx" },
    { from: "e.mbarga@…", subject: "Candidature – Développeur web", file: "CV_Mbarga.pdf" },
    { from: "f.ewane@…", subject: "Candidature spontanée", file: "CV_Ewane.pdf" },
  ];
  return (
    <MockWindow title="INJARA · Agent IA de récupération" className={className}>
      <div className="space-y-3 p-4 sm:p-5">
        <div data-v className="flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700">
          <Icon name="refresh" className="size-3.5 animate-spin [animation-duration:3s]" />
          Synchronisation de la boîte mail…
        </div>
        <ul className="space-y-2">
          {mails.map((m) => (
            <li key={m.file} data-v className="flex items-center gap-3 rounded-xl border border-line p-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-mist text-navy-600">
                <Icon name="mail" className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold">{m.subject}</span>
                <span className="block truncate text-[11px] text-muted">{m.from}</span>
              </span>
              <span className="hidden shrink-0 items-center gap-1 rounded-md bg-navy-50 px-2 py-1 text-[10px] font-semibold text-navy-700 min-[420px]:inline-flex">
                <Icon name="fileText" className="size-3" />
                {m.file}
              </span>
              <Icon name="check" className="size-4 shrink-0 text-brand-600" strokeWidth={3} />
            </li>
          ))}
        </ul>
        <p data-v className="text-center text-[11px] font-semibold text-muted">
          4 CV importés sur votre ordinateur · chiffrés
        </p>
      </div>
    </MockWindow>
  );
}

/* ── 7. Classement des candidatures par poste (étape 3) ─────────────────── */

export function SortMockup({ className }: { className?: string }) {
  const columns = [
    { name: "Comptable senior", cvs: ["AN", "BT", "CF", "DK"] },
    { name: "Développeur web", cvs: ["EM", "GT", "HN"] },
    { name: "Commercial terrain", cvs: ["IF", "JB"] },
  ];
  return (
    <MockWindow title="INJARA · Classement par poste" className={className}>
      <div className="grid grid-cols-3 gap-2.5 p-4 sm:p-5">
        {columns.map((col) => (
          <div key={col.name} data-v className="rounded-xl bg-mist p-2.5">
            <p className="truncate text-[11px] font-bold">{col.name}</p>
            <p className="text-[10px] text-muted">{col.cvs.length} candidatures</p>
            <ul className="mt-2.5 space-y-1.5">
              {col.cvs.map((cv) => (
                <li key={cv} className="flex items-center gap-1.5 rounded-lg bg-white p-1.5 shadow-sm">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[9px] font-bold text-white">
                    {cv}
                  </span>
                  <span className="h-1.5 flex-1 rounded-full bg-navy-900/10" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </MockWindow>
  );
}

/* ── 8. Statistiques (d'après le tableau de bord d'activité de l'application) ─ */

export function StatsMockup({ className }: { className?: string }) {
  const stats = [
    { label: "Candidatures", value: "248", icon: "inbox" },
    { label: "Postes ouverts", value: "3", icon: "briefcase" },
    { label: "Entretiens", value: "12", icon: "video" },
    { label: "Nouveaux (7 j)", value: "38", icon: "trendingUp" },
  ] as const;
  const activity = [
    { title: "Nouvelle candidature", who: "A. Ngono · Comptable senior", when: "il y a 1 h", icon: "mail" },
    { title: "Entretien terminé", who: "C. Fouda · Comptable senior", when: "il y a 3 h", icon: "video" },
    { title: "Poste publié", who: "Développeur web", when: "il y a 2 j", icon: "briefcase" },
  ] as const;
  const months = ["Mai", "Juin", "Juil", "Août", "Sept", "Oct"];
  return (
    <MockWindow title="INJARA · Statistiques" className={className}>
      <div className="space-y-4 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} data-v className="rounded-xl border border-line p-3">
              <Icon name={s.icon} className="size-4 text-brand-700" />
              <p className="mt-2 text-xl font-extrabold tabular-nums">{s.value}</p>
              <p className="text-[11px] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-[1.5fr_1fr]">
          <div data-v className="rounded-xl border border-line p-3">
            <p className="text-xs font-bold">Candidatures reçues</p>
            <p className="text-[11px] text-muted">6 derniers mois</p>
            <svg viewBox="0 0 300 100" className="mt-2 h-28 w-full" fill="none" aria-hidden="true">
              {[25, 50, 75].map((y) => (
                <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="3 4" />
              ))}
              <path d="M0 88 C40 86, 70 80, 110 74 S170 58, 200 46 S260 18, 300 10 L300 100 L0 100 Z" fill="#00bf63" fillOpacity="0.08" />
              <path d="M0 88 C40 86, 70 80, 110 74 S170 58, 200 46 S260 18, 300 10" stroke="#00bf63" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="300" cy="10" r="4" fill="#fff" stroke="#00bf63" strokeWidth="2.5" />
            </svg>
            <div className="mt-1 flex justify-between text-[10px] text-muted">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
          <div data-v className="rounded-xl border border-line p-3">
            <p className="mb-2 text-xs font-bold">Activité récente</p>
            <ul className="space-y-2.5">
              {activity.map((a) => (
                <li key={a.title} className="flex gap-2.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Icon name={a.icon} className="size-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold">{a.title}</span>
                    <span className="block truncate text-[10px] text-muted">{a.who}</span>
                    <span className="block text-[10px] text-muted/80">{a.when}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}
