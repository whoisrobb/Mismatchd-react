import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const serverUrl = 'https://mismatchd-react.onrender.com'
// export const serverUrl = 'http://localhost:3000'