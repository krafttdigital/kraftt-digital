import { useParams, Navigate, Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  Clock3,
  ExternalLink,
  FileText,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { CaseStudyVisual } from '@/components/portfolio/CaseStudyVisual';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildServiceSchema, buildFaqSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTASection } from '@/components/ui/CTASection';
import { EmptyState } from '@/components/ui/EmptyState';
import { useCurrency } from '@/context/CurrencyContext';
import { siteConfig } from '@/config/siteConfig';
import { buildContactPrefillPath } from '@/utils/contactPrefill';
import { formatPrice } from '@/utils/format';
import { DynamicIcon } from '@/utils/icons';
import { getCategoryBySlug, serviceCategories } from '@/data/services';
import { portfolioProjects } from '@/data/portfolio';
import type { ServiceCategory, ServicePackage } from '@/types';

const croFoundation = [
  {
    title: 'Mobile-first Indian buying flow',
    body: 'Most visitors will judge the page from a phone, then call, WhatsApp, or compare quickly. The page is structured for that behaviour.',
  },
  {
    title: 'Trust before cleverness',
    body: 'Clear pricing, visible deliverables, Search Console, schema, contact paths and handover assets are treated as conversion tools.',
  },
  {
    title: 'WhatsApp-ready enquiries',
    body: 'The offer is written so interested leads can move from page to WhatsApp or form without asking basic scope questions again.',
  },
];

const serviceAngles: Record<string, { title: string; body: string }[]> = {
  web: [
    { title: 'Speed and clarity', body: 'Pages are planned for quick loading, readable sections, clean hierarchy and fewer dead ends.' },
    { title: 'Local credibility', body: 'Contact, map, service proof, FAQs and schema can be arranged for city-led discovery across India.' },
    { title: 'Lead capture', body: 'WhatsApp, forms and tracking are positioned as part of the business flow, not as decorative buttons.' },
  ],
  shopify: [
    { title: 'Product discovery', body: 'Collections, product names, descriptions and images are arranged so shoppers find the right item faster.' },
    { title: 'Checkout confidence', body: 'The store flow reduces doubt around price, delivery, product detail, WhatsApp help and brand trust.' },
    { title: 'Search-ready catalogue', body: 'Product metadata, collection structure and Search Console setup support long-term organic visibility.' },
  ],
  ecomseo: [
    { title: 'Intent-led pages', body: 'SEO work focuses on category, product and problem-led searches that can actually become business enquiries.' },
    { title: 'AEO and schema support', body: 'Content structure, FAQs and JSON-LD help the site become easier for search systems to understand.' },
    { title: 'Measurement discipline', body: 'Reports focus on what improved, what changed and where the next conversion opportunity sits.' },
  ],
  content: [
    { title: 'Copy that sells quietly', body: 'The writing clarifies what you do, who it is for, why it matters and what action the visitor should take.' },
    { title: 'Indian buyer context', body: 'Tone, proof points and explanations are shaped for practical buyers who want confidence before enquiry.' },
    { title: 'Reusable content assets', body: 'Landing copy, product descriptions, captions and FAQs can be reused across website, search and social.' },
  ],
  dashboard: [
    { title: 'Operational clarity', body: 'Dashboards are designed around decisions, not just charts, so teams can see work, leads or sales cleanly.' },
    { title: 'Founder-friendly views', body: 'The interface keeps the numbers a business owner checks most often close to the surface.' },
    { title: 'Low-friction handover', body: 'The build includes a practical guide so the system remains useful after delivery.' },
  ],
  ai: [
    { title: 'Faster creative testing', body: 'AI-assisted visuals and copy help brands test concepts without losing consistency or quality control.' },
    { title: 'Campaign-ready assets', body: 'Outputs are arranged for landing pages, product mockups, social posts and launch material.' },
    { title: 'Human review layer', body: 'The work is refined for brand fit, clarity and conversion before it is handed over.' },
  ],
  brand: [
    { title: 'Recognition first', body: 'The system gives the business a usable logo suite, colours, typography and tone that can be applied consistently.' },
    { title: 'Premium but practical', body: 'Brand decisions are made for websites, social, packaging, storefronts and real customer touchpoints.' },
    { title: 'Founder alignment', body: 'The direction connects what the business wants to be known for with how customers should remember it.' },
  ],
  social: [
    { title: 'Profile conversion', body: 'The profile, captions, highlights and content rhythm are arranged so visitors understand the offer quickly.' },
    { title: 'Consistency without noise', body: 'Posts, stories and reports are scoped so the brand looks active without becoming random content output.' },
    { title: 'Growth signals', body: 'Monthly reporting focuses on content performance, audience response and what should be improved next.' },
  ],
};

function getCroAngles(category: ServiceCategory) {
  return serviceAngles[category.id] ?? croFoundation;
}

function whatsappHref(category: ServiceCategory, pkg: ServicePackage) {
  const message = `Hi Kraftt Digital, I am interested in ${category.name} - ${pkg.name}. Please share the next steps.`;
  return `https://wa.me/91${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

function notIncludedFor(categoryId: string) {
  if (categoryId === 'shopify') return ['Shopify subscription', 'Paid apps', 'Payment gateway fees', 'Ad spend'];
  if (categoryId === 'social') return ['Ad spend', 'Influencer fees', 'Professional shoots unless scoped', 'DM management unless scoped'];
  if (categoryId === 'ecomseo') return ['Ad spend', 'Paid backlinks', 'Guaranteed rankings', 'Developer-heavy changes unless scoped'];
  if (categoryId === 'dashboard') return ['Hosting costs', 'Third-party API fees', 'New modules outside scope', 'Long-term support unless scoped'];
  return ['Domain or hosting fees', 'Paid tools or subscriptions', 'New features outside scope', 'Content or shoots unless listed'];
}

function statCardsFor(category: ServiceCategory, primaryPackage: ServicePackage, currency: 'USD' | 'INR') {
  return [
    { label: 'Starting at', value: formatPrice(category.packages[0].price, currency) ?? 'India only' },
    { label: 'Popular scope', value: primaryPackage.name },
    { label: 'Delivery window', value: primaryPackage.delivery },
  ];
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { currency } = useCurrency();
  const category = slug ? getCategoryBySlug(slug) : undefined;

  if (!category) return <Navigate to="/404" replace />;

  const primaryPackage = category.packages.find((pkg) => pkg.featured) ?? category.packages[0];
  const primaryPath = buildContactPrefillPath(category, primaryPackage, currency);
  const relatedCategories = category.relatedSlugs
    .map((s) => serviceCategories.find((c) => c.slug === s))
    .filter((c): c is ServiceCategory => Boolean(c));
  const relatedProjects = portfolioProjects.filter((p) => p.serviceIds?.includes(category.id));
  const croAngles = getCroAngles(category);
  const stats = statCardsFor(category, primaryPackage, currency);

  return (
    <>
      <SEO title={category.name} description={category.heroSummary} path={`/services/${category.slug}`} />
      <JsonLd
        data={[
          buildServiceSchema({
            name: category.name,
            description: category.heroSummary,
            path: `/services/${category.slug}`,
            offers: category.packages.map((p) => ({ name: p.name, priceUsd: p.price.usd, priceInr: p.price.inr })),
          }),
          buildFaqSchema(category.faqs),
        ]}
      />

      <header className="relative overflow-hidden bg-[var(--color-parchment)] pt-[118px] pb-14 text-[var(--color-midnight)] md:pt-[138px] md:pb-20">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-20" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--color-bg-secondary)]" aria-hidden="true" />

        <div className="container-kd relative z-10">
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }, { name: category.name, path: `/services/${category.slug}` }]} />

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-stretch">
            <Reveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-4 py-2 shadow-[0_14px_42px_rgba(13,13,13,0.06)]">
                <DynamicIcon name={category.icon} className="h-4 w-4 text-[var(--color-umber)]" />
                <span className="eyebrow text-[var(--color-umber)]">{category.name}</span>
              </div>

              <h1 className="mt-6 max-w-4xl text-balance font-display text-[42px] leading-[1.02] md:text-[68px]" style={{ fontWeight: 300 }}>
                {category.heroSummary}
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
                Built for Indian buyers who compare quickly, trust slowly and prefer a clear next step. Every page, package and handover is scoped around conversion, ownership and measurable digital authority.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={primaryPath}
                  className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-parchment)] shadow-[0_16px_42px_rgba(13,13,13,0.16)] hover:bg-[var(--color-umber)]"
                >
                  Start with {primaryPackage.name}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={whatsappHref(category, primaryPackage)}
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
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow text-[var(--color-umber)]">CRO snapshot</p>
                  <Sparkles className="h-5 w-5 text-[var(--color-umber)]" aria-hidden="true" />
                </div>
                <h2 className="mt-5 font-display text-3xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                  Built to turn attention into enquiries.
                </h2>

                <div className="mt-6 grid gap-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-parchment)] p-4">
                      <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">{stat.label}</p>
                      <p className="mt-2 font-display text-2xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-midnight)] p-4 text-[var(--color-parchment)]">
                  <p className="flex items-center gap-2 font-sans text-sm font-medium">
                    <ShieldCheck className="h-4 w-4 text-[var(--color-sand)]" aria-hidden="true" />
                    Clear scope before payment
                  </p>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-[var(--color-text-muted-on-dark)]">
                    You get the inclusions, add-ons, timeline and handover expectations before the project starts.
                  </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="agency-section-light py-14 md:py-20">
        <div className="container-kd">
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-border-light)] md:grid-cols-3">
            {croFoundation.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="h-full bg-[var(--color-bg-secondary)] p-6 md:p-7">
                  <BadgeCheck className="h-5 w-5 text-[var(--color-umber)]" aria-hidden="true" />
                  <h2 className="mt-5 font-display text-2xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                    {item.title}
                  </h2>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="agency-section-dark py-16 md:py-24">
        <div className="container-kd grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal>
            <div className="sticky top-28 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.045] p-6">
              <p className="eyebrow text-[var(--color-sand)]">Where this wins</p>
              <h2 className="mt-4 font-display text-[34px] leading-tight text-[var(--color-linen)] md:text-[44px]" style={{ fontWeight: 300 }}>
                Designed for Indian CRO, not just a pretty service page.
              </h2>
              <p className="mt-5 font-sans text-sm leading-relaxed text-[var(--color-text-muted-on-dark)]">
                The goal is to make the offer easier to trust, easier to compare and easier to act on across mobile, search and WhatsApp.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {croAngles.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.045] p-5 md:p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-white/10 bg-black/25 text-[var(--color-sand)]">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl leading-tight text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
                        {item.title}
                      </h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--color-text-muted-on-dark)]">{item.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd">
          <SectionHeading
            eyebrow="Scope and deliverables"
            title="What you receive, what it solves, and who it is for."
            description="This section keeps the offer practical: no vague premium claims, just the project value a buyer can understand before enquiring."
          />

          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            <Reveal>
              <InfoPanel title="Problems solved" items={category.problemsSolved} />
            </Reveal>
            <Reveal delay={0.05}>
              <InfoPanel title="Best for" items={category.idealClients} />
            </Reveal>
            <Reveal delay={0.1}>
              <InfoPanel title="Core deliverables" items={category.deliverables} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Packages"
              title="Pick the package. The enquiry form will carry the scope."
              description={`Prices follow the active ${currency} selector. Package buttons pre-fill the contact form with service, budget, currency and timeline.`}
            />
            <Link
              to="/services"
              className="agency-magnetic inline-flex w-fit items-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]"
            >
              Compare all services
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {category.packages.map((pkg, index) => {
              const formatted = formatPrice(pkg.price, currency);
              const contactPath = buildContactPrefillPath(category, pkg, currency);
              return (
                <Reveal key={pkg.id} delay={index * 0.06}>
                  <article
                    className={`flex h-full flex-col rounded-[var(--radius-card)] border p-5 md:p-6 ${
                      pkg.featured
                        ? 'border-[var(--color-umber)] bg-[var(--color-midnight)] text-[var(--color-parchment)] shadow-[0_26px_80px_rgba(13,13,13,0.18)]'
                        : 'border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] text-[var(--color-midnight)]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className={`rounded-full px-3 py-1 font-sans text-[10px] uppercase tracking-[0.14em] ${pkg.featured ? 'bg-[var(--color-umber)] text-[var(--color-midnight)]' : 'bg-[var(--color-parchment)] text-[var(--color-umber)]'}`}>
                        {pkg.badge}
                      </p>
                      {pkg.featured ? <Sparkles className="h-5 w-5 text-[var(--color-sand)]" aria-hidden="true" /> : null}
                    </div>

                    <h3 className={`mt-5 font-display text-3xl leading-tight ${pkg.featured ? 'text-[var(--color-linen)]' : 'text-[var(--color-midnight)]'}`} style={{ fontWeight: 300 }}>
                      {pkg.name}
                    </h3>
                    <p className={`mt-4 font-display text-4xl leading-none ${pkg.featured ? 'text-[var(--color-linen)]' : 'text-[var(--color-midnight)]'}`} style={{ fontWeight: 300 }}>
                      {formatted ?? 'India only'}
                    </p>
                    <p className={`mt-3 flex items-center gap-2 font-sans text-xs ${pkg.featured ? 'text-[var(--color-text-muted-on-dark)]' : 'text-[var(--color-text-muted)]'}`}>
                      <Clock3 className="h-4 w-4 text-[var(--color-umber)]" aria-hidden="true" />
                      {pkg.delivery} timeline
                    </p>

                    <div className={`my-6 h-px ${pkg.featured ? 'bg-white/10' : 'bg-[var(--color-border-light)]'}`} />

                    <ul className="grid flex-1 gap-2.5">
                      {pkg.includes.map((item) => (
                        <li key={item} className={`flex items-start gap-2 font-sans text-sm leading-relaxed ${pkg.featured ? 'text-[var(--color-text-muted-on-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-umber)]" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {pkg.addons.length > 0 ? (
                      <div className={`mt-6 rounded-[8px] border p-4 ${pkg.featured ? 'border-white/10 bg-white/[0.045]' : 'border-[var(--color-border-light)] bg-[var(--color-parchment)]'}`}>
                        <p className={`font-sans text-[10px] uppercase tracking-[0.16em] ${pkg.featured ? 'text-[var(--color-sand)]' : 'text-[var(--color-umber)]'}`}>Available add-ons</p>
                        <div className="mt-3 grid gap-2">
                          {pkg.addons.map((addon) => (
                            <p key={addon.label} className={`font-sans text-xs leading-relaxed ${pkg.featured ? 'text-[var(--color-text-muted-on-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                              {addon.label}
                              {formatPrice(addon.price, currency) ? ` +${formatPrice(addon.price, currency)}` : ''}
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-6 grid gap-3">
                      <Link
                        to={contactPath}
                        className={`agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] px-4 py-3 font-sans text-sm font-medium ${
                          pkg.featured
                            ? 'bg-[var(--color-umber)] text-[var(--color-midnight)] hover:bg-[var(--color-sand)]'
                            : 'bg-[var(--color-midnight)] text-[var(--color-parchment)] hover:bg-[var(--color-umber)]'
                        }`}
                      >
                        Enquire with this scope
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <a
                        href={whatsappHref(category, pkg)}
                        target="_blank"
                        rel="noreferrer"
                        className={`agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border px-4 py-3 font-sans text-sm font-medium ${
                          pkg.featured
                            ? 'border-white/15 text-[var(--color-linen)] hover:border-[var(--color-umber)] hover:text-[var(--color-sand)]'
                            : 'border-[var(--color-border-light)] text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]'
                        }`}
                      >
                        Ask on WhatsApp
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5">
            <p className="flex items-center gap-2 font-sans text-sm font-medium text-[var(--color-midnight)]">
              <FileText className="h-4 w-4 text-[var(--color-umber)]" aria-hidden="true" />
              Usually not included unless scoped separately
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {notIncludedFor(category.id).map((item) => (
                <span key={item} className="rounded-full border border-[var(--color-border-light)] bg-[var(--color-parchment)] px-3 py-1.5 font-sans text-xs text-[var(--color-text-secondary)]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="agency-section-dark py-16 md:py-24">
        <div className="container-kd grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionHeading eyebrow="Project rhythm" title="How the work moves from brief to handover." light />
          <div className="grid gap-4">
            {category.process.map((step, index) => (
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
        <div className="container-kd">
          <SectionHeading eyebrow="Related work" title="Proof connected to this service." description="Case studies show how strategy, execution, search structure, design and enquiry paths come together in real projects." />
          <div className="mt-8">
            {relatedProjects.length === 0 ? (
              <EmptyState
                title="No published case studies yet"
                description="Real examples of this service will be added here as projects complete. Browse the package deliverables above for an exact sense of scope."
              />
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {relatedProjects.map((project, index) => (
                  <Reveal key={project.slug} delay={index * 0.06}>
                    <article className="agency-depth-card group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-umber)]">
                      <CaseStudyVisual project={project} className="aspect-[16/10] rounded-none border-x-0 border-t-0" />
                      <div className="flex flex-1 flex-col p-5">
                        <p className="eyebrow text-[var(--color-umber)]">{project.industry}</p>
                        <h3 className="mt-2 font-display text-2xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                          {project.client}
                        </h3>
                        <p className="mt-4 line-clamp-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{project.challenge}</p>
                        <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
                          <Link to={`/portfolio/${project.slug}`} className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[var(--color-umber)] hover:text-[var(--color-midnight)]">
                            View case study
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                          {project.projectUrl && project.projectUrl !== '#' ? (
                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-light)] px-3 py-2 font-sans text-xs text-[var(--color-text-secondary)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]"
                            >
                              Live site
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {relatedCategories.length > 0 && (
        <section className="agency-section-light py-16 md:py-24">
          <div className="container-kd">
            <SectionHeading eyebrow="Pairs well with" title="Services that strengthen this scope." />
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {relatedCategories.map((rc) => (
                <Link
                  key={rc.slug}
                  to={`/services/${rc.slug}`}
                  className="agency-depth-card group rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6 transition-colors hover:border-[var(--color-umber)]"
                >
                  <DynamicIcon name={rc.icon} className="h-5 w-5 text-[var(--color-umber)]" />
                  <h3 className="mt-3 font-display text-xl text-[var(--color-midnight)] transition-colors group-hover:text-[var(--color-umber)]" style={{ fontWeight: 300 }}>
                    {rc.name}
                  </h3>
                  <p className="mt-2 font-sans text-[13px] leading-relaxed text-[var(--color-text-secondary)]">{rc.shortSummary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently asked before starting." />
          <div className="mt-8">
            <FAQAccordion items={category.faqs} />
          </div>
        </div>
      </section>

      <CTASection
        title={<>Ready to scope your {category.name.toLowerCase()} project?</>}
        description="Send a short brief and we will confirm the right package, exact price, timeline and next steps."
        primaryTo={primaryPath}
        secondaryLabel="WhatsApp Kraftt"
        secondaryHref={`https://wa.me/91${siteConfig.contact.whatsapp}`}
      />
    </>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="h-full rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6 shadow-[0_18px_60px_rgba(13,13,13,0.06)]">
      <h3 className="font-display text-2xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
        {title}
      </h3>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-umber)]" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
