import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, Calculator, ArrowRight, BarChart3, Shield, Zap, CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";

const regimeSlabs = {
  old: [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 5 },
    { limit: 1000000, rate: 20 },
    { limit: Infinity, rate: 30 },
  ],
  new: [
    { limit: 300000, rate: 0 },
    { limit: 700000, rate: 5 },
    { limit: 1000000, rate: 10 },
    { limit: 1200000, rate: 15 },
    { limit: 1500000, rate: 20 },
    { limit: Infinity, rate: 30 },
  ],
};

const calcTax = (income: number, slabs: typeof regimeSlabs.old) => {
  let tax = 0;
  let prev = 0;
  for (const slab of slabs) {
    if (income <= prev) break;
    const taxable = Math.min(income, slab.limit) - prev;
    tax += taxable * (slab.rate / 100);
    prev = slab.limit;
  }
  return Math.round(tax);
};

const strategies = [
  { name: "Section 80C", desc: "ELSS, PPF, LIC, NSC, Tuition fees", max: 150000 },
  { name: "Section 80D", desc: "Health insurance premiums", max: 75000 },
  { name: "HRA Exemption", desc: "House rent allowance", max: 500000 },
  { name: "NPS (80CCD)", desc: "National Pension System additional", max: 50000 },
  { name: "Home Loan (24b)", desc: "Interest on housing loan", max: 200000 },
];

const TaxStrategySimulatorPage = () => {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState<Record<string, string>>({});

  const grossIncome = Number(income) || 0;
  const totalDeductions = Object.values(deductions).reduce((sum, v) => sum + (Number(v) || 0), 0);
  const taxableOld = Math.max(0, grossIncome - totalDeductions);

  const oldTax = calcTax(taxableOld, regimeSlabs.old);
  const newTax = calcTax(grossIncome, regimeSlabs.new);
  const savings = newTax - oldTax;
  const betterRegime = oldTax <= newTax ? "Old Regime" : "New Regime";
  const betterTax = Math.min(oldTax, newTax);

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />

      <section className="pt-44 pb-6">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20"><TrendingUp className="w-3 h-3 mr-1" /> Strategy Tool</Badge>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-2">Tax Strategy <span className="text-accent">Simulator</span></h1>
            <p className="text-muted-foreground">Compare Old vs New tax regimes, model deductions, and find your optimal tax strategy.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-28">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Inputs */}
            <div className="lg:col-span-2 space-y-5">
              <Card className="premium-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2"><Calculator className="w-4 h-4 text-accent" /> Income Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label className="text-xs">Gross Annual Income (₹)</Label>
                  <Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="e.g. 1200000" className="mt-1" />
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2"><Shield className="w-4 h-4 text-accent" /> Deductions (Old Regime)</CardTitle>
                  <CardDescription className="text-xs">Enter amounts you can claim under old regime</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {strategies.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between items-center mb-1">
                        <Label className="text-xs">{s.name}</Label>
                        <span className="text-[10px] text-muted-foreground">Max ₹{s.max.toLocaleString("en-IN")}</span>
                      </div>
                      <Input
                        type="number"
                        placeholder={s.desc}
                        value={deductions[s.name] || ""}
                        onChange={(e) => setDeductions({ ...deductions, [s.name]: e.target.value })}
                        className="h-9 text-sm"
                      />
                    </div>
                  ))}
                  <div className="pt-3 border-t border-border/50 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Deductions</p>
                    <p className="text-lg font-bold text-accent">₹{totalDeductions.toLocaleString("en-IN")}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-3 space-y-5">
              {grossIncome > 0 && (
                <>
                  {/* Winner */}
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card className="premium-card border-accent/30">
                      <CardContent className="pt-5 pb-4 text-center">
                        <Badge className="mb-3 bg-accent/10 text-accent border-accent/20"><Zap className="w-3 h-3 mr-1" /> Recommended</Badge>
                        <h3 className="text-xl font-bold mb-1">{betterRegime} is Better</h3>
                        <p className="text-3xl font-bold text-accent">₹{betterTax.toLocaleString("en-IN")}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          You save ₹{Math.abs(savings).toLocaleString("en-IN")} compared to the other regime
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Comparison */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Card className={`premium-card ${betterRegime === "Old Regime" ? "border-accent/30" : ""}`}>
                      <CardContent className="pt-5 pb-4">
                        <div className="flex items-center gap-2 mb-3">
                          {betterRegime === "Old Regime" && <CheckCircle2 className="w-4 h-4 text-accent" />}
                          <h4 className="text-sm font-bold">Old Regime</h4>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between"><span className="text-muted-foreground">Gross Income</span><span>₹{grossIncome.toLocaleString("en-IN")}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Deductions</span><span className="text-emerald-400">-₹{totalDeductions.toLocaleString("en-IN")}</span></div>
                          <div className="flex justify-between border-t border-border/50 pt-2"><span className="text-muted-foreground">Taxable</span><span>₹{taxableOld.toLocaleString("en-IN")}</span></div>
                          <div className="flex justify-between font-bold text-base"><span>Tax</span><span className="text-accent">₹{oldTax.toLocaleString("en-IN")}</span></div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`premium-card ${betterRegime === "New Regime" ? "border-accent/30" : ""}`}>
                      <CardContent className="pt-5 pb-4">
                        <div className="flex items-center gap-2 mb-3">
                          {betterRegime === "New Regime" && <CheckCircle2 className="w-4 h-4 text-accent" />}
                          <h4 className="text-sm font-bold">New Regime</h4>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between"><span className="text-muted-foreground">Gross Income</span><span>₹{grossIncome.toLocaleString("en-IN")}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Deductions</span><span>N/A</span></div>
                          <div className="flex justify-between border-t border-border/50 pt-2"><span className="text-muted-foreground">Taxable</span><span>₹{grossIncome.toLocaleString("en-IN")}</span></div>
                          <div className="flex justify-between font-bold text-base"><span>Tax</span><span className="text-accent">₹{newTax.toLocaleString("en-IN")}</span></div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* CTA */}
                  <Card className="premium-card border-accent/20">
                    <CardContent className="pt-5 pb-4 text-center space-y-3">
                      <p className="text-xs text-muted-foreground">Want a detailed tax planning consultation?</p>
                      <div className="flex justify-center gap-3">
                        <Button className="bg-accent hover:bg-accent/90 text-xs gap-1"><ArrowRight className="w-3 h-3" /> Consult Kota Associates</Button>
                        <Button variant="outline" className="text-xs border-accent/20 text-accent">Request Tax Plan</Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {!grossIncome && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Enter your income to see regime comparison</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TaxStrategySimulatorPage;
