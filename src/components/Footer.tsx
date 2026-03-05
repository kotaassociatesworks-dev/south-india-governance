import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4">
              Kota <span className="text-gold">Associates</span>
            </h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-4">
              Since 1952, delivering quality and assured financial compliance
              services across South India.
            </p>
            <p className="text-xs text-gold tracking-[0.2em] uppercase">
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
                  <Link
                    to={l.href}
                    className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                  >
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
                "Andhra Pradesh",
                "Telangana",
                "Tamil Nadu",
                "Karnataka",
                "Kerala",
                "Odisha",
                "Maharashtra",
              ].map((r) => (
                <li key={r} className="text-sm text-primary-foreground/60">{r}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/60">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span>Gudur, Andhra Pradesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:+919052878779" className="hover:text-gold transition-colors">+91 90528 78779</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:kotaassociatesworks@gmail.com" className="hover:text-gold transition-colors">
                  kotaassociatesworks@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Kota Associates. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/40">
            Quality · Assurance · Trust
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
