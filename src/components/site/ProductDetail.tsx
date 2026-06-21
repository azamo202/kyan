import { useMemo } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { ZoomIn } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Variant, productsData, imagesGlob } from "@/lib/productsData";

export function ProductDetail({ variant, hero }: { variant: Variant; hero: string }) {
  const { t, lang } = useI18n();
  const titleKey = variant === "italian" ? "products.italian" : "products.chinese";

  // Filter products based on variant
  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => p.type === variant);
  }, [variant]);

  return (
    <section className="bg-white min-h-[50vh] relative">
      {/* Hero banner */}
      <div className="relative h-[300px] md:h-[380px] overflow-hidden bg-ink">
        {hero && <img src={hero} alt={t(titleKey)} className="absolute inset-0 w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/35" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-white text-3xl md:text-5xl font-black mb-3 drop-shadow-lg">{t(titleKey)}</h1>
          <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-xl">{t("products.desc")}</p>
        </div>
      </div>

      {/* Main Catalog Section */}
      <div className="py-12 md:py-16 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Grid View */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((p) => (
              <Link
                key={p.id}
                to="/products/$id"
                params={{ id: p.id }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer border border-border/30 hover:border-teal/50 block"
              >
                {/* Image */}
                <img
                  src={imagesGlob[p.images[0]] || p.images[0]}
                  alt={lang === "ar" ? p.nameAr : p.nameEn}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover zoom overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-md text-white p-2.5 rounded-full scale-75 group-hover:scale-100 transition-all duration-300">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom details block */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 text-start">
                  <span className="inline-block text-[9px] md:text-[10px] font-semibold bg-teal text-white px-2 py-0.5 rounded-full mb-1.5">
                    {p.tag === "vanity" ? (lang === "ar" ? "مغسلة" : "Vanity") :
                     p.tag === "countertop" ? (lang === "ar" ? "سطح مطبخ" : "Countertop") :
                     (lang === "ar" ? "لوح" : "Slab")}
                  </span>
                  <div className="text-[9px] md:text-[10px] text-white/60 font-mono">
                    KY-{p.id}
                  </div>
                  <h3 className="text-white text-xs md:text-sm font-bold line-clamp-1 group-hover:text-teal transition-colors">
                    {lang === "ar" ? p.nameAr : p.nameEn}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-muted-foreground">
            {lang === "ar" ? "لا توجد نتائج تطابق بحثك." : "No products match your search."}
          </div>
        )}
      </div>
    </section>
  );
}
