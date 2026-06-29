import { useMemo, useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { CalculatorField } from '@/components/tools/CalculatorField';
import { ResultPanel, ResultStat, ResetButton } from '@/components/tools/ResultPanel';
import { SimpleBarChart } from '@/components/tools/SimpleBarChart';
import { useCurrency } from '@/context/CurrencyContext';
import { formatNumber } from '@/utils/format';
import { calculateEmi } from '@/utils/calculators';

export default function EmiCalculator() {
  const { currency } = useCurrency();
  const [principal, setPrincipal] = useState('1000000');
  const [rate, setRate] = useState('9.5');
  const [tenureYears, setTenureYears] = useState('5');

  const result = useMemo(() => {
    const p = Math.max(0, Number(principal) || 0);
    const r = Math.max(0, Number(rate) || 0);
    const months = Math.max(1, (Number(tenureYears) || 1) * 12);
    return calculateEmi({ principal: p, annualRatePercent: r, tenureMonths: months });
  }, [principal, rate, tenureYears]);

  function reset() {
    setPrincipal('1000000');
    setRate('9.5');
    setTenureYears('5');
  }

  const chartRows = result.yearly.map((y) => ({ label: `Y${y.year}`, value: y.balance }));

  return (
    <ToolPageLayout
      slug="emi-calculator"
      h1="EMI Calculator"
      intro="Calculate the equated monthly instalment (EMI) for a loan, total interest paid, and a year-by-year breakdown of principal versus interest."
      calculator={
        <div>
          <div className="grid sm:grid-cols-3 gap-5">
            <CalculatorField label="Loan amount" id="emi-principal" value={principal} onChange={setPrincipal} unit={currency} min={0} />
            <CalculatorField label="Annual interest rate" id="emi-rate" value={rate} onChange={setRate} unit="%" min={0} max={40} step={0.1} />
            <CalculatorField label="Loan tenure" id="emi-tenure" value={tenureYears} onChange={setTenureYears} unit="years" min={1} max={40} />
          </div>
          <div className="mt-6 flex justify-end">
            <ResetButton onClick={reset} />
          </div>
          <div className="mt-5">
            <ResultPanel>
              <ResultStat label="Monthly EMI" value={formatNumber(result.emi, currency)} emphasis />
              <ResultStat label="Total interest" value={formatNumber(result.totalInterest, currency)} />
              <ResultStat label="Total payment" value={formatNumber(result.totalPayment, currency)} />
            </ResultPanel>
          </div>
          {chartRows.length > 1 && (
            <div className="mt-8">
              <h2 className="eyebrow mb-3">Remaining balance by year</h2>
              <SimpleBarChart rows={chartRows} valueFormatter={(n) => formatNumber(n, currency)} caption="Outstanding loan balance at the end of each year" />
            </div>
          )}
        </div>
      }
      formulaExplanation={
        <>
          <p className="font-display text-lg" style={{ fontWeight: 400 }}>
            EMI = P × r × (1 + r)ⁿ ÷ [(1 + r)ⁿ − 1]
          </p>
          <p>Where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly instalments. Each month's payment splits between interest (on the remaining balance) and principal, with the interest portion shrinking and the principal portion growing over the loan's life.</p>
        </>
      }
      example={
        <p>
          A {formatNumber(1000000, currency)} loan at 9.5% annual interest over 5 years produces a monthly EMI of
          roughly {formatNumber(calculateEmi({ principal: 1000000, annualRatePercent: 9.5, tenureMonths: 60 }).emi, currency)}, with total interest of about{' '}
          {formatNumber(calculateEmi({ principal: 1000000, annualRatePercent: 9.5, tenureMonths: 60 }).totalInterest, currency)} over the loan's life.
        </p>
      }
      interpretation={<p>Early payments are weighted more heavily toward interest; later payments are weighted more toward principal. The year-by-year chart above shows how the outstanding balance declines — slowly at first, faster later.</p>}
      faqs={[
        { question: 'Does this include processing fees or insurance?', answer: 'No — this calculates the core EMI from principal, rate and tenure only. Add any processing fees or insurance premiums separately, as lenders apply these differently.' },
        { question: 'What happens if I make a prepayment?', answer: 'A lump-sum prepayment reduces the outstanding principal, which reduces either the remaining tenure or the EMI going forward, depending on what your lender allows — this calculator does not model prepayments directly.' },
      ]}
    />
  );
}
