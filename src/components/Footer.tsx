import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-navy-deep text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4">
              KOTA <span className="text-gold">Associates</span>
            </h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              Since 1962, delivering structured financial governance, compliance
              excellence, and strategic advisory services across South India.
            </p>
            <p className="text-xs text-gold tracking-[0.2em] uppercase">
              Professional Partnerships Welcome
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["About", "Services", "Industries", "Why Us"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/60">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span>Gudur, Andhra Pradesh<br />Operations across South India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>info@srkassociates.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} KOTA Associates. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/40">
            Governance · Compliance · Growth
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
