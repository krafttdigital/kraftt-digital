import { Reveal } from '@/components/motion/Reveal';

interface ProcessStep {
  title: string;
  description: string;
}

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="relative">
      {steps.map((step, index) => (
        <Reveal key={step.title} as="li" delay={index * 0.06} className="relative pl-12 pb-5 last:pb-0">
          <span className="absolute left-0 top-4 flex items-center justify-center w-8 h-8 rounded-[6px] border border-[var(--color-umber)] bg-[var(--color-midnight)] font-sans text-xs text-[var(--color-sand)] shadow-[0_12px_35px_rgba(9,10,11,0.14)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          {index < steps.length - 1 && <span className=" absolute left-4 top-12 w-px h-[calc(100%-2.5rem)] bg-white/10" aria-hidden="true" />}
          <div className="agency-section-dark rounded-[var(--radius-card)] border border-white/10 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
            <h3 className="font-display text-xl text-[var(--color-linen)]" style={{ fontWeight: 400 }}>
              {step.title}
            </h3>
            <p className="mt-1.5 font-sans text-sm text-[var(--color-dusk)] leading-relaxed max-w-md">{step.description}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
