// ============================================================
// COMPLIANCE ENGINE — Deadlines, Alerts, Risk Detection
// Layer 3: Financial Intelligence Engine
// ============================================================

export type ComplianceStatus = 'compliant' | 'due_soon' | 'overdue';

export interface ComplianceItem {
  id: string;
  name: string;
  category: 'GST' | 'Income Tax' | 'TDS' | 'ROC' | 'Audit';
  dueDate: string;
  status: ComplianceStatus;
  daysRemaining: number;
  description: string;
}

export interface ComplianceAlert {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  actionRequired: string;
}

const RECURRING_DEADLINES = [
  { name: 'GSTR-1', category: 'GST' as const, dayOfMonth: 11, desc: 'Monthly outward supplies' },
  { name: 'GSTR-3B', category: 'GST' as const, dayOfMonth: 20, desc: 'Monthly summary return' },
  { name: 'TDS Payment', category: 'TDS' as const, dayOfMonth: 7, desc: 'Monthly TDS deposit' },
  { name: 'TDS Return (24Q/26Q)', category: 'TDS' as const, dayOfMonth: 31, desc: 'Quarterly TDS return', quarterly: true },
  { name: 'Advance Tax - Q1', category: 'Income Tax' as const, dayOfMonth: 15, month: 6, desc: 'First installment (15%)' },
  { name: 'Advance Tax - Q2', category: 'Income Tax' as const, dayOfMonth: 15, month: 9, desc: 'Second installment (45%)' },
  { name: 'Advance Tax - Q3', category: 'Income Tax' as const, dayOfMonth: 15, month: 12, desc: 'Third installment (75%)' },
  { name: 'Advance Tax - Q4', category: 'Income Tax' as const, dayOfMonth: 15, month: 3, desc: 'Final installment (100%)' },
  { name: 'ITR Filing', category: 'Income Tax' as const, dayOfMonth: 31, month: 7, desc: 'Annual income tax return' },
  { name: 'ROC Annual Filing', category: 'ROC' as const, dayOfMonth: 30, month: 10, desc: 'Annual company filing' },
  { name: 'Tax Audit Report', category: 'Audit' as const, dayOfMonth: 30, month: 9, desc: 'For turnover > ₹1Cr' },
];

export function getUpcomingDeadlines(today: Date = new Date(), daysAhead: number = 90): ComplianceItem[] {
  const items: ComplianceItem[] = [];
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  for (const dl of RECURRING_DEADLINES) {
    for (let mOffset = 0; mOffset < 3; mOffset++) {
      const targetMonth = dl.month ?? ((currentMonth + mOffset - 1) % 12) + 1;
      if (dl.month && targetMonth !== dl.month) continue;

      const targetYear = targetMonth < currentMonth ? currentYear + 1 : currentYear;
      const dueDate = new Date(targetYear, targetMonth - 1, dl.dayOfMonth);
      const diff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      if (diff >= -30 && diff <= daysAhead) {
        const status: ComplianceStatus = diff < 0 ? 'overdue' : diff <= 7 ? 'due_soon' : 'compliant';
        items.push({
          id: `${dl.name}-${targetMonth}-${targetYear}`,
          name: dl.name,
          category: dl.category,
          dueDate: dueDate.toISOString().split('T')[0],
          status,
          daysRemaining: diff,
          description: dl.desc,
        });
      }
      if (dl.month) break; // annual items, only once
    }
  }

  return items.sort((a, b) => a.daysRemaining - b.daysRemaining);
}

export function generateAlerts(items: ComplianceItem[]): ComplianceAlert[] {
  const alerts: ComplianceAlert[] = [];

  const overdue = items.filter(i => i.status === 'overdue');
  const dueSoon = items.filter(i => i.status === 'due_soon');

  for (const o of overdue) {
    alerts.push({
      id: `alert-${o.id}`,
      severity: 'critical',
      title: `${o.name} Overdue`,
      message: `${o.name} was due on ${o.dueDate}. Penalty and interest may apply.`,
      actionRequired: `File ${o.name} immediately to minimize penalties`,
    });
  }

  for (const d of dueSoon) {
    alerts.push({
      id: `alert-${d.id}`,
      severity: 'warning',
      title: `${d.name} Due in ${d.daysRemaining} days`,
      message: `${d.name} is due on ${d.dueDate}. Prepare documents now.`,
      actionRequired: `Complete ${d.name} preparation and filing`,
    });
  }

  if (overdue.length >= 3) {
    alerts.unshift({
      id: 'alert-audit-risk',
      severity: 'critical',
      title: 'Elevated Audit Risk',
      message: `${overdue.length} overdue filings detected. This increases audit probability significantly.`,
      actionRequired: 'Engage compliance team immediately',
    });
  }

  return alerts;
}

export function getComplianceRiskScore(items: ComplianceItem[]): number {
  const overdue = items.filter(i => i.status === 'overdue').length;
  const dueSoon = items.filter(i => i.status === 'due_soon').length;
  // Higher = more risk (0-100)
  return Math.min(100, overdue * 20 + dueSoon * 5);
}
