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
    <section id="why-us" className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-navy-medium/20 to-primary pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-gold mb-3">Our Distinction</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold mb-4 tracking-tight">
            Why Leading Businesses Choose Us
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl border border-gold/25 flex items-center justify-center bg-gold/5">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{r.title}</h3>
                <p className="text-sm text-primary-foreground/65 leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
