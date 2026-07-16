import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText } from 'lucide-react';
import type { BlogPost } from '@/types';

export function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="agency-depth-card group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] shadow-[0_18px_60px_rgba(13,13,13,0.06)] hover:border-[var(--color-umber)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-midnight)]">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.imageAlt ?? post.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full p-4">
            <div className="pointer-events-none absolute inset-0 kd-hero-grid opacity-15" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(139,115,85,0.24),transparent_34%)]" aria-hidden="true" />
            <div className="relative flex h-full items-end justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/[0.08] text-[var(--color-sand)]">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.06),rgba(13,13,13,0.58))]" aria-hidden="true" />
        <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--color-sand)] backdrop-blur-xl">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="eyebrow text-[var(--color-umber)]">{post.category}</span>
        <h3 className="mt-3 font-display text-xl leading-snug text-[var(--color-midnight)] transition-colors group-hover:text-[var(--color-umber)]" style={{ fontWeight: 300 }}>
          {post.title}
        </h3>
        <p className="mt-2.5 flex-1 font-sans text-sm leading-relaxed text-[var(--color-text-secondary)]">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--color-border-light)] pt-4 font-sans text-xs text-[var(--color-text-muted)]">
          <span>
            {date} / {post.readingTimeMinutes} min read
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--color-umber)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
