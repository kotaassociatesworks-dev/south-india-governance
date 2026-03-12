import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Shield, FileText, AlertTriangle, IndianRupee, Activity, BarChart3, Bell, Upload, Receipt } from "lucide-react";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";
import { calculateHealthScore, type HealthInputs } from "@/lib/engines/healthScoreEngine";
import { getUpcomingDeadlines, generateAlerts, getComplianceRiskScore } from "@/lib/engines/complianceEngine";

const revenueData = [
  { month: 'Apr', revenue: 1200000, expenses: 850000 },
  { month: 'May', revenue: 1350000, expenses: 900000 },
  { month: 'Jun', revenue: 1100000, expenses: 820000 },
  { month: 'Jul', revenue: 1500000, expenses: 950000 },
  { month: 'Aug', revenue: 1420000, expenses: 870000 },
  { month: 'Sep', revenue: 1600000, expenses: 920000 },
  { month: 'Oct', revenue: 1750000, expenses: 980000 },
  { month: 'Nov', revenue: 1680000, expenses: 960000 },
  { month: 'Dec', revenue: 1900000, expenses: 1050000 },
];

const healthInputs: HealthInputs = {
  totalFilings: 24, onTimeFilings: 21, revenue: 18000000, expenses: 12000000,
  profit: 6000000, gstCollected: 2800000, gstCredited: 2200000,
  pendingNotices: 1, overdueFilings: 1, auditTriggered: false,
};

const fmt = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

const FinancialCommandCenterPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const health = useMemo(() => calculateHealthScore(healthInputs), []);
  const deadlines = useMemo(() => getUpcomingDeadlines(), []);
  const alerts = useMemo(() => generateAlerts(deadlines), [deadlines]);
  const riskScore = useMemo(() => getComplianceRiskScore(deadlines), [deadlines]);

  const statusColor = (s: string) => s === 'compliant' ? 'text-emerald-400' : s === 'due_soon' ? 'text-amber-400' : 'text-red-400';
  const statusBg = (s: string) => s === 'compliant' ? 'bg-emerald-400/10 border-emerald-400/30' : s === 'due_soon' ? 'bg-amber-400/10 border-amber-400/30' : 'bg-red-400/10 border-red-400/30';

  const pieData = [
    { name: 'Tax Compliance', value: health.complianceScore },
    { name: 'Tax Efficiency', value: health.taxEfficiency },
    { name: 'Profit Health', value: health.profitHealth },
    { name: 'GST Utilization', value: health.gstUtilization },
    { name: 'Audit Safety', value: health.auditRisk },
  ];
  const COLORS = ['#10b981', '#3b82f6', '#d4af37', '#06b6d4', '#8b5cf6'];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: Bell },
  ];

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Financial <span className="gradient-text">Command Center</span>
            </h1>
            <p className="text-muted-foreground mt-2">Real-time financial intelligence at your fingertips</p>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Revenue YTD', value: fmt(18000000), icon: IndianRupee, change: '+12.4%', color: 'text-emerald-400' },
              { label: 'Net Profit', value: fmt(6000000), icon: TrendingUp, change: '+8.2%', color: 'text-emerald-400' },
              { label: 'Health Score', value: `${health.overall}/100`, icon: Activity, change: health.grade, color: health.overall >= 70 ? 'text-emerald-400' : 'text-amber-400' },
              { label: 'Risk Level', value: riskScore > 30 ? 'Elevated' : 'Low', icon: AlertTriangle, change: `${riskScore}%`, color: riskScore > 30 ? 'text-red-400' : 'text-emerald-400' },
            ].map((kpi, i) => (
              <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-5 border border-border/40">
                <div className="flex items-center justify-between mb-3">
                  <kpi.icon className="w-5 h-5 text-accent" />
                  <span className={`text-xs font-semibold ${kpi.color}`}>{kpi.change}</span>
                </div>
                <div className="text-xl font-bold text-foreground">{kpi.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{kpi.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 bg-muted/30 rounded-lg p-1 w-fit">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === t.id ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                <t.icon className="w-4 h-4" />{t.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-border/40">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Revenue vs Expenses</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`} />
                    <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 8 }} formatter={(v: number) => fmt(v)} />
                    <Area type="monotone" dataKey="revenue" stroke="#d4af37" fill="url(#revGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="expenses" stroke="#3b82f6" fill="url(#expGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Health Score */}
              <div className="glass-card rounded-xl p-6 border border-border/40">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Health Score</h3>
                <div className="flex justify-center mb-4">
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#d4af37" strokeWidth="6"
                        strokeDasharray={`${health.overall * 2.64} 264`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-foreground">{health.overall}</span>
                      <span className="text-xs text-accent font-semibold">Grade {health.grade}</span>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Compliance Tab */}
          {activeTab === 'compliance' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6 border border-border/40">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" /> Compliance Radar
                </h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {deadlines.slice(0, 12).map(d => (
                    <div key={d.id} className={`flex items-center justify-between p-3 rounded-lg border ${statusBg(d.status)}`}>
                      <div>
                        <div className="text-sm font-medium text-foreground">{d.name}</div>
                        <div className="text-xs text-muted-foreground">{d.description}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-semibold ${statusColor(d.status)}`}>
                          {d.daysRemaining < 0 ? `${Math.abs(d.daysRemaining)}d overdue` : `${d.daysRemaining}d left`}
                        </div>
                        <div className="text-xs text-muted-foreground">{d.dueDate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-card rounded-xl p-6 border border-border/40">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Health Suggestions</h3>
                <div className="space-y-3">
                  {health.suggestions.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10">
                      <Activity className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="glass-card rounded-xl p-8 border border-border/40">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Upload className="w-5 h-5 text-accent" /> Document Vault
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {['Invoices', 'Bank Statements', 'GST Reports', 'TDS Certificates', 'Legal Documents', 'Tax Returns'].map(cat => (
                  <div key={cat} className="p-5 rounded-lg border border-border/40 hover:border-accent/30 transition-all cursor-pointer bg-background/50">
                    <FileText className="w-8 h-8 text-accent mb-3" />
                    <div className="font-medium text-foreground text-sm">{cat}</div>
                    <div className="text-xs text-muted-foreground mt-1">{Math.floor(Math.random() * 20 + 5)} files</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div className="space-y-4">
              {alerts.length === 0 && (
                <div className="glass-card rounded-xl p-8 border border-border/40 text-center">
                  <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <p className="text-foreground font-medium">All clear — no pending alerts</p>
                </div>
              )}
              {alerts.map(a => (
                <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className={`glass-card rounded-xl p-5 border ${a.severity === 'critical' ? 'border-red-400/40' : 'border-amber-400/40'}`}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${a.severity === 'critical' ? 'text-red-400' : 'text-amber-400'}`} />
                    <div>
                      <div className="font-medium text-foreground">{a.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{a.message}</div>
                      <div className="text-xs text-accent mt-2 font-medium">Action: {a.actionRequired}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default FinancialCommandCenterPage;
