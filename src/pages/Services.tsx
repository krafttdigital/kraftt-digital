import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, MoveRight, PhoneCall, Sparkles } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { useCurrency } from '@/context/CurrencyContext';
import { buildContactPrefillPath } from '@/utils/contactPrefill';
import { formatPrice } from '@/utils/format';
import { DynamicIcon } from '@/utils/icons';
import { serviceCategories } from '@/data/services';
import { bundles } from '@/data/bundles';

export default function Services() {
  const { currency } = useCurrency();
  const [activeCategoryId, setActiveCategoryId] = useState(serviceCategories[0].id);

  const activeCategory = serviceCategories.find((category) => category.id === activeCategoryId) ?? serviceCategories[0];

  return (
    <>
      <SEO
        title="Services & Pricing - Web, Shopify, Brand, SEO & More"
        description="All Kraftt Digital service categories with exact INR/USD pricing: web design, Shopify development, SEO, content, dashboards, AI creative, brand identity and social media management."
        path="/services"
      />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Services', path: '/services' }])} />

      <PageHero
        breadcrumbs={[{ name: 'Services', path: '/services' }]}
        eyebrow="Services & pricing"
        title={<>Prices that make sense for serious digital work.</>}
        description="Choose a service lane, compare the three package tiers, and see exactly what is included before you ever book a call."
        visual="services"
        stats={[
          { value: '8', label: 'service lanes' },
          { value: '24', label: 'packages' },
          { value: '2', label: 'currencies' },
        ]}
      />

      <section className="overflow-hidden py-14 md:py-20">
        <div className="container-kd">
          <Reveal>
            <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 text-center">
              <span className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-white/10 bg-white/[0.07] px-3 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-[var(--color-sand)] backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Pricing
              </span>
              <div className="flex max-w-full flex-col gap-2">
                <h2 className="max-w-full text-balance font-display text-3xl leading-tight text-[var(--color-linen)] md:text-4xl" style={{ fontWeight: 300 }}>
                  <span className="block sm:inline">Pick a service.</span>{' '}
                  <span className="block sm:inline">Compare the packages.</span>
                </h2>
                <p className="mx-auto w-full max-w-[320px] font-sans text-sm leading-relaxed text-[var(--color-dusk)] sm:max-w-xl sm:text-[15px]">
                  <span className="block sm:inline">Every category has a starter, growth,</span>{' '}
                  <span className="block sm:inline">and premium path with exact scope,</span>{' '}
                  <span className="block sm:inline">timelines, and add-ons.</span>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-8 lg:hidden">
            <div className="agency-glass-dark rounded-[var(--radius-card)] border border-white/10 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.06] text-[var(--color-sand)]">
                  <DynamicIcon name={activeCategory.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-sand)]">Service line</p>
                  <label htmlFor="mobile-service-category" className="sr-only">
                    Choose a service category
                  </label>
                  <select
                    id="mobile-service-category"
                    value={activeCategory.id}
                    onChange={(event) => setActiveCategoryId(event.target.value)}
                    className="mt-1 w-full rounded-[7px] border border-white/10 bg-black/35 px-3 py-2 font-sans text-sm font-medium text-[var(--color-linen)] outline-none transition-colors focus:border-[var(--color-umber)]"
                  >
                    {serviceCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 font-sans text-xs leading-relaxed text-[var(--color-dusk)]">
                {activeCategory.shortSummary}
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid min-w-0 gap-6 lg:mt-12 lg:grid-cols-[minmax(240px,25%)_minmax(0,1fr)] lg:items-start">
            <Reveal delay={0.08} className="hidden min-w-0 lg:block">
              <aside className="lg:sticky lg:top-28">
                <div className="agency-glass-dark overflow-hidden rounded-[var(--radius-card)] border border-white/10 shadow-[0_24px_90px_rgba(0,0,0,0.26)]">
                  <div className="border-b border-white/10 bg-black/25 px-5 py-4 text-[var(--color-linen)]">
                    <p className="eyebrow text-[var(--color-sand)]">Service line</p>
                    <h3 className="mt-2 font-display text-xl" style={{ fontWeight: 300 }}>
                      Choose one
                    </h3>
                  </div>
                  <div className="max-h-[70vh] overflow-y-auto bg-black/10 p-2">
                    {serviceCategories.map((category, index) => {
                      const active = category.id === activeCategory.id;
                      return (
                        <motion.button
                          key={category.id}
                          type="button"
                          onClick={() => setActiveCategoryId(category.id)}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.32, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
                          className={`group relative flex w-full items-start gap-3 rounded-[8px] px-3 py-2.5 text-left transition-all duration-300 ${
                            active
                              ? 'bg-white/[0.09] text-[var(--color-linen)] shadow-[0_14px_45px_rgba(0,0,0,0.22)] ring-1 ring-white/10'
                              : 'text-[var(--color-dusk)] hover:bg-white/[0.055] hover:text-[var(--color-linen)]'
                          }`}
                        >
                          <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] transition-transform duration-300 group-hover:scale-105 ${active ? 'bg-[var(--color-umber)]/18 text-[var(--color-sand)]' : 'bg-white/[0.06] text-[var(--color-sand)]'}`}>
                            <DynamicIcon name={category.icon} className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-sans text-[10px] uppercase tracking-[0.14em] opacity-45">0{index + 1}</span>
                            <span className="mt-0.5 block font-sans text-sm font-medium leading-snug">
                              {category.name}
                            </span>
                            <span className={`mt-1 block font-sans text-[11px] leading-relaxed ${active ? 'text-[var(--color-dusk)]' : 'text-[var(--color-dusk)]/70'}`}>
                              {category.packages.length} packages
                            </span>
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </aside>
            </Reveal>

            <Reveal delay={0.12} className="min-w-0">
              <PricingMatrix category={activeCategory} currency={currency} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="agency-section-light py-20 md:py-28">
        <div className="container-kd">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="eyebrow mb-4 text-[var(--color-midnight)]">Bundles</p>
                <h2 className="font-display text-3xl leading-tight text-[var(--color-midnight)] md:text-5xl" style={{ fontWeight: 300 }}>
                  Combine services into one launch system.
                </h2>
              </div>
              <p className="font-sans text-sm leading-relaxed text-[var(--color-graphite)]">
                Bundles pull together more than one service category at one combined price. Use these when the project needs web, brand, content, SEO, or social working together from day one.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {bundles.map((bundle, index) => {
              const formatted = formatPrice(bundle.price, currency);
              return (
                <Reveal key={bundle.id} delay={index * 0.06} className="agency-glass-light group relative overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.055] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-umber)]">
                  <div className="absolute inset-0 kd-hero-grid opacity-15" aria-hidden="true" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.06] text-[var(--color-umber)]">
                      <Sparkles className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-display text-3xl text-[var(--color-umber)]" style={{ fontWeight: 300 }}>
                      {formatted ?? 'India only'}
                    </span>
                  </div>
                  <h3 className="relative mt-5 font-display text-2xl text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                    {bundle.name}
                  </h3>
                  <p className="relative mt-2 font-sans text-sm leading-relaxed text-[var(--color-umber)]">{bundle.description}</p>
                  <ul className="relative mt-5 grid gap-2 sm:grid-cols-2">
                    {bundle.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 font-sans text-[13px] text-[var(--color-forest)]/75">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-forest)]" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="relative mt-6 inline-flex items-center gap-2 font-sans text-xs text-[var(--color-midnight)] hover:text-[var(--color-sand)]">
                    Enquire about this bundle <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Not sure which package fits?"
        title="Tell us the project. We'll point to the right package."
        description="Most enquiries fit a standard package exactly. Anything outside that scope is quoted individually - no guesswork on your side."
      />
    </>
  );
}

function PricingMatrix({
  category,
  currency,
}: {
  category: (typeof serviceCategories)[number];
  currency: 'USD' | 'INR';
}) {
  return (
    <div className="agency-glass-dark w-full min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-white/10 shadow-[0_28px_100px_rgba(0,0,0,0.3)]">
      <div className="border-b border-white/10 text-[var(--color-linen)]">
        <div className="relative overflow-hidden p-5 lg:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(184,139,84,0.15),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.018))]" aria-hidden="true" />
          <div className="absolute inset-0 kd-hero-grid opacity-10" aria-hidden="true" />
          <div className="relative grid gap-5  xl:items-stretch">
            <div className="grid gap-4  md:items-start">
              <motion.div
                className="flex items-center gap-3 text-[var(--color-sand)]"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[9px] border border-white/10 bg-white/[0.06]">
                  <DynamicIcon name={category.icon} className="h-5 w-5" />
                </div>

                <p
                  className="font-display text-lg md:text-xl leading-none text-[var(--color-sand)]"
                  style={{ fontWeight: 500 }}
                >
                  {category.name}
                </p>
              </motion.div>
              <div>
                
                <h3 className="mt-2 max-w-3xl font-display text-2xl leading-snug text-[var(--color-linen)] md:text-3xl" style={{ fontWeight: 300 }}>
                  Compare packages built for this service.
                </h3>
                <p className="mt-3  font-sans text-sm leading-relaxed text-[var(--color-dusk)]">{category.heroSummary}</p>
              </div>
              <div className="mb-5 grid w-full min-w-0 gap-2 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_auto]">
                {[
                  { label: 'Solves', value: category.problemsSolved[0] },
                  { label: 'Best for', value: category.idealClients[0] },
                  { label: 'Ships with', value: category.deliverables[0] },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="min-w-0 rounded-[8px] border border-white/10 bg-white/[0.055] p-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.38,
                      delay: index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-sand)]">
                      {item.label}
                    </span>

                    <p className="mt-1.5 line-clamp-2 font-sans text-[12px] leading-relaxed text-[var(--color-dusk)]">
                      {item.value}
                    </p>
                  </motion.div>
                ))}

                <Link
                  to={`/services/${category.slug}`}
                  className="inline-flex min-w-0 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-white/15 bg-white/[0.06] px-3 py-2 font-sans text-xs text-[var(--color-linen)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-umber)] hover:text-[var(--color-sand)] sm:col-span-2 xl:col-span-1 xl:whitespace-nowrap"
                >
                  Full details
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>            
          </div>
        </div>

        <div className="grid grid-cols-1 border-t border-white/10 lg:grid-cols-3">
        {category.packages.map((pkg) => {
          const formatted = formatPrice(pkg.price, currency);
          return (
            <div
              key={pkg.id}
              className={`group/package flex flex-col border-t border-white/10 p-5 first:border-t-0 transition-colors duration-300 hover:bg-white/[0.09] lg:border-l lg:border-t-0 lg:first:border-l-0 lg:p-6 ${
                pkg.featured ? 'bg-white/[0.075]' : 'bg-white/[0.025]'
              }`}
            >
              <div className="flex min-h-[235px] flex-col">
                <div className="flex min-h-[112px] items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xl leading-snug text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
                      {pkg.name}
                    </p>
                    <p className="mt-2 font-sans text-[13px] leading-relaxed text-[var(--color-dusk)]">
                      {pkg.badge} package for {category.name.toLowerCase()}.
                    </p>
                  </div>
                  {pkg.featured && (
                    <span className="rounded-[6px] bg-[var(--color-umber)] px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-[var(--color-midnight)]">
                      Popular
                    </span>
                  )}
                </div>

                <p className="mt-auto flex flex-col gap-1 pt-4 text-lg lg:flex-row lg:items-end lg:gap-2">
                  <span className="font-display text-3xl text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
                    {formatted ?? 'India only'}
                  </span>
                  <span className="pb-1 font-sans text-sm text-[var(--color-dusk)]">{pkg.delivery.toLowerCase().includes('monthly') ? '/ month' : 'fixed'}</span>
                </p>

                <Button to={buildContactPrefillPath(category, pkg, currency)} variant={pkg.featured ? 'primary' : 'secondary'} className={`mt-4 w-full gap-3 py-2.5 text-xs ${pkg.featured ? '' : 'border-white/20 bg-transparent text-[var(--color-linen)] hover:border-[var(--color-umber)] hover:text-[var(--color-sand)]'}`}>
                  {pkg.featured ? 'Start here' : pkg.badge === 'Premium' ? 'Contact us' : 'Try it'}
                  {pkg.badge === 'Premium' ? <PhoneCall className="h-4 w-4" aria-hidden="true" /> : <MoveRight className="h-4 w-4" aria-hidden="true" />}
                </Button>
              </div>

              <div className="mt-5 flex flex-1 flex-col border-t border-white/10 pt-5">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-sand)]">Included features</p>
                <ul className="mt-3 space-y-2.5">
                  {pkg.includes.map((feature) => (
                    <li key={feature} className="font-sans text-[13px] leading-relaxed text-[var(--color-linen)]/72">
                      {feature}
                    </li>
                  ))}
                </ul>
                {pkg.addons.length > 0 && (
                  <div className="mt-auto pt-5">
                    <div className="min-h-[112px] rounded-[8px] border border-white/10 bg-black/25 p-4">
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-dusk)]">Available add-ons</p>
                      <ul className="mt-2 space-y-1.5">
                        {pkg.addons.map((addon) => {
                          const addonPrice = formatPrice(addon.price, currency);
                          return (
                            <li key={addon.label} className="font-sans text-[12px] leading-relaxed text-[var(--color-dusk)]">
                              {addon.label}
                              {addonPrice ? <span className="text-[var(--color-sand)]"> +{addonPrice}</span> : null}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
