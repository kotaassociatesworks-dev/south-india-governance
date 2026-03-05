import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FileText, Calculator, Briefcase, Truck, ArrowRight } from "lucide-react";

const serviceCategories = [
  {
    icon: FileText,
    title: "GST & Compliance",
    services: [
      "GST Registration",
      "GST Amendments",
      "GST Return Filing",
      "ITC Claims",
      "GST Refunds",
      "GST Notices",
    ],
  },
  {
    icon: Calculator,
    title: "Accounting Services",
    services: [
      "Bookkeeping",
      "Ledger Management",
      "Payroll Compliance",
    ],
  },
  {
    icon: Briefcase,
    title: "Legal & Business Services",
    services: [
      "Partnership Deeds",
      "Commercial Rental Agreements",
      "Firm Registrations",
    ],
  },
  {
    icon: Truck,
    title: "E-Way Bill Bulk Upload",
    services: [
      "10 E-Way Bills — Contact Us",
      "25 E-Way Bills — Contact Us",
      "50 E-Way Bills — Contact Us",
      "100 E-Way Bills — Contact Us",
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
            End-to-end financial compliance, taxation, and business advisory services.
            All pricing available on consultation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                <ul className="space-y-2 mb-6">
                  {cat.services.map((s) => (
                    <li key={s} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                      {s}
                    </li>
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

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-colors"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
