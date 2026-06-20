import { Phone, Globe, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useI18n } from "@/i18n/I18nProvider";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useI18n();
  const { pathname } = useLocation();

  const navItems = [
    { label: t("nav.home"), to: "/" as const, hash: "#home", match: "/" },
    { label: t("nav.about"), to: "/" as const, hash: "#about", match: "/#about" },
    { label: t("nav.products"), to: "/products/chinese" as const, match: "/products" },
    { label: t("works.label"), to: "/" as const, hash: "#works", match: "/#works" },
    { label: t("nav.partners"), to: "/" as const, hash: "#partners", match: "/#partners" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, hash?: string) => {
    if (hash && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", hash);
      }
    }
  };

  return (
    <header className="absolute top-0 inset-x-0 z-50 px-4 md:px-8 pt-4 md:pt-6">
      <nav className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-full shadow-lg px-4 md:px-6 py-2.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Logo variant="dark" className="h-11 md:h-12 w-auto" />
        </Link>

        <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item, i) => {
            const isActive = item.match === pathname || (item.match === "/" && pathname === "/" && i === 0);
            
            if (item.subItems) {
              return (
                <li key={item.label} className="relative group py-2">
                  <div className={`flex items-center gap-1 cursor-pointer transition-colors hover:text-teal ${isActive ? "text-teal" : "text-ink"}`}>
                    <Link to={item.to} className="inline-block">
                      {item.label}
                    </Link>
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </div>
                  <div className="absolute top-full rtl:right-0 ltr:left-0 mt-0 w-48 bg-white rounded-xl shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <ul className="py-2">
                      {item.subItems.map(sub => (
                        <li key={sub.label}>
                          <Link
                            to={sub.to}
                            className="block px-4 py-2 hover:bg-teal/5 text-ink hover:text-teal transition-colors"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <Link
                  to={item.to}
                  hash={item.hash}
                  onClick={(e) => handleScroll(e, item.hash)}
                  className={`transition-colors hover:text-teal ${isActive ? "text-teal" : "text-ink"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3 md:gap-5">
          <Link
            to="/"
            hash="#contact"
            onClick={(e) => handleScroll(e, "#contact")}
            className="hidden md:flex items-center gap-2 text-teal font-medium text-sm hover:text-teal-dark transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>{t("nav.contact")}</span>
          </Link>
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="hidden md:flex items-center gap-1.5 text-ink text-sm font-medium hover:text-teal transition-colors"
            aria-label="toggle language"
          >
            <span>{t("nav.lang")}</span>
            <Globe className="w-4 h-4" />
          </button>
          <button className="lg:hidden text-ink" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-4 space-y-3">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                to={item.to}
                hash={item.hash}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (!item.subItems) {
                    setOpen(false);
                    handleScroll(e, item.hash);
                  }
                }}
                className={`flex items-center justify-between text-ink font-medium py-2 border-b border-border last:border-0 ${item.subItems ? 'border-none pb-1' : ''}`}
              >
                {item.label}
              </Link>
              {item.subItems && (
                <div className="ps-4 border-b border-border pb-2 space-y-2">
                  {item.subItems.map(sub => (
                    <Link
                      key={sub.label}
                      to={sub.to}
                      onClick={() => setOpen(false)}
                      className="block text-ink/80 text-sm font-medium hover:text-teal py-1"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            onClick={() => { setLang(lang === "ar" ? "en" : "ar"); setOpen(false); }}
            className="flex items-center gap-2 text-ink font-medium pt-2"
          >
            <Globe className="w-4 h-4" /> {t("nav.lang")}
          </button>
          <Link
            to="/"
            hash="#contact"
            onClick={(e) => {
              setOpen(false);
              handleScroll(e, "#contact");
            }}
            className="flex items-center gap-2 text-teal font-medium pt-2"
          >
            <Phone className="w-4 h-4" /> {t("nav.contact")}
          </Link>
        </div>
      )}
    </header>
  );
}
