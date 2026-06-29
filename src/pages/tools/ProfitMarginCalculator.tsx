import { useMemo, useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { CalculatorField } from '@/components/tools/CalculatorField';
import { ResultPanel, ResultStat, ResetButton } from '@/components/tools/ResultPanel';
import { useCurrency } from '@/context/CurrencyContext';
import { formatNumber } from '@/utils/format';
import { calculateProfitMargin } from '@/utils/calculators';

export default function ProfitMarginCalculator() {
  const { currency } = useCurrency();
  const [revenue, setRevenue] = useState('500000');
  const [cogs, setCogs] = useState('250000');
  const [opex, setOpex] = useState('100000');

  const result = useMemo(
    () =>
      calculateProfitMargin({
        revenue: Math.max(0, Number(revenue) || 0),
        costOfGoodsSold: Math.max(0, Number(cogs) || 0),
        operatingExpenses: Math.max(0, Number(opex) || 0),
      }),
    [revenue, cogs, opex],
  );

  function reset() {
    setRevenue('500000');
    setCogs('250000');
    setOpex('100000');
  }

  return (
    <ToolPageLayout
      slug="profit-margin-calculator"
      h1="Profit Margin Calculator"
      intro="Calculate gross and net profit margin from revenue, cost of goods sold and operating expenses."
      calculator={
        <div>
          <div className="grid sm:grid-cols-3 gap-5">
            <CalculatorField label="Revenue" id="pm-revenue" value={revenue} onChange={setRevenue} unit={currency} min={0} />
            <CalculatorField label="Cost of goods sold" id="pm-cogs" value={cogs} onChange={setCogs} unit={currency} min={0} />
            <CalculatorField label="Operating expenses" id="pm-opex" value={opex} onChange={setOpex} unit={currency} min={0} />
          </div>
          <div className="mt-6 flex justify-end">
            <ResetButton onClick={reset} />
          </div>
          <div className="mt-5">
            <ResultPanel>
              <ResultStat label="Gross profit" value={formatNumber(result.grossProfit, currency)} />
              <ResultStat label="Gross margin" value={`${result.grossMarginPercent.toFixed(1)}%`} />
              <ResultStat label="Net profit" value={formatNumber(result.netProfit, currency)} />
              <ResultStat label="Net margin" value={`${result.netMarginPercent.toFixed(1)}%`} emphasis />
            </ResultPanel>
          </div>
        </div>
      }
      formulaExplanation={
        <>
          <p>Gross profit = Revenue − Cost of goods sold. Gross margin % = Gross profit ÷ Revenue × 100.</p>
          <p className="font-display text-lg" style={{ fontWeight: 400 }}>
            Net profit = Gross profit − Operating expenses
          </p>
          <p>Net margin % = Net profit ÷ Revenue × 100.</p>
        </>
      }
      example={
        <p>
          {formatNumber(500000, currency)} in revenue with {formatNumber(250000, currency)} in cost of goods sold
          gives a gross profit of {formatNumber(250000, currency)} (a 50% gross margin). After{' '}
          {formatNumber(100000, currency)} in operating expenses, net profit is {formatNumber(150000, currency)} — a
          30% net margin.
        </p>
      }
      interpretation={<p>Gross margin shows how efficiently a product itself is priced relative to its direct cost. Net margin shows what is actually left after running the business — a healthy gross margin can still produce a thin net margin if operating expenses are high.</p>}
      faqs={[
        { question: 'What should be included in "cost of goods sold"?', answer: 'Direct costs of producing what you sell — materials, manufacturing, and direct labour tied to the product. Rent, marketing and admin salaries are operating expenses, not COGS.' },
        { question: 'What is a "good" profit margin?', answer: 'It varies enormously by industry — software businesses often see net margins above 20%, while many retail and food businesses operate on net margins in the single digits. Compare against your specific sector, not a universal benchmark.' },
      ]}
    />
  );
}
