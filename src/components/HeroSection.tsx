import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep animated gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, hsl(210 72% 12%) 0%, hsl(224 64% 25%) 40%, hsl(210 72% 18%) 100%)",
            "linear-gradient(225deg, hsl(210 72% 10%) 0%, hsl(224 64% 28%) 40%, hsl(210 72% 15%) 100%)",
            "linear-gradient(315deg, hsl(224 64% 25%) 0%, hsl(210 72% 12%) 40%, hsl(224 64% 20%) 100%)",
            "linear-gradient(135deg, hsl(210 72% 12%) 0%, hsl(224 64% 25%) 40%, hsl(210 72% 18%) 100%)",
          ],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
        animate={{
          background: [
            "radial-gradient(circle, hsl(46 70% 47% / 0.06) 0%, transparent 70%)",
            "radial-gradient(circle, hsl(46 70% 47% / 0.1) 0%, transparent 70%)",
            "radial-gradient(circle, hsl(46 70% 47% / 0.06) 0%, transparent 70%)",
          ],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
        animate={{
          background: [
            "radial-gradient(circle, hsl(224 64% 33% / 0.15) 0%, transparent 70%)",
            "radial-gradient(circle, hsl(224 64% 45% / 0.2) 0%, transparent 70%)",
            "radial-gradient(circle, hsl(224 64% 33% / 0.15) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(hsl(46 70% 47%) 1px, transparent 1px), linear-gradient(90deg, hsl(46 70% 47%) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[12%] right-[10%] w-40 h-40 border border-gold/10 rounded-2xl"
          animate={{ rotateZ: [0, 90, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[8%] w-24 h-24 border border-gold/8 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[55%] right-[25%] w-3 h-3 bg-gold/30 rounded-full"
          animate={{ y: [0, -40, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[30%] left-[20%] w-2 h-2 bg-gold/20 rounded-full"
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sweeping light */}
        <motion.div
          className="absolute top-0 left-0 w-[2px] h-full"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(46 70% 47% / 0.3), transparent)" }}
          animate={{ x: ["-10%", "110vw"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse-glow" />
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              Established 1952 · 70+ Years of Trust
            </span>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-8 inline-block"
          >
            <div className="relative overflow-hidden inline-block">
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(201, 162, 39, 0.2) 45%, rgba(201, 162, 39, 0.35) 50%, rgba(201, 162, 39, 0.2) 55%, transparent 60%)",
                }}
                animate={{ x: ["-150%", "250%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
              />
              <img
                src={kotaLogoHero}
                alt="Kota Associates - Trusted Financial Compliance Since 1952"
                className="h-20 md:h-28 lg:h-36 xl:h-44 w-auto object-contain relative z-0"
                style={{
                  filter: "drop-shadow(0 4px 20px rgba(201, 162, 39, 0.35)) drop-shadow(0 8px 40px rgba(0, 0, 0, 0.3))",
                }}
              />
            </div>
          </motion.div>

          <h1 className="sr-only">Kota Associates - Trusted Financial Compliance Since 1952</h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="font-heading text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-gold tracking-tight"
          >
            Trusted Financial Compliance Since 1952
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="font-body text-lg md:text-xl text-primary-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Delivering quality and assured compliance, taxation, and advisory services across South India — 7 states, 1000+ clients.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold text-sm tracking-widest uppercase rounded-lg transition-all hover:shadow-lg hover:shadow-accent/25"
              >
                <BarChart3 className="w-4 h-4" />
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/portal"
                className="inline-flex items-center gap-2 px-8 py-4 border border-primary-foreground/25 text-primary-foreground font-semibold text-sm tracking-widest uppercase rounded-lg transition-all hover:bg-primary-foreground/10 hover:border-primary-foreground/40"
              >
                <Shield className="w-4 h-4" />
                Client Portal
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground/10 backdrop-blur text-gold font-bold text-sm tracking-widest uppercase rounded-lg border border-gold/20 transition-all hover:bg-gold/10 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/15"
              >
                <Zap className="w-4 h-4" />
                Free Tools
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {[
              { value: "70+", label: "Years" },
              { value: "7", label: "States" },
              { value: "1000+", label: "Clients" },
              { value: "50+", label: "Partners" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                className="text-center"
              >
                <p className="font-heading text-2xl md:text-3xl font-bold text-gold">{stat.value}</p>
                <p className="text-xs text-primary-foreground/40 uppercase tracking-widest mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
