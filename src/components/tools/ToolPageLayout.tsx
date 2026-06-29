import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTASection } from '@/components/ui/CTASection';
import { DynamicIcon } from '@/utils/icons';
import { getToolBySlug } from '@/data/tools';
import { serviceCategories } from '@/data/services';
import { blogPosts } from '@/data/blog';
import type { ServiceFAQ } from '@/types';

interface ToolPageLayoutProps {
  slug: string;
  h1: string;
  intro: string;
  calculator: ReactNode;
  formulaExplanation: ReactNode;
  example: ReactNode;
  interpretation: ReactNode;
  faqs: ServiceFAQ[];
  disclaimer?: string;
}

export function ToolPageLayout({ slug, h1, intro, calculator, formulaExplanation, example, interpretation, faqs, disclaimer }: ToolPageLayoutProps) {
  const tool = getToolBySlug(slug);
  if (!tool) return null;

  const relatedTools = tool.relatedToolSlugs.map((s) => getToolBySlug(s)).filter(Boolean);
  const relatedService = tool.relatedServiceSlug ? serviceCategories.find((c) => c.slug === tool.relatedServiceSlug) : undefined;
  const relatedBlogPosts = blogPosts.filter((p) => p.relatedToolSlugs.includes(slug));

  return (
    <>
      <SEO title={tool.name} description={tool.description} path={`/tools/${slug}`} />
      <JsonLd
        data={[
          buildBreadcrumbSchema([{ name: 'Tools', path: '/tools' }, { name: tool.shortName, path: `/tools/${slug}` }]),
          buildToolSchema({ name: tool.name, description: tool.description, path: `/tools/${slug}` }),
          buildFaqSchema(faqs),
        ]}
      />

      <header className="agency-star-panel relative overflow-hidden pt-[120px] pb-14">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-10" aria-hidden="true" />
        <div className="container-kd relative z-10">
          <Breadcrumbs items={[{ name: 'Tools', path: '/tools' }, { name: tool.shortName, path: `/tools/${slug}` }]} light />
          <div className="flex items-center gap-3 mt-6 mb-4">
            <DynamicIcon name={tool.icon} className="w-6 h-6 text-[var(--color-umber)]" />
            <span className="eyebrow">{tool.category}</span>
          </div>
          <h1 className="text-balance font-display text-[30px] md:text-[42px] leading-[1.15] text-[var(--color-linen)] max-w-2xl" style={{ fontWeight: 300 }}>
            {h1}
          </h1>
          <p className="mt-5 font-sans text-[15px] text-[var(--color-dusk)] max-w-xl leading-relaxed">{intro}</p>
        </div>
      </header>

      {/* Calculator */}
      <section className="agency-section-dark py-10 md:py-12">
        <div className="container-kd max-w-5xl">
          <div className="tool-calculator-surface agency-glass-dark rounded-[var(--radius-card)] border border-white/10 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.32)] md:p-7">{calculator}</div>
        </div>
      </section>

      {/* Formula explanation */}
      <section className="agency-section-dark py-10 md:py-12">
        <div className="container-kd max-w-3xl">
          <Reveal className="agency-glass-dark rounded-[var(--radius-card)] border border-white/10 p-6 md:p-7">
            <SectionHeading eyebrow="How this is calculated" title="The formula behind the result" light />
            <div className="mt-6 font-sans text-[15px] text-[var(--color-dusk)] leading-relaxed space-y-3">{formulaExplanation}</div>
          </Reveal>
        </div>
      </section>

      {/* Example */}
      <section className="agency-section-dark py-10 md:py-12">
        <div className="container-kd max-w-3xl">
          <Reveal className="agency-glass-dark rounded-[var(--radius-card)] border border-white/10 p-6 md:p-7">
            <SectionHeading eyebrow="Worked example" title="A sample calculation" light />
            <div className="mt-6 font-sans text-[15px] text-[var(--color-dusk)] leading-relaxed space-y-3">{example}</div>
          </Reveal>
        </div>
      </section>

      {/* Interpretation */}
      <section className="agency-section-dark py-10 md:py-12">
        <div className="container-kd max-w-3xl">
          <Reveal className="agency-glass-dark rounded-[var(--radius-card)] border border-white/10 p-6 md:p-7">
            <SectionHeading eyebrow="Reading the result" title="What this number actually tells you" light />
            <div className="mt-6 font-sans text-[15px] text-[var(--color-dusk)] leading-relaxed space-y-3">{interpretation}</div>
          </Reveal>
          {disclaimer && (
            <p className="mt-6 font-sans text-xs text-[var(--color-dusk)]/80 border-l-2 border-[var(--color-umber)] pl-4 max-w-3xl">{disclaimer}</p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="agency-section-dark py-10 md:py-12">
        <div className="container-kd max-w-2xl">
          <Reveal>
            <SectionHeading eyebrow="Questions" title="Frequently asked" light />
          </Reveal>
          <div className="mt-6">
            <FAQAccordion items={faqs} tone="dark" />
          </div>
        </div>
      </section>

      {/* Related tools / services / blog */}
      <section className="agency-section-dark py-10 md:py-12">
        <div className="container-kd grid md:grid-cols-3 gap-10">
          <div>
            <h2 className="eyebrow mb-4">Related tools</h2>
            <ul className="space-y-2.5">
              {relatedTools.map((t) => (
                <li key={t!.slug}>
                  <Link to={`/tools/${t!.slug}`} className="font-sans text-sm text-[var(--color-dusk)] hover:text-[var(--color-sand)]">
                    {t!.shortName} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {relatedService && (
            <div>
              <h2 className="eyebrow mb-4">Related service</h2>
              <Link to={`/services/${relatedService.slug}`} className="font-sans text-sm text-[var(--color-dusk)] hover:text-[var(--color-sand)]">
                {relatedService.name} →
              </Link>
            </div>
          )}
          {relatedBlogPosts.length > 0 && (
            <div>
              <h2 className="eyebrow mb-4">Related reading</h2>
              <ul className="space-y-2.5">
                {relatedBlogPosts.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/blog/${p.slug}`} className="font-sans text-sm text-[var(--color-dusk)] hover:text-[var(--color-sand)]">
                      {p.title} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <CTASection
        eyebrow="Beyond the calculator"
        title={<>Want this handled for you?</>}
        description="If the numbers above point to a real project, we can scope it against an exact package and price."
      />
    </>
  );
}
