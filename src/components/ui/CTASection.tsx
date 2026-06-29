import type { ReactNode } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { Reveal } from '@/components/motion/Reveal';

interface CTASectionProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export function CTASection({
  eyebrow = 'Get started',
  title,
  description,
  primaryLabel = 'Start a project',
  primaryTo = '/contact',
  secondaryLabel = 'See our services',
  secondaryTo = '/services',
}: CTASectionProps) {
  return (
    <section className="agency-section-dark agency-connector relative overflow-hidden py-20 md:py-28">
      <div className="kd-hero-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,10,11,0.92),rgba(9,10,11,0.66),rgba(9,10,11,0.92))]" aria-hidden="true" />
      <div className="motion-line-drift absolute left-1/2 top-12 h-px w-[42rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-signal)]/40 to-transparent" aria-hidden="true" />
      <div className="container-kd relative z-10 text-center max-w-3xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 inline-flex items-center justify-center gap-2 text-[var(--color-sand)]">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 className="text-balance text-[34px] md:text-[50px] leading-[1.06] text-[var(--color-linen)]" style={{ fontWeight: 300 }}>
            {title}
          </h2>
          {description && <p className="mt-5 font-sans text-[15px] text-[var(--color-dusk)] leading-relaxed">{description}</p>}
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Button to={primaryTo} variant="primary">
              {primaryLabel} <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Button>
            <Button
              to={secondaryTo}
              variant="secondary"
              className="border-white/20 text-[var(--color-linen)] hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]"
            >
              {secondaryLabel}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
