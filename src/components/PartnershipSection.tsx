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
    <section id="partnership" className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 10% 50%, hsl(44 60% 45% / 0.06) 0%, transparent 50%)",
            "radial-gradient(ellipse at 90% 50%, hsl(44 60% 45% / 0.1) 0%, transparent 50%)",
            "radial-gradient(ellipse at 10% 50%, hsl(44 60% 45% / 0.06) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D floating shapes */}
      <motion.div
        className="absolute top-[15%] left-[5%] w-20 h-20 border border-gold/10 rounded-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: [0, 360], y: [0, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[15%] right-[8%] w-16 h-16 border border-gold/8"
        animate={{ rotate: [0, 90, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            className="text-sm font-semibold tracking-[0.25em] uppercase text-gold mb-3"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={inView ? { opacity: 1, letterSpacing: "0.25em" } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Enterprise Solutions
          </motion.p>
          <motion.h2
            className="font-heading text-3xl lg:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Large Scale Services
          </motion.h2>
          <motion.p
            className="text-primary-foreground/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            Whether you're an MSME or MNC, we offer tailored compliance packages with special pricing for large-scale engagements.
          </motion.p>
        </motion.div>

        {/* Tier toggle with 3D flip */}
        <div className="flex justify-center gap-4 mb-12">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.button
                key={tier.title}
                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTier(i)}
                className={`flex items-center gap-3 px-6 py-4 border transition-all ${
                  activeTier === i
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-primary-foreground/20 text-primary-foreground/60 hover:border-gold/40"
                }`}
                style={{ perspective: "500px" }}
              >
                <Icon className="w-6 h-6" />
                <span className="font-heading text-lg font-semibold">{tier.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Active tier with animated content */}
        <motion.div
          key={activeTier}
          initial={{ opacity: 0, y: 30, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
          style={{ perspective: "800px" }}
        >
          <motion.div
            className="bg-primary-foreground/5 border border-primary-foreground/10 p-8 lg:p-12 backdrop-blur-sm relative overflow-hidden"
            whileHover={{ borderColor: "hsl(44 60% 45% / 0.3)" }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />

            <div className="flex items-center gap-3 mb-4 relative z-10">
              <motion.span
                className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold tracking-[0.15em] uppercase"
                animate={{ boxShadow: ["0 0 0px hsl(44 60% 45% / 0)", "0 0 15px hsl(44 60% 45% / 0.2)", "0 0 0px hsl(44 60% 45% / 0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {tiers[activeTier].badge}
              </motion.span>
            </div>
            <p className="text-primary-foreground/80 mb-8 text-lg relative z-10">
              {tiers[activeTier].description}
            </p>

            <h4 className="font-heading text-lg font-semibold text-gold mb-6 relative z-10">
              All Services Included:
            </h4>
            <div className="grid sm:grid-cols-2 gap-3 mb-10 relative z-10">
              {allServices.map((svc, i) => (
                <motion.div
                  key={svc}
                  className="flex items-center gap-2 text-sm text-primary-foreground/70"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  </motion.div>
                  {svc}
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }} className="relative z-10">
              <Link
                to="/large-scale-services"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-accent-foreground font-semibold text-sm tracking-[0.15em] uppercase hover:brightness-110 transition"
              >
                <Handshake className="w-5 h-5" />
                Explore Packages <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipSection;