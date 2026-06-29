/* eslint-disable react-refresh/only-export-components -- this context module intentionally exports
   the provider and the paired useCurrency hook together. */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { siteConfig } from '@/config/siteConfig';

export type Currency = 'USD' | 'INR';

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

const INDIA_TIME_ZONES = new Set(['Asia/Kolkata', 'Asia/Calcutta']);

function getBrowserDetectedCurrency(): Currency {
  if (typeof window === 'undefined') return siteConfig.currency.default;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (INDIA_TIME_ZONES.has(timeZone)) return 'INR';

  const languages = (navigator.languages?.length ? navigator.languages : [navigator.language]).filter(Boolean);
  const hasIndiaLocale = languages.some((language) => /(^|-)IN$/i.test(language));

  return hasIndiaLocale ? 'INR' : 'USD';
}

function getStoredCurrency(): Currency | null {
  try {
    const stored = window.localStorage.getItem(siteConfig.currency.storageKey);
    return stored === 'INR' || stored === 'USD' ? stored : null;
  } catch {
    return null;
  }
}

function storeCurrency(currency: Currency) {
  try {
    window.localStorage.setItem(siteConfig.currency.storageKey, currency);
  } catch {
    // If storage is blocked, keep the in-memory session preference.
  }
}

function getInitialCurrency(): Currency {
  if (typeof window === 'undefined') return siteConfig.currency.default;

  return getStoredCurrency() ?? getBrowserDetectedCurrency();
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(getInitialCurrency);

  useEffect(() => {
    storeCurrency(currency);
  }, [currency]);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency: setCurrencyState,
      toggleCurrency: () => setCurrencyState((current) => (current === 'USD' ? 'INR' : 'USD')),
    }),
    [currency],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
}
