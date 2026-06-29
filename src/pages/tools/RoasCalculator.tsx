import { useMemo, useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { CalculatorField } from '@/components/tools/CalculatorField';
import { ResultPanel, ResultStat, ResetButton } from '@/components/tools/ResultPanel';
import { useCurrency } from '@/context/CurrencyContext';
import { formatNumber } from '@/utils/format';
import { calculateRoas } from '@/utils/calculators';

export default function RoasCalculator() {
  const { currency } = useCurrency();
  const [revenue, setRevenue] = useState('150000');
  const [spend, setSpend] = useState('30000');

  const result = useMemo(
    () => calculateRoas({ revenueFromAds: Math.max(0, Number(revenue) || 0), adSpend: Math.max(0, Number(spend) || 0) }),
    [revenue, spend],
  );

  function reset() {
    setRevenue('150000');
    setSpend('30000');
  }

  return (
    <ToolPageLayout
      slug="roas-calculator"
      h1="Return on Ad Spend (ROAS) Calculator"
      intro="Calculate ROAS and ROI percentage from your ad spend and the revenue it generated."
      calculator={
        <div>
          <div className="grid sm:grid-cols-2 gap-5">
            <CalculatorField label="Revenue from ads" id="roas-revenue" value={revenue} onChange={setRevenue} unit={currency} min={0} />
            <CalculatorField label="Ad spend" id="roas-spend" value={spend} onChange={setSpend} unit={currency} min={0} />
          </div>
          <div className="mt-6 flex justify-end">
            <ResetButton onClick={reset} />
          </div>
          <div className="mt-5">
            <ResultPanel>
              <ResultStat label="ROAS" value={`${result.roas.toFixed(2)}×`} emphasis />
              <ResultStat label="ROI" value={`${result.roiPercent.toFixed(0)}%`} />
            </ResultPanel>
          </div>
        </div>
      }
      formulaExplanation={
        <>
          <p className="font-display text-lg" style={{ fontWeight: 400 }}>
            ROAS = Revenue from ads ÷ Ad spend
          </p>
          <p>ROI % = (Revenue − Ad spend) ÷ Ad spend × 100</p>
          <p>ROAS is expressed as a multiple (e.g. "5×" means $5 of revenue for every $1 spent), while ROI is expressed as a percentage gain or loss relative to spend.</p>
        </>
      }
      example={
        <p>
          {formatNumber(150000, currency)} in revenue from {formatNumber(30000, currency)} in ad spend gives a ROAS
          of 5.00× and an ROI of 400%.
        </p>
      }
      interpretation={<p>A ROAS above 1× means the ad spend generated more revenue than it cost — but a "good" ROAS depends on your profit margin: a low-margin business needs a much higher ROAS to be profitable than a high-margin one.</p>}
      faqs={[
        { question: 'Is ROAS the same as profit?', answer: 'No — ROAS measures revenue against ad spend, not profit. A campaign can have a high ROAS and still be unprofitable if product costs, shipping and other expenses are not accounted for.' },
        { question: 'What counts as "revenue from ads"?', answer: 'Typically the total sales value directly attributed to a specific ad or campaign, as reported by your ad platform or analytics tool.' },
      ]}
    />
  );
}
