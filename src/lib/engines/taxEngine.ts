// ============================================================
// INCOME TAX ENGINE — FY 2024-25 (AY 2025-26)
// Layer 3: Financial Intelligence Engine
// ============================================================

export interface IncomeBreakdown {
  salary: number;
  businessIncome: number;
  capitalGains: number;
  rentalIncome: number;
  otherIncome: number;
}

export interface Deductions {
  section80C: number;    // max 1,50,000
  section80D: number;    // max 25,000 / 50,000 senior
  section80G: number;
  section80CCD: number;  // max 50,000 NPS
  homeLoanInterest: number; // max 2,00,000
  standardDeduction: number; // 75,000 new regime / 50,000 old
}

export interface TaxResult {
  grossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxBeforeCess: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
  slabBreakdown: { slab: string; tax: number }[];
}

const NEW_REGIME_SLABS = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300000, max: 700000, rate: 0.05 },
  { min: 700000, max: 1000000, rate: 0.10 },
  { min: 1000000, max: 1200000, rate: 0.15 },
  { min: 1200000, max: 1500000, rate: 0.20 },
  { min: 1500000, max: Infinity, rate: 0.30 },
];

const OLD_REGIME_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 0.05 },
  { min: 500000, max: 1000000, rate: 0.20 },
  { min: 1000000, max: Infinity, rate: 0.30 },
];

function calcSlabTax(income: number, slabs: typeof NEW_REGIME_SLABS) {
  let remaining = income;
  const breakdown: { slab: string; tax: number }[] = [];
  for (const s of slabs) {
    if (remaining <= 0) break;
    const width = Math.min(remaining, (s.max === Infinity ? remaining : s.max - s.min));
    const tax = width * s.rate;
    if (tax > 0 || s.rate === 0) {
      breakdown.push({
        slab: `₹${(s.min / 100000).toFixed(1)}L – ${s.max === Infinity ? 'Above' : `₹${(s.max / 100000).toFixed(1)}L`} @ ${(s.rate * 100)}%`,
        tax,
      });
    }
    remaining -= width;
  }
  return breakdown;
}

function calcSurcharge(tax: number, income: number): number {
  if (income > 50000000) return tax * 0.37;
  if (income > 20000000) return tax * 0.25;
  if (income > 10000000) return tax * 0.15;
  if (income > 5000000) return tax * 0.10;
  return 0;
}

export function calculateIncomeTax(
  income: IncomeBreakdown,
  deductions: Deductions,
  regime: 'new' | 'old'
): TaxResult {
  const gross = income.salary + income.businessIncome + income.capitalGains + income.rentalIncome + income.otherIncome;

  let totalDeductions = 0;
  if (regime === 'old') {
    totalDeductions =
      Math.min(deductions.section80C, 150000) +
      Math.min(deductions.section80D, 50000) +
      deductions.section80G +
      Math.min(deductions.section80CCD, 50000) +
      Math.min(deductions.homeLoanInterest, 200000) +
      50000; // standard deduction old
  } else {
    totalDeductions = 75000; // standard deduction new regime
  }

  const taxableIncome = Math.max(0, gross - totalDeductions);
  const slabs = regime === 'new' ? NEW_REGIME_SLABS : OLD_REGIME_SLABS;
  const slabBreakdown = calcSlabTax(taxableIncome, slabs);
  const taxBeforeCess = slabBreakdown.reduce((s, b) => s + b.tax, 0);

  // Rebate u/s 87A
  let taxAfterRebate = taxBeforeCess;
  if (regime === 'new' && taxableIncome <= 700000) taxAfterRebate = 0;
  if (regime === 'old' && taxableIncome <= 500000) taxAfterRebate = 0;

  const surcharge = calcSurcharge(taxAfterRebate, taxableIncome);
  const cess = (taxAfterRebate + surcharge) * 0.04;
  const totalTax = taxAfterRebate + surcharge + cess;

  return {
    grossIncome: gross,
    totalDeductions,
    taxableIncome,
    taxBeforeCess: taxAfterRebate,
    surcharge,
    cess,
    totalTax: Math.round(totalTax),
    effectiveRate: gross > 0 ? (totalTax / gross) * 100 : 0,
    slabBreakdown,
  };
}

// TDS estimation
export function estimateMonthlyTDS(annualSalary: number, regime: 'new' | 'old'): number {
  const income: IncomeBreakdown = { salary: annualSalary, businessIncome: 0, capitalGains: 0, rentalIncome: 0, otherIncome: 0 };
  const deductions: Deductions = { section80C: 0, section80D: 0, section80G: 0, section80CCD: 0, homeLoanInterest: 0, standardDeduction: 0 };
  const result = calculateIncomeTax(income, deductions, regime);
  return Math.round(result.totalTax / 12);
}
