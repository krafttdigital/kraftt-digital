import { useMemo, useState } from 'react';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { CalculatorField } from '@/components/tools/CalculatorField';
import { ResultPanel, ResultStat, ResetButton } from '@/components/tools/ResultPanel';
import { useCurrency } from '@/context/CurrencyContext';
import { formatNumber, formatPlainNumber } from '@/utils/format';
import { calculateBreakEven } from '@/utils/calculators';

export default function BreakEvenCalculator() {
  const { currency } = useCurrency();
  const [fixedCosts, setFixedCosts] = useState('200000');
  const [price, setPrice] = useState('1500');
  const [variableCost, setVariableCost] = useState('600');

  const result = useMemo(
    () =>
      calculateBreakEven({
        fixedCosts: Math.max(0, Number(fixedCosts) || 0),
        pricePerUnit: Math.max(0, Number(price) || 0),
        variableCostPerUnit: Math.max(0, Number(variableCost) || 0),
      }),
    [fixedCosts, price, variableCost],
  );

  function reset() {
    setFixedCosts('200000');
    setPrice('1500');
    setVariableCost('600');
  }

  const isInfinite = !Number.isFinite(result.breakEvenUnits);

  return (
    <ToolPageLayout
      slug="break-even-calculator"
      h1="Break-even Calculator"
      intro="Find out how many units you need to sell — and at what revenue — before fixed and variable costs are fully covered."
      calculator={
        <div>
          <div className="grid sm:grid-cols-3 gap-5">
            <CalculatorField label="Fixed costs (monthly)" id="be-fixed" value={fixedCosts} onChange={setFixedCosts} unit={currency} min={0} />
            <CalculatorField label="Price per unit" id="be-price" value={price} onChange={setPrice} unit={currency} min={0} />
            <CalculatorField label="Variable cost per unit" id="be-var" value={variableCost} onChange={setVariableCost} unit={currency} min={0} />
          </div>
          <div className="mt-6 flex justify-end">
            <ResetButton onClick={reset} />
          </div>
          <div className="mt-5">
            <ResultPanel>
              <ResultStat label="Contribution margin per unit" value={formatNumber(result.contributionMargin, currency)} />
              <ResultStat label="Break-even units" value={isInfinite ? 'Not reachable' : formatPlainNumber(Math.ceil(result.breakEvenUnits))} emphasis />
              <ResultStat label="Break-even revenue" value={isInfinite ? 'Not reachable' : formatNumber(result.breakEvenRevenue, currency)} />
            </ResultPanel>
            {isInfinite && (
              <p className="mt-3 font-sans text-xs text-[var(--color-error)]">
                Your price per unit is at or below your variable cost per unit — at this pricing, no sales volume can cover fixed costs. Increase the price or reduce variable cost.
              </p>
            )}
          </div>
        </div>
      }
      formulaExplanation={
        <>
          <p className="font-display text-lg" style={{ fontWeight: 400 }}>
            Break-even units = Fixed costs ÷ (Price per unit − Variable cost per unit)
          </p>
          <p>The denominator is the "contribution margin" — how much each unit sold contributes toward covering fixed costs, after its own variable cost is paid. Break-even revenue is simply that unit count multiplied by the price per unit.</p>
        </>
      }
      example={
        <p>
          With {formatNumber(200000, currency)} in monthly fixed costs, a {formatNumber(1500, currency)} price per
          unit, and a {formatNumber(600, currency)} variable cost per unit, the contribution margin is{' '}
          {formatNumber(900, currency)}, giving a break-even point of 223 units, or {formatNumber(334500, currency)}{' '}
          in revenue.
        </p>
      }
      interpretation={<p>Selling fewer than the break-even number of units in a period means a loss; selling more means a profit, at the contribution-margin rate per additional unit.</p>}
      faqs={[
        { question: 'What counts as a "fixed cost"?', answer: 'Costs that do not change with sales volume — rent, salaries, software subscriptions and similar — over the period you are measuring, typically a month.' },
        { question: 'What if I sell multiple products at different prices?', answer: 'Run this calculation per product line using its own price and variable cost, or use a blended average price and variable cost across your product mix for a simpler estimate.' },
      ]}
    />
  );
}
