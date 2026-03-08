import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-navy-deep text-primary-foreground relative overflow-hidden">
      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(44 60% 45% / 0.5), transparent)" }}
        animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Subtle background animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 80%, hsl(44 60% 45% / 0.03) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 20%, hsl(44 60% 45% / 0.05) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 80%, hsl(44 60% 45% / 0.03) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3
              className="font-heading text-2xl font-bold mb-4"
              whileHover={{ scale: 1.02 }}
            >
              Kota{" "}
              <motion.span
                className="text-gold"
                animate={{ textShadow: ["0 0 0px hsl(44 60% 45% / 0)", "0 0 15px hsl(44 60% 45% / 0.4)", "0 0 0px hsl(44 60% 45% / 0)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Associates
              </motion.span>
            </motion.h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-4">
              Since 1952, delivering quality and assured financial compliance
              services across South India.
            </p>
            <motion.p
              className="text-xs text-gold tracking-[0.2em] uppercase"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Professional Partnerships Welcome
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Client Portal", href: "/portal" },
                { label: "Contact", href: "/#contact" },
              ].map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <Link
                    to={l.href}
                    className="text-sm text-primary-foreground/60 hover:text-gold transition-colors inline-block"
                  >
                    <motion.span whileHover={{ x: 4 }} className="inline-block">
                      {l.label}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Operating Regions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-heading text-lg font-semibold mb-4">Operating Regions</h4>
            <ul className="space-y-2">
              {[
                "Andhra Pradesh", "Telangana", "Tamil Nadu",
                "Karnataka", "Kerala", "Odisha", "Maharashtra",
              ].map((r, i) => (
                <motion.li
                  key={r}
                  className="text-sm text-primary-foreground/60"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  whileHover={{ x: 4, color: "hsl(44 60% 45%)" }}
                >
                  {r}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: "Gudur, Andhra Pradesh", href: undefined },
                { icon: Phone, text: "+91 90528 78779", href: "tel:+919052878779" },
                { icon: Mail, text: "kotaassociatesworks@gmail.com", href: "mailto:kotaassociatesworks@gmail.com" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3 text-sm text-primary-foreground/60"
                    whileHover={{ x: 4 }}
                  >
                    <motion.div
                      animate={{ color: ["hsl(44 60% 45%)", "hsl(44 45% 65%)", "hsl(44 60% 45%)"] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                    </motion.div>
                    {item.href ? (
                      <a href={item.href} className="hover:text-gold transition-colors">{item.text}</a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Kota Associates. All rights reserved.
          </p>
          <motion.p
            className="text-xs text-primary-foreground/40"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Quality · Assurance · Trust
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;