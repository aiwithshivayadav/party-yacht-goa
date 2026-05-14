import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// ─── Code Generators ────────────────────────────────────────
export function generateLeadCode(): string {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `PYG-L-${n}`;
}

export function generateBookingCode(): string {
  const year = new Date().getFullYear();
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `PYG-B-${year}-${n}`;
}

export function generateInvoiceCode(): string {
  const year = new Date().getFullYear();
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `PYG-INV-${year}-${n}`;
}

export function generatePaymentCode(): string {
  const n = Math.floor(Math.random() * 900000) + 100000;
  return `PYG-P-${n}`;
}

// ─── Formatters ─────────────────────────────────────────────
export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function timeAgo(date: Date | string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

// ─── Add-on Prices ──────────────────────────────────────────
export const ADDON_PRICES: Record<string, number> = {
  decoration: 3500,
  dj: 8000,
  cake: 1500,
  fireworks: 12000,
  photographer: 6000,
  "food-drinks": 4000,
};

export const ADDON_LABELS: Record<string, string> = {
  decoration: "Decoration",
  dj: "DJ",
  cake: "Cake",
  fireworks: "Fireworks",
  photographer: "Photographer",
  "food-drinks": "Food & Drinks",
};

export function calculateAddonsPrice(addons: string[]): number {
  return addons.reduce((sum, addon) => sum + (ADDON_PRICES[addon] || 0), 0);
}

// ─── Status Colors ───────────────────────────────────────────
export const LEAD_STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  NEW:       { bg: "rgba(59,130,246,0.15)",  text: "#60a5fa",  border: "rgba(59,130,246,0.3)" },
  CONTACTED: { bg: "rgba(168,85,247,0.15)",  text: "#c084fc",  border: "rgba(168,85,247,0.3)" },
  FOLLOW_UP: { bg: "rgba(245,158,11,0.15)",  text: "#fbbf24",  border: "rgba(245,158,11,0.3)" },
  QUOTED:    { bg: "rgba(6,182,212,0.15)",   text: "#22d3ee",  border: "rgba(6,182,212,0.3)" },
  CONFIRMED: { bg: "rgba(16,185,129,0.15)",  text: "#34d399",  border: "rgba(16,185,129,0.3)" },
  CANCELLED: { bg: "rgba(239,68,68,0.15)",   text: "#f87171",  border: "rgba(239,68,68,0.3)" },
  LOST:      { bg: "rgba(100,116,139,0.15)", text: "#94a3b8",  border: "rgba(100,116,139,0.3)" },
};

export const BOOKING_STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  PENDING:     { bg: "rgba(245,158,11,0.15)",  text: "#fbbf24",  border: "rgba(245,158,11,0.3)" },
  CONFIRMED:   { bg: "rgba(16,185,129,0.15)",  text: "#34d399",  border: "rgba(16,185,129,0.3)" },
  CANCELLED:   { bg: "rgba(239,68,68,0.15)",   text: "#f87171",  border: "rgba(239,68,68,0.3)" },
  COMPLETED:   { bg: "rgba(59,130,246,0.15)",  text: "#60a5fa",  border: "rgba(59,130,246,0.3)" },
  NO_SHOW:     { bg: "rgba(239,68,68,0.15)",   text: "#f87171",  border: "rgba(239,68,68,0.3)" },
  RESCHEDULED: { bg: "rgba(168,85,247,0.15)",  text: "#c084fc",  border: "rgba(168,85,247,0.3)" },
};

export const PAYMENT_STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  PENDING:  { bg: "rgba(245,158,11,0.15)",  text: "#fbbf24",  border: "rgba(245,158,11,0.3)" },
  PARTIAL:  { bg: "rgba(6,182,212,0.15)",   text: "#22d3ee",  border: "rgba(6,182,212,0.3)" },
  PAID:     { bg: "rgba(16,185,129,0.15)",  text: "#34d399",  border: "rgba(16,185,129,0.3)" },
  REFUNDED: { bg: "rgba(168,85,247,0.15)",  text: "#c084fc",  border: "rgba(168,85,247,0.3)" },
  FAILED:   { bg: "rgba(239,68,68,0.15)",   text: "#f87171",  border: "rgba(239,68,68,0.3)" },
};

export const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  SUPER_ADMIN: { bg: "rgba(201,169,110,0.15)", text: "#c9a96e" },
  ADMIN:       { bg: "rgba(201,169,110,0.12)", text: "#c9a96e" },
  SALES:       { bg: "rgba(59,130,246,0.15)",  text: "#60a5fa" },
  OPERATIONS:  { bg: "rgba(16,185,129,0.15)",  text: "#34d399" },
  ACCOUNTANT:  { bg: "rgba(168,85,247,0.15)",  text: "#c084fc" },
  CUSTOMER:    { bg: "rgba(100,116,139,0.15)", text: "#94a3b8" },
};
