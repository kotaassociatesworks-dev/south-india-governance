// ============================================================
// SIMULATION ENGINE — Growth & Financial Digital Twin
// Layer 3: Financial Intelligence Engine
// ============================================================

export interface GrowthInputs {
  currentRevenue: number;
  currentExpenses: number;
  industry: string;
  employees: number;
  growthRatePercent: number;
  years: number;
}

export interface GrowthProjection {
  year: number;
  revenue: number;
  expenses: number;
  profit: number;
  estimatedTax: number;
  employees: number;
}

export interface GrowthResult {
  projections: GrowthProjection[];
  totalProjectedRevenue: number;
  totalProjectedProfit: number;
  totalEstimatedTax: number;
  insights: string[];
}

const INDUSTRY_TAX_RATES: Record<string, number> = {
  'Technology': 0.25,
  'Manufacturing': 0.22,
  'Retail': 0.30,
  'Healthcare': 0.25,
  'Finance': 0.30,
  'Real Estate': 0.30,
  'Services': 0.25,
  'Default': 0.25,
};

export function simulateGrowth(inputs: GrowthInputs): GrowthResult {
  const taxRate = INDUSTRY_TAX_RATES[inputs.industry] ?? INDUSTRY_TAX_RATES['Default'];
  const projections: GrowthProjection[] = [];
  let rev = inputs.currentRevenue;
  let exp = inputs.currentExpenses;
  let emp = inputs.employees;

  for (let y = 1; y <= inputs.years; y++) {
    rev *= (1 + inputs.growthRatePercent / 100);
    exp *= (1 + (inputs.growthRatePercent * 0.7) / 100); // expenses grow slower
    emp = Math.round(emp * (1 + inputs.growthRatePercent * 0.004));
    const profit = rev - exp;
    const tax = Math.max(0, profit * taxRate);
    projections.push({ year: y, revenue: Math.round(rev), expenses: Math.round(exp), profit: Math.round(profit), estimatedTax: Math.round(tax), employees: emp });
  }

  const insights: string[] = [];
  const lastP = projections[projections.length - 1];
  if (lastP.profit / lastP.revenue > 0.25) insights.push('Strong profit trajectory — consider reinvestment strategies');
  if (inputs.growthRatePercent > 20) insights.push('High growth rate — ensure compliance infrastructure scales accordingly');
  if (lastP.revenue > 50000000) insights.push('Projected revenue exceeds ₹5Cr — statutory audit will be required');
  if (lastP.revenue > 20000000) insights.push('GST audit threshold may apply — ensure GST compliance');
  insights.push(`Estimated ${inputs.years}-year tax outflow: ₹${(projections.reduce((s, p) => s + p.estimatedTax, 0) / 100000).toFixed(1)}L`);

  return {
    projections,
    totalProjectedRevenue: projections.reduce((s, p) => s + p.revenue, 0),
    totalProjectedProfit: projections.reduce((s, p) => s + p.profit, 0),
    totalEstimatedTax: projections.reduce((s, p) => s + p.estimatedTax, 0),
    insights,
  };
}

// Financial Digital Twin — scenario comparison
export interface ScenarioInputs {
  baseRevenue: number;
  baseExpenses: number;
  investmentAmount: number;
  investmentReturn: number; // % annual
  additionalDeductions: number;
  industry: string;
}

export interface ScenarioResult {
  baseCase: { profit: number; tax: number; netIncome: number };
  optimizedCase: { profit: number; tax: number; netIncome: number };
  savings: number;
  recommendation: string;
}

export function runScenarioComparison(inputs: ScenarioInputs): ScenarioResult {
  const taxRate = INDUSTRY_TAX_RATES[inputs.industry] ?? 0.25;
  const baseProfit = inputs.baseRevenue - inputs.baseExpenses;
  const baseTax = Math.max(0, baseProfit * taxRate);

  const optRevenue = inputs.baseRevenue + inputs.investmentAmount * (inputs.investmentReturn / 100);
  const optProfit = optRevenue - inputs.baseExpenses;
  const optTaxableIncome = Math.max(0, optProfit - inputs.additionalDeductions);
  const optTax = optTaxableIncome * taxRate;

  const savings = baseTax - optTax + (optProfit - baseProfit);

  return {
    baseCase: { profit: Math.round(baseProfit), tax: Math.round(baseTax), netIncome: Math.round(baseProfit - baseTax) },
    optimizedCase: { profit: Math.round(optProfit), tax: Math.round(optTax), netIncome: Math.round(optProfit - optTax) },
    savings: Math.round(savings),
    recommendation: savings > 0
      ? `This strategy could save ₹${(Math.abs(savings) / 100000).toFixed(1)}L through combined revenue growth and tax optimization.`
      : `Current strategy is already optimal. Consider alternative investment vehicles.`,
  };
}
