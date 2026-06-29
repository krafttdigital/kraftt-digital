import { motion } from 'framer-motion';
import { CircleDollarSign, IndianRupee } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { useCurrency, type Currency } from '@/context/CurrencyContext';

interface CurrencyToggleProps {
  compact?: boolean;
  className?: string;
}

const currencies: Currency[] = ['USD', 'INR'];

export function CurrencyToggle({ compact = false, className = '' }: CurrencyToggleProps) {
  const { currency, setCurrency } = useCurrency();
  const isUsd = currency === 'USD';

  function nextCurrency() {
    setCurrency(isUsd ? 'INR' : 'USD');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      nextCurrency();
    }
  }

  return (
    <button
      type="button"
      onClick={nextCurrency}
      onKeyDown={handleKeyDown}
      role="switch"
      aria-checked={isUsd}
      aria-label={`Currency: ${currency}. Switch to ${isUsd ? 'INR' : 'USD'}`}
      className={`group relative inline-flex ${compact ? 'h-9 w-[118px]' : 'h-10 w-[128px]'} items-center rounded-full border border-white/12 bg-black/35 p-1 font-sans text-xs text-[var(--color-linen)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--color-umber)] hover:bg-black/45 ${className}`}
    >
      <motion.span
        className="absolute inset-y-1 rounded-full bg-[var(--color-umber)] shadow-[0_10px_26px_rgba(167,127,78,0.32)]"
        initial={false}
        animate={{
          left: isUsd ? 4 : 'calc(50% + 1px)',
          right: isUsd ? 'calc(50% + 1px)' : 4,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        aria-hidden="true"
      />

      {currencies.map((item) => {
        const active = currency === item;
        return (
          <span
            key={item}
            className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full transition-colors duration-300 ${
              active ? 'text-[var(--color-midnight)]' : 'text-[var(--color-linen)]/55 group-hover:text-[var(--color-linen)]/78'
            }`}
          >
            {item === 'USD' ? (
              <CircleDollarSign className={`${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} strokeWidth={1.6} aria-hidden="true" />
            ) : (
              <IndianRupee className={`${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} strokeWidth={1.6} aria-hidden="true" />
            )}
            <span className={compact ? 'text-[10px]' : 'text-[11px]'}>{item}</span>
          </span>
        );
      })}
    </button>
  );
}
