import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True when a config string has real content. */
export function isSet(value?: string | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isExternal(href: string) {
  return /^(https?:)?\/\//.test(href);
}
