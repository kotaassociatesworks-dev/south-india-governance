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
    <section className="py-28 lg:py-40 bg-secondary relative overflow-hidden">
      {/* Premium divider top */}
      <div className="absolute top-0 left-0 right-0 gold-line" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-4">Trusted Partners</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">Our Top Clients</h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Trusted by leading businesses and organizations across South India.
          </p>
        </motion.div>

        {/* Infinite marquee */}
        <div className="relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee gap-6 hover:[animation-play-state:paused]">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={`${client}-${i}`}
                className="flex-shrink-0 bg-background border border-border rounded-xl p-6 flex items-center gap-4 min-w-[260px] hover:border-accent/40 transition-all group cursor-default"
              >
                <Building2 className="w-8 h-8 text-muted-foreground/50 group-hover:text-accent transition-colors grayscale group-hover:grayscale-0" />
                <span className="text-sm font-medium text-foreground whitespace-nowrap">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Premium divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 gold-line" />
    </section>
  );
};

export default TopClientsSection;
