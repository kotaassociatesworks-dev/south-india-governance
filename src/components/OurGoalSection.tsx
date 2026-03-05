import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Shield, Award } from "lucide-react";

const OurGoalSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-gold mb-3">
            Our Commitment
          </p>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-8">
            Our Goal
          </h2>
          <p className="text-lg lg:text-xl text-primary-foreground/80 leading-relaxed mb-12">
            "Our goal is to deliver quality and assured services to every client through
            structured compliance, professional discipline, and trusted advisory."
          </p>

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
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 border border-gold/30 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
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
