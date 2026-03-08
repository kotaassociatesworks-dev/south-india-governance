import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const stories = [
  {
    industry: "Logistics & Transport",
    problem: "Received GST DRC-01 demand notice for ₹12 Lakhs due to ITC discrepancies across multiple state registrations.",
    solution: "Complete ITC reconciliation, detailed reply drafting, and representation before the Superintendent.",
    result: "Demand reduced to ₹78,000 — 93% reduction. No penalty imposed.",
  },
  {
    industry: "Manufacturing",
    problem: "Irregular bookkeeping and 8 months of unfiled GST returns leading to potential registration cancellation.",
    solution: "Full books reconstruction, all pending returns filed, and compliance calendar established.",
    result: "Registration saved. Zero penalties through voluntary compliance program.",
  },
  {
    industry: "Retail Chain",
    problem: "Confusion between composition scheme and regular scheme causing over-payment of GST across 5 outlets.",
    solution: "Scheme analysis, migration to optimal structure, and refund application for excess tax paid.",
    result: "₹4.2 Lakhs refund secured. Annual tax savings of ₹2.8 Lakhs.",
  },
];

const SuccessStoriesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">Case Studies</p>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight">Client Success Stories</h2>
          <div className="w-12 h-0.5 bg-accent mx-auto mt-3 mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">Real results from real clients. See how we solve complex compliance challenges.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stories.map((story, i) => (
            <motion.div
              key={story.industry}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-background border border-border rounded-xl p-7 flex flex-col"
            >
              <Quote className="w-8 h-8 text-accent/30 mb-4" />
              <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-3">{story.industry}</span>
              <div className="space-y-3 flex-1">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Challenge</p>
                  <p className="text-sm text-foreground leading-relaxed">{story.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Our Approach</p>
                  <p className="text-sm text-foreground leading-relaxed">{story.solution}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Result</p>
                <p className="text-sm font-bold text-accent">{story.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
