import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import logoFooter from "@/assets/images/18.webp";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  const { pathname } = useLocation();

  const links = [
    { label: t("nav.home"), to: "/" as const, hash: "#home" },
    { label: t("nav.about"), to: "/" as const, hash: "#about" },
    { label: t("nav.products"), to: "/" as const, hash: "#products" },
    { label: t("works.label"), to: "/" as const, hash: "#works" },
    { label: t("nav.partners"), to: "/" as const, hash: "#partners" },
    { label: t("nav.contact"), to: "/" as const, hash: "#contact" },
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
    <footer className="bg-ink text-white py-14 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-start">
        <div className="col-span-2 md:col-span-1">
          <img src={logoFooter} alt="Future Kayan — كيان المستقبل" className="h-20 w-auto mb-4 object-contain" />
          <p className="text-white/60 text-xs leading-relaxed mb-5">{t("footer.tagline")}</p>
          <div className="flex gap-2">
            <a href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-teal text-white flex items-center justify-center transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-teal text-white flex items-center justify-center transition-colors">
              <svg viewBox="0 0 512 512" fill="currentColor" className="w-4.5 h-4.5">
                <path d="M256 48c-79.8 0-133 50.8-133 116.8 0 28.4 9.1 57.8 25.2 85.8 12.4 21.5 16.4 36.3 13 50.2-2.8 11.4-10.9 22.9-22 31.3-7.7 5.9-10.6 16.2-7.1 25.1 3.4 8.9 12 14.8 21.5 14.8h204.4c9.5 0 18.1-5.9 21.5-14.8 3.5-8.9.6-19.3-7.1-25.1-11-8.4-19.2-19.9-22-31.3-3.4-13.9.2-28.7 13-50.2 16.1-28 25.2-57.4 25.2-85.8C389.6 98.8 336.4 48 256 48z"/>
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-teal text-white flex items-center justify-center transition-colors">
              <svg viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4">
                <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185 188.31v89.89a72.69 72.69 0 1 0 40.3 65.4V32H315a117.84 117.84 0 0 0 10.07 49.13A116.66 116.66 0 0 0 365 119.56a117.82 117.82 0 0 0 83 34.35v56z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h4 className="font-bold mb-4 text-base">{t("footer.contact")}</h4>
          <ul className="space-y-3 text-xs text-white/70">
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-teal mt-0.5 shrink-0" />
              <div>
                <div><span dir="ltr">+966 546111600</span></div>
                <div><span dir="ltr">+966 532563637</span></div>
                <div className="text-white/50 mt-0.5">{t("footer.support")}</div>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-teal mt-0.5 shrink-0" />
              <div>
                <div>info@kayan.com</div>
                <div className="text-white/50 mt-0.5">{t("footer.inquiries")}</div>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-teal mt-0.5 shrink-0" />
              <div>{t("contact.locationVal")}</div>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-base">{t("footer.links")}</h4>
          <ul className="space-y-2.5 text-xs text-white/70">
            {links.map(l => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  hash={l.hash}
                  onClick={(e) => handleScroll(e, l.hash)}
                  className="hover:text-teal transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-base">{t("footer.products")}</h4>
          <ul className="space-y-2.5 text-xs text-white/70">
            <li><Link to="/products/chinese" className="hover:text-teal underline-offset-2 hover:underline transition-colors">{t("products.chinese")}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
