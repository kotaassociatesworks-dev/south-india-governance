import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Shield, Award } from "lucide-react";

const OurGoalSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Animated color background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, hsl(44 60% 45% / 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, hsl(44 60% 45% / 0.12) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, hsl(44 60% 45% / 0.06) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, hsl(44 60% 45% / 0.08) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D floating elements */}
      <motion.div
        className="absolute top-10 right-[15%] w-20 h-20 border border-gold/15 rounded-full"
        style={{ perspective: "800px", transformStyle: "preserve-3d" }}
        animate={{ rotateX: [0, 360], rotateY: [0, 180], y: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 left-[10%] w-14 h-14 border border-gold/10"
        animate={{ rotate: [0, 180, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.p
            className="text-sm font-semibold tracking-[0.25em] uppercase text-gold mb-3"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={inView ? { opacity: 1, letterSpacing: "0.25em" } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Our Commitment
          </motion.p>
          <motion.h2
            className="font-heading text-3xl lg:text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.15, duration: 0.35 }}
          >
            Our Goal
          </motion.h2>
          <motion.p
            className="text-lg lg:text-xl text-primary-foreground/80 leading-relaxed mb-12"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            <motion.span
              animate={inView ? { color: ["hsl(60 20% 97% / 0.8)", "hsl(44 60% 45%)", "hsl(60 20% 97% / 0.8)"] } : {}}
              transition={{ delay: 1, duration: 3, repeat: Infinity }}
            >
              "Our goal is to deliver quality and assured services to every client through
              structured compliance, professional discipline, and trusted advisory."
            </motion.span>
          </motion.p>

          <div className="grid sm:grid-cols-3 gap-8 mt-8">
            {[
              { icon: Target, title: "Quality", desc: "Precision in every engagement" },
              { icon: Shield, title: "Assurance", desc: "Reliable, compliant outcomes" },
              { icon: Award, title: "Trust", desc: "Decades of proven integrity" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30, rotateX: -20 }}
                  animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                  whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.25 } }}
                  className="text-center"
                  style={{ perspective: "600px" }}
                >
                  <motion.div
                    className="w-14 h-14 mx-auto mb-4 border border-gold/30 flex items-center justify-center"
                    whileHover={{ borderColor: "hsl(44 60% 45%)", boxShadow: "0 0 20px hsl(44 60% 45% / 0.3)" }}
                    animate={{ boxShadow: ["0 0 0px hsl(44 60% 45% / 0)", "0 0 15px hsl(44 60% 45% / 0.2)", "0 0 0px hsl(44 60% 45% / 0)"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    <Icon className="w-7 h-7 text-gold" />
                  </motion.div>
                  <h3 className="font-heading text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-primary-foreground/60">{item.desc}</p>
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