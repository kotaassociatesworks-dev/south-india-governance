import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2 } from "lucide-react";

const clients = [
  "Gudur Industries Ltd.",
  "South Coast Logistics",
  "AP Agro Exports",
  "Telangana Infra Corp",
  "Chennai Traders Association",
  "Karnataka Steel Works",
  "Kerala Spice Consortium",
  "Odisha Minerals Group",
];

const TopClientsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">
            Trusted Partners
          </p>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our Top Clients
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Trusted by leading businesses and organizations across South India.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-background border border-border p-6 flex flex-col items-center justify-center gap-3 hover:border-accent/40 hover:shadow-lg transition-all group cursor-default min-h-[120px]"
            >
              <Building2 className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors" />
              <span className="text-sm font-medium text-foreground text-center leading-tight">
                {client}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopClientsSection;
