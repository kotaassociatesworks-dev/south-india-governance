import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services", isRoute: true },
  { label: "E-Way Bill", href: "/services/eway-bill", isRoute: true },
  { label: "Industries", href: "/#industries" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <a href="#" className="font-heading text-xl font-bold tracking-tight text-foreground">
          KOTA <span className="text-accent">Associates</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) =>
            l.isRoute ? (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
              >
                {l.label}
              </a>
            )
          )}
          <a
            href="/#contact"
            className="ml-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase hover:bg-primary/90 transition-colors"
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
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
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((l) =>
                l.isRoute ? (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground uppercase tracking-wide"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground uppercase tracking-wide"
                  >
                    {l.label}
                  </a>
                )
              )}
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase text-center"
              >
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
