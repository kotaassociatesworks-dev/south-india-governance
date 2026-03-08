import { useState } from "react";
import { motion } from "framer-motion";
import { Factory, ShoppingBag, Truck, HardHat, UtensilsCrossed, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const industries = [
  {
    id: "traders",
    label: "Traders & Wholesalers",
    icon: ShoppingBag,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    overview: "Traders dealing in goods must comply with GST, maintain proper invoicing, and handle ITC claims efficiently.",
    obligations: [
      "GST Registration (mandatory above ₹40L turnover)",
      "Monthly GSTR-1 & GSTR-3B filing",
      "E-Way Bill for interstate movement of goods",
      "ITC reconciliation with GSTR-2A/2B",
      "TDS deduction on applicable payments",
      "Annual GST return (GSTR-9)",
      "Income Tax return filing",
    ],
    challenges: [
      "ITC mismatches leading to notices",
      "E-Way Bill compliance for goods transport",
      "HSN code classification errors",
      "Cash transaction limitations under Income Tax",
    ],
  },
  {
    id: "manufacturers",
    label: "Manufacturers",
    icon: Factory,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    overview: "Manufacturing businesses face complex GST compliance with input credits on raw materials, capital goods, and services.",
    obligations: [
      "GST Registration and monthly filing",
      "ITC claims on raw materials and capital goods",
      "E-Way Bill for finished goods dispatch",
      "Job work compliance (GST provisions)",
      "TDS/TCS compliance",
      "Excise & customs (for importers)",
      "Annual financial statements",
    ],
    challenges: [
      "Complex ITC chains across multiple suppliers",
      "Job work tracking and compliance",
      "Reverse charge mechanism on certain inputs",
      "Valuation rules for captive consumption",
    ],
  },
  {
    id: "transport",
    label: "Transport Companies",
    icon: Truck,
    color: "text-green-500",
    bg: "bg-green-500/10",
    overview: "Transport and logistics firms have unique GST provisions including GTA services and E-Way Bill requirements.",
    obligations: [
      "GST under Goods Transport Agency (GTA) provisions",
      "E-Way Bill generation for every consignment",
      "Reverse Charge Mechanism compliance",
      "TDS on freight payments",
      "Vehicle-wise expense tracking",
      "Monthly GST return filing",
      "Income Tax with presumptive taxation option",
    ],
    challenges: [
      "Forward charge vs reverse charge election",
      "Multi-state E-Way Bill compliance",
      "Vehicle breakdown and E-Way Bill validity",
      "Driver cash advances and documentation",
    ],
  },
  {
    id: "contractors",
    label: "Contractors & Builders",
    icon: HardHat,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    overview: "Contractors must handle TDS compliance, works contract GST, and project-based accounting.",
    obligations: [
      "GST on works contracts (composite supply)",
      "TDS compliance (Section 194C, 194J)",
      "TCS on sale of goods above ₹50L",
      "Project-wise profit & loss accounting",
      "Labour cess and PF compliance",
      "Annual tax audit (if applicable)",
      "Advance tax quarterly payments",
    ],
    challenges: [
      "Works contract valuation and GST rates",
      "TDS deduction and certificate management",
      "Multiple project accounting",
      "Sub-contractor compliance tracking",
    ],
  },
  {
    id: "retail",
    label: "Retail Businesses",
    icon: ShoppingBag,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    overview: "Retail businesses need efficient POS billing, GST compliance, and inventory management for tax purposes.",
    obligations: [
      "GST Registration and B2C invoicing",
      "Composition scheme eligibility (up to ₹1.5 Cr)",
      "Monthly/quarterly GST filing",
      "Cash memo and invoice compliance",
      "TDS on rent payments",
      "Income Tax return filing",
      "Stock valuation for year-end",
    ],
    challenges: [
      "Composition scheme vs regular scheme decision",
      "Multi-rate GST items in inventory",
      "Cash transaction tracking and limits",
      "Seasonal stock fluctuations and valuation",
    ],
  },
  {
    id: "professional",
    label: "Professional Services",
    icon: Briefcase,
    color: "text-accent",
    bg: "bg-accent/10",
    overview: "Consultants, freelancers, and professional firms need to manage service-based GST, TDS, and professional tax.",
    obligations: [
      "GST Registration (mandatory above ₹20L)",
      "GST on services at applicable rates",
      "Professional tax registration",
      "TDS deduction on contractor payments",
      "Advance tax quarterly payments",
      "Tax audit u/s 44AB (if turnover exceeds limit)",
      "Presumptive taxation option (44ADA)",
    ],
    challenges: [
      "Place of supply rules for services",
      "Export of services and zero-rated supply",
      "TDS credit reconciliation",
      "Professional tax across multiple states",
    ],
  },
];

const IndustryGuidesPage = () => {
  const [selected, setSelected] = useState(industries[0].id);
  const current = industries.find((i) => i.id === selected);

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
              <Factory className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">Industry Guides</span>
            </div>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-3">Industry Compliance Guides</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Understand your tax obligations based on your industry. Select your sector for a detailed compliance overview.</p>
          </motion.div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8 max-w-6xl mx-auto">
            {/* Sidebar */}
            <div className="space-y-2">
              {industries.map((ind) => {
                const Icon = ind.icon;
                const active = selected === ind.id;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setSelected(ind.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      active ? "bg-accent/10 border border-accent/30 text-foreground" : "bg-background border border-border text-muted-foreground hover:border-accent/20 hover:text-foreground"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? "text-accent" : ""} shrink-0`} />
                    <span className="text-sm font-medium">{ind.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content */}
            {current && (
              <motion.div key={current.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="bg-background border border-border rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg ${current.bg} flex items-center justify-center`}>
                      <current.icon className={`w-6 h-6 ${current.color}`} />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">{current.label}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{current.overview}</p>
                </div>

                <div className="bg-background border border-border rounded-xl p-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">Tax Obligations</h3>
                  <ul className="space-y-3">
                    {current.obligations.map((o) => (
                      <li key={o} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-background border border-border rounded-xl p-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">Common Challenges</h3>
                  <ul className="space-y-3">
                    {current.challenges.map((c) => (
                      <li key={c} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-destructive text-xs font-bold">!</span>
                        </div>
                        <span className="text-foreground">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-foreground">Need compliance help for your {current.label.toLowerCase()} business?</h4>
                    <p className="text-sm text-muted-foreground mt-1">Our experts specialize in industry-specific tax compliance.</p>
                  </div>
                  <a
                    href={`https://wa.me/919052878779?text=I%20need%20compliance%20help%20for%20my%20${encodeURIComponent(current.label)}%20business.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors shrink-0"
                  >
                    Get Expert Help <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default IndustryGuidesPage;
