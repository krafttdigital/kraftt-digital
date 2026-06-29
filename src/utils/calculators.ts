// ============================================================================
// Kraftt Digital — calculator formula engine
// Every formula here is a standard, well-known financial or business
// formula (cited in each tool page's "How this is calculated" section).
// Centralising them means every tool page imports from one tested source
// instead of re-implementing maths in the component.
// ============================================================================

// ---------------------------------------------------------------------------
// 1. SIP (Systematic Investment Plan) calculator
// ---------------------------------------------------------------------------
export interface SipInput {
  monthlyInvestment: number;
  annualReturnPercent: number;
  years: number;
  annualStepUpPercent?: number;
}

export interface SipYearRow {
  year: number;
  invested: number;
  totalInvestedSoFar: number;
  endingValue: number;
}

export interface SipResult {
  totalInvested: number;
  estimatedReturns: number;
  maturityValue: number;
  yearly: SipYearRow[];
}

/**
 * Month-by-month simulation (rather than the closed-form annuity formula)
 * so an annual step-up in contribution can be modelled accurately and a
 * genuine year-by-year breakdown produced.
 */
export function calculateSip({ monthlyInvestment, annualReturnPercent, years, annualStepUpPercent = 0 }: SipInput): SipResult {
  const monthlyRate = annualReturnPercent / 100 / 12;
  let corpus = 0;
  let totalInvested = 0;
  let currentMonthly = monthlyInvestment;
  const yearly: SipYearRow[] = [];

  for (let year = 1; year <= years; year++) {
    let investedThisYear = 0;
    for (let m = 1; m <= 12; m++) {
      corpus = (corpus + currentMonthly) * (1 + monthlyRate);
      totalInvested += currentMonthly;
      investedThisYear += currentMonthly;
    }
    yearly.push({ year, invested: investedThisYear, totalInvestedSoFar: totalInvested, endingValue: corpus });
    currentMonthly = currentMonthly * (1 + annualStepUpPercent / 100);
  }

  return {
    totalInvested,
    estimatedReturns: corpus - totalInvested,
    maturityValue: corpus,
    yearly,
  };
}

// ---------------------------------------------------------------------------
// 2. Net worth calculator
// ---------------------------------------------------------------------------
export interface NetWorthInput {
  cash: number;
  investments: number;
  retirement: number;
  property: number;
  businessAssets: number;
  otherAssets: number;
  creditCardDebt: number;
  personalLoans: number;
  homeLoans: number;
  educationLoans: number;
  otherLiabilities: number;
}

export interface NetWorthResult {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  assetBreakdown: { label: string; value: number }[];
  liabilityBreakdown: { label: string; value: number }[];
}

export function calculateNetWorth(input: NetWorthInput): NetWorthResult {
  const assetBreakdown = [
    { label: 'Cash & bank balance', value: input.cash },
    { label: 'Investments', value: input.investments },
    { label: 'Retirement assets', value: input.retirement },
    { label: 'Property', value: input.property },
    { label: 'Business assets', value: input.businessAssets },
    { label: 'Other assets', value: input.otherAssets },
  ];
  const liabilityBreakdown = [
    { label: 'Credit card debt', value: input.creditCardDebt },
    { label: 'Personal loans', value: input.personalLoans },
    { label: 'Home loans', value: input.homeLoans },
    { label: 'Education loans', value: input.educationLoans },
    { label: 'Other liabilities', value: input.otherLiabilities },
  ];
  const totalAssets = assetBreakdown.reduce((s, a) => s + a.value, 0);
  const totalLiabilities = liabilityBreakdown.reduce((s, l) => s + l.value, 0);
  return { totalAssets, totalLiabilities, netWorth: totalAssets - totalLiabilities, assetBreakdown, liabilityBreakdown };
}

// ---------------------------------------------------------------------------
// 3. EMI calculator
// ---------------------------------------------------------------------------
export interface EmiInput {
  principal: number;
  annualRatePercent: number;
  tenureMonths: number;
}

export interface EmiYearRow {
  year: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export interface EmiResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  yearly: EmiYearRow[];
}

export function calculateEmi({ principal, annualRatePercent, tenureMonths }: EmiInput): EmiResult {
  const r = annualRatePercent / 100 / 12;
  const n = tenureMonths;
  const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  let balance = principal;
  const yearly: EmiYearRow[] = [];
  let yearPrincipal = 0;
  let yearInterest = 0;

  for (let m = 1; m <= n; m++) {
    const interestComponent = balance * r;
    const principalComponent = emi - interestComponent;
    balance = Math.max(balance - principalComponent, 0);
    yearPrincipal += principalComponent;
    yearInterest += interestComponent;

    if (m % 12 === 0 || m === n) {
      yearly.push({ year: Math.ceil(m / 12), principalPaid: yearPrincipal, interestPaid: yearInterest, balance });
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }

  const totalPayment = emi * n;
  return { emi, totalInterest: totalPayment - principal, totalPayment, yearly };
}

// ---------------------------------------------------------------------------
// 4. Compound interest calculator
// ---------------------------------------------------------------------------
export interface CompoundInterestInput {
  principal: number;
  annualRatePercent: number;
  years: number;
  compoundsPerYear: number; // 1 annual, 2 semi-annual, 4 quarterly, 12 monthly
}

export interface CompoundInterestResult {
  finalAmount: number;
  totalInterest: number;
}

export function calculateCompoundInterest({ principal, annualRatePercent, years, compoundsPerYear }: CompoundInterestInput): CompoundInterestResult {
  const r = annualRatePercent / 100;
  const finalAmount = principal * Math.pow(1 + r / compoundsPerYear, compoundsPerYear * years);
  return { finalAmount, totalInterest: finalAmount - principal };
}

// ---------------------------------------------------------------------------
// 5. GST calculator
// ---------------------------------------------------------------------------
export interface GstInput {
  amount: number;
  gstRatePercent: number;
  mode: 'add' | 'remove';
}

export interface GstResult {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
}

export function calculateGst({ amount, gstRatePercent, mode }: GstInput): GstResult {
  const rate = gstRatePercent / 100;
  if (mode === 'add') {
    const gstAmount = amount * rate;
    return { baseAmount: amount, gstAmount, totalAmount: amount + gstAmount };
  }
  // 'remove': `amount` is treated as the GST-inclusive total; work backwards.
  const baseAmount = amount / (1 + rate);
  const gstAmount = amount - baseAmount;
  return { baseAmount, gstAmount, totalAmount: amount };
}

// ---------------------------------------------------------------------------
// 6. Break-even calculator
// ---------------------------------------------------------------------------
export interface BreakEvenInput {
  fixedCosts: number;
  pricePerUnit: number;
  variableCostPerUnit: number;
}

export interface BreakEvenResult {
  contributionMargin: number;
  breakEvenUnits: number;
  breakEvenRevenue: number;
}

export function calculateBreakEven({ fixedCosts, pricePerUnit, variableCostPerUnit }: BreakEvenInput): BreakEvenResult {
  const contributionMargin = pricePerUnit - variableCostPerUnit;
  const breakEvenUnits = contributionMargin > 0 ? fixedCosts / contributionMargin : Infinity;
  return {
    contributionMargin,
    breakEvenUnits,
    breakEvenRevenue: breakEvenUnits === Infinity ? Infinity : breakEvenUnits * pricePerUnit,
  };
}

// ---------------------------------------------------------------------------
// 7. Profit margin calculator
// ---------------------------------------------------------------------------
export interface ProfitMarginInput {
  revenue: number;
  costOfGoodsSold: number;
  operatingExpenses: number;
}

export interface ProfitMarginResult {
  grossProfit: number;
  grossMarginPercent: number;
  netProfit: number;
  netMarginPercent: number;
}

export function calculateProfitMargin({ revenue, costOfGoodsSold, operatingExpenses }: ProfitMarginInput): ProfitMarginResult {
  const grossProfit = revenue - costOfGoodsSold;
  const netProfit = grossProfit - operatingExpenses;
  return {
    grossProfit,
    grossMarginPercent: revenue !== 0 ? (grossProfit / revenue) * 100 : 0,
    netProfit,
    netMarginPercent: revenue !== 0 ? (netProfit / revenue) * 100 : 0,
  };
}

// ---------------------------------------------------------------------------
// 8. Return on Ad Spend (ROAS) calculator
// ---------------------------------------------------------------------------
export interface RoasInput {
  revenueFromAds: number;
  adSpend: number;
}

export interface RoasResult {
  roas: number;
  roiPercent: number;
}

export function calculateRoas({ revenueFromAds, adSpend }: RoasInput): RoasResult {
  const roas = adSpend !== 0 ? revenueFromAds / adSpend : 0;
  const roiPercent = adSpend !== 0 ? ((revenueFromAds - adSpend) / adSpend) * 100 : 0;
  return { roas, roiPercent };
}

// ---------------------------------------------------------------------------
// 9. SEO ROI calculator
// ---------------------------------------------------------------------------
export interface SeoRoiInput {
  monthlyOrganicVisitors: number;
  conversionRatePercent: number;
  averageOrderValue: number;
  monthlySeoCost: number;
}

export interface SeoRoiResult {
  estimatedMonthlyConversions: number;
  estimatedMonthlyRevenue: number;
  netReturn: number;
  roiPercent: number;
}

export function calculateSeoRoi({ monthlyOrganicVisitors, conversionRatePercent, averageOrderValue, monthlySeoCost }: SeoRoiInput): SeoRoiResult {
  const estimatedMonthlyConversions = monthlyOrganicVisitors * (conversionRatePercent / 100);
  const estimatedMonthlyRevenue = estimatedMonthlyConversions * averageOrderValue;
  const netReturn = estimatedMonthlyRevenue - monthlySeoCost;
  const roiPercent = monthlySeoCost !== 0 ? (netReturn / monthlySeoCost) * 100 : 0;
  return { estimatedMonthlyConversions, estimatedMonthlyRevenue, netReturn, roiPercent };
}

// ---------------------------------------------------------------------------
// 10. Website cost calculator — maps real inputs to Kraftt's actual
//     Web Design packages rather than inventing a generic formula.
// ---------------------------------------------------------------------------
export interface WebsiteCostInput {
  pageCount: number;
  needsEcommerce: boolean;
  needsSeo: boolean;
  needsBlog: boolean;
}

export type RecommendedTier = 'web-starter' | 'web-business' | 'web-growth' | 'shopify-launch' | 'shopify-growth';

export function recommendWebsiteTier(input: WebsiteCostInput): RecommendedTier {
  if (input.needsEcommerce) {
    return input.pageCount > 20 || input.needsBlog ? 'shopify-growth' : 'shopify-launch';
  }
  if (input.pageCount <= 1) return 'web-starter';
  if (input.pageCount <= 7 && !input.needsBlog) return 'web-business';
  return 'web-growth';
}

// ---------------------------------------------------------------------------
// 11. Branding cost calculator — maps to real Brand Identity packages
// ---------------------------------------------------------------------------
export interface BrandingCostInput {
  needsLogoOnly: boolean;
  needsBusinessCollateral: boolean;
  needsFullGuidelines: boolean;
  needsIllustrations: boolean;
}

export type RecommendedBrandTier = 'brand-starter' | 'brand-identity-pkg' | 'full-brand-system';

export function recommendBrandingTier(input: BrandingCostInput): RecommendedBrandTier {
  if (input.needsFullGuidelines && input.needsIllustrations) return 'full-brand-system';
  if (input.needsBusinessCollateral || input.needsFullGuidelines) return 'brand-identity-pkg';
  return 'brand-starter';
}

// ---------------------------------------------------------------------------
// 12. Social media marketing cost calculator — maps to real Social packages
// ---------------------------------------------------------------------------
export interface SocialCostInput {
  platformCount: number;
  postsPerMonth: number;
  needsCommunityManagement: boolean;
}

export type RecommendedSocialTier = 'social-starter' | 'social-growth' | 'social-domination';

export function recommendSocialTier(input: SocialCostInput): RecommendedSocialTier {
  if (input.needsCommunityManagement || input.platformCount >= 3 || input.postsPerMonth >= 30) return 'social-domination';
  if (input.platformCount >= 2 || input.postsPerMonth >= 20) return 'social-growth';
  return 'social-starter';
}
