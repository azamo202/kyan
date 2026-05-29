import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { Link } from "@tanstack/react-router";
import italian from "@/assets/porcelain-italian.jpg";
import chinese from "@/assets/porcelain-chinese.jpg";
import { useI18n } from "@/i18n/I18nProvider";

export function Products() {
  const { t } = useI18n();
  const products = [
    { titleKey: "products.italian", count: "+120", img: italian },
    { titleKey: "products.chinese", count: "+85", img: chinese },
  ];
  return (
    <section id="products" className="py-20 md:py-28 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-14">
          <span className="section-label">{t("products.label")}</span>
          <h2 className="text-3xl md:text-5xl font-black text-ink">{t("products.title")}</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">{t("products.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {products.map((p) => (
            <article key={p.titleKey} className="group relative h-[360px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg cursor-pointer">
              <img src={p.img} alt={t(p.titleKey)} loading="lazy" width={1000} height={1000} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-start text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{t(p.titleKey)}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-sm">{t("products.desc")}</p>
                <div className="flex items-center justify-between">
                  <Link to="/products" className="inline-flex items-center gap-1.5 border border-white/40 hover:bg-teal hover:border-teal text-white text-sm rounded-md px-4 py-2 transition-all">
                    <ChevronLeft className="w-4 h-4 rtl:hidden" />
                    <ChevronRight className="w-4 h-4 hidden rtl:block" />
                    <span>{t("products.explore")}</span>
                  </Link>
                  <div className="flex items-center gap-1.5 text-sm text-white/90">
                    <span>{p.count} {t("products.available")}</span>
                    <Layers className="w-4 h-4 text-teal" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
