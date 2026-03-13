import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Calculator, Shield, Zap, CheckCircle2, Lightbulb,
  ChevronDown, ChevronRight, Target, Brain, Calendar, ArrowRight, IndianRupee, BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend, RadialBarChart, RadialBar
} from "recharts";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import { analyzeStrategy, getDefaultProfile, type FinancialProfile, type TaxSavingSuggestion } from "@/lib/engines/taxStrategyEngine";

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const INCOME_FIELDS: { label: string; key: keyof FinancialProfile }[] = [
  { label: 'Salary', key: 'salary' },
  { label: 'Business Income', key: 'businessIncome' },
  { label: 'Capital Gains', key: 'capitalGains' },
  { label: 'Rental Income', key: 'rentalIncome' },
  { label: 'Other Income', key: 'otherIncome' },
];

const DEDUCTION_FIELDS: { label: string; key: keyof FinancialProfile; hint: string }[] = [
  { label: 'ELSS / Mutual Funds', key: 'elssInvestment', hint: '80C' },
  { label: 'PPF Contribution', key: 'ppfInvestment', hint: '80C' },
  { label: 'Life Insurance', key: 'lifeInsurance', hint: '80C' },
  { label: 'Tuition Fees', key: 'tuitionFees', hint: '80C' },
  { label: 'Other 80C', key: 'section80C', hint: '80C' },
  { label: 'Health Insurance', key: 'healthInsurance', hint: '80D' },
  { label: 'Other 80D', key: 'section80D', hint: '80D' },
  { label: 'NPS (80CCD)', key: 'npsInvestment', hint: '80CCD' },
  { label: 'Charitable Donations', key: 'section80G', hint: '80G' },
  { label: 'Home Loan Interest', key: 'homeLoanInterest', hint: '24(b)' },
];

const COLORS = ['hsl(var(--accent))', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];

const InputField = ({ label, value, onChange, hint }: { label: string; value: number; onChange: (v: number) => void; hint?: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-40 shrink-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      {hint && <span className="text-[10px] text-muted-foreground/60 ml-1">({hint})</span>}
    </div>
    <div className="relative flex-1">
      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
      <input
        type="number"
        value={value || ''}
        onChange={e => onChange(Number(e.target.value) || 0)}
        className="w-full bg-muted/30 border border-border/40 rounded-lg pl-8 pr-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/50"
        placeholder="0"
      />
    </div>
  </div>
);

const SuggestionCard = ({ s, simple }: { s: TaxSavingSuggestion; simple: boolean }) => {
  const [open, setOpen] = useState(false);
  const priorityColor = s.priority === 'high' ? 'text-red-400 bg-red-400/10' : s.priority === 'medium' ? 'text-amber-400 bg-amber-400/10' : 'text-emerald-400 bg-emerald-400/10';
  const pct = Math.round((s.currentAmount / s.maxLimit) * 100);

  return (
    <Card className="premium-card border-border/40 hover:border-accent/30 transition-colors">
      <CardContent className="pt-4 pb-3 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className={`text-[10px] ${priorityColor} border-current`}>{s.priority}</Badge>
              <span className="text-xs font-semibold text-foreground">{s.section}</span>
            </div>
            <h4 className="text-sm font-medium text-foreground">{s.title}</h4>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Potential saving</p>
            <p className="text-base font-bold text-accent">{fmt(s.potentialTaxSaving)}</p>
          </div>
        </div>

        {/* Utilization bar */}
        <div>
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
            <span>Used: {fmt(s.currentAmount)}</span>
            <span>Limit: {fmt(s.maxLimit)}</span>
          </div>
          <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-[10px] text-accent mt-1">₹{s.unusedCapacity.toLocaleString('en-IN')} unused capacity</p>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {simple ? s.simpleExplanation : s.professionalExplanation}
        </p>

        {s.investments.length > 0 && (
          <div>
            <button onClick={() => setOpen(!open)} className="flex items-center gap-1 text-xs text-accent hover:underline">
              {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              Recommended Investments
            </button>
            <AnimatePresence>
              {open && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="mt-2 space-y-1.5">
                    {s.investments.map((inv, i) => (
                      <div key={i} className="bg-muted/30 rounded-lg p-2 flex justify-between items-start">
                        <div>
                          <p className="text-xs font-medium text-foreground">{inv.name}</p>
                          <p className="text-[10px] text-muted-foreground">{inv.description}</p>
                        </div>
                        <Badge variant="outline" className="text-[9px] shrink-0">{inv.riskLevel}</Badge>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const TaxStrategySimulatorPage = () => {
  const [profile, setProfile] = useState<FinancialProfile>(getDefaultProfile());
  const [simpleMode, setSimpleMode] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const update = (key: keyof FinancialProfile, val: number) => setProfile(prev => ({ ...prev, [key]: val }));

  const result = useMemo(() => analyzeStrategy(profile), [profile]);
  const gross = profile.salary + profile.businessIncome + profile.capitalGains + profile.rentalIncome + profile.otherIncome;

  const regimeBarData = [
    { name: 'Old Regime', tax: result.regimeRecommendation.oldRegimeTax, fill: 'hsl(var(--accent))' },
    { name: 'New Regime', tax: result.regimeRecommendation.newRegimeTax, fill: '#10b981' },
  ];

  const optimizationPie = [
    { name: 'Current Tax', value: result.taxAfterOptimization },
    { name: 'Potential Savings', value: result.totalPotentialSaving },
  ].filter(d => d.value > 0);

  const optimizationRadial = [
    { name: 'Optimization', value: Math.round(result.optimizationPercentage), fill: 'hsl(var(--accent))' },
  ];

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />

      <section className="pt-32 pb-6">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-3 bg-accent/10 text-accent border-accent/20">
              <Brain className="w-3 h-3 mr-1" /> Intelligent Tax Planning
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-2">
              Tax Strategy <span className="text-accent">Engine</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              AI-powered tax optimization — automatically detects unused deductions, recommends investments, and generates a personalized tax-saving strategy.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-6">

            {/* LEFT — Inputs */}
            <div className="lg:col-span-2 space-y-5">
              <Card className="premium-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2"><Calculator className="w-4 h-4 text-accent" /> Income Sources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {INCOME_FIELDS.map(f => <InputField key={f.key} label={f.label} value={profile[f.key]} onChange={v => update(f.key, v)} />)}
                  <div className="pt-2 border-t border-border/40 flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Income</span>
                    <span className="font-bold text-accent">{fmt(gross)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2"><Shield className="w-4 h-4 text-accent" /> Deductions & Investments</CardTitle>
                  <CardDescription className="text-xs">Enter current investments to detect unused capacity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {DEDUCTION_FIELDS.map(f => <InputField key={f.key} label={f.label} value={profile[f.key]} onChange={v => update(f.key, v)} hint={f.hint} />)}
                </CardContent>
              </Card>
            </div>

            {/* RIGHT — Results */}
            <div className="lg:col-span-3 space-y-5">
              {gross > 0 ? (
                <>
                  {/* Regime Recommendation */}
                  <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card className="premium-card border-accent/30">
                      <CardContent className="pt-5 pb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                            <Zap className="w-5 h-5 text-accent" />
                          </div>
                          <div className="flex-1">
                            <Badge className="mb-2 bg-accent/10 text-accent border-accent/20">Recommended</Badge>
                            <h3 className="text-lg font-bold text-foreground mb-1">
                              {result.regimeRecommendation.recommendedRegime === 'old' ? 'Old Regime' : 'New Regime'} is Better
                            </h3>
                            <p className="text-2xl font-bold text-accent mb-1">
                              {fmt(Math.min(result.regimeRecommendation.oldRegimeTax, result.regimeRecommendation.newRegimeTax))}
                            </p>
                            <p className="text-xs text-emerald-400">
                              Save {fmt(result.regimeRecommendation.savings)} vs the other regime
                            </p>
                            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{result.regimeRecommendation.reason}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* KPI Strip */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Current Tax', value: fmt(result.taxBeforeOptimization), color: 'text-foreground' },
                      { label: 'After Optimization', value: fmt(result.taxAfterOptimization), color: 'text-emerald-400' },
                      { label: 'Potential Saving', value: fmt(result.totalPotentialSaving), color: 'text-accent' },
                    ].map((k, i) => (
                      <Card key={i} className="premium-card">
                        <CardContent className="pt-4 pb-3 text-center">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{k.label}</p>
                          <p className={`text-lg font-bold ${k.color}`}>{k.value}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Tabs */}
                  <Tabs defaultValue="savings" className="w-full">
                    <TabsList className="w-full grid grid-cols-4 bg-muted/30 border border-border/40">
                      <TabsTrigger value="savings" className="text-xs data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                        <Lightbulb className="w-3 h-3 mr-1" /> Savings
                      </TabsTrigger>
                      <TabsTrigger value="charts" className="text-xs data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                        <BarChart3 className="w-3 h-3 mr-1" /> Visual
                      </TabsTrigger>
                      <TabsTrigger value="plan" className="text-xs data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                        <Calendar className="w-3 h-3 mr-1" /> Plan
                      </TabsTrigger>
                      <TabsTrigger value="insights" className="text-xs data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                        <Brain className="w-3 h-3 mr-1" /> AI
                      </TabsTrigger>
                    </TabsList>

                    {/* TAB: Savings */}
                    <TabsContent value="savings" className="space-y-4 mt-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <Target className="w-4 h-4 text-accent" />
                          Tax Saving Opportunities ({result.suggestions.length})
                        </h3>
                        <button onClick={() => setSimpleMode(!simpleMode)} className="text-[10px] text-accent hover:underline">
                          {simpleMode ? 'Professional View' : 'Simple View'}
                        </button>
                      </div>

                      {result.suggestions.length > 0 ? (
                        result.suggestions.map(s => <SuggestionCard key={s.id} s={s} simple={simpleMode} />)
                      ) : (
                        <Card className="premium-card">
                          <CardContent className="pt-6 pb-5 text-center">
                            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                            <p className="text-sm font-medium text-foreground">Fully Optimized!</p>
                            <p className="text-xs text-muted-foreground mt-1">All deduction limits are fully utilized.</p>
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>

                    {/* TAB: Charts */}
                    <TabsContent value="charts" className="space-y-4 mt-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Regime Comparison */}
                        <Card className="premium-card">
                          <CardHeader className="pb-2"><CardTitle className="text-sm">Regime Comparison</CardTitle></CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={180}>
                              <BarChart data={regimeBarData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                                <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 11 }} formatter={(v: number) => [fmt(v), 'Tax']} />
                                <Bar dataKey="tax" radius={[6, 6, 0, 0]}>
                                  {regimeBarData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>

                        {/* Optimization Gauge */}
                        <Card className="premium-card">
                          <CardHeader className="pb-2"><CardTitle className="text-sm">Optimization Potential</CardTitle></CardHeader>
                          <CardContent className="flex flex-col items-center">
                            <ResponsiveContainer width="100%" height={140}>
                              <RadialBarChart cx="50%" cy="80%" innerRadius="60%" outerRadius="100%" startAngle={180} endAngle={0} data={optimizationRadial} barSize={12}>
                                <RadialBar dataKey="value" cornerRadius={6} fill="hsl(var(--accent))" background={{ fill: 'hsl(var(--muted)/0.3)' }} />
                              </RadialBarChart>
                            </ResponsiveContainer>
                            <p className="text-2xl font-bold text-accent -mt-6">{Math.round(result.optimizationPercentage)}%</p>
                            <p className="text-[10px] text-muted-foreground mt-1">of tax can be saved with full optimization</p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Before/After Pie */}
                      <Card className="premium-card">
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Tax Before vs After Optimization</CardTitle></CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                              <Pie data={optimizationPie} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                                {optimizationPie.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                              </Pie>
                              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 11 }} formatter={(v: number) => [fmt(v), '']} />
                            </PieChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* TAB: Yearly Plan */}
                    <TabsContent value="plan" className="space-y-4 mt-4">
                      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" /> Tax Planning Timeline
                      </h3>
                      {result.yearlyPlan.map((q, qi) => (
                        <Card key={qi} className="premium-card">
                          <CardContent className="pt-4 pb-3">
                            <h4 className="text-xs font-bold text-accent mb-2">{q.quarter}</h4>
                            <ul className="space-y-1.5">
                              {q.actions.map((a, ai) => (
                                <li key={ai} className="flex items-start gap-2 text-xs text-muted-foreground">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                                  {a}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    {/* TAB: AI Insights */}
                    <TabsContent value="insights" className="space-y-4 mt-4">
                      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Brain className="w-4 h-4 text-accent" /> AI Tax Brain Insights
                      </h3>
                      {result.aiInsights.map((insight, i) => (
                        <Card key={i} className="premium-card border-accent/10">
                          <CardContent className="pt-4 pb-3 flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Lightbulb className="w-3.5 h-3.5 text-accent" />
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{insight}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  </Tabs>

                  {/* CTA */}
                  <Card className="premium-card border-accent/20">
                    <CardContent className="pt-5 pb-4 text-center space-y-3">
                      <p className="text-xs text-muted-foreground">Want a detailed, personalized tax plan from a Chartered Accountant?</p>
                      <div className="flex justify-center gap-3">
                        <Button className="bg-accent hover:bg-accent/90 text-xs gap-1" onClick={() => setShowPopup(true)}>
                          <ArrowRight className="w-3 h-3" /> Get Expert Tax Plan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Brain className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Enter your income to generate a personalized tax strategy</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <LeadCapturePopup open={showPopup} onClose={() => setShowPopup(false)} />
      <Footer />
    </main>
  );
};

export default TaxStrategySimulatorPage;
