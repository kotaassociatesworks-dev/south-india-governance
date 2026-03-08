import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FileText, Calculator, Briefcase, Truck, Gavel, Receipt, ArrowRight } from "lucide-react";

const serviceCategories = [
  {
    icon: FileText,
    title: "GST & Compliance",
    services: ["GST Registration", "GST Amendments", "GST Return Filing", "ITC Claims", "GST Refunds", "GST Notices"],
  },
  {
    icon: Calculator,
    title: "Accounting Services",
    services: ["Bookkeeping", "Ledger Management", "Payroll Compliance"],
  },
  {
    icon: Gavel,
    title: "Drafting & Legal",
    services: ["Partnership Deeds", "Rental Agreements", "Mercantile Law Documents", "Power of Attorney"],
  },
  {
    icon: Receipt,
    title: "Direct Taxes",
    services: ["TDS/TCS Compliance", "Trial Balance to Balance Sheet", "Income Tax Filing (Coming Soon)"],
  },
  {
    icon: Briefcase,
    title: "Business Services",
    services: ["Partnership Deeds", "Commercial Rental Agreements", "Firm Registrations"],
  },
  {
    icon: Truck,
    title: "E-Way Bill Bulk Upload",
    services: ["10 E-Way Bills", "25 E-Way Bills", "50 E-Way Bills", "100 E-Way Bills"],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 lg:py-32 bg-secondary relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 30% 20%, hsl(216 60% 26% / 0.04) 0%, transparent 50%)",
            "radial-gradient(ellipse at 70% 80%, hsl(44 60% 45% / 0.04) 0%, transparent 50%)",
            "radial-gradient(ellipse at 30% 20%, hsl(216 60% 26% / 0.04) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(hsl(216 60% 26% / 0.02) 1px, transparent 1px), linear-gradient(90deg, hsl(216 60% 26% / 0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={inView ? { opacity: 1, letterSpacing: "0.25em" } : {}}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            What We Do
          </motion.p>
          <motion.h2
            className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.15, duration: 0.35 }}
          >
            Comprehensive Professional Services
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            End-to-end financial compliance, taxation, drafting, and business advisory services.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {serviceCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40, rotateX: -10 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 20px 40px -15px hsl(214 65% 12% / 0.15)",
                  transition: { duration: 0.25 },
                }}
                className="bg-background p-8 border border-border hover:border-accent/40 transition-all group relative overflow-hidden"
                style={{ perspective: "800px" }}
              >
                {/* Animated shimmer on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-accent/0 group-hover:bg-accent transition-colors duration-300"
                  whileHover={{ scaleX: [0, 1], transition: { duration: 0.4 } }}
                />
                <motion.div
                  className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                </motion.div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                  {cat.title}
                </h3>
                <ul className="space-y-2 mb-6">
                  {cat.services.map((s, si) => (
                    <motion.li
                      key={s}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 + si * 0.05, duration: 0.3 }}
                    >
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: si * 0.3 }}
                      />
                      {s}
                    </motion.li>
                  ))}
                </ul>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-primary transition-colors"
                >
                  Contact Us <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-colors"
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