import type { ReactNode } from 'react';

export function ResultPanel({ children }: { children: ReactNode }) {
  return (
    <div role="status" aria-live="polite" className="grid gap-5 rounded-[var(--radius-card)] border border-white/10 bg-black/35 p-5 sm:grid-cols-2 md:p-6">
      {children}
    </div>
  );
}

export function ResultStat({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div>
      <p className="font-sans text-xs text-[var(--color-dusk)] tracking-wide">{label}</p>
      <p
        className={`mt-1 font-display ${emphasis ? 'text-3xl text-[var(--color-umber)]' : 'text-2xl text-[var(--color-linen)]'}`}
        style={{ fontWeight: 300 }}
      >
        {value}
      </p>
    </div>
  );
}

export function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="agency-magnetic rounded-[var(--radius-button)] border border-[var(--color-border-light)] bg-[var(--color-parchment)] px-4 py-2 font-sans text-xs font-medium tracking-wide text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-umber)] hover:text-[var(--color-umber)]"
    >
      Reset
    </button>
  );
}
