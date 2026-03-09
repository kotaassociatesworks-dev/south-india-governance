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
    <section ref={ref} className="py-28 lg:py-40 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-4">What We Do</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">Our Capabilities</h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Comprehensive tax and compliance solutions built on decades of expertise.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto" style={{ perspective: "1000px" }}>
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 35, rotateX: 8 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={cap.href}
                  className="premium-card block p-8 group h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">{cap.title}</h3>
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
