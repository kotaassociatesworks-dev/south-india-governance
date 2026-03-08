import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services", isRoute: true },
  { label: "Client Portal", href: "/portal", isRoute: true },
  { label: "Enterprise Services", href: "/large-scale-services", isRoute: true },
  { label: "Know Your Rights", href: "/know-your-rights", isRoute: true },
  { label: "Know Taxation", href: "/know-taxation", isRoute: true },
  { label: "Tools", href: "/tools", isRoute: true },
  { label: "Blog", href: "/blog", isRoute: true },
  { label: "Partnership", href: "/partnership", isRoute: true },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const renderLink = (l: typeof navLinks[0], i: number, extra = "") => {
    const cls = `text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase relative ${extra}`;
    const inner = (
      <motion.span
        className="relative inline-block"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {l.label}
        <motion.span
          className="absolute bottom-0 left-0 w-full h-[2px] bg-accent origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.span>
    );

    return l.isRoute ? (
      <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className={cls}>
        {inner}
      </Link>
    ) : (
      <a key={l.href} href={l.href} onClick={() => setOpen(false)} className={cls}>
        {inner}
      </a>
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
          {navLinks.map((l, i) => renderLink(l, i))}
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
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  {renderLink(l, i)}
                </motion.div>
              ))}
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