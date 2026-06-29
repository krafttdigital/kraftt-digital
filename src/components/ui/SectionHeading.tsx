import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean; // true when the section behind has a dark background
}

export function SectionHeading({ eyebrow, title, description, align = 'left', light = false }: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className={`eyebrow mb-3 ${light ? 'text-[var(--color-sand)]' : ''}`}>{eyebrow}</p>}
      <h2
        className={`text-balance text-[28px] md:text-[36px] leading-[1.15] ${light ? 'text-[var(--color-linen)]' : 'text-[var(--color-midnight)]'}`}
        style={{ fontWeight: 300 }}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 font-sans text-[15px] leading-relaxed ${light ? 'text-[var(--color-dusk)]' : 'text-[var(--color-midnight)]/70'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
