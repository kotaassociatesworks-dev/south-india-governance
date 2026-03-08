import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Calculator, BookOpen, Gavel, TrendingUp, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const capabilities = [
  { icon: ShieldCheck, title: "Tax Advisory", desc: "Strategic tax planning and compliance advisory for businesses of all sizes.", href: "/services" },
  { icon: Calculator, title: "GST Compliance", desc: "End-to-end GST registration, return filing, and ITC reconciliation.", href: "/portal" },
  { icon: BookOpen, title: "Financial Compliance", desc: "Bookkeeping, financial statements, and audit-ready documentation.", href: "/services" },
  { icon: Gavel, title: "Business Structuring", desc: "Partnership deeds, MOA/AOA, and business entity formation.", href: "/portal/drafting" },
  { icon: TrendingUp, title: "Regulatory Advisory", desc: "Navigate complex regulatory requirements across multiple jurisdictions.", href: "/large-scale-services" },
  { icon: Scale, title: "Litigation Support", desc: "Tax dispute resolution, notice handling, and appellate representation.", href: "/litigation-tracker" },
];

const CapabilitiesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">What We Do</p>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight">Our Capabilities</h2>
          <div className="w-12 h-0.5 bg-accent mx-auto mt-3 mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">Comprehensive tax and compliance solutions built on decades of expertise.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={cap.href}
                  className="block bg-secondary border border-border rounded-xl p-7 hover:border-accent/40 hover:shadow-lg transition-all group h-full"
                >
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
