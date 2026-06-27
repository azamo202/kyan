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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {filteredProducts.map((p) => (
              <Link
                key={p.id}
                to="/products/$id"
                params={{ id: p.id }}
                className="group flex flex-col gap-4 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-muted border border-border/50 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                  <img
                    src={imagesGlob[p.images[0]] || p.images[0]}
                    alt={lang === "ar" ? p.nameAr : p.nameEn}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover zoom overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-sm text-foreground p-3 rounded-full scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Bottom details block */}
                <div className="flex flex-col gap-1.5 px-1">
                  <h3 className="text-foreground text-base md:text-lg font-medium truncate transition-colors group-hover:text-teal">
                    {lang === "ar" ? p.nameAr : p.nameEn}
                  </h3>
                  <div className="text-xs md:text-sm text-muted-foreground font-light">
                    <span dir="ltr" className="font-mono tracking-wider">{p.size}</span>
                  </div>
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
