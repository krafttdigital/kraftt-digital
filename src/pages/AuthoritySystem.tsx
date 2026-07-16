import { Link } from 'react-router-dom';
import { ArrowUpRight, BadgeCheck, ClipboardCheck, Globe2, Layout, MessageCircle, Search, ShieldCheck } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { siteConfig } from '@/config/siteConfig';

const components = [
  {
    title: 'Positioning clarity',
    body: 'Your offer, audience, proof points and next step are made clear before design starts.',
    icon: ClipboardCheck,
  },
  {
    title: 'Website foundation',
    body: 'A responsive website presents the business properly, loads quickly and gives visitors a clear path.',
    icon: Layout,
  },
  {
    title: 'Search visibility',
    body: 'Page structure, metadata, schema, Search Console and content foundations help search engines understand the business.',
    icon: Search,
  },
  {
    title: 'Enquiry flow',
    body: 'WhatsApp, forms, tracking and follow-up paths reduce friction for people who are ready to speak.',
    icon: MessageCircle,
  },
];

const deliverables = [
  'Digital presence audit and opportunity map',
  'Written scope with service mix, timeline and pricing',
  'Website or page system matched to the business goal',
  'Search, AEO and JSON-LD foundations where relevant',
  'WhatsApp or form-based enquiry route',
  'Analytics, Search Console and ownership handover',
];

const fitNotes = [
  'Established businesses whose offline reputation is stronger than their online presence',
  'Founders who need website, search and enquiry flow planned as one system',
  'D2C, service, studio and local businesses that want clarity before spending on ads',
];

const individualServiceFit = [
  'You already know the exact deliverable you need',
  'The current website or brand system is otherwise working well',
  'The budget or timeline is better suited to one focused service first',
];

export default function AuthoritySystem() {
  return (
    <>
      <SEO
        title="Digital Authority System"
        description="Kraftt Digital Authority System connects positioning, website, search visibility, enquiry flow, analytics and ownership for established owner-led businesses."
        path="/authority-system"
      />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Authority System', path: '/authority-system' }])} />

      <section className="relative overflow-hidden bg-[var(--color-parchment)] pt-[120px] pb-16 text-[var(--color-midnight)] md:pt-[140px] md:pb-24">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-20" aria-hidden="true" />
        <div className="container-kd relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Digital authority system</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-[42px] leading-[1.02] md:text-[68px]" style={{ fontWeight: 300 }}>
              One connected system for credibility, visibility and enquiries.
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              Kraftt connects positioning, website, search foundations, enquiry flow and analytics so your digital presence carries the same weight as your real-world reputation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/services"
                className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-parchment)] hover:bg-[var(--color-umber)]"
              >
                View Services & Pricing <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]"
              >
                Request an Audit <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5 shadow-[0_28px_90px_rgba(13,13,13,0.08)]">
              <div className="rounded-[var(--radius-card)] bg-[var(--color-surface-dark)] p-5 text-[var(--color-text-on-dark)]">
                <p className="eyebrow text-[var(--color-sand)]">Connected model</p>
                <h2 className="mt-4 font-display text-4xl leading-tight" style={{ fontWeight: 300 }}>
                  Reputation becomes a usable digital path.
                </h2>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {components.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-[8px] border border-[var(--color-border-dark)] bg-white/[0.04] p-4">
                        <Icon className="h-4 w-4 text-[var(--color-sand)]" aria-hidden="true" />
                        <p className="mt-3 font-sans text-sm font-medium text-[var(--color-text-on-dark)]">{item.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">What it includes</p>
            <h2 className="mt-4 text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              The system is built from practical parts, not vague branding language.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {components.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.05} className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[var(--color-midnight)] text-[var(--color-sand)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                    {item.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{item.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-dark)] py-16 text-[var(--color-text-on-dark)] md:py-24">
        <div className="container-kd grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow text-[var(--color-sand)]">Deliverables</p>
            <h2 className="mt-4 text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              A written plan, a working system and a clean handover.
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {deliverables.map((item, index) => (
              <Reveal key={item} delay={index * 0.04} className="rounded-[8px] border border-[var(--color-border-dark)] bg-[var(--color-surface-dark)] p-4">
                <BadgeCheck className="h-4 w-4 text-[var(--color-sand)]" aria-hidden="true" />
                <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary-on-dark)]">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd grid gap-5 lg:grid-cols-2">
          <Reveal className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6 md:p-8">
            <ShieldCheck className="h-6 w-6 text-[var(--color-umber)]" aria-hidden="true" />
            <h2 className="mt-5 font-display text-4xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
              Who it is for
            </h2>
            <ul className="mt-6 space-y-4">
              {fitNotes.map((item) => (
                <li key={item} className="flex gap-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-umber)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06} className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6 md:p-8">
            <Globe2 className="h-6 w-6 text-[var(--color-umber)]" aria-hidden="true" />
            <h2 className="mt-5 font-display text-4xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
              When one service is better
            </h2>
            <ul className="mt-6 space-y-4">
              {individualServiceFit.map((item) => (
                <li key={item} className="flex gap-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-umber)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--color-parchment)] py-16 md:py-24">
        <div className="container-kd grid gap-8 rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
          <Reveal>
            <p className="eyebrow">Next step</p>
            <h2 className="mt-4 max-w-3xl text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              Start with the audit, then choose the right service mix.
            </h2>
            <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">
              If the system is more than you need, Kraftt will recommend a focused service instead of overscoping the project.
            </p>
          </Reveal>
          <Reveal delay={0.06} className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link to="/contact" className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-parchment)] hover:bg-[var(--color-umber)]">
              Request an Audit <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={`https://wa.me/91${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-light)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]">
              Start on WhatsApp <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
