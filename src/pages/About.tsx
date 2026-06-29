import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Images,
  Layers3,
  MessageCircle,
  MousePointer2,
  PanelsTopLeft,
  Search,
  TrendingUp,
} from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { siteConfig } from '@/config/siteConfig';
import { portfolioProjects } from '@/data/portfolio';
import aboutProofBoard from '../../assets/about-proof-board.svg';
import aboutStudioLab from '../../assets/about-studio-lab.svg';
import aboutWorkflowWall from '../../assets/about-workflow-wall.svg';

const values = [
  {
    title: 'Scope before price',
    body: 'A price without a defined scope is a guess. Every package states exactly what is included before any number is attached to it.',
    icon: FileText,
  },
  {
    title: 'Review before delivery',
    body: 'AI tools speed up production across content, mockups and creative, but nothing reaches a client without a human review pass.',
    icon: BadgeCheck,
  },
  {
    title: 'No invented credibility',
    body: 'We would rather show fewer case studies than fabricated ones. Results and testimonials are published only when they are real.',
    icon: Search,
  },
  {
    title: 'One team, fewer handoffs',
    body: 'The people shaping the scope stay close to the build, so less gets lost between brief, design, development and handover.',
    icon: Layers3,
  },
];

const studioSignals = [
  { label: 'Service lanes', value: '8', icon: PanelsTopLeft },
  { label: 'Fixed packages', value: '24', icon: BriefcaseBusiness },
  { label: 'Currencies', value: '2', icon: BarChart3 },
  { label: 'Fake claims', value: '0', icon: BadgeCheck },
];

const workflowSteps = [
  {
    title: 'Diagnose',
    body: 'The first pass is about the business model, audience, current friction and the exact result the project must create.',
    icon: Search,
  },
  {
    title: 'Map',
    body: 'Pages, flows, content blocks, integrations and handover needs are mapped before design starts.',
    icon: MousePointer2,
  },
  {
    title: 'Build',
    body: 'The work moves in usable pieces: visual system, frontend, content, SEO, forms, ordering paths and analytics.',
    icon: Layers3,
  },
  {
    title: 'Launch',
    body: 'Final delivery includes QA, responsive checks, access handover and the technical setup needed for search and tracking.',
    icon: TrendingUp,
  },
];

const collaborationNotes = [
  'A written scope before work begins',
  'Working previews instead of mystery progress',
  'Clear handover for logins, docs and updates',
  'Async-friendly communication for India and global clients',
];

const featuredProjects = portfolioProjects.slice(0, 3);

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <SEO
        title="About"
        description="Kraftt Digital is a premium digital agency for founders and growing businesses in India and worldwide, building websites, stores, brand systems, SEO, content and internal tools with transparent INR and USD pricing."
        path="/about"
      />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'About', path: '/about' }])} />

      <PageHero
        breadcrumbs={[{ name: 'About', path: '/about' }]}
        eyebrow={`About ${siteConfig.name}`}
        title={<>A digital agency built around clear scope, sharp systems, and exact pricing.</>}
        description="Kraftt Digital is designed for founders and growing teams who want premium execution without vague retainers, fake proof, or handoff chaos."
        visual="about"
        stats={[
          { value: '8', label: 'service lanes' },
          { value: '24', label: 'fixed packages' },
          { value: '0', label: 'fake claims' },
        ]}
      />

      <section className="agency-section-light overflow-hidden py-16 md:py-24">
        <div className="container-kd grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] lg:items-center">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow mb-4 text-[var(--color-umber)]">Studio model</p>
              <h2 className="text-balance font-display text-3xl leading-tight text-[var(--color-midnight)] md:text-5xl" style={{ fontWeight: 300 }}>
                Premium does not mean vague. It means the work is shaped before it is sold.
              </h2>
              <div className="mt-6 space-y-4 font-sans text-[15px] leading-relaxed text-[var(--color-midnight)]/72">
                <p>
                  {siteConfig.name} works across web design, Shopify development, e-commerce SEO, content, dashboards, AI creative, brand identity and social media management for clients in India and internationally.
                </p>
                <p>
                  The agency is built for founders who need a serious digital presence, but still want clarity on scope, price, timeline, deliverables and what happens after launch.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {studioSignals.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      className="agency-glass-light rounded-[var(--radius-card)] p-4"
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Icon className="h-4 w-4 text-[var(--color-umber)]" aria-hidden="true" />
                      <span className="mt-4 block font-display text-3xl text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                        {item.value}
                      </span>
                      <span className="mt-1 block font-sans text-[10px] uppercase leading-tight tracking-[0.14em] text-[var(--color-midnight)]/54">
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <motion.div
              className="agency-depth-card agency-glass-light relative overflow-hidden rounded-[var(--radius-card)] p-3"
              animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={shouldReduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={aboutStudioLab}
                alt="Premium digital agency studio dashboard with website, mobile, content and launch systems."
                className="aspect-[16/11] w-full rounded-[6px] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
                {['Scope', 'Design', 'Launch'].map((item) => (
                  <span key={item} className="rounded-[7px] border border-white/15 bg-black/50 px-3 py-2 text-center font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-linen)] backdrop-blur-xl">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <section className="agency-section-dark overflow-hidden py-16 md:py-24">
        <div className="container-kd">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <SectionHeading
                eyebrow="How the work moves"
                title="A connected workflow from first brief to final handover."
                description="The page design, content, development, conversion path, SEO layer and launch checklist are treated as one system, not as separate jobs stitched together at the end."
                light
              />
              <p className="max-w-2xl font-sans text-sm leading-relaxed text-[var(--color-dusk)] lg:ml-auto">
                This is where the site starts to feel like a premium agency: more visual thinking, fewer empty text blocks, and more evidence that there is a build system behind the brand.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(420px,1fr)_minmax(0,0.92fr)] lg:items-stretch">
            <Reveal delay={0.08}>
              <motion.div
                className="agency-glass-dark relative h-full overflow-hidden rounded-[var(--radius-card)] p-3"
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.012, 1] }}
                transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src={aboutWorkflowWall}
                  alt="Agency workflow wall showing brief, design direction, build cards and launch systems."
                  className="min-h-[360px] w-full rounded-[6px] object-cover"
                />
              </motion.div>
            </Reveal>

            <div className="grid gap-4">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.title} delay={index * 0.06}>
                    <div className="agency-glass-dark group flex gap-4 rounded-[var(--radius-card)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-umber)]">
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.06] text-[var(--color-sand)] transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--color-sand)]">0{index + 1}</span>
                        <h3 className="mt-1 font-display text-xl text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
                          {step.title}
                        </h3>
                        <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--color-dusk)]">{step.body}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="agency-section-light py-16 md:py-24">
        <div className="container-kd">
          <Reveal>
            <SectionHeading
              eyebrow="Working principles"
              title="What makes the agency feel sharp before anything is animated."
              description="Motion and visuals help the brand feel alive, but the premium feeling comes from how the work is scoped, reviewed and delivered."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.title} delay={index * 0.06}>
                  <motion.article
                    className="agency-depth-card agency-glass-light group relative h-full overflow-hidden rounded-[var(--radius-card)] p-6 hover:border-[var(--color-umber)]"
                    whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="absolute inset-0 kd-hero-grid opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.08]" aria-hidden="true" />
                    <div className="relative flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[var(--color-midnight)] text-[var(--color-sand)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="rounded-full border border-[var(--color-bone)] bg-white/70 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-[var(--color-midnight)]/58">
                        Principle
                      </span>
                    </div>
                    <h3 className="relative mt-6 font-display text-2xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                      {value.title}
                    </h3>
                    <p className="relative mt-3 font-sans text-sm leading-relaxed text-[var(--color-midnight)]/68">{value.body}</p>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="agency-section-dark py-16 md:py-24">
        <div className="container-kd">
          <Reveal>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Real work"
                title="The agency story is backed by actual builds."
                description="The About page now pulls visual confidence from real case-study assets instead of relying only on abstract promises."
                light
              />
              <Link
                to="/portfolio"
                className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-button)] border border-white/10 bg-white/[0.06] px-4 py-3 font-sans text-sm text-[var(--color-linen)] transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-sand)]"
              >
                View portfolio
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.07}>
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="agency-depth-card agency-glass-dark group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-umber)]"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-black">
                    <img
                      src={project.imageUrl ?? aboutProofBoard}
                      alt={project.heroImageAlt}
                      className="h-full w-full object-cover object-top opacity-[0.88] transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(3,4,5,0.78))]" aria-hidden="true" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-[7px] border border-white/10 bg-black/42 px-3 py-2 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-sand)] backdrop-blur-xl">
                      <Images className="h-3.5 w-3.5" aria-hidden="true" />
                      Case study
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="eyebrow text-[var(--color-sand)]">{project.industry}</p>
                    <h3 className="mt-3 font-display text-2xl leading-tight text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
                      {project.client}
                    </h3>
                    <p className="mt-3 line-clamp-3 font-sans text-sm leading-relaxed text-[var(--color-dusk)]">
                      {project.challenge}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 font-sans text-sm text-[var(--color-sand)]">
                      See the build
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="agency-section-light overflow-hidden py-16 md:py-24">
        <div className="container-kd grid gap-10 lg:grid-cols-[minmax(420px,0.96fr)_minmax(0,1fr)] lg:items-center">
          <Reveal>
            <motion.div
              className="agency-glass-light relative overflow-hidden rounded-[var(--radius-card)] p-3"
              animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
              transition={shouldReduceMotion ? undefined : { duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={aboutProofBoard}
                alt="Proof board showing growth line, launch checkpoints and measurable delivery systems."
                className="aspect-[4/3] w-full rounded-[6px] object-cover"
              />
              <div className="absolute right-6 top-6 rounded-[7px] border border-white/10 bg-black/50 px-3 py-2 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-linen)] backdrop-blur-xl">
                Proof board
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <SectionHeading
                eyebrow="Working with clients"
                title="A calmer way to move from idea to launched asset."
                description="Projects start with a written brief and end with a defined handover. The goal is to make the process feel controlled, even when the build itself has many moving parts."
              />

              <div className="mt-7 grid gap-3">
                {collaborationNotes.map((item) => (
                  <div key={item} className="agency-glass-light flex items-start gap-3 rounded-[var(--radius-card)] p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[var(--color-forest)]" aria-hidden="true" />
                    <p className="font-sans text-sm leading-relaxed text-[var(--color-midnight)]/72">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-umber)] px-5 py-3 font-sans text-sm font-medium text-[var(--color-midnight)] shadow-[0_16px_42px_rgba(167,127,78,0.28)] transition-colors hover:bg-[var(--color-sand)]"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-bone)] bg-white/70 px-5 py-3 font-sans text-sm text-[var(--color-midnight)]/72 transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-midnight)]"
                >
                  See services
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection title={<>Have a project in mind?</>} description="Send a brief and we will respond with a scoped package, clear price and practical launch path." />
    </>
  );
}
