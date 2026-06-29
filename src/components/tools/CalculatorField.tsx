interface CalculatorFieldProps {
  label: string;
  id: string;
  value: number | string;
  onChange: (value: string) => void;
  unit?: string;
  type?: 'number' | 'text';
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
}

export function CalculatorField({ label, id, value, onChange, unit, type = 'number', min, max, step, helpText }: CalculatorFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-sans text-xs font-medium text-[var(--color-dusk)]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          inputMode={type === 'number' ? 'decimal' : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className="agency-focus-field w-full rounded-[var(--radius-button)] border border-white/10 bg-black/30 px-3.5 py-2.5 font-sans text-sm text-[var(--color-linen)] transition-colors placeholder:text-[var(--color-dusk)]/55 focus:border-[var(--color-umber)]"
          aria-describedby={helpText ? `${id}-help` : undefined}
        />
        {unit && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 font-sans text-xs text-[var(--color-dusk)]/75">{unit}</span>
        )}
      </div>
      {helpText && (
        <p id={`${id}-help`} className="mt-1.5 font-sans text-xs text-[var(--color-dusk)]/75">
          {helpText}
        </p>
      )}
    </div>
  );
}
