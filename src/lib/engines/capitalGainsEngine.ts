// ============================================================
// CAPITAL GAINS TAX ENGINE
// Layer 3: Financial Intelligence Engine
// ============================================================

export interface CapitalGainsInput {
  purchaseValue: number;
  saleValue: number;
  holdingPeriodMonths: number;
  transactionCosts: number;
  assetType: 'equity' | 'debt' | 'property' | 'gold';
  purchaseYear?: number;
}

export interface CapitalGainsResult {
  gain: number;
  isLongTerm: boolean;
  taxRate: number;
  taxAmount: number;
  indexedCost: number;
  exemptions: string[];
}

// CII simplified (recent years)
const CII: Record<number, number> = {
  2015: 254, 2016: 264, 2017: 272, 2018: 280, 2019: 289,
  2020: 301, 2021: 317, 2022: 331, 2023: 348, 2024: 363, 2025: 363,
};

const LTCG_THRESHOLD: Record<string, number> = {
  equity: 12, debt: 36, property: 24, gold: 36,
};

export function calculateCapitalGains(input: CapitalGainsInput): CapitalGainsResult {
  const isLongTerm = input.holdingPeriodMonths >= (LTCG_THRESHOLD[input.assetType] ?? 36);
  const netSale = input.saleValue - input.transactionCosts;

  let indexedCost = input.purchaseValue;
  if (isLongTerm && input.assetType !== 'equity') {
    const purchaseYear = input.purchaseYear ?? 2020;
    const saleYear = 2025;
    const purchaseCII = CII[purchaseYear] ?? 301;
    const saleCII = CII[saleYear] ?? 363;
    indexedCost = Math.round(input.purchaseValue * (saleCII / purchaseCII));
  }

  const gain = netSale - (isLongTerm && input.assetType !== 'equity' ? indexedCost : input.purchaseValue);

  let taxRate = 0;
  let taxAmount = 0;
  const exemptions: string[] = [];

  if (isLongTerm) {
    if (input.assetType === 'equity') {
      taxRate = 12.5; // Budget 2024 rate
      const taxableGain = Math.max(0, gain - 125000); // ₹1.25L exemption
      taxAmount = taxableGain * 0.125;
      if (gain <= 125000) exemptions.push('Exempt under ₹1.25L LTCG threshold');
    } else {
      taxRate = 20;
      taxAmount = Math.max(0, gain) * 0.20;
      exemptions.push('Indexation benefit applied');
    }
    if (input.assetType === 'property') {
      exemptions.push('Section 54: Reinvest in residential property for exemption');
      exemptions.push('Section 54EC: Invest in specified bonds within 6 months');
    }
  } else {
    taxRate = 15; // STCG on equity; others at slab rate
    if (input.assetType === 'equity') {
      taxRate = 20; // Budget 2024
      taxAmount = Math.max(0, gain) * 0.20;
    } else {
      taxRate = 30; // assumed slab rate
      taxAmount = Math.max(0, gain) * 0.30;
    }
  }

  return { gain, isLongTerm, taxRate, taxAmount: Math.round(taxAmount), indexedCost, exemptions };
}
