import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, BookOpenText, FileText, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { BlogCard } from '@/components/ui/BlogCard';
import { CTASection } from '@/components/ui/CTASection';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { VisualEmptyState } from '@/components/ui/VisualEmptyState';
import { blogPosts, blogCategories } from '@/data/blog';

const insightTrust = [
  { title: 'Written for Indian decisions', body: 'Pricing, GST, search, website and growth topics are framed for real business conversations in India.', icon: BadgeCheck },
  { title: 'Tools connected', body: 'Articles link to calculators where numbers help the reader move from opinion to estimate.', icon: FileText },
  { title: 'Search and CRO minded', body: 'Insights are structured to answer questions clearly, build trust and support enquiry paths.', icon: ShieldCheck },
];

export default function Blog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | 'all'>('all');
  const { scrollYProgress } = useScroll();

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = category === 'all' || post.category === category;
      const matchesQuery =
        query.trim() === '' ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const featured = blogPosts[0];

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[70] h-px w-full origin-left bg-[var(--color-umber)]"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      <SEO
        title="Insights"
        description="India-focused insights on web design, branding, SEO, e-commerce, GST, calculators and digital authority from Kraftt Digital."
        path="/blog"
      />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Insights', path: '/blog' }])} />

      <header className="relative overflow-hidden bg-[var(--color-parchment)] pt-[118px] pb-14 text-[var(--color-midnight)] md:pt-[138px] md:pb-20">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-20" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-[var(--color-bg-secondary)]" aria-hidden="true" />

        <div className="container-kd relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <Reveal>
            <Breadcrumbs items={[{ name: 'Insights', path: '/blog' }]} />
            <p className="eyebrow mt-8 text-[var(--color-umber)]">Insights for digital authority</p>
            <h1 className="mt-5 max-w-4xl text-balance font-display text-[42px] leading-[1.02] md:text-[68px]" style={{ fontWeight: 300 }}>
              Practical writing for websites, search and Indian business growth.
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              Clear articles for founders who want to understand the decision before buying the service: pricing, GST, SEO, Shopify, AEO, calculators and conversion.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5 shadow-[0_28px_90px_rgba(13,13,13,0.1)]">
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow text-[var(--color-umber)]">Editorial library</p>
                <BookOpenText className="h-5 w-5 text-[var(--color-umber)]" aria-hidden="true" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-border-light)]">
                {[
                  [String(blogPosts.length), 'articles'],
                  [String(blogCategories.length), 'topics'],
                  ['0', 'fluff'],
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
                to="/tools"
                className="agency-magnetic mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-parchment)] hover:bg-[var(--color-umber)]"
              >
                Open calculators
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </aside>
          </Reveal>
        </div>
      </header>

      <section className="agency-section-light py-12 md:py-16">
        <div className="container-kd grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-border-light)] md:grid-cols-3">
          {insightTrust.map((item, index) => {
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

      {featured && (
        <section className="agency-section-light py-10 md:py-14">
          <div className="container-kd">
            <Reveal>
              <Link
                to={`/blog/${featured.slug}`}
                className="agency-depth-card group grid overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] shadow-[0_24px_80px_rgba(13,13,13,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-umber)] md:grid-cols-[minmax(0,1fr)_430px]"
              >
                <div className="p-6 md:p-8">
                  <span className="eyebrow text-[var(--color-umber)]">Featured insight</span>
                  <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-[var(--color-midnight)] transition-colors group-hover:text-[var(--color-umber)] md:text-5xl" style={{ fontWeight: 300 }}>
                    {featured.title}
                  </h2>
                  <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">{featured.excerpt}</p>
                  <span className="mt-7 inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-parchment)]">
                    Read featured article
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <div className="relative min-h-[280px] overflow-hidden bg-[var(--color-midnight)]">
                  {featured.imageUrl ? (
                    <img
                      src={featured.imageUrl}
                      alt={featured.imageAlt ?? featured.title}
                      className="h-full min-h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="relative h-full p-5">
                      <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-15" aria-hidden="true" />
                      <BookOpenText className="relative h-8 w-8 text-[var(--color-sand)]" aria-hidden="true" />
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_44%,rgba(13,13,13,0.68))]" aria-hidden="true" />
                  <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-[7px] border border-white/10 bg-black/45 px-3 py-2 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-sand)] backdrop-blur-xl">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    {featured.category}
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <div className="border-y border-[var(--color-border-light)] bg-[var(--color-bg-secondary)]">
        <div className="container-kd flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setCategory('all')}
              className={`px-4 py-2 rounded-[var(--radius-button)] font-sans text-xs whitespace-nowrap transition-colors ${
                category === 'all'
                  ? 'bg-[var(--color-midnight)] text-[var(--color-parchment)]'
                  : 'border border-[var(--color-border-light)] bg-[var(--color-parchment)] text-[var(--color-text-secondary)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]'
              }`}
            >
              All
            </button>
            {blogCategories.map((c) => (
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
          <label className="relative w-full sm:w-72">
            <span className="sr-only">Search articles</span>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search insights..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="agency-focus-field w-full rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-parchment)] py-2 pl-9 pr-3 font-sans text-sm text-[var(--color-midnight)] placeholder:text-[var(--color-text-muted)]/65 focus:border-[var(--color-umber)]"
            />
          </label>
        </div>
      </div>

      <section className="agency-section-light py-12 md:py-16">
        <div className="container-kd">
          {filtered.length === 0 ? (
            <VisualEmptyState
              eyebrow="Search cleared the desk"
              title="No insights match your search."
              description="Try another topic or clear the filters to see the full editorial library."
              ctaLabel="View all services"
              ctaTo="/services"
              variant="search"
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.05}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        eyebrow="Want help, not just an article?"
        title={<>Turn what you just read into a project.</>}
        description="Use the article as the thinking layer, then let Kraftt scope the website, SEO, branding or growth work behind it."
      />
    </>
  );
}
