import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2, Clock, AlertTriangle, Shield, TrendingUp, FileText,
  Upload, Bell, Calculator, BarChart3, Calendar, FolderLock, ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";

const filingStatus = [
  { name: "GSTR-3B (Feb 2026)", status: "filed", date: "Mar 20, 2026" },
  { name: "GSTR-1 (Feb 2026)", status: "filed", date: "Mar 11, 2026" },
  { name: "GSTR-3B (Mar 2026)", status: "pending", date: "Apr 20, 2026" },
  { name: "TDS Return Q4", status: "pending", date: "May 31, 2026" },
  { name: "Income Tax Return", status: "overdue", date: "Jul 31, 2025" },
];

const deadlines = [
  { task: "GSTR-3B Filing (Mar 2026)", date: "Apr 20, 2026", daysLeft: 42 },
  { task: "GSTR-1 Filing (Mar 2026)", date: "Apr 11, 2026", daysLeft: 33 },
  { task: "TDS Return Q4 FY 2025-26", date: "May 31, 2026", daysLeft: 83 },
  { task: "Income Tax Return AY 2026-27", date: "Jul 31, 2026", daysLeft: 144 },
];

const notices = [
  { title: "GST Mismatch Notice", status: "Reply Prepared", section: "Section 61" },
  { title: "TDS Default Notice", status: "Awaiting Response", section: "Section 234E" },
  { title: "IT Scrutiny Assessment", status: "Notice Received", section: "Section 143(2)" },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    filed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    overdue: "bg-red-500/10 text-red-400 border-red-500/30",
  };
  return <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${styles[status]}`}>{status}</Badge>;
};

const ComplianceDashboardPage = () => {
  const [sales, setSales] = useState("");
  const [purchases, setPurchases] = useState("");
  const riskScore = 35;

  const gstPayable = sales && purchases ? Math.max(0, (Number(sales) - Number(purchases)) * 0.18) : 0;
  const itc = purchases ? Number(purchases) * 0.18 : 0;

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />

      <section className="pt-44 pb-8">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20"><Shield className="w-3 h-3 mr-1" /> Command Center</Badge>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-2">Tax Compliance <span className="text-accent">Command Center</span></h1>
            <p className="text-muted-foreground">Monitor your complete compliance status, deadlines, and risks in one place.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-28 container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-5 mb-8">
          {/* Risk Meter */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="premium-card h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="w-4 h-4 text-accent" /> Compliance Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative flex items-center justify-center mb-4">
                  <svg viewBox="0 0 120 60" className="w-40">
                    <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" strokeLinecap="round" />
                    <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke="url(#risk-gradient)" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${riskScore * 1.57} 157`} />
                    <defs>
                      <linearGradient id="risk-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(142, 76%, 36%)" />
                        <stop offset="50%" stopColor="hsl(46, 70%, 47%)" />
                        <stop offset="100%" stopColor="hsl(0, 84%, 60%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute bottom-0 text-2xl font-bold text-accent">{riskScore}%</span>
                </div>
                <div className="text-center">
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">Low Risk</Badge>
                  <p className="text-xs text-muted-foreground mt-2">Based on filing history and pending obligations</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filing Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="premium-card h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Filing Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {filingStatus.map((f) => (
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
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
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mb-8">
          {/* Tax Liability Estimator */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card className="premium-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2"><Calculator className="w-4 h-4 text-accent" /> Tax Liability Estimator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label className="text-xs">Sales Turnover (₹)</Label><Input type="number" value={sales} onChange={(e) => setSales(e.target.value)} placeholder="Enter amount" /></div>
                  <div><Label className="text-xs">Purchases (₹)</Label><Input type="number" value={purchases} onChange={(e) => setPurchases(e.target.value)} placeholder="Enter amount" /></div>
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
          </motion.div>

          {/* Notice Tracker */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="premium-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-accent" /> Notice Tracker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notices.map((n) => (
                  <div key={n.title} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                    <div>
                      <p className="text-xs font-medium">{n.title}</p>
                      <p className="text-[10px] text-muted-foreground">{n.section}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{n.status}</Badge>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full text-xs gap-1 border-accent/20 text-accent">
                  <Upload className="w-3 h-3" /> Upload New Notice
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Document Vault */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <Card className="premium-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2"><FolderLock className="w-4 h-4 text-accent" /> Document Vault</CardTitle>
                <CardDescription className="text-xs">Securely store GST returns, tax notices, financial statements & agreements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {["GST Returns", "Tax Notices", "Financial Statements", "Agreements"].map((doc) => (
                    <div key={doc} className="flex items-center gap-2 p-3 rounded-lg bg-muted/20 border border-border/30">
                      <FileText className="w-4 h-4 text-accent/60" />
                      <span className="text-xs">{doc}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs gap-1 border-accent/20 text-accent">
                  <Upload className="w-3 h-3" /> Upload Document
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Compliance Alerts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="premium-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2"><Bell className="w-4 h-4 text-accent" /> Compliance Alerts</CardTitle>
                <CardDescription className="text-xs">Subscribe to GST, Income Tax & regulatory change alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {["GST Filing Deadlines", "Income Tax Deadlines", "New Tax Rule Changes"].map((alert) => (
                  <div key={alert} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                    <span className="text-xs">{alert}</span>
                    <Button size="sm" variant="ghost" className="h-7 text-[10px] text-accent" onClick={() => toast.success(`Subscribed to ${alert}`)}>
                      Enable
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ComplianceDashboardPage;
