import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-2xl font-bold mb-4">
              Kota <span className="text-gold">Associates</span>
            </h3>
            <p className="text-primary-foreground/50 text-sm leading-relaxed mb-4 max-w-sm">
              Since 1952, delivering quality and assured financial compliance, taxation, and advisory services across 7 states in South India.
            </p>
            <p className="text-xs text-gold tracking-widest uppercase font-semibold mb-6">
              Professional Partnerships Welcome
            </p>
            <Link
              to="/partnership"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold/80 font-medium transition-colors"
            >
              Become a Partner <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-5 tracking-widest uppercase text-gold">Capabilities</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Tax Advisory", href: "/services" },
                { label: "GST Compliance", href: "/portal" },
                { label: "Financial Compliance", href: "/services" },
                { label: "Business Structuring", href: "/portal/drafting" },
                { label: "Litigation Support", href: "/litigation-tracker" },
                { label: "Enterprise Services", href: "/large-scale-services" },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-primary-foreground/50 hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform & Resources */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-5 tracking-widest uppercase text-gold">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Tax Risk Analyzer", href: "/tax-risk-analyzer" },
                { label: "Compliance Health", href: "/compliance-health" },
                { label: "Tax Assistant", href: "/tax-assistant" },
                { label: "Document Vault", href: "/document-vault" },
                { label: "Document Analyzer", href: "/document-analyzer" },
                { label: "Tax News Radar", href: "/tax-news" },
                { label: "Compliance Calendar", href: "/compliance-calendar" },
                { label: "Free Tools", href: "/tools" },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-primary-foreground/50 hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-5 tracking-widest uppercase text-gold">Contact</h4>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: "5/134, Patel Street, East Gudur Rural, AP 524101", href: undefined },
                { icon: Phone, text: "+91 90528 78779", href: "tel:+919052878779" },
                { icon: Mail, text: "kotaassociatesworks@gmail.com", href: "mailto:kotaassociatesworks@gmail.com" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i} className="flex items-start gap-3 text-sm text-primary-foreground/50">
                    <Icon className="w-4 h-4 shrink-0 text-gold mt-0.5" />
                    {item.href ? (
                      <a href={item.href} className="hover:text-gold transition-colors">{item.text}</a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href="https://wa.me/919052878779"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold tracking-wide uppercase border border-gold/30 text-gold rounded-lg hover:bg-gold/10 transition-colors"
              >
                WhatsApp
              </a>
              <Link
                to="/#contact"
                className="px-4 py-2 text-xs font-semibold tracking-wide uppercase bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors"
              >
                Enquiry
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-primary-foreground/35">
            © {new Date().getFullYear()} Kota Associates. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/blog" className="text-xs text-primary-foreground/35 hover:text-gold transition-colors">Insights</Link>
            <Link to="/industry-guides" className="text-xs text-primary-foreground/35 hover:text-gold transition-colors">Industry Guides</Link>
            <Link to="/know-your-rights" className="text-xs text-primary-foreground/35 hover:text-gold transition-colors">Know Your Rights</Link>
          </div>
          <p className="text-xs text-primary-foreground/35">Quality · Assurance · Trust</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
