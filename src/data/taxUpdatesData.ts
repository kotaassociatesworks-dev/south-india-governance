export interface TaxUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  source: string;
  category: "gst" | "income-tax";
  subcategory: string;
  fullArticleUrl?: string;
}

export const taxUpdatesData: TaxUpdate[] = [
  {
    id: "gst-001",
    title: "GST Council Recommends Reduction in GST Rate on Insurance Premiums",
    description: "The 54th GST Council meeting recommended reducing GST rates on health and life insurance premiums for senior citizens and term life insurance policies.",
    date: "2026-03-05",
    source: "GST Council Press Release",
    category: "gst",
    subcategory: "GST Council Decisions",
  },
  {
    id: "gst-002",
    title: "CBIC Issues Circular on ITC Reconciliation Under GSTR-2B",
    description: "CBIC has issued Circular No. 237/31/2026-GST clarifying the reconciliation process for Input Tax Credit claims with auto-populated GSTR-2B data.",
    date: "2026-03-03",
    source: "CBIC Circular",
    category: "gst",
    subcategory: "GST Circulars",
  },
  {
    id: "gst-003",
    title: "Extended Deadline for GSTR-9 Annual Return Filing",
    description: "The due date for filing GSTR-9 annual return for FY 2025-26 has been extended to March 31, 2026, providing relief to businesses.",
    date: "2026-02-28",
    source: "CBIC Notification No. 12/2026",
    category: "gst",
    subcategory: "Filing Deadlines",
  },
  {
    id: "gst-004",
    title: "New E-Invoice Threshold Reduced to ₹5 Crore",
    description: "CBIC has notified that e-invoicing will be mandatory for businesses with aggregate turnover exceeding ₹5 crore from April 1, 2026.",
    date: "2026-02-25",
    source: "CBIC Notification",
    category: "gst",
    subcategory: "GST Notifications",
  },
  {
    id: "gst-005",
    title: "Amendments to Rule 86B – Restriction on ITC Utilization",
    description: "Rule 86B has been amended to allow 99% ITC utilization for taxpayers with turnover above ₹50 lakh, subject to specified conditions.",
    date: "2026-02-20",
    source: "GST Rule Amendment",
    category: "gst",
    subcategory: "Rule Amendments",
  },
  {
    id: "it-001",
    title: "CBDT Extends Due Date for Tax Audit Report Filing",
    description: "CBDT has extended the due date for filing Tax Audit Reports under Section 44AB to October 31, 2026 for AY 2026-27.",
    date: "2026-03-07",
    source: "CBDT Notification No. 25/2026",
    category: "income-tax",
    subcategory: "Deadline Extensions",
  },
  {
    id: "it-002",
    title: "New TDS Rates Effective from April 1, 2026",
    description: "CBDT has notified revised TDS rates under various sections including 194C, 194J, and 194H effective from the new financial year.",
    date: "2026-03-04",
    source: "CBDT Circular No. 5/2026",
    category: "income-tax",
    subcategory: "CBDT Circulars",
  },
  {
    id: "it-003",
    title: "Updated ITR Forms for AY 2026-27 Released",
    description: "The Income Tax Department has released updated ITR-1 through ITR-7 forms for Assessment Year 2026-27 with new disclosure requirements.",
    date: "2026-03-01",
    source: "Income Tax Department",
    category: "income-tax",
    subcategory: "Tax Rule Changes",
  },
  {
    id: "it-004",
    title: "Section 80C Deduction Limit Enhanced to ₹2 Lakh",
    description: "The government has enhanced the deduction limit under Section 80C from ₹1.5 lakh to ₹2 lakh for the financial year 2026-27.",
    date: "2026-02-22",
    source: "Finance Act 2026",
    category: "income-tax",
    subcategory: "New Compliance Requirements",
  },
  {
    id: "it-005",
    title: "Mandatory Aadhaar-PAN Linking for All Taxpayers",
    description: "CBDT has mandated that all existing taxpayers must link Aadhaar with PAN by June 30, 2026 to avoid higher TDS deduction.",
    date: "2026-02-18",
    source: "CBDT Notification",
    category: "income-tax",
    subcategory: "New Compliance Requirements",
  },
];
