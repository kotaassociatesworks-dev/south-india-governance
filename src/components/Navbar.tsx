import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/",            label: t("nav.home") },
    { to: "/about",       label: t("nav.about") },
    { to: "/services",    label: t("nav.services") },
    { to: "/compliance",  label: t("nav.compliance") },
    { to: "/eway-bills",  label: t("nav.eway") },
    { to: "/calculators", label: t("nav.calculators") },
    { to: "/contact",     label: t("nav.contact") },
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
        <Link to="/" className="flex flex-col leading-tight">
          <span className="font-heading text-2xl md:text-[26px] text-accent tracking-wide">Kota Associates</span>
          <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Est. 1952</span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              {l.label}
            </NavLink>
          ))}
          <ThemeToggle />
          <Link to="/contact#booking" className="btn-gold !py-2.5 !px-5 text-sm">{t("nav.book")}</Link>
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
            <Link to="/contact#booking" className="btn-gold mt-4">{t("nav.book")}</Link>
          </div>
        </aside>
      </div>
    </header>
  );
};

export default Navbar;
