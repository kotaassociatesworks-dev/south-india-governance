import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, AlertTriangle, CheckCircle, XCircle, ArrowRight, Sparkles } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import { calculateBankruptcyRisk, type BankruptcyInputs, type RiskZone } from "@/lib/engines/bankruptcyRiskEngine";

const ZONE_CONFIG: Record<RiskZone, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  healthy: { label: 'Healthy', color: 'text-green-400', bg: 'bg-green-500/10', icon: CheckCircle },
  moderate: { label: 'Moderate Stress', color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: AlertTriangle },
  high: { label: 'High Risk', color: 'text-orange-400', bg: 'bg-orange-500/10', icon: ShieldAlert },
  critical: { label: 'Critical – Near Bankruptcy', color: 'text-red-400', bg: 'bg-red-500/10', icon: XCircle },
};

const STATUS_COLORS = { good: 'hsl(160 60% 45%)', warning: 'hsl(46 70% 47%)', danger: 'hsl(0 72% 51%)' };

const BankruptcyRiskPage = () => {
  const [inputs, setInputs] = useState<BankruptcyInputs>({
    totalAssets: 10000000, totalLiabilities: 4000000,
    currentAssets: 3000000, currentLiabilities: 1500000,
    revenue: 8000000, operatingExpenses: 6500000,
    netIncome: 1200000, retainedEarnings: 2000000,
    interestExpense: 300000, marketValueEquity: 6000000,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => calculateBankruptcyRisk(inputs), [inputs]);
  const zone = ZONE_CONFIG[result.riskZone];
  const ZoneIcon = zone.icon;

  const handleChange = (key: keyof BankruptcyInputs, value: string) => {
    setInputs(prev => ({ ...prev, [key]: Number(value) || 0 }));
  };

  const handleAnalyze = () => {
    setCalculated(true);
    setTimeout(() => setShowPopup(true), 4000);
  };

  const inputFields: { key: keyof BankruptcyInputs; label: string }[] = [
    { key: 'totalAssets', label: 'Total Assets' },
    { key: 'totalLiabilities', label: 'Total Liabilities' },
    { key: 'currentAssets', label: 'Current Assets' },
    { key: 'currentLiabilities', label: 'Current Liabilities' },
    { key: 'revenue', label: 'Annual Revenue' },
    { key: 'operatingExpenses', label: 'Operating Expenses' },
    { key: 'netIncome', label: 'Net Income' },
    { key: 'retainedEarnings', label: 'Retained Earnings' },
    { key: 'interestExpense', label: 'Interest Expense' },
    { key: 'marketValueEquity', label: 'Market Value of Equity' },
  ];

  const radialData = [{ name: 'Risk', value: result.riskPercentage, fill: STATUS_COLORS[result.riskPercentage > 60 ? 'danger' : result.riskPercentage > 35 ? 'warning' : 'good'] }];

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <ShieldAlert className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">Financial Risk Assessment</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Bankruptcy <span className="text-accent">Risk Indicator</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Altman Z-Score inspired analysis for early detection of financial distress
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Inputs */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="lg:col-span-1 glass-card rounded-xl border border-border/40 p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground mb-5">Financial Data</h2>
              <div className="space-y-3">
                {inputFields.map(f => (
                  <div key={f.key}>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">{f.label}</label>
                    <input type="number" value={inputs[f.key]}
                      onChange={e => handleChange(f.key, e.target.value)}
                      className="w-full bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/50" />
                  </div>
                ))}
                <button onClick={handleAnalyze}
                  className="w-full py-3 rounded-xl font-semibold text-sm mt-2 transition-all"
                  style={{ background: "linear-gradient(135deg, hsl(46 70% 47%), hsl(46 50% 55%))", color: "hsl(210 72% 10%)" }}>
                  Analyze Risk
                </button>
              </div>
            </motion.div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Risk Meter */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="glass-card rounded-xl border border-border/40 p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" startAngle={180} endAngle={0} data={radialData}>
                        <RadialBar background dataKey="value" cornerRadius={10} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="text-center -mt-24">
                      <p className={`text-3xl font-heading font-bold ${zone.color}`}>{result.riskPercentage}%</p>
                      <p className="text-xs text-muted-foreground">Risk Score</p>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${zone.bg} mb-3`}>
                      <ZoneIcon className={`w-4 h-4 ${zone.color}`} />
                      <span className={`text-sm font-semibold ${zone.color}`}>{zone.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Altman Z-Score: <span className={`font-bold ${zone.color}`}>{result.zScore}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {result.zScore > 2.99 ? 'Safe zone — low probability of financial distress' :
                       result.zScore > 1.81 ? 'Grey zone — monitor financial ratios closely' :
                       'Distress zone — immediate financial restructuring recommended'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Financial Indicators */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="glass-card rounded-xl border border-border/40 p-6">
                <h3 className="font-heading text-base font-semibold text-foreground mb-4">Key Financial Indicators</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={result.indicators} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 30% 20%)" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: 'hsl(216 18% 60%)' }} />
                    <YAxis dataKey="label" type="category" tick={{ fontSize: 11, fill: 'hsl(216 18% 60%)' }} width={130} />
                    <Tooltip contentStyle={{ background: 'hsl(210 60% 12%)', border: '1px solid hsl(210 30% 20%)', borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                      {result.indicators.map((ind, i) => (
                        <Cell key={i} fill={STATUS_COLORS[ind.status]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Recommendations */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="glass-card rounded-xl border border-border/40 p-6">
                <h3 className="font-heading text-base font-semibold text-foreground mb-4">
                  <Sparkles className="w-4 h-4 text-accent inline mr-2" />
                  Recommendations
                </h3>
                <div className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/30">
                      <ArrowRight className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/80">{rec}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <LeadCapturePopup show={showPopup} onClose={() => setShowPopup(false)} toolName="the Bankruptcy Risk Indicator" />
    </main>
  );
};

export default BankruptcyRiskPage;
