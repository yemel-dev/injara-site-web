export type Link = {
  label: string;
  href: string;
};

export type NavColumn = {
  heading: string;
  links: Link[];
  /** Petit format (texte sans-serif) au lieu des grands liens serif. */
  compact?: boolean;
  /** Second groupe affiché sous le premier, dans la même colonne. */
  secondary?: { heading: string; links: Link[] };
};

export type NavTopic = Link & { image: string; alt: string };

export type NavFeatured = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  cta: Link;
};

export type NavMenu = {
  id: string;
  label: string;
  columns: NavColumn[];
  topics?: { heading: string; items: NavTopic[] };
  featured?: NavFeatured;
};

export type NavItem = NavMenu | (Link & { columns?: undefined });

export type ButtonVariant =
  | "primary"
  | "blue"
  | "outline"
  | "outline-white"
  | "text"
  | "text-green";

export type GalleryItem = {
  title: string;
  description: string;
  image: string;
  alt: string;
  cta: Link;
};

export type CustomerLogo = {
  name: string;
  logo: string;
  href?: string;
};
