import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, CheckCircle2, Clock, AlertTriangle, TrendingUp, FileText,
  Upload, Bell, Calculator, BarChart3, Calendar, FolderLock, ArrowRight,
  Zap, Target, Activity, Briefcase, ChevronDown, ChevronUp, Star,
  LayoutDashboard, Settings, BookOpen, Rocket, Users, PieChart, Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";

// --- Data ---

const filingData = [
  { name: "GSTR-3B (Feb 2026)", status: "filed", date: "Mar 20, 2026", type: "GST" },
  { name: "GSTR-1 (Feb 2026)", status: "filed", date: "Mar 11, 2026", type: "GST" },
  { name: "GSTR-3B (Mar 2026)", status: "pending", date: "Apr 20, 2026", type: "GST" },
  { name: "TDS Return Q4", status: "pending", date: "May 31, 2026", type: "TDS" },
  { name: "Income Tax Return AY 2026-27", status: "overdue", date: "Jul 31, 2025", type: "IT" },
];

const deadlines = [
  { task: "GSTR-3B Filing (Mar 2026)", date: "Apr 20, 2026", daysLeft: 42, type: "GST" },
  { task: "GSTR-1 Filing (Mar 2026)", date: "Apr 11, 2026", daysLeft: 33, type: "GST" },
  { task: "TDS Return Q4 FY 2025-26", date: "May 31, 2026", daysLeft: 83, type: "TDS" },
  { task: "Income Tax Return AY 2026-27", date: "Jul 31, 2026", daysLeft: 144, type: "IT" },
];

const notices = [
  { title: "GST Mismatch Notice", status: "Reply Prepared", section: "Section 61", severity: "medium" },
  { title: "TDS Default Notice", status: "Awaiting Response", section: "Section 234E", severity: "high" },
  { title: "IT Scrutiny Assessment", status: "Notice Received", section: "Section 143(2)", severity: "high" },
];

const workflows = [
  {
    name: "GST Registration",
    steps: ["Business Details", "Document Upload", "Verification", "ARN Generated", "GSTIN Issued"],
    currentStep: 3,
    status: "in-progress",
  },
  {
    name: "GSTR-3B Filing (Mar 2026)",
    steps: ["Data Collection", "ITC Reconciliation", "Tax Computation", "Review & Submit", "Filed"],
    currentStep: 1,
    status: "not-started",
  },
  {
    name: "Notice Response – Section 61",
    steps: ["Notice Review", "Data Gathering", "Reply Drafting", "Expert Review", "Submission"],
    currentStep: 4,
    status: "in-progress",
  },
];

const documentCategories = [
  { name: "GST Returns", count: 24, icon: FileText },
  { name: "Financial Statements", count: 8, icon: BarChart3 },
  { name: "Tax Notices", count: 5, icon: AlertTriangle },
  { name: "Legal Documents", count: 12, icon: FolderLock },
];

const advisoryRecommendations = [
  {
    title: "GST Reconciliation Required",
    description: "GSTR-2A vs GSTR-3B mismatch detected for Q3. Reconciliation can recover ₹45,000 in ITC.",
    priority: "high",
    service: "GST Reconciliation",
  },
  {
    title: "Tax Planning Opportunity",
    description: "Based on your projected income, Section 80C investments can save up to ₹46,800 in taxes.",
    priority: "medium",
    service: "Tax Planning",
  },
  {
    title: "Audit Preparation Advisory",
    description: "Your turnover has crossed ₹5 Cr. Tax audit under Section 44AB is mandatory.",
    priority: "high",
    service: "Audit Preparation",
  },
  {
    title: "E-Invoicing Compliance",
    description: "Turnover exceeding ₹5 Cr requires e-invoicing. Ensure your billing system is compliant.",
    priority: "medium",
    service: "E-Invoicing Setup",
  },
];

const growthAdvisory = [
  {
    threshold: "Turnover crossed ₹20 Lakhs",
    advice: "GST registration is now mandatory. Begin the registration process immediately.",
    action: "Start GST Registration",
  },
  {
    threshold: "Turnover crossed ₹1 Crore",
    advice: "Tax audit under Section 44AB is applicable. Prepare books of accounts for audit.",
    action: "Schedule Audit Consultation",
  },
  {
    threshold: "Turnover crossed ₹5 Crore",
    advice: "E-invoicing is now mandatory. Quarterly GST filing shifts to monthly filing.",
    action: "Review Compliance Obligations",
  },
  {
    threshold: "Employee count exceeded 20",
    advice: "PF & ESI registration may be required. Review labor law compliance.",
    action: "Consult HR Compliance Expert",
  },
];

// --- Sub-Components ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    filed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    overdue: "bg-red-500/10 text-red-400 border-red-500/30",
    "in-progress": "bg-blue-500/10 text-blue-400 border-blue-500/30",
    "not-started": "bg-muted text-muted-foreground border-border",
  };
  return (
    <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${styles[status] || ""}`}>
      {status}
    </Badge>
  );
};

const HealthIndicator = ({ score }: { score: number }) => {
  const level = score >= 80 ? "Excellent" : score >= 50 ? "Moderate Risk" : "High Risk";
  const color = score >= 80 ? "text-emerald-400" : score >= 50 ? "text-amber-400" : "text-red-400";
  const bg = score >= 80 ? "bg-emerald-500/10" : score >= 50 ? "bg-amber-500/10" : "bg-red-500/10";
  const border = score >= 80 ? "border-emerald-500/30" : score >= 50 ? "border-amber-500/30" : "border-red-500/30";
  return (
    <div className="text-center space-y-3">
      <div className="relative mx-auto w-32 h-32">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
          <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor"
            className={color} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={`${score * 3.14} 314`} />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-3xl font-bold ${color}`}>
          {score}
        </span>
      </div>
      <Badge className={`${bg} ${color} ${border}`}>{level}</Badge>
      <p className="text-xs text-muted-foreground">Based on filing history, notice status & pending obligations</p>
    </div>
  );
};

const WorkflowCard = ({ workflow }: { workflow: typeof workflows[0] }) => {
  const [expanded, setExpanded] = useState(false);
  const progress = Math.round((workflow.currentStep / workflow.steps.length) * 100);
  return (
    <Card className="premium-card">
      <CardContent className="pt-5 pb-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold">{workflow.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={workflow.status} />
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </Button>
          </div>
        </div>
        <Progress value={progress} className="h-1.5" />
        <p className="text-[10px] text-muted-foreground">Step {workflow.currentStep} of {workflow.steps.length} — {progress}% complete</p>
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="flex items-center gap-1 pt-2 flex-wrap">
                {workflow.steps.map((step, i) => {
                  const done = i < workflow.currentStep;
                  const active = i === workflow.currentStep;
                  return (
                    <div key={i} className="flex items-center gap-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold border ${
                        done ? "bg-accent border-accent text-accent-foreground" :
                        active ? "border-primary bg-primary/20 text-primary" :
                        "border-border text-muted-foreground"
                      }`}>
                        {done ? <CheckCircle2 className="w-3 h-3" /> : i + 1}
                      </div>
                      <span className={`text-[9px] ${done ? "text-accent" : active ? "text-foreground" : "text-muted-foreground"}`}>{step}</span>
                      {i < workflow.steps.length - 1 && <div className={`w-4 h-px ${done ? "bg-accent" : "bg-border"}`} />}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

// --- Main Page ---

const TaxOperatingSystemPage = () => {
  const [sales, setSales] = useState("");
  const [purchases, setPurchases] = useState("");
  const [activeTab, setActiveTab] = useState("hub");
  const complianceScore = 72;

  const gstPayable = sales && purchases ? Math.max(0, (Number(sales) - Number(purchases)) * 0.18) : 0;
  const itc = purchases ? Number(purchases) * 0.18 : 0;

  const filedCount = filingData.filter(f => f.status === "filed").length;
  const pendingCount = filingData.filter(f => f.status === "pending").length;
  const overdueCount = filingData.filter(f => f.status === "overdue").length;

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />

      {/* Hero */}
      <section className="pt-44 pb-6">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Zap className="w-3 h-3 mr-1" /> Tax Operating System
            </Badge>
            <h1 className="text-3xl lg:text-5xl font-heading font-bold mb-3">
              Your Complete <span className="text-accent">Tax Operating System</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Manage compliance, receive advisory insights, monitor deadlines, and stay ahead of regulatory obligations — all from one centralized platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Filed", value: filedCount, icon: CheckCircle2, color: "text-emerald-400" },
              { label: "Pending", value: pendingCount, icon: Clock, color: "text-amber-400" },
              { label: "Overdue", value: overdueCount, icon: AlertTriangle, color: "text-red-400" },
              { label: "Health Score", value: `${complianceScore}%`, icon: Activity, color: "text-accent" },
            ].map((stat) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="premium-card">
                  <CardContent className="pt-5 pb-4 flex items-center gap-3">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Tabs */}
      <section className="pb-28">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/30 p-1">
              {[
                { value: "hub", label: "Compliance Hub", icon: LayoutDashboard },
                { value: "workflows", label: "Workflows", icon: Settings },
                { value: "financial", label: "Financial Snapshot", icon: PieChart },
                { value: "documents", label: "Document Vault", icon: FolderLock },
                { value: "health", label: "Health Monitor", icon: Activity },
                { value: "advisory", label: "Advisory Engine", icon: Target },
                { value: "growth", label: "Growth Advisor", icon: Rocket },
              ].map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="text-xs gap-1.5 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  <tab.icon className="w-3 h-3" /> {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* ===== COMPLIANCE HUB ===== */}
            <TabsContent value="hub" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-5">
                {/* Filing Status */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="premium-card h-full">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Filing Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {filingData.map((f) => (
                        <div key={f.name} className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium">{f.name}</p>
                            <p className="text-[10px] text-muted-foreground">{f.date}</p>
                          </div>
                          <StatusBadge status={f.status} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Upcoming Deadlines */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                  <Card className="premium-card h-full">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> Upcoming Deadlines</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {deadlines.map((d) => (
                        <div key={d.task} className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <p className="text-xs font-medium">{d.task}</p>
                            <span className="text-[10px] text-accent">{d.daysLeft}d left</span>
                          </div>
                          <Progress value={Math.max(5, 100 - d.daysLeft)} className="h-1.5" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Notice Tracker */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Card className="premium-card h-full">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-accent" /> Tax Notices</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {notices.map((n) => (
                        <div key={n.title} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                          <div>
                            <p className="text-xs font-medium">{n.title}</p>
                            <p className="text-[10px] text-muted-foreground">{n.section}</p>
                          </div>
                          <Badge variant="outline" className={`text-[10px] ${
                            n.severity === "high" ? "text-red-400 border-red-500/30" : "text-amber-400 border-amber-500/30"
                          }`}>{n.status}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Compliance Alerts */}
              <Card className="premium-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2"><Bell className="w-4 h-4 text-accent" /> Automated Reminders</CardTitle>
                  <CardDescription className="text-xs">Enable compliance alerts to never miss a deadline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: "GST Filing Deadlines", desc: "GSTR-1, GSTR-3B, annual returns" },
                      { label: "TDS Filing Deadlines", desc: "Quarterly TDS return reminders" },
                      { label: "Income Tax Deadlines", desc: "ITR, advance tax, TDS certificates" },
                    ].map((alert) => (
                      <div key={alert.label} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/30">
                        <div>
                          <p className="text-xs font-semibold">{alert.label}</p>
                          <p className="text-[10px] text-muted-foreground">{alert.desc}</p>
                        </div>
                        <Switch onCheckedChange={(checked) => {
                          toast.success(checked ? `Enabled: ${alert.label}` : `Disabled: ${alert.label}`);
                        }} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ===== WORKFLOWS ===== */}
            <TabsContent value="workflows" className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-lg font-bold">Compliance Workflows</h2>
                  <p className="text-xs text-muted-foreground">Track step-by-step progress for each compliance activity</p>
                </div>
              </div>
              {workflows.map((wf) => (
                <WorkflowCard key={wf.name} workflow={wf} />
              ))}
            </TabsContent>

            {/* ===== FINANCIAL SNAPSHOT ===== */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-5">
                {/* Tax Liability Estimator */}
                <Card className="premium-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2"><Calculator className="w-4 h-4 text-accent" /> Tax Liability Estimator</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Sales Turnover (₹)</Label>
                        <Input type="number" value={sales} onChange={(e) => setSales(e.target.value)} placeholder="Enter amount" />
                      </div>
                      <div>
                        <Label className="text-xs">Purchases (₹)</Label>
                        <Input type="number" value={purchases} onChange={(e) => setPurchases(e.target.value)} placeholder="Enter amount" />
                      </div>
                    </div>
                    {(sales || purchases) && (
                      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/50">
                        <div className="text-center p-3 rounded-lg bg-accent/5">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">GST Payable</p>
                          <p className="text-lg font-bold text-accent">₹{gstPayable.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-accent/5">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Input Tax Credit</p>
                          <p className="text-lg font-bold text-emerald-400">₹{itc.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Monthly Turnover Trends */}
                <Card className="premium-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4 text-accent" /> Monthly Turnover Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { month: "Jan 2026", turnover: 1250000, growth: 8 },
                        { month: "Feb 2026", turnover: 1380000, growth: 10 },
                        { month: "Mar 2026", turnover: 1420000, growth: 3 },
                      ].map((m) => (
                        <div key={m.month} className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <p className="text-xs font-medium">{m.month}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold">₹{(m.turnover / 100000).toFixed(1)}L</span>
                              <Badge className="text-[9px] bg-emerald-500/10 text-emerald-400 border-emerald-500/30">+{m.growth}%</Badge>
                            </div>
                          </div>
                          <Progress value={m.turnover / 20000} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-border/50">
                      <div className="text-center p-3 rounded-lg bg-muted/20">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg. Monthly</p>
                        <p className="text-base font-bold">₹13.5L</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/20">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Projected Annual</p>
                        <p className="text-base font-bold">₹1.62 Cr</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ===== DOCUMENT VAULT ===== */}
            <TabsContent value="documents" className="space-y-6">
              <Card className="premium-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2"><FolderLock className="w-4 h-4 text-accent" /> Document Intelligence Vault</CardTitle>
                  <CardDescription className="text-xs">Securely upload, organize, and access all tax & compliance documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                    {documentCategories.map((cat) => (
                      <div key={cat.name} className="flex items-center gap-3 p-4 rounded-lg bg-muted/20 border border-border/30 hover:border-accent/30 transition-colors cursor-pointer">
                        <cat.icon className="w-8 h-8 text-accent/60" />
                        <div>
                          <p className="text-sm font-semibold">{cat.name}</p>
                          <p className="text-[10px] text-muted-foreground">{cat.count} documents</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5 border-accent/20 text-accent hover:bg-accent/5">
                    <Upload className="w-3 h-3" /> Upload New Document
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ===== HEALTH MONITOR ===== */}
            <TabsContent value="health" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-5">
                <Card className="premium-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2"><Activity className="w-4 h-4 text-accent" /> Compliance Health Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <HealthIndicator score={complianceScore} />
                  </CardContent>
                </Card>

                <Card className="premium-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2"><Eye className="w-4 h-4 text-accent" /> Health Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: "GST Filing Compliance", score: 90, status: "Excellent" },
                      { label: "TDS Filing Compliance", score: 65, status: "Moderate Risk" },
                      { label: "Notice Response Time", score: 50, status: "Needs Attention" },
                      { label: "Document Organization", score: 85, status: "Good" },
                    ].map((item) => (
                      <div key={item.label} className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-medium">{item.label}</p>
                          <span className={`text-[10px] font-semibold ${
                            item.score >= 80 ? "text-emerald-400" : item.score >= 50 ? "text-amber-400" : "text-red-400"
                          }`}>{item.score}% — {item.status}</span>
                        </div>
                        <Progress value={item.score} className="h-1.5" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ===== ADVISORY ENGINE ===== */}
            <TabsContent value="advisory" className="space-y-6">
              <div className="space-y-4">
                <div className="mb-2">
                  <h2 className="text-lg font-bold">Advisory Recommendations</h2>
                  <p className="text-xs text-muted-foreground">AI-powered suggestions based on your compliance data and business profile</p>
                </div>
                {advisoryRecommendations.map((rec) => (
                  <motion.div key={rec.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <Card className="premium-card">
                      <CardContent className="pt-5 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Target className="w-4 h-4 text-accent" />
                              <span className="text-sm font-semibold">{rec.title}</span>
                              <Badge variant="outline" className={`text-[9px] ${
                                rec.priority === "high" ? "text-red-400 border-red-500/30" : "text-amber-400 border-amber-500/30"
                              }`}>{rec.priority}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{rec.description}</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Button size="sm" className="text-xs gap-1 bg-accent hover:bg-accent/90">
                              <ArrowRight className="w-3 h-3" /> {rec.service}
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs border-accent/20 text-accent">
                              Consult Expert
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* ===== GROWTH ADVISOR ===== */}
            <TabsContent value="growth" className="space-y-6">
              <div className="mb-2">
                <h2 className="text-lg font-bold flex items-center gap-2"><Rocket className="w-5 h-5 text-accent" /> Business Growth Advisor</h2>
                <p className="text-xs text-muted-foreground">Advisory triggers when your business reaches compliance-critical thresholds</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {growthAdvisory.map((ga, i) => (
                  <motion.div key={ga.threshold} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card className="premium-card h-full">
                      <CardContent className="pt-5 pb-4 space-y-3">
                        <Badge className="bg-accent/10 text-accent border-accent/20 text-[10px]">
                          <TrendingUp className="w-3 h-3 mr-1" /> {ga.threshold}
                        </Badge>
                        <p className="text-xs text-muted-foreground leading-relaxed">{ga.advice}</p>
                        <div className="flex gap-2">
                          <Button size="sm" className="text-xs gap-1 bg-accent hover:bg-accent/90">
                            <ArrowRight className="w-3 h-3" /> {ga.action}
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs border-accent/20 text-accent">
                            Consult Kota Associates
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TaxOperatingSystemPage;
