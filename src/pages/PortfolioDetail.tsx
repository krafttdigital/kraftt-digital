import { Link, Navigate, useParams } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { PortfolioProject } from '@/types';
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Code2,
  ExternalLink,
  FileText,
  MessageCircle,
  Search,
  Sparkles,
  Target,
} from 'lucide-react';
import { CaseStudyVisual } from '@/components/portfolio/CaseStudyVisual';
import { SEO } from '@/components/seo/SEO';
import { Reveal } from '@/components/motion/Reveal';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/ui/CTASection';
import { getProjectBySlug } from '@/data/portfolio';

export default function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) return <Navigate to="/404" replace />;

  const hasLiveProjectUrl = Boolean(project.projectUrl && project.projectUrl !== '#');
  const overview = [
    { label: 'Challenge', title: 'What had to be solved', copy: project.challenge, icon: Target },
    { label: 'Strategy', title: 'How the experience was shaped', copy: project.strategy, icon: Sparkles },
    { label: 'Solution', title: 'What shipped', copy: project.solution, icon: BadgeCheck },
  ];

  return (
    <>
      <SEO title={project.title} description={project.challenge} path={`/portfolio/${project.slug}`} />

      <header className="agency-star-panel relative overflow-hidden pt-[118px] pb-14 md:pt-[102px] md:pb-20">
        <div className="kd-hero-grid absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,10,11,0.84),rgba(9,10,11,0.52),rgba(9,10,11,0.9))]" aria-hidden="true" />
        <div className="container-kd relative z-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(460px,1fr)] lg:items-center">
            <Reveal className="min-w-0 max-w-[calc(100vw-2.5rem)] sm:max-w-none">
              <Breadcrumbs items={[{ name: 'Portfolio', path: '/portfolio' }, { name: project.client, path: `/portfolio/${project.slug}` }]} light />
              <p className="eyebrow mt-6 text-[var(--color-sand)]">{project.industry}</p>
              <h1 className="mt-4 max-w-[12ch] break-words font-display text-[34px] leading-[1.06] text-[var(--color-linen)] sm:max-w-2xl md:text-[38px]">
                {project.title}
              </h1>
              <p
                className="mt-5 block w-[calc(100vw-2.5rem)] max-w-none break-words font-sans text-[15px] leading-relaxed text-[var(--color-dusk)] [overflow-wrap:anywhere] md:hidden"
                style={{ width: 'min(100%, calc(100vw - 2.5rem))', maxWidth: 'calc(100vw - 2.5rem)', overflowWrap: 'anywhere' }}
              >
                <span className="block">Custom ecommerce launch:</span>
                <span className="block">UI/UX, products, mockups,</span>
                <span className="block">WhatsApp orders, SEO/AEO,</span>
                <span className="block">JSON-LD, Search Console, Clarity.</span>
              </p>
              <p className="mt-5 hidden max-w-2xl font-sans text-[15px] leading-relaxed text-[var(--color-dusk)] md:block">
                {project.solution}
              </p>

              <div
                className="mt-8 flex w-[calc(100vw-2.5rem)] flex-col gap-3 sm:w-auto sm:flex-row"
                style={{ width: 'min(100%, calc(100vw - 4rem))', maxWidth: 'calc(100vw - 4rem)' }}
              >
                {hasLiveProjectUrl ? (
                  <Button href={project.projectUrl} variant="primary">
                    Open live project <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </Button>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-umber)] bg-[var(--color-umber)] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-midnight)] shadow-[0_12px_35px_rgba(167,127,78,0.28)]">
                    Project link placeholder <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
                <Link
                  to="/contact"
                  className="agency-magnetic inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-white/20 bg-white/[0.055] px-5 py-3 font-sans text-sm font-medium tracking-wide text-[var(--color-linen)] hover:border-[var(--color-umber)] hover:text-[var(--color-sand)]"
                >
                  Build something similar <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <CaseStudyVisual project={project} variant="hero" className="max-w-full" />
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="mt-10 grid overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.045] backdrop-blur md:grid-cols-4">
              {(project.metrics ?? []).map((metric) => (
                <div key={metric.label} className="border-b border-white/10 px-5 py-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                  <span className="block font-display text-3xl leading-none text-[var(--color-linen)]">{metric.value}</span>
                  <span className="mt-2 block font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--color-dusk)]">{metric.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      <section className="agency-section-light relative overflow-hidden py-16 md:py-24">
        <div className="container-kd relative z-10">
          <div className="grid gap-6 lg:grid-cols-3">
            {overview.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} delay={index * 0.06}>
                  <article className="agency-glass-light h-full rounded-[var(--radius-card)] p-6">
                    <div className="flex items-center justify-between gap-4">
                      <p className="eyebrow text-[var(--color-umber)]">{item.label}</p>
                      <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-[var(--color-bone)] bg-white/70 text-[var(--color-umber)]">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    <h2 className="mt-5 font-display text-2xl leading-tight text-[var(--color-midnight)]">{item.title}</h2>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--color-midnight)]/70">{item.copy}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="agency-connector relative overflow-hidden py-16 md:py-24">
        <div className="kd-hero-grid absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="container-kd relative z-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="agency-glass-dark rounded-[var(--radius-card)] p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.055] text-[var(--color-sand)]">
                    <Code2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="eyebrow text-[var(--color-sand)]">Tools and systems</p>
                    <h2 className="font-display text-3xl leading-tight text-[var(--color-linen)]">The stack behind the launch</h2>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.tools?.map((tool) => (
                    <span key={tool} className="rounded-full border border-white/10 bg-black/22 px-3 py-2 font-sans text-xs text-[var(--color-dusk)]">
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <InfoTile icon={<Clock3 className="h-4 w-4" aria-hidden="true" />} label="Timeline" value={project.timeline} />
                  <InfoTile icon={<FileText className="h-4 w-4" aria-hidden="true" />} label="Services" value={`${project.services.length} scopes`} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="agency-glass-dark rounded-[var(--radius-card)] p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.055] text-[var(--color-sand)]">
                    <Search className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="eyebrow text-[var(--color-sand)]">Challenges solved</p>
                    <h2 className="font-display text-3xl leading-tight text-[var(--color-linen)]">From blank brand to measurable storefront</h2>
                  </div>
                </div>
                <div className="mt-7 grid gap-3 md:grid-cols-2">
                  {project.challenges?.map((challenge) => (
                    <div key={challenge} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
                      <CheckCircle2 className="h-4 w-4 text-[var(--color-signal)]" aria-hidden="true" />
                      <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-dusk)]">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="agency-section-light relative overflow-hidden py-16 md:py-24">
        <div className="container-kd relative z-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.82fr]">
            <Reveal>
              <div>
                <p className="eyebrow text-[var(--color-umber)]">What was built</p>
                <h2 className="mt-3 max-w-2xl font-display text-[34px] leading-[1.08] text-[var(--color-midnight)] md:text-[46px]">
                  A complete commerce and visibility system.
                </h2>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {project.deliverables.map((deliverable) => (
                    <div key={deliverable} className="flex items-start gap-3 rounded-[8px] border border-[var(--color-bone)] bg-white/64 p-4">
                      <BadgeCheck className="mt-0.5 h-4 w-4 flex-none text-[var(--color-umber)]" aria-hidden="true" />
                      <span className="font-sans text-sm leading-relaxed text-[var(--color-midnight)]/70">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <aside className="agency-glass-light rounded-[var(--radius-card)] p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-[var(--color-bone)] bg-white/70 text-[var(--color-umber)]">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="eyebrow text-[var(--color-umber)]">Integrations</p>
                    <h3 className="font-display text-3xl leading-tight text-[var(--color-midnight)]">Commerce, search and tracking</h3>
                  </div>
                </div>
                <div className="mt-7 space-y-3">
                  {project.integrations?.map((integration) => (
                    <div key={integration} className="flex items-start gap-3 border-b border-[var(--color-bone)] pb-3 last:border-b-0 last:pb-0">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[var(--color-forest)]" aria-hidden="true" />
                      <span className="font-sans text-sm leading-relaxed text-[var(--color-midnight)]/70">{integration}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="agency-connector relative overflow-hidden py-16 md:py-24">
        <div className="container-kd relative z-10">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow text-[var(--color-sand)]">Case study gallery</p>
              {/* <h2 className="mt-3 font-display text-[34px] leading-[1.08] text-[var(--color-linen)] md:text-[46px]">
                Designed panels you can replace with real screenshots later.
              </h2> */}
            </div>
          </Reveal>

          <div className="mt-9 grid gap-6 lg:grid-cols-3">
            {project.gallery?.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="agency-depth-card agency-glass-dark overflow-hidden rounded-[var(--radius-card)]">
                  <div className="relative min-h-[260px] overflow-hidden border-b border-white/10 bg-black/28">
                    <GalleryImagePanel item={item} projectTitle={project.title} />
                    <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--color-sand)]">
                      {item.label}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-2xl leading-tight text-[var(--color-linen)]">{item.title}</h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-dusk)]">{item.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="agency-section-light relative overflow-hidden py-16 md:py-24">
        <div className="container-kd relative z-10">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1fr] lg:items-start">
            <Reveal>
              <div className="agency-glass-light rounded-[var(--radius-card)] p-6 md:p-8">
                <p className="eyebrow text-[var(--color-umber)]">Outcome</p>
                <h2 className="mt-3 font-display text-[34px] leading-[1.08] text-[var(--color-midnight)] md:text-[44px]">
                  Built as a working digital ecosystem.
                </h2>
                {project.results && <p className="mt-5 font-sans text-sm leading-relaxed text-[var(--color-midnight)]/70">{project.results}</p>}
              </div>
            </Reveal>

            {project.testimonial && (
              <Reveal delay={0.08}>
                <blockquote className="agency-glass-light rounded-[var(--radius-card)] border-l-2 border-[var(--color-umber)] p-6 font-display text-2xl italic leading-snug text-[var(--color-midnight)] md:p-8 md:text-3xl">
                  "{project.testimonial}"
                </blockquote>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <CTASection
        title={<>Have a similar project in mind?</>}
        description="Bring the brand, store, SEO, AEO, product content and conversion flow into one scoped launch plan."
      />
    </>
  );
}

function InfoTile({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
      <span className="text-[var(--color-sand)]">{icon}</span>
      <span className="mt-3 block font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--color-dusk)]">{label}</span>
      <span className="mt-1 block font-display text-2xl leading-tight text-[var(--color-linen)]">{value}</span>
    </div>
  );
}

function GalleryImagePanel({
  item,
  projectTitle,
}: {
  item: NonNullable<PortfolioProject['gallery']>[number];
  projectTitle: string;
}) {
  if (!item.imageUrl) {
    return <div className="absolute inset-0 agency-star-panel" aria-hidden="true" />;
  }

  return (
    <div className="absolute inset-0">
      <img
        src={item.imageUrl}
        alt={`${projectTitle} - ${item.title} desktop view`}
        className="h-full w-full object-cover object-top opacity-90"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,4,5,0.08),rgba(3,4,5,0.56))]" aria-hidden="true" />
      {item.mobileImageUrl && (
        <div className="absolute bottom-4 right-4 w-[28%] min-w-[76px] overflow-hidden rounded-[12px] border border-white/18 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.46)]">
          <img
            src={item.mobileImageUrl}
            alt={`${projectTitle} - ${item.title} mobile view`}
            className="aspect-[9/16] w-full object-cover object-top"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
