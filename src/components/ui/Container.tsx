import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/**
 * Conteneur de contenu : largeur max 1440px, marges latérales équivalentes
 * aux colonnes 3 → 23 de la grille 24 colonnes de Webflow.
 */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-[8.333%]", className)} {...props} />;
}
