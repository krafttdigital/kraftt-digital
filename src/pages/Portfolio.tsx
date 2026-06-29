import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ExternalLink, Filter } from 'lucide-react';
import { CaseStudyVisual } from '@/components/portfolio/CaseStudyVisual';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { VisualEmptyState } from '@/components/ui/VisualEmptyState';
import { portfolioProjects } from '@/data/portfolio';
import { serviceCategories } from '@/data/services';

export default function Portfolio() {
  const [filter, setFilter] = useState<string | 'all'>('all');
  const filtered =
    filter === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.serviceIds?.includes(filter));

  return (
    <>
      <SEO
        title="Portfolio"
        description="Real Kraftt Digital case studies across UI/UX, ecommerce, SEO, AEO, product systems, WhatsApp ordering and conversion-focused websites."
        path="/portfolio"
      />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Portfolio', path: '/portfolio' }])} />

      <PageHero
        breadcrumbs={[{ name: 'Portfolio', path: '/portfolio' }]}
        eyebrow="Portfolio"
        title={<>Case studies with the build system, not just pretty paragraphs.</>}
        description="Each project now carries the visual direction, tools, challenges, conversion paths and technical systems behind the work."
        visual="portfolio"
        stats={[
          { value: String(portfolioProjects.length), label: 'live case study' },
          { value: '10+', label: 'systems tracked' },
          { value: '0', label: 'fake results' },
        ]}
      />

      {portfolioProjects.length > 0 && (
        <section className="agency-section-light border-y border-[var(--color-bone)]/70">
          <div className="container-kd py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[var(--color-umber)]">
                <Filter className="h-3.5 w-3.5" aria-hidden="true" />
                Filter by service
              </div>
              <div className="overflow-x-auto lg:overflow-visible">
                <div className="flex w-max gap-2 lg:w-auto lg:flex-wrap lg:justify-end">
                  <button
                    onClick={() => setFilter('all')}
                    className={`agency-magnetic rounded-[var(--radius-button)] border px-4 py-2 font-sans text-xs whitespace-nowrap transition-colors ${
                      filter === 'all'
                        ? 'border-[var(--color-umber)] bg-[var(--color-umber)] text-[var(--color-midnight)]'
                        : 'border-[var(--color-bone)] bg-white/70 text-[var(--color-midnight)]/70 hover:border-[var(--color-umber)] hover:text-[var(--color-midnight)]'
                    }`}
                  >
                    All work
                  </button>
                  {serviceCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilter(cat.id)}
                      className={`agency-magnetic rounded-[var(--radius-button)] border px-4 py-2 font-sans text-xs whitespace-nowrap transition-colors ${
                        filter === cat.id
                          ? 'border-[var(--color-umber)] bg-[var(--color-umber)] text-[var(--color-midnight)]'
                          : 'border-[var(--color-bone)] bg-white/70 text-[var(--color-midnight)]/70 hover:border-[var(--color-umber)] hover:text-[var(--color-midnight)]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="agency-section-light relative overflow-hidden py-14 md:py-20">
        <div className="kd-hero-grid absolute inset-0 opacity-[0.035]" aria-hidden="true" />
        <div className="container-kd relative z-10">
          {filtered.length === 0 ? (
            <Reveal>
              <VisualEmptyState
                eyebrow="Portfolio runway"
                title="No case studies in this filter yet"
                description="Choose All work to see the available project, or add service IDs to future projects so they appear under the right filter."
                ctaLabel="See all services"
                ctaTo="/services"
                variant="portfolio"
              />
            </Reveal>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
              {filtered.map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.06}>
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="agency-depth-card agency-glass-light group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] hover:border-[var(--color-umber)]"
                  >
                    <CaseStudyVisual project={project} className="aspect-[16/10] rounded-none border-0" />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <p className="eyebrow text-[var(--color-umber)]">{project.industry}</p>
                          <h2 className="mt-3 font-display text-2xl leading-tight text-[var(--color-midnight)] transition-colors group-hover:text-[var(--color-umber)]">
                            {project.title}
                          </h2>
                        </div>
                        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[8px] border border-[var(--color-bone)] bg-white/70 text-[var(--color-umber)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>

                      <p className="mt-4 line-clamp-3 font-sans text-sm leading-relaxed text-[var(--color-midnight)]/68">{project.challenge}</p>

                      <div className="mt-5 grid gap-2">
                        {(project.highlights ?? project.deliverables).slice(0, 4).map((item) => (
                          <span key={item} className="flex items-start gap-2 rounded-[8px] border border-[var(--color-bone)]/70 bg-white/58 px-3 py-2 font-sans text-xs leading-relaxed text-[var(--color-midnight)]/68">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-[var(--color-forest)]" aria-hidden="true" />
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-6">
                        <div className="flex flex-wrap gap-2">
                          {project.tools?.slice(0, 5).map((tool) => (
                            <span key={tool} className="rounded-full border border-[var(--color-bone)] bg-[var(--color-parchment)]/70 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-[var(--color-midnight)]/58">
                              {tool}
                            </span>
                          ))}
                        </div>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <span className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[var(--color-umber)]">
                            View full case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-[var(--color-bone)] bg-white/70 px-3 py-2 font-sans text-xs text-[var(--color-midnight)]/62">
                            Live project <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title={<>Want your project to be the next one featured here?</>}
        description="Tell us what you are building. We will scope the strategy, design, build systems and launch path before anything becomes a case study."
      />
    </>
  );
}
