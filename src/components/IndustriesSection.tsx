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
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">Industries</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Sectors We Serve
          </h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Trusted by businesses across diverse industries throughout South India.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-5">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="flex flex-col items-center gap-3 p-6 border border-border rounded-lg hover:border-accent/40 transition-all group cursor-default bg-background hover:shadow-lg"
              >
                <Icon className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors" />
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
