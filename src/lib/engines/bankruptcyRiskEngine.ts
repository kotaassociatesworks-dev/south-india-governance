// ============================================================
// BANKRUPTCY RISK ENGINE
// Layer 3: Financial Intelligence Engine
// Altman Z-Score Inspired Model for Indian SMEs
// ============================================================

export interface BankruptcyInputs {
  totalAssets: number;
  totalLiabilities: number;
  currentAssets: number;
  currentLiabilities: number;
  revenue: number;
  operatingExpenses: number;
  netIncome: number;
  retainedEarnings: number;
  interestExpense: number;
  marketValueEquity: number;
}

export type RiskZone = 'healthy' | 'moderate' | 'high' | 'critical';

export interface BankruptcyResult {
  zScore: number;
  riskZone: RiskZone;
  riskPercentage: number;
  debtToIncomeRatio: number;
  operatingLossRatio: number;
  currentRatio: number;
  debtToAssetRatio: number;
  interestCoverageRatio: number;
  recommendations: string[];
  indicators: { label: string; value: number; status: 'good' | 'warning' | 'danger' }[];
}

export function calculateBankruptcyRisk(inputs: BankruptcyInputs): BankruptcyResult {
  const {
    totalAssets, totalLiabilities, currentAssets, currentLiabilities,
    revenue, operatingExpenses, netIncome, retainedEarnings,
    interestExpense, marketValueEquity,
  } = inputs;

  const safeAssets = totalAssets || 1;

  // Altman Z-Score components
  const workingCapital = currentAssets - currentLiabilities;
  const x1 = workingCapital / safeAssets;
  const x2 = retainedEarnings / safeAssets;
  const ebit = revenue - operatingExpenses;
  const x3 = ebit / safeAssets;
  const x4 = marketValueEquity / (totalLiabilities || 1);
  const x5 = revenue / safeAssets;

  const zScore = Math.round((1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 1.0 * x5) * 100) / 100;

  let riskZone: RiskZone;
  let riskPercentage: number;

  if (zScore > 2.99) { riskZone = 'healthy'; riskPercentage = Math.max(5, 25 - (zScore - 3) * 5); }
  else if (zScore > 1.81) { riskZone = 'moderate'; riskPercentage = 25 + ((2.99 - zScore) / 1.18) * 25; }
  else if (zScore > 0.5) { riskZone = 'high'; riskPercentage = 50 + ((1.81 - zScore) / 1.31) * 25; }
  else { riskZone = 'critical'; riskPercentage = Math.min(95, 75 + Math.abs(zScore) * 5); }

  riskPercentage = Math.round(Math.max(5, Math.min(95, riskPercentage)));

  const debtToIncomeRatio = revenue > 0 ? Math.round((totalLiabilities / revenue) * 100) / 100 : 0;
  const operatingLossRatio = revenue > 0 ? Math.round(((operatingExpenses - revenue) / revenue) * 100) / 100 : 0;
  const currentRatio = currentLiabilities > 0 ? Math.round((currentAssets / currentLiabilities) * 100) / 100 : 0;
  const debtToAssetRatio = safeAssets > 0 ? Math.round((totalLiabilities / safeAssets) * 100) / 100 : 0;
  const interestCoverageRatio = interestExpense > 0 ? Math.round((ebit / interestExpense) * 100) / 100 : 999;

  const statusFor = (val: number, good: number, warn: number, invert = false): 'good' | 'warning' | 'danger' => {
    if (invert) return val < good ? 'good' : val < warn ? 'warning' : 'danger';
    return val > good ? 'good' : val > warn ? 'warning' : 'danger';
  };

  const indicators = [
    { label: 'Current Ratio', value: currentRatio, status: statusFor(currentRatio, 1.5, 1) },
    { label: 'Debt-to-Asset Ratio', value: debtToAssetRatio, status: statusFor(debtToAssetRatio, 0.4, 0.7, true) },
    { label: 'Interest Coverage', value: interestCoverageRatio > 100 ? 99 : interestCoverageRatio, status: statusFor(interestCoverageRatio, 3, 1.5) },
    { label: 'Debt-to-Income', value: debtToIncomeRatio, status: statusFor(debtToIncomeRatio, 0.5, 1.0, true) },
    { label: 'Net Profit Margin', value: revenue > 0 ? Math.round((netIncome / revenue) * 100) : 0, status: statusFor(revenue > 0 ? (netIncome / revenue) * 100 : 0, 10, 0) },
  ];

  const recommendations: string[] = [];
  if (currentRatio < 1.5) recommendations.push('Improve liquidity by increasing current assets or reducing short-term liabilities');
  if (debtToAssetRatio > 0.6) recommendations.push('Reduce total debt exposure to improve financial stability');
  if (interestCoverageRatio < 3) recommendations.push('Increase operating income or refinance debt at lower interest rates');
  if (netIncome < 0) recommendations.push('Address operating losses by optimizing cost structure and revenue streams');
  if (operatingLossRatio > 0) recommendations.push('Reduce operational costs — expenses exceed revenue');
  if (debtToIncomeRatio > 1) recommendations.push('Debt exceeds annual revenue — prioritize debt reduction');
  if (recommendations.length === 0) recommendations.push('Financial position is healthy — continue monitoring key ratios');

  return {
    zScore, riskZone, riskPercentage,
    debtToIncomeRatio, operatingLossRatio, currentRatio,
    debtToAssetRatio, interestCoverageRatio,
    recommendations, indicators,
  };
}
