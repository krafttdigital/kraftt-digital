import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { DynamicIcon } from '@/utils/icons';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/utils/format';
import type { ServiceCategory } from '@/types';

export function ServiceCard({ category, index }: { category: ServiceCategory; index: number }) {
  const { currency } = useCurrency();
  const entryPrice = category.packages[0]?.price;
  const formatted = entryPrice ? formatPrice(entryPrice, currency) : null;

  return (
    <Link
      to={`/services/${category.slug}`}
      className="agency-depth-card agency-glass-dark group relative mb-4 grid grid-cols-[auto_1fr] items-center gap-4 overflow-hidden rounded-[var(--radius-card)] px-5 py-5 hover:border-[var(--color-umber)] md:grid-cols-[auto_1fr_auto] md:gap-5 md:px-6"
    >
      <span className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)]/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      <span className="absolute inset-y-0 left-0 w-1 bg-[var(--color-umber)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

      <span className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-white/10 bg-black/45 text-[var(--color-linen)] shadow-[0_12px_35px_rgba(0,0,0,0.22)]">
        <DynamicIcon name={category.icon} className="w-5 h-5 text-[var(--color-sand)]" />
      </span>

      <span className="min-w-0">
        <span className="flex items-center gap-3">
          <span className="font-sans text-[11px] text-[var(--color-dusk)]/60">{String(index + 1).padStart(2, '0')}</span>
          <span className="font-display text-xl text-[var(--color-linen)] transition-colors group-hover:text-[var(--color-sand)] md:text-2xl" style={{ fontWeight: 300 }}>
            {category.name}
          </span>
        </span>
        <span className="mt-1 block max-w-md font-sans text-sm text-[var(--color-dusk)]">{category.shortSummary}</span>
      </span>

      <span className="col-span-2 flex items-center justify-between gap-3 border-t border-white/10 pt-4 md:col-span-1 md:border-t-0 md:pt-0 md:justify-end md:shrink-0">
        {formatted && (
          <span className="font-sans text-xs text-[var(--color-dusk)]">
            From <span className="font-medium text-[var(--color-linen)]">{formatted}</span>
          </span>
        )}
        <span className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-white/10 bg-white/[0.06] text-[var(--color-dusk)] transition-all duration-300 group-hover:border-[var(--color-umber)] group-hover:text-[var(--color-sand)]">
          <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}
