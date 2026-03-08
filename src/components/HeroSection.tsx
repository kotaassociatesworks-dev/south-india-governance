import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-deep/80" />
      </div>

      {/* Animated 3D background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] border border-gold/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-[400px] h-[400px] border border-gold/5 rounded-full"
        />
        {/* Bottom left orb */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-[350px] h-[350px] border border-gold/8 rounded-full"
        />
        {/* Floating particles */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-3 h-3 bg-gold/20 rounded-full"
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-2 h-2 bg-gold/15 rounded-full"
          animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-gold/10 rounded-full"
          animate={{ y: [0, -40, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Geometric accent shapes */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-20 h-20 border border-gold/10 rotate-45"
          animate={{ rotate: [45, 135, 45], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[25%] right-[15%] w-16 h-16 border border-gold/8"
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Gradient orbs for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-block mb-6 px-5 py-2 border border-gold/40 text-gold font-body text-sm tracking-[0.3em] uppercase animate-pulse-glow"
          >
            Established 1952
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-primary-foreground mb-6"
          >
            Kota Associates —{" "}
            <span className="gradient-text">Trusted Financial Compliance Since 1952</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="font-body text-lg md:text-xl text-primary-foreground/70 mb-12 tracking-wide"
          >
            Delivering Quality and Assured Services Across South India
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/services"
              className="px-8 py-3.5 bg-accent text-accent-foreground font-semibold text-sm tracking-[0.15em] uppercase hover:brightness-110 transition hover:shadow-xl hover:shadow-accent/20"
            >
              Explore Services
            </Link>
            <Link
              to="/portal"
              className="px-8 py-3.5 border border-primary-foreground/30 text-primary-foreground font-semibold text-sm tracking-[0.15em] uppercase hover:bg-primary-foreground/10 transition"
            >
              Client Portal
            </Link>
            <Link
              to="/tools"
              className="px-8 py-3.5 border border-accent/40 text-accent font-semibold text-sm tracking-[0.15em] uppercase hover:bg-accent/10 transition"
            >
              Free Compliance Tools
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-16 bg-gradient-to-b from-gold/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
