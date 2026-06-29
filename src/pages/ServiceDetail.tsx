import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowUpRight, Check, ExternalLink } from 'lucide-react';
import { CaseStudyVisual } from '@/components/portfolio/CaseStudyVisual';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildServiceSchema, buildFaqSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PricingCard } from '@/components/ui/PricingCard';
import { ProcessTimeline } from '@/components/ui/ProcessTimeline';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTASection } from '@/components/ui/CTASection';
import { EmptyState } from '@/components/ui/EmptyState';
import { DynamicIcon } from '@/utils/icons';
import { getCategoryBySlug, serviceCategories } from '@/data/services';
import { portfolioProjects } from '@/data/portfolio';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;

  if (!category) return <Navigate to="/404" replace />;

  const relatedCategories = category.relatedSlugs.map((s) => serviceCategories.find((c) => c.slug === s)).filter(Boolean);
  const relatedProjects = portfolioProjects.filter((p) => p.serviceIds?.includes(category.id));

  return (
    <>
      <SEO
        title={category.name}
        description={category.heroSummary}
        path={`/services/${category.slug}`}
      />
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

      <header className="agency-star-panel relative overflow-hidden pt-[120px] pb-16">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-10" aria-hidden="true" />
        <div className="container-kd relative z-10">
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }, { name: category.name, path: `/services/${category.slug}` }]} light />
          <div className="flex items-center gap-3 mt-6 mb-4">
            <DynamicIcon name={category.icon} className="w-6 h-6 text-[var(--color-umber)]" />
            <span className="eyebrow">{category.name}</span>
          </div>
          <h1 className="text-balance font-display text-[34px] md:text-[48px] leading-[1.12] text-[var(--color-linen)] max-w-3xl" style={{ fontWeight: 300 }}>
            {category.heroSummary}
          </h1>
        </div>
      </header>

      {/* Problems solved / Ideal clients */}
      <section className="agency-section-dark py-16 md:py-20">
        <div className="container-kd grid md:grid-cols-2 gap-12">
          <div className="agency-glass-dark rounded-[var(--radius-card)] border border-white/10 p-6">
            <h2 className="font-display text-2xl text-[var(--color-linen)] mb-5" style={{ fontWeight: 400 }}>
              What this solves
            </h2>
            <ul className="space-y-3">
              {category.problemsSolved.map((p) => (
                <li key={p} className="flex items-start gap-2.5 font-sans text-sm text-[var(--color-dusk)] leading-relaxed">
                  <Check className="w-4 h-4 text-[var(--color-signal)] mt-0.5 shrink-0" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="agency-glass-dark rounded-[var(--radius-card)] border border-white/10 p-6">
            <h2 className="font-display text-2xl text-[var(--color-linen)] mb-5" style={{ fontWeight: 400 }}>
              Who this is for
            </h2>
            <ul className="space-y-3">
              {category.idealClients.map((p) => (
                <li key={p} className="flex items-start gap-2.5 font-sans text-sm text-[var(--color-dusk)] leading-relaxed">
                  <Check className="w-4 h-4 text-[var(--color-umber)] mt-0.5 shrink-0" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="agency-section-dark py-16 md:py-20">
        <div className="container-kd">
          <SectionHeading eyebrow="Deliverables" title="What you actually receive" light />
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {category.deliverables.map((d) => (
              <div key={d} className="agency-glass-dark rounded-[var(--radius-card)] border border-white/10 p-5">
                <p className="font-sans text-sm text-[var(--color-dusk)] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="agency-section-dark py-16 md:py-20">
        <div className="container-kd grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20">
          <SectionHeading eyebrow="Process" title="How a project runs" light />
          <ProcessTimeline steps={category.process} />
        </div>
      </section>

      {/* Packages */}
      <section className="agency-section-dark py-16 md:py-20">
        <div className="container-kd">
          <SectionHeading eyebrow="Pricing" title="Packages & pricing" align="center" light />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.06}>
                <PricingCard pkg={pkg} category={category} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related portfolio work */}
      <section className="agency-section-dark py-16 md:py-20">
        <div className="container-kd">
          <SectionHeading eyebrow="Related work" title="Projects using this service" light />
          <div className="mt-8">
            {relatedProjects.length === 0 ? (
              <EmptyState
                title="No published case studies yet"
                description="Real examples of this service will be added here as projects complete. Browse the package deliverables above for an exact sense of scope."
                tone="dark"
              />
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {relatedProjects.map((project, index) => (
                  <Reveal key={project.slug} delay={index * 0.06}>
                    <article className="agency-depth-card agency-glass-dark group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-umber)]">
                      <CaseStudyVisual project={project} className="aspect-[16/10] rounded-none border-x-0 border-t-0" />
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="eyebrow text-[var(--color-sand)]">{project.industry}</p>
                            <h3 className="mt-2 font-display text-2xl leading-tight text-[var(--color-linen)] transition-colors group-hover:text-[var(--color-sand)]" style={{ fontWeight: 300 }}>
                              {project.client}
                            </h3>
                          </div>
                          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.055] text-[var(--color-sand)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </div>

                        <p className="mt-4 line-clamp-3 font-sans text-sm leading-relaxed text-[var(--color-dusk)]">
                          {project.challenge}
                        </p>

                        <div className="mt-5 grid gap-2">
                          {(project.highlights ?? project.deliverables).slice(0, 3).map((item) => (
                            <span key={item} className="flex items-start gap-2 rounded-[8px] border border-white/10 bg-white/[0.045] px-3 py-2 font-sans text-xs leading-relaxed text-[var(--color-dusk)]">
                              <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-[var(--color-signal)]" aria-hidden="true" />
                              {item}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto pt-5">
                          <div className="flex flex-wrap gap-2">
                            {project.tools?.slice(0, 4).map((tool) => (
                              <span key={tool} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-[var(--color-dusk)]">
                                {tool}
                              </span>
                            ))}
                          </div>

                          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <Link
                              to={`/portfolio/${project.slug}`}
                              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[var(--color-sand)] transition-colors hover:text-[var(--color-linen)]"
                            >
                              View case study
                              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                            {project.projectUrl && project.projectUrl !== '#' ? (
                              <a
                                href={project.projectUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-white/10 bg-white/[0.055] px-3 py-2 font-sans text-xs text-[var(--color-dusk)] transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-sand)]"
                              >
                                Live site
                                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                              </a>
                            ) : null}
                          </div>
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

      {/* Related services */}
      {relatedCategories.length > 0 && (
        <section className="agency-section-dark py-16 md:py-20">
          <div className="container-kd">
            <SectionHeading eyebrow="Pairs well with" title="Related services" light />
            <div className="mt-8 grid sm:grid-cols-3 gap-5">
              {relatedCategories.map((rc) => {
                if (!rc) return null;
                return (
                  <Link
                    key={rc.slug}
                    to={`/services/${rc.slug}`}
                    className="agency-glass-dark group rounded-[var(--radius-card)] border border-white/10 p-6 transition-colors hover:border-[var(--color-umber)]"
                  >
                    <DynamicIcon name={rc.icon} className="w-5 h-5 text-[var(--color-umber)]" />
                    <h3 className="mt-3 font-display text-lg text-[var(--color-linen)] group-hover:text-[var(--color-sand)] transition-colors" style={{ fontWeight: 400 }}>
                      {rc.name}
                    </h3>
                    <p className="mt-1.5 font-sans text-[13px] text-[var(--color-dusk)] leading-relaxed">{rc.shortSummary}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="agency-section-dark py-16 md:py-20">
        <div className="container-kd max-w-2xl">
          <SectionHeading eyebrow="Questions" title="Frequently asked" light />
          <div className="mt-8">
            <FAQAccordion items={category.faqs} tone="dark" />
          </div>
        </div>
      </section>

      <CTASection
        title={<>Ready to scope your {category.name.toLowerCase()} project?</>}
        description="Send a short brief and we'll confirm the right package, exact price, and delivery window."
      />
    </>
  );
}
