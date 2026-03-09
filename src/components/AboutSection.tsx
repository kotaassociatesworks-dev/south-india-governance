import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import aboutImg from "@/assets/kota_associates.png";

const stats = [
  { value: 70, suffix: "+", label: "Years of Legacy" },
  { value: 7, suffix: "", label: "States Covered" },
  { value: 1000, suffix: "+", label: "Clients Served" },
  { value: 50, suffix: "+", label: "Professional Partners" },
];

const StatCounter = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(value / 80);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <>{count}{suffix}</>;
};

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 lg:py-40 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image with parallax feel */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-xl">
              <motion.img
                src={aboutImg}
                alt="Kota Associates office"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
            </div>
            {/* Year badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-primary p-7 lg:p-9 rounded-xl hidden md:block"
              style={{ boxShadow: "0 25px 60px -15px hsl(210 72% 15% / 0.4)" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="font-heading text-xl font-bold text-primary-foreground">Since</p>
              <p className="font-heading text-5xl font-extrabold text-gold">1952</p>
            </motion.div>
            {/* Gold accent line */}
            <motion.div
              className="absolute -left-4 top-8 bottom-8 w-[3px] rounded-full hidden lg:block"
              style={{ background: "linear-gradient(to bottom, transparent, hsl(46 70% 47%), transparent)" }}
              initial={{ height: 0, opacity: 0 }}
              animate={inView ? { height: "auto", opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-4">About Us</p>
            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-8 leading-tight tracking-tight">
              A Legacy of Financial Governance &{" "}
              <span className="gradient-text">Compliance Excellence</span>
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
              {[
                "Founded in 1952, Kota Associates has evolved from a regional taxation practice in Gudur to become one of South India's most trusted financial compliance firms — operating across Andhra Pradesh, Telangana, Tamil Nadu, Karnataka, Kerala, Odisha, and Maharashtra.",
                "With decades of professional experience, we are a structured financial governance partner, working alongside businesses to build compliance frameworks, optimise tax positions, and drive sustainable growth.",
                "We actively welcome partnerships with CA firms, independent practitioners, and financial advisory businesses seeking a reliable multi-state compliance backbone.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
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
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 pt-14"
        >
          <div className="col-span-full mb-2">
            <div className="gold-line w-full max-w-md mx-auto" />
          </div>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center glass-card rounded-xl p-6"
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <p className="font-heading text-4xl lg:text-5xl font-extrabold text-accent">
                <StatCounter value={s.value} suffix={s.suffix} inView={inView} />
              </p>
              <p className="text-sm text-muted-foreground mt-2 tracking-widest uppercase">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
