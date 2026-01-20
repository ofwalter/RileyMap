// Utility functions

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Season } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Derive season from collection date
export function getSeasonFromDate(dateString: string): Season {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // 1-12

  if (month >= 3 && month <= 5) return 'Spring';
  if (month >= 6 && month <= 8) return 'Summer';
  if (month >= 9 && month <= 11) return 'Fall';
  return 'Winter';
}

// Clean jar code for display - removes "_to_" range suffix
export function formatJarCode(jarCode: string): string {
  if (!jarCode) return jarCode;
  const toIndex = jarCode.indexOf('_to_');
  if (toIndex !== -1) {
    return jarCode.substring(0, toIndex);
  }
  return jarCode;
}

