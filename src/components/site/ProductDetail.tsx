import { useMemo } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Maximize } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Variant, productsData, imagesGlob } from "@/lib/productsData";

export function ProductDetail({ variant, hero }: { variant: Variant; hero: string }) {
  const { t, lang } = useI18n();
  const titleKey = variant === "italian" ? "products.italian" : "products.chinese";

  // Filter products based on variant
  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => p.type === variant);
  }, [variant]);

  const bannerImages = useMemo(() => {
    return filteredProducts.slice(0, 3).map(p => imagesGlob[p.images[0]] || p.images[0]);
  }, [filteredProducts]);

  return (
    <section className="bg-white min-h-[50vh] relative">
      {/* Elegant Hero banner */}
      <div className="relative h-[380px] md:h-[480px] overflow-hidden bg-gradient-to-br from-[#eaf6f7] via-white to-teal/10">
        {/* Abstract shapes / patterns */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-64 md:w-96 h-64 md:h-96 bg-teal/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-72 md:w-[400px] h-72 md:h-[400px] bg-teal/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Banner content */}
        <div className="relative z-10 h-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-8 py-12 gap-8">
          
          {/* Text Content */}
          <div className="text-center md:text-start md:max-w-xl z-20 flex-1 flex flex-col items-center md:items-start justify-center">
            <div className="inline-block px-4 py-1.5 mb-4 md:mb-6 rounded-full bg-teal/10 text-teal text-xs font-bold tracking-widest uppercase shadow-sm border border-teal/20">
              {t("products.label")}
            </div>
            <h1 className="text-ink text-4xl md:text-6xl font-black mb-4 md:mb-6 leading-tight drop-shadow-sm">
              {t(titleKey)}
            </h1>
            <p className="text-ink/70 text-sm md:text-lg leading-relaxed max-w-md">
              {t("products.desc")}
            </p>
          </div>

          {/* Image Collage */}
          {bannerImages.length > 0 && (
            <div className="hidden md:flex flex-1 relative h-full items-center justify-center">
               <div className="relative w-full h-[320px]">
                 {bannerImages[0] && (
                   <div className="absolute top-4 right-8 w-44 h-44 rounded-3xl overflow-hidden shadow-2xl rotate-6 transform origin-bottom-right transition-transform hover:rotate-12 duration-500 border-2 border-white">
                     <img src={bannerImages[0]} alt="" className="w-full h-full object-cover" />
                   </div>
                 )}
                 {bannerImages[1] && (
                   <div className="absolute bottom-0 left-12 w-40 h-40 rounded-3xl overflow-hidden shadow-2xl -rotate-6 transform origin-top-left z-10 transition-transform hover:-rotate-12 duration-500 border-2 border-white">
                     <img src={bannerImages[1]} alt="" className="w-full h-full object-cover" />
                   </div>
                 )}
                 {bannerImages[2] && (
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-20 border-4 border-white hover:scale-105 transition-transform duration-500">
                     <img src={bannerImages[2]} alt="" className="w-full h-full object-cover" />
                   </div>
                 )}
               </div>
            </div>
          )}
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
                    <div className="bg-black/70 backdrop-blur-sm text-white p-3 rounded-full scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
                      <Maximize className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Bottom details block */}
                <div className="flex flex-col gap-2 px-1 pb-1 text-center mt-2">
                  <h3 className="text-foreground text-base md:text-lg font-bold truncate transition-colors group-hover:text-teal">
                    {lang === "ar" ? p.nameAr : p.nameEn}
                  </h3>
                  <div className="flex flex-col gap-1 text-xs md:text-sm text-muted-foreground font-medium">
                    <span dir="ltr" className="font-mono tracking-wider">{p.size}</span>
                    <span>{lang === "ar" ? "بلد المنشأ: الصين" : "Origin: China"}</span>
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
