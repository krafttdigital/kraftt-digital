import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BadgeCheck, Calculator, Check, FileText, ShieldCheck } from 'lucide-react';
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
import type { ServiceFAQ, ToolMeta } from '@/types';

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

const toolTrust = [
  'Runs in your browser',
  'Useful for Indian planning',
  'Built for quick decisions',
];

function getToolAngle(tool: ToolMeta) {
  if (tool.category === 'Agency planning') {
    return {
      eyebrow: 'Project planning tool',
      title: 'Use the number to choose a realistic scope, not just a rough budget.',
      points: ['Maps inputs to practical agency decisions', 'Connects directly to related Kraftt services', 'Useful before a discovery call or WhatsApp enquiry'],
    };
  }
  if (tool.category === 'Marketing math') {
    return {
      eyebrow: 'Marketing decision tool',
      title: 'Estimate whether growth activity has room to pay for itself.',
      points: ['Clarifies revenue, spend and conversion assumptions', 'Helps compare paid and organic growth', 'Best used with conservative Indian market assumptions'],
    };
  }
  if (tool.category === 'Business math') {
    return {
      eyebrow: 'Business clarity tool',
      title: 'Turn everyday Indian business numbers into a cleaner decision.',
      points: ['Useful before pricing, quoting or invoicing', 'Keeps the calculation visible and explainable', 'Pairs well with content, website and reporting systems'],
    };
  }
  return {
    eyebrow: 'Financial planning tool',
    title: 'Plan with numbers you can explain before you commit.',
    points: ['Built for quick personal finance estimates', 'Shows assumptions clearly', 'Useful for INR-first planning with currency support'],
  };
}

export function ToolPageLayout({ slug, h1, intro, calculator, formulaExplanation, example, interpretation, faqs, disclaimer }: ToolPageLayoutProps) {
  const tool = getToolBySlug(slug);
  if (!tool) return null;

  const relatedTools = tool.relatedToolSlugs.map((s) => getToolBySlug(s)).filter((t): t is ToolMeta => Boolean(t));
  const relatedService = tool.relatedServiceSlug ? serviceCategories.find((c) => c.slug === tool.relatedServiceSlug) : undefined;
  const relatedBlogPosts = blogPosts.filter((p) => p.relatedToolSlugs.includes(slug));
  const angle = getToolAngle(tool);

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

      <header className="relative overflow-hidden bg-[var(--color-parchment)] pt-[118px] pb-14 text-[var(--color-midnight)] md:pt-[138px] md:pb-20">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-20" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-[var(--color-bg-secondary)]" aria-hidden="true" />

        <div className="container-kd relative z-10">
          <Breadcrumbs items={[{ name: 'Tools', path: '/tools' }, { name: tool.shortName, path: `/tools/${slug}` }]} />

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-stretch">
            <Reveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-4 py-2 shadow-[0_14px_42px_rgba(13,13,13,0.06)]">
                <DynamicIcon name={tool.icon} className="h-4 w-4 text-[var(--color-umber)]" />
                <span className="eyebrow text-[var(--color-umber)]">{tool.category}</span>
              </div>
              <h1 className="mt-6 max-w-4xl text-balance font-display text-[40px] leading-[1.02] md:text-[64px]" style={{ fontWeight: 300 }}>
                {h1}
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">{intro}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {toolTrust.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-3 py-2 font-sans text-xs text-[var(--color-text-secondary)]">
                    <BadgeCheck className="h-3.5 w-3.5 text-[var(--color-umber)]" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <aside className="h-full rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5 shadow-[0_28px_90px_rgba(13,13,13,0.1)]">
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow text-[var(--color-umber)]">{angle.eyebrow}</p>
                  <Calculator className="h-5 w-5 text-[var(--color-umber)]" aria-hidden="true" />
                </div>
                <h2 className="mt-5 font-display text-3xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                  {angle.title}
                </h2>
                <div className="mt-6 grid gap-3">
                  {angle.points.map((point) => (
                    <div key={point} className="flex items-start gap-3 rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-parchment)] p-4">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-umber)]" aria-hidden="true" />
                      <p className="font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{point}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="agency-section-light py-12 md:py-16">
        <div className="container-kd max-w-6xl">
          <Reveal className="tool-calculator-surface rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5 shadow-[0_28px_90px_rgba(13,13,13,0.08)] md:p-7">
            {calculator}
          </Reveal>
        </div>
      </section>

      <section className="agency-section-light py-12 md:py-16">
        <div className="container-kd grid gap-5 lg:grid-cols-3">
          <ExplainCard eyebrow="How this is calculated" title="Formula" icon={<Calculator className="h-5 w-5" aria-hidden="true" />}>
            {formulaExplanation}
          </ExplainCard>
          <ExplainCard eyebrow="Worked example" title="Sample" icon={<FileText className="h-5 w-5" aria-hidden="true" />}>
            {example}
          </ExplainCard>
          <ExplainCard eyebrow="Reading the result" title="Meaning" icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}>
            {interpretation}
          </ExplainCard>
        </div>
        {disclaimer && (
          <div className="container-kd mt-6 max-w-4xl">
            <p className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-4 font-sans text-xs leading-relaxed text-[var(--color-text-muted)]">
              {disclaimer}
            </p>
          </div>
        )}
      </section>

      <section className="agency-section-dark py-16 md:py-20">
        <div className="container-kd grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Questions" title="What Indian users usually check before trusting the number." light />
          <div>
            <FAQAccordion items={faqs} tone="dark" />
          </div>
        </div>
      </section>

      <section className="agency-section-light py-16 md:py-20">
        <div className="container-kd">
          <SectionHeading eyebrow="Next useful links" title="Move from calculation to action." description="Keep comparing with related calculators, read the matching article, or open the service scope if this points to a real project." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <LinkGroup title="Related tools" items={relatedTools.map((t) => ({ label: t.shortName, href: `/tools/${t.slug}` }))} />
            {relatedService ? <LinkGroup title="Related service" items={[{ label: relatedService.name, href: `/services/${relatedService.slug}` }]} /> : <LinkGroup title="Related service" items={[{ label: 'Explore services', href: '/services' }]} />}
            <LinkGroup
              title="Related insights"
              items={
                relatedBlogPosts.length > 0
                  ? relatedBlogPosts.slice(0, 3).map((p) => ({ label: p.title, href: `/blog/${p.slug}` }))
                  : [{ label: 'Read all insights', href: '/blog' }]
              }
            />
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Beyond the calculator"
        title={<>Want this handled for you?</>}
        description="If the numbers above point to a real project, we can scope it against an exact package, price and timeline."
        primaryTo={relatedService ? `/services/${relatedService.slug}` : '/contact'}
        primaryLabel={relatedService ? `View ${relatedService.name}` : 'Request a Digital Authority Audit'}
      />
    </>
  );
}

function ExplainCard({ eyebrow, title, icon, children }: { eyebrow: string; title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Reveal className="h-full rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6 shadow-[0_18px_60px_rgba(13,13,13,0.06)]">
      <div className="flex items-center gap-3 text-[var(--color-umber)]">
        <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[var(--color-parchment)]">{icon}</span>
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <h2 className="mt-5 font-display text-3xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
        {title}
      </h2>
      <div className="mt-4 space-y-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{children}</div>
    </Reveal>
  );
}

function LinkGroup({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className="h-full rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5">
      <p className="eyebrow text-[var(--color-umber)]">{title}</p>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <Link key={item.href} to={item.href} className="group flex min-h-12 items-center justify-between gap-3 rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-parchment)] px-4 py-3 font-sans text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]">
            <span className="line-clamp-2">{item.label}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
