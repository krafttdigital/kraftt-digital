import { useMemo, useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { CalculatorField } from '@/components/tools/CalculatorField';
import { ResultPanel, ResultStat, ResetButton } from '@/components/tools/ResultPanel';
import { SimpleBarChart } from '@/components/tools/SimpleBarChart';
import { useCurrency } from '@/context/CurrencyContext';
import { formatNumber } from '@/utils/format';
import { calculateSip } from '@/utils/calculators';

const DEFAULTS = { monthlyInvestment: 10000, annualReturnPercent: 12, years: 15, annualStepUpPercent: 0 };

export default function SipCalculator() {
  const { currency } = useCurrency();
  const [monthlyInvestment, setMonthlyInvestment] = useState(String(DEFAULTS.monthlyInvestment));
  const [annualReturnPercent, setAnnualReturnPercent] = useState(String(DEFAULTS.annualReturnPercent));
  const [years, setYears] = useState(String(DEFAULTS.years));
  const [stepUp, setStepUp] = useState(String(DEFAULTS.annualStepUpPercent));

  const result = useMemo(() => {
    const monthly = Math.max(0, Number(monthlyInvestment) || 0);
    const rate = Math.max(0, Number(annualReturnPercent) || 0);
    const yrs = Math.min(50, Math.max(1, Number(years) || 1));
    const step = Math.max(0, Number(stepUp) || 0);
    return calculateSip({ monthlyInvestment: monthly, annualReturnPercent: rate, years: yrs, annualStepUpPercent: step });
  }, [monthlyInvestment, annualReturnPercent, years, stepUp]);

  function reset() {
    setMonthlyInvestment(String(DEFAULTS.monthlyInvestment));
    setAnnualReturnPercent(String(DEFAULTS.annualReturnPercent));
    setYears(String(DEFAULTS.years));
    setStepUp(String(DEFAULTS.annualStepUpPercent));
  }

  const chartRows = result.yearly
    .filter((_, i) => i % Math.max(1, Math.ceil(result.yearly.length / 12)) === 0 || i === result.yearly.length - 1)
    .map((y) => ({ label: `Y${y.year}`, value: y.endingValue }));

  return (
    <ToolPageLayout
      slug="sip-calculator"
      h1="SIP Calculator — Mutual Fund Investment Growth"
      intro="A Systematic Investment Plan (SIP) means investing a fixed amount every month rather than one lump sum. Enter your monthly contribution, an assumed annual return, and a duration to see an estimated maturity value."
      calculator={
        <div>
          <div className="grid sm:grid-cols-2 gap-5">
            <CalculatorField label="Monthly investment" id="sip-monthly" value={monthlyInvestment} onChange={setMonthlyInvestment} unit={currency} min={0} />
            <CalculatorField label="Expected annual return" id="sip-return" value={annualReturnPercent} onChange={setAnnualReturnPercent} unit="%" min={0} max={40} step={0.5} />
            <CalculatorField label="Investment duration" id="sip-years" value={years} onChange={setYears} unit="years" min={1} max={50} />
            <CalculatorField
              label="Annual step-up (optional)"
              id="sip-stepup"
              value={stepUp}
              onChange={setStepUp}
              unit="%"
              min={0}
              max={50}
              helpText="Increases your monthly contribution by this percentage every year."
            />
          </div>
          <div className="mt-6 flex justify-end">
            <ResetButton onClick={reset} />
          </div>
          <div className="mt-5">
            <ResultPanel>
              <ResultStat label="Total invested" value={formatNumber(result.totalInvested, currency)} />
              <ResultStat label="Estimated returns" value={formatNumber(result.estimatedReturns, currency)} />
              <ResultStat label="Maturity value" value={formatNumber(result.maturityValue, currency)} emphasis />
            </ResultPanel>
          </div>
          {chartRows.length > 1 && (
            <div className="mt-8">
              <h2 className="eyebrow mb-3">Year-by-year growth</h2>
              <SimpleBarChart rows={chartRows} valueFormatter={(n) => formatNumber(n, currency)} caption="Estimated corpus value by year" />
            </div>
          )}
        </div>
      }
      formulaExplanation={
        <>
          <p>
            This calculator simulates your SIP month by month rather than using a single closed-form formula, because
            an annual step-up changes the contribution amount partway through the timeline. Each month, the existing
            corpus plus that month's contribution grows by the monthly rate (the annual rate divided by 12):
          </p>
          <p className="font-display text-lg" style={{ fontWeight: 400 }}>
            corpus = (corpus + monthly contribution) × (1 + monthly rate)
          </p>
          <p>At the end of each year, if a step-up percentage is set, the monthly contribution increases by that percentage for the following year.</p>
        </>
      }
      example={
        <p>
          Investing {formatNumber(10000, currency)} a month at a 12% expected annual return for 15 years, with no
          step-up, grows to an estimated maturity value of roughly{' '}
          {formatNumber(calculateSip({ monthlyInvestment: 10000, annualReturnPercent: 12, years: 15 }).maturityValue, currency)}, from a total invested
          amount of {formatNumber(calculateSip({ monthlyInvestment: 10000, annualReturnPercent: 12, years: 15 }).totalInvested, currency)}.
        </p>
      }
      interpretation={
        <>
          <p>
            The gap between "total invested" and "maturity value" is the estimated return generated purely by
            compounding — the longer the duration, the larger that gap becomes relative to the amount you actually
            put in.
          </p>
          <p>A step-up percentage models a contribution that grows with your income, rather than staying flat for the entire period.</p>
        </>
      }
      faqs={[
        { question: 'What annual return should I assume?', answer: 'There is no universally correct number — it depends on the asset class and risk level of the fund. Use a conservative, well-researched assumption rather than an optimistic one, and treat the result as an estimate, not a promise.' },
        { question: 'Does this account for taxes or fund expense ratios?', answer: 'No — this is a gross-of-fees, gross-of-tax estimate. Actual returns will be reduced by fund expense ratios and any applicable capital gains tax.' },
        { question: 'What does the step-up percentage actually change?', answer: 'It increases your monthly contribution by that percentage at the start of each new year in the simulation, modelling an income that grows over time.' },
      ]}
      disclaimer="Returns shown are illustrative estimates based on the assumptions you enter, not guarantees. Mutual fund investments are subject to market risk."
    />
  );
}
