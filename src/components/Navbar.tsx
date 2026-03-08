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

const DropdownMenu = ({ items, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 8, scale: 0.97 }}
    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
  >
    <div className="bg-background/98 backdrop-blur-xl border border-border shadow-2xl min-w-[280px]">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 -translate-y-full w-3 h-3 bg-background border-l border-t border-border rotate-45" />
      <div className="py-2">
        {items.map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
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
          </motion.div>
        ))}
      </div>
      <div className="h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </div>
  </motion.div>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownTimeout = useRef(null);
  const location = useLocation();

  useEffect(() => { setOpen(false); setActiveDropdown(null); }, [location]);

  const handleMouseEnter = (label) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const renderDesktopItem = (item, i) => {
    if (item.children) {
      return (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase">
            <motion.span whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="inline-flex items-center gap-1">
              {item.label}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`} />
            </motion.span>
          </button>
          <AnimatePresence>
            {activeDropdown === item.label && (
              <DropdownMenu items={item.children} onClose={() => setActiveDropdown(null)} />
            )}
          </AnimatePresence>
        </div>
      );
    }

    const cls = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase";
    const inner = (
      <motion.span className="relative inline-block" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        {item.label}
        <motion.span
          className="absolute bottom-0 left-0 w-full h-[2px] bg-accent origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.span>
    );

    return item.isRoute ? (
      <Link key={item.href} to={item.href} className={cls}>{inner}</Link>
    ) : (
      <a key={item.href} href={item.href} className={cls}>{inner}</a>
    );
  };

  const renderMobileItem = (item, i) => {
    if (item.children) {
      return (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
        >
          <button
            onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
            className="w-full flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase py-1"
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
                className="overflow-hidden pl-4 border-l border-accent/20 ml-2 mt-1"
              >
                {item.children.map((child) => (
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
        </motion.div>
      );
    }

    const cls = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase";
    return (
      <motion.div
        key={item.href || item.label}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.05, duration: 0.3 }}
      >
        {item.isRoute ? (
          <Link to={item.href} onClick={() => setOpen(false)} className={cls}>{item.label}</Link>
        ) : (
          <a href={item.href} onClick={() => setOpen(false)} className={cls}>{item.label}</a>
        )}
      </motion.div>
    );
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="font-heading text-xl font-bold tracking-tight text-foreground">
          <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
            Kota{" "}
            <motion.span
              className="text-accent"
              animate={{
                textShadow: [
                  "0 0 0px hsl(44 60% 45% / 0)",
                  "0 0 10px hsl(44 60% 45% / 0.3)",
                  "0 0 0px hsl(44 60% 45% / 0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Associates
            </motion.span>
          </motion.span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {navStructure.map((item, i) => renderDesktopItem(item, i))}
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/login"
              className="ml-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase hover:bg-primary/90 transition-colors"
            >
              Login
            </Link>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9, rotate: 90 }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
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
            <div className="flex flex-col px-6 py-4 gap-4">
              {navStructure.map((item, i) => renderMobileItem(item, i))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase text-center"
                >
                  Login
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
