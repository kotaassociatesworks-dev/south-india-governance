import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { Rocket, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";
import { simulateGrowth, runScenarioComparison, type GrowthInputs, type ScenarioInputs } from "@/lib/engines/simulationEngine";

const fmt = (n: number) => {
  if (Math.abs(n) >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (Math.abs(n) >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

const INDUSTRIES = ['Technology', 'Manufacturing', 'Retail', 'Healthcare', 'Finance', 'Real Estate', 'Services'];

const BusinessGrowthSimulatorPage = () => {
  const [tab, setTab] = useState<'growth' | 'twin'>('growth');
  const [growth, setGrowth] = useState<GrowthInputs>({
    currentRevenue: 5000000, currentExpenses: 3500000, industry: 'Technology', employees: 15, growthRatePercent: 15, years: 5,
  });
  const [scenario, setScenario] = useState<ScenarioInputs>({
    baseRevenue: 5000000, baseExpenses: 3500000, investmentAmount: 1000000, investmentReturn: 12, additionalDeductions: 200000, industry: 'Technology',
  });

  const growthResult = useMemo(() => simulateGrowth(growth), [growth]);
  const scenarioResult = useMemo(() => runScenarioComparison(scenario), [scenario]);

  const updateGrowth = (key: keyof GrowthInputs, val: any) => setGrowth(prev => ({ ...prev, [key]: val }));
  const updateScenario = (key: keyof ScenarioInputs, val: any) => setScenario(prev => ({ ...prev, [key]: val }));

  const compData = [
    { name: 'Base', profit: scenarioResult.baseCase.netIncome, fill: '#3b82f6' },
    { name: 'Optimized', profit: scenarioResult.optimizedCase.netIncome, fill: '#d4af37' },
  ];

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground">
              {tab === 'growth' ? <>Business Growth <span className="gradient-text">Simulator</span></> : <>Financial <span className="gradient-text">Digital Twin</span></>}
            </h1>
            <p className="text-muted-foreground mt-2">
              {tab === 'growth' ? 'Project your business trajectory over multiple years' : 'Compare financial strategies with predictive simulation'}
            </p>
          </motion.div>

          <div className="flex gap-2 mb-8">
            {(['growth', 'twin'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === t ? 'bg-accent text-accent-foreground' : 'bg-muted/30 text-muted-foreground border border-border/40'}`}>
                {t === 'growth' ? 'Growth Simulator' : 'Financial Digital Twin'}
              </button>
            ))}
          </div>

          {tab === 'growth' ? (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="glass-card rounded-xl p-6 border border-border/40 space-y-3">
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">Business Parameters</h3>
                <div>
                  <label className="text-xs text-muted-foreground">Industry</label>
                  <select value={growth.industry} onChange={e => updateGrowth('industry', e.target.value)}
                    className="w-full bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground mt-1">
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                {[
                  ['Current Revenue', 'currentRevenue'],
                  ['Current Expenses', 'currentExpenses'],
                  ['Employees', 'employees'],
                  ['Growth Rate (%)', 'growthRatePercent'],
                  ['Projection Years', 'years'],
                ].map(([label, key]) => (
                  <div key={key}>
                    <label className="text-xs text-muted-foreground">{label}</label>
                    <input type="number" value={(growth as any)[key]} onChange={e => updateGrowth(key as keyof GrowthInputs, Number(e.target.value))}
                      className="w-full bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground mt-1 focus:outline-none focus:border-accent/50" />
                  </div>
                ))}
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="glass-card rounded-xl p-6 border border-border/40">
                  <h3 className="font-heading text-base font-semibold text-foreground mb-4">Revenue & Profit Projection</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={growthResult.projections}>
                      <defs>
                        <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} /><stop offset="95%" stopColor="#d4af37" stopOpacity={0} /></linearGradient>
                        <linearGradient id="gProf" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={v => `Y${v}`} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={v => fmt(v)} />
                      <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                      <Area type="monotone" dataKey="revenue" stroke="#d4af37" fill="url(#gRev)" strokeWidth={2} name="Revenue" />
                      <Area type="monotone" dataKey="profit" stroke="#10b981" fill="url(#gProf)" strokeWidth={2} name="Profit" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="glass-card rounded-xl p-4 border border-border/40 text-center">
                    <div className="text-xs text-muted-foreground">Total Revenue</div>
                    <div className="text-lg font-bold gradient-text">{fmt(growthResult.totalProjectedRevenue)}</div>
                  </div>
                  <div className="glass-card rounded-xl p-4 border border-border/40 text-center">
                    <div className="text-xs text-muted-foreground">Total Profit</div>
                    <div className="text-lg font-bold text-emerald-400">{fmt(growthResult.totalProjectedProfit)}</div>
                  </div>
                  <div className="glass-card rounded-xl p-4 border border-border/40 text-center">
                    <div className="text-xs text-muted-foreground">Total Tax</div>
                    <div className="text-lg font-bold text-red-400">{fmt(growthResult.totalEstimatedTax)}</div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-5 border border-border/40">
                  <h3 className="font-heading text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-accent" /> Growth Insights
                  </h3>
                  <div className="space-y-2">
                    {growthResult.insights.map((ins, i) => (
                      <div key={i} className="text-xs text-muted-foreground flex items-start gap-2"><span className="text-accent">▸</span>{ins}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6 border border-border/40 space-y-3">
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">Scenario Parameters</h3>
                {[
                  ['Base Revenue', 'baseRevenue'],
                  ['Base Expenses', 'baseExpenses'],
                  ['Investment Amount', 'investmentAmount'],
                  ['Investment Return (%)', 'investmentReturn'],
                  ['Additional Deductions', 'additionalDeductions'],
                ].map(([label, key]) => (
                  <div key={key}>
                    <label className="text-xs text-muted-foreground">{label}</label>
                    <input type="number" value={(scenario as any)[key]} onChange={e => updateScenario(key as keyof ScenarioInputs, Number(e.target.value))}
                      className="w-full bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground mt-1 focus:outline-none focus:border-accent/50" />
                  </div>
                ))}
                <div>
                  <label className="text-xs text-muted-foreground">Industry</label>
                  <select value={scenario.industry} onChange={e => updateScenario('industry', e.target.value)}
                    className="w-full bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground mt-1">
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="glass-card rounded-xl p-6 border border-accent/20">
                  <h3 className="font-heading text-base font-semibold text-foreground mb-4">Scenario Comparison</h3>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={compData} layout="vertical">
                      <XAxis type="number" tickFormatter={v => fmt(v)} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} width={80} />
                      <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                      <Bar dataKey="profit" radius={[0, 6, 6, 0]} name="Net Income">
                        {compData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card rounded-xl p-4 border border-border/40">
                    <div className="text-xs text-muted-foreground mb-1">Base Case</div>
                    <div className="text-sm"><span className="text-muted-foreground">Profit:</span> <span className="text-foreground">{fmt(scenarioResult.baseCase.profit)}</span></div>
                    <div className="text-sm"><span className="text-muted-foreground">Tax:</span> <span className="text-red-400">{fmt(scenarioResult.baseCase.tax)}</span></div>
                    <div className="text-sm"><span className="text-muted-foreground">Net:</span> <span className="font-semibold text-foreground">{fmt(scenarioResult.baseCase.netIncome)}</span></div>
                  </div>
                  <div className="glass-card rounded-xl p-4 border border-accent/20">
                    <div className="text-xs text-accent mb-1">Optimized</div>
                    <div className="text-sm"><span className="text-muted-foreground">Profit:</span> <span className="text-foreground">{fmt(scenarioResult.optimizedCase.profit)}</span></div>
                    <div className="text-sm"><span className="text-muted-foreground">Tax:</span> <span className="text-red-400">{fmt(scenarioResult.optimizedCase.tax)}</span></div>
                    <div className="text-sm"><span className="text-muted-foreground">Net:</span> <span className="font-semibold gradient-text">{fmt(scenarioResult.optimizedCase.netIncome)}</span></div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-5 border border-border/40">
                  <div className="flex items-start gap-3">
                    <Rocket className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{scenarioResult.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default BusinessGrowthSimulatorPage;
