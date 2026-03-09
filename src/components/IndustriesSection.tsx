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
    <section id="industries" className="py-28 lg:py-40 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-4">Industries</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">Sectors We Serve</h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Trusted by businesses across diverse industries throughout South India.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="flex flex-col items-center gap-4 p-7 border border-border rounded-xl hover:border-accent/40 transition-all group cursor-default bg-background relative overflow-hidden"
              >
                {/* Radial glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at center, hsl(46 70% 47% / 0.08) 0%, transparent 70%)" }}
                />

                {/* Circular icon with gold ring */}
                <div className="w-16 h-16 rounded-full border-2 border-border group-hover:border-accent/40 flex items-center justify-center transition-all duration-300 relative z-10">
                  <Icon className="w-7 h-7 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                </div>
                <span className="text-sm font-medium text-foreground text-center relative z-10">{ind.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
