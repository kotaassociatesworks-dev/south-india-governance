import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FileText, Calculator, Briefcase, Truck, Gavel, Receipt, ArrowRight } from "lucide-react";

const serviceCategories = [
  { icon: FileText, title: "GST & Compliance", desc: "End-to-end GST registration, filing, amendments, and notice handling.", services: ["GST Registration", "GST Amendments", "GST Return Filing", "ITC Claims", "GST Refunds", "GST Notices"], featured: true },
  { icon: Calculator, title: "Accounting Services", desc: "Professional bookkeeping, ledger management, and payroll compliance.", services: ["Bookkeeping", "Ledger Management", "Payroll Compliance"] },
  { icon: Gavel, title: "Drafting & Legal", desc: "Legally compliant deeds, agreements, and commercial documentation.", services: ["Partnership Deeds", "Rental Agreements", "Mercantile Law Documents", "Power of Attorney"] },
  { icon: Receipt, title: "Direct Taxes", desc: "TDS/TCS compliance, financial statements, and tax filing services.", services: ["TDS/TCS Compliance", "Trial Balance to Balance Sheet", "Income Tax Filing (Coming Soon)"] },
  { icon: Briefcase, title: "Business Services", desc: "Firm registrations, commercial agreements, and business setup.", services: ["Partnership Deeds", "Commercial Rental Agreements", "Firm Registrations"] },
  { icon: Truck, title: "E-Way Bill Services", desc: "Bulk E-Way Bill generation with structured compliance workflows.", services: ["10 E-Way Bills", "25 E-Way Bills", "50 E-Way Bills", "100 E-Way Bills"] },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-28 lg:py-40 bg-secondary relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(hsl(210 72% 15%) 1px, transparent 1px), linear-gradient(90deg, hsl(210 72% 15%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-18"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-4">What We Do</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-5 tracking-tight">
            Comprehensive Professional Services
          </h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            End-to-end financial compliance, taxation, drafting, and business advisory services.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
          {serviceCategories.map((cat, i) => {
            const Icon = cat.icon;
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="enterprise-card group relative overflow-hidden rounded-xl"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent/0 via-accent to-accent/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

                {/* Number */}
                <span className="absolute top-6 right-6 font-heading text-4xl font-extrabold text-accent/8 group-hover:text-accent/15 transition-colors duration-300">{num}</span>

                {/* Featured badge */}
                {cat.featured && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-accent/15 text-accent">Featured</span>
                )}

                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">{cat.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{cat.desc}</p>
                <ul className="space-y-2.5 mb-6">
                  {cat.services.map((s) => (
                    <li key={s} className="text-sm text-muted-foreground flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors group/link"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-10 py-5 font-semibold text-sm tracking-[0.15em] uppercase rounded-lg transition-all"
              style={{ background: "linear-gradient(135deg, hsl(210 72% 15%), hsl(224 64% 25%))", color: "hsl(216 33% 97%)" }}
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
