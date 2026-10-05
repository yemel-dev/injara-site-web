/**
 * Petites cartes d'interface du hero, inspirées des écrans réels de
 * l'application (analyse du CV, tableau de bord d'activité).
 * ⚠️ Données d'exemple, fictives.
 */
import { Icon } from "@/components/site/ui/Icon";
import { cn } from "@/lib/cn";

const card = "rounded-2xl border border-line bg-white p-4 text-left text-navy-900 shadow-xl shadow-navy-950/20";

/* Boîte mail : candidatures récupérées */
export function InboxCard({ className }: { className?: string }) {
  const rows = ["Candidature – Comptable senior", "Candidature – Développeur web", "Candidature spontanée"];
  return (
    <div className={cn(card, "w-64", className)}>
      <p className="flex items-center gap-2 text-xs font-bold">
        <span className="flex size-6 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <Icon name="mail" className="size-3.5" />
        </span>
        12 nouveaux CV récupérés
      </p>
      <ul className="mt-3 space-y-1.5">
        {rows.map((r) => (
          <li key={r} className="flex items-center gap-2 rounded-lg bg-mist px-2.5 py-1.5 text-[11px]">
            <Icon name="fileText" className="size-3 shrink-0 text-muted" />
            <span className="truncate">{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Analyse du CV (d'après l'écran « CV analysé avec succès ») */
export function CvAnalysisCard({ className }: { className?: string }) {
  return (
    <div className={cn(card, "w-72 overflow-hidden p-0", className)}>
      <div className="flex items-center gap-3 bg-brand-500 px-4 py-3 text-navy-900">
        <span className="flex size-8 items-center justify-center rounded-lg bg-navy-900/10">
          <Icon name="check" className="size-4" strokeWidth={3} />
        </span>
        <span>
          <span className="block text-sm font-bold">CV analysé</span>
          <span className="block text-[11px]">B. Tchami · Comptable senior</span>
        </span>
      </div>
      <div className="space-y-3 p-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-mist p-2">
            <p className="text-[9px] font-semibold tracking-wide text-muted uppercase">Formation</p>
            <p className="text-xs font-bold">Licence</p>
          </div>
          <div className="rounded-lg bg-mist p-2">
            <p className="text-[9px] font-semibold tracking-wide text-muted uppercase">Expérience</p>
            <p className="text-xs font-bold">5 ans</p>
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-[11px] font-bold">Compétences détectées</p>
          <div className="flex flex-wrap gap-1">
            {["SYSCOHADA", "Sage", "Fiscalité", "Excel"].map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700"
              >
                <Icon name="check" className="size-2.5" strokeWidth={3} />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Classement des meilleurs profils */
export function RankingCard({ className }: { className?: string }) {
  const rows = [
    { initials: "AN", name: "A. Ngono", score: 92 },
    { initials: "BT", name: "B. Tchami", score: 87 },
    { initials: "CF", name: "C. Fouda", score: 78 },
  ];
  return (
    <div className={cn(card, "w-64", className)}>
      <p className="text-xs font-bold">Comptable senior</p>
      <p className="text-[11px] text-muted">24 candidatures classées</p>
      <ul className="mt-3 space-y-2">
        {rows.map((r, i) => (
          <li key={r.name} className="flex items-center gap-2">
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                i === 0 ? "bg-brand-500 text-navy-900" : "bg-navy-900 text-white",
              )}
            >
              {r.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11px] font-semibold">{r.name}</span>
              <span className="mt-1 block h-1 overflow-hidden rounded-full bg-navy-900/10">
                <span className="block h-full rounded-full bg-brand-500" style={{ width: `${r.score}%` }} />
              </span>
            </span>
            <span className="text-xs font-extrabold tabular-nums">{r.score}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Courbe d'activité (d'après le tableau de bord « Nouvelles inscriptions ») */
export function ActivityCard({ className }: { className?: string }) {
  return (
    <div className={cn(card, "w-64", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold">Candidatures reçues</p>
          <p className="text-[11px] text-muted">30 derniers jours</p>
        </div>
        <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">+38</span>
      </div>
      <svg viewBox="0 0 220 80" className="mt-3 h-20 w-full" fill="none" aria-hidden="true">
        {[20, 40, 60].map((y) => (
          <line key={y} x1="0" x2="220" y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="3 4" />
        ))}
        <path d="M0 70 C40 68, 70 66, 100 58 S150 40, 170 26 S205 8, 220 6 L220 80 L0 80 Z" fill="#00bf63" fillOpacity="0.08" />
        <path
          data-hero-line
          d="M0 70 C40 68, 70 66, 100 58 S150 40, 170 26 S205 8, 220 6"
          stroke="#00bf63"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="220" cy="6" r="4" fill="#fff" stroke="#00bf63" strokeWidth="2.5" />
      </svg>
      <div className="mt-1 flex justify-between text-[9px] text-muted">
        <span>S1</span>
        <span>S2</span>
        <span>S3</span>
        <span>S4</span>
      </div>
    </div>
  );
}

/* Étiquette (« pill ») d'une grappe du hero */
export function ClusterLabel({ icon, children }: { icon: Parameters<typeof Icon>[0]["name"]; children: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-xl bg-brand-50 px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-navy-900 shadow-lg shadow-navy-950/20">
      <Icon name={icon} className="size-4 text-brand-700" />
      {children}
    </span>
  );
}
