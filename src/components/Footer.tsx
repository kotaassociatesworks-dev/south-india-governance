import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-24">
    <div className="container-narrow py-16 grid md:grid-cols-4 gap-12">
      <div className="md:col-span-2">
        <h3 className="font-heading text-2xl text-accent mb-2">Kota Associates</h3>
        <p className="text-sm text-primary-foreground/70 mb-6">Quality · Assurance · Trust. Serving South India since 1952.</p>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" /><span>5/134 Patel Street, East Gudur Rural, AP 524101</span></li>
          <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /><a href="tel:+919052878779">+91 90528 78779</a></li>
          <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /><a href="mailto:kotaassociatesworks@gmail.com">kotaassociatesworks@gmail.com</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-heading text-lg mb-4">Explore</h4>
        <ul className="space-y-2 text-sm text-primary-foreground/80">
          <li><Link to="/" className="hover:text-accent">Home</Link></li>
          <li><Link to="/about" className="hover:text-accent">About</Link></li>
          <li><Link to="/services" className="hover:text-accent">Services</Link></li>
          <li><Link to="/compliance" className="hover:text-accent">Compliance Guide</Link></li>
          <li><Link to="/eway-bills" className="hover:text-accent">E-Way Bills</Link></li>
          <li><Link to="/calculators" className="hover:text-accent">Calculators</Link></li>
          <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-heading text-lg mb-4">Resources</h4>
        <ul className="space-y-2 text-sm text-primary-foreground/80">
          <li><Link to="/blog" className="hover:text-accent">Insights</Link></li>
          <li><Link to="/portal" className="hover:text-accent">Client Portal</Link></li>
          <li><Link to="/compliance?type=msme" className="hover:text-accent">MSME Guide</Link></li>
          <li><Link to="/compliance?type=mnc" className="hover:text-accent">MNC Guide</Link></li>
          <li><Link to="/compliance?type=startup" className="hover:text-accent">Startup Guide</Link></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10">
      <div className="container-narrow py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/60">
        <p>© {new Date().getFullYear()} Kota Associates. All Rights Reserved.</p>
        <p className="tracking-[0.2em] uppercase text-accent">Quality · Assurance · Trust</p>
      </div>
    </div>
  </footer>
);

export default Footer;
