import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, MapPin, ClipboardCheck, FileCheck, Handshake } from "lucide-react";

const reasons = [
  { icon: Shield, title: "70+ Years Legacy", desc: "Seven decades of unwavering commitment to financial excellence and client trust since 1952." },
  { icon: MapPin, title: "Multi-State Presence", desc: "Operational coverage across 7 states and the entire South Indian region with local expertise." },
  { icon: ClipboardCheck, title: "Compliance-Focused", desc: "Every engagement is rooted in regulatory compliance, risk mitigation, and structured governance." },
  { icon: FileCheck, title: "Structured Documentation", desc: "Meticulous record-keeping and documentation frameworks that withstand scrutiny at every level." },
  { icon: Handshake, title: "Long-Term Advisory", desc: "We build enduring partnerships, providing strategic counsel that evolves with your business." },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-us" className="py-28 lg:py-40 bg-primary text-primary-foreground relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 30% 50%, hsl(224 64% 33% / 0.15) 0%, transparent 60%)",
            "radial-gradient(ellipse at 70% 50%, hsl(224 64% 33% / 0.2) 0%, transparent 60%)",
            "radial-gradient(ellipse at 30% 50%, hsl(224 64% 33% / 0.15) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-18"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-gold mb-4">Our Distinction</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold mb-5 tracking-tight">Why Leading Businesses Choose Us</h2>
          <div className="w-20 h-[2px] mx-auto mt-4 rounded-full" style={{ background: "linear-gradient(90deg, transparent, hsl(46 70% 47%), transparent)" }} />
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                className="flex items-start gap-6 p-6 rounded-xl border border-primary-foreground/8 hover:border-gold/20 hover:bg-primary-foreground/3 transition-all group"
              >
                <span className="font-heading text-3xl font-extrabold text-gold/15 group-hover:text-gold/30 transition-colors shrink-0">{num}</span>
                <div className="w-12 h-12 rounded-xl border border-gold/20 flex items-center justify-center bg-gold/5 shrink-0 group-hover:bg-gold/10 transition-colors">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-1 group-hover:text-gold transition-colors">{r.title}</h3>
                  <p className="text-sm text-primary-foreground/55 leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
