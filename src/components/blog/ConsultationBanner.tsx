import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, Shield } from "lucide-react";

const whatsappUrl = "https://wa.me/919849847973?text=" + encodeURIComponent("Hi, I need professional assistance with tax compliance.");

const ConsultationBanner = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="border-2 border-accent/30 bg-gradient-to-br from-primary/5 via-background to-accent/5 p-8 lg:p-10 my-10 relative overflow-hidden"
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent"
      animate={{ x: ["-100%", "200%"] }}
      transition={{ duration: 5, repeat: Infinity, repeatDelay: 5 }}
    />
    <div className="relative z-10 text-center">
      <div className="w-14 h-14 bg-accent/10 flex items-center justify-center mx-auto mb-4">
        <Shield className="w-7 h-7 text-accent" />
      </div>
      <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3">
        Need Professional Assistance with GST or Income Tax?
      </h3>
      <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
        GST compliance and tax notices can become complex depending on the situation. Professional assistance ensures proper compliance and avoids unnecessary penalties.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold tracking-wider uppercase"
          >
            <Phone className="w-4 h-4" />
            Contact Kota Associates
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(142,70%,40%)] text-white text-sm font-semibold tracking-wider uppercase"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Consultation
          </a>
        </motion.div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-muted-foreground">
        <span>📞 9052878779</span>
        <span>✉️ kotaassociatesworks@gmail.com</span>
      </div>
    </div>
  </motion.div>
);

export default ConsultationBanner;
