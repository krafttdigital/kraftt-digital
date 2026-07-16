import { Link } from 'react-router-dom';
import { ArrowUpRight, BadgeCheck, CheckCircle2, Clock3, FileText, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema, buildFaqSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { CurrencyToggle } from '@/components/layout/CurrencyToggle';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { useCurrency } from '@/context/CurrencyContext';
import { siteConfig } from '@/config/siteConfig';
import { bundles } from '@/data/bundles';
import { buildBundleContactPrefillPath, buildContactPrefillPath } from '@/utils/contactPrefill';
import { formatPrice } from '@/utils/format';
import { DynamicIcon } from '@/utils/icons';
import { serviceCategories } from '@/data/services';

const pricingFaqs = [
  {
    question: 'Are prices fixed?',
    answer:
      'The listed packages have fixed starting scopes. If the project needs extra pages, integrations, products, content volume or custom functionality, the additional work is quoted before implementation.',
  },
  {
    question: 'What is included in the quoted amount?',
    answer:
      'The quoted amount covers the deliverables listed inside the selected package, the agreed review process and launch or handover work described in the proposal.',
  },
  {
    question: 'Are hosting and domain charges included?',
    answer:
      'No. Domains, hosting, Shopify subscriptions, paid apps, email tools and other third-party subscriptions are paid directly by the client unless a proposal states otherwise.',
  },
  {
    question: 'How are payments divided?',
    answer:
      'Payment milestones are agreed before kickoff. For larger projects, Kraftt may divide payment into booking, production and launch milestones.',
  },
  {
    question: 'Can I start with one service?',
    answer:
      'Yes. You can begin with one focused service, such as website, brand identity, SEO or content, and combine services later when the business needs it.',
  },
  {
    question: 'Can services be combined later?',
    answer:
      'Yes. Kraftt can combine website, branding, search, content and enquiry systems into a connected Digital Authority System after the first service is complete.',
  },
  {
    question: 'Will I own the website and accounts?',
    answer:
      'Agreed accounts, website assets and deliverables are handed over to the client. Third-party platforms remain subject to their own billing and account rules.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'You receive handover guidance. Website maintenance can be handled by you, or Kraftt can maintain the site for Rs. 1,500/month or Rs. 12,000/year where applicable.',
  },
  {
    question: 'Do you guarantee enquiries or revenue?',
    answer:
      'No. Kraftt does not guarantee revenue, rankings or enquiries. The work improves the quality, clarity and measurability of your digital presence.',
  },
  {
    question: 'Do you work outside Bathinda?',
    answer:
      'Yes. Kraftt is based in Bathinda, Punjab and works with businesses across India and selected international clients.',
  },
];

const authorityParts = ['Positioning', 'Website', 'Search visibility', 'Enquiry or WhatsApp flow', 'Analytics'];

const packageGuidance = [
  {
    title: 'Individual Service',
    body: 'Best when you know the exact deliverable you need, such as a website, brand identity, Shopify store, SEO support or content.',
  },
  {
    title: 'Digital Authority System',
    body: 'Best when your website, search, proof, enquiry flow and analytics need to work together rather than as scattered tasks.',
  },
  {
    title: 'Ongoing Growth Support',
    body: 'Best after launch when SEO, social media, content, maintenance or creative needs consistent monthly delivery.',
  },
];

function packagePriceLabel(category: (typeof serviceCategories)[number], currency: 'USD' | 'INR') {
  const firstPackage = category.packages[0];
  return formatPrice(firstPackage.price, currency) ?? 'Custom scope after audit';
}

function notIncludedFor(categoryId: string) {
  if (categoryId === 'shopify') {
    return ['Shopify subscription', 'Paid apps', 'Payment gateway fees', 'Ad spend'];
  }
  if (categoryId === 'social') {
    return ['Ad spend', 'Influencer fees', 'Professional shoot costs', 'DM/community replies unless scoped'];
  }
  if (categoryId === 'ecomseo') {
    return ['Ad spend', 'Paid backlinks', 'Guaranteed rankings', 'Developer-heavy store changes unless scoped'];
  }
  if (categoryId === 'dashboard') {
    return ['Hosting costs', 'Third-party API fees', 'New modules outside scope', 'Long-term support unless scoped'];
  }
  return ['Domain or hosting fees', 'Paid tools or subscriptions', 'New features outside scope', 'Content or shoots unless listed'];
}

export default function Services() {
  const { currency } = useCurrency();

  return (
    <>
      <SEO
        title="Services & Pricing - Clear Digital Scopes"
        description="Kraftt Digital services and investment: web design, Shopify, SEO, brand identity, content, dashboards, AI creative and social media with transparent INR and USD package pricing."
        path="/services"
      />
      <JsonLd data={[buildBreadcrumbSchema([{ name: 'Services', path: '/services' }]), buildFaqSchema(pricingFaqs)]} />

      <section className="relative overflow-hidden bg-[var(--color-parchment)] pt-[120px] pb-16 text-[var(--color-midnight)] md:pt-[140px] md:pb-24">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-20" aria-hidden="true" />
        <div className="container-kd relative z-10 grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">Services and investment</p>
            <h1 className="mt-5 max-w-4xl text-balance font-display text-[42px] leading-[1.02] md:text-[68px]" style={{ fontWeight: 300 }}>
              Clear scopes. Honest pricing. No unnecessary complexity.
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              Kraftt connects strategy, design, visibility and enquiry systems according to what the business actually needs.
            </p>
            <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[var(--color-text-muted)]">
              You receive the scope, timeline, deliverables and investment before the project begins.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5 shadow-[0_24px_80px_rgba(13,13,13,0.08)]">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="eyebrow">Currency</p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    Prices are shown in {currency}. Indian visitors default to INR, with USD available for international clients.
                  </p>
                </div>
                <CurrencyToggle compact className="shrink-0" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-border-light)]">
                {[
                  ['8', 'service lines'],
                  ['24', 'packages'],
                  ['4', 'bundles'],
                ].map(([value, label]) => (
                  <div key={label} className="bg-[var(--color-parchment)] p-4">
                    <p className="font-display text-3xl leading-none text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                      {value}
                    </p>
                    <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd">
          <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Main service categories</p>
              <h2 className="mt-4 max-w-3xl text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
                Choose the service that matches the business problem first.
              </h2>
            </div>
            <Link to="/authority-system" className="agency-magnetic inline-flex w-fit items-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]">
              Explore Authority System <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-5">
            {serviceCategories.map((category, index) => {
              const startingPrice = packagePriceLabel(category, currency);
              const firstPackage = category.packages[0];
              const contactPath = buildContactPrefillPath(category, firstPackage, currency);

              return (
                <Reveal key={category.id} delay={index * 0.04}>
                  <article className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] shadow-[0_18px_60px_rgba(13,13,13,0.06)]">
                    <div className="grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
                      <div className="border-b border-[var(--color-border-light)] p-5 md:p-6 lg:border-b-0 lg:border-r">
                        <div className="flex items-start gap-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-[var(--color-midnight)] text-[var(--color-sand)]">
                            <DynamicIcon name={category.icon} className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-umber)]">0{index + 1}</p>
                            <h3 className="mt-2 font-display text-3xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                              {category.name}
                            </h3>
                            <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{category.shortSummary}</p>
                          </div>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          <InfoBlock label="For" body={category.idealClients[0]} />
                          <InfoBlock label="Solves" body={category.problemsSolved[0]} />
                          <InfoBlock label="Timeline" body={firstPackage.delivery} />
                          <InfoBlock label="Starting investment" body={`Starting from ${startingPrice}`} />
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                          <Link to={`/services/${category.slug}`} className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-4 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-parchment)] hover:bg-[var(--color-umber)]">
                            View Service Details <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                          <Link to={contactPath} className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-light)] px-4 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]">
                            Discuss This Service <MessageCircle className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>

                      <div className="p-5 md:p-6">
                        <div className="grid gap-3 md:grid-cols-3">
                          {category.packages.map((pkg) => (
                            <div key={pkg.id} className="flex min-h-[220px] flex-col rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-parchment)] p-4">
                              <p className="font-display text-2xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                                {pkg.name}
                              </p>
                              <p className="mt-3 font-sans text-[13px] leading-relaxed text-[var(--color-text-secondary)]">{pkg.includes[0]}</p>
                              <p className="mt-auto pt-5 font-display text-3xl leading-none text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                                {formatPrice(pkg.price, currency) ?? 'India only'}
                              </p>
                              <p className="mt-2 flex items-center gap-1.5 font-sans text-[11px] text-[var(--color-text-muted)]">
                                <Clock3 className="h-3.5 w-3.5 text-[var(--color-umber)]" aria-hidden="true" />
                                {pkg.delivery}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                          <div className="rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-4">
                            <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-umber)]">Main deliverables</p>
                            <ul className="mt-3 space-y-2">
                              {category.deliverables.slice(0, 4).map((item) => (
                                <li key={item} className="flex gap-2 font-sans text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-umber)]" aria-hidden="true" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-4">
                            <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-umber)]">Not included by default</p>
                            <ul className="mt-3 space-y-2">
                              {notIncludedFor(category.id).map((item) => (
                                <li key={item} className="flex gap-2 font-sans text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                                  <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-text-muted)]" aria-hidden="true" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="bundles" className="agency-section-light py-16 md:py-24">
        <div className="container-kd">
          <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Bundle deals</p>
              <h2 className="mt-4 max-w-3xl text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
                Connected packages for launches that need more than one service.
              </h2>
              <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Bundles combine the most common service stacks into one clearer launch path, with fixed starting investment and a single enquiry flow.
              </p>
            </div>
            <Link
              to="/contact"
              className="agency-magnetic inline-flex w-fit items-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]"
            >
              Scope a custom bundle <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {bundles.map((bundle, index) => {
              const contactPath = buildBundleContactPrefillPath(bundle, currency);
              const formatted = formatPrice(bundle.price, currency) ?? 'India only';

              return (
                <Reveal key={bundle.id} delay={index * 0.06}>
                  <article className="agency-depth-card flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5 shadow-[0_18px_60px_rgba(13,13,13,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-umber)] md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-light)] bg-[var(--color-parchment)] px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-umber)]">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        {bundle.eyebrow}
                      </span>
                      <p className="font-display text-3xl leading-none text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                        {formatted}
                      </p>
                    </div>

                    <h3 className="mt-6 max-w-xl font-display text-3xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                      {bundle.name}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{bundle.description}</p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <InfoBlock label="Timeline" body={bundle.timeline} />
                      <InfoBlock label="Services" body={`${bundle.includes.length} package components`} />
                    </div>

                    <ul className="mt-6 grid gap-2.5">
                      {bundle.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-umber)]" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
                      <Link
                        to={`/services/bundles/${bundle.slug}`}
                        className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-4 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-parchment)] hover:bg-[var(--color-umber)]"
                      >
                        View bundle page <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <Link
                        to={contactPath}
                        className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-light)] px-4 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]"
                      >
                        Enquire <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-dark)] py-16 text-[var(--color-text-on-dark)] md:py-24">
        <div className="container-kd grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-[var(--color-sand)]">Flagship connected system</p>
            <h2 className="mt-4 max-w-3xl text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              The Kraftt Digital Authority System combines the work when one service is not enough.
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-[var(--color-text-secondary-on-dark)]">
              It is not a replacement for individual services. It is a connected path for businesses that need positioning, website, visibility, enquiry flow and measurement to work together.
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {authorityParts.map((item, index) => (
              <Reveal key={item} delay={index * 0.05} className="rounded-[8px] border border-[var(--color-border-dark)] bg-[var(--color-surface-dark)] p-5">
                <Sparkles className="h-4 w-4 text-[var(--color-sand)]" aria-hidden="true" />
                <p className="mt-4 font-display text-2xl leading-tight text-[var(--color-text-on-dark)]" style={{ fontWeight: 300 }}>
                  {item}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.25} className="rounded-[8px] border border-[var(--color-border-dark)] bg-[var(--color-surface-dark)] p-5 sm:col-span-2">
              <Link to="/authority-system" className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[var(--color-sand)] hover:text-[var(--color-text-on-dark)]">
                Explore the Authority System <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow">How Kraftt pricing works</p>
            <h2 className="mt-4 text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              You should know the scope before the project begins.
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              'Prices depend on scope and complexity.',
              'The client receives a written proposal first.',
              'Payment milestones are agreed before kickoff.',
              'Additional requests are quoted before implementation.',
              'No hidden platform or development charges.',
              'Third-party subscriptions are identified separately.',
              'The client retains ownership of agreed accounts and assets.',
            ].map((item, index) => (
              <Reveal key={item} delay={index * 0.04} className="rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-4">
                <ShieldCheck className="h-4 w-4 text-[var(--color-umber)]" aria-hidden="true" />
                <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-parchment)] py-16 md:py-24">
        <div className="container-kd">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Package guidance</p>
            <h2 className="mt-4 text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              Three ways to start, without forcing the largest package.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {packageGuidance.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6">
                <BadgeCheck className="h-5 w-5 text-[var(--color-umber)]" aria-hidden="true" />
                <h3 className="mt-5 font-display text-3xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                  {item.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Service FAQs</p>
            <h2 className="mt-4 text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              Questions before you choose a scope
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5 md:p-7">
            <FAQAccordion items={pricingFaqs} />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--color-bg-dark)] py-16 text-[var(--color-text-on-dark)] md:py-24">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-10" aria-hidden="true" />
        <div className="container-kd relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <p className="eyebrow text-[var(--color-sand)]">Next step</p>
            <h2 className="mt-4 max-w-3xl text-balance font-display text-[40px] leading-[1.04] md:text-[60px]" style={{ fontWeight: 300 }}>
              Know what you need—or start with an audit.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link to="/contact" className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-linen)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-midnight)] hover:bg-[var(--color-sand)]">
              Request a Digital Authority Audit <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={`https://wa.me/91${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-dark)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-text-on-dark)] hover:border-[var(--color-sand)] hover:text-[var(--color-sand)]">
              Start on WhatsApp <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-parchment)] p-3">
      <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-umber)]">{label}</p>
      <p className="mt-2 font-sans text-[13px] leading-relaxed text-[var(--color-text-secondary)]">{body}</p>
    </div>
  );
}
