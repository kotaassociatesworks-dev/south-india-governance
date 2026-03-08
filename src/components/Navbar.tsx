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
      { label: "All Services", href: "/services", isRoute: true, desc: "View our complete service catalog" },
      { label: "Client Portal", href: "/portal", isRoute: true, desc: "Self-service compliance portal" },
      { label: "Enterprise Services", href: "/large-scale-services", isRoute: true, desc: "Solutions for M.S.M.E & M.N.C" },
      { label: "Service Marketplace", href: "/service-marketplace", isRoute: true, desc: "Browse & book services instantly" },
      { label: "Subscription Plans", href: "/subscription-plans", isRoute: true, desc: "Recurring compliance packages" },
    ],
  },
  {
    label: "Platform",
    children: [
      { label: "Tax Risk Analyzer", href: "/tax-risk-analyzer", isRoute: true, desc: "Assess your compliance risk score" },
      { label: "Notice Upload", href: "/notice-upload", isRoute: true, desc: "Upload tax notices for expert review" },
      { label: "Startup Wizard", href: "/startup-wizard", isRoute: true, desc: "Business registration roadmap" },
      { label: "Compliance Calendar", href: "/compliance-calendar", isRoute: true, desc: "Never miss a filing deadline" },
      { label: "Document Vault", href: "/document-vault", isRoute: true, desc: "Secure document storage" },
      { label: "Litigation Tracker", href: "/litigation-tracker", isRoute: true, desc: "Track tax dispute status" },
    ],
  },
  {
    label: "Knowledge",
    children: [
      { label: "Know Your Rights", href: "/know-your-rights", isRoute: true, desc: "Taxpayer rights under Indian law" },
      { label: "Know Taxation", href: "/know-taxation", isRoute: true, desc: "Tax department structure & hierarchy" },
      { label: "Tax Notice Help", href: "/tax-notice-help", isRoute: true, desc: "GST & Income Tax notice guidance" },
      { label: "Blog & Insights", href: "/blog", isRoute: true, desc: "Articles, updates & compliance tips" },
    ],
  },
  { label: "Tools", href: "/tools", isRoute: true },
  { label: "Partnership", href: "/partnership", isRoute: true },
  { label: "Contact", href: "/#contact" },
];

const DropdownMenu = ({ items, onClose }: { items: any[]; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.2 }}
    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
  >
    <div className="bg-popover backdrop-blur-xl border border-border rounded-lg shadow-xl min-w-[280px] overflow-hidden">
      <div className="py-1">
        {items.map((item, i) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={onClose}
            className="flex flex-col px-5 py-3 hover:bg-accent/5 transition-colors group"
          >
            <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
              {item.label}
            </span>
            {item.desc && (
              <span className="text-xs text-muted-foreground mt-0.5">{item.desc}</span>
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

  const renderDesktopItem = (item: any) => {
    if (item.children) {
      return (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          <button className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide uppercase">
            {item.label}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {activeDropdown === item.label && (
              <DropdownMenu items={item.children} onClose={() => setActiveDropdown(null)} />
            )}
          </AnimatePresence>
        </div>
      );
    }

    const cls = "text-sm font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide uppercase";
    return item.isRoute ? (
      <Link key={item.href} to={item.href} className={cls}>{item.label}</Link>
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
            className="w-full flex items-center justify-between text-sm font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide uppercase py-2"
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
                    className="block py-2 text-sm text-muted-foreground hover:text-accent transition-colors"
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

    const cls = "text-sm font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide uppercase py-2 block";
    return item.isRoute ? (
      <Link key={item.href} to={item.href} onClick={() => setOpen(false)} className={cls}>{item.label}</Link>
    ) : (
      <a key={item.href} href={item.href} onClick={() => setOpen(false)} className={cls}>{item.label}</a>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="font-heading text-xl font-bold tracking-tight text-foreground">
          Kota <span className="text-accent">Associates</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-7">
          {navStructure.map((item) => renderDesktopItem(item))}
          <Link
            to="/login"
            className="ml-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase rounded-lg hover:bg-primary/90 transition-colors"
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
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navStructure.map((item, i) => renderMobileItem(item, i))}
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="mt-3 block px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase text-center rounded-lg"
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
