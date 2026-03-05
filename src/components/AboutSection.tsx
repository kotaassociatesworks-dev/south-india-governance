import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import aboutImg from "@/assets/about-cityscape.jpg";

const stats = [
  { value: "70+", label: "Years of Legacy" },
  { value: "7", label: "States Covered" },
  { value: "1000+", label: "Clients Served" },
  { value: "50+", label: "Professional Partners" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src={aboutImg}
              alt="South India corporate landscape"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary p-6 lg:p-8 hidden md:block">
              <p className="font-heading text-3xl font-bold text-primary-foreground">Since</p>
              <p className="font-heading text-5xl font-bold text-gold">1952</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">
              About Us
            </p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
              A Legacy of Financial Governance & Compliance Excellence
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed font-body">
              <p>
                Founded in 1952, Kota Associates has evolved from a regional taxation practice in
                Gudur to become one of South India's most trusted financial compliance
                firms — operating across Andhra Pradesh, Telangana, Tamil Nadu,
                Karnataka, Kerala, Odisha, and Maharashtra.
              </p>
              <p>
                With decades of professional experience, we are a structured
                financial governance partner, working alongside businesses to build
                compliance frameworks, optimise tax positions, and drive sustainable
                growth through disciplined financial management.
              </p>
              <p>
                We actively welcome partnerships with CA firms, independent
                practitioners, and financial advisory businesses seeking a reliable
                multi-state compliance backbone.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-border"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-4xl lg:text-5xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-2 tracking-wide uppercase">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
