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
            {/* Email */}
            <motion.a
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              transition={{ duration: 0.25 }}
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground text-sm font-semibold shadow-lg transition-all rounded-sm"
              whileHover={{ scale: 1.05, x: -5, boxShadow: "0 10px 25px -5px hsl(216 60% 26% / 0.4)" }}
            >
              <Mail className="w-5 h-5" />
              Email Us
            </motion.a>
            {/* Call */}
            <motion.a
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              transition={{ delay: 0.04, duration: 0.25 }}
              href="tel:+919052878779"
              className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground text-sm font-semibold shadow-lg transition-all rounded-sm"
              whileHover={{ scale: 1.05, x: -5, boxShadow: "0 10px 25px -5px hsl(216 60% 26% / 0.4)" }}
            >
              <Phone className="w-5 h-5" />
              Call Now
            </motion.a>
            {/* WhatsApp */}
            <motion.a
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              transition={{ delay: 0.08, duration: 0.25 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 bg-[hsl(142,70%,40%)] text-white text-sm font-semibold shadow-lg transition-all rounded-sm"
              whileHover={{ scale: 1.05, x: -5, boxShadow: "0 10px 25px -5px hsl(142 70% 40% / 0.4)" }}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Chat
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Main WhatsApp FAB */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9, rotate: 15 }}
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full bg-[hsl(142,70%,40%)] text-white flex items-center justify-center shadow-xl transition-all relative"
        animate={{
          boxShadow: [
            "0 4px 15px hsl(142 70% 40% / 0.3)",
            "0 4px 30px hsl(142 70% 40% / 0.5)",
            "0 4px 15px hsl(142 70% 40% / 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Contact options"
      >
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {expanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingContact;
