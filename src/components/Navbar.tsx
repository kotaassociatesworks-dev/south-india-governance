import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navStructure = [
  { label: "Home", href: "/", isRoute: true },
  { label: "About", href: "/#about" },
  {
    label: "Services",
    children: [
      { label: "All Services", href: "/services", isRoute: true, desc: "Complete service catalog" },
      { label: "Client Portal", href: "/portal", isRoute: true, desc: "Self-service compliance portal" },
      { label: "Enterprise", href: "/large-scale-services", isRoute: true, desc: "M.S.M.E & M.N.C solutions" },
      { label: "Marketplace", href: "/service-marketplace", isRoute: true, desc: "Browse & book instantly" },
      { label: "Plans", href: "/subscription-plans", isRoute: true, desc: "Recurring packages" },
    ],
  },
  {
    label: "Platform",
    children: [
      { label: "Tax Risk Analyzer", href: "/tax-risk-analyzer", isRoute: true, desc: "Compliance risk score" },
      { label: "Compliance Health", href: "/compliance-health", isRoute: true, desc: "Health dashboard" },
      { label: "Tax Assistant", href: "/tax-assistant", isRoute: true, desc: "Ask tax questions" },
      { label: "Notice Upload", href: "/notice-upload", isRoute: true, desc: "Expert notice review" },
      { label: "Startup Wizard", href: "/startup-wizard", isRoute: true, desc: "Registration roadmap" },
      { label: "Calendar", href: "/compliance-calendar", isRoute: true, desc: "Filing deadlines" },
      { label: "Document Vault", href: "/document-vault", isRoute: true, desc: "Secure storage" },
      { label: "Litigation Tracker", href: "/litigation-tracker", isRoute: true, desc: "Dispute tracking" },
      { label: "Doc Analyzer", href: "/document-analyzer", isRoute: true, desc: "AI document analysis" },
      { label: "Tax News", href: "/tax-news", isRoute: true, desc: "Real-time updates" },
      { label: "HSN Code Finder", href: "/hsn-code-finder", isRoute: true, desc: "GST code lookup" },
    ],
  },
  {
    label: "Insights",
    children: [
      { label: "Know Your Rights", href: "/know-your-rights", isRoute: true, desc: "Taxpayer rights" },
      { label: "Know Taxation", href: "/know-taxation", isRoute: true, desc: "Department hierarchy" },
      { label: "Tax Notice Help", href: "/tax-notice-help", isRoute: true, desc: "Notice guidance" },
      { label: "Blog", href: "/blog", isRoute: true, desc: "Articles & tips" },
      { label: "Industry Guides", href: "/industry-guides", isRoute: true, desc: "Compliance by industry" },
      { label: "Tools", href: "/tools", isRoute: true, desc: "Calculators & utilities" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "Latest Updates", href: "/tax-updates", isRoute: true, desc: "GST & IT updates" },
      { label: "Intelligence Radar", href: "/tax-intelligence-radar", isRoute: true, desc: "Impact analysis" },
      { label: "Command Center", href: "/compliance-dashboard", isRoute: true, desc: "Compliance dashboard" },
      { label: "Compliance Twin", href: "/compliance-twin", isRoute: true, desc: "Smart monitoring" },
      { label: "Tax OS", href: "/tax-operating-system", isRoute: true, desc: "Centralized tax platform" },
      { label: "Partnership", href: "/partnership", isRoute: true, desc: "Join our network" },
    ],
  },
  { label: "Contact", href: "/#contact" },
];

const DropdownMenu = ({ items, onClose, isPlatform }: { items: any[]; onClose: () => void; isPlatform?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 8 }}
    transition={{ duration: 0.2 }}
    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50"
  >
    <div className={`bg-popover/95 backdrop-blur-2xl border border-border/60 rounded-xl shadow-2xl overflow-hidden ${isPlatform ? 'min-w-[560px]' : 'min-w-[300px]'}`}>
      <div className={`py-2 ${isPlatform ? 'grid grid-cols-2 gap-0' : ''}`}>
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={onClose}
            className="flex flex-col px-5 py-3.5 hover:bg-accent/5 transition-all group"
          >
            <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
              {item.label}
            </span>
            {item.desc && (
              <span className="text-xs text-muted-foreground mt-0.5 group-hover:text-muted-foreground/80 transition-colors">{item.desc}</span>
            )}
          </Link>
        ))}
      </div>
      <div className="h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </div>
  </motion.div>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeout = useRef<any>(null);
  const location = useLocation();

  useEffect(() => { setOpen(false); setActiveDropdown(null); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (href: string) => location.pathname === href;

  const renderDesktopItem = (item: any) => {
    if (item.children) {
      return (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          <button className={`flex items-center gap-1 text-sm font-medium transition-colors tracking-wide uppercase ${activeDropdown === item.label ? 'text-accent' : 'text-foreground/65 hover:text-foreground'}`}>
            {item.label}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {activeDropdown === item.label && (
              <DropdownMenu items={item.children} onClose={() => setActiveDropdown(null)} isPlatform={item.label === "Platform"} />
            )}
          </AnimatePresence>
        </div>
      );
    }

    const active = item.isRoute && isActive(item.href);
    const cls = `text-sm font-medium transition-colors tracking-wide uppercase relative ${active ? 'text-accent' : 'text-foreground/65 hover:text-foreground'}`;
    
    return item.isRoute ? (
      <Link key={item.href} to={item.href} className={cls}>
        {item.label}
        {active && <motion.div layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full" />}
      </Link>
    ) : (
      <a key={item.href} href={item.href} className={cls}>{item.label}</a>
    );
  };

  const renderMobileItem = (item: any, i: number) => {
    if (item.children) {
      return (
        <div key={item.label}>
          <button
            onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
            className="w-full flex items-center justify-between text-sm font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide uppercase py-2.5"
          >
            {item.label}
            <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {mobileExpanded === item.label && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pl-4 border-l-2 border-accent/20 ml-2"
              >
                {item.children.map((child: any) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    const cls = "text-sm font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide uppercase py-2.5 block";
    return item.isRoute ? (
      <Link key={item.href} to={item.href} onClick={() => setOpen(false)} className={cls}>{item.label}</Link>
    ) : (
      <a key={item.href} href={item.href} onClick={() => setOpen(false)} className={cls}>{item.label}</a>
    );
  };

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-9 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-2xl border-b border-border/50 shadow-lg shadow-primary/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Gold accent line when scrolled */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(46 70% 47% / 0.4), transparent)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="container mx-auto flex items-center justify-between h-20 px-4 lg:px-8">
        <Link to="/" className="font-heading text-xl font-bold tracking-tight text-foreground">
          Kota <span className="text-accent">Associates</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-5">
          {navStructure.map((item) => renderDesktopItem(item))}
          <Link
            to="/login"
            className="ml-3 px-6 py-2.5 font-semibold text-sm tracking-wide uppercase rounded-lg transition-all"
            style={{
              background: "linear-gradient(135deg, hsl(46 70% 47%), hsl(46 50% 55%))",
              color: "hsl(210 72% 10%)",
            }}
          >
            Login
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-2xl border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-5 gap-1">
              {navStructure.map((item, i) => renderMobileItem(item, i))}
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="mt-4 block px-5 py-3 font-semibold text-sm tracking-wide uppercase text-center rounded-lg"
                style={{
                  background: "linear-gradient(135deg, hsl(46 70% 47%), hsl(46 50% 55%))",
                  color: "hsl(210 72% 10%)",
                }}
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
