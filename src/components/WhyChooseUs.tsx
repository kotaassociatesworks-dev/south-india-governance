import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, MapPin, ClipboardCheck, FileCheck, Handshake } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "70+ Years Legacy",
    desc: "Seven decades of unwavering commitment to financial excellence and client trust since 1952.",
  },
  {
    icon: MapPin,
    title: "Multi-State Presence",
    desc: "Operational coverage across 7 states and the entire South Indian region with local expertise.",
  },
  {
    icon: ClipboardCheck,
    title: "Compliance-Focused",
    desc: "Every engagement is rooted in regulatory compliance, risk mitigation, and structured governance.",
  },
  {
    icon: FileCheck,
    title: "Structured Documentation",
    desc: "Meticulous record-keeping and documentation frameworks that withstand scrutiny at every level.",
  },
  {
    icon: Handshake,
    title: "Long-Term Advisory",
    desc: "We build enduring partnerships, providing strategic counsel that evolves with your business.",
  },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-us" className="py-24 lg:py-32 bg-navy-deep text-primary-foreground relative overflow-hidden">
      {/* Animated color waves */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "linear-gradient(135deg, hsl(214 65% 14% / 1) 0%, hsl(216 60% 26% / 0.5) 50%, hsl(214 65% 12%) 100%)",
            "linear-gradient(225deg, hsl(214 65% 12%) 0%, hsl(216 60% 30% / 0.4) 50%, hsl(214 65% 14% / 1) 100%)",
            "linear-gradient(135deg, hsl(214 65% 14% / 1) 0%, hsl(216 60% 26% / 0.5) 50%, hsl(214 65% 12%) 100%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D floating rings */}
      <motion.div
        className="absolute top-[10%] right-[5%] w-40 h-40 border border-gold/8 rounded-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: [0, 30, 0], rotateY: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[5%] w-28 h-28 border border-gold/6 rounded-full"
        animate={{ rotateY: [0, -360], y: [0, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      {[
        { top: "15%", left: "20%", size: 3, dur: 6 },
        { top: "60%", left: "80%", size: 4, dur: 7 },
        { top: "40%", left: "50%", size: 2, dur: 5 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-gold/20 rounded-full pointer-events-none"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: i * 1.5 }}
        />
      ))}

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
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Our Distinction
          </motion.p>
          <motion.h2
            className="font-heading text-3xl lg:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Why Leading Businesses Choose Us
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 40, rotateY: -15 }}
                animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{
                  y: -10,
                  scale: 1.08,
                  transition: { duration: 0.25 },
                }}
                className="text-center"
                style={{ perspective: "600px" }}
              >
                <motion.div
                  className="w-14 h-14 mx-auto mb-4 border border-gold/30 flex items-center justify-center"
                  animate={{
                    borderColor: ["hsl(44 60% 45% / 0.3)", "hsl(44 60% 45% / 0.6)", "hsl(44 60% 45% / 0.3)"],
                    boxShadow: ["0 0 0px hsl(44 60% 45% / 0)", "0 0 20px hsl(44 60% 45% / 0.2)", "0 0 0px hsl(44 60% 45% / 0)"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Icon className="w-7 h-7 text-gold" />
                </motion.div>
                <motion.h3
                  className="font-heading text-lg font-semibold mb-2"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  {r.title}
                </motion.h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;