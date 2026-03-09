import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Building, Factory, Handshake, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const allServices = [
  "GST Registration", "GST Return Filing", "GST Amendments", "ITC Claims & Reconciliation",
  "GST Refunds", "GST Notices & Representation", "Bookkeeping", "Ledger Management",
  "Payroll Compliance", "Partnership Deed Drafting", "Rental Agreement Drafting",
  "Mercantile Law Documentation", "TDS/TCS Compliance", "Trial Balance to Balance Sheet",
  "E-Way Bill Services", "Firm Registrations",
];

const tiers = [
  { icon: Factory, title: "M.S.M.E Partners", description: "Micro, Small & Medium Enterprises — get all our compliance services at special negotiated rates tailored for growing businesses.", badge: "Special MSME Pricing" },
  { icon: Building, title: "M.N.C Partners", description: "Multi-National Corporations — enterprise-grade compliance solutions with dedicated account management and volume-based pricing.", badge: "Enterprise Pricing" },
];

const PartnershipSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTier, setActiveTier] = useState(0);

  return (
    <section id="partnership" className="py-28 lg:py-40 bg-primary text-primary-foreground relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 30% 50%, hsl(224 64% 33% / 0.12) 0%, transparent 60%)",
            "radial-gradient(ellipse at 70% 50%, hsl(224 64% 33% / 0.18) 0%, transparent 60%)",
            "radial-gradient(ellipse at 30% 50%, hsl(224 64% 33% / 0.12) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-gold mb-4">Enterprise Solutions</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold mb-5 tracking-tight">Large Scale Services</h2>
          <div className="w-20 h-[2px] mx-auto mt-4 mb-6" style={{ background: "linear-gradient(90deg, transparent, hsl(46 70% 47%), transparent)" }} />
          <p className="text-primary-foreground/55 max-w-2xl mx-auto text-lg">
            Whether you're an MSME or MNC, we offer tailored compliance packages with special pricing.
          </p>
        </motion.div>

        {/* Tier toggle with sliding indicator */}
        <div className="flex justify-center gap-4 mb-14 relative">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.button
                key={tier.title}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTier(i)}
                className={`flex items-center gap-3 px-7 py-5 rounded-xl border transition-all relative ${
                  activeTier === i
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-primary-foreground/12 text-primary-foreground/45 hover:border-gold/25"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="font-heading text-lg font-semibold">{tier.title}</span>
                {activeTier === i && (
                  <motion.div
                    layoutId="tier-indicator"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Active tier */}
        <motion.div
          key={activeTier}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-primary-foreground/4 border border-primary-foreground/8 rounded-2xl p-10 lg:p-14 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-4 py-1.5 rounded-full bg-gold/12 text-gold text-xs font-bold tracking-[0.2em] uppercase">
                {tiers[activeTier].badge}
              </span>
            </div>
            <p className="text-primary-foreground/70 mb-10 text-lg leading-relaxed">{tiers[activeTier].description}</p>

            <h4 className="font-heading text-lg font-semibold text-gold mb-7">All Services Included:</h4>
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {allServices.map((svc, i) => (
                <motion.div
                  key={svc}
                  className="flex items-center gap-3 text-sm text-primary-foreground/60"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                >
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.2 + i * 0.03, duration: 0.3 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  </motion.div>
                  {svc}
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/large-scale-services"
                className="inline-flex items-center gap-2.5 px-10 py-5 font-semibold text-sm tracking-[0.15em] uppercase rounded-lg transition-all"
                style={{ background: "linear-gradient(135deg, hsl(46 70% 47%), hsl(46 50% 55%))", color: "hsl(210 72% 10%)", boxShadow: "0 10px 40px -10px hsl(46 70% 47% / 0.4)" }}
              >
                <Handshake className="w-5 h-5" />
                Explore Packages <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipSection;
