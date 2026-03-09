import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CTABanner = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-primary relative overflow-hidden">
      {/* Animated mesh */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, hsl(46 70% 47% / 0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, hsl(224 64% 33% / 0.1) 0%, transparent 50%)",
            "radial-gradient(ellipse at 40% 30%, hsl(46 70% 47% / 0.1) 0%, transparent 50%), radial-gradient(ellipse at 60% 70%, hsl(224 64% 33% / 0.15) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 50%, hsl(46 70% 47% / 0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, hsl(224 64% 33% / 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Gold sparkle particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/30"
          style={{ left: `${15 + i * 10}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], y: [0, -20, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-primary-foreground mb-5 tracking-tight">
            Need Expert Tax Advisory?
          </h2>
          <p className="text-primary-foreground/60 text-lg lg:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            From compliance to strategic planning — our team of experts is ready to help your business thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <motion.a
              href="https://wa.me/919052878779?text=I%20need%20tax%20advisory%20services.%20Please%20connect%20me%20with%20an%20advisor."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 font-semibold px-10 py-5 rounded-lg text-sm tracking-[0.15em] uppercase transition-all"
              style={{ background: "linear-gradient(135deg, hsl(46 70% 47%), hsl(46 50% 55%))", color: "hsl(210 72% 10%)", boxShadow: "0 10px 40px -10px hsl(46 70% 47% / 0.4)" }}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle className="w-5 h-5" /> Talk to an Advisor
            </motion.a>
            <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/subscription-plans"
                className="inline-flex items-center justify-center gap-2.5 border border-primary-foreground/20 text-primary-foreground font-semibold px-10 py-5 rounded-lg text-sm tracking-[0.15em] uppercase hover:bg-primary-foreground/8 transition-colors"
              >
                View Plans <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
