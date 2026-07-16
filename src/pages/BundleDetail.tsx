import { Link, Navigate, useParams } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ArrowUpRight, BadgeCheck, Check, Clock3, Layers3, MessageCircle, PackageCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildFaqSchema, buildServiceSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTASection } from '@/components/ui/CTASection';
import { useCurrency } from '@/context/CurrencyContext';
import { siteConfig } from '@/config/siteConfig';
import { getBundleBySlug } from '@/data/bundles';
import { serviceCategories } from '@/data/services';
import { buildBundleContactPrefillPath } from '@/utils/contactPrefill';
import { formatPrice } from '@/utils/format';
import { DynamicIcon } from '@/utils/icons';

function whatsappHref(bundleName: string) {
  const message = `Hi Kraftt Digital, I am interested in the ${bundleName} bundle. Please share the next steps.`;
  return `https://wa.me/91${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export default function BundleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { currency } = useCurrency();
  const bundle = slug ? getBundleBySlug(slug) : undefined;

  if (!bundle) return <Navigate to="/404" replace />;

  const bundlePath = `/services/bundles/${bundle.slug}`;
  const contactPath = buildBundleContactPrefillPath(bundle, currency);
  const formattedPrice = formatPrice(bundle.price, currency) ?? 'India only';
  const includedServices = bundle.serviceSlugs
    .map((serviceSlug) => serviceCategories.find((category) => category.slug === serviceSlug))
    .filter((category): category is (typeof serviceCategories)[number] => Boolean(category));

  return (
    <>
      <SEO title={`${bundle.name} Bundle`} description={bundle.heroSummary} path={bundlePath} />
      <JsonLd
        data={[
          buildServiceSchema({
            name: `${bundle.name} bundle`,
            description: bundle.heroSummary,
            path: bundlePath,
            offers: [{ name: bundle.name, priceUsd: bundle.price.usd, priceInr: bundle.price.inr }],
          }),
          buildFaqSchema(bundle.faqs),
        ]}
      />

      <header className="relative overflow-hidden bg-[var(--color-parchment)] pt-[118px] pb-14 text-[var(--color-midnight)] md:pt-[138px] md:pb-20">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-20" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--color-bg-secondary)]" aria-hidden="true" />

        <div className="container-kd relative z-10">
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }, { name: bundle.name, path: bundlePath }]} />

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-stretch">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-4 py-2 font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--color-umber)] shadow-[0_14px_42px_rgba(13,13,13,0.06)]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {bundle.eyebrow}
              </span>
              <h1 className="mt-6 max-w-4xl text-balance font-display text-[42px] leading-[1.02] md:text-[68px]" style={{ fontWeight: 300 }}>
                {bundle.heroSummary}
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
                {bundle.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={contactPath}
                  className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-parchment)] shadow-[0_16px_42px_rgba(13,13,13,0.16)] hover:bg-[var(--color-umber)]"
                >
                  Enquire for this bundle
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={whatsappHref(bundle.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]"
                >
                  Ask on WhatsApp
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <aside className="h-full rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5 shadow-[0_28px_90px_rgba(13,13,13,0.1)]">
                <p className="eyebrow text-[var(--color-umber)]">Bundle snapshot</p>
                <div className="mt-5 grid gap-3">
                  <Snapshot label="Investment" value={formattedPrice} icon={<PackageCheck className="h-4 w-4" aria-hidden="true" />} />
                  <Snapshot label="Timeline" value={bundle.timeline} icon={<Clock3 className="h-4 w-4" aria-hidden="true" />} />
                  <Snapshot label="Service stack" value={`${includedServices.length} connected services`} icon={<Layers3 className="h-4 w-4" aria-hidden="true" />} />
                </div>
                <div className="mt-5 rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-parchment)] p-4">
                  <p className="flex items-center gap-2 font-sans text-sm font-medium text-[var(--color-midnight)]">
                    <ShieldCheck className="h-4 w-4 text-[var(--color-umber)]" aria-hidden="true" />
                    One proposal, connected delivery
                  </p>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-[var(--color-text-secondary)]">
                    Bundle scope is confirmed before kickoff so each service supports the same launch goal.
                  </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow">Bundle fit</p>
            <h2 className="mt-4 text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              Built for businesses that need multiple pieces to move together.
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {bundle.bestFor.map((item, index) => (
              <Reveal key={item} delay={index * 0.05} className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5">
                <BadgeCheck className="h-5 w-5 text-[var(--color-umber)]" aria-hidden="true" />
                <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="agency-section-dark py-16 md:py-24">
        <div className="container-kd">
          <SectionHeading eyebrow="Included services" title="The service stack inside this bundle." description="Each item links back to the full service page, so the bundle still feels transparent and easy to compare." light />
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {includedServices.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group block h-full rounded-[var(--radius-card)] border border-white/10 bg-white/[0.045] p-5 transition-colors hover:border-[var(--color-umber)] hover:bg-white/[0.075]"
                >
                  <DynamicIcon name={service.icon} className="h-5 w-5 text-[var(--color-sand)]" />
                  <h3 className="mt-4 font-display text-2xl leading-tight text-[var(--color-linen)] transition-colors group-hover:text-[var(--color-sand)]" style={{ fontWeight: 300 }}>
                    {service.name}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-text-muted-on-dark)]">{service.shortSummary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-sans text-xs font-medium text-[var(--color-sand)]">
                    View service <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="What is included" title="Clear bundle inclusions." description="These are the main package components. The exact upgraded or adjusted scope is confirmed in the proposal before work starts." />
            <ul className="mt-7 grid gap-3">
              {bundle.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-4 font-sans text-sm text-[var(--color-text-secondary)]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-umber)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <SectionHeading eyebrow="Expected outcomes" title="What the bundle should improve." />
            <div className="mt-7 grid gap-3">
              {bundle.outcomes.map((item) => (
                <div key={item} className="rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5">
                  <Sparkles className="h-4 w-4 text-[var(--color-umber)]" aria-hidden="true" />
                  <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="agency-section-dark py-16 md:py-24">
        <div className="container-kd grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionHeading eyebrow="Delivery rhythm" title="How the bundle moves from scope to launch." light />
          <div className="grid gap-4">
            {bundle.process.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.04}>
                <div className="grid gap-4 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.045] p-5 sm:grid-cols-[80px_1fr]">
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--color-sand)]">Step {String(index + 1).padStart(2, '0')}</p>
                  <div>
                    <h3 className="font-display text-2xl leading-tight text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
                      {step.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--color-text-muted-on-dark)]">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd max-w-3xl">
          <SectionHeading eyebrow="Bundle questions" title="Frequently asked before starting." />
          <div className="mt-8">
            <FAQAccordion items={bundle.faqs} />
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Scope the bundle"
        title={<>Ready to combine the right services?</>}
        description="Send the bundle enquiry and Kraftt will confirm the exact services, timeline, investment and handover path before kickoff."
        primaryTo={contactPath}
        primaryLabel="Enquire for this bundle"
        secondaryLabel="WhatsApp Kraftt"
        secondaryHref={whatsappHref(bundle.name)}
      />
    </>
  );
}

function Snapshot({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-parchment)] p-4">
      <p className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-umber)]">
        {icon}
        {label}
      </p>
      <p className="mt-2 font-display text-2xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
        {value}
      </p>
    </div>
  );
}
