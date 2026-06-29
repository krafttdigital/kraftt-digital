import { useMemo, useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { CalculatorField } from '@/components/tools/CalculatorField';
import { ResultPanel, ResultStat, ResetButton } from '@/components/tools/ResultPanel';
import { useCurrency } from '@/context/CurrencyContext';
import { formatNumber } from '@/utils/format';
import { calculateGst } from '@/utils/calculators';

const RATES = [5, 12, 18, 28];

export default function GstCalculator() {
  const { currency } = useCurrency();
  const [amount, setAmount] = useState('50000');
  const [rate, setRate] = useState('18');
  const [mode, setMode] = useState<'add' | 'remove'>('add');

  const result = useMemo(
    () => calculateGst({ amount: Math.max(0, Number(amount) || 0), gstRatePercent: Math.max(0, Number(rate) || 0), mode }),
    [amount, rate, mode],
  );

  function reset() {
    setAmount('50000');
    setRate('18');
    setMode('add');
  }

  return (
    <ToolPageLayout
      slug="gst-calculator"
      h1="GST Calculator (India)"
      intro="Add GST to a base price, or work out how much of an all-inclusive amount is GST, at any standard Indian GST rate."
      calculator={
        <div>
          <div role="group" aria-label="Calculation mode" className="inline-flex rounded-[var(--radius-button)] border border-[var(--color-bone)] p-0.5 mb-5">
            <button
              type="button"
              aria-pressed={mode === 'add'}
              onClick={() => setMode('add')}
              className={`px-4 py-2 rounded-[2px] font-sans text-xs font-medium transition-colors ${mode === 'add' ? 'bg-[var(--color-midnight)] text-[var(--color-linen)]' : 'text-[var(--color-midnight)]/60'}`}
            >
              Add GST
            </button>
            <button
              type="button"
              aria-pressed={mode === 'remove'}
              onClick={() => setMode('remove')}
              className={`px-4 py-2 rounded-[2px] font-sans text-xs font-medium transition-colors ${mode === 'remove' ? 'bg-[var(--color-midnight)] text-[var(--color-linen)]' : 'text-[var(--color-midnight)]/60'}`}
            >
              Remove GST
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <CalculatorField
              label={mode === 'add' ? 'Base amount (before GST)' : 'Total amount (GST-inclusive)'}
              id="gst-amount"
              value={amount}
              onChange={setAmount}
              unit="₹"
              min={0}
            />
            <div>
              <label htmlFor="gst-rate" className="block font-sans text-xs font-medium text-[var(--color-midnight)]/70 mb-1.5">
                GST rate
              </label>
              <select
                id="gst-rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full rounded-[var(--radius-button)] border border-[var(--color-bone)] bg-white px-3.5 py-2.5 font-sans text-sm text-[var(--color-midnight)] focus:border-[var(--color-umber)]"
              >
                {RATES.map((r) => (
                  <option key={r} value={r}>
                    {r}%
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
              <ResultStat label="Base amount" value={formatNumber(result.baseAmount, 'INR')} />
              <ResultStat label="GST amount" value={formatNumber(result.gstAmount, 'INR')} />
              <ResultStat label="Total amount" value={formatNumber(result.totalAmount, 'INR')} emphasis />
            </ResultPanel>
          </div>
          {currency === 'USD' && <p className="mt-3 font-sans text-xs text-[var(--color-midnight)]/45">GST is an Indian tax, so results are always shown in INR regardless of your selected display currency.</p>}
        </div>
      }
      formulaExplanation={
        <>
          <p>To add GST to a base amount: GST amount = base × rate, and total = base + GST amount.</p>
          <p className="font-display text-lg" style={{ fontWeight: 400 }}>
            To remove GST from a total: base = total ÷ (1 + rate)
          </p>
          <p>The GST component is then the difference between the total and that calculated base amount.</p>
        </>
      }
      example={<p>Adding 18% GST to a {formatNumber(50000, 'INR')} base price gives a GST amount of {formatNumber(9000, 'INR')} and a total of {formatNumber(59000, 'INR')}. Removing 18% GST from a {formatNumber(59000, 'INR')} total gives back a base amount of exactly {formatNumber(50000, 'INR')}.</p>}
      interpretation={<p>Use "Add GST" when you have agreed a base price and need an invoice total. Use "Remove GST" when a total has already been agreed and you need to know how much of it is the GST component you will need to remit.</p>}
      faqs={[
        { question: 'What GST rate applies to digital and creative services?', answer: 'Most digital services in India fall under the 18% slab. Confirm with a chartered accountant if your specific service category may differ.' },
        { question: 'Is this tool a substitute for a chartered accountant?', answer: 'No — this calculates the arithmetic correctly, but registration thresholds, input tax credit, and filing obligations are specific to your situation and should be confirmed with a qualified professional.' },
      ]}
      disclaimer="This tool is for general educational purposes and is not tax advice. Confirm your specific obligations with a qualified chartered accountant."
    />
  );
}
