import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Factory, ShoppingBag, Truck, HardHat, Building, Store, Wrench } from "lucide-react";

const industries = [
  { icon: Factory, label: "Manufacturing" },
  { icon: ShoppingBag, label: "Retail" },
  { icon: Truck, label: "Logistics" },
  { icon: HardHat, label: "Contractors" },
  { icon: Building, label: "MSMEs" },
  { icon: Store, label: "Traders" },
  { icon: Wrench, label: "Service Businesses" },
];

const IndustriesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="industries" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle moving gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 50% 0%, hsl(44 60% 45% / 0.03) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 100%, hsl(216 60% 26% / 0.04) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 0%, hsl(44 60% 45% / 0.03) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={inView ? { opacity: 1, letterSpacing: "0.25em" } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Industries
          </motion.p>
          <motion.h2
            className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Sectors We Serve
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            Trusted by businesses across diverse industries throughout South India.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, y: 30, scale: 0.9, rotateY: -20 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{
                  y: -10,
                  scale: 1.1,
                  rotateY: 10,
                  boxShadow: "0 15px 30px -10px hsl(214 65% 12% / 0.15)",
                  transition: { duration: 0.25 },
                }}
                className="flex flex-col items-center gap-3 p-6 border border-border hover:border-accent/40 transition-colors group cursor-default bg-background"
                style={{ perspective: "600px" }}
              >
                <motion.div
                  animate={{
                    color: ["hsl(216 60% 26%)", "hsl(44 60% 45%)", "hsl(216 60% 26%)"],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                >
                  <Icon className="w-8 h-8" />
                </motion.div>
                <span className="text-sm font-medium text-foreground text-center">{ind.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;