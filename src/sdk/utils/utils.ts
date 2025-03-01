import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  // Convert unprefixed classes to prefixed ones
  const prefixedInputs = inputs.map(input => {
    if (typeof input === 'string') {
      return input.split(' ').map(cls => 
        // Don't prefix already prefixed classes or empty strings
        cls && !cls.startsWith('payszn-sdk-') ? `payszn-sdk-${cls}` : cls
      ).join(' ');
    }
    return input;
  });
  
  return twMerge(clsx(prefixedInputs));
}
