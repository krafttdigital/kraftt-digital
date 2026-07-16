import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BadgeCheck, Calculator, FileText, ShieldCheck, Sparkles } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ToolCard } from '@/components/ui/ToolCard';
import { CTASection } from '@/components/ui/CTASection';
import { toolsList } from '@/data/tools';

const trustItems = [
  { title: 'Browser-only inputs', body: 'Use the calculators without sending your planning numbers to Kraftt servers.', icon: ShieldCheck },
  { title: 'India-friendly context', body: 'GST, INR, SIP, EMI, website and marketing decisions are framed for Indian businesses and buyers.', icon: BadgeCheck },
  { title: 'Action-ready outputs', body: 'Each tool connects to a service, article or next step so the result does not sit in isolation.', icon: FileText },
];

export default function Tools() {
  const [category, setCategory] = useState<string | 'all'>('all');
  const categories = useMemo(() => Array.from(new Set(toolsList.map((t) => t.category))), []);
  const filtered = category === 'all' ? toolsList : toolsList.filter((t) => t.category === category);

  return (
    <>
      <SEO
        title="Free Business & Financial Tools"
        description="Free India-friendly calculators for SIP, GST, EMI, website cost, branding cost, SEO ROI, ROAS, profit margin and business planning."
        path="/tools"
      />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Tools', path: '/tools' }])} />

      <header className="relative overflow-hidden bg-[var(--color-parchment)] pt-[118px] pb-14 text-[var(--color-midnight)] md:pt-[138px] md:pb-20">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-20" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-[var(--color-bg-secondary)]" aria-hidden="true" />

        <div className="container-kd relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <Reveal>
            <Breadcrumbs items={[{ name: 'Tools', path: '/tools' }]} />
            <p className="eyebrow mt-8 text-[var(--color-umber)]">Free tools for smarter decisions</p>
            <h1 className="mt-5 max-w-4xl text-balance font-display text-[42px] leading-[1.02] md:text-[68px]" style={{ fontWeight: 300 }}>
              Calculate the number before you commit to the project.
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              Practical calculators for Indian founders, agencies, service businesses and growing brands. Estimate money, marketing and website decisions with visible assumptions.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5 shadow-[0_28px_90px_rgba(13,13,13,0.1)]">
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow text-[var(--color-umber)]">Tool library</p>
                <Calculator className="h-5 w-5 text-[var(--color-umber)]" aria-hidden="true" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-border-light)]">
                {[
                  [String(toolsList.length), 'tools'],
                  [String(categories.length), 'categories'],
                  ['0', 'server inputs'],
                ].map(([value, label]) => (
                  <div key={label} className="bg-[var(--color-parchment)] p-4">
                    <p className="font-display text-3xl leading-none text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                      {value}
                    </p>
                    <p className="mt-2 font-sans text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">{label}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className="agency-magnetic mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-parchment)] hover:bg-[var(--color-umber)]"
              >
                Ask for a project estimate
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </aside>
          </Reveal>
        </div>
      </header>

      <section className="agency-section-light py-12 md:py-16">
        <div className="container-kd grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-border-light)] md:grid-cols-3">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="h-full bg-[var(--color-bg-secondary)] p-6">
                  <Icon className="h-5 w-5 text-[var(--color-umber)]" aria-hidden="true" />
                  <h2 className="mt-5 font-display text-2xl leading-tight text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
                    {item.title}
                  </h2>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div className="border-y border-[var(--color-border-light)] bg-[var(--color-bg-secondary)]">
        <div className="container-kd overflow-x-auto py-4">
          <div className="flex w-max gap-2">
            <button
              onClick={() => setCategory('all')}
              className={`px-4 py-2 rounded-[var(--radius-button)] font-sans text-xs whitespace-nowrap transition-colors ${
                category === 'all'
                  ? 'bg-[var(--color-midnight)] text-[var(--color-parchment)]'
                  : 'border border-[var(--color-border-light)] bg-[var(--color-parchment)] text-[var(--color-text-secondary)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]'
              }`}
            >
              All tools
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-[var(--radius-button)] font-sans text-xs whitespace-nowrap transition-colors ${
                  category === c
                    ? 'bg-[var(--color-midnight)] text-[var(--color-parchment)]'
                    : 'border border-[var(--color-border-light)] bg-[var(--color-parchment)] text-[var(--color-text-secondary)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="agency-section-light py-14 md:py-20">
        <div className="container-kd">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-[var(--color-umber)]">Choose a calculator</p>
              <h2 className="mt-3 font-display text-[34px] leading-tight text-[var(--color-midnight)] md:text-[48px]" style={{ fontWeight: 300 }}>
                {category === 'all' ? 'All planning tools' : category}
              </h2>
            </div>
            <p className="max-w-md font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Use these as first-pass planning tools, then confirm real scope, taxes, pricing or investments with the right professional.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool, i) => (
              <Reveal key={tool.slug} delay={i * 0.04}>
                <ToolCard tool={tool} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="agency-section-dark py-16 md:py-20">
        <div className="container-kd grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="eyebrow text-[var(--color-sand)]">From number to action</p>
            <h2 className="mt-4 font-display text-[34px] leading-tight text-[var(--color-linen)] md:text-[48px]" style={{ fontWeight: 300 }}>
              A useful result should lead to a cleaner next step.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {['Budget the project before enquiry', 'Check GST, EMI and margin basics', 'Compare website, SEO and social spends', 'Turn estimates into a scoped proposal'].map((item) => (
              <div key={item} className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.045] p-5">
                <Sparkles className="h-5 w-5 text-[var(--color-sand)]" aria-hidden="true" />
                <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--color-text-muted-on-dark)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Need more than a calculator?"
        title={<>Turn the numbers into a real project.</>}
        description="If a tool above points to a need, we can turn it into a clear service scope, exact quote and delivery timeline."
      />
    </>
  );
}
