import { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowUpRight, BadgeCheck, Briefcase, Clock3, Link as LinkIcon, MessageCircle, SearchCheck, ShieldCheck } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema, buildArticleSchema } from '@/components/seo/schemaBuilders';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CTASection } from '@/components/ui/CTASection';
import { BlogCard } from '@/components/ui/BlogCard';
import { getPostBySlug } from '@/data/blog';
import { getToolBySlug } from '@/data/tools';
import { siteConfig } from '@/config/siteConfig';
import type { ToolMeta } from '@/types';

function slugifyHeading(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-');
}

function withHeadingIds(html: string): { html: string; headings: { id: string; text: string }[] } {
  const headings: { id: string; text: string }[] = [];
  const result = html.replace(/<h2>(.*?)<\/h2>/g, (_match, inner: string) => {
    const id = slugifyHeading(inner);
    headings.push({ id, text: inner });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: result, headings };
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  const processed = useMemo(() => (post ? withHeadingIds(post.contentHtml) : null), [post]);

  if (!post || !processed) return <Navigate to="/404" replace />;

  const relatedPosts = post.relatedSlugs.map((s) => getPostBySlug(s)).filter(Boolean);
  const relatedTools = post.relatedToolSlugs.map((s) => getToolBySlug(s)).filter((t): t is ToolMeta => Boolean(t));
  const shareUrl = `${siteConfig.domain}/blog/${post.slug}`;
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <>
      <SEO title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} type="article" />
      <JsonLd
        data={[
          buildBreadcrumbSchema([{ name: 'Insights', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]),
          buildArticleSchema({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            authorName: post.author.name,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
          }),
        ]}
      />

      <header className="relative overflow-hidden bg-[var(--color-parchment)] pt-[118px] pb-14 text-[var(--color-midnight)] md:pt-[138px] md:pb-20">
        <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-20" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-[var(--color-bg-secondary)]" aria-hidden="true" />

        <div className="container-kd relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center">
          <div>
            <Breadcrumbs items={[{ name: 'Insights', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]} />
            <p className="eyebrow mt-8 text-[var(--color-umber)]">{post.category}</p>
            <h1 className="mt-5 max-w-4xl text-balance font-display text-[38px] leading-[1.04] md:text-[60px]" style={{ fontWeight: 300 }}>
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">{post.excerpt}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3 font-sans text-xs text-[var(--color-text-muted)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-3 py-2">
                <BadgeCheck className="h-3.5 w-3.5 text-[var(--color-umber)]" aria-hidden="true" />
                {post.author.name}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-3 py-2">
                <Clock3 className="h-3.5 w-3.5 text-[var(--color-umber)]" aria-hidden="true" />
                <time dateTime={post.publishedAt}>{publishedDate}</time> / {post.readingTimeMinutes} min read
              </span>
            </div>
          </div>

          {post.imageUrl && (
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-2 shadow-[0_28px_90px_rgba(13,13,13,0.1)]">
              <div className="relative overflow-hidden rounded-[8px] bg-[var(--color-midnight)]">
                <img src={post.imageUrl} alt={post.imageAlt ?? post.title} className="aspect-[16/11] w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(13,13,13,0.56))]" aria-hidden="true" />
                <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-sand)] backdrop-blur-xl">
                  Indian CRO insight
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="agency-section-light py-12 md:py-16">
        <div className="container-kd grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article
            className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6 font-sans text-[15px] leading-[1.85] text-[var(--color-text-secondary)] shadow-[0_18px_60px_rgba(13,13,13,0.06)] md:p-8 [&_a]:text-[var(--color-umber)] [&_a]:underline [&_em]:text-[var(--color-umber)] [&_h2]:mb-4 [&_h2]:mt-11 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-normal [&_h2]:leading-tight [&_h2]:text-[var(--color-midnight)] [&_p]:mb-5 [&_strong]:text-[var(--color-midnight)]"
            dangerouslySetInnerHTML={{ __html: processed.html }}
          />

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {processed.headings.length > 0 && (
              <nav className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5" aria-label="Table of contents">
                <h2 className="eyebrow mb-4 text-[var(--color-umber)]">On this page</h2>
                <ul className="space-y-2.5">
                  {processed.headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="font-sans text-[13px] leading-snug text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-umber)]">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5">
              <h2 className="eyebrow mb-4 text-[var(--color-umber)]">Why this matters</h2>
              <div className="grid gap-3">
                {['Clearer buying decisions', 'Search-friendly answers', 'Better enquiry context'].map((item) => (
                  <p key={item} className="flex items-center gap-2 rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-parchment)] px-3 py-2 font-sans text-xs text-[var(--color-text-secondary)]">
                    <SearchCheck className="h-3.5 w-3.5 text-[var(--color-umber)]" aria-hidden="true" />
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {relatedTools.length > 0 && (
              <div className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5">
                <h2 className="eyebrow mb-4 text-[var(--color-umber)]">Related tools</h2>
                <ul className="space-y-2.5">
                  {relatedTools.map((t) => (
                    <li key={t.slug}>
                      <Link to={`/tools/${t.slug}`} className="group flex items-center justify-between gap-3 rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-parchment)] px-3 py-2 font-sans text-[13px] text-[var(--color-text-secondary)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]">
                        {t.shortName}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-5">
              <h2 className="eyebrow mb-4 text-[var(--color-umber)]">Share</h2>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X (Twitter)"
                  className="rounded-full border border-[var(--color-border-light)] bg-[var(--color-parchment)] p-2 transition-colors hover:border-[var(--color-umber)]"
                >
                  <MessageCircle className="h-4 w-4 text-[var(--color-text-secondary)]" aria-hidden="true" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="rounded-full border border-[var(--color-border-light)] bg-[var(--color-parchment)] p-2 transition-colors hover:border-[var(--color-umber)]"
                >
                  <Briefcase className="h-4 w-4 text-[var(--color-text-secondary)]" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  aria-label="Copy article link"
                  onClick={() => navigator.clipboard?.writeText(shareUrl)}
                  className="rounded-full border border-[var(--color-border-light)] bg-[var(--color-parchment)] p-2 transition-colors hover:border-[var(--color-umber)]"
                >
                  <LinkIcon className="h-4 w-4 text-[var(--color-text-secondary)]" aria-hidden="true" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="agency-section-light py-16 md:py-20">
          <div className="container-kd">
            <h2 className="eyebrow mb-6 text-[var(--color-umber)]">Related insights</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp) => (
                <BlogCard key={rp!.slug} post={rp!} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="agency-section-dark py-16 md:py-20">
        <div className="container-kd grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="eyebrow text-[var(--color-sand)]">From insight to implementation</p>
            <h2 className="mt-4 font-display text-[34px] leading-tight text-[var(--color-linen)] md:text-[48px]" style={{ fontWeight: 300 }}>
              Good content should make the next decision easier.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {['Turn the topic into a scoped service', 'Use the related calculator for numbers', 'Improve the page for AEO and SEO', 'Route qualified enquiries to WhatsApp or form'].map((item) => (
              <div key={item} className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.045] p-5">
                <ShieldCheck className="h-5 w-5 text-[var(--color-sand)]" aria-hidden="true" />
                <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--color-text-muted-on-dark)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={<>Have a project related to this article?</>}
        description="Send the page as context and Kraftt will translate it into a clear service scope, investment and next steps."
      />
    </>
  );
}
