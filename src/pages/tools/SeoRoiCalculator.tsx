import { useMemo, useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { CalculatorField } from '@/components/tools/CalculatorField';
import { ResultPanel, ResultStat, ResetButton } from '@/components/tools/ResultPanel';
import { useCurrency } from '@/context/CurrencyContext';
import { formatNumber, formatPlainNumber } from '@/utils/format';
import { calculateSeoRoi } from '@/utils/calculators';

const DEFAULTS = { monthlyOrganicVisitors: 2000, conversionRatePercent: 2, averageOrderValue: 3000, monthlySeoCost: 22000 };

export default function SeoRoiCalculator() {
  const { currency } = useCurrency();
  const [visitors, setVisitors] = useState(String(DEFAULTS.monthlyOrganicVisitors));
  const [conversionRate, setConversionRate] = useState(String(DEFAULTS.conversionRatePercent));
  const [aov, setAov] = useState(String(DEFAULTS.averageOrderValue));
  const [seoCost, setSeoCost] = useState(String(DEFAULTS.monthlySeoCost));

  const result = useMemo(() => {
    return calculateSeoRoi({
      monthlyOrganicVisitors: Math.max(0, Number(visitors) || 0),
      conversionRatePercent: Math.max(0, Number(conversionRate) || 0),
      averageOrderValue: Math.max(0, Number(aov) || 0),
      monthlySeoCost: Math.max(0, Number(seoCost) || 0),
    });
  }, [visitors, conversionRate, aov, seoCost]);

  function reset() {
    setVisitors(String(DEFAULTS.monthlyOrganicVisitors));
    setConversionRate(String(DEFAULTS.conversionRatePercent));
    setAov(String(DEFAULTS.averageOrderValue));
    setSeoCost(String(DEFAULTS.monthlySeoCost));
  }

  return (
    <ToolPageLayout
      slug="seo-roi-calculator"
      h1="SEO ROI Calculator"
      intro="Estimate the monthly return on an SEO investment, based on your expected organic traffic, conversion rate, average order value and monthly SEO spend."
      calculator={
        <div>
          <div className="grid sm:grid-cols-2 gap-5">
            <CalculatorField label="Monthly organic visitors" id="seo-visitors" value={visitors} onChange={setVisitors} unit="visits" min={0} />
            <CalculatorField label="Conversion rate" id="seo-cr" value={conversionRate} onChange={setConversionRate} unit="%" min={0} max={100} step={0.1} />
            <CalculatorField label="Average order value" id="seo-aov" value={aov} onChange={setAov} unit={currency} min={0} />
            <CalculatorField label="Monthly SEO cost" id="seo-cost" value={seoCost} onChange={setSeoCost} unit={currency} min={0} />
          </div>

          <div className="mt-6 flex justify-end">
            <ResetButton onClick={reset} />
          </div>

          <div className="mt-5">
            <ResultPanel>
              <ResultStat label="Estimated monthly conversions" value={formatPlainNumber(result.estimatedMonthlyConversions)} />
              <ResultStat label="Estimated monthly revenue" value={formatNumber(result.estimatedMonthlyRevenue, currency)} />
              <ResultStat label="Net return" value={formatNumber(result.netReturn, currency)} />
              <ResultStat label="ROI" value={`${result.roiPercent.toFixed(0)}%`} emphasis />
            </ResultPanel>
          </div>
        </div>
      }
      formulaExplanation={
        <>
          <p>Estimated monthly conversions = monthly organic visitors × conversion rate.</p>
          <p>Estimated monthly revenue = estimated conversions × average order value.</p>
          <p className="font-display text-lg" style={{ fontWeight: 400 }}>
            ROI % = (revenue − SEO cost) ÷ SEO cost × 100
          </p>
        </>
      }
      example={
        <p>
          2,000 monthly organic visitors at a 2% conversion rate produce 40 estimated conversions. At an average
          order value of {formatNumber(3000, currency)}, that is {formatNumber(120000, currency)} in estimated
          monthly revenue — against a monthly SEO cost of {formatNumber(22000, currency)}, an ROI of roughly 445%.
        </p>
      }
      interpretation={<p>This is an estimate built from inputs you control, not a guarantee of traffic or conversion outcomes. Use conservative, evidence-based numbers — current analytics data if you have it — rather than optimistic guesses.</p>}
      faqs={[
        { question: 'Where do I get a realistic conversion rate to enter?', answer: 'Your own analytics, if the site already has traffic, is the most reliable source. Without existing data, industry benchmarks for your sector are a reasonable starting estimate.' },
        { question: 'Does this account for how long SEO takes to produce results?', answer: 'No — this calculates a snapshot ROI once a given level of traffic exists. SEO traffic typically builds gradually over months, not instantly after starting an engagement.' },
      ]}
      disclaimer="This tool produces an estimate based on the figures you enter. It does not predict actual traffic, conversion rates or revenue."
    />
  );
}
