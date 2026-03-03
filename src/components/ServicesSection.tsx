import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Calculator, TrendingUp, Briefcase, Building2 } from "lucide-react";

const serviceCategories = [
  {
    icon: FileText,
    title: "GST & Indirect Taxation",
    services: [
      "GST Registration",
      "GST Amendments",
      "GST Return Filing (GSTR-1, 3B, 9, 9C)",
      "E-Way Bill Generation",
      "E-Invoicing Compliance",
      "ITC Reconciliation & Claims",
      "GST Refunds",
      "GST Notice Representation",
      "GST Audit Support",
    ],
  },
  {
    icon: Calculator,
    title: "Accounting & Compliance",
    services: [
      "Bookkeeping",
      "Ledger Management",
      "Accounts Finalization",
      "TDS Filing",
      "Payroll Compliance",
      "MIS Reporting",
    ],
  },
  {
    icon: TrendingUp,
    title: "Direct Taxation",
    services: [
      "Income Tax Filing",
      "Partnership Firm Taxation",
      "Tax Planning",
      "Capital Gains Advisory",
      "Scrutiny Representation",
    ],
  },
  {
    icon: Briefcase,
    title: "Business Structuring & Legal Drafting",
    services: [
      "Partnership Deeds",
      "Commercial Rental Agreements",
      "Firm Registration",
      "Amendments & Reconstitution",
      "Business Contracts",
    ],
  },
  {
    icon: Building2,
    title: "Corporate Compliance",
    services: [
      "ROC Filings",
      "Annual Compliance",
      "DIN / DSC Services",
      "Advisory Support",
    ],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">
            What We Do
          </p>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Comprehensive Professional Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            End-to-end financial compliance, taxation, and business advisory services
            designed for structured governance and sustainable growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-8 border border-border hover:border-accent/40 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
                  <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                  {cat.title}
                </h3>
                <ul className="space-y-2">
                  {cat.services.map((s) => (
                    <li
                      key={s}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
