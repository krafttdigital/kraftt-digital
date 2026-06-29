import { siteConfig } from '@/config/siteConfig';
import type { AddOn, Billing, Price } from '@/types';

const USD_PER_INR = siteConfig.currency.fallbackUsdPerInr;

const approxUsdFromInr = (inr: number) => Math.round(inr * USD_PER_INR);
const approxInrFromUsd = (usd: number) => Math.round(usd / USD_PER_INR);

/** Both currencies explicitly supplied in the source pricing file. */
export function price(usd: number | null, inr: number | null, billing: Billing = 'one-time'): Price {
  return { usd, inr, billing };
}

/** Add-on priced explicitly in both currencies. */
export function addon(label: string, usd: number, inr: number, billing: Billing = 'one-time'): AddOn {
  return { label, price: { usd, inr, billing } };
}

/** Add-on where only the INR price was supplied — USD is computed from the
 * stable fallback rate (see siteConfig.currency) and flagged as approximate. */
export function addonInrOnly(label: string, inr: number, billing: Billing = 'one-time'): AddOn {
  return { label, price: { usd: approxUsdFromInr(inr), usdApprox: true, inr, billing } };
}

/** Add-on where only the USD price was supplied — INR is computed from the
 * stable fallback rate and flagged as approximate. */
export function addonUsdOnly(label: string, usd: number, billing: Billing = 'one-time'): AddOn {
  return { label, price: { usd, inr: approxInrFromUsd(usd), inrApprox: true, billing } };
}
