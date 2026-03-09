import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calculator, Shield, TrendingUp, Scale } from "lucide-react";

const teams = [
  {
    icon: Calculator,
    title: "Tax Experts",
    count: "15+",
    desc: "Seasoned professionals specializing in direct and indirect taxation across multiple jurisdictions.",
    specialties: ["GST Advisory", "Income Tax", "Tax Planning"],
  },
  {
    icon: Shield,
    title: "Compliance Specialists",
    count: "12+",
    desc: "Dedicated specialists ensuring end-to-end regulatory compliance for businesses of all sizes.",
    specialties: ["GST Filing", "TDS Compliance", "Audit Support"],
  },
  {
    icon: TrendingUp,
    title: "Financial Advisors",
    count: "10+",
    desc: "Expert advisors providing strategic financial guidance and business structuring services.",
    specialties: ["Business Planning", "Financial Statements", "Bookkeeping"],
  },
  {
    icon: Scale,
    title: "Legal Consultants",
    count: "8+",
    desc: "Experienced consultants handling tax disputes, notice replies, and appellate representation.",
    specialties: ["Notice Defense", "Litigation", "Dispute Resolution"],
  },
];

const TeamExpertiseSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">Our People</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Team Expertise
          </h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A multidisciplinary team of 50+ professionals delivering excellence across tax, compliance, and advisory domains.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {teams.map((team, i) => {
            const Icon = team.icon;
            return (
              <motion.div
                key={team.title}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="bg-secondary border border-border rounded-xl p-7 hover:border-accent/40 hover:shadow-lg transition-all group text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <p className="font-heading text-3xl font-bold text-accent mb-1">{team.count}</p>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">{team.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{team.desc}</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {team.specialties.map((s) => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamExpertiseSection;
