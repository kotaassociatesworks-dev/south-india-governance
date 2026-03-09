import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calculator, Shield, TrendingUp, Scale } from "lucide-react";

const teams = [
  {
    icon: Calculator, title: "Tax Experts", count: "15+",
    desc: "Seasoned professionals specializing in direct and indirect taxation across multiple jurisdictions.",
    specialties: ["GST Advisory", "Income Tax", "Tax Planning"],
  },
  {
    icon: Shield, title: "Compliance Specialists", count: "12+",
    desc: "Dedicated specialists ensuring end-to-end regulatory compliance for businesses of all sizes.",
    specialties: ["GST Filing", "TDS Compliance", "Audit Support"],
  },
  {
    icon: TrendingUp, title: "Financial Advisors", count: "10+",
    desc: "Expert advisors providing strategic financial guidance and business structuring services.",
    specialties: ["Business Planning", "Financial Statements", "Bookkeeping"],
  },
  {
    icon: Scale, title: "Legal Consultants", count: "8+",
    desc: "Experienced consultants handling tax disputes, notice replies, and appellate representation.",
    specialties: ["Notice Defense", "Litigation", "Dispute Resolution"],
  },
];

const TeamExpertiseSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 lg:py-40 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-4">Our People</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">Team Expertise</h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A multidisciplinary team of 50+ professionals delivering excellence across tax, compliance, and advisory domains.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 max-w-6xl mx-auto">
          {teams.map((team, i) => {
            const Icon = team.icon;
            return (
              <motion.div
                key={team.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="premium-card p-8 text-center relative overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
                
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5 relative">
                  {/* Ring */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="30" fill="none" stroke="hsl(46 70% 47% / 0.15)" strokeWidth="2" />
                    <motion.circle
                      cx="32" cy="32" r="30" fill="none" stroke="hsl(46 70% 47% / 0.5)" strokeWidth="2"
                      strokeDasharray="188.5"
                      initial={{ strokeDashoffset: 188.5 }}
                      animate={inView ? { strokeDashoffset: 188.5 * (1 - (parseInt(team.count) / 20)) } : {}}
                      transition={{ delay: 0.5 + i * 0.15, duration: 1.2, ease: "easeOut" }}
                      strokeLinecap="round"
                      transform="rotate(-90 32 32)"
                    />
                  </svg>
                  <Icon className="w-7 h-7 text-accent relative z-10" />
                </div>
                <p className="font-heading text-3xl font-bold text-accent mb-1">{team.count}</p>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">{team.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{team.desc}</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {team.specialties.map((s, si) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + i * 0.1 + si * 0.05 }}
                      className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent font-medium"
                    >
                      {s}
                    </motion.span>
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
