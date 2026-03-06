import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services", isRoute: true },
  { label: "Client Portal", href: "/portal", isRoute: true },
  { label: "Partnership", href: "/#partnership", isRoute: false },
  { label: "Industries", href: "/#industries" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const renderLink = (l: typeof navLinks[0], extra = "") => {
    const cls = `text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase ${extra}`;
    return l.isRoute ? (
      <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className={cls}>
        {l.label}
      </Link>
    ) : (
      <a key={l.href} href={l.href} onClick={() => setOpen(false)} className={cls}>
        {l.label}
      </a>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="font-heading text-xl font-bold tracking-tight text-foreground">
          Kota <span className="text-accent">Associates</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => renderLink(l))}
          <Link
            to="/login"
            className="ml-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase hover:bg-primary/90 transition-colors"
          >
            Login
          </Link>
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
              {navLinks.map((l) => renderLink(l))}
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase text-center"
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
