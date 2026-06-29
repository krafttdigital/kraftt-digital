import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, FileText, ImagePlus, Layers3, Search, Sparkles } from 'lucide-react';

interface VisualEmptyStateProps {
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaTo?: string;
  variant?: 'portfolio' | 'search' | 'tools';
}

const variantIcons: Record<NonNullable<VisualEmptyStateProps['variant']>, ReactNode[]> = {
  portfolio: [
    <FileText className="w-4 h-4" aria-hidden="true" />,
    <Layers3 className="w-4 h-4" aria-hidden="true" />,
    <BadgeCheck className="w-4 h-4" aria-hidden="true" />,
  ],
  search: [
    <Search className="w-4 h-4" aria-hidden="true" />,
    <Sparkles className="w-4 h-4" aria-hidden="true" />,
    <FileText className="w-4 h-4" aria-hidden="true" />,
  ],
  tools: [
    <Search className="w-4 h-4" aria-hidden="true" />,
    <Layers3 className="w-4 h-4" aria-hidden="true" />,
    <BadgeCheck className="w-4 h-4" aria-hidden="true" />,
  ],
};

export function VisualEmptyState({ eyebrow = 'Nothing to show yet', title, description, ctaLabel, ctaTo, variant = 'portfolio' }: VisualEmptyStateProps) {
  const shouldReduceMotion = useReducedMotion();
  const icons = variantIcons[variant];

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-bone)] kd-light-surface p-6 md:p-10">
      <div className="absolute inset-0 opacity-[0.32] kd-hero-grid" aria-hidden="true" />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_340px] lg:items-center">
        <div>
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="font-display text-3xl text-[var(--color-midnight)] md:text-4xl" style={{ fontWeight: 300 }}>
            {title}
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[var(--color-midnight)]/68">{description}</p>
          {ctaLabel && ctaTo && (
            <Link
              to={ctaTo}
              className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-midnight)] px-5 py-3 font-sans text-sm font-medium text-[var(--color-linen)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-umber)] hover:text-[var(--color-midnight)]"
            >
              {ctaLabel} <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        <div className="relative min-h-[220px]" aria-hidden="true">
          <motion.div
            className="absolute left-4 top-6 h-40 w-56 rotate-[-6deg] rounded-[8px] border border-[var(--color-bone)] bg-white shadow-[0_20px_60px_rgba(9,10,11,0.1)]"
            animate={shouldReduceMotion ? undefined : { y: [0, -10, 0], rotate: [-6, -3, -6] }}
            transition={shouldReduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="h-16 rounded-t-[8px] bg-[var(--color-midnight)] p-3">
              <ImagePlus className="w-5 h-5 text-[var(--color-sand)]" aria-hidden="true" />
            </div>
            <div className="space-y-2 p-4">
              <span className="block h-2 rounded-full bg-[var(--color-bone)]" />
              <span className="block h-2 w-2/3 rounded-full bg-[var(--color-bone)]" />
              <span className="mt-4 block h-8 rounded-[6px] bg-[var(--color-parchment)]" />
            </div>
          </motion.div>

          {icons.map((icon, index) => (
            <motion.div
              key={index}
              className="absolute flex h-12 w-12 items-center justify-center rounded-[8px] border border-[var(--color-bone)] bg-white text-[var(--color-umber)] shadow-[0_16px_45px_rgba(9,10,11,0.1)]"
              style={{ right: `${36 + index * 56}px`, bottom: `${24 + (index % 2) * 38}px` }}
              animate={shouldReduceMotion ? undefined : { y: [0, index % 2 === 0 ? 10 : -10, 0] }}
              transition={shouldReduceMotion ? undefined : { duration: 4.5 + index, repeat: Infinity, ease: 'easeInOut' }}
            >
              {icon}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
