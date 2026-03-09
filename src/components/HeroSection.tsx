import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 5,
  duration: 6 + Math.random() * 8,
}));

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28">
      {/* Deep animated gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, hsl(210 72% 10%) 0%, hsl(224 64% 22%) 40%, hsl(210 72% 14%) 100%)",
            "linear-gradient(225deg, hsl(210 72% 8%) 0%, hsl(224 64% 26%) 40%, hsl(210 72% 12%) 100%)",
            "linear-gradient(315deg, hsl(224 64% 22%) 0%, hsl(210 72% 10%) 40%, hsl(224 64% 18%) 100%)",
            "linear-gradient(135deg, hsl(210 72% 10%) 0%, hsl(224 64% 22%) 40%, hsl(210 72% 14%) 100%)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 vignette pointer-events-none z-[1]" />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.025] z-[2]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Gold particle field */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, hsl(46 70% 55% / 0.6) 0%, hsl(46 70% 47% / 0) 70%)`,
            }}
            animate={{
              y: [0, -60 - Math.random() * 40, 0],
              x: [0, (Math.random() - 0.5) * 30, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full blur-[150px] z-[2]"
        animate={{
          background: [
            "radial-gradient(circle, hsl(46 70% 47% / 0.06) 0%, transparent 70%)",
            "radial-gradient(circle, hsl(46 70% 47% / 0.12) 0%, transparent 70%)",
            "radial-gradient(circle, hsl(46 70% 47% / 0.06) 0%, transparent 70%)",
          ],
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] z-[2]"
        animate={{
          background: [
            "radial-gradient(circle, hsl(224 64% 33% / 0.12) 0%, transparent 70%)",
            "radial-gradient(circle, hsl(224 64% 45% / 0.2) 0%, transparent 70%)",
            "radial-gradient(circle, hsl(224 64% 33% / 0.12) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-[2]"
        style={{
          backgroundImage: "linear-gradient(hsl(46 70% 47%) 1px, transparent 1px), linear-gradient(90deg, hsl(46 70% 47%) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
        <motion.div
          className="absolute top-[12%] right-[10%] w-48 h-48 border border-gold/8 rounded-2xl"
          animate={{ rotateZ: [0, 90, 0], y: [0, -25, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[8%] w-28 h-28 border border-gold/6 rounded-full"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Watermark monogram */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-heading font-extrabold text-gold/[0.02] select-none pointer-events-none"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          K
        </motion.div>

        {/* Sweeping light */}
        <motion.div
          className="absolute top-0 left-0 w-[2px] h-full"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(46 70% 47% / 0.25), transparent)" }}
          animate={{ x: ["-10%", "110vw"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Gold line above headline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] mx-auto mb-8 overflow-hidden"
            style={{ background: "linear-gradient(90deg, transparent, hsl(46 70% 47%), transparent)" }}
          />

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-primary-foreground mb-6 tracking-tight leading-[1.05]"
          >
            Kota Associates
          </motion.h1>

          {/* Gold line below headline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] mx-auto mb-8 overflow-hidden"
            style={{ background: "linear-gradient(90deg, transparent, hsl(46 70% 47%), transparent)" }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-xl md:text-2xl lg:text-3xl font-semibold mb-5 text-gold tracking-tight"
          >
            Trusted Financial Compliance Since 1952
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-lg md:text-xl text-primary-foreground/55 mb-14 max-w-2xl mx-auto leading-relaxed"
          >
            Delivering quality and assured compliance, taxation, and advisory services across South India — 7 states, 1000+ clients.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-5 justify-center mb-20"
          >
            <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2.5 px-10 py-5 font-semibold text-sm tracking-[0.15em] uppercase rounded-lg transition-all"
                style={{
                  background: "linear-gradient(135deg, hsl(46 70% 47%), hsl(46 50% 55%))",
                  color: "hsl(210 72% 10%)",
                  boxShadow: "0 10px 40px -10px hsl(46 70% 47% / 0.4)",
                }}
              >
                <BarChart3 className="w-4 h-4" />
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/portal"
                className="inline-flex items-center gap-2.5 px-10 py-5 border border-primary-foreground/20 text-primary-foreground font-semibold text-sm tracking-[0.15em] uppercase rounded-lg transition-all hover:bg-primary-foreground/8 hover:border-primary-foreground/35 backdrop-blur-sm"
              >
                <Shield className="w-4 h-4" />
                Client Portal
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.06, y: -4 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/tools"
                className="inline-flex items-center gap-2.5 px-10 py-5 bg-primary-foreground/8 backdrop-blur-md text-gold font-bold text-sm tracking-[0.15em] uppercase rounded-lg border border-gold/20 transition-all hover:bg-gold/10 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/15"
              >
                <Zap className="w-4 h-4" />
                Free Tools
              </Link>
            </motion.div>
          </motion.div>

          {/* Animated counter stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-10 md:gap-16"
          >
            {[
              { target: 70, suffix: "+", label: "Years" },
              { target: 7, suffix: "", label: "States" },
              { target: 1000, suffix: "+", label: "Clients" },
              { target: 50, suffix: "+", label: "Partners" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.12 }}
                className="text-center group"
              >
                <p className="font-heading text-3xl md:text-4xl font-bold text-gold">
                  <CountUp target={stat.target} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-primary-foreground/35 uppercase tracking-[0.25em] mt-2 group-hover:text-primary-foreground/50 transition-colors">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-px h-14 bg-gradient-to-b from-gold/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
