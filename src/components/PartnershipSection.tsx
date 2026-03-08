import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Building, Factory, Handshake, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const allServices = [
  "GST Registration",
  "GST Return Filing",
  "GST Amendments",
  "ITC Claims & Reconciliation",
  "GST Refunds",
  "GST Notices & Representation",
  "Bookkeeping",
  "Ledger Management",
  "Payroll Compliance",
  "Partnership Deed Drafting",
  "Rental Agreement Drafting",
  "Mercantile Law Documentation",
  "TDS/TCS Compliance",
  "Trial Balance to Balance Sheet",
  "E-Way Bill Services",
  "Firm Registrations",
];

const tiers = [
  {
    icon: Factory,
    title: "M.S.M.E Partners",
    description: "Micro, Small & Medium Enterprises — get all our compliance services at special negotiated rates tailored for growing businesses.",
    badge: "Special MSME Pricing",
  },
  {
    icon: Building,
    title: "M.N.C Partners",
    description: "Multi-National Corporations — enterprise-grade compliance solutions with dedicated account management and volume-based pricing.",
    badge: "Enterprise Pricing",
  },
];

const PartnershipSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTier, setActiveTier] = useState(0);

  return (
    <section id="partnership" className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-gold mb-3">
            Enterprise Solutions
          </p>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
            Large Scale Services
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Whether you're an MSME or MNC, we offer tailored compliance packages with special pricing for large-scale engagements.
          </p>
        </motion.div>

        {/* Tier toggle */}
        <div className="flex justify-center gap-4 mb-12">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.button
                key={tier.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => setActiveTier(i)}
                className={`flex items-center gap-3 px-6 py-4 border transition-all ${
                  activeTier === i
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-primary-foreground/20 text-primary-foreground/60 hover:border-gold/40"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="font-heading text-lg font-semibold">{tier.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Active tier content */}
        <motion.div
          key={activeTier}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-primary-foreground/5 border border-primary-foreground/10 p-8 lg:p-12 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold tracking-[0.15em] uppercase">
                {tiers[activeTier].badge}
              </span>
            </div>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              {tiers[activeTier].description}
            </p>

            <h4 className="font-heading text-lg font-semibold text-gold mb-6">
              All Services Included:
            </h4>
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {allServices.map((svc) => (
                <div key={svc} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  {svc}
                </div>
              ))}
            </div>

            <Link
              to="/large-scale-services"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-accent-foreground font-semibold text-sm tracking-[0.15em] uppercase hover:brightness-110 transition"
            >
              <Handshake className="w-5 h-5" />
              Explore Packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipSection;
