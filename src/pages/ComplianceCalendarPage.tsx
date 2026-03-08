import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Bell, BellOff, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const deadlines = [
  { id: 1, title: "GSTR-1 Filing", due: "11th of every month", category: "GST", urgency: "recurring", desc: "Outward supply details for the previous month." },
  { id: 2, title: "GSTR-3B Filing", due: "20th of every month", category: "GST", urgency: "recurring", desc: "Summary return with tax payment for the previous month." },
  { id: 3, title: "TDS Return (Form 26Q)", due: "31st July, Oct, Jan, May", category: "TDS", urgency: "quarterly", desc: "Quarterly TDS return for non-salary deductions." },
  { id: 4, title: "TCS Return (Form 27EQ)", due: "15th July, Oct, Jan, May", category: "TCS", urgency: "quarterly", desc: "Quarterly TCS return filing." },
  { id: 5, title: "Income Tax Return (Individual)", due: "31st July", category: "Income Tax", urgency: "annual", desc: "Annual income tax return for individuals (non-audit)." },
  { id: 6, title: "Income Tax Return (Audit)", due: "31st October", category: "Income Tax", urgency: "annual", desc: "Annual return for businesses requiring tax audit." },
  { id: 7, title: "GST Annual Return (GSTR-9)", due: "31st December", category: "GST", urgency: "annual", desc: "Annual consolidated GST return." },
  { id: 8, title: "Tax Audit Report", due: "30th September", category: "Income Tax", urgency: "annual", desc: "Tax audit report u/s 44AB for applicable businesses." },
  { id: 9, title: "Advance Tax (Q1)", due: "15th June", category: "Income Tax", urgency: "quarterly", desc: "First installment — 15% of estimated tax." },
  { id: 10, title: "Advance Tax (Q2)", due: "15th September", category: "Income Tax", urgency: "quarterly", desc: "Second installment — 45% of estimated tax." },
  { id: 11, title: "Advance Tax (Q3)", due: "15th December", category: "Income Tax", urgency: "quarterly", desc: "Third installment — 75% of estimated tax." },
  { id: 12, title: "Advance Tax (Q4)", due: "15th March", category: "Income Tax", urgency: "quarterly", desc: "Final installment — 100% of estimated tax." },
];

const categories = ["All", "GST", "TDS", "TCS", "Income Tax"];

const urgencyStyles = {
  recurring: { icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10", label: "Monthly" },
  quarterly: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Quarterly" },
  annual: { icon: CalendarDays, color: "text-accent", bg: "bg-accent/10", label: "Annual" },
};

const ComplianceCalendarPage = () => {
  const [filter, setFilter] = useState("All");
  const [reminders, setReminders] = useState({});

  const filtered = filter === "All" ? deadlines : deadlines.filter((d) => d.category === filter);

  const toggleReminder = (id) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
              <CalendarDays className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">Compliance Calendar</span>
            </div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-3">Tax Compliance Deadlines</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Stay on top of every filing deadline. Never miss a due date again.</p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat ? "bg-accent text-accent-foreground" : "bg-background border border-border text-foreground hover:border-accent/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Deadline Cards */}
          <div className="space-y-3">
            {filtered.map((d, i) => {
              const style = urgencyStyles[d.urgency];
              const UrgIcon = style.icon;
              const reminded = reminders[d.id];
              return (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-background border border-border rounded-lg p-5 flex items-start gap-4 hover:border-accent/30 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg ${style.bg} flex items-center justify-center shrink-0`}>
                    <UrgIcon className={`w-5 h-5 ${style.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-bold text-foreground">{d.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${style.bg} ${style.color} font-semibold`}>{style.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{d.desc}</p>
                    <p className="text-sm font-semibold text-accent mt-1">Due: {d.due}</p>
                  </div>
                  <button
                    onClick={() => toggleReminder(d.id)}
                    className={`shrink-0 p-2 rounded-lg transition-colors ${reminded ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground"}`}
                    title={reminded ? "Reminder enabled" : "Enable reminder"}
                  >
                    {reminded ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                  </button>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center mt-10">
            <p className="text-sm text-muted-foreground mb-4">Reminder toggles are for UI demonstration. Connect to Lovable Cloud for real notifications.</p>
            <a href="https://wa.me/919052878779?text=I%20need%20help%20with%20compliance%20deadlines" target="_blank" rel="noopener noreferrer">
              <Button>Get Compliance Support</Button>
            </a>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ComplianceCalendarPage;
