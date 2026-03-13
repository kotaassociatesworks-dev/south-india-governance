// ============================================================
// TAX STRATEGY ENGINE — Intelligent Tax Planning System
// Layer 3: Financial Intelligence Engine
// ============================================================

import { calculateIncomeTax, type IncomeBreakdown, type Deductions, type TaxResult } from './taxEngine';

export interface FinancialProfile {
  salary: number;
  businessIncome: number;
  capitalGains: number;
  rentalIncome: number;
  otherIncome: number;
  section80C: number;
  section80D: number;
  section80G: number;
  section80CCD: number;
  homeLoanInterest: number;
  elssInvestment: number;
  ppfInvestment: number;
  npsInvestment: number;
  lifeInsurance: number;
  healthInsurance: number;
  tuitionFees: number;
}

export interface TaxSavingSuggestion {
  id: string;
  section: string;
  title: string;
  currentAmount: number;
  maxLimit: number;
  unusedCapacity: number;
  potentialTaxSaving: number;
  priority: 'high' | 'medium' | 'low';
  professionalExplanation: string;
  simpleExplanation: string;
  investments: { name: string; description: string; riskLevel: string }[];
}

export interface RegimeRecommendation {
  recommendedRegime: 'old' | 'new';
  oldRegimeTax: number;
  newRegimeTax: number;
  savings: number;
  reason: string;
  oldResult: TaxResult;
  newResult: TaxResult;
}

export interface YearlyPlanAction {
  quarter: string;
  actions: string[];
}

export interface StrategyResult {
  profile: FinancialProfile;
  regimeRecommendation: RegimeRecommendation;
  suggestions: TaxSavingSuggestion[];
  totalPotentialSaving: number;
  taxBeforeOptimization: number;
  taxAfterOptimization: number;
  optimizationPercentage: number;
  yearlyPlan: YearlyPlanAction[];
  aiInsights: string[];
}

const DEDUCTION_LIMITS: Record<string, { max: number; section: string; title: string }> = {
  section80C: { max: 150000, section: 'Section 80C', title: 'Tax-saving Investments' },
  section80D: { max: 50000, section: 'Section 80D', title: 'Health Insurance Premium' },
  section80G: { max: Infinity, section: 'Section 80G', title: 'Charitable Donations' },
  section80CCD: { max: 50000, section: 'Section 80CCD(1B)', title: 'NPS Additional Contribution' },
  homeLoanInterest: { max: 200000, section: 'Section 24(b)', title: 'Home Loan Interest' },
};

const INVESTMENT_OPTIONS: Record<string, { name: string; description: string; riskLevel: string }[]> = {
  section80C: [
    { name: 'ELSS Mutual Funds', description: '3-year lock-in, market-linked returns (~12-15% p.a.)', riskLevel: 'Moderate' },
    { name: 'Public Provident Fund (PPF)', description: '15-year lock-in, guaranteed returns (~7.1% p.a.)', riskLevel: 'Low' },
    { name: 'Tax-saving Fixed Deposit', description: '5-year lock-in, fixed interest (~6-7% p.a.)', riskLevel: 'Low' },
    { name: 'National Savings Certificate', description: '5-year tenure, compounding interest', riskLevel: 'Low' },
  ],
  section80D: [
    { name: 'Health Insurance (Self)', description: 'Up to ₹25,000 for self, spouse & children', riskLevel: 'N/A' },
    { name: 'Health Insurance (Parents)', description: 'Additional ₹25,000 (₹50,000 if senior)', riskLevel: 'N/A' },
    { name: 'Preventive Health Checkup', description: 'Up to ₹5,000 included within 80D limit', riskLevel: 'N/A' },
  ],
  section80CCD: [
    { name: 'National Pension System (NPS)', description: 'Additional ₹50,000 over 80C limit, long-term retirement', riskLevel: 'Moderate' },
  ],
  section80G: [
    { name: 'PM National Relief Fund', description: '100% deduction, no upper limit', riskLevel: 'N/A' },
    { name: 'Approved Charitable Institutions', description: '50% deduction with qualifying limit', riskLevel: 'N/A' },
  ],
  homeLoanInterest: [
    { name: 'Home Loan Interest', description: 'Deduction on interest paid for self-occupied property', riskLevel: 'N/A' },
  ],
};

function buildIncomeBreakdown(p: FinancialProfile): IncomeBreakdown {
  return {
    salary: p.salary,
    businessIncome: p.businessIncome,
    capitalGains: p.capitalGains,
    rentalIncome: p.rentalIncome,
    otherIncome: p.otherIncome,
  };
}

function buildDeductions(p: FinancialProfile): Deductions {
  return {
    section80C: p.section80C + p.elssInvestment + p.ppfInvestment + p.lifeInsurance + p.tuitionFees,
    section80D: p.section80D + p.healthInsurance,
    section80G: p.section80G,
    section80CCD: p.section80CCD + p.npsInvestment,
    homeLoanInterest: p.homeLoanInterest,
    standardDeduction: 0,
  };
}

function getRegimeRecommendation(income: IncomeBreakdown, deductions: Deductions): RegimeRecommendation {
  const oldResult = calculateIncomeTax(income, deductions, 'old');
  const newResult = calculateIncomeTax(income, deductions, 'new');
  const oldBetter = oldResult.totalTax <= newResult.totalTax;

  const totalDed = oldResult.totalDeductions;
  let reason: string;
  if (oldBetter) {
    reason = totalDed > 200000
      ? `Your deductions total ₹${totalDed.toLocaleString('en-IN')}, significantly exceeding ₹2,00,000. The Old Regime allows you to claim these deductions, resulting in lower tax.`
      : `Even with moderate deductions of ₹${totalDed.toLocaleString('en-IN')}, the Old Regime produces a lower tax liability for your income level.`;
  } else {
    reason = totalDed < 150000
      ? `Your total deductions of ₹${totalDed.toLocaleString('en-IN')} are below ₹1,50,000. The New Regime's lower slab rates provide better savings without needing deductions.`
      : `Despite deductions of ₹${totalDed.toLocaleString('en-IN')}, the New Regime's restructured slabs produce a lower tax for your income bracket.`;
  }

  return {
    recommendedRegime: oldBetter ? 'old' : 'new',
    oldRegimeTax: oldResult.totalTax,
    newRegimeTax: newResult.totalTax,
    savings: Math.abs(oldResult.totalTax - newResult.totalTax),
    reason,
    oldResult,
    newResult,
  };
}

function generateSuggestions(profile: FinancialProfile, marginalRate: number): TaxSavingSuggestion[] {
  const suggestions: TaxSavingSuggestion[] = [];
  const ded = buildDeductions(profile);

  const checks: { key: keyof typeof DEDUCTION_LIMITS; currentVal: number }[] = [
    { key: 'section80C', currentVal: Math.min(ded.section80C, 150000) },
    { key: 'section80D', currentVal: Math.min(ded.section80D, 50000) },
    { key: 'section80CCD', currentVal: Math.min(ded.section80CCD, 50000) },
    { key: 'section80G', currentVal: ded.section80G },
    { key: 'homeLoanInterest', currentVal: Math.min(ded.homeLoanInterest, 200000) },
  ];

  for (const { key, currentVal } of checks) {
    const info = DEDUCTION_LIMITS[key];
    if (info.max === Infinity) continue; // skip unlimited sections
    const unused = info.max - currentVal;
    if (unused <= 0) continue;

    const potentialSaving = Math.round(unused * marginalRate);
    const priority: 'high' | 'medium' | 'low' = unused >= 100000 ? 'high' : unused >= 25000 ? 'medium' : 'low';

    suggestions.push({
      id: key,
      section: info.section,
      title: info.title,
      currentAmount: currentVal,
      maxLimit: info.max,
      unusedCapacity: unused,
      potentialTaxSaving: potentialSaving,
      priority,
      professionalExplanation: `${info.section} permits deductions up to ₹${info.max.toLocaleString('en-IN')}. You have utilized ₹${currentVal.toLocaleString('en-IN')}, leaving ₹${unused.toLocaleString('en-IN')} of unused capacity. Investing the remaining amount could reduce your tax liability by approximately ₹${potentialSaving.toLocaleString('en-IN')}.`,
      simpleExplanation: `You can still save up to ₹${potentialSaving.toLocaleString('en-IN')} in tax by investing ₹${unused.toLocaleString('en-IN')} more in approved ${info.title.toLowerCase()} options.`,
      investments: INVESTMENT_OPTIONS[key] || [],
    });
  }

  return suggestions.sort((a, b) => b.potentialTaxSaving - a.potentialTaxSaving);
}

function generateYearlyPlan(suggestions: TaxSavingSuggestion[]): YearlyPlanAction[] {
  const plan: YearlyPlanAction[] = [
    { quarter: 'Q1 (Apr-Jun)', actions: ['Review existing investments and insurance renewals', 'Start SIP in ELSS mutual funds for Section 80C'] },
    { quarter: 'Q2 (Jul-Sep)', actions: ['Assess advance tax liability for first installment', 'Renew health insurance policies for Section 80D'] },
    { quarter: 'Q3 (Oct-Dec)', actions: ['Maximize NPS contributions under Section 80CCD(1B)', 'Review charitable donations for Section 80G'] },
    { quarter: 'Q4 (Jan-Mar)', actions: ['Complete remaining Section 80C investments before March 31', 'Gather all proof-of-investment documents for employer'] },
  ];

  if (suggestions.find(s => s.id === 'section80C' && s.priority === 'high')) {
    plan[0].actions.push('Prioritize 80C investments early — start PPF or ELSS SIPs immediately');
  }
  if (suggestions.find(s => s.id === 'section80D')) {
    plan[1].actions.push('Compare health insurance plans and purchase before renewal deadline');
  }

  return plan;
}

function generateAIInsights(profile: FinancialProfile, regime: RegimeRecommendation): string[] {
  const insights: string[] = [];
  const gross = profile.salary + profile.businessIncome + profile.capitalGains + profile.rentalIncome + profile.otherIncome;

  if (profile.businessIncome > 0 && profile.businessIncome / gross > 0.3) {
    insights.push('Your business income constitutes over 30% of total income. Consider restructuring expenses and maintaining proper books for presumptive taxation under Section 44AD/44ADA.');
  }

  if (profile.capitalGains > 500000) {
    insights.push('Significant capital gains detected. Consider tax-loss harvesting strategies and stagger asset sales across financial years to stay within lower slab brackets.');
  }

  if (profile.rentalIncome > 0 && profile.homeLoanInterest === 0) {
    insights.push('You have rental income but no home loan interest deduction. If you have a housing loan, ensure you are claiming the interest deduction under Section 24(b).');
  }

  if (regime.savings > 50000) {
    insights.push(`Choosing the ${regime.recommendedRegime === 'old' ? 'Old' : 'New'} Regime saves you ₹${regime.savings.toLocaleString('en-IN')}. This is a significant difference — ensure your employer is deducting TDS under the optimal regime.`);
  }

  if (profile.section80CCD + profile.npsInvestment === 0 && gross > 1000000) {
    insights.push('You are not utilizing the NPS benefit under Section 80CCD(1B). An additional ₹50,000 deduction beyond 80C is available, potentially saving ₹15,600 at the 30% bracket + cess.');
  }

  if (gross > 5000000) {
    insights.push('Your income exceeds ₹50 lakh. Be mindful of surcharge implications and consider income splitting strategies through HUF or family trusts where legally permissible.');
  }

  if (insights.length === 0) {
    insights.push('Your current tax planning appears well-optimized. Continue monitoring for regulatory changes that may affect your deductions.');
  }

  return insights;
}

function getMarginalRate(taxableIncome: number): number {
  if (taxableIncome > 1500000) return 0.312; // 30% + 4% cess
  if (taxableIncome > 1200000) return 0.208;
  if (taxableIncome > 1000000) return 0.156;
  if (taxableIncome > 500000) return 0.052;
  return 0;
}

export function analyzeStrategy(profile: FinancialProfile): StrategyResult {
  const income = buildIncomeBreakdown(profile);
  const deductions = buildDeductions(profile);

  const regimeRecommendation = getRegimeRecommendation(income, deductions);
  const bestResult = regimeRecommendation.recommendedRegime === 'old' ? regimeRecommendation.oldResult : regimeRecommendation.newResult;

  const marginalRate = getMarginalRate(bestResult.taxableIncome);
  const suggestions = generateSuggestions(profile, marginalRate);
  const totalPotentialSaving = suggestions.reduce((s, v) => s + v.potentialTaxSaving, 0);

  const taxBeforeOptimization = bestResult.totalTax;
  const taxAfterOptimization = Math.max(0, taxBeforeOptimization - totalPotentialSaving);
  const optimizationPercentage = taxBeforeOptimization > 0 ? ((totalPotentialSaving / taxBeforeOptimization) * 100) : 0;

  return {
    profile,
    regimeRecommendation,
    suggestions,
    totalPotentialSaving,
    taxBeforeOptimization,
    taxAfterOptimization,
    optimizationPercentage: Math.min(optimizationPercentage, 100),
    yearlyPlan: generateYearlyPlan(suggestions),
    aiInsights: generateAIInsights(profile, regimeRecommendation),
  };
}

export function getDefaultProfile(): FinancialProfile {
  return {
    salary: 1200000, businessIncome: 0, capitalGains: 0, rentalIncome: 0, otherIncome: 0,
    section80C: 0, section80D: 0, section80G: 0, section80CCD: 0, homeLoanInterest: 0,
    elssInvestment: 0, ppfInvestment: 0, npsInvestment: 0, lifeInsurance: 0, healthInsurance: 0, tuitionFees: 0,
  };
}
