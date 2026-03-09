import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, Shield, TrendingUp, Calendar, AlertTriangle, Sparkles,
  ArrowRight, CheckCircle2, Clock, Zap, CreditCard
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";

const obligations = [
  { name: "GSTR-1 Monthly Filing", frequency: "Monthly", next: "Apr 11, 2026", status: "upcoming" },
  { name: "GSTR-3B Monthly Filing", frequency: "Monthly", next: "Apr 20, 2026", status: "upcoming" },
  { name: "TDS Return (Form 26Q)", frequency: "Quarterly", next: "May 31, 2026", status: "upcoming" },
  { name: "Income Tax Return", frequency: "Annual", next: "Jul 31, 2026", status: "upcoming" },
  { name: "GST Annual Return (GSTR-9)", frequency: "Annual", next: "Dec 31, 2026", status: "upcoming" },
  { name: "Tax Audit Report", frequency: "Annual", next: "Oct 31, 2026", status: "upcoming" },
];

const risks = [
  { title: "ITC Mismatch Risk", severity: "medium", desc: "Your GSTR-2B auto-populated data may have discrepancies with claimed ITC." },
  { title: "Late Filing Penalty", severity: "low", desc: "Current filing streak is on time. Maintain timely filings to avoid penalties." },
  { title: "Notice Risk", severity: "low", desc: "No outstanding compliance gaps detected in recent filings." },
];

const recommendations = [
  { service: "GST Reconciliation", reason: "Prevent ITC mismatches", icon: CheckCircle2 },
  { service: "Annual Return Filing", reason: "GSTR-9 due in 9 months", icon: Calendar },
  { service: "Tax Advisory Consultation", reason: "Optimize tax planning", icon: Sparkles },
];

const plans = [
  { name: "Basic Monitoring", price: "₹999/mo", features: ["Compliance timeline", "Deadline alerts", "Basic risk score"] },
  { name: "Compliance Management", price: "₹2,999/mo", features: ["Everything in Basic", "Filing assistance", "Notice handling", "ITC reconciliation"] },
  { name: "Full Advisory", price: "₹7,999/mo", features: ["Everything in Management", "Dedicated advisor", "Tax planning", "Audit support"] },
];

const ComplianceTwinPage = () => {
  const [profileSetup, setProfileSetup] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [gstin, setGstin] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [industry, setIndustry] = useState("");
  const [turnover, setTurnover] = useState("");
  const [state, setState] = useState("");

  const handleSetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !gstin || !businessType) {
      toast.error("Please fill all required fields");
      return;
    }
    setProfileSetup(true);
    toast.success("Business Compliance Twin activated!");
  };

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />

      <section className="pt-44 pb-8">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20"><Zap className="w-3 h-3 mr-1" /> AI-Powered</Badge>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-2">Business Compliance <span className="text-accent">Twin</span></h1>
            <p className="text-muted-foreground">Your digital compliance profile that automatically tracks every tax obligation.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-28 container mx-auto px-4">
        {!profileSetup ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5 text-accent" /> Setup Business Profile</CardTitle>
                <CardDescription>Create your digital compliance twin to auto-track all obligations</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSetup} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><Label className="text-xs">Business Name *</Label><Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} required /></div>
                    <div><Label className="text-xs">GSTIN *</Label><Input value={gstin} onChange={(e) => setGstin(e.target.value)} placeholder="22AAAAA0000A1Z5" required /></div>
                    <div>
                      <Label className="text-xs">Business Type *</Label>
                      <Select value={businessType} onValueChange={setBusinessType}>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="proprietorship">Proprietorship</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="llp">LLP</SelectItem>
                          <SelectItem value="pvt-ltd">Private Limited</SelectItem>
                          <SelectItem value="public-ltd">Public Limited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Industry</Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="trading">Trading</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="it">IT & Software</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="real-estate">Real Estate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div><Label className="text-xs">Annual Turnover (₹)</Label><Input type="number" value={turnover} onChange={(e) => setTurnover(e.target.value)} placeholder="e.g. 50000000" /></div>
                    <div><Label className="text-xs">State of Operation</Label><Input value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g. Maharashtra" /></div>
                  </div>
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                    <Sparkles className="w-4 h-4" /> Activate Compliance Twin
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* Compliance Obligations */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-accent" /> Tax Obligations</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {obligations.map((o, i) => (
                  <motion.div key={o.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card className="premium-card">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-sm font-medium">{o.name}</h3>
                          <Badge variant="outline" className="text-[10px] border-accent/30 text-accent">{o.frequency}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Next: {o.next}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Risk Alerts */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-accent" /> Risk Alerts</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {risks.map((r) => (
                  <Card key={r.title} className="premium-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={`text-[10px] ${r.severity === "medium" ? "border-amber-500/30 text-amber-400" : "border-emerald-500/30 text-emerald-400"}`}>
                          {r.severity}
                        </Badge>
                      </div>
                      <h3 className="text-sm font-medium mb-1">{r.title}</h3>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Service Recommendations */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-accent" /> Recommended Services</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {recommendations.map((r) => (
                  <Card key={r.service} className="premium-card group hover:border-accent/30 cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <r.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium group-hover:text-accent transition-colors">{r.service}</h3>
                        <p className="text-[10px] text-muted-foreground">{r.reason}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Subscription Plans */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-accent" /> Monitoring Plans</h2>
              <div className="grid md:grid-cols-3 gap-5">
                {plans.map((p, i) => (
                  <Card key={p.name} className={`premium-card ${i === 1 ? "border-accent/40 relative" : ""}`}>
                    {i === 1 && <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px]">Popular</Badge>}
                    <CardContent className="p-5">
                      <h3 className="text-base font-semibold mb-1">{p.name}</h3>
                      <p className="text-2xl font-bold text-accent mb-4">{p.price}</p>
                      <ul className="space-y-2 mb-5">
                        {p.features.map((f) => (
                          <li key={f} className="text-xs text-muted-foreground flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-accent shrink-0" /> {f}
                          </li>
                        ))}
                      </ul>
                      <Button variant={i === 1 ? "default" : "outline"} size="sm" className={`w-full text-xs ${i === 1 ? "bg-accent text-accent-foreground" : "border-accent/30 text-accent"}`}
                        onClick={() => toast.success(`Selected ${p.name} plan`)}>
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default ComplianceTwinPage;
