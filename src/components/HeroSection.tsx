import { motion } from "framer-motion";
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
        <div className="absolute inset-0 bg-navy-deep/80" />
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
            Established 1962
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-primary-foreground mb-6">
            Structured Financial Governance{" "}
            <span className="text-gold">Across South India</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-primary-foreground/70 mb-10 tracking-wide">
            Governance. Compliance. Growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="px-8 py-3.5 bg-accent text-accent-foreground font-semibold text-sm tracking-[0.15em] uppercase hover:brightness-110 transition"
            >
              Book Consultation
            </a>
            <a
              href="#services"
              className="px-8 py-3.5 border border-primary-foreground/30 text-primary-foreground font-semibold text-sm tracking-[0.15em] uppercase hover:bg-primary-foreground/10 transition"
            >
              Our Services
            </a>
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
