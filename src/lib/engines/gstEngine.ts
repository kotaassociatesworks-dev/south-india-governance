// ============================================================
// GST CALCULATION ENGINE
// Layer 3: Financial Intelligence Engine
// ============================================================

export type GSTRate = 0 | 5 | 12 | 18 | 28;
export type SupplyType = 'intraState' | 'interState';

export interface GSTInvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  gstRate: GSTRate;
  supplyType: SupplyType;
}

export interface GSTBreakdown {
  taxableValue: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalGST: number;
  invoiceTotal: number;
}

export interface GSTReturnEstimate {
  outputGST: number;
  inputTaxCredit: number;
  netLiability: number;
  cgstPayable: number;
  sgstPayable: number;
  igstPayable: number;
}

export function calculateItemGST(item: GSTInvoiceItem): GSTBreakdown {
  const taxableValue = item.quantity * item.unitPrice;
  const totalGST = taxableValue * (item.gstRate / 100);
  const isIntra = item.supplyType === 'intraState';
  return {
    taxableValue,
    cgst: isIntra ? totalGST / 2 : 0,
    sgst: isIntra ? totalGST / 2 : 0,
    igst: isIntra ? 0 : totalGST,
    totalGST,
    invoiceTotal: taxableValue + totalGST,
  };
}

export function calculateInvoiceGST(items: GSTInvoiceItem[]): GSTBreakdown {
  return items.reduce<GSTBreakdown>(
    (acc, item) => {
      const b = calculateItemGST(item);
      return {
        taxableValue: acc.taxableValue + b.taxableValue,
        cgst: acc.cgst + b.cgst,
        sgst: acc.sgst + b.sgst,
        igst: acc.igst + b.igst,
        totalGST: acc.totalGST + b.totalGST,
        invoiceTotal: acc.invoiceTotal + b.invoiceTotal,
      };
    },
    { taxableValue: 0, cgst: 0, sgst: 0, igst: 0, totalGST: 0, invoiceTotal: 0 }
  );
}

export function estimateGSTReturn(
  sales: { amount: number; rate: GSTRate; type: SupplyType }[],
  purchases: { amount: number; rate: GSTRate; type: SupplyType }[]
): GSTReturnEstimate {
  let outputCGST = 0, outputSGST = 0, outputIGST = 0;
  let inputCGST = 0, inputSGST = 0, inputIGST = 0;

  for (const s of sales) {
    const gst = s.amount * (s.rate / 100);
    if (s.type === 'intraState') { outputCGST += gst / 2; outputSGST += gst / 2; }
    else outputIGST += gst;
  }

  for (const p of purchases) {
    const gst = p.amount * (p.rate / 100);
    if (p.type === 'intraState') { inputCGST += gst / 2; inputSGST += gst / 2; }
    else inputIGST += gst;
  }

  const outputGST = outputCGST + outputSGST + outputIGST;
  const inputTaxCredit = inputCGST + inputSGST + inputIGST;

  return {
    outputGST,
    inputTaxCredit,
    netLiability: Math.max(0, outputGST - inputTaxCredit),
    cgstPayable: Math.max(0, outputCGST - inputCGST),
    sgstPayable: Math.max(0, outputSGST - inputSGST),
    igstPayable: Math.max(0, outputIGST - inputIGST),
  };
}
