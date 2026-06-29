import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildOrganizationSchema, buildWebsiteSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { PricingCard } from '@/components/ui/PricingCard';
import { ProcessTimeline } from '@/components/ui/ProcessTimeline';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTASection } from '@/components/ui/CTASection';
import { Marquee } from '@/components/ui/Marquee';
import { Button } from '@/components/ui/Button';
import { PremiumHeroScene } from '@/components/ui/PremiumHeroScene';
import { StudioShowcase } from '@/components/ui/StudioShowcase';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/utils/format';
import { serviceCategories } from '@/data/services';
import { homeFaqs } from '@/data/faqs';
import { siteConfig } from '@/config/siteConfig';

const homeProcess = [
  { title: 'Brief', description: 'A short call to understand the business, the goal, and which service categories actually apply.' },
  { title: 'Scope & price', description: 'A clear proposal mapped to a package or bundle — exact inclusions, exact price, exact delivery window.' },
  { title: 'Design & build', description: 'Work happens in visible stages, with a working link or draft shared before anything is finished in isolation.' },
  { title: 'Launch', description: 'Final QA, domain or platform connection, and handover — with documentation for anything you need to manage yourself.' },
  { title: 'Grow', description: 'For ongoing services — SEO, social, retainers — work continues monthly with reporting, not a one-off handoff.' },
];

const marqueeMessages = [
  'Websites that load fast.',
  'Stores that take orders.',
  'Brands that hold together.',
  'Priced in INR or USD.',
  'No fake statistics. No filler.',
];

export default function Home() {
  const { currency } = useCurrency();
  const shouldReduceMotion = useReducedMotion();
  const entryPrice = serviceCategories[0].packages[0].price;
  const formattedEntry = formatPrice(entryPrice, currency);

  // A representative spread of packages for the pricing preview — one
  // entry-level package from four different categories, not four tiers
  // of the same thing.
  const previewPackages = [
    serviceCategories.find((c) => c.id === 'web')!.packages[1],
    // serviceCategories.find((c) => c.id === 'shopify')!.packages[0],
    serviceCategories.find((c) => c.id === 'social')!.packages[0],
    serviceCategories.find((c) => c.id === 'brand')!.packages[1],
  ];

  return (
    <>
      <SEO
        title={`${siteConfig.name} — Websites, Shopify Stores & Brand Identity`}
        description={siteConfig.description}
        path="/"
      />
      <JsonLd data={[buildOrganizationSchema(), buildWebsiteSchema()]} />

      {/* ---------------- HERO ---------------- */}
      <section className="agency-star-panel relative overflow-hidden pt-[128px] pb-14 md:pt-[160px] md:pb-20 lg:min-h-[720px]">
        <PremiumHeroScene />
        <div className="container-kd relative z-10">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex flex-wrap gap-2">
              {['Websites', 'Shopify', 'Brand systems', 'Growth'].map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[6px] border border-white/10 bg-white/[0.06] px-3 py-1.5 font-sans text-xs text-[var(--color-linen)] backdrop-blur"
                >
                  {item}
                </motion.span>
              ))}
            </div>
            <p className="eyebrow mb-6 text-[var(--color-sand)]">Premium digital agency - India &amp; worldwide</p>
            <h1 className="text-balance font-display text-[42px] leading-[1.02] text-[var(--color-linen)] sm:text-[56px] md:text-[72px]" style={{ fontWeight: 300 }}>
              Digital systems that look sharp, load fast, and turn attention into <em>action</em>.
            </h1>
            <p className="mt-7 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-dusk)] md:text-lg">
              Kraftt Digital designs and builds websites, Shopify stores and brand identities for founders and growing
              businesses - in India and worldwide, billed in INR or USD, with exact pricing on every package.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button to="/contact" variant="primary">
                Start a project <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Button>
              <Button to="/services" variant="secondary" className="border-white/20 text-[var(--color-linen)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]">
                See pricing
              </Button>
            </div>
            <div className="mt-10 grid w-full max-w-xl min-w-0 grid-cols-3 overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] backdrop-blur">
              {[
                ['24', 'fixed packages'],
                ['8', 'connected services'],
                ['2', 'currencies'],
              ].map(([value, label]) => (
                <div key={label} className="min-w-0 border-r border-white/10 px-3 py-4 last:border-r-0 sm:px-4">
                  <span className="block font-display text-3xl text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
                    {value}
                  </span>
                  <span className="mt-1 block break-words font-sans text-[8px] uppercase leading-tight tracking-[0.1em] text-[var(--color-dusk)] sm:text-[11px] sm:tracking-[0.16em]">{label}</span>
                </div>
              ))}
            </div>
            {formattedEntry && (
              <p className="mt-6 font-sans text-xs text-[var(--color-dusk)]">
                Websites start from <span className="text-[var(--color-linen)] font-medium">{formattedEntry}</span>. Switch currency in the navigation.
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <Marquee items={marqueeMessages} />

      {/* ---------------- SELECTED SERVICES ---------------- */}
      <section className=" py-20 md:py-28">
        <div className="container-kd">
          <Reveal>
            <SectionHeading
              eyebrow="What we build"
              title="Eight service categories. One team that ties them together."
              description="Each one is priced exactly, in INR and USD, with the deliverables listed up front — not summarised behind a 'contact us for pricing' form."
              light
            />
          </Reveal>
          <div className="mt-10">
            {serviceCategories.map((cat, index) => (
              <Reveal key={cat.id} delay={index * 0.04}>
                <ServiceCard category={cat} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PHILOSOPHY ---------------- */}
      <section className="agency-section-light py-20 md:py-28">
        <div className="container-kd grid md:grid-cols-2 gap-12 md:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="Strategy, design and development run as one process — not three handoffs."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-6 font-sans text-[15px] text-[var(--color-midnight)]/75 leading-relaxed">
              <p>
                Most agencies separate strategy, design and build into different teams, with a brief passed down the
                chain and detail lost at every handoff. We keep the same people across discovery, design and
                development for a project, so the reasoning behind a decision survives all the way to launch.
              </p>
              <p>
                AI tools are used deliberately — to speed up production on ad creatives, mockups and first-draft
                copy — but every output is reviewed and finished by our team before it reaches you. Speed comes from
                process, not from skipping the review.
              </p>
              <p>
                This is best suited to founders and growing businesses who want clear scope and a fixed price before
                work starts, rather than an open-ended retainer with no defined deliverables.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- STUDIO OUTPUT ---------------- */}
      <section className=" py-20 md:py-28">
        <div className="container-kd">
          <Reveal>
            <SectionHeading
              eyebrow="Studio output"
              title="The systems clients hire us to ship."
              description="No invented case studies, no placeholder logos. These previews show the actual service combinations Kraftt Digital builds across launch, commerce, creative and growth work."
              light
              align="center"
            />
          </Reveal>
          <div className="mt-10">
            <StudioShowcase />
          </div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className="agency-section-light py-20 md:py-28">
        <div className="container-kd grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Process" title="Five stages, the same across every service category." />
          </Reveal>
          <ProcessTimeline steps={homeProcess} />
        </div>
      </section>

      {/* ---------------- PRICING PREVIEW ---------------- */}
      <section className="agency-section-dark py-20 md:py-15">
        <div className="container-kd">
          <Reveal>
            <SectionHeading
              eyebrow="Pricing"
              title="A sample across four categories — every package is on the Services page."
              align="center"
            />
          </Reveal>
          <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {previewPackages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.05}>
                <PricingCard pkg={pkg} ctaPath="/contact" />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button to="/services" variant="ghost">
              See every package and bundle deal <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------- WHY CHOOSE KRAFTT DIGITAL ---------------- */}
      <section className=" py-20 md:py-28">
        <div className="container-kd">
          <Reveal>
            <SectionHeading
              eyebrow="Why Kraftt Digital"
              title="What's actually different — not the usual agency claims."
              light
            />
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-[var(--radius-card)] overflow-hidden">
            {[
              {
                title: 'Two prices, set upfront',
                body: 'Every package shows an INR and a USD price before you ever get on a call — not a "request a quote" form.',
              },
              {
                title: 'Exact deliverables, not summaries',
                body: 'Page counts, product limits, post counts and revision rounds are listed per package, not folded into vague language.',
              },
              {
                title: 'Eight categories, one team',
                body: 'Web, Shopify, content, brand, dashboards, AI creative, SEO and social are built to combine into a single bundle, not outsourced separately.',
              },
              {
                title: 'Delivery windows, stated',
                body: 'From 2–3 days for an AI creative pack to 25–35 days for a full internal software suite — every package states its own timeline.',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05} className="bg-[var(--color-midnight)] p-7">
                <h3 className="font-display text-lg text-[var(--color-linen)]" style={{ fontWeight: 400 }}>
                  {item.title}
                </h3>
                <p className="mt-2.5 font-sans text-sm text-[var(--color-dusk)] leading-relaxed">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="agency-section-light py-20 md:py-28">
        <div className="container-kd max-w-2xl">
          <Reveal>
            <SectionHeading eyebrow="Questions" title="Before you get in touch" />
          </Reveal>
          <div className="mt-8">
            <FAQAccordion items={homeFaqs} />
          </div>
        </div>
      </section>

      <CTASection
        title={<>Tell us what you're building. We'll tell you exactly what it costs.</>}
        description="A short brief is all it takes to get a scoped package and a fixed price — no obligation, no generic sales call."
      />
    </>
  );
}
