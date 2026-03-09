import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Shield, Award } from "lucide-react";

const OurGoalSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 lg:py-40 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Animated mesh gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, hsl(224 64% 33% / 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, hsl(46 70% 47% / 0.05) 0%, transparent 50%)",
            "radial-gradient(ellipse at 40% 30%, hsl(224 64% 33% / 0.2) 0%, transparent 60%), radial-gradient(ellipse at 60% 70%, hsl(46 70% 47% / 0.08) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 50%, hsl(224 64% 33% / 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, hsl(46 70% 47% / 0.05) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-gold mb-4">Our Commitment</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold mb-10 tracking-tight">Our Goal</h2>
          <div className="gold-line w-20 mb-10" />

          {/* Decorative quote marks */}
          <div className="relative mb-14">
            <span className="absolute -top-8 -left-4 text-8xl font-heading font-bold text-gold/10 select-none leading-none">"</span>
            <p className="text-xl lg:text-2xl text-primary-foreground/80 leading-relaxed italic font-light px-8">
              Our goal is to deliver quality and assured services to every client through structured compliance, professional discipline, and trusted advisory.
            </p>
            <span className="absolute -bottom-12 -right-4 text-8xl font-heading font-bold text-gold/10 select-none leading-none">"</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Quality", desc: "Precision in every engagement" },
              { icon: Shield, title: "Assurance", desc: "Reliable, compliant outcomes" },
              { icon: Award, title: "Trust", desc: "Decades of proven integrity" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 35 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className="glass-card rounded-xl p-8 text-center"
                  style={{ background: "hsl(210 72% 15% / 0.4)", backdropFilter: "blur(20px)" }}
                >
                  <div className="w-16 h-16 mx-auto mb-5 rounded-xl border border-gold/25 flex items-center justify-center bg-gold/5">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-primary-foreground/55">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurGoalSection;
