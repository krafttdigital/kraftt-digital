import { useMemo, useState } from 'react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ToolCard } from '@/components/ui/ToolCard';
import { CTASection } from '@/components/ui/CTASection';
import { toolsList } from '@/data/tools';

export default function Tools() {
  const [category, setCategory] = useState<string | 'all'>('all');
  const categories = useMemo(() => Array.from(new Set(toolsList.map((t) => t.category))), []);
  const filtered = category === 'all' ? toolsList : toolsList.filter((t) => t.category === category);

  return (
    <>
      <SEO
        title="Free Business & Financial Tools"
        description="Twelve free, fully functional calculators — SIP, net worth, EMI, GST, break-even, profit margin, ROAS and more — built by Kraftt Digital."
        path="/tools"
      />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Tools', path: '/tools' }])} />

      <header className=" relative overflow-hidden pt-[120px] pb-16">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-10" aria-hidden="true" />
        <div className="container-kd relative z-10">
          <Breadcrumbs items={[{ name: 'Tools', path: '/tools' }]} light />
          <p className="eyebrow mt-6 mb-4">Free tools</p>
          <h1 className="text-balance font-display text-[34px] md:text-[48px] leading-[1.12] text-[var(--color-linen)] max-w-2xl" style={{ fontWeight: 300 }}>
            Calculators that actually calculate.
          </h1>
          <p className="mt-5 font-sans text-[15px] text-[var(--color-dusk)] max-w-xl leading-relaxed">
            Every tool below runs a real, tested formula entirely in your browser — nothing you enter is sent to a server.
          </p>
        </div>
      </header>

      <div className="agency-section-dark border-b border-white/10">
        <div className="container-kd py-4 overflow-x-auto">
          <div className="flex gap-2 w-max">
            <button
              onClick={() => setCategory('all')}
              className={`px-4 py-2 rounded-[var(--radius-button)] font-sans text-xs whitespace-nowrap transition-colors ${
                category === 'all' ? 'bg-[var(--color-umber)] text-[var(--color-midnight)]' : 'bg-white/[0.06] text-[var(--color-dusk)] hover:bg-white/[0.1] hover:text-[var(--color-linen)]'
              }`}
            >
              All tools
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-[var(--radius-button)] font-sans text-xs whitespace-nowrap transition-colors ${
                  category === c ? 'bg-[var(--color-umber)] text-[var(--color-midnight)]' : 'bg-white/[0.06] text-[var(--color-dusk)] hover:bg-white/[0.1] hover:text-[var(--color-linen)]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="agency-section-dark py-16 md:py-24">
        <div className="container-kd">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tool, i) => (
              <Reveal key={tool.slug} delay={i * 0.04}>
                <ToolCard tool={tool} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Need more than a calculator?"
        title={<>Turn the numbers into a real project.</>}
        description="If a tool above points to a need — a new website, better SEO, a branding refresh — that's exactly what we build."
      />
    </>
  );
}
