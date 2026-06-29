import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/components/seo/schemaBuilders';
import { Reveal } from '@/components/motion/Reveal';
import { BlogCard } from '@/components/ui/BlogCard';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { VisualEmptyState } from '@/components/ui/VisualEmptyState';
import { blogPosts, blogCategories } from '@/data/blog';
import { ArrowUpRight, NotebookPen, Search } from 'lucide-react';

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
        title="Blog"
        description="Practical, original articles on web design, branding, SEO, e-commerce and business tools — from the Kraftt Digital team."
        path="/blog"
      />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Blog', path: '/blog' }])} />

      <PageHero
        breadcrumbs={[{ name: 'Blog', path: '/blog' }]}
        eyebrow="Blog"
        title={<>Practical writing on web, brand, growth, and business tools.</>}
        description="Original, useful articles with enough visual structure to scan quickly and enough substance to turn into action."
        visual="blog"
        stats={[
          { value: String(blogPosts.length), label: 'articles' },
          { value: String(blogCategories.length), label: 'topics' },
          { value: '0', label: 'fluff' },
        ]}
      />

      {featured && (
        <section className="py-10 md:py-12">
          <div className="container-kd">
            <Reveal>
              <Link to={`/blog/${featured.slug}`} className="agency-glass-dark group grid overflow-hidden rounded-[var(--radius-card)] border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-umber)] hover:shadow-[0_28px_90px_rgba(0,0,0,0.28)] md:grid-cols-[1fr_420px]">
                <div className="p-5 md:p-7">
                  <span className="eyebrow">Featured</span>
                  <h2 className="mt-3 font-display text-3xl text-[var(--color-linen)] transition-colors group-hover:text-[var(--color-sand)] md:text-4xl" style={{ fontWeight: 300 }}>
                    {featured.title}
                  </h2>
                  <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-[var(--color-dusk)]">{featured.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-medium text-[var(--color-umber)]">
                    Read featured article <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
                <div className="relative min-h-[260px] overflow-hidden bg-black/30">
                  {featured.imageUrl ? (
                    <img
                      src={featured.imageUrl}
                      alt={featured.imageAlt ?? featured.title}
                      className="h-full min-h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="relative h-full p-5">
                      <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-15" aria-hidden="true" />
                      <div className="relative rounded-[8px] border border-white/10 bg-white/[0.06] p-5">
                        <NotebookPen className="h-5 w-5 text-[var(--color-sand)]" aria-hidden="true" />
                        <div className="mt-8 space-y-3">
                          <span className="block h-2 rounded-full bg-white/20" />
                          <span className="block h-2 w-5/6 rounded-full bg-white/12" />
                          <span className="block h-2 w-2/3 rounded-full bg-white/12" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,5,0.58),transparent_52%),linear-gradient(180deg,transparent_44%,rgba(3,4,5,0.72))]" aria-hidden="true" />
                  <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-[7px] border border-white/10 bg-black/45 px-3 py-2 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-sand)] backdrop-blur-xl">
                    <NotebookPen className="h-3.5 w-3.5" aria-hidden="true" />
                    Editorial image
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <div className="agency-section-dark border-y border-white/10">
        <div className="container-kd flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setCategory('all')}
              className={`px-4 py-2 rounded-[var(--radius-button)] font-sans text-xs whitespace-nowrap transition-colors ${
                category === 'all' ? 'bg-[var(--color-umber)] text-[var(--color-midnight)]' : 'bg-white/[0.06] text-[var(--color-dusk)] hover:bg-white/[0.1] hover:text-[var(--color-linen)]'
              }`}
            >
              All
            </button>
            {blogCategories.map((c) => (
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
          <label className="relative w-full sm:w-64">
            <span className="sr-only">Search articles</span>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-dusk)]" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="agency-focus-field w-full rounded-[var(--radius-button)] border border-white/10 bg-black/30 py-2 pl-9 pr-3 font-sans text-sm text-[var(--color-linen)] placeholder:text-[var(--color-dusk)]/55 focus:border-[var(--color-umber)]"
            />
          </label>
        </div>
      </div>

      <section className="py-10 md:py-14">
        <div className="container-kd">
          {filtered.length === 0 ? (
            <VisualEmptyState
              eyebrow="Search cleared the desk"
              title="No articles match your search."
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

      <CTASection eyebrow="Want help, not just an article?" title={<>Turn what you just read into a project.</>} />
    </>
  );
}
