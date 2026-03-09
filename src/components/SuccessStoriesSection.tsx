import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const stories = [
  {
    industry: "Logistics & Transport",
    problem: "Received GST DRC-01 demand notice for ₹12 Lakhs due to ITC discrepancies across multiple state registrations.",
    solution: "Complete ITC reconciliation, detailed reply drafting, and representation before the Superintendent.",
    result: "93% reduction",
    resultDetail: "Demand reduced to ₹78,000. No penalty imposed.",
  },
  {
    industry: "Manufacturing",
    problem: "Irregular bookkeeping and 8 months of unfiled GST returns leading to potential registration cancellation.",
    solution: "Full books reconstruction, all pending returns filed, and compliance calendar established.",
    result: "Zero penalties",
    resultDetail: "Registration saved through voluntary compliance program.",
  },
  {
    industry: "Retail Chain",
    problem: "Confusion between composition scheme and regular scheme causing over-payment of GST across 5 outlets.",
    solution: "Scheme analysis, migration to optimal structure, and refund application for excess tax paid.",
    result: "₹4.2L refund",
    resultDetail: "Annual tax savings of ₹2.8 Lakhs secured.",
  },
];

const SuccessStoriesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 lg:py-40 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-4">Case Studies</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">Client Success Stories</h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Real results from real clients. See how we solve complex compliance challenges.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7 max-w-6xl mx-auto">
          {stories.map((story, i) => (
            <motion.div
              key={story.industry}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="premium-card p-8 flex flex-col relative overflow-hidden"
            >
              {/* Gradient accent border */}
              <div className="absolute top-0 left-0 w-[3px] h-full" style={{ background: "linear-gradient(to bottom, hsl(46 70% 47%), hsl(46 50% 62%), transparent)" }} />
              
              {/* Gold quote mark */}
              <span className="text-6xl font-heading font-bold text-accent/10 absolute top-4 right-6 leading-none">"</span>
              
              <span className="text-xs font-semibold text-accent tracking-[0.2em] uppercase mb-4">{story.industry}</span>
              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 tracking-widest">Challenge</p>
                  <p className="text-sm text-foreground leading-relaxed">{story.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 tracking-widest">Our Approach</p>
                  <p className="text-sm text-foreground leading-relaxed">{story.solution}</p>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-border">
                <p className="font-heading text-2xl font-bold text-accent mb-1">{story.result}</p>
                <p className="text-xs text-muted-foreground">{story.resultDetail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
