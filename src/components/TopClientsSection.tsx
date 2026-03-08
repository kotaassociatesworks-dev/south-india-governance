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
    <section className="py-24 lg:py-32 bg-secondary relative overflow-hidden">
      {/* Moving light streak */}
      <motion.div
        className="absolute top-0 left-0 w-[1px] h-full pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(44 60% 45% / 0.2), transparent)" }}
        animate={{ x: ["-5%", "105vw"] }}
        transition={{ duration: 8, repeat: Infinity, repeatDelay: 4 }}
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
            Trusted Partners
          </motion.p>
          <motion.h2
            className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Our Top Clients
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            Trusted by leading businesses and organizations across South India.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, scale: 0.85, rotateX: -15 }}
              animate={inView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                y: -8,
                scale: 1.05,
                boxShadow: "0 15px 30px -10px hsl(214 65% 12% / 0.15)",
                borderColor: "hsl(44 60% 45% / 0.5)",
                transition: { duration: 0.25 },
              }}
              className="bg-background border border-border p-6 flex flex-col items-center justify-center gap-3 transition-all group cursor-default min-h-[120px]"
              style={{ perspective: "600px" }}
            >
              <motion.div
                animate={{
                  color: ["hsl(216 12% 48%)", "hsl(44 60% 45%)", "hsl(216 12% 48%)"],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
              >
                <Building2 className="w-8 h-8" />
              </motion.div>
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