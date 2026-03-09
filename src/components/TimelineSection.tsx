import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const milestones = [
  { year: "1952", title: "Firm Established", desc: "Founded in Andhra Pradesh with a vision to provide professional tax advisory services." },
  { year: "1985", title: "Expanded Advisory Services", desc: "Added comprehensive tax planning and compliance consulting to the service portfolio." },
  { year: "2005", title: "Multi-State Operations", desc: "Extended operations across 7 states in South India including Karnataka and Tamil Nadu." },
  { year: "2018", title: "GST Era Leadership", desc: "Became a regional leader in GST compliance advisory, serving 500+ businesses through the transition." },
  { year: "2024", title: "Digital Platform Launch", desc: "Launched the Kota Associates Tax Technology Platform — combining expertise with digital tools." },
];

const TimelineSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 lg:py-40 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-4">Our Journey</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">70+ Years of Excellence</h2>
          <div className="section-divider mt-4 mb-6" />
        </motion.div>

        <div className="relative">
          {/* Animated gold timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-px overflow-hidden">
            <motion.div
              className="w-full"
              style={{ background: "linear-gradient(to bottom, hsl(46 70% 47%), hsl(46 50% 62%), hsl(46 70% 47% / 0.3))" }}
              initial={{ height: 0 }}
              animate={inView ? { height: "100%" } : {}}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-14">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Pulsing dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1.5 mt-1.5 z-10">
                  <div className="w-3.5 h-3.5 rounded-full bg-accent border-[3px] border-background relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent/30"
                      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                  </div>
                </div>

                {/* Content card */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right md:pr-10" : "md:text-left md:pl-10 md:ml-auto"}`}>
                  <div className={`inline-block premium-card rounded-xl p-5 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                    style={{ borderLeft: i % 2 !== 0 ? '3px solid hsl(46 70% 47% / 0.3)' : undefined, borderRight: i % 2 === 0 ? '3px solid hsl(46 70% 47% / 0.3)' : undefined }}
                  >
                    <span className="text-accent font-heading text-2xl font-bold">{m.year}</span>
                    <h3 className="font-heading text-lg font-bold text-foreground mt-1">{m.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
