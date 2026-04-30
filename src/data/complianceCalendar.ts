export type DeadlineType = "gst" | "tds" | "itr" | "roc" | "fema" | "audit" | "tax" | "ewb";
export type BusinessType = "legacy" | "msme" | "mnc" | "startup";

export interface Deadline {
  date: string;        // "MMM DD" display
  iso: string;         // ISO date for sorting
  description: string;
  type: DeadlineType;
  applicable: BusinessType[];
}

const ALL: BusinessType[] = ["legacy", "msme", "mnc", "startup"];

export const deadlines: Deadline[] = [
  // April
  { date: "Apr 7",  iso: "2025-04-07", description: "TDS deposit (March)",                 type: "tds", applicable: ALL },
  { date: "Apr 11", iso: "2025-04-11", description: "GSTR-1 (March)",                      type: "gst", applicable: ALL },
  { date: "Apr 20", iso: "2025-04-20", description: "GSTR-3B (March)",                     type: "gst", applicable: ALL },
  { date: "Apr 30", iso: "2025-04-30", description: "Form 27C — declarations from buyers", type: "tax", applicable: ["legacy", "msme", "mnc"] },
  { date: "Apr 30", iso: "2025-04-30", description: "MSME Form 1 (Oct–Mar dues report)",   type: "roc", applicable: ["msme", "legacy", "mnc"] },

  // May
  { date: "May 7",  iso: "2025-05-07", description: "TDS deposit (April)",                 type: "tds", applicable: ALL },
  { date: "May 11", iso: "2025-05-11", description: "GSTR-1 (April)",                      type: "gst", applicable: ALL },
  { date: "May 20", iso: "2025-05-20", description: "GSTR-3B (April)",                     type: "gst", applicable: ALL },
  { date: "May 31", iso: "2025-05-31", description: "Form 61A — Statement of Financial Transactions", type: "tax", applicable: ["legacy", "mnc"] },
  { date: "May 31", iso: "2025-05-31", description: "TDS Q4 Return (24Q/26Q/27Q)",         type: "tds", applicable: ALL },

  // June
  { date: "Jun 7",  iso: "2025-06-07", description: "TDS deposit (May)",                   type: "tds", applicable: ALL },
  { date: "Jun 15", iso: "2025-06-15", description: "Advance Tax Instalment 1 (15%)",      type: "tax", applicable: ALL },
  { date: "Jun 30", iso: "2025-06-30", description: "Equalisation Levy Q1",                type: "tax", applicable: ["mnc"] },

  // July
  { date: "Jul 7",  iso: "2025-07-07", description: "TDS deposit (June)",                  type: "tds", applicable: ALL },
  { date: "Jul 15", iso: "2025-07-15", description: "FEMA — FLA Annual Return",            type: "fema", applicable: ["mnc"] },
  { date: "Jul 30", iso: "2025-07-30", description: "TDS Q1 Return",                       type: "tds", applicable: ALL },
  { date: "Jul 31", iso: "2025-07-31", description: "ITR (non-audit cases)",               type: "itr", applicable: ALL },

  // August
  { date: "Aug 7",  iso: "2025-08-07", description: "TDS deposit (July)",                  type: "tds", applicable: ALL },
  { date: "Aug 11", iso: "2025-08-11", description: "GSTR-1 (July)",                       type: "gst", applicable: ALL },
  { date: "Aug 20", iso: "2025-08-20", description: "GSTR-3B (July)",                      type: "gst", applicable: ALL },

  // September
  { date: "Sep 7",  iso: "2025-09-07", description: "TDS deposit (August)",                type: "tds", applicable: ALL },
  { date: "Sep 15", iso: "2025-09-15", description: "Advance Tax Instalment 2 (45%)",      type: "tax", applicable: ALL },
  { date: "Sep 30", iso: "2025-09-30", description: "Tax Audit Report 3CA/3CB/3CD",        type: "audit", applicable: ["legacy", "msme", "mnc"] },
  { date: "Sep 30", iso: "2025-09-30", description: "AGM deadline (companies)",            type: "roc", applicable: ["mnc", "startup"] },

  // October
  { date: "Oct 7",  iso: "2025-10-07", description: "TDS deposit (September)",             type: "tds", applicable: ALL },
  { date: "Oct 15", iso: "2025-10-15", description: "TDS Q2 Return",                       type: "tds", applicable: ALL },
  { date: "Oct 31", iso: "2025-10-31", description: "ITR (audit / company cases)",         type: "itr", applicable: ["legacy", "msme", "mnc", "startup"] },
  { date: "Oct 31", iso: "2025-10-31", description: "MSME Form 1 (Apr–Sep dues report)",   type: "roc", applicable: ["msme", "legacy", "mnc"] },

  // November
  { date: "Nov 7",  iso: "2025-11-07", description: "TDS deposit (October)",               type: "tds", applicable: ALL },
  { date: "Nov 30", iso: "2025-11-30", description: "Form 3CEB — Transfer Pricing Report", type: "audit", applicable: ["mnc"] },
  { date: "Nov 30", iso: "2025-11-30", description: "AOC-4 Annual Filing (within 30 days of AGM)", type: "roc", applicable: ["mnc", "startup"] },

  // December
  { date: "Dec 7",  iso: "2025-12-07", description: "TDS deposit (November)",              type: "tds", applicable: ALL },
  { date: "Dec 15", iso: "2025-12-15", description: "Advance Tax Instalment 3 (75%)",      type: "tax", applicable: ALL },
  { date: "Dec 29", iso: "2025-12-29", description: "MGT-7 Annual Return (within 60 days of AGM)", type: "roc", applicable: ["mnc", "startup"] },
  { date: "Dec 31", iso: "2025-12-31", description: "GSTR-9 / 9C Annual Return",           type: "gst", applicable: ALL },

  // January
  { date: "Jan 7",  iso: "2026-01-07", description: "TDS deposit (December)",              type: "tds", applicable: ALL },
  { date: "Jan 15", iso: "2026-01-15", description: "TDS Q3 Return",                       type: "tds", applicable: ALL },

  // March
  { date: "Mar 15", iso: "2026-03-15", description: "Advance Tax Final Instalment (100%)", type: "tax", applicable: ALL },
];

export const typeColors: Record<DeadlineType, { bg: string; text: string; label: string }> = {
  gst:   { bg: "bg-blue-500/15",   text: "text-blue-700 dark:text-blue-300",     label: "GST" },
  tds:   { bg: "bg-emerald-500/15",text: "text-emerald-700 dark:text-emerald-300", label: "TDS" },
  itr:   { bg: "bg-accent/20",     text: "text-accent",                          label: "ITR" },
  roc:   { bg: "bg-purple-500/15", text: "text-purple-700 dark:text-purple-300", label: "ROC" },
  fema:  { bg: "bg-red-500/15",    text: "text-red-700 dark:text-red-300",       label: "FEMA" },
  audit: { bg: "bg-amber-500/15",  text: "text-amber-700 dark:text-amber-300",   label: "AUDIT" },
  tax:   { bg: "bg-primary/15",    text: "text-primary",                         label: "TAX" },
  ewb:   { bg: "bg-orange-500/15", text: "text-orange-700 dark:text-orange-300", label: "EWB" },
};
