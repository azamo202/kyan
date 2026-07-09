import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import chinese from "@/assets/images/porcelain-chinese.webp";
import { useI18n } from "@/i18n/I18nProvider";

export function Products() {
  const { t } = useI18n();
  const products = [
    { titleKey: "products.chinese", img: chinese, to: "/products/chinese" as const },
  ];
  return (
    <section id="products" className="py-20 md:py-28 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-14">
          <h2 className="text-3xl md:text-5xl font-black text-ink">{t("products.title")}</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">{t("products.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-1 max-w-3xl mx-auto gap-6 md:gap-8">
          {products.map((p) => (
            <Link key={p.titleKey} to={p.to} className="group relative block h-[360px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg cursor-pointer no-underline">
              <img src={p.img} alt={t(p.titleKey)} loading="lazy" width={1000} height={1000} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-start text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{t(p.titleKey)}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-sm">{t("products.desc")}</p>
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 border border-white/40 group-hover:bg-teal group-hover:border-teal text-white text-sm rounded-md px-4 py-2 transition-all">
                    <ChevronLeft className="w-4 h-4 rtl:hidden" />
                    <ChevronRight className="w-4 h-4 hidden rtl:block" />
                    <span>{t("products.explore")}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
