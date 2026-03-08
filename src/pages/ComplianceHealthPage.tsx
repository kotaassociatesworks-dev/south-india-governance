import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, AlertTriangle, TrendingUp, FileText, Clock, CheckCircle2, XCircle, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const ComplianceHealthPage = () => {
  const [started, setStarted] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    gstNumber: "",
    filingFrequency: "monthly",
    missedFilings: "0",
    pendingNotices: "0",
    itcMismatch: "no",
    lastAudit: "within-year",
    penaltiesPaid: "0",
  });

  const calculateScore = () => {
    let score = 100;
    const missed = parseInt(form.missedFilings);
    const notices = parseInt(form.pendingNotices);
    const penalties = parseInt(form.penaltiesPaid);

    if (missed >= 1) score -= missed * 8;
    if (missed >= 6) score -= 15;
    if (notices >= 1) score -= notices * 10;
    if (form.itcMismatch === "yes") score -= 15;
    if (form.itcMismatch === "major") score -= 25;
    if (form.lastAudit === "never") score -= 20;
    if (form.lastAudit === "over-2-years") score -= 10;
    if (penalties > 0) score -= Math.min(penalties, 3) * 5;

    return Math.max(0, Math.min(100, score));
  };

  const score = calculateScore();
  const getGrade = (s: number) => {
    if (s >= 80) return { grade: "A", label: "Excellent", color: "text-green-500", bg: "bg-green-500" };
    if (s >= 60) return { grade: "B", label: "Good", color: "text-blue-500", bg: "bg-blue-500" };
    if (s >= 40) return { grade: "C", label: "Needs Attention", color: "text-yellow-500", bg: "bg-yellow-500" };
    return { grade: "D", label: "Critical", color: "text-red-500", bg: "bg-red-500" };
  };
  const grade = getGrade(score);

  const metrics = [
    { label: "Filing History", value: parseInt(form.missedFilings) === 0 ? 95 : Math.max(20, 95 - parseInt(form.missedFilings) * 12), icon: FileText, status: parseInt(form.missedFilings) === 0 ? "good" : "warning" },
    { label: "Penalty Risk", value: parseInt(form.pendingNotices) > 2 ? 80 : parseInt(form.pendingNotices) * 25, icon: AlertTriangle, status: parseInt(form.pendingNotices) === 0 ? "good" : "danger" },
    { label: "Tax Liability Est.", value: form.itcMismatch === "no" ? 15 : form.itcMismatch === "yes" ? 45 : 70, icon: TrendingUp, status: form.itcMismatch === "no" ? "good" : "warning" },
    { label: "Compliance Score", value: score, icon: ShieldCheck, status: score >= 70 ? "good" : score >= 40 ? "warning" : "danger" },
  ];

  const statusColors = { good: "text-green-500", warning: "text-yellow-500", danger: "text-red-500" };

  if (!started) {
    return (
      <main className="min-h-screen bg-secondary">
        <Navbar />
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
                <BarChart3 className="w-4 h-4 text-accent" />
                <span className="text-accent text-xs font-semibold tracking-widest uppercase">Health Dashboard</span>
              </div>
              <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-3">Compliance Health Dashboard</h1>
              <p className="text-muted-foreground max-w-xl mx-auto">Get a comprehensive view of your business compliance health with actionable metrics.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-background border border-border rounded-xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Business Name</label>
                  <Input value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} placeholder="Your business name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">GST Number (optional)</label>
                  <Input value={form.gstNumber} onChange={(e) => setForm({ ...form, gstNumber: e.target.value })} placeholder="e.g., 36XXXXX1234X1ZX" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Missed GST Filings (last 12 months)</label>
                  <select value={form.missedFilings} onChange={(e) => setForm({ ...form, missedFilings: e.target.value })} className="h-10 w-full px-3 rounded-md border border-input bg-background text-sm">
                    <option value="0">None</option>
                    <option value="1">1 filing</option>
                    <option value="2">2-3 filings</option>
                    <option value="4">4-6 filings</option>
                    <option value="8">More than 6</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Pending Tax Notices</label>
                  <select value={form.pendingNotices} onChange={(e) => setForm({ ...form, pendingNotices: e.target.value })} className="h-10 w-full px-3 rounded-md border border-input bg-background text-sm">
                    <option value="0">None</option>
                    <option value="1">1 notice</option>
                    <option value="2">2-3 notices</option>
                    <option value="4">4 or more</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">ITC Mismatches</label>
                  <select value={form.itcMismatch} onChange={(e) => setForm({ ...form, itcMismatch: e.target.value })} className="h-10 w-full px-3 rounded-md border border-input bg-background text-sm">
                    <option value="no">No mismatches</option>
                    <option value="yes">Minor mismatches</option>
                    <option value="major">Major mismatches</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Last Compliance Audit</label>
                  <select value={form.lastAudit} onChange={(e) => setForm({ ...form, lastAudit: e.target.value })} className="h-10 w-full px-3 rounded-md border border-input bg-background text-sm">
                    <option value="within-year">Within last year</option>
                    <option value="1-2-years">1-2 years ago</option>
                    <option value="over-2-years">Over 2 years ago</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>

              <Button className="w-full" onClick={() => setStarted(true)} disabled={!form.businessName.trim()}>
                Generate Compliance Report
              </Button>
            </motion.div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Compliance Health Report
            </h1>
            <p className="text-muted-foreground">{form.businessName} {form.gstNumber && `• ${form.gstNumber}`}</p>
          </motion.div>

          {/* Score Card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-background border border-border rounded-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={`${score * 3.27} 327`} className={grade.color} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`font-heading text-4xl font-bold ${grade.color}`}>{grade.grade}</span>
                  <span className="text-sm text-muted-foreground">{score}/100</span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className={`font-heading text-2xl font-bold ${grade.color} mb-1`}>{grade.label}</h2>
                <p className="text-muted-foreground mb-4">
                  {score >= 80 && "Your compliance health is strong. Maintain your current practices."}
                  {score >= 60 && score < 80 && "Good standing with minor areas for improvement."}
                  {score >= 40 && score < 60 && "Several compliance areas need attention to avoid penalties."}
                  {score < 40 && "Critical compliance gaps detected. Immediate professional review recommended."}
                </p>
                <Button variant="outline" size="sm" onClick={() => setStarted(false)}>Recalculate</Button>
              </div>
            </div>
          </motion.div>

          {/* Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-background border border-border rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`w-5 h-5 ${statusColors[m.status]}`} />
                    <span className="text-sm font-medium text-foreground">{m.label}</span>
                  </div>
                  <Progress value={m.value} className="h-2 mb-2" />
                  <p className={`text-sm font-semibold ${statusColors[m.status]}`}>
                    {m.status === "good" ? "Healthy" : m.status === "warning" ? "Needs Attention" : "At Risk"}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Action Items */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-background border border-border rounded-xl p-8 mb-8">
            <h3 className="font-heading text-xl font-bold text-foreground mb-4">Recommended Actions</h3>
            <ul className="space-y-3">
              {parseInt(form.missedFilings) > 0 && (
                <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /><span className="text-foreground">File all pending GST returns immediately to avoid further late fees</span></li>
              )}
              {parseInt(form.pendingNotices) > 0 && (
                <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" /><span className="text-foreground">Address pending tax notices — delays can result in ex-parte orders</span></li>
              )}
              {form.itcMismatch !== "no" && (
                <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" /><span className="text-foreground">Reconcile ITC claims with GSTR-2A/2B to prevent demand notices</span></li>
              )}
              {form.lastAudit === "never" || form.lastAudit === "over-2-years" ? (
                <li className="flex items-start gap-3"><Clock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /><span className="text-foreground">Schedule a comprehensive compliance audit to identify hidden risks</span></li>
              ) : null}
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><span className="text-foreground">Set up compliance reminders for upcoming filing deadlines</span></li>
            </ul>
          </motion.div>

          {/* CTA */}
          <div className="text-center">
            <a href="https://wa.me/919052878779?text=I%20ran%20a%20Compliance%20Health%20check.%20I%20need%20professional%20help." target="_blank" rel="noopener noreferrer">
              <Button size="lg"><MessageCircle className="w-5 h-5 mr-2" /> Get Professional Compliance Support</Button>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ComplianceHealthPage;
