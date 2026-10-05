/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONTENU DU SITE VITRINE INJARA
 *
 *  Tous les textes de la page sont ici : modifiez ce fichier, pas les
 *  composants.
 *
 *  Règle : on n'invente rien (pas de chiffres, témoignages, clients, prix).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { IconName } from "@/components/site/ui/Icon";

/* ── Société et coordonnées ─────────────────────────────────────────────── */

export const company = {
  name: "INJARA",
  tagline:
    "INJARA est la solution camerounaise de recrutement intelligent : tri des CV par IA, classement par offre et entretiens vidéo sécurisés, avec des données qui restent chez vous.",
  email: "yemelwork@gmail.com",
  phone: "+237 696 10 10 88", // téléphone / WhatsApp
  phoneHref: "tel:+237696101088",
  whatsappHref: "https://wa.me/237696101088",
  city: "Dschang, Cameroun",
  /*
   * Réseaux sociaux : comptes pas encore créés, les liens ramènent au site.
   * Remplacez "/" par l'URL du compte le jour où il existe.
   */
  socials: [
    { label: "LinkedIn", href: "/" },
    { label: "Facebook", href: "/" },
    { label: "X / Twitter", href: "/" },
  ],
  year: 2026,
};

/**
 * Adresse d'envoi du formulaire de contact.
 * → Créez un formulaire sur https://formspree.io puis définissez la variable
 *   d'environnement NEXT_PUBLIC_FORM_ENDPOINT (fichier .env.local) :
 *   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
 * Tant qu'elle est vide, le formulaire affiche un message invitant à écrire
 * directement par e-mail (aucune demande n'est perdue silencieusement).
 */
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

/* ── Navigation ─────────────────────────────────────────────────────────── */

export const navLinks = [
  { label: "Problème", href: "/#probleme" },
  { label: "Solution", href: "/#solution" },
  { label: "Fonctionnalités", href: "/#fonctionnalites" },
  { label: "Confidentialité", href: "/#confidentialite" },
  { label: "Entretiens", href: "/#entretiens" },
  { label: "FAQ", href: "/#faq" },
];

export const cta = {
  demo: { label: "Demander une démo", href: "/#demo" },
  quote: { label: "Demander un devis", href: "/#devis" },
  how: { label: "Voir comment ça marche", href: "/#solution" },
};

/* ── 1. Hero ────────────────────────────────────────────────────────────── */

/* Slogan : l'IA travaille avec le recruteur, la décision reste humaine. */
export const slogan = "L'IA recrute avec vous.";

export const hero = {
  kicker: "INJARA, le recrutement intelligent",
  titleStart: "L'IA recrute",
  titleHighlight: "avec vous.",
  subtitle:
    "Vous définissez vos postes. INJARA récupère les candidatures dans votre boîte mail, les classe, place les meilleurs profils en tête et sécurise vos entretiens vidéo. Le tout sur votre ordinateur.",
  reassurance: ["Connecté à votre Gmail", "100 % local et chiffré", "Pensé pour les PME camerounaises"],
  // Étiquettes des quatre « grappes » animées autour du titre (ordinateur).
  clusters: {
    inbox: "Candidatures récupérées",
    analysis: "Chaque CV analysé",
    ranking: "Les meilleurs en tête",
    activity: "Suivez vos recrutements",
  },
  illustrationNote: "Illustrations : données d'exemple",
};

/* ── Bandeau défilant sous le hero : le parcours complet en mots-clés ───── */

export const marquee = [
  "Profils de poste sur mesure",
  "Agent IA Gmail",
  "Classement par poste",
  "Score de 0 à 100 %",
  "Potentiel à 12–36 mois",
  "Entretiens vidéo sécurisés",
  "Détection anti-triche",
  "Rapports PDF",
  "100 % local",
  "Données chiffrées",
];

/* ── 2. Problème ────────────────────────────────────────────────────────── */

export const problem = {
  eyebrow: "Le problème",
  title: "Le tri des CV vous coûte du temps et des talents",
  // Phrase révélée mot à mot au défilement.
  statement:
    "Des centaines de CV dans une boîte mail. Des heures de lecture. Et les meilleurs profils, perdus dans la masse.",
  items: [
    {
      icon: "inbox",
      title: "Des centaines de CV par e-mail",
      text: "Les candidatures s'accumulent dans la boîte mail, sans aucun outil pour les trier intelligemment.",
    },
    {
      icon: "clock",
      title: "Un tri manuel long et subjectif",
      text: "Lire chaque CV prend des heures, et les meilleurs profils finissent par se perdre dans la masse.",
    },
    {
      icon: "eyeOff",
      title: "Des entretiens en ligne faussés",
      text: "Second écran, onglets cachés, assistants IA : difficile de savoir qui répond vraiment.",
    },
    {
      icon: "cloud",
      title: "Des solutions inadaptées",
      text: "Les outils existants sont dans le cloud, chers, et peu pensés pour les PME camerounaises.",
    },
  ] satisfies { icon: IconName; title: string; text: string }[],
};

/* ── 3. Solution : comment ça marche (scénario défini par l'équipe) ─────── */

export const solution = {
  eyebrow: "La solution",
  title: "Six étapes, de la boîte mail à la décision",
  intro: "Vous définissez le besoin. INJARA s'occupe du reste, et vous gardez la main à chaque étape.",
  steps: [
    {
      icon: "briefcase",
      visual: "profile",
      verb: "Définissez",
      title: "vos profils de poste",
      text: "Compétences, expérience, formation : décrivez le poste selon vos besoins. INJARA s'adapte à tout type de structure et de métier.",
    },
    {
      icon: "mail",
      visual: "inbox",
      verb: "Récupérez",
      title: "les candidatures automatiquement",
      text: "L'agent IA surveille votre boîte mail (autorisation Google sécurisée) et importe les CV reçus en PDF ou DOCX, directement sur votre ordinateur.",
    },
    {
      icon: "chart",
      visual: "sort",
      verb: "Classez",
      title: "chaque candidature par poste",
      text: "Chaque CV est lu par l'IA et rangé dans le poste auquel le candidat a postulé. Vous pouvez corriger à la main.",
    },
    {
      icon: "trophy",
      visual: "rank",
      verb: "Identifiez",
      title: "les meilleurs profils",
      text: "Pour chaque poste, les candidats sont classés du plus au moins adapté, avec un score de 0 à 100 % et un indicateur de potentiel.",
    },
    {
      icon: "video",
      visual: "interview",
      verb: "Interviewez",
      title: "en vidéo, en toute sécurité",
      text: "Le candidat rejoint par un simple lien web. INJARA enregistre (avec son accord), transcrit et signale les comportements suspects.",
    },
    {
      icon: "fileCheck",
      visual: "report",
      verb: "Décidez",
      title: "avec un rapport complet",
      text: "Score CV, score d'entretien et rapport comportemental réunis dans un PDF par candidat. La décision finale vous appartient.",
    },
  ] satisfies {
    icon: IconName;
    visual: "profile" | "inbox" | "sort" | "rank" | "interview" | "report";
    verb: string;
    title: string;
    text: string;
  }[],
};

/* ── 4. Fonctionnalités (grille « bento ») ──────────────────────────────── */

export const scoreWeights = [
  { label: "Compétences", value: 40 },
  { label: "Expérience", value: 25 },
  { label: "Formation", value: 20 },
  { label: "Adéquation globale", value: 15 },
];

export const potentialLevels = ["Faible", "Moyen", "Élevé", "Exceptionnel"];

/*
 * size : "wide" = 2 colonnes sur ordinateur, "normal" = 1 colonne.
 * tone : "dark" = carte bleu marine mise en avant.
 */
export const features = {
  eyebrow: "Fonctionnalités",
  title: "Tout le recrutement, dans une seule application",
  intro: "De la réception des candidatures jusqu'au rapport final, sans jongler entre plusieurs outils.",
  items: [
    {
      icon: "trophy",
      title: "Classement intelligent par poste",
      text: "Chaque CV est assigné au bon poste puis classé. Le score se lit simplement, critère par critère :",
      extra: "weights",
      size: "wide",
    },
    {
      icon: "mail",
      title: "Agent IA connecté à votre boîte mail",
      text: "Il récupère les CV reçus et vous prévient : « X nouveaux CV récupérés ». Vous choisissez la fréquence.",
      size: "normal",
    },
    {
      icon: "fileText",
      title: "Analyse fine des CV",
      text: "Compétences, expérience, formation, organisations, dates et lieux extraits automatiquement, en français.",
      size: "normal",
    },
    {
      icon: "trendingUp",
      title: "Potentiel à long terme",
      text: "Le potentiel d'évolution à 12–36 mois, justifié en clair : progression, polyvalence, stabilité, leadership.",
      extra: "levels",
      size: "normal",
    },
    {
      icon: "briefcase",
      title: "Profils de poste sur mesure",
      text: "Décrivez n'importe quel poste, dans n'importe quel secteur : INJARA s'adapte à votre structure.",
      size: "normal",
    },
    {
      icon: "video",
      title: "Entretiens vidéo sécurisés",
      text: "Un simple lien web pour le candidat, sans installation. Enregistrement avec son accord, puis transcription automatique.",
      size: "wide",
      tone: "dark",
    },
    {
      icon: "fileCheck",
      title: "Rapports PDF",
      text: "Score CV, score d'entretien et rapport comportemental réunis pour chaque candidat, prêts à archiver ou partager.",
      size: "normal",
    },
  ] satisfies {
    icon: IconName;
    title: string;
    text: string;
    extra?: "weights" | "levels";
    size: "wide" | "normal";
    tone?: "dark";
  }[],
};

/* ── 5. Confidentialité ─────────────────────────────────────────────────── */

export const privacy = {
  eyebrow: "Confidentialité",
  title: "Vos candidats restent chez vous",
  intro:
    "Contrairement aux solutions en ligne, INJARA conserve vos CV et vos analyses sur votre propre ordinateur. Vous gardez le contrôle.",
  items: [
    {
      icon: "laptop",
      title: "Stockage local",
      text: "Les CV et les données des candidats sont stockés sur l'ordinateur du recruteur, pas dans un cloud tiers.",
    },
    {
      icon: "lock",
      title: "Chiffrement sur disque",
      text: "Les CV et les données sont chiffrés : un fichier copié sans autorisation reste illisible.",
    },
    {
      icon: "shield",
      title: "Connexion Gmail par OAuth2",
      text: "Vous autorisez l'accès via Google. Votre mot de passe Gmail n'est jamais stocké par INJARA.",
    },
    {
      icon: "key",
      title: "Mot de passe au démarrage",
      text: "L'application est verrouillée : un mot de passe est demandé à chaque ouverture.",
    },
    {
      icon: "video",
      title: "Enregistrements protégés",
      text: "Les enregistrements d'entretien sont conservés localement, accessibles uniquement au recruteur.",
    },
  ] satisfies { icon: IconName; title: string; text: string }[],
  honestNote:
    "En toute transparence : la récupération des e-mails passe par Google (Gmail), et le candidat accède à l'entretien par un lien web. Ce que INJARA garantit, c'est que vos données de candidats et vos analyses ne sont pas envoyées vers un serveur tiers de stockage.",
};

/* ── 6. Entretiens sécurisés ────────────────────────────────────────────── */

export const interviews = {
  eyebrow: "Entretiens sécurisés",
  title: "Des entretiens vidéo plus fiables",
  intro: "Un entretien simple pour le candidat, des indicateurs utiles pour le recruteur.",
  sides: [
    {
      icon: "briefcase",
      title: "Côté recruteur",
      points: [
        "Vos questions affichées à l'écran pendant l'entretien",
        "Enregistrement avec l'accord du candidat",
        "Transcription automatique des réponses",
        "Score d'entretien calculé à la fin",
      ],
    },
    {
      icon: "users",
      title: "Côté candidat",
      points: [
        "Un simple lien web, reçu par e-mail",
        "Test de la webcam et du micro avant de commencer",
        "Aucune installation nécessaire",
        "Information claire sur l'enregistrement",
      ],
    },
  ] satisfies { icon: IconName; title: string; points: string[] }[],
  blocks: [
    {
      icon: "appWindow",
      title: "Détection d'applications suspectes",
      text: "Un avertissement est affiché avant le début. Pendant l'entretien, INJARA surveille les applications ouvertes et signale si le candidat quitte la fenêtre.",
    },
    {
      icon: "eye",
      title: "Analyse du regard",
      text: "INJARA mesure le temps passé hors écran et le résume simplement, par exemple : « le candidat a regardé à droite 34 % du temps ».",
      extra: "gaze",
    },
    {
      icon: "gauge",
      title: "Score d'entretien",
      text: "Trois critères combinés, puis fusionnés avec le score du CV pour obtenir un score global :",
      extra: "score",
    },
  ] satisfies { icon: IconName; title: string; text: string; extra?: "gaze" | "score" }[],
  interviewWeights: [
    { label: "Contenu des réponses", value: 40 },
    { label: "Comportement", value: 30 },
    { label: "Confiance / élocution", value: 30 },
  ],
};

/* ── 7. Aperçu de l'application ─────────────────────────────────────────── */

export const preview = {
  eyebrow: "Aperçu",
  title: "Un outil clair, pensé pour les recruteurs",
  intro: "Un aperçu des principaux écrans de l'application.",
  notice: "Aperçu illustratif · données fictives",
  tabs: [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "candidate", label: "Fiche candidat" },
    { id: "interview", label: "Salle d'entretien" },
    { id: "report", label: "Rapport PDF" },
    { id: "stats", label: "Statistiques" },
  ],
};

/* ── 8. Pour qui ? ──────────────────────────────────────────────────────── */

export const audience = {
  eyebrow: "Pour qui ?",
  title: "Conçu pour celles et ceux qui recrutent",
  items: [
    {
      icon: "building",
      title: "PME",
      text: "Vous recevez beaucoup de candidatures spontanées et n'avez pas le temps de toutes les lire ? INJARA fait le premier tri pour vous.",
    },
    {
      icon: "briefcase",
      title: "Cabinets de recrutement",
      text: "Vous gérez plusieurs offres à la fois ? Chaque CV est rangé dans la bonne offre, avec un classement prêt à présenter à vos clients.",
    },
    {
      icon: "wrench",
      title: "Équipes RH sans service informatique",
      text: "Installation guidée, aucune compétence technique requise : l'application fonctionne sur un ordinateur de bureau classique.",
    },
  ] satisfies { icon: IconName; title: string; text: string }[],
};

/* ── 10. FAQ ────────────────────────────────────────────────────────────── */

export const faq = {
  eyebrow: "FAQ",
  title: "Questions fréquentes",
  items: [
    {
      q: "Faut-il un serveur ou un abonnement cloud ?",
      a: "Non. INJARA s'installe directement sur l'ordinateur du recruteur. Aucun serveur à louer, aucun abonnement cloud à souscrire.",
    },
    {
      q: "Mes CV sont-ils envoyés à un tiers ?",
      a: "Les CV et les analyses sont stockés localement et chiffrés sur votre ordinateur. La récupération des e-mails passe naturellement par Google (Gmail), et le candidat rejoint l'entretien par un lien web ; en revanche, vos données de candidats ne sont pas envoyées vers un serveur tiers de stockage.",
    },
    {
      q: "Le candidat doit-il installer quelque chose ?",
      a: "Non. Il reçoit un simple lien et rejoint l'entretien depuis son navigateur, après un test rapide de sa webcam et de son micro.",
    },
    {
      q: "L'IA décide-t-elle à ma place ?",
      a: "Non. INJARA propose un classement et des indicateurs pour vous faire gagner du temps. La décision finale reste toujours la vôtre.",
    },
    {
      q: "La détection du regard est-elle fiable à 100 % ?",
      a: "Non, et aucun outil ne peut l'être. C'est un indicateur qui attire votre attention sur un comportement, pas une preuve de triche.",
    },
    {
      q: "Quels formats de CV sont lus ?",
      a: "Les CV au format PDF et DOCX (Word).",
    },
    {
      q: "L'installation est-elle compliquée ?",
      a: "Non. Un installeur guidé et une documentation pas à pas sont fournis, pensés pour des utilisateurs non techniques.",
    },
    {
      q: "Combien ça coûte ?",
      a: "Les tarifs sont communiqués sur demande. Demandez un devis via le formulaire ci-dessous.",
    },
  ],
};

/* ── 11. Contact ────────────────────────────────────────────────────────── */

export const contact = {
  title: "Prêt à trier vos CV intelligemment ?",
  intro:
    "Demandez une démo personnalisée ou un devis adapté à votre volume de candidatures. Nous vous répondons rapidement.",
  volumes: ["Moins de 50", "50 à 200", "200 à 500", "Plus de 500", "Je ne sais pas encore"],
  consent:
    "J'accepte qu'INJARA utilise ces informations pour me recontacter au sujet de ma demande. Elles ne seront ni vendues ni cédées.",
  success: {
    demo: "Merci ! Votre demande de démo a bien été envoyée. Nous revenons vers vous très rapidement.",
    quote: "Merci ! Votre demande de devis a bien été envoyée. Nous revenons vers vous très rapidement.",
  },
};
