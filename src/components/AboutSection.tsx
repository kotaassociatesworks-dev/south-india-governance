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
      {/* Animated background color wash */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 0% 50%, hsl(44 60% 45% / 0.04) 0%, transparent 50%)",
            "radial-gradient(ellipse at 100% 50%, hsl(44 60% 45% / 0.06) 0%, transparent 50%)",
            "radial-gradient(ellipse at 0% 50%, hsl(44 60% 45% / 0.04) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 right-20 w-24 h-24 border border-accent/10"
        animate={{ rotate: [0, 90, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 border border-primary/10 rounded-full"
        animate={{ y: [0, -20, 0], rotate: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: -15 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotateY: 5, scale: 1.02, transition: { duration: 0.3 } }}
            className="relative"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <img
              src={aboutImg}
              alt="South India corporate landscape"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 border-2 border-accent/0"
              animate={{ borderColor: ["hsl(44 60% 45% / 0)", "hsl(44 60% 45% / 0.3)", "hsl(44 60% 45% / 0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-6 -right-6 bg-primary p-6 lg:p-8 hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <p className="font-heading text-3xl font-bold text-primary-foreground">Since</p>
              <motion.p
                className="font-heading text-5xl font-bold text-gold"
                animate={{ textShadow: ["0 0 10px hsl(44 60% 45% / 0.3)", "0 0 30px hsl(44 60% 45% / 0.6)", "0 0 10px hsl(44 60% 45% / 0.3)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                1952
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Content with staggered text reveal */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.p
              className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              About Us
            </motion.p>
            <motion.h2
              className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              A Legacy of Financial Governance &{" "}
              <motion.span
                className="gradient-text"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ backgroundSize: "200% auto" }}
              >
                Compliance Excellence
              </motion.span>
            </motion.h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed font-body">
              {[
                "Founded in 1952, Kota Associates has evolved from a regional taxation practice in Gudur to become one of South India's most trusted financial compliance firms — operating across Andhra Pradesh, Telangana, Tamil Nadu, Karnataka, Kerala, Odisha, and Maharashtra.",
                "With decades of professional experience, we are a structured financial governance partner, working alongside businesses to build compliance frameworks, optimise tax positions, and drive sustainable growth through disciplined financial management.",
                "We actively welcome partnerships with CA firms, independent practitioners, and financial advisory businesses seeking a reliable multi-state compliance backbone.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats with counting animation and color pulse */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-border"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -5, transition: { duration: 0.2 } }}
            >
              <motion.p
                className="font-heading text-4xl lg:text-5xl font-bold text-primary"
                animate={inView ? {
                  color: ["hsl(216 60% 26%)", "hsl(44 60% 45%)", "hsl(216 60% 26%)"],
                } : {}}
                transition={{ delay: 1 + i * 0.2, duration: 2, repeat: 1 }}
              >
                {s.value}
              </motion.p>
              <p className="text-sm text-muted-foreground mt-2 tracking-wide uppercase">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;