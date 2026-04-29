import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-24">
    <div className="container-narrow py-16 grid md:grid-cols-3 gap-12">
      <div>
        <h3 className="font-heading text-2xl text-accent mb-2">Kota Associates</h3>
        <p className="text-sm text-primary-foreground/70 mb-6">Quality · Assurance · Trust. Serving South India since 1952.</p>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" /><span>5/134 Patel Street, East Gudur Rural, AP 524101</span></li>
          <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /><a href="tel:+919052878779">+91 90528 78779</a></li>
          <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /><a href="mailto:kotaassociatesworks@gmail.com">kotaassociatesworks@gmail.com</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-heading text-lg mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm text-primary-foreground/80">
          <li><Link to="/" className="hover:text-accent">Home</Link></li>
          <li><Link to="/about" className="hover:text-accent">About</Link></li>
          <li><Link to="/services" className="hover:text-accent">Services</Link></li>
          <li><Link to="/calculators" className="hover:text-accent">Calculators</Link></li>
          <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-heading text-lg mb-4">Services</h4>
        <ul className="space-y-2 text-sm text-primary-foreground/80">
          <li>GST & Compliance</li>
          <li>Accounting Services</li>
          <li>Drafting & Legal</li>
          <li>Direct Taxes</li>
          <li>Business Services</li>
          <li>E-Way Bill Services</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10">
      <div className="container-narrow py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/60">
        <p>© 2024 Kota Associates. All Rights Reserved.</p>
        <p className="tracking-[0.2em] uppercase text-accent">Quality · Assurance · Trust</p>
      </div>
    </div>
  </footer>
);

export default Footer;
