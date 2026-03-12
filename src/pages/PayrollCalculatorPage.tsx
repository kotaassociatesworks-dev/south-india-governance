import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Wallet, IndianRupee } from "lucide-react";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";
import { calculatePayroll, type PayrollInput } from "@/lib/engines/payrollEngine";

const fmt = (n: number) => `₹${Math.abs(Math.round(n)).toLocaleString('en-IN')}`;

const PayrollCalculatorPage = () => {
  const [input, setInput] = useState<PayrollInput>({
    basicSalary: 50000, hra: 20000, specialAllowance: 15000, lta: 30000, bonus: 50000,
    employerPF: 12, employeePF: 12, professionalTax: 2400, regime: 'new',
  });

  const result = useMemo(() => calculatePayroll(input), [input]);
  const update = (key: keyof PayrollInput, val: any) => setInput(prev => ({ ...prev, [key]: val }));

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground">Payroll <span className="gradient-text">Tax Engine</span></h1>
            <p className="text-muted-foreground mt-2">Salary breakdown, TDS estimation & net pay projection</p>
          </motion.div>

          <div className="flex gap-2 mb-6">
            {(['new', 'old'] as const).map(r => (
              <button key={r} onClick={() => update('regime', r)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${input.regime === r ? 'bg-accent text-accent-foreground' : 'bg-muted/30 text-muted-foreground border border-border/40'}`}>
                {r === 'new' ? 'New Regime' : 'Old Regime'}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6 border border-border/40 space-y-3">
              <h3 className="font-heading text-base font-semibold text-foreground mb-2">Salary Components (Monthly)</h3>
              {[
                ['Basic Salary', 'basicSalary'],
                ['HRA', 'hra'],
                ['Special Allowance', 'specialAllowance'],
              ].map(([label, key]) => (
                <div key={key} className="flex items-center gap-3">
                  <label className="text-sm text-muted-foreground w-40 shrink-0">{label}</label>
                  <div className="relative flex-1">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input type="number" value={(input as any)[key]} onChange={e => update(key as keyof PayrollInput, Number(e.target.value))}
                      className="w-full bg-muted/30 border border-border/40 rounded-lg pl-8 pr-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/50" />
                  </div>
                </div>
              ))}
              <h3 className="font-heading text-base font-semibold text-foreground mt-4 mb-2">Annual Components</h3>
              {[['LTA', 'lta'], ['Bonus', 'bonus'], ['Professional Tax', 'professionalTax']].map(([label, key]) => (
                <div key={key} className="flex items-center gap-3">
                  <label className="text-sm text-muted-foreground w-40 shrink-0">{label}</label>
                  <div className="relative flex-1">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input type="number" value={(input as any)[key]} onChange={e => update(key as keyof PayrollInput, Number(e.target.value))}
                      className="w-full bg-muted/30 border border-border/40 rounded-lg pl-8 pr-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/50" />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="glass-card rounded-xl p-6 border border-accent/20">
                <h3 className="font-heading text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-accent" /> Salary Summary
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 rounded-lg bg-accent/5 border border-accent/10">
                    <div className="text-xs text-muted-foreground">Net Monthly</div>
                    <div className="text-lg font-bold gradient-text">{fmt(result.netMonthlySalary)}</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-accent/5 border border-accent/10">
                    <div className="text-xs text-muted-foreground">Annual CTC</div>
                    <div className="text-lg font-bold text-foreground">{fmt(result.ctc)}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {result.breakdown.map((b, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{b.label}</span>
                      <div className="flex gap-6">
                        <span className={`w-24 text-right ${b.monthly < 0 ? 'text-red-400' : 'text-foreground'}`}>{b.monthly < 0 ? '-' : ''}{fmt(b.monthly)}</span>
                        <span className={`w-24 text-right ${b.annual < 0 ? 'text-red-400' : 'text-foreground'}`}>{b.annual < 0 ? '-' : ''}{fmt(b.annual)}</span>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-accent/20 pt-2 flex justify-between font-semibold">
                    <span className="text-foreground">Net Pay</span>
                    <div className="flex gap-6">
                      <span className="w-24 text-right text-foreground">{fmt(result.netMonthlySalary)}</span>
                      <span className="w-24 text-right text-foreground">{fmt(result.netAnnualSalary)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-5 border border-border/40">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xs text-muted-foreground">Monthly TDS</div>
                    <div className="text-base font-bold text-red-400">{fmt(result.estimatedMonthlyTDS)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Annual TDS</div>
                    <div className="text-base font-bold text-red-400">{fmt(result.estimatedAnnualTDS)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Employee PF</div>
                    <div className="text-base font-bold text-foreground">{fmt(result.employeePFContribution)}/mo</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Employer PF</div>
                    <div className="text-base font-bold text-foreground">{fmt(result.employerPFContribution)}/mo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PayrollCalculatorPage;
