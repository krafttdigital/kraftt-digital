import { useMemo, useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { CalculatorField } from '@/components/tools/CalculatorField';
import { ResultPanel, ResultStat, ResetButton } from '@/components/tools/ResultPanel';
import { useCurrency } from '@/context/CurrencyContext';
import { formatNumber } from '@/utils/format';
import { calculateCompoundInterest } from '@/utils/calculators';

const FREQUENCIES = [
  { label: 'Annually', value: 1 },
  { label: 'Semi-annually', value: 2 },
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly', value: 12 },
];

export default function CompoundInterestCalculator() {
  const { currency } = useCurrency();
  const [principal, setPrincipal] = useState('100000');
  const [rate, setRate] = useState('8');
  const [years, setYears] = useState('10');
  const [frequency, setFrequency] = useState('4');

  const result = useMemo(
    () =>
      calculateCompoundInterest({
        principal: Math.max(0, Number(principal) || 0),
        annualRatePercent: Math.max(0, Number(rate) || 0),
        years: Math.max(0, Number(years) || 0),
        compoundsPerYear: Number(frequency),
      }),
    [principal, rate, years, frequency],
  );

  function reset() {
    setPrincipal('100000');
    setRate('8');
    setYears('10');
    setFrequency('4');
  }

  return (
    <ToolPageLayout
      slug="compound-interest-calculator"
      h1="Compound Interest Calculator"
      intro="See how a lump sum grows over time at a given interest rate and compounding frequency."
      calculator={
        <div>
          <div className="grid sm:grid-cols-2 gap-5">
            <CalculatorField label="Principal amount" id="ci-principal" value={principal} onChange={setPrincipal} unit={currency} min={0} />
            <CalculatorField label="Annual interest rate" id="ci-rate" value={rate} onChange={setRate} unit="%" min={0} max={40} step={0.1} />
            <CalculatorField label="Time period" id="ci-years" value={years} onChange={setYears} unit="years" min={0} max={50} />
            <div>
              <label htmlFor="ci-freq" className="block font-sans text-xs font-medium text-[var(--color-midnight)]/70 mb-1.5">
                Compounding frequency
              </label>
              <select
                id="ci-freq"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full rounded-[var(--radius-button)] border border-[var(--color-bone)] bg-white px-3.5 py-2.5 font-sans text-sm text-[var(--color-midnight)] focus:border-[var(--color-umber)]"
              >
                {FREQUENCIES.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <ResetButton onClick={reset} />
          </div>
          <div className="mt-5">
            <ResultPanel>
              <ResultStat label="Final amount" value={formatNumber(result.finalAmount, currency)} emphasis />
              <ResultStat label="Total interest earned" value={formatNumber(result.totalInterest, currency)} />
            </ResultPanel>
          </div>
        </div>
      }
      formulaExplanation={
        <>
          <p className="font-display text-lg" style={{ fontWeight: 400 }}>
            A = P × (1 + r/n)ⁿᵗ
          </p>
          <p>Where P is the principal, r is the annual interest rate (as a decimal), n is the number of times interest compounds per year, and t is the number of years. More frequent compounding produces a slightly higher final amount at the same nominal annual rate.</p>
        </>
      }
      example={
        <p>
          {formatNumber(100000, currency)} invested at 8% annual interest, compounded quarterly, for 10 years grows
          to approximately{' '}
          {formatNumber(calculateCompoundInterest({ principal: 100000, annualRatePercent: 8, years: 10, compoundsPerYear: 4 }).finalAmount, currency)}.
        </p>
      }
      interpretation={<p>The difference between the final amount and the original principal is the total interest earned purely through compounding — no additional contributions are modelled here (use the SIP calculator for a recurring-contribution scenario).</p>}
      faqs={[
        { question: 'Does compounding frequency make a big difference?', answer: 'At the same nominal rate, the difference between annual and monthly compounding is usually modest over short periods, but becomes more noticeable over longer time horizons and higher rates.' },
        { question: 'Can I model regular monthly contributions instead of a single lump sum?', answer: 'Yes — use the SIP Calculator, which models a recurring monthly contribution growing over time, including an optional annual step-up.' },
      ]}
    />
  );
}
