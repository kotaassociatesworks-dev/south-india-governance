import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Calculator, IndianRupee } from "lucide-react";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";
import { calculateIncomeTax, type IncomeBreakdown, type Deductions } from "@/lib/engines/taxEngine";

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const IncomeTaxCalculatorPage = () => {
  const [regime, setRegime] = useState<'new' | 'old'>('new');
  const [income, setIncome] = useState<IncomeBreakdown>({ salary: 1200000, businessIncome: 0, capitalGains: 0, rentalIncome: 0, otherIncome: 0 });
  const [deductions, setDeductions] = useState<Deductions>({ section80C: 150000, section80D: 25000, section80G: 0, section80CCD: 50000, homeLoanInterest: 0, standardDeduction: 0 });

  const result = useMemo(() => calculateIncomeTax(income, deductions, regime), [income, deductions, regime]);
  const compResult = useMemo(() => calculateIncomeTax(income, deductions, regime === 'new' ? 'old' : 'new'), [income, deductions, regime]);

  const comparisonData = [
    { name: 'Selected', tax: result.totalTax, fill: '#d4af37' },
    { name: 'Alternate', tax: compResult.totalTax, fill: '#3b82f6' },
  ];

  const deductionPie = [
    { name: '80C', value: Math.min(deductions.section80C, 150000) },
    { name: '80D', value: Math.min(deductions.section80D, 50000) },
    { name: '80CCD', value: Math.min(deductions.section80CCD, 50000) },
    { name: '80G', value: deductions.section80G },
    { name: 'Home Loan', value: Math.min(deductions.homeLoanInterest, 200000) },
  ].filter(d => d.value > 0);

  const COLORS = ['#d4af37', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  const updateIncome = (key: keyof IncomeBreakdown, val: string) => setIncome(prev => ({ ...prev, [key]: Number(val) || 0 }));
  const updateDed = (key: keyof Deductions, val: string) => setDeductions(prev => ({ ...prev, [key]: Number(val) || 0 }));

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-3">
              <Calculator className="w-4 h-4 text-accent" />
              <span className="text-xs text-accent font-medium">FY 2024-25</span>
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Income Tax <span className="gradient-text">Master Calculator</span></h1>
          </motion.div>

          {/* Regime Toggle */}
          <div className="flex gap-2 mb-8">
            {(['new', 'old'] as const).map(r => (
              <button key={r} onClick={() => setRegime(r)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${regime === r ? 'bg-accent text-accent-foreground' : 'bg-muted/30 text-muted-foreground border border-border/40'}`}>
                {r === 'new' ? 'New Regime' : 'Old Regime'}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Inputs */}
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6 border border-border/40">
                <h3 className="font-heading text-base font-semibold text-foreground mb-4">Income Sources</h3>
                <div className="space-y-3">
                  {([['Salary', 'salary'], ['Business Income', 'businessIncome'], ['Capital Gains', 'capitalGains'], ['Rental Income', 'rentalIncome'], ['Other Income', 'otherIncome']] as const).map(([label, key]) => (
                    <div key={key} className="flex items-center gap-3">
                      <label className="text-sm text-muted-foreground w-36 shrink-0">{label}</label>
                      <div className="relative flex-1">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <input type="number" value={income[key]} onChange={e => updateIncome(key, e.target.value)}
                          className="w-full bg-muted/30 border border-border/40 rounded-lg pl-8 pr-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/50" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {regime === 'old' && (
                <div className="glass-card rounded-xl p-6 border border-border/40">
                  <h3 className="font-heading text-base font-semibold text-foreground mb-4">Deductions</h3>
                  <div className="space-y-3">
                    {([['Section 80C', 'section80C', '1,50,000'], ['Section 80D', 'section80D', '50,000'], ['Section 80G', 'section80G', 'No limit'], ['NPS 80CCD(1B)', 'section80CCD', '50,000'], ['Home Loan Interest', 'homeLoanInterest', '2,00,000']] as const).map(([label, key, max]) => (
                      <div key={key} className="flex items-center gap-3">
                        <div className="w-36 shrink-0">
                          <div className="text-sm text-muted-foreground">{label}</div>
                          <div className="text-xs text-muted-foreground/60">Max: ₹{max}</div>
                        </div>
                        <div className="relative flex-1">
                          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                          <input type="number" value={deductions[key]} onChange={e => updateDed(key, e.target.value)}
                            className="w-full bg-muted/30 border border-border/40 rounded-lg pl-8 pr-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/50" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6 border border-accent/20">
                <h3 className="font-heading text-base font-semibold text-foreground mb-4">Tax Computation</h3>
                <div className="space-y-3">
                  {[
                    ['Gross Income', result.grossIncome],
                    ['Total Deductions', result.totalDeductions],
                    ['Taxable Income', result.taxableIncome],
                    ['Tax on Income', result.taxBeforeCess],
                    ['Surcharge', result.surcharge],
                    ['Health & Education Cess', result.cess],
                  ].map(([label, val]) => (
                    <div key={label as string} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{label as string}</span>
                      <span className="text-foreground font-medium">{fmt(val as number)}</span>
                    </div>
                  ))}
                  <div className="border-t border-accent/20 pt-3 flex justify-between">
                    <span className="text-base font-semibold text-foreground">Total Tax Payable</span>
                    <span className="text-xl font-bold gradient-text">{fmt(result.totalTax)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">Effective Rate: {result.effectiveRate.toFixed(1)}%</div>
                </div>
              </div>

              {/* Slab Breakdown */}
              <div className="glass-card rounded-xl p-6 border border-border/40">
                <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Slab-wise Tax</h3>
                <div className="space-y-2">
                  {result.slabBreakdown.map((s, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{s.slab}</span>
                      <span className="text-foreground">{fmt(s.tax)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison */}
              <div className="glass-card rounded-xl p-6 border border-border/40">
                <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Regime Comparison</h3>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={comparisonData} layout="vertical">
                    <XAxis type="number" tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} width={70} />
                    <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="tax" radius={[0, 6, 6, 0]}>
                      {comparisonData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                {result.totalTax <= compResult.totalTax ? (
                  <p className="text-xs text-emerald-400 mt-2">✅ {regime === 'new' ? 'New' : 'Old'} regime saves you {fmt(compResult.totalTax - result.totalTax)}</p>
                ) : (
                  <p className="text-xs text-amber-400 mt-2">⚠️ Switch to {regime === 'new' ? 'Old' : 'New'} regime to save {fmt(result.totalTax - compResult.totalTax)}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default IncomeTaxCalculatorPage;
