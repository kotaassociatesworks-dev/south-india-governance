// ============================================================
// FINANCIAL HEALTH SCORE ENGINE
// Layer 3: Financial Intelligence Engine
// Score: 0–100
// ============================================================

export interface HealthInputs {
  totalFilings: number;
  onTimeFilings: number;
  revenue: number;
  expenses: number;
  profit: number;
  gstCollected: number;
  gstCredited: number;
  pendingNotices: number;
  overdueFilings: number;
  auditTriggered: boolean;
}

export interface HealthScore {
  overall: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
  complianceScore: number;
  taxEfficiency: number;
  profitHealth: number;
  gstUtilization: number;
  auditRisk: number;
  suggestions: string[];
}

export function calculateHealthScore(inputs: HealthInputs): HealthScore {
  // 1. Compliance (30 pts)
  const filingRate = inputs.totalFilings > 0 ? inputs.onTimeFilings / inputs.totalFilings : 1;
  const complianceScore = Math.round(filingRate * 30 - inputs.overdueFilings * 3 - inputs.pendingNotices * 2);

  // 2. Tax Efficiency (20 pts)
  const effectiveTaxRate = inputs.revenue > 0 ? ((inputs.revenue - inputs.profit) / inputs.revenue) : 0.5;
  const taxEfficiency = Math.round(Math.max(0, 20 - effectiveTaxRate * 15));

  // 3. Profit Margin (20 pts)
  const profitMargin = inputs.revenue > 0 ? inputs.profit / inputs.revenue : 0;
  const profitHealth = Math.round(Math.min(20, profitMargin * 100));

  // 4. GST Credit Utilization (15 pts)
  const gstUtil = inputs.gstCollected > 0 ? inputs.gstCredited / inputs.gstCollected : 0;
  const gstUtilization = Math.round(Math.min(15, gstUtil * 15));

  // 5. Audit Risk (15 pts - inverse)
  const auditRisk = inputs.auditTriggered ? 0 : inputs.overdueFilings > 2 ? 5 : 15;

  const overall = Math.max(0, Math.min(100, complianceScore + taxEfficiency + profitHealth + gstUtilization + auditRisk));

  const grade = overall >= 90 ? 'A+' : overall >= 80 ? 'A' : overall >= 70 ? 'B+' : overall >= 60 ? 'B' : overall >= 50 ? 'C' : overall >= 35 ? 'D' : 'F';

  const suggestions: string[] = [];
  if (filingRate < 0.9) suggestions.push('Improve filing punctuality — automate compliance calendar reminders');
  if (profitMargin < 0.15) suggestions.push('Optimize expense ratio to improve profit margins');
  if (gstUtil < 0.8) suggestions.push('Maximize Input Tax Credit claims to reduce GST liability');
  if (inputs.pendingNotices > 0) suggestions.push('Address pending tax notices to reduce compliance risk');
  if (inputs.overdueFilings > 0) suggestions.push('Clear overdue filings immediately to avoid penalties');
  if (inputs.auditTriggered) suggestions.push('Engage professional audit preparation services');

  return { overall, grade, complianceScore: Math.max(0, complianceScore), taxEfficiency, profitHealth, gstUtilization, auditRisk, suggestions };
}

export interface FinancialIndex {
  complianceIndex: number;
  taxEfficiencyIndex: number;
  growthPotential: number;
  financialStability: number;
  overallIndex: number;
}

export function calculateFinancialIndex(health: HealthScore, revenueGrowthPercent: number): FinancialIndex {
  const complianceIndex = Math.round((health.complianceScore / 30) * 100);
  const taxEfficiencyIndex = Math.round((health.taxEfficiency / 20) * 100);
  const growthPotential = Math.round(Math.min(100, Math.max(0, 50 + revenueGrowthPercent * 2)));
  const financialStability = Math.round((health.profitHealth / 20) * 100);
  const overallIndex = Math.round((complianceIndex + taxEfficiencyIndex + growthPotential + financialStability) / 4);

  return { complianceIndex, taxEfficiencyIndex, growthPotential, financialStability, overallIndex };
}
