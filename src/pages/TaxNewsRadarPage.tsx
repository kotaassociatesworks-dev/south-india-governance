import { useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Bell, Calendar, AlertTriangle, CheckCircle, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const newsItems = [
  {
    category: "GST Update",
    severity: "important",
    date: "March 5, 2026",
    title: "GSTR-1 Filing Deadline Extended for February 2026",
    summary: "The CBIC has extended the GSTR-1 filing deadline for February 2026 to March 13, 2026 due to portal maintenance.",
  },
  {
    category: "Tax Notification",
    severity: "critical",
    date: "March 3, 2026",
    title: "New E-Invoice Threshold Reduced to ₹5 Crore",
    summary: "Businesses with aggregate turnover exceeding ₹5 crore are now mandated to generate e-invoices for B2B transactions.",
  },
  {
    category: "Compliance Deadline",
    severity: "deadline",
    date: "March 1, 2026",
    title: "GSTR-3B Due Date: March 20, 2026",
    summary: "Monthly GSTR-3B for February 2026 must be filed by March 20. Late filing attracts ₹50/day penalty.",
  },
  {
    category: "GST Update",
    severity: "important",
    date: "February 28, 2026",
    title: "ITC Reconciliation Rules Tightened Under Rule 36(4)",
    summary: "Input Tax Credit claims must now match 100% with GSTR-2B. Excess claims will be auto-reversed.",
  },
  {
    category: "Tax Notification",
    severity: "info",
    date: "February 25, 2026",
    title: "Annual Return GSTR-9 Due by December 31, 2026",
    summary: "All registered taxpayers must file GSTR-9 for FY 2025-26 by December 31, 2026.",
  },
  {
    category: "Compliance Deadline",
    severity: "deadline",
    date: "February 20, 2026",
    title: "TDS Return Filing Due: March 31, 2026",
    summary: "Quarterly TDS return for Q4 (January-March 2026) must be filed by March 31, 2026.",
  },
];

const severityConfig = {
  critical: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", label: "Critical" },
  important: { icon: Clock, color: "text-accent", bg: "bg-accent/10", label: "Important" },
  deadline: { icon: Calendar, color: "text-accent", bg: "bg-accent/10", label: "Deadline" },
  info: { icon: CheckCircle, color: "text-muted-foreground", bg: "bg-muted", label: "Info" },
};

const TaxNewsRadarPage = () => {
  const [filter, setFilter] = useState("all");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = filter === "all" ? newsItems : newsItems.filter(n => n.category === filter);
  const categories = ["all", ...Array.from(new Set(newsItems.map(n => n.category)))];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-gold/30 bg-gold/5">
              <Newspaper className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">Live Updates</span>
            </div>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-4">Tax News Radar</h1>
            <p className="text-primary-foreground/60 max-w-xl mx-auto text-lg">
              Real-time updates on GST rule changes, tax notifications, and compliance deadlines.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Subscribe banner */}
        {!subscribed ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-accent" />
              <p className="text-foreground font-medium">Get notified about important tax updates and deadlines</p>
            </div>
            <button
              onClick={() => setSubscribed(true)}
              className="px-6 py-2.5 bg-accent text-accent-foreground font-semibold text-sm rounded-lg hover:bg-accent/90 transition-colors"
            >
              Subscribe to Alerts
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-accent/10 border border-accent/30 rounded-xl p-6 mb-10 text-center">
            <CheckCircle className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-foreground font-medium">You're subscribed! Contact us to receive email alerts.</p>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat === "all" ? "All Updates" : cat}
            </button>
          ))}
        </div>

        {/* News list */}
        <div className="space-y-4 max-w-4xl">
          {filtered.map((item, i) => {
            const sev = severityConfig[item.severity as keyof typeof severityConfig];
            const Icon = sev.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-background border border-border rounded-xl p-6 hover:border-accent/30 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg ${sev.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${sev.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${sev.bg} ${sev.color}`}>{item.category}</span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Need help understanding these changes?</p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold text-sm rounded-lg hover:bg-accent/90 transition-colors"
          >
            Talk to an Advisor <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TaxNewsRadarPage;
