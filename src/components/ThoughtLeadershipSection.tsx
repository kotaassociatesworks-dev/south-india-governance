import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, BookOpen, Scale, BarChart3 } from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    tag: "GST Updates",
    title: "Key Changes in GST Return Filing for FY 2025-26",
    excerpt: "Understanding the latest amendments in GSTR-1 and GSTR-3B filing requirements and their impact on businesses.",
    href: "/blog",
  },
  {
    icon: BookOpen,
    tag: "Tax Strategy",
    title: "Optimizing ITC Claims: A Strategic Guide for MSMEs",
    excerpt: "How small and medium enterprises can maximize Input Tax Credit while maintaining full compliance.",
    href: "/blog",
  },
  {
    icon: Scale,
    tag: "Regulatory Insight",
    title: "Navigating Multi-State GST Compliance Across South India",
    excerpt: "A comprehensive overview of state-specific GST regulations and how to ensure seamless compliance.",
    href: "/industry-guides",
  },
  {
    icon: BarChart3,
    tag: "Compliance Trends",
    title: "The Rise of Digital Compliance: What Businesses Must Know",
    excerpt: "How technology is transforming tax compliance and what forward-thinking businesses are doing to stay ahead.",
    href: "/blog",
  },
];

const ThoughtLeadershipSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">Insights</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Thought Leadership
          </h2>
          <div className="section-divider mt-4 mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Expert perspectives on tax strategy, compliance, and regulatory developments shaping businesses across India.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {insights.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={item.href}
                  className="block bg-background border border-border rounded-xl p-8 hover:border-accent/40 hover:shadow-lg transition-all group h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-xs font-semibold tracking-widest uppercase text-accent">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Read More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold text-sm tracking-widest uppercase rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
          >
            View All Insights <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ThoughtLeadershipSection;
