import { ArrowUpRight, Check, Clock, Plus, Sparkles } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { buildContactPrefillPath } from '@/utils/contactPrefill';
import { formatPrice } from '@/utils/format';
import type { ServiceCategory, ServicePackage } from '@/types';
import { Button } from './Button';

const badgeStyles: Record<ServicePackage['badge'], string> = {
  'Entry level': 'border border-white/10 bg-white/[0.06] text-[var(--color-dusk)]',
  'Most popular': 'bg-[var(--color-umber)] text-[var(--color-midnight)]',
  Premium: 'border border-[var(--color-umber)]/35 bg-[var(--color-umber)]/14 text-[var(--color-sand)]',
};

export function PricingCard({ pkg, ctaPath = '/contact', category }: { pkg: ServicePackage; ctaPath?: string; category?: ServiceCategory }) {
  const { currency } = useCurrency();
  const formatted = formatPrice(pkg.price, currency);
  const targetPath = category ? buildContactPrefillPath(category, pkg, currency) : ctaPath;

  return (
    <div
      className={`agency-glass-dark  relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_86px_rgba(0,0,0,0.28)] ${
        pkg.featured ? 'border-[var(--color-umber)] shadow-[0_20px_70px_rgba(167,127,78,0.2)]' : 'border-white/10'
      }`}
    >
      <span
        className={`absolute inset-x-0 top-0 h-1 ${
          pkg.featured ? 'bg-[var(--color-umber)]' : 'bg-gradient-to-r from-[var(--color-cyan)] via-[var(--color-signal)] to-[var(--color-coral)] opacity-45'
        }`}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-4">
        <span className={`self-start text-[11px] font-medium px-2.5 py-1 rounded-full ${badgeStyles[pkg.badge]}`}>{pkg.badge}</span>
        {pkg.featured && (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] bg-[var(--color-umber)]/16 text-[var(--color-sand)]">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          </span>
        )}
      </div>

      <h3 className="mt-5 font-display text-2xl text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
        {pkg.name}
      </h3>

      <div className="mt-4 mb-1 min-h-[2.5rem] flex items-baseline">
        {formatted ? (
          <span className="font-display text-4xl text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
            {formatted}
          </span>
        ) : (
          <span className="font-sans text-sm text-[var(--color-dusk)]">Available for Indian clients only</span>
        )}
      </div>

      <div className="my-6 h-px bg-white/10" />

      <ul className="space-y-2.5 flex-1">
        {pkg.includes.map((inc) => (
          <li key={inc} className="flex items-start gap-2 font-sans text-[13px] text-[var(--color-linen)]/76 leading-relaxed">
            <Check className="w-3.5 h-3.5 text-[var(--color-signal)] mt-0.5 shrink-0" aria-hidden="true" />
            <span>{inc}</span>
          </li>
        ))}
        {pkg.addons.map((a) => {
          const addonFormatted = formatPrice(a.price, currency);
          return (
            <li key={a.label} className="flex items-start gap-2 font-sans text-[13px] text-[var(--color-sand)] leading-relaxed">
              <Plus className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                {a.label} {addonFormatted && <span className="opacity-80">(+{addonFormatted})</span>}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 flex items-center gap-1.5 rounded-[6px] border border-white/10 bg-black/25 px-3 py-2 font-sans text-xs text-[var(--color-dusk)]">
        <Clock className="w-3.5 h-3.5 text-[var(--color-umber)]" aria-hidden="true" /> {pkg.delivery}
      </p>

      <Button
        to={targetPath}
        variant={pkg.featured ? 'primary' : 'secondary'}
        className={`mt-6 w-full ${pkg.featured ? '' : 'border-white/20 bg-transparent text-[var(--color-linen)] hover:border-[var(--color-umber)] hover:text-[var(--color-sand)]'}`}
      >
        Enquire about this package <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
