import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, BookOpen, Scale, BarChart3 } from "lucide-react";

const insights = [
  {
    icon: TrendingUp, tag: "GST Updates", title: "Key Changes in GST Return Filing for FY 2025-26",
    excerpt: "Understanding the latest amendments in GSTR-1 and GSTR-3B filing requirements and their impact on businesses.",
    href: "/blog", readTime: "5 min read", date: "Mar 2026",
  },
  {
    icon: BookOpen, tag: "Tax Strategy", title: "Optimizing ITC Claims: A Strategic Guide for MSMEs",
    excerpt: "How small and medium enterprises can maximize Input Tax Credit while maintaining full compliance.",
    href: "/blog", readTime: "8 min read", date: "Feb 2026",
  },
  {
    icon: Scale, tag: "Regulatory Insight", title: "Navigating Multi-State GST Compliance Across South India",
    excerpt: "A comprehensive overview of state-specific GST regulations and how to ensure seamless compliance.",
    href: "/industry-guides", readTime: "6 min read", date: "Feb 2026",
  },
  {
    icon: BarChart3, tag: "Compliance Trends", title: "The Rise of Digital Compliance: What Businesses Must Know",
    excerpt: "How technology is transforming tax compliance and what forward-thinking businesses are doing to stay ahead.",
    href: "/blog", readTime: "7 min read", date: "Jan 2026",
  },
];

const ThoughtLeadershipSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 lg:py-40 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-4">Insights</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">Thought Leadership</h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Expert perspectives on tax strategy, compliance, and regulatory developments shaping businesses across India.
          </p>
        </motion.div>

        {/* Magazine layout: first card hero, rest grid */}
        <div className="max-w-6xl mx-auto space-y-7">
          {/* Hero article */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <Link
              to={insights[0].href}
              className="premium-card block p-10 lg:p-12 group relative overflow-hidden"
            >
              {/* Gradient placeholder */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ background: "linear-gradient(135deg, hsl(46 70% 47%), hsl(224 64% 33%))" }} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">{insights[0].tag}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{insights[0].date} · {insights[0].readTime}</span>
                </div>
                <h3 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors leading-snug">
                  {insights[0].title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-3xl mb-5">{insights[0].excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Read More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Grid articles */}
          <div className="grid md:grid-cols-3 gap-7">
            {insights.slice(1).map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className="premium-card block p-8 group h-full"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">{item.tag}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mb-3">{item.date} · {item.readTime}</p>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Read More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-semibold text-sm tracking-[0.15em] uppercase rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
          >
            View All Insights <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ThoughtLeadershipSection;
