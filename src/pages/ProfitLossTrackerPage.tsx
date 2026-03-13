import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart, ArrowRight, Sparkles } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell, Legend } from "recharts";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import { calculateProfitLoss, type ProfitLossInputs } from "@/lib/engines/profitLossEngine";

const COLORS = ['hsl(46 70% 47%)', 'hsl(200 80% 55%)', 'hsl(340 65% 55%)', 'hsl(160 60% 45%)', 'hsl(270 55% 55%)', 'hsl(30 75% 55%)', 'hsl(190 65% 50%)'];

const fmt = (n: number) => {
  if (Math.abs(n) >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (Math.abs(n) >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

const ProfitLossTrackerPage = () => {
  const [inputs, setInputs] = useState<ProfitLossInputs>({
    revenue: 5000000, costOfGoods: 2000000, operatingExpenses: 1200000,
    otherIncome: 200000, investments: 300000, loanRepayments: 150000,
    interestExpense: 80000, depreciation: 120000,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => calculateProfitLoss(inputs), [inputs]);

  const handleChange = (key: keyof ProfitLossInputs, value: string) => {
    setInputs(prev => ({ ...prev, [key]: Number(value) || 0 }));
  };

  const handleCalculate = () => {
    setCalculated(true);
    setTimeout(() => setShowPopup(true), 3000);
  };

  const pieData = result.breakdownItems.filter(i => i.value > 0).map(i => ({ name: i.label, value: i.value }));

  const inputFields: { key: keyof ProfitLossInputs; label: string; icon: string }[] = [
    { key: 'revenue', label: 'Annual Revenue', icon: '💰' },
    { key: 'costOfGoods', label: 'Cost of Goods Sold', icon: '📦' },
    { key: 'operatingExpenses', label: 'Operating Expenses', icon: '⚙️' },
    { key: 'otherIncome', label: 'Other Income', icon: '💵' },
    { key: 'investments', label: 'Investments', icon: '📈' },
    { key: 'loanRepayments', label: 'Loan Repayments', icon: '🏦' },
    { key: 'interestExpense', label: 'Interest Expense', icon: '💳' },
    { key: 'depreciation', label: 'Depreciation', icon: '📉' },
  ];

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <BarChart3 className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">Financial Performance Tracker</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Profit & Loss <span className="text-accent">Tracker</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Analyze your business financial performance with real-time profit/loss calculations
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Input Panel */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="lg:col-span-1 glass-card rounded-xl border border-border/40 p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground mb-5">Financial Inputs</h2>
              <div className="space-y-4">
                {inputFields.map(f => (
                  <div key={f.key}>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">{f.icon} {f.label}</label>
                    <input
                      type="number"
                      value={inputs[f.key]}
                      onChange={e => handleChange(f.key, e.target.value)}
                      className="w-full bg-muted/30 border border-border/40 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent/50"
                    />
                  </div>
                ))}
                <button onClick={handleCalculate}
                  className="w-full py-3 rounded-xl font-semibold text-sm mt-2 transition-all"
                  style={{ background: "linear-gradient(135deg, hsl(46 70% 47%), hsl(46 50% 55%))", color: "hsl(210 72% 10%)" }}>
                  Analyze Performance
                </button>
              </div>
            </motion.div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Net Profit', value: fmt(result.netProfit), sub: `${result.netMargin}% margin`, positive: result.netProfit >= 0 },
                  { label: 'Gross Profit', value: fmt(result.grossProfit), sub: `${result.grossMargin}% margin`, positive: result.grossProfit >= 0 },
                  { label: 'Expense Ratio', value: `${result.expenseRatio}%`, sub: result.expenseRatio < 80 ? 'Healthy' : 'High', positive: result.expenseRatio < 80 },
                  { label: 'Stability Index', value: `${result.financialStabilityIndex}/100`, sub: result.financialStabilityIndex > 60 ? 'Strong' : 'Needs attention', positive: result.financialStabilityIndex > 60 },
                ].map((kpi, i) => (
                  <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
                    className="glass-card rounded-xl border border-border/40 p-4">
                    <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                    <p className={`font-heading text-lg font-bold ${kpi.positive ? 'text-green-400' : 'text-red-400'}`}>{kpi.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* Revenue vs Expenses Chart */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="glass-card rounded-xl border border-border/40 p-6">
                <h3 className="font-heading text-base font-semibold text-foreground mb-4">Monthly Revenue vs Expenses</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={result.monthlyProjection}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(46 70% 47%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(46 70% 47%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(200 80% 55%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(200 80% 55%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 30% 20%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(216 18% 60%)' }} />
                    <YAxis tick={{ fontSize: 11, fill: 'hsl(216 18% 60%)' }} tickFormatter={v => `${(v / 100000).toFixed(0)}L`} />
                    <Tooltip contentStyle={{ background: 'hsl(210 60% 12%)', border: '1px solid hsl(210 30% 20%)', borderRadius: 8, fontSize: 12 }} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(46 70% 47%)" fill="url(#revGrad)" strokeWidth={2} name="Revenue" />
                    <Area type="monotone" dataKey="expenses" stroke="hsl(200 80% 55%)" fill="url(#expGrad)" strokeWidth={2} name="Expenses" />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Pie Chart */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="glass-card rounded-xl border border-border/40 p-6">
                <h3 className="font-heading text-base font-semibold text-foreground mb-4">Income & Expense Breakdown</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <RPieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: 'hsl(210 60% 12%)', border: '1px solid hsl(210 30% 20%)', borderRadius: 8, fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </RPieChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <LeadCapturePopup show={showPopup} onClose={() => setShowPopup(false)} toolName="the Profit/Loss Tracker" />
    </main>
  );
};

export default ProfitLossTrackerPage;
