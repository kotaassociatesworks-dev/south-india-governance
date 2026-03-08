import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FileText, Calculator, Briefcase, Truck, Gavel, Receipt, ArrowRight } from "lucide-react";

const serviceCategories = [
  {
    icon: FileText,
    title: "GST & Compliance",
    desc: "End-to-end GST registration, filing, amendments, and notice handling.",
    services: ["GST Registration", "GST Amendments", "GST Return Filing", "ITC Claims", "GST Refunds", "GST Notices"],
  },
  {
    icon: Calculator,
    title: "Accounting Services",
    desc: "Professional bookkeeping, ledger management, and payroll compliance.",
    services: ["Bookkeeping", "Ledger Management", "Payroll Compliance"],
  },
  {
    icon: Gavel,
    title: "Drafting & Legal",
    desc: "Legally compliant deeds, agreements, and commercial documentation.",
    services: ["Partnership Deeds", "Rental Agreements", "Mercantile Law Documents", "Power of Attorney"],
  },
  {
    icon: Receipt,
    title: "Direct Taxes",
    desc: "TDS/TCS compliance, financial statements, and tax filing services.",
    services: ["TDS/TCS Compliance", "Trial Balance to Balance Sheet", "Income Tax Filing (Coming Soon)"],
  },
  {
    icon: Briefcase,
    title: "Business Services",
    desc: "Firm registrations, commercial agreements, and business setup.",
    services: ["Partnership Deeds", "Commercial Rental Agreements", "Firm Registrations"],
  },
  {
    icon: Truck,
    title: "E-Way Bill Services",
    desc: "Bulk E-Way Bill generation with structured compliance workflows.",
    services: ["10 E-Way Bills", "25 E-Way Bills", "50 E-Way Bills", "100 E-Way Bills"],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 lg:py-32 bg-secondary relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(210 72% 15%) 1px, transparent 1px), linear-gradient(90deg, hsl(210 72% 15%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">
            What We Do
          </p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Comprehensive Professional Services
          </h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            End-to-end financial compliance, taxation, drafting, and business advisory services.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {serviceCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
                className="enterprise-card group relative overflow-hidden rounded-lg"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent/0 via-accent to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{cat.desc}</p>
                <ul className="space-y-2 mb-6">
                  {cat.services.map((s) => (
                    <li key={s} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-primary transition-colors group/link"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm tracking-widest uppercase rounded-lg hover:bg-primary/90 transition-colors"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
