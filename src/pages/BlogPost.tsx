import { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { MessageCircle, Briefcase, Link as LinkIcon } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema, buildArticleSchema } from '@/components/seo/schemaBuilders';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CTASection } from '@/components/ui/CTASection';
import { BlogCard } from '@/components/ui/BlogCard';
import { getPostBySlug } from '@/data/blog';
import { getToolBySlug } from '@/data/tools';
import { siteConfig } from '@/config/siteConfig';

function slugifyHeading(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-');
}

/** Injects id="" attributes onto <h2> tags so a table of contents can link to them. */
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
  const relatedTools = post.relatedToolSlugs.map((s) => getToolBySlug(s)).filter(Boolean);
  const shareUrl = `${siteConfig.domain}/blog/${post.slug}`;

  return (
    <>
      <SEO title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} type="article" />
      <JsonLd
        data={[
          buildBreadcrumbSchema([{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]),
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

      <header className="agency-star-panel relative overflow-hidden pt-[120px] pb-14">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(9,10,11,0.78),rgba(9,10,11,0.34),rgba(9,10,11,0.72))]" aria-hidden="true" />
        <div className="container-kd relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="max-w-3xl">
          <Breadcrumbs items={[{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]} light />
          <p className="eyebrow mt-6 mb-4">{post.category}</p>
          <h1 className="text-balance font-display text-[30px] md:text-[42px] leading-[1.15] text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-sans text-xs text-[var(--color-dusk)]">
            <span>{post.author.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTimeMinutes} min read</span>
          </div>
          </div>

          {post.imageUrl && (
            <div className="agency-glass-dark relative overflow-hidden rounded-[var(--radius-card)] p-2">
              <img
                src={post.imageUrl}
                alt={post.imageAlt ?? post.title}
                className="aspect-[16/11] w-full rounded-[6px] object-cover"
              />
              <div className="pointer-events-none absolute inset-2 rounded-[6px] bg-[linear-gradient(180deg,transparent_45%,rgba(3,4,5,0.54))]" aria-hidden="true" />
            </div>
          )}
        </div>
      </header>

      <section className="bg-white py-16 md:py-20">
        <div className="container-kd grid md:grid-cols-[1fr_220px] gap-14 max-w-4xl">
          <article
            className="prose-kd font-sans text-[15px] leading-[1.8] text-[var(--color-midnight)]/85 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-[var(--color-midnight)] [&_h2]:font-normal [&_p]:mb-4 [&_a]:text-[var(--color-umber)] [&_a]:underline [&_em]:text-[var(--color-umber)]"
            dangerouslySetInnerHTML={{ __html: processed.html }}
          />

          <aside className="space-y-8">
            {processed.headings.length > 0 && (
              <nav aria-label="Table of contents">
                <h2 className="eyebrow mb-3">On this page</h2>
                <ul className="space-y-2.5 border-l border-[var(--color-bone)] pl-4">
                  {processed.headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="font-sans text-[13px] text-[var(--color-midnight)]/65 hover:text-[var(--color-umber)] transition-colors leading-snug">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div>
              <h2 className="eyebrow mb-3">Share</h2>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X (Twitter)"
                  className="p-2 rounded-full border border-[var(--color-bone)] hover:border-[var(--color-umber)] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[var(--color-midnight)]/70" aria-hidden="true" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="p-2 rounded-full border border-[var(--color-bone)] hover:border-[var(--color-umber)] transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-[var(--color-midnight)]/70" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  aria-label="Copy article link"
                  onClick={() => navigator.clipboard?.writeText(shareUrl)}
                  className="p-2 rounded-full border border-[var(--color-bone)] hover:border-[var(--color-umber)] transition-colors"
                >
                  <LinkIcon className="w-4 h-4 text-[var(--color-midnight)]/70" aria-hidden="true" />
                </button>
              </div>
            </div>

            {relatedTools.length > 0 && (
              <div>
                <h2 className="eyebrow mb-3">Related tools</h2>
                <ul className="space-y-2">
                  {relatedTools.map((t) => (
                    <li key={t!.slug}>
                      <Link to={`/tools/${t!.slug}`} className="font-sans text-[13px] text-[var(--color-umber)] hover:underline">
                        {t!.shortName} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="bg-[var(--color-parchment)] py-16 md:py-20">
          <div className="container-kd">
            <h2 className="eyebrow mb-6">Related articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <BlogCard key={rp!.slug} post={rp!} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection title={<>Have a project related to this article?</>} />
    </>
  );
}
