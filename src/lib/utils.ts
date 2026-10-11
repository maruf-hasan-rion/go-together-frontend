import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format Date → "Jan 20, 2025"
export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

// Coerce any money-ish value to a finite number. Handles numbers, numeric
// strings, and Decimal values that arrived as raw internals (e.g. Prisma's
// `{ s, e, d }`) so amounts never render as NaN or silently become 0.
export function toNumber(value: unknown): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  if (value && typeof value === "object") {
    const decimal = value as {
      toNumber?: () => number;
      s?: number;
      e?: number;
      d?: number[];
    };
    if (typeof decimal.toNumber === "function") {
      const converted = Number(decimal.toNumber());
      return Number.isFinite(converted) ? converted : 0;
    }
    if (
      typeof decimal.s === "number" &&
      typeof decimal.e === "number" &&
      Array.isArray(decimal.d)
    ) {
      const digits = decimal.d
        .map((n, i) => (i === 0 ? String(n) : String(n).padStart(7, "0")))
        .join("");
      const rebuilt = decimal.s * Number(digits) * 10 ** (decimal.e - (digits.length - 1));
      return Number.isFinite(rebuilt) ? rebuilt : 0;
    }
  }
  return 0;
}

// Format Currency → "$120.00"
export function formatCurrency(amount: number | string | null | undefined) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(toNumber(amount));
}
// Format date & time nicely
export const formatDateTime = (dateStr: string | Date) => {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
// Get initials from full name
export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0].toUpperCase())
    .join("");
};
