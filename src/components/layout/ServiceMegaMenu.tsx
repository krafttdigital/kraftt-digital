import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, CircleDollarSign, Sparkles, Zap } from 'lucide-react';
import { serviceCategories } from '@/data/services';
import { DynamicIcon } from '@/utils/icons';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/utils/format';

interface ServiceMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

const menuStats = [
  { value: '8', label: 'service lanes' },
  { value: '24', label: 'fixed packages' },
  { value: '2', label: 'currencies' },
];

export function ServiceMegaMenu({ open, onClose }: ServiceMegaMenuProps) {
  const { currency } = useCurrency();
  const pricingPreview = [
    serviceCategories.find((category) => category.id === 'web')?.packages[0],
    serviceCategories.find((category) => category.id === 'shopify')?.packages[0],
    serviceCategories.find((category) => category.id === 'brand')?.packages[1],
  ].filter(Boolean);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: '-50%', y: -8, scale: 0.985 }}
          animate={{ opacity: 1, x: '-50%', y: 0, scale: 1 }}
          exit={{ opacity: 0, x: '-50%', y: -8, scale: 0.985 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-[calc(100%+10px)] w-[min(1180px,calc(100vw-2rem))] overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-[#050607]/95 shadow-[0_36px_130px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
          onMouseLeave={onClose}
        >
          <div className="absolute inset-0 kd-hero-grid opacity-12" aria-hidden="true" />
          <div className="relative grid max-h-[calc(100vh-110px)] gap-4 overflow-y-auto p-4 lg:grid-cols-[260px_minmax(0,1fr)_290px]">
            <section className="agency-glass-dark rounded-[var(--radius-card)] p-5">
              <span className="inline-flex items-center gap-2 rounded-[6px] border border-white/10 bg-white/[0.06] px-3 py-2 font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--color-sand)]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Service OS
              </span>
              <h2 className="mt-5 font-display text-2xl leading-tight text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
                Pick the lane. Stack the system.
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-dusk)]">
                Browse the agency catalog by outcome: launch a site, build commerce, sharpen the brand, or grow what already exists.
              </p>
              <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-[8px] border border-white/10 bg-black/30">
                {menuStats.map((stat) => (
                  <div key={stat.label} className="border-r border-white/10 px-3 py-3 last:border-r-0">
                    <span className="block font-display text-xl text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
                      {stat.value}
                    </span>
                    <span className="mt-1 block font-sans text-[8px] uppercase leading-tight tracking-[0.12em] text-[var(--color-dusk)]">{stat.label}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/services"
                onClick={onClose}
                className="agency-magnetic mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-umber)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-midnight)] hover:bg-[var(--color-sand)]"
              >
                View all services <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>

            <section className="grid gap-2 sm:grid-cols-2">
              {serviceCategories.map((cat, index) => {
                const firstPackage = cat.packages[0];
                return (
                  <motion.div
                    key={cat.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, delay: index * 0.018, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={`/services/${cat.slug}`}
                      onClick={onClose}
                      className="agency-depth-card group flex h-full gap-3 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.045] p-3 hover:border-[var(--color-umber)] hover:bg-white/[0.075]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-white/10 bg-black/35 text-[var(--color-sand)]">
                        <DynamicIcon name={cat.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-display text-lg leading-tight text-[var(--color-linen)] transition-colors group-hover:text-[var(--color-sand)]" style={{ fontWeight: 300 }}>
                            {cat.name}
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[var(--color-dusk)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-umber)]" aria-hidden="true" />
                        </span>
                        <span className="mt-1 block font-sans text-[11px] leading-relaxed text-[var(--color-dusk)]">{cat.shortSummary}</span>
                        <span className="mt-2 flex items-center gap-1.5 font-sans text-[10px] text-[var(--color-linen)]/70">
                          <BadgeCheck className="h-3 w-3 text-[var(--color-signal)]" aria-hidden="true" />
                          Starts with {firstPackage.name}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </section>

            <section className="agency-glass-dark rounded-[var(--radius-card)] p-5">
              <span className="inline-flex items-center gap-2 rounded-[6px] border border-white/10 bg-black/25 px-3 py-2 font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--color-sand)]">
                <CircleDollarSign className="h-3.5 w-3.5" aria-hidden="true" />
                Pricing menu
              </span>
              <h3 className="mt-5 font-display text-2xl leading-tight text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
                Start with a fixed package.
              </h3>
              <p className="mt-2 font-sans text-xs leading-relaxed text-[var(--color-dusk)]">
                Live prices follow your USD/INR switch. Every package has fixed scope, timeline, and deliverables.
              </p>

              <div className="mt-5 space-y-2.5">
                {pricingPreview.map((pkg) => {
                  if (!pkg) return null;
                  const formatted = formatPrice(pkg.price, currency);
                  return (
                    <Link
                      key={pkg.id}
                      to="/services"
                      onClick={onClose}
                      className="group/pricing block rounded-[8px] border border-white/10 bg-black/25 p-3 transition-all hover:border-[var(--color-umber)] hover:bg-white/[0.065]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-sans text-xs text-[var(--color-linen)]">{pkg.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[var(--color-dusk)] transition-transform group-hover/pricing:translate-x-0.5 group-hover/pricing:-translate-y-0.5 group-hover/pricing:text-[var(--color-umber)]" aria-hidden="true" />
                      </div>
                      <div className="mt-2 flex items-end justify-between gap-3">
                        <span className="font-display text-xl text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
                          {formatted ?? 'India only'}
                        </span>
                        <span className="rounded-[5px] bg-white/[0.06] px-2 py-1 font-sans text-[9px] uppercase tracking-[0.14em] text-[var(--color-dusk)]">
                          {pkg.badge}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-5 rounded-[8px] border border-white/10 bg-white/[0.045] p-3">
                <span className="inline-flex items-start gap-2 font-sans text-[11px] leading-relaxed text-[var(--color-dusk)]">
                  <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-signal)]" aria-hidden="true" />
                  Bundle web, brand, content, SEO, social, and internal tools into one delivery path.
                </span>
              </div>

              <Link
                to="/contact"
                onClick={onClose}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border border-white/10 bg-white/[0.06] px-4 py-3 font-sans text-xs font-medium text-[var(--color-linen)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-umber)] hover:text-[var(--color-sand)]"
              >
                Scope a bundle <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
