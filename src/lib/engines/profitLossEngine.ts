// ============================================================
// PROFIT / LOSS ENGINE
// Layer 3: Financial Intelligence Engine
// ============================================================

export interface ProfitLossInputs {
  revenue: number;
  costOfGoods: number;
  operatingExpenses: number;
  otherIncome: number;
  investments: number;
  loanRepayments: number;
  interestExpense: number;
  depreciation: number;
}

export interface ProfitLossResult {
  grossProfit: number;
  grossMargin: number;
  operatingProfit: number;
  operatingMargin: number;
  netProfit: number;
  netMargin: number;
  expenseRatio: number;
  financialStabilityIndex: number;
  totalExpenses: number;
  totalIncome: number;
  breakdownItems: { label: string; value: number; type: 'income' | 'expense' }[];
  monthlyProjection: { month: string; revenue: number; expenses: number; profit: number }[];
}

export function calculateProfitLoss(inputs: ProfitLossInputs): ProfitLossResult {
  const totalIncome = inputs.revenue + inputs.otherIncome;
  const grossProfit = inputs.revenue - inputs.costOfGoods;
  const grossMargin = inputs.revenue > 0 ? (grossProfit / inputs.revenue) * 100 : 0;

  const totalExpenses = inputs.costOfGoods + inputs.operatingExpenses + inputs.interestExpense + inputs.depreciation + inputs.loanRepayments;
  const operatingProfit = grossProfit - inputs.operatingExpenses - inputs.depreciation;
  const operatingMargin = inputs.revenue > 0 ? (operatingProfit / inputs.revenue) * 100 : 0;

  const netProfit = totalIncome - totalExpenses;
  const netMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

  const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  // Financial Stability Index (0-100)
  const marginScore = Math.min(30, Math.max(0, netMargin * 1.5));
  const expenseScore = Math.min(30, Math.max(0, (100 - expenseRatio) * 0.3));
  const debtScore = totalIncome > 0 ? Math.min(20, Math.max(0, 20 - (inputs.loanRepayments / totalIncome) * 100)) : 0;
  const diversificationScore = inputs.otherIncome > 0 ? Math.min(20, (inputs.otherIncome / totalIncome) * 100) : 5;
  const financialStabilityIndex = Math.round(Math.max(0, Math.min(100, marginScore + expenseScore + debtScore + diversificationScore)));

  const breakdownItems: ProfitLossResult['breakdownItems'] = [
    { label: 'Revenue', value: inputs.revenue, type: 'income' },
    { label: 'Other Income', value: inputs.otherIncome, type: 'income' },
    { label: 'Cost of Goods', value: inputs.costOfGoods, type: 'expense' },
    { label: 'Operating Expenses', value: inputs.operatingExpenses, type: 'expense' },
    { label: 'Interest Expense', value: inputs.interestExpense, type: 'expense' },
    { label: 'Depreciation', value: inputs.depreciation, type: 'expense' },
    { label: 'Loan Repayments', value: inputs.loanRepayments, type: 'expense' },
  ];

  // 12-month projection with slight growth/variance
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyRevenue = inputs.revenue / 12;
  const monthlyExpenses = totalExpenses / 12;
  const monthlyProjection = months.map((month, i) => {
    const growthFactor = 1 + (i * 0.008) + (Math.sin(i) * 0.03);
    const rev = Math.round(monthlyRevenue * growthFactor);
    const exp = Math.round(monthlyExpenses * (1 + (Math.cos(i) * 0.02)));
    return { month, revenue: rev, expenses: exp, profit: rev - exp };
  });

  return {
    grossProfit, grossMargin: Math.round(grossMargin * 10) / 10,
    operatingProfit, operatingMargin: Math.round(operatingMargin * 10) / 10,
    netProfit, netMargin: Math.round(netMargin * 10) / 10,
    expenseRatio: Math.round(expenseRatio * 10) / 10,
    financialStabilityIndex, totalExpenses, totalIncome,
    breakdownItems, monthlyProjection,
  };
}
