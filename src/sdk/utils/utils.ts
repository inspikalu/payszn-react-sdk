import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}