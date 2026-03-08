import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import aboutImg from "@/assets/kota_associates.png";

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
    <section id="about" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <img
              src={aboutImg}
              alt="Kota Associates office"
              className="w-full aspect-[4/3] object-cover rounded-lg"
              loading="lazy"
            />
            {/* Year badge */}
            <motion.div
              className="absolute -bottom-5 -right-5 bg-primary p-6 lg:p-8 rounded-lg hidden md:block shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <p className="font-heading text-2xl font-bold text-primary-foreground">Since</p>
              <p className="font-heading text-5xl font-extrabold text-gold">1952</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">
              About Us
            </p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              A Legacy of Financial Governance &{" "}
              <span className="gradient-text">Compliance Excellence</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {[
                "Founded in 1952, Kota Associates has evolved from a regional taxation practice in Gudur to become one of South India's most trusted financial compliance firms — operating across Andhra Pradesh, Telangana, Tamil Nadu, Karnataka, Kerala, Odisha, and Maharashtra.",
                "With decades of professional experience, we are a structured financial governance partner, working alongside businesses to build compliance frameworks, optimise tax positions, and drive sustainable growth.",
                "We actively welcome partnerships with CA firms, independent practitioners, and financial advisory businesses seeking a reliable multi-state compliance backbone.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.1, duration: 0.4 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-border"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -3, transition: { duration: 0.2 } }}
            >
              <p className="font-heading text-4xl lg:text-5xl font-extrabold text-accent">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-2 tracking-widest uppercase">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
