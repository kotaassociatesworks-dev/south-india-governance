import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar, AlertTriangle, TrendingUp, Building2, Factory, Truck, Wrench,
  ShoppingCart, Bell, CheckCircle2, ArrowRight, Calendar, FileText,
  Scale, Shield, Zap, ExternalLink, Search, Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";

interface RegUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  source: string;
  category: "gst" | "income-tax";
  severity: "high" | "medium" | "low";
  impacts: { business: string; icon: any; summary: string }[];
  actions: string[];
}

const updates: RegUpdate[] = [
  {
    id: "tir-001",
    title: "GST Council Reduces Insurance Premiums – Impact on Service Sector",
    description: "The 54th GST Council meeting recommended reducing GST rates on health and life insurance premiums. This directly impacts insurance brokers, corporate insurance plans, and employee benefit structures.",
    date: "2026-03-05",
    source: "GST Council Press Release",
    category: "gst",
    severity: "high",
    impacts: [
      { business: "Retail", icon: ShoppingCart, summary: "Minimal direct impact. Employee insurance costs may reduce slightly." },
      { business: "Manufacturing", icon: Factory, summary: "Corporate group insurance premiums will decrease, reducing overhead costs by 2-3%." },
      { business: "Logistics", icon: Truck, summary: "Fleet insurance costs remain unchanged. Employee health insurance costs will drop." },
      { business: "Contractors", icon: Wrench, summary: "Lower insurance burden for contract workers covered under group policies." },
    ],
    actions: ["Review current insurance premium GST payments", "Update accounting entries for revised rates", "Recalculate employee benefit costs"],
  },
  {
    id: "tir-002",
    title: "CBIC Circular on ITC Reconciliation – Stricter Matching Rules",
    description: "CBIC has issued Circular No. 237/31/2026-GST mandating stricter reconciliation of ITC claims with GSTR-2B auto-populated data. Mismatches may trigger notices.",
    date: "2026-03-03",
    source: "CBIC Circular No. 237",
    category: "gst",
    severity: "high",
    impacts: [
      { business: "Retail", icon: ShoppingCart, summary: "High impact – multiple vendors mean higher mismatch risk. Must reconcile monthly." },
      { business: "Manufacturing", icon: Factory, summary: "Critical – large ITC claims require meticulous vendor invoice tracking." },
      { business: "Logistics", icon: Truck, summary: "Moderate – fuel and vehicle ITC claims need careful documentation." },
      { business: "Contractors", icon: Wrench, summary: "Moderate – subcontractor invoices must match GSTR-2B exactly." },
    ],
    actions: ["Run ITC reconciliation for current quarter", "Identify and resolve vendor invoice mismatches", "Update internal documentation processes"],
  },
  {
    id: "tir-003",
    title: "E-Invoice Threshold Reduced to ₹5 Crore",
    description: "CBIC has notified mandatory e-invoicing for businesses with aggregate turnover exceeding ₹5 crore from April 1, 2026. Previously the threshold was ₹10 crore.",
    date: "2026-02-25",
    source: "CBIC Notification",
    category: "gst",
    severity: "high",
    impacts: [
      { business: "Retail", icon: ShoppingCart, summary: "Many mid-size retailers now fall under e-invoice mandate. System upgrade required." },
      { business: "Manufacturing", icon: Factory, summary: "Most manufacturers already compliant. New units in ₹5-10Cr range must onboard." },
      { business: "Logistics", icon: Truck, summary: "Transport companies in this turnover bracket must integrate e-invoice systems." },
      { business: "Contractors", icon: Wrench, summary: "Construction and contractor firms crossing ₹5Cr must implement e-invoicing." },
    ],
    actions: ["Check if your turnover crosses ₹5 crore threshold", "Integrate e-invoice generation software", "Train accounts team on e-invoice compliance"],
  },
  {
    id: "tir-004",
    title: "CBDT Extends Tax Audit Report Deadline",
    description: "CBDT has extended the due date for filing Tax Audit Reports under Section 44AB to October 31, 2026 for AY 2026-27, providing additional time for preparation.",
    date: "2026-03-07",
    source: "CBDT Notification No. 25/2026",
    category: "income-tax",
    severity: "low",
    impacts: [
      { business: "Retail", icon: ShoppingCart, summary: "Additional time to prepare audit reports. No immediate action needed." },
      { business: "Manufacturing", icon: Factory, summary: "More time for complex audit documentation. Plan audit schedule accordingly." },
      { business: "Logistics", icon: Truck, summary: "Extended deadline allows better fleet depreciation documentation." },
      { business: "Contractors", icon: Wrench, summary: "Extra time to compile project-wise expense documentation for audit." },
    ],
    actions: ["Update internal compliance calendar", "Inform your CA about revised timeline", "Begin preliminary audit data compilation"],
  },
  {
    id: "tir-005",
    title: "New TDS Rates Effective April 1, 2026",
    description: "CBDT has notified revised TDS rates under sections 194C, 194J, and 194H. Contractors and professionals will see changes in withholding rates.",
    date: "2026-03-04",
    source: "CBDT Circular No. 5/2026",
    category: "income-tax",
    severity: "medium",
    impacts: [
      { business: "Retail", icon: ShoppingCart, summary: "Commission-based structures (194H) will have revised TDS. Update payment systems." },
      { business: "Manufacturing", icon: Factory, summary: "Contractor payments (194C) and technical fees (194J) rates changed. Update ERP." },
      { business: "Logistics", icon: Truck, summary: "Freight contractor TDS (194C) rates revised. Update all vendor payment templates." },
      { business: "Contractors", icon: Wrench, summary: "Directly impacted – both as deductee and deductor. Must update all TDS calculations." },
    ],
    actions: ["Update TDS rate tables in accounting software", "Inform vendors about revised withholding", "Review and update payment templates"],
  },
  {
    id: "tir-006",
    title: "Mandatory Aadhaar-PAN Linking by June 30, 2026",
    description: "CBDT mandates all existing taxpayers link Aadhaar with PAN by June 30, 2026. Non-compliance results in higher TDS deduction and PAN becoming inoperative.",
    date: "2026-02-18",
    source: "CBDT Notification",
    category: "income-tax",
    severity: "medium",
    impacts: [
      { business: "Retail", icon: ShoppingCart, summary: "Ensure all employee PANs are Aadhaar-linked to avoid higher TDS deductions." },
      { business: "Manufacturing", icon: Factory, summary: "Verify vendor and employee PAN-Aadhaar linkage to prevent TDS complications." },
      { business: "Logistics", icon: Truck, summary: "Driver and contractor PAN compliance critical to avoid operational TDS issues." },
      { business: "Contractors", icon: Wrench, summary: "Personal and business PAN must be linked. Non-compliance means 20% TDS instead of normal rate." },
    ],
    actions: ["Verify Aadhaar-PAN linkage for all stakeholders", "Send reminders to vendors and employees", "Complete linking before June 30 deadline"],
  },
];

const severityStyles: Record<string, string> = {
  high: "bg-red-500/10 text-red-400 border-red-500/30",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
};

const TaxIntelligenceRadarPage = () => {
  const [activeTab, setActiveTab] = useState<"all" | "gst" | "income-tax">("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertBizType, setAlertBizType] = useState("");

  const filtered = updates.filter((u) => {
    if (activeTab !== "all" && u.category !== activeTab) return false;
    if (search && !u.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const highAlerts = updates.filter((u) => u.severity === "high").length;

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />

      {/* Hero */}
      <section className="pt-44 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20"><Radar className="w-3 h-3 mr-1" /> AI-Powered Intelligence</Badge>
            <h1 className="text-3xl lg:text-5xl font-heading font-bold mb-3">
              Tax Intelligence <span className="text-accent">Radar</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6">Monitor regulatory changes in real-time. Understand business impact instantly. Act before deadlines hit.</p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/5 border border-red-500/20">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">{highAlerts} High Priority Alerts</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/5 border border-accent/20">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">{updates.length} Active Regulations</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/5 border border-accent/20">
                <Building2 className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">4 Industries Tracked</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-28 container mx-auto px-4">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">All Updates</TabsTrigger>
              <TabsTrigger value="gst" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground gap-1"><Scale className="w-3 h-3" /> GST</TabsTrigger>
              <TabsTrigger value="income-tax" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground gap-1"><FileText className="w-3 h-3" /> Income Tax</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search regulations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 w-64 bg-muted/30" />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-accent/30 text-accent hover:bg-accent/10">
                  <Bell className="w-4 h-4" /> Personalized Alerts
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Setup Personalized Tax Alerts</DialogTitle></DialogHeader>
                <form onSubmit={(e) => { e.preventDefault(); toast.success("Alert preferences saved! You'll receive impact-based notifications."); setAlertEmail(""); }} className="space-y-4 pt-2">
                  <div><Label className="text-xs">Email</Label><Input type="email" value={alertEmail} onChange={(e) => setAlertEmail(e.target.value)} placeholder="your@email.com" required /></div>
                  <div>
                    <Label className="text-xs">Business Type</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {["Retail", "Manufacturing", "Logistics", "Contractors"].map((t) => (
                        <button key={t} type="button" onClick={() => setAlertBizType(t)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${alertBizType === t ? "bg-accent/10 border-accent/40 text-accent" : "bg-muted/20 border-border/30 text-muted-foreground hover:border-accent/20"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Enable Alerts</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Regulation Cards */}
        <div className="space-y-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((update, i) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.05 }}
                layout
              >
                <Card className="premium-card overflow-hidden">
                  {/* Header */}
                  <CardHeader className="pb-3 cursor-pointer" onClick={() => setExpandedId(expandedId === update.id ? null : update.id)}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${severityStyles[update.severity]}`}>
                            {update.severity} impact
                          </Badge>
                          <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-accent/30 text-accent">
                            {update.category === "gst" ? "GST" : "Income Tax"}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(update.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                        <CardTitle className="text-base lg:text-lg font-semibold leading-snug">{update.title}</CardTitle>
                        <CardDescription className="mt-1.5 text-sm">{update.description}</CardDescription>
                        <p className="text-[10px] text-muted-foreground mt-2">Source: {update.source}</p>
                      </div>
                      <motion.div animate={{ rotate: expandedId === update.id ? 90 : 0 }} className="mt-1 shrink-0">
                        <ArrowRight className="w-5 h-5 text-accent" />
                      </motion.div>
                    </div>
                  </CardHeader>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedId === update.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <CardContent className="pt-0 space-y-6">
                          {/* Business Impact Analysis */}
                          <div>
                            <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                              <TrendingUp className="w-4 h-4 text-accent" /> Business Impact Analysis
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3">
                              {update.impacts.map((impact) => (
                                <div key={impact.business} className="p-3 rounded-lg bg-muted/20 border border-border/30">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className="w-7 h-7 rounded-md bg-accent/10 flex items-center justify-center">
                                      <impact.icon className="w-3.5 h-3.5 text-accent" />
                                    </div>
                                    <span className="text-xs font-semibold">{impact.business}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground leading-relaxed">{impact.summary}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Recommended Actions */}
                          <div>
                            <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                              <CheckCircle2 className="w-4 h-4 text-accent" /> Recommended Compliance Actions
                            </h3>
                            <div className="space-y-2">
                              {update.actions.map((action, j) => (
                                <div key={j} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-accent/5 border border-accent/10">
                                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-[10px] font-bold text-accent">{j + 1}</span>
                                  </div>
                                  <span className="text-xs text-foreground/80">{action}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* CTAs */}
                          <div className="flex flex-wrap gap-3 pt-2 border-t border-border/50">
                            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 text-xs"
                              onClick={() => toast.success("Consultation request submitted. Our team will contact you shortly.")}>
                              <Shield className="w-3 h-3" /> Consult Kota Associates
                            </Button>
                            <Button size="sm" variant="outline" className="border-accent/30 text-accent hover:bg-accent/10 gap-2 text-xs"
                              onClick={() => toast.success("Compliance review request submitted.")}>
                              <Zap className="w-3 h-3" /> Request Compliance Review
                            </Button>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No regulations match your search criteria.</p>
          )}
        </div>

        {/* Dashboard Integration Preview */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
          <h2 className="text-xl font-heading font-semibold mb-6 flex items-center gap-2">
            <Radar className="w-5 h-5 text-accent" /> Dashboard Widgets
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            <Card className="premium-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-400" /> Regulatory Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {updates.filter((u) => u.severity === "high").slice(0, 3).map((u) => (
                  <div key={u.id} className="flex items-center justify-between p-2 rounded bg-muted/20 border border-border/30">
                    <span className="text-[11px] font-medium truncate flex-1 mr-2">{u.title.slice(0, 45)}...</span>
                    <Badge variant="outline" className={`text-[9px] shrink-0 ${severityStyles[u.severity]}`}>{u.severity}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><Shield className="w-4 h-4 text-amber-400" /> Compliance Risks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-2 rounded bg-muted/20 border border-border/30">
                  <span className="text-[11px] font-medium">ITC Mismatch Risk</span>
                  <p className="text-[10px] text-muted-foreground">New reconciliation rules may affect your claims</p>
                </div>
                <div className="p-2 rounded bg-muted/20 border border-border/30">
                  <span className="text-[11px] font-medium">E-Invoice Compliance</span>
                  <p className="text-[10px] text-muted-foreground">Threshold change – verify applicability</p>
                </div>
                <div className="p-2 rounded bg-muted/20 border border-border/30">
                  <span className="text-[11px] font-medium">PAN-Aadhaar Linking</span>
                  <p className="text-[10px] text-muted-foreground">Deadline approaching – June 30, 2026</p>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {["Run ITC reconciliation", "Integrate e-invoice system", "Verify Aadhaar-PAN linkage"].map((a) => (
                  <div key={a} className="flex items-center gap-2 p-2 rounded bg-muted/20 border border-border/30">
                    <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                    <span className="text-[11px]">{a}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default TaxIntelligenceRadarPage;
