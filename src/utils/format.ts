import type { Currency, Price } from '@/types';

const formatters: Record<Currency, Intl.NumberFormat> = {
  USD: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }),
  INR: new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }),
};

/**
 * Formats a Price object for the active currency.
 * Returns null only when the package is genuinely unavailable in that
 * currency (e.g. the India-only bundle), so callers can render
 * "Available for Indian clients only" instead of a number.
 */
export function formatPrice(p: Price, currency: Currency): string | null {
  const amount = currency === 'USD' ? p.usd : p.inr;
  if (amount === null) return null;

  const isApprox = currency === 'USD' ? p.usdApprox : p.inrApprox;
  const formatted = formatters[currency].format(amount);
  const suffix = p.billing === 'monthly' ? '/mo' : '';
  return `${isApprox ? '≈ ' : ''}${formatted}${suffix}`;
}

/** Plain number formatter for calculator results (no currency symbol logic needed beyond locale). */
export function formatNumber(value: number, currency: Currency, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits,
  }).format(value);
}

export function formatPlainNumber(value: number, locale: Currency = 'USD'): string {
  return new Intl.NumberFormat(locale === 'INR' ? 'en-IN' : 'en-US', {
    maximumFractionDigits: 1,
  }).format(value);
}
