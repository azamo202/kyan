import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import logoFooter from "@/assets/18.png";
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
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-teal text-white flex items-center justify-center transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h4 className="font-bold mb-4 text-base">{t("footer.contact")}</h4>
          <ul className="space-y-3 text-xs text-white/70">
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-teal mt-0.5 shrink-0" />
              <div>
                <div>+966 546111600</div>
                <div>+966 532563637</div>
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
            <li><Link to="/products" className="hover:text-teal underline-offset-2 hover:underline transition-colors">{t("products.italian")}</Link></li>
            <li><Link to="/products" className="hover:text-teal underline-offset-2 hover:underline transition-colors">{t("products.chinese")}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
