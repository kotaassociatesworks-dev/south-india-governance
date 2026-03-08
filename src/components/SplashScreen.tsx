import { motion, AnimatePresence } from "framer-motion";
import splashLogo from "@/assets/splash-logo.png";
import splashScreen from "@/assets/splash-screen.png";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050d18]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onAnimationComplete={() => {
          setTimeout(onComplete, 5000);
        }}
      >
        {/* Phase 1: Logo (0-2.5s) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, times: [0, 0.2, 0.7, 1], ease: "easeInOut" }}
        >
          <motion.img
            src={splashLogo}
            alt="Kota Associates Logo"
            className="w-[300px] md:w-[400px] object-contain"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </motion.div>

        {/* Phase 2: Full splash screen (2.5-5s) */}
        <motion.img
          src={splashScreen}
          alt="Kota Associates"
          className="w-full h-full object-cover absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1] }}
          transition={{ duration: 3, times: [0, 0.83, 1], ease: "easeInOut" }}
        />

        {/* Gold shimmer sweep on phase 2 */}
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
            style={{ background: "linear-gradient(90deg, hsl(44 60% 45%), hsl(44 45% 65%))" }}
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
