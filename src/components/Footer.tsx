import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Top accent line */}
      <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4">
              Kota <span className="text-gold">Associates</span>
            </h3>
            <p className="text-primary-foreground/50 text-sm leading-relaxed mb-4">
              Since 1952, delivering quality and assured financial compliance services across South India.
            </p>
            <p className="text-xs text-gold tracking-widest uppercase font-semibold">
              Professional Partnerships Welcome
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Client Portal", href: "/portal" },
                { label: "Contact", href: "/#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-primary-foreground/50 hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Operating Regions */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Operating Regions</h4>
            <ul className="space-y-2">
              {[
                "Andhra Pradesh", "Telangana (online)", "Tamil Nadu (online)",
                "Karnataka", "Kerala", "Odisha (online)", "Maharashtra (online)",
              ].map((r) => (
                <li key={r} className="text-sm text-primary-foreground/50 hover:text-gold transition-colors cursor-default">
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: "5/134, Patel Street, East Gudur Rural, AP 524101", href: undefined },
                { icon: Phone, text: "+91 90528 78779", href: "tel:+919052878779" },
                { icon: Mail, text: "kotaassociatesworks@gmail.com", href: "mailto:kotaassociatesworks@gmail.com" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i} className="flex items-center gap-3 text-sm text-primary-foreground/50">
                    <Icon className="w-4 h-4 shrink-0 text-gold" />
                    {item.href ? (
                      <a href={item.href} className="hover:text-gold transition-colors">{item.text}</a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-primary-foreground/35">
            © {new Date().getFullYear()} Kota Associates. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/35">
            Quality · Assurance · Trust
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
