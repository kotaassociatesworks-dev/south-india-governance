import { motion, AnimatePresence } from "framer-motion";
import splashLogo from "@/assets/splash-logo.png";
import splashScreen from "@/assets/splash-screen.png";

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 30 + Math.random() * 40,
  y: 30 + Math.random() * 40,
  delay: 3.5 + Math.random() * 1,
}));

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050d18]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={() => { setTimeout(onComplete, 5000); }}
      >
        {/* Phase 1: Logo (0-2.5s) */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, times: [0, 0.2, 0.7, 1], ease: "easeInOut" }}
        >
          <motion.img
            src={splashLogo}
            alt="Kota Associates Logo"
            className="w-[300px] md:w-[400px] object-contain"
            initial={{ scale: 0.85, filter: "blur(10px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Tagline reveal */}
          <motion.p
            className="text-xs tracking-[0.5em] uppercase font-medium"
            style={{ color: "hsl(46 70% 47% / 0.6)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0.8, 0.8, 0] }}
            transition={{ duration: 2.5, times: [0, 0.3, 0.7, 1] }}
          >
            Quality · Assurance · Trust
          </motion.p>
        </motion.div>

        {/* Phase 2: Full splash screen (2.5-5s) */}
        <motion.img
          src={splashScreen}
          alt="Kota Associates"
          className="w-full h-full object-cover absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: [0, 0, 1], scale: [1.05, 1.05, 1] }}
          transition={{ duration: 3.5, times: [0, 0.71, 1], ease: "easeInOut" }}
        />

        {/* Particle burst on phase 2 */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 rounded-full"
            style={{ left: `${p.x}%`, top: `${p.y}%`, background: "hsl(46 70% 55% / 0.6)" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0, 0.8, 0], scale: [0, 0, 1.5, 0], y: [0, 0, -30 - Math.random() * 20] }}
            transition={{ duration: 4, times: [0, 0.7, 0.85, 1], delay: p.delay - 3.5 }}
          />
        ))}

        {/* Gold shimmer sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, hsl(44 60% 45% / 0.15) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["-100% 0%", "200% 0%"] }}
          transition={{ duration: 1.5, delay: 3, ease: "easeInOut" }}
        />

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5 z-10">
          <motion.div
            className="h-full"
            style={{ background: "linear-gradient(90deg, hsl(46 70% 47%), hsl(46 50% 62%))" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
