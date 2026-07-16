import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Layers3,
  MessageCircle,
  MousePointerClick,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildFaqSchema, buildOrganizationSchema, buildWebsiteSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
// import { LightHeroScene } from '@/components/ui/LightHeroScene';
import { useCurrency } from '@/context/CurrencyContext';
import { siteConfig } from '@/config/siteConfig';
import { serviceCategories } from '@/data/services';
import { portfolioProjects } from '@/data/portfolio';
import { formatPrice } from '@/utils/format';
import { trackEvent } from '@/utils/analytics';
import { DynamicIcon } from '@/utils/icons';
import heroBackgroundVideo from '../../assets/background.mp4';
import founderImage from '../../assets/founder.PNG';

const homeDescription =
  'Kraftt Digital builds websites, search visibility and enquiry systems for established owner-led businesses whose real-world reputation has outgrown their digital presence.';

const auditWhatsAppMessage = `Hi Kraftt Digital, I would like to discuss a Digital Authority Audit for my business.

Business name:
City:
Website or Instagram:
Main goal:`;

const whatsappAuditHref = `https://wa.me/91${siteConfig.contact.whatsapp}?text=${encodeURIComponent(auditWhatsAppMessage)}`;

const trustItems = [
  {
    title: 'Founder-led',
    body: 'Direct accountability from the person scoping and guiding the work.',
    icon: ShieldCheck,
  },
  {
    title: 'Clear project scope',
    body: 'Written deliverables, timelines and exclusions before kickoff.',
    icon: ClipboardCheck,
  },
  {
    title: 'Client-owned assets',
    body: 'Agreed accounts, files and handover stay with your business.',
    icon: BadgeCheck,
  },
  {
    title: 'Bathinda to India',
    body: 'Based in Bathinda, working with owner-led businesses across India.',
    icon: CheckCircle2,
  },
];

const problemCards = [
  {
    title: 'People trust you offline',
    body: 'But when they search online, the website, social proof or service information may not show the same standard.',
  },
  {
    title: 'Your offer is scattered',
    body: 'Good work is hidden behind unclear pages, generic copy and weak proof points.',
  },
  {
    title: 'Enquiries leak',
    body: 'Visitors are interested, but WhatsApp, forms, tracking and next steps are not connected cleanly.',
  },
];

const transformationCards = [
  {
    title: 'Clear positioning',
    body: 'Visitors understand who you serve, what you offer and why the business is credible.',
    icon: ClipboardCheck,
  },
  {
    title: 'Findable structure',
    body: 'Pages, metadata, schema and content foundations make the business easier to understand in search.',
    icon: Search,
  },
  {
    title: 'Direct enquiry path',
    body: 'WhatsApp, forms and calls to action guide serious visitors toward a useful conversation.',
    icon: MousePointerClick,
  },
];

const authorityPreview = [
  'Brand clarity',
  'Website and search',
  'Enquiry and WhatsApp flow',
  'Tracking and ownership',
];

const processSteps = ['Audit', 'Proposal', 'Kickoff', 'Design & Build', 'Review', 'Launch'];

const whyKraftt = [
  'No fake guarantees, invented numbers or vanity proof.',
  'Transparent scope, timeline, deliverables and payment milestones before kickoff.',
  'Built for owner-led businesses that care how they are seen online.',
  'Digital work explained in business language before technical implementation.',
];

const homeFaqs = [
  {
    question: 'What is a Digital Authority Audit?',
    answer:
      'It is a first review of your current website, search presence, trust signals and enquiry path. The goal is to show what is missing, what should be improved first and which Kraftt Digital service fits the work.',
  },
  {
    question: 'Is this only for businesses without a website?',
    answer:
      'No. It is often more useful for established businesses that already have reputation, customers and offline credibility, but whose website, Google presence or enquiry flow does not represent that standard.',
  },
  {
    question: 'Do you guarantee leads or revenue?',
    answer:
      'No. We do not sell guaranteed outcomes or fake proof. We build the digital system that improves credibility, visibility and enquiry handling, then measure what can be measured honestly.',
  },
  {
    question: 'Can Kraftt Digital maintain the website after launch?',
    answer:
      'Yes. Website maintenance can be handled monthly or yearly depending on the package and scope. New features or major additions are quoted separately before work begins.',
  },
  {
    question: 'Can I start with a normal service instead of the full system?',
    answer:
      'Yes. The Services & Pricing page lists focused packages. The audit simply helps you choose the right path when you are unsure where the digital gaps are.',
  },
];

const selectedProjects = portfolioProjects.slice(0, 3);
// Set this to true when the founder section should be visible again.
const showFounderSection = false;

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const { currency } = useCurrency();
  const servicePreview = serviceCategories.slice(0, 8);

  return (
    <>
      <SEO title="Kraftt Digital | Digital Presence for Serious Brands" description={homeDescription} path="/" />
      <JsonLd data={[buildOrganizationSchema(), buildWebsiteSchema(), buildFaqSchema(homeFaqs)]} />

      <section className="kd-home-hero-bg relative overflow-hidden pt-[92px] pb-8 text-[var(--color-midnight)] md:pt-[108px] md:pb-10">
        <div className="kd-hero-media" aria-hidden="true">
          <video
            className="kd-hero-video"
            autoPlay={!shouldReduceMotion}
            muted
            loop
            playsInline
            preload="auto"
            tabIndex={-1}
            aria-hidden="true"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noplaybackrate"
          >
            <source src={heroBackgroundVideo} type="video/mp4" />
          </video>
          <div className="kd-hero-video-overlay" />
          <div className="kd-hero-watermark-mask" />
        </div>
        <div className="kd-hero-frame" aria-hidden="true" />
        <div className="kd-hero-ring kd-hero-ring-primary" aria-hidden="true" />
        <div className="kd-hero-ring kd-hero-ring-secondary" aria-hidden="true" />
        <div className="kd-hero-thread kd-hero-thread-left" aria-hidden="true" />
        <div className="kd-hero-thread kd-hero-thread-right" aria-hidden="true" />
        {/* <LightHeroScene /> */}
        <div className="container-kd relative z-10 grid gap-6 py-7 md:py-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.8fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="max-w-xl font-sans text-sm font-medium leading-relaxed text-[var(--color-umber)]">
              {siteConfig.tagline}
            </p>
            <h1 className="mt-5 max-w-5xl text-balance font-display text-[44px] leading-[0.96] text-[var(--color-midnight)] sm:text-[58px] md:text-[68px] xl:text-[72px]" style={{ fontWeight: 300 }}>
              Your offline reputation, finally visible online.
            </h1>
            <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              Kraftt Digital builds websites, search visibility and enquiry systems for established owner-led businesses whose real-world reputation has outgrown their digital presence.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/contact"
                onClick={() => trackEvent('hero_audit_click', { location: 'home_hero' })}
                className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-parchment)] shadow-[0_18px_44px_rgba(13,13,13,0.16)] hover:bg-[var(--color-umber)]"
              >
                Request a Digital Authority Audit
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/services"
                className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]"
              >
                Explore Services & Pricing
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/portfolio" className="inline-flex items-center justify-center gap-2 px-1 py-3 font-sans text-sm font-medium text-[var(--color-umber)] hover:text-[var(--color-midnight)]">
                See Selected Work
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          <Reveal delay={0.08}>
            <div className="justify-self-end rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-4 shadow-[0_28px_90px_rgba(13,13,13,0.08)] md:max-w-[560px] md:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Digital Authority Snapshot</p>
                  <h2 className="mt-3 font-display text-[32px] leading-[1.05] text-[var(--color-midnight)] md:text-[38px]" style={{ fontWeight: 300 }}>
                    Your digital authority, connected.
                  </h2>
                </div>
                <Sparkles className="h-5 w-5 text-[var(--color-umber)]" aria-hidden="true" />
              </div>

              <div className="mt-5 grid gap-2.5">
                {authorityPreview.map((item, index) => (
                  <div key={item} className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-parchment)] p-2.5">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-[7px] ${index === 1 ? 'bg-[var(--color-midnight)] text-[var(--color-sand)]' : 'bg-[var(--color-bg-secondary)] text-[var(--color-umber)]'}`}>
                      <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-sans text-sm font-medium text-[var(--color-text-secondary)]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[var(--radius-card)] bg-[var(--color-surface-dark)] p-4 text-[var(--color-text-on-dark)]">
                <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--color-sand)]">Audit output</p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary-on-dark)]">
                  A practical scope showing what to fix first, what can wait and which service path fits the business.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group flex items-start gap-3 rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)]/82 p-3 text-left shadow-[0_14px_40px_rgba(13,13,13,0.045)] backdrop-blur transition-colors hover:border-[var(--color-umber)]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-light)] bg-[var(--color-parchment)] text-[var(--color-umber)] transition-colors group-hover:bg-[var(--color-midnight)] group-hover:text-[var(--color-sand)]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-midnight)]">{item.title}</span>
                    <span className="mt-0.5 block font-sans text-[11px] leading-relaxed text-[var(--color-text-secondary)]">{item.body}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-parchment)] py-16 md:py-24">
        <div className="container-kd grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">The business problem</p>
            <h2 className="mt-4 max-w-xl text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              Strong reputation should not look weak online.
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {problemCards.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05} className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5">
                <p className="font-display text-2xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                  {item.title}
                </p>
                <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Transformation</p>
            <h2 className="mt-4 text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              The work turns credibility into a usable customer path.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {transformationCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.06} className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[var(--color-midnight)] text-[var(--color-sand)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                    {item.title}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{item.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      

      <section className="bg-[var(--color-bg-dark)] py-16 text-[var(--color-text-on-dark)] md:py-24">
        <div className="container-kd grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-[var(--color-sand)]">Authority System preview</p>
            <h2 className="mt-4 max-w-3xl text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              When the business needs more than one isolated deliverable.
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-[var(--color-text-secondary-on-dark)]">
              The Authority System combines positioning, website, search visibility, enquiry flow and analytics into one practical digital presence.
            </p>
            <Link to="/authority-system" className="mt-7 inline-flex items-center gap-2 font-sans text-sm font-medium text-[var(--color-sand)] hover:text-[var(--color-text-on-dark)]">
              Explore the Authority System <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {authorityPreview.map((item, index) => (
              <Reveal key={item} delay={index * 0.05} className="rounded-[8px] border border-[var(--color-border-dark)] bg-[var(--color-surface-dark)] p-5">
                <Layers3 className="h-4 w-4 text-[var(--color-sand)]" aria-hidden="true" />
                <p className="mt-4 font-display text-2xl leading-tight text-[var(--color-text-on-dark)]" style={{ fontWeight: 300 }}>
                  {item}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-parchment)] py-16 md:py-24">
        <div className="container-kd">
          <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2 className="mt-4 text-balance font-display text-[36px] leading-[1.08] text-[var(--color-midnight)] md:text-[54px]" style={{ fontWeight: 300 }}>
                Real builds, shown without inflated claims.
              </h2>
            </div>
            <Link to="/portfolio" className="agency-magnetic inline-flex w-fit items-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]">
              See selected work <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {selectedProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <Link to={`/portfolio/${project.slug}`} className="agency-depth-card group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] shadow-[0_22px_70px_rgba(13,13,13,0.08)]">
                  {project.imageUrl && (
                    <div className="aspect-[16/10] overflow-hidden bg-[var(--color-midnight)]">
                      <img src={project.imageUrl} alt={project.heroImageAlt} className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--color-umber)]">{project.industry}</p>
                    <h3 className="mt-3 font-display text-3xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                      {project.client}
                    </h3>
                    <p className="mt-4 line-clamp-4 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{project.challenge}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-medium text-[var(--color-umber)]">
                      View case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-parchment)] py-16 md:py-24">
        <div className="container-kd">
          <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Services preview</p>
              <h2 className="mt-4 max-w-3xl text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
                Focused services before a larger system is recommended.
              </h2>
            </div>
            <Link to="/services" className="agency-magnetic inline-flex w-fit items-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-parchment)] hover:bg-[var(--color-umber)]">
              View Services & Pricing <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {servicePreview.map((category, index) => {
              const firstPrice = formatPrice(category.packages[0].price, currency) ?? 'Custom scope';
              return (
                <Reveal key={category.id} delay={index * 0.04}>
                  <Link to={`/services/${category.slug}`} className="agency-depth-card group flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[var(--color-midnight)] text-[var(--color-sand)]">
                      <DynamicIcon name={category.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-2xl leading-tight text-[var(--color-midnight)] group-hover:text-[var(--color-umber)]" style={{ fontWeight: 300 }}>
                      {category.name}
                    </h3>
                    <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{category.shortSummary}</p>
                    <p className="mt-5 font-sans text-xs font-medium text-[var(--color-umber)]">Starting from {firstPrice}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>  

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd">
          <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Process preview</p>
              <h2 className="mt-4 max-w-3xl text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
                A clear path from audit to launch.
              </h2>
            </div>
            <Link to="/process" className="agency-magnetic inline-flex w-fit items-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-parchment)] hover:bg-[var(--color-umber)]">
              See the Full Process <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-3 md:grid-cols-6">
            {processSteps.map((step, index) => (
              <Reveal key={step} delay={index * 0.04} className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-4">
                <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-umber)]">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 font-display text-2xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                  {step}
                </h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-dark)] py-16 text-[var(--color-text-on-dark)] md:py-24">
        <div className="container-kd grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow text-[var(--color-sand)]">Why Kraftt</p>
            <h2 className="mt-4 text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              Premium because it is clear, not because it is vague.
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {whyKraftt.map((item, index) => (
              <Reveal key={item} delay={index * 0.05} className="rounded-[8px] border border-[var(--color-border-dark)] bg-[var(--color-surface-dark)] p-5">
                <ShieldCheck className="h-4 w-4 text-[var(--color-sand)]" aria-hidden="true" />
                <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--color-text-secondary-on-dark)]">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {showFounderSection && (
        <section className="agency-section-light py-16 md:py-24">
          <div className="container-kd grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <Reveal className="lg:max-w-[440px]">
              <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-dark)] bg-[var(--color-midnight)] p-2 shadow-[0_26px_88px_rgba(13,13,13,0.18)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,168,130,0.2),transparent_38%)]" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-[6px] bg-[var(--color-white-paper)]">
                  <img
                    src={founderImage}
                    alt="Ketan Goyal, founder of Kraftt Digital"
                    className="aspect-[4/5] w-full object-cover saturate-[0.96] contrast-[1.03]"
                    style={{ objectPosition: 'center 36%' }}
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(13,13,13,0.2))]" aria-hidden="true" />
                </div>
                <div className="relative mt-2 flex items-center justify-between gap-3 px-1 pb-1">
                  <span>
                    <span className="block font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--color-sand)]">Founder-led</span>
                    <span className="mt-0.5 block font-sans text-xs text-[var(--color-text-secondary-on-dark)]">Ketan Goyal</span>
                  </span>
                  <span className="rounded-full border border-[var(--color-border-dark)] px-3 py-1 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-sand)]">Bathinda</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="eyebrow">Founder section</p>
              <h2 className="mt-4 text-balance font-display text-[36px] leading-[1.08] text-[var(--color-midnight)] md:text-[54px]" style={{ fontWeight: 300 }}>
                Built from Bathinda for businesses that care how they are seen.
              </h2>
              <p className="mt-5 font-sans text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                Kraftt Digital is led by Ketan Goyal, founder, Bathinda, Punjab. The work is shaped for businesses where offline reputation is strong, but the digital system has often been treated as an afterthought.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ['Direct scope', 'No handoff confusion'],
                  ['Owned assets', 'Accounts stay yours'],
                  ['Clear launch', 'Handover included'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-4">
                    <ShieldCheck className="h-4 w-4 text-[var(--color-umber)]" aria-hidden="true" />
                    <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-midnight)]">{title}</p>
                    <p className="mt-1 font-sans text-xs leading-relaxed text-[var(--color-text-secondary)]">{body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={`mailto:${siteConfig.contact.email}`} className="agency-magnetic rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-midnight)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]">
                  {siteConfig.contact.email}
                </a>
                {siteConfig.social.linkedin && (
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="agency-magnetic inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-parchment)] hover:bg-[var(--color-umber)]">
                    LinkedIn <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd grid gap-8 rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
          <Reveal>
            <p className="eyebrow">Services and pricing</p>
            <h2 className="mt-4 max-w-3xl text-balance font-display text-[36px] leading-[1.08] md:text-[54px]" style={{ fontWeight: 300 }}>
              See every service, package, timeline and starting investment.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <Link to="/services" className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-parchment)] hover:bg-[var(--color-umber)]">
              View Services & Pricing <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--color-parchment)] py-16 md:py-24">
        <div className="container-kd grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">FAQs</p>
            <h2 className="mt-4 text-balance font-display text-[36px] leading-[1.08] text-[var(--color-midnight)] md:text-[54px]" style={{ fontWeight: 300 }}>
              Before you request an audit
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5 md:p-7">
            <FAQAccordion items={homeFaqs} />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--color-bg-dark)] py-16 text-[var(--color-text-on-dark)] md:py-24">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-10" aria-hidden="true" />
        <div className="container-kd relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <p className="eyebrow text-[var(--color-sand)]">Final CTA</p>
            <h2 className="mt-4 max-w-3xl text-balance font-display text-[40px] leading-[1.04] md:text-[64px]" style={{ fontWeight: 300 }}>
              Let your online presence carry the same weight as your real reputation.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link to="/contact" onClick={() => trackEvent('final_cta_click', { location: 'home_final' })} className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-linen)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-midnight)] hover:bg-[var(--color-sand)]">
              Get My Digital Audit <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={whatsappAuditHref} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { location: 'home_final' })} className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-border-dark)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-text-on-dark)] hover:border-[var(--color-sand)] hover:text-[var(--color-sand)]">
              Discuss Your Business <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
