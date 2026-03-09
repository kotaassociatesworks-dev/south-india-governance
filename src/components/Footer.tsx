import { MapPin, Phone, Mail, ArrowRight, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Animated gold divider */}
      <div className="w-full h-[3px]" style={{ background: "linear-gradient(90deg, transparent, hsl(46 70% 47%), hsl(46 50% 62%), hsl(46 70% 47%), transparent)" }} />

      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-24 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-2xl font-bold mb-3">
              Kota <span className="text-gold">Associates</span>
            </h3>
            <p className="text-xs tracking-[0.3em] uppercase text-gold/70 font-semibold mb-4">
              Quality · Assurance · Trust
            </p>
            <p className="text-primary-foreground/45 text-sm leading-relaxed mb-6 max-w-sm">
              Since 1952, delivering quality and assured financial compliance, taxation, and advisory services across 7 states in South India.
            </p>
            <p className="text-xs text-gold tracking-widest uppercase font-semibold mb-6">
              Professional Partnerships Welcome
            </p>
            <Link
              to="/partnership"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light font-medium transition-colors"
            >
              Become a Partner <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Newsletter */}
            <div className="mt-8 max-w-sm">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary-foreground/40 mb-3">Stay Updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2.5 bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-gold/40 transition-colors"
                />
                <button
                  className="px-4 py-2.5 text-xs font-bold tracking-wider uppercase rounded-lg transition-all"
                  style={{ background: "linear-gradient(135deg, hsl(46 70% 47%), hsl(46 50% 55%))", color: "hsl(210 72% 10%)" }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-6 tracking-widest uppercase text-gold">Capabilities</h4>
            <ul className="space-y-3">
              {[
                { label: "Tax Advisory", href: "/services" },
                { label: "GST Compliance", href: "/portal" },
                { label: "Financial Compliance", href: "/services" },
                { label: "Business Structuring", href: "/portal/drafting" },
                { label: "Litigation Support", href: "/litigation-tracker" },
                { label: "Enterprise Services", href: "/large-scale-services" },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-primary-foreground/45 hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-6 tracking-widest uppercase text-gold">Platform</h4>
            <ul className="space-y-3">
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
                  <Link to={l.href} className="text-sm text-primary-foreground/45 hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-6 tracking-widest uppercase text-gold">Contact</h4>
            <ul className="space-y-5">
              {[
                { icon: MapPin, text: "5/134, Patel Street, East Gudur Rural, AP 524101", href: undefined },
                { icon: Phone, text: "+91 90528 78779", href: "tel:+919052878779" },
                { icon: Mail, text: "kotaassociatesworks@gmail.com", href: "mailto:kotaassociatesworks@gmail.com" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i} className="flex items-start gap-3 text-sm text-primary-foreground/45">
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

        {/* Social proof badges */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/8 flex flex-wrap items-center justify-center gap-8">
          {["70+ Years Legacy", "7 States Covered", "1000+ Clients Served", "50+ Professional Partners"].map((badge) => (
            <span key={badge} className="text-xs text-primary-foreground/30 tracking-widest uppercase font-medium">{badge}</span>
          ))}
        </div>
      </div>

      <div className="border-t border-primary-foreground/8 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} Kota Associates. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/blog" className="text-xs text-primary-foreground/30 hover:text-gold transition-colors">Insights</Link>
            <Link to="/industry-guides" className="text-xs text-primary-foreground/30 hover:text-gold transition-colors">Industry Guides</Link>
            <Link to="/know-your-rights" className="text-xs text-primary-foreground/30 hover:text-gold transition-colors">Know Your Rights</Link>
          </div>
          
          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs text-primary-foreground/30 hover:text-gold transition-colors uppercase tracking-widest font-medium"
          >
            Back to Top <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
