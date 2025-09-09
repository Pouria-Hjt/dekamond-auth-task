import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const doesUserLoggedIn = () => {
  return typeof window !== "undefined" && !!localStorage.getItem("dm-user")
}