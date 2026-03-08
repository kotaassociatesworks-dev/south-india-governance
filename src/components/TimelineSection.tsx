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
    <section ref={ref} className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">Our Journey</p>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight">70+ Years of Excellence</h2>
          <div className="w-12 h-0.5 bg-accent mx-auto mt-3 mb-4" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-10">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12 }}
                className={`relative flex items-start gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-background -translate-x-1.5 mt-1.5 z-10" />

                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8 md:ml-auto"}`}>
                  <span className="text-accent font-heading text-2xl font-bold">{m.year}</span>
                  <h3 className="font-heading text-lg font-bold text-foreground mt-1">{m.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{m.desc}</p>
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
