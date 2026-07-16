import { Link } from 'react-router-dom';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { DynamicIcon } from '@/utils/icons';
import type { ToolMeta } from '@/types';

export function ToolCard({ tool }: { tool: ToolMeta }) {
  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="agency-depth-card group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6 shadow-[0_18px_60px_rgba(13,13,13,0.06)] hover:border-[var(--color-umber)]"
    >
      <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-umber)]/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-[var(--color-border-light)] bg-[var(--color-parchment)] text-[var(--color-umber)] shadow-[0_14px_38px_rgba(13,13,13,0.08)]">
        <DynamicIcon name={tool.icon} className="w-5 h-5" />
      </span>
      <p className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--color-border-light)] bg-[var(--color-parchment)] px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-[var(--color-umber)]">
        <BadgeCheck className="h-3 w-3" aria-hidden="true" />
        {tool.category}
      </p>
      <h3 className="mt-3 font-display text-2xl leading-tight text-[var(--color-midnight)] transition-colors group-hover:text-[var(--color-umber)]" style={{ fontWeight: 300 }}>
        {tool.shortName}
      </h3>
      <p className="mt-3 flex-1 font-sans text-[13px] leading-relaxed text-[var(--color-text-secondary)]">{tool.description}</p>
      <span className="mt-5 flex items-center gap-1 font-sans text-xs font-medium text-[var(--color-umber)]">
        Open tool
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
      </span>
    </Link>
  );
}
