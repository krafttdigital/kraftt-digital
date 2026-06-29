import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { DynamicIcon } from '@/utils/icons';
import type { ToolMeta } from '@/types';

export function ToolCard({ tool }: { tool: ToolMeta }) {
  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="agency-depth-card agency-glass-dark group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/10 p-6 hover:border-[var(--color-umber)]"
    >
      <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-signal)]/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.06] text-[var(--color-sand)] shadow-[0_14px_38px_rgba(0,0,0,0.22)]">
        <DynamicIcon name={tool.icon} className="w-5 h-5" />
      </span>
      <h3 className="mt-4 font-display text-lg text-[var(--color-linen)] group-hover:text-[var(--color-sand)] transition-colors" style={{ fontWeight: 400 }}>
        {tool.shortName}
      </h3>
      <p className="mt-2 font-sans text-[13px] text-[var(--color-dusk)] leading-relaxed flex-1">{tool.description}</p>
      <span className="mt-4 flex items-center gap-1 font-sans text-xs text-[var(--color-umber)]">
        Open calculator
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
      </span>
    </Link>
  );
}
