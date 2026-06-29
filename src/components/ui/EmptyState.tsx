import type { ReactNode } from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaTo?: string;
  tone?: 'light' | 'dark';
}

export function EmptyState({ title, description, ctaLabel, ctaTo, tone = 'light' }: EmptyStateProps) {
  const isDark = tone === 'dark';

  return (
    <div className={`rounded-[var(--radius-card)] border border-dashed py-20 text-center ${isDark ? 'agency-glass-dark border-white/10' : 'border-[var(--color-bone)]'}`}>
      <h3 className={`font-display text-2xl ${isDark ? 'text-[var(--color-linen)]' : 'text-[var(--color-midnight)]'}`} style={{ fontWeight: 300 }}>
        {title}
      </h3>
      <p className={`mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed ${isDark ? 'text-[var(--color-dusk)]' : 'text-[var(--color-midnight)]/60'}`}>{description}</p>
      {ctaLabel && ctaTo && (
        <div className="mt-6">
          <Button to={ctaTo} variant="secondary">
            {ctaLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
