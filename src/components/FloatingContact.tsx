import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Mail, X } from "lucide-react";
import { useState } from "react";

const whatsappUrl = "https://wa.me/919052878779?text=" + encodeURIComponent("Hello, I would like to inquire about taxation and compliance services.");
const gmailUrl = "mailto:kotaassociatesworks@gmail.com?subject=" + encodeURIComponent("Enquiry About Services") + "&body=" + encodeURIComponent("Hi Kota Associates,\n\nI would like to know about your services.\n\nPlease share the details regarding:\n- Service offerings\n- Pricing\n- Process & timeline\n\nLooking forward to hearing from you.\n\nThank you.");

const FloatingContact = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {expanded && (
          <>
            <motion.a
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              transition={{ duration: 0.25 }}
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl backdrop-blur-xl transition-all"
              style={{ boxShadow: "0 10px 30px -5px hsl(210 72% 15% / 0.3)" }}
              whileHover={{ scale: 1.05, x: -5 }}
            >
              <Mail className="w-5 h-5" /> Email Us
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              transition={{ delay: 0.04, duration: 0.25 }}
              href="tel:+919052878779"
              className="flex items-center gap-2.5 px-5 py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl backdrop-blur-xl transition-all"
              style={{ boxShadow: "0 10px 30px -5px hsl(210 72% 15% / 0.3)" }}
              whileHover={{ scale: 1.05, x: -5 }}
            >
              <Phone className="w-5 h-5" /> Call Now
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              transition={{ delay: 0.08, duration: 0.25 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-3.5 text-primary-foreground text-sm font-semibold rounded-xl backdrop-blur-xl transition-all"
              style={{ background: "hsl(142 70% 40%)", boxShadow: "0 10px 30px -5px hsl(142 70% 40% / 0.3)" }}
              whileHover={{ scale: 1.05, x: -5 }}
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Premium glass FAB */}
      <div className="relative">
        {/* Ring pulse */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "hsl(142 70% 40% / 0.2)" }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setExpanded(!expanded)}
          className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-primary-foreground transition-all backdrop-blur-md"
          style={{
            background: "linear-gradient(135deg, hsl(142 70% 40%), hsl(142 60% 35%))",
            boxShadow: "0 8px 30px -5px hsl(142 70% 40% / 0.4)",
          }}
          aria-label="Contact options"
        >
          <motion.div animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.3 }}>
            {expanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingContact;
