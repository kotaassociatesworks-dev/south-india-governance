import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
import { useState } from "react";

const whatsappUrl = "https://wa.me/919052878779?text=" + encodeURIComponent("Hi, can I know about your services?");
const gmailUrl = "mailto:kotaassociatesworks@gmail.com?subject=" + encodeURIComponent("Enquiry About Services") + "&body=" + encodeURIComponent("Hi Kota Associates,\n\nI would like to know about your services.\n\nPlease share the details regarding:\n- Service offerings\n- Pricing\n- Process & timeline\n\nLooking forward to hearing from you.\n\nThank you.");

const FloatingContact = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <>
          <motion.a
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Mail className="w-5 h-5" />
            Gmail Me
          </motion.a>
          <motion.a
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.05 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-[hsl(142,70%,40%)] text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Me
          </motion.a>
        </>
      )}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-xl hover:shadow-2xl transition-all"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default FloatingContact;
