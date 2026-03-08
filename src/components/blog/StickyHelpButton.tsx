import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, MessageCircle, Phone, Send, X } from "lucide-react";

const whatsappUrl = "https://wa.me/919052878779?text=" + encodeURIComponent("Hello, I would like to inquire about taxation and compliance services.");

const StickyHelpButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-3 bg-background border border-border shadow-2xl p-4 w-56"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-foreground">Need Help?</span>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-[hsl(142,70%,40%)] text-white text-sm font-semibold transition-all hover:opacity-90"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Chat
              </a>
               <a
                 href="tel:+919849847973"
                 className="flex items-center gap-2 p-3 bg-primary text-primary-foreground text-sm font-semibold transition-all hover:opacity-90"
               >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href="mailto:kotaassociatesworks@gmail.com?subject=Tax%20Query"
                className="flex items-center gap-2 p-3 bg-accent text-accent-foreground text-sm font-semibold transition-all hover:opacity-90"
              >
                <Send className="w-4 h-4" />
                Send Query
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground text-xs font-bold tracking-wider uppercase shadow-lg"
        animate={{
          boxShadow: [
            "0 4px 15px hsl(44 60% 45% / 0.2)",
            "0 4px 25px hsl(44 60% 45% / 0.4)",
            "0 4px 15px hsl(44 60% 45% / 0.2)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <HelpCircle className="w-4 h-4" />
        Need Help With GST?
      </motion.button>
    </div>
  );
};

export default StickyHelpButton;
