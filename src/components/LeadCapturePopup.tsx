import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Calendar, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface LeadCapturePopupProps {
  trigger?: 'result' | 'timer' | 'exit';
  show: boolean;
  onClose: () => void;
  toolName?: string;
}

const LeadCapturePopup = ({ show, onClose, toolName = "this tool" }: LeadCapturePopupProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-border/60 bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* Gold accent bar */}
            <div className="h-1 bg-gradient-to-r from-accent via-accent/80 to-accent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">Expert Advisory</span>
              </div>

              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                Need Professional Help?
              </h3>
              <p className="text-sm text-muted-foreground mb-7 leading-relaxed">
                Our chartered accountants can help you optimize your finances beyond what {toolName} shows. Get personalized strategies from experts with 70+ years of experience.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    background: "linear-gradient(135deg, hsl(46 70% 47%), hsl(46 50% 55%))",
                    color: "hsl(210 72% 10%)",
                  }}
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>

                <Link
                  to="/#contact"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border border-accent/30 text-accent hover:bg-accent/5 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  Book Consultation
                </Link>

                <a
                  href="mailto:info@kotaassociates.com"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email Inquiry
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadCapturePopup;
