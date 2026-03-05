import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-corporate.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Corporate boardroom meeting"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-navy-deep/85" />
      </div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 border border-gold/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-72 h-72 border border-gold/5 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-2 h-2 bg-gold/20 rounded-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-block mb-6 px-4 py-1.5 border border-gold/40 text-gold font-body text-sm tracking-[0.25em] uppercase">
            Established 1952
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-primary-foreground mb-6">
            Kota Associates —{" "}
            <span className="text-gold">Trusted Financial Compliance Since 1952</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-primary-foreground/70 mb-10 tracking-wide">
            Delivering Quality and Assured Services Across South India
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="px-8 py-3.5 bg-accent text-accent-foreground font-semibold text-sm tracking-[0.15em] uppercase hover:brightness-110 transition"
            >
              Explore Services
            </Link>
            <Link
              to="/portal"
              className="px-8 py-3.5 border border-primary-foreground/30 text-primary-foreground font-semibold text-sm tracking-[0.15em] uppercase hover:bg-primary-foreground/10 transition"
            >
              Client Portal
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-gold/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
