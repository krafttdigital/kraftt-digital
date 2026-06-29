import { useMemo, useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { CalculatorField } from '@/components/tools/CalculatorField';
import { ResultPanel, ResultStat, ResetButton } from '@/components/tools/ResultPanel';
import { useCurrency } from '@/context/CurrencyContext';
import { formatNumber } from '@/utils/format';
import { calculateNetWorth } from '@/utils/calculators';

const fields = [
  { key: 'cash', label: 'Cash & bank balance', group: 'asset' },
  { key: 'investments', label: 'Investments', group: 'asset' },
  { key: 'retirement', label: 'Retirement assets', group: 'asset' },
  { key: 'property', label: 'Property', group: 'asset' },
  { key: 'businessAssets', label: 'Business assets', group: 'asset' },
  { key: 'otherAssets', label: 'Other assets', group: 'asset' },
  { key: 'creditCardDebt', label: 'Credit card debt', group: 'liability' },
  { key: 'personalLoans', label: 'Personal loans', group: 'liability' },
  { key: 'homeLoans', label: 'Home loans', group: 'liability' },
  { key: 'educationLoans', label: 'Education loans', group: 'liability' },
  { key: 'otherLiabilities', label: 'Other liabilities', group: 'liability' },
] as const;

type Key = (typeof fields)[number]['key'];

export default function NetWorthCalculator() {
  const { currency } = useCurrency();
  const [values, setValues] = useState<Record<Key, string>>({
    cash: '', investments: '', retirement: '', property: '', businessAssets: '', otherAssets: '',
    creditCardDebt: '', personalLoans: '', homeLoans: '', educationLoans: '', otherLiabilities: '',
  });

  const result = useMemo(() => {
    const n = (k: Key) => Math.max(0, Number(values[k]) || 0);
    return calculateNetWorth({
      cash: n('cash'), investments: n('investments'), retirement: n('retirement'), property: n('property'),
      businessAssets: n('businessAssets'), otherAssets: n('otherAssets'), creditCardDebt: n('creditCardDebt'),
      personalLoans: n('personalLoans'), homeLoans: n('homeLoans'), educationLoans: n('educationLoans'),
      otherLiabilities: n('otherLiabilities'),
    });
  }, [values]);

  function reset() {
    setValues({ cash: '', investments: '', retirement: '', property: '', businessAssets: '', otherAssets: '', creditCardDebt: '', personalLoans: '', homeLoans: '', educationLoans: '', otherLiabilities: '' });
  }

  return (
    <ToolPageLayout
      slug="net-worth-calculator"
      h1="Net Worth Calculator"
      intro="Add up everything you own and everything you owe to see your current net worth. Every figure stays in your browser — nothing is sent to a server."
      calculator={
        <div>
          <h2 className="eyebrow mb-3">Assets</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {fields.filter((f) => f.group === 'asset').map((f) => (
              <CalculatorField key={f.key} label={f.label} id={`nw-${f.key}`} value={values[f.key]} onChange={(v) => setValues((p) => ({ ...p, [f.key]: v }))} unit={currency} min={0} />
            ))}
          </div>

          <h2 className="eyebrow mt-8 mb-3">Liabilities</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {fields.filter((f) => f.group === 'liability').map((f) => (
              <CalculatorField key={f.key} label={f.label} id={`nw-${f.key}`} value={values[f.key]} onChange={(v) => setValues((p) => ({ ...p, [f.key]: v }))} unit={currency} min={0} />
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <ResetButton onClick={reset} />
          </div>

          <div className="mt-5">
            <ResultPanel>
              <ResultStat label="Total assets" value={formatNumber(result.totalAssets, currency)} />
              <ResultStat label="Total liabilities" value={formatNumber(result.totalLiabilities, currency)} />
              <ResultStat label="Net worth" value={formatNumber(result.netWorth, currency)} emphasis />
            </ResultPanel>
          </div>

          <p className="mt-4 font-sans text-xs text-[var(--color-midnight)]/45">
            Privacy: this calculation runs entirely in your browser. No figures you enter are transmitted to or stored on our servers.
          </p>
        </div>
      }
      formulaExplanation={
        <>
          <p className="font-display text-lg" style={{ fontWeight: 400 }}>
            Net worth = Total assets − Total liabilities
          </p>
          <p>Total assets is the sum of cash, investments, retirement accounts, property, business assets and any other assets. Total liabilities is the sum of all debts: credit cards, personal loans, home loans, education loans and other liabilities.</p>
        </>
      }
      example={
        <p>
          Someone with {formatNumber(500000, currency)} in cash and investments, {formatNumber(2000000, currency)} in
          property, and {formatNumber(1200000, currency)} remaining on a home loan has total assets of{' '}
          {formatNumber(2500000, currency)}, total liabilities of {formatNumber(1200000, currency)}, and a net worth
          of {formatNumber(1300000, currency)}.
        </p>
      }
      interpretation={
        <p>
          A positive net worth means assets exceed liabilities; a negative figure means the reverse. Net worth is a
          snapshot at one point in time — tracking it every few months shows the trend more clearly than any single
          calculation.
        </p>
      }
      faqs={[
        { question: 'Is my data saved anywhere?', answer: 'No. This calculator runs entirely client-side in your browser. Nothing you enter here is sent to or stored on our servers.' },
        { question: 'Should I include the value of my car or other personal items?', answer: 'You can add resale-value items under "Other assets" if you want a complete picture, though many people exclude rapidly-depreciating personal items from a net worth calculation.' },
        { question: 'How often should I recalculate this?', answer: 'Quarterly or twice a year is common — frequent enough to see a trend, infrequent enough that day-to-day market noise does not distort the picture.' },
      ]}
      disclaimer="This tool is for general educational purposes and does not constitute personalised financial advice."
    />
  );
}
