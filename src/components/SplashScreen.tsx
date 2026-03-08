import { motion, AnimatePresence } from "framer-motion";
import splashImg from "@/assets/splash-screen.png";

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
        {/* Background image */}
        <motion.img
          src={splashImg}
          alt="Kota Associates"
          className="w-full h-full object-cover absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Gold shimmer sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, hsl(44 60% 45% / 0.15) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["-100% 0%", "200% 0%"] }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5">
          <motion.div
            className="h-full"
            style={{ background: "linear-gradient(90deg, hsl(44 60% 45%), hsl(44 45% 65%))" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;