import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";
import { calculateCapitalGains, type CapitalGainsInput } from "@/lib/engines/capitalGainsEngine";

const fmt = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

const CapitalGainsCalculatorPage = () => {
  const [input, setInput] = useState<CapitalGainsInput>({
    purchaseValue: 500000, saleValue: 1200000, holdingPeriodMonths: 24, transactionCosts: 15000,
    assetType: 'equity', purchaseYear: 2022,
  });

  const result = useMemo(() => calculateCapitalGains(input), [input]);
  const update = (key: keyof CapitalGainsInput, val: any) => setInput(prev => ({ ...prev, [key]: val }));

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground">Capital Gains <span className="gradient-text">Calculator</span></h1>
            <p className="text-muted-foreground mt-2">Compute STCG/LTCG with indexation benefits</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6 border border-border/40 space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Asset Type</label>
                <select value={input.assetType} onChange={e => update('assetType', e.target.value)}
                  className="w-full bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground">
                  <option value="equity">Equity / Mutual Funds</option>
                  <option value="debt">Debt Instruments</option>
                  <option value="property">Real Estate</option>
                  <option value="gold">Gold / Precious Metals</option>
                </select>
              </div>
              {[
                ['Purchase Value', 'purchaseValue'],
                ['Sale Value', 'saleValue'],
                ['Holding Period (months)', 'holdingPeriodMonths'],
                ['Transaction Costs', 'transactionCosts'],
                ['Purchase Year', 'purchaseYear'],
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="text-sm text-muted-foreground mb-1 block">{label}</label>
                  <input type="number" value={(input as any)[key]} onChange={e => update(key as keyof CapitalGainsInput, Number(e.target.value))}
                    className="w-full bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/50" />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="glass-card rounded-xl p-6 border border-accent/20">
                <h3 className="font-heading text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" /> Tax Result
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Capital Gain</span>
                    <span className={result.gain >= 0 ? 'text-emerald-400' : 'text-red-400'}>{fmt(result.gain)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Type</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${result.isLongTerm ? 'bg-emerald-400/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'}`}>
                      {result.isLongTerm ? 'Long Term' : 'Short Term'}
                    </span></div>
                  {result.isLongTerm && input.assetType !== 'equity' && (
                    <div className="flex justify-between"><span className="text-muted-foreground">Indexed Cost</span><span>{fmt(result.indexedCost)}</span></div>
                  )}
                  <div className="flex justify-between"><span className="text-muted-foreground">Tax Rate</span><span>{result.taxRate}%</span></div>
                  <div className="border-t border-accent/20 pt-3 flex justify-between">
                    <span className="font-semibold">Tax Payable</span>
                    <span className="text-xl font-bold gradient-text">{fmt(result.taxAmount)}</span>
                  </div>
                </div>
              </div>

              {result.exemptions.length > 0 && (
                <div className="glass-card rounded-xl p-5 border border-border/40">
                  <h3 className="font-heading text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-accent" /> Exemptions & Tips
                  </h3>
                  <div className="space-y-2">
                    {result.exemptions.map((e, i) => (
                      <div key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span>{e}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CapitalGainsCalculatorPage;
