// ============================================================
// PAYROLL TAX ENGINE
// Layer 3: Financial Intelligence Engine
// ============================================================

export interface PayrollInput {
  basicSalary: number;       // monthly
  hra: number;               // monthly
  specialAllowance: number;  // monthly
  lta: number;               // annual
  bonus: number;             // annual
  employerPF: number;        // % of basic (usually 12%)
  employeePF: number;        // % of basic (usually 12%)
  professionalTax: number;   // annual (usually ₹2,400)
  regime: 'new' | 'old';
}

export interface PayrollResult {
  grossMonthlySalary: number;
  grossAnnualSalary: number;
  employerPFContribution: number;
  employeePFContribution: number;
  professionalTaxMonthly: number;
  estimatedAnnualTDS: number;
  estimatedMonthlyTDS: number;
  netMonthlySalary: number;
  netAnnualSalary: number;
  ctc: number;
  breakdown: { label: string; monthly: number; annual: number }[];
}

export function calculatePayroll(input: PayrollInput): PayrollResult {
  const grossMonthly = input.basicSalary + input.hra + input.specialAllowance;
  const grossAnnual = grossMonthly * 12 + input.lta + input.bonus;

  const empPF = Math.round(input.basicSalary * (input.employeePF / 100));
  const erPF = Math.round(input.basicSalary * (input.employerPF / 100));
  const ptMonthly = Math.round(input.professionalTax / 12);

  // Simplified TDS calculation
  let taxableIncome = grossAnnual;
  if (input.regime === 'new') {
    taxableIncome -= 75000; // standard deduction
  } else {
    taxableIncome -= 50000; // standard deduction
    taxableIncome -= empPF * 12; // 80C
    taxableIncome -= input.professionalTax;
  }

  // Quick slab calc
  let tax = 0;
  if (input.regime === 'new') {
    if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
    if (taxableIncome > 1200000) tax += Math.min(taxableIncome - 1200000, 300000) * 0.20;
    if (taxableIncome > 1000000) tax += Math.min(taxableIncome - 1000000, 200000) * 0.15;
    if (taxableIncome > 700000) tax += Math.min(taxableIncome - 700000, 300000) * 0.10;
    if (taxableIncome > 300000) tax += Math.min(taxableIncome - 300000, 400000) * 0.05;
    if (taxableIncome <= 700000) tax = 0; // rebate
  } else {
    if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.30;
    if (taxableIncome > 500000) tax += Math.min(taxableIncome - 500000, 500000) * 0.20;
    if (taxableIncome > 250000) tax += Math.min(taxableIncome - 250000, 250000) * 0.05;
    if (taxableIncome <= 500000) tax = 0; // rebate
  }
  tax += tax * 0.04; // cess

  const annualTDS = Math.round(tax);
  const monthlyTDS = Math.round(annualTDS / 12);
  const netMonthly = grossMonthly - empPF - ptMonthly - monthlyTDS;
  const netAnnual = grossAnnual - empPF * 12 - input.professionalTax - annualTDS;

  return {
    grossMonthlySalary: grossMonthly,
    grossAnnualSalary: grossAnnual,
    employerPFContribution: erPF,
    employeePFContribution: empPF,
    professionalTaxMonthly: ptMonthly,
    estimatedAnnualTDS: annualTDS,
    estimatedMonthlyTDS: monthlyTDS,
    netMonthlySalary: netMonthly,
    netAnnualSalary: netAnnual,
    ctc: grossAnnual + erPF * 12,
    breakdown: [
      { label: 'Basic Salary', monthly: input.basicSalary, annual: input.basicSalary * 12 },
      { label: 'HRA', monthly: input.hra, annual: input.hra * 12 },
      { label: 'Special Allowance', monthly: input.specialAllowance, annual: input.specialAllowance * 12 },
      { label: 'LTA', monthly: Math.round(input.lta / 12), annual: input.lta },
      { label: 'Bonus', monthly: Math.round(input.bonus / 12), annual: input.bonus },
      { label: 'Employee PF (-)', monthly: -empPF, annual: -empPF * 12 },
      { label: 'Professional Tax (-)', monthly: -ptMonthly, annual: -input.professionalTax },
      { label: 'TDS (-)', monthly: -monthlyTDS, annual: -annualTDS },
    ],
  };
}
