import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.2 + i * 0.02,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const AnimatedText = ({ text, className }: { text: string; className?: string }) => (
  <span className={className} style={{ perspective: "1000px", display: "inline-block" }}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        custom={i}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "inline-block", transformOrigin: "bottom" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, hsl(214 65% 12%) 0%, hsl(216 60% 26%) 50%, hsl(214 65% 14%) 100%)",
            "linear-gradient(225deg, hsl(214 65% 10%) 0%, hsl(220 55% 20%) 50%, hsl(216 60% 26%) 100%)",
            "linear-gradient(315deg, hsl(216 60% 26%) 0%, hsl(214 65% 12%) 50%, hsl(220 50% 18%) 100%)",
            "linear-gradient(135deg, hsl(214 65% 12%) 0%, hsl(216 60% 26%) 50%, hsl(214 65% 14%) 100%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Color shifting overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, hsl(44 60% 45% / 0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse at 80% 30%, hsl(44 60% 45% / 0.12) 0%, transparent 60%)",
            "radial-gradient(ellipse at 50% 80%, hsl(44 60% 45% / 0.06) 0%, transparent 60%)",
            "radial-gradient(ellipse at 20% 50%, hsl(44 60% 45% / 0.08) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: "1200px" }}>
        {/* 3D Rotating cube wireframe */}
        <motion.div
          className="absolute top-[15%] right-[12%] w-32 h-32 border border-gold/15"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [0, 180],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[15%] right-[12%] w-32 h-32 border border-gold/10"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateX: [0, -360],
            rotateY: [180, -180],
            rotateZ: [90, -90],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* 3D Rotating rings */}
        <motion.div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] border border-gold/10 rounded-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: [0, 30, 0], rotateY: [0, 360], rotateZ: [0, 15, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] border border-gold/8 rounded-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: [20, -20, 20], rotateY: [-360, 0], rotateZ: [-10, 10, -10] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* 3D floating diamond */}
        <motion.div
          className="absolute top-[60%] left-[8%] w-16 h-16 border border-gold/20"
          style={{ transformStyle: "preserve-3d", transformOrigin: "center" }}
          animate={{
            rotateX: [45, 225, 45],
            rotateY: [45, 225, 45],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Pulsing color orbs */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl"
          animate={{
            background: [
              "radial-gradient(circle, hsl(44 60% 45% / 0.04) 0%, transparent 70%)",
              "radial-gradient(circle, hsl(44 60% 45% / 0.08) 0%, transparent 70%)",
              "radial-gradient(circle, hsl(44 60% 45% / 0.04) 0%, transparent 70%)",
            ],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl"
          animate={{
            background: [
              "radial-gradient(circle, hsl(216 60% 26% / 0.15) 0%, transparent 70%)",
              "radial-gradient(circle, hsl(216 60% 40% / 0.2) 0%, transparent 70%)",
              "radial-gradient(circle, hsl(216 60% 26% / 0.15) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating color particles */}
        {[
          { top: "20%", left: "25%", size: 4, delay: 0, dur: 6, color: "gold" },
          { top: "35%", left: "70%", size: 3, delay: 1, dur: 7, color: "gold" },
          { top: "70%", left: "30%", size: 5, delay: 2, dur: 8, color: "gold" },
          { top: "50%", left: "85%", size: 3, delay: 0.5, dur: 5, color: "primary" },
          { top: "15%", left: "60%", size: 2, delay: 1.5, dur: 9, color: "gold" },
          { top: "80%", left: "65%", size: 4, delay: 3, dur: 6, color: "primary" },
        ].map((p, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${p.color === "gold" ? "bg-gold/25" : "bg-primary/20"}`}
            style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
            animate={{
              y: [0, -40, 0],
              x: [0, 15, -15, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.8, 1],
            }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Animated grid lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(44 60% 45% / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(44 60% 45% / 0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sweeping light streak */}
        <motion.div
          className="absolute top-0 left-0 w-[2px] h-full"
          style={{
            background: "linear-gradient(to bottom, transparent, hsl(44 60% 45% / 0.3), transparent)",
          }}
          animate={{ x: ["-10%", "110vw"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge with shimmer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: -40 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: "800px" }}
            className="inline-block mb-6 px-5 py-2 border border-gold/40 text-gold font-body text-sm tracking-[0.3em] uppercase animate-pulse-glow relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            Established 1952
          </motion.div>

          {/* 3D Letter-by-letter headline */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-primary-foreground mb-6"
            style={{ perspective: "1000px" }}
          >
            <AnimatedText text="Kota Associates" className="block mb-2" />
            <motion.span
              className="gradient-text animate-shimmer inline-block"
              style={{
                backgroundSize: "200% auto",
                background: "linear-gradient(90deg, hsl(44 60% 45%), hsl(44 45% 65%), hsl(44 60% 50%), hsl(44 60% 45%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              initial={{ opacity: 0, y: 30, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Trusted Financial Compliance Since 1952
            </motion.span>
          </motion.h1>

          {/* Subtitle with typewriter-like reveal */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="font-body text-lg md:text-xl text-primary-foreground/70 mb-12 tracking-wide"
          >
            Delivering Quality and Assured Services Across South India
          </motion.p>

          {/* CTA buttons with 3D hover */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/services"
                className="block px-8 py-3.5 bg-accent text-accent-foreground font-semibold text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-xl hover:shadow-accent/30"
              >
                Explore Services
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/portal"
                className="block px-8 py-3.5 border border-primary-foreground/30 text-primary-foreground font-semibold text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
              >
                Client Portal
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/tools"
                className="block px-8 py-3.5 border border-accent/40 text-accent font-semibold text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-accent/10 hover:border-accent/60"
              >
                Free Compliance Tools
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator with color pulse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 8, 0],
              boxShadow: [
                "0 0 8px hsl(44 60% 45% / 0.2)",
                "0 0 20px hsl(44 60% 45% / 0.5)",
                "0 0 8px hsl(44 60% 45% / 0.2)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-16 bg-gradient-to-b from-gold/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;