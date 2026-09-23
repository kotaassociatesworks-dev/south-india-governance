import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Phone, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/services",    label: t("nav.services") },
    { to: "/about",       label: t("nav.about") },
    { to: "/compliance",  label: t("nav.compliance") },
    { to: "/eway-bills",  label: t("nav.eway") },
    { to: "/calculators", label: t("nav.calculators") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className={`sticky top-0 z-40 bg-background/95 backdrop-blur transition-shadow ${scrolled ? "shadow-sm" : ""}`}>
      <nav className="container-narrow flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 leading-tight" aria-label="Kota Associates home">
          <span className="w-9 h-9 bg-primary text-primary-foreground rounded-sm grid place-items-center font-heading text-lg">K</span>
          <span className="flex flex-col">
            <span className="font-heading text-lg md:text-xl text-primary">Kota Associates</span>
            <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">Consulting since 1952</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              {l.label}
            </NavLink>
          ))}
          <a href="/presentation/" target="_blank" rel="noopener noreferrer" className="nav-link text-accent">
            GST Briefing ↗
          </a>
          <ThemeToggle />
          <a href="tel:+919052878779" className="inline-flex items-center gap-2 text-sm font-semibold text-primary" aria-label="Call Kota Associates">
            <Phone className="w-4 h-4 text-accent" /> +91 90528 78779
          </a>
          <Link to="/contact#booking" className="btn-gold !py-2.5 !px-5 text-sm">Speak to an Expert</Link>
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <ThemeToggle />
          <button className="p-2 text-primary" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden transition ${open ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
        <aside className={`absolute top-0 right-0 h-full w-72 bg-background shadow-xl p-6 transform transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center mb-8">
            <span className="font-heading text-xl text-accent">Kota Associates</span>
            <button onClick={() => setOpen(false)} aria-label="Close"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex flex-col gap-5">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => `text-base font-medium ${isActive ? "text-accent" : "text-foreground"}`}>
                {l.label}
              </NavLink>
            ))}
            <a href="/presentation/" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-accent">
              GST Briefing ↗
            </a>
            <a href="tel:+919052878779" className="flex items-center gap-2 font-semibold text-primary"><Phone className="w-4 h-4 text-accent" />+91 90528 78779</a>
            <Link to="/contact#booking" className="btn-gold mt-4">Speak to an Expert</Link>
          </div>
        </aside>
      </div>
    </header>
  );
};

export default Navbar;
