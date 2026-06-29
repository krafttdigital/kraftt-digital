interface BarChartRow {
  label: string;
  value: number;
}

/**
 * A minimal SVG bar chart paired with a visible, properly-marked-up <table>
 * containing the same data — so the information is available to screen
 * reader users and not locked inside an unlabelled graphic.
 */
export function SimpleBarChart({ rows, valueFormatter, caption }: { rows: BarChartRow[]; valueFormatter: (n: number) => string; caption: string }) {
  const max = Math.max(...rows.map((r) => r.value), 1);

  return (
    <div>
      <svg viewBox={`0 0 ${rows.length * 48} 160`} className="w-full h-40" role="img" aria-label={caption} preserveAspectRatio="none">
        {rows.map((row, i) => {
          const barHeight = (row.value / max) * 130;
          return (
            <g key={row.label}>
              <rect
                x={i * 48 + 8}
                y={150 - barHeight}
                width={28}
                height={barHeight}
                rx={2}
                fill={i === rows.length - 1 ? 'var(--color-umber)' : 'var(--color-sand)'}
              />
              <text x={i * 48 + 22} y={158} textAnchor="middle" fontSize="9" fill="var(--color-dusk)" opacity={0.86}>
                {row.label}
              </text>
            </g>
          );
        })}
      </svg>

      <table className="w-full mt-4 text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-white/10">
            <th scope="col" className="font-sans text-xs font-medium text-[var(--color-dusk)] py-2">
              Period
            </th>
            <th scope="col" className="font-sans text-xs font-medium text-[var(--color-dusk)] py-2 text-right">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-white/10">
              <th scope="row" className="font-sans text-xs text-[var(--color-dusk)] py-1.5 font-normal">
                {row.label}
              </th>
              <td className="font-sans text-xs text-[var(--color-linen)] py-1.5 text-right">{valueFormatter(row.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
