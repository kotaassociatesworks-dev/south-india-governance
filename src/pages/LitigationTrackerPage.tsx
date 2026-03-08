import { useState } from "react";
import { motion } from "framer-motion";
import { Scale, Plus, ChevronDown, ChevronUp, AlertCircle, Clock, CheckCircle2, FileText, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const statusSteps = ["Notice Received", "Reply Filed", "Hearing Scheduled", "Case Resolved"];

const mockCases = [
  {
    id: "LIT-2025-001",
    title: "GST DRC-01 — Demand Notice",
    type: "GST",
    status: 1,
    date: "2025-01-15",
    amount: "₹2,45,000",
    officer: "Superintendent, CGST Division-II",
    notes: "Reply preparation in progress. ITC reconciliation documents being gathered.",
  },
  {
    id: "LIT-2024-003",
    title: "Income Tax — Scrutiny Assessment",
    type: "Income Tax",
    status: 2,
    date: "2024-08-20",
    amount: "₹5,80,000",
    officer: "ITO Ward 4(1), Hyderabad",
    notes: "Hearing scheduled for March 2025. All documents submitted.",
  },
  {
    id: "LIT-2024-001",
    title: "GST ASMT-10 — Scrutiny Notice",
    type: "GST",
    status: 3,
    date: "2024-03-10",
    amount: "₹78,000",
    officer: "Assistant Commissioner, SGST",
    notes: "Case resolved. No additional demand. Order received.",
  },
];

const statusColors = {
  0: { color: "text-red-500", bg: "bg-red-500/10" },
  1: { color: "text-yellow-500", bg: "bg-yellow-500/10" },
  2: { color: "text-blue-500", bg: "bg-blue-500/10" },
  3: { color: "text-green-500", bg: "bg-green-500/10" },
};

const LitigationTrackerPage = () => {
  const [cases] = useState(mockCases);
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
              <Scale className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">Litigation Tracker</span>
            </div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-3">Tax Litigation Tracker</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Track the status of your tax disputes, notices, and case proceedings.</p>
          </motion.div>

          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Cases", value: cases.length, icon: Scale },
              { label: "Active", value: cases.filter((c) => c.status < 3).length, icon: AlertCircle },
              { label: "In Hearing", value: cases.filter((c) => c.status === 2).length, icon: Clock },
              { label: "Resolved", value: cases.filter((c) => c.status === 3).length, icon: CheckCircle2 },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-background border border-border rounded-lg p-4 text-center">
                  <Icon className="w-5 h-5 text-accent mx-auto mb-1" />
                  <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                </div>
              );
            })}
          </div>

          {/* Cases */}
          <div className="space-y-4">
            {cases.map((c, i) => {
              const isOpen = expanded === c.id;
              const sc = statusColors[c.status];
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-background border border-border rounded-xl overflow-hidden"
                >
                  <button onClick={() => toggle(c.id)} className="w-full flex items-center gap-4 p-5 text-left hover:bg-secondary/30 transition-colors">
                    <div className={`w-10 h-10 rounded-lg ${sc.bg} flex items-center justify-center shrink-0`}>
                      <FileText className={`w-5 h-5 ${sc.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-bold text-foreground">{c.title}</p>
                      <p className="text-sm text-muted-foreground">{c.id} • {c.type} • {c.date}</p>
                    </div>
                    <span className={`text-sm font-semibold ${sc.color}`}>{statusSteps[c.status]}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </button>

                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-5 pb-5 space-y-4">
                      {/* Progress Steps */}
                      <div className="flex items-center gap-0">
                        {statusSteps.map((step, si) => (
                          <div key={step} className="flex items-center">
                            <div className="flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                si <= c.status ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                              }`}>
                                {si <= c.status ? <CheckCircle2 className="w-4 h-4" /> : si + 1}
                              </div>
                              <span className="text-[10px] text-muted-foreground mt-1 text-center max-w-[80px]">{step}</span>
                            </div>
                            {si < statusSteps.length - 1 && (
                              <div className={`w-8 sm:w-16 h-0.5 mx-1 mt-[-1rem] ${si < c.status ? "bg-accent" : "bg-border"}`} />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div><span className="text-muted-foreground">Demand Amount:</span> <span className="font-semibold text-foreground ml-1">{c.amount}</span></div>
                        <div><span className="text-muted-foreground">Officer:</span> <span className="font-semibold text-foreground ml-1">{c.officer}</span></div>
                      </div>
                      <div className="bg-secondary rounded-lg p-3">
                        <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Notes:</span> {c.notes}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-muted-foreground mb-4">This is a frontend demo. Connect to Lovable Cloud for real case tracking.</p>
            <a href="https://wa.me/919052878779?text=I%20need%20help%20tracking%20my%20tax%20litigation%20case" target="_blank" rel="noopener noreferrer">
              <Button><MessageCircle className="w-4 h-4 mr-1" /> Get Litigation Support</Button>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default LitigationTrackerPage;
