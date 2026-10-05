import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";
import type { ButtonVariant } from "@/types/content";

const base =
  "inline-flex items-center justify-center rounded-full border text-[0.9375rem] leading-none transition-colors duration-150";

const variants: Record<ButtonVariant, string> = {
  primary: "border-mint-900 bg-mint-900 px-8 py-3 text-white hover:border-mint-950 hover:bg-mint-950",
  blue: "border-cobalt-600 bg-cobalt-600 px-8 py-3 text-white hover:border-cobalt-700 hover:bg-cobalt-700",
  outline:
    "border-evergreen-800 bg-transparent px-8 py-3 text-evergreen-800 hover:bg-evergreen-800 hover:text-white",
  "outline-white": "border-white bg-transparent px-8 py-3 text-white hover:bg-white hover:text-evergreen-800",
  text: "border-0 p-0 text-evergreen-800 underline hover:no-underline",
  "text-green": "border-0 p-0 text-mint-900 underline hover:no-underline",
};

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}
