interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-[var(--color-midnight)] py-4" aria-hidden="true">
      <div className="flex w-max items-center gap-8 kd-marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)]" />
            <span className="font-display italic text-lg text-[var(--color-linen)]/75 whitespace-nowrap" style={{ fontWeight: 300 }}>
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
