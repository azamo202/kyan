import { useState, useMemo, useEffect } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { ChevronLeft, ChevronRight, X, MessageSquare, ZoomIn, ShieldCheck, Flame, Droplets, FlaskConical } from "lucide-react";
import { Logo } from "@/components/site/Logo";

type Variant = "italian" | "chinese";

interface Product {
  id: string;
  images: string[];
  nameAr: string;
  nameEn: string;
  type: Variant;
  tag: "slab" | "vanity" | "countertop";
  finishAr: string;
  finishEn: string;
  size: string;
}

const imagesGlob = import.meta.glob('/src/assets/**/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }) as Record<string, string>;

const productsData: Product[] = [
  { id: "001", nameEn: "Alice Gold", nameAr: "أليس جولد", images: ["/src/assets/Alice Gold/Alice Gold Polshied.webp", "/src/assets/Alice Gold/Alice Gold Polshied1.webp", "/src/assets/Alice Gold/Alice Gold Polshied2.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "002", nameEn: "Arbeescato", nameAr: "ارابيسكاتو", images: ["/src/assets/Arbeescato/Arbeescato.webp", "/src/assets/Arbeescato/Arbeescato2.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "003", nameEn: "ARCTIC OCEAN", nameAr: "أركتيك أوشن", images: ["/src/assets/ARCTIC OCEAN/ARCTIC OCEAN.webp", "/src/assets/ARCTIC OCEAN/ARCTIC OCEAN1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "004", nameEn: "Armani Dark Grey", nameAr: "أرماني رمادي غامق", images: ["/src/assets/Armani Dark Grey/Armani Dark Grey.webp", "/src/assets/Armani Dark Grey/Armani Dark Grey1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "005", nameEn: "Bouique Calartte Gold", nameAr: "بوتيك كلكتا جولد", images: ["/src/assets/Bouique Calartte Gold/Bouique Calartte Gold.webp", "/src/assets/Bouique Calartte Gold/Bouique Calartte Gold1.webp", "/src/assets/Bouique Calartte Gold/Bouique Calartte Gold2.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "006", nameEn: "Bvlgari Black", nameAr: "بولغاري أسود", images: ["/src/assets/Bvlgari Black/Bvlgari Black.webp", "/src/assets/Bvlgari Black/Bvlgari Black1.webp", "/src/assets/Bvlgari Black/Bvlgari Black2.webp", "/src/assets/Bvlgari Black/Bvlgari Black3.webp", "/src/assets/Bvlgari Black/Bvlgari Black4.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "007", nameEn: "Calactta Gold-X", nameAr: "كلكتا جولد إكس", images: ["/src/assets/Calactta Gold-X/Calactta Gold-X.webp", "/src/assets/Calactta Gold-X/Calartte Gold 1.webp", "/src/assets/Calactta Gold-X/Calartte Gold.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "008", nameEn: "Calctta Macchia Vecchia", nameAr: "كلكتا ماكيا فيكيا", images: ["/src/assets/Calctta Macchia Vecchia/Calctta Macchia Vecchia.webp", "/src/assets/Calctta Macchia Vecchia/Calctta Macchia Vecchia1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "009", nameEn: "CHARM  IVORY", nameAr: "تشارم آيفوري", images: ["/src/assets/CHARM  IVORY/CHARM  IVORY.webp", "/src/assets/CHARM  IVORY/CHARM  IVORY1.webp", "/src/assets/CHARM  IVORY/CHARM  IVORY2.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "010", nameEn: "CRISTALLO AMBRA", nameAr: "كريستالو أمبرا", images: ["/src/assets/CRISTALLO AMBRA/CRISTALLO AMBRA.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "011", nameEn: "GOLD JADE", nameAr: "جولد جيد", images: ["/src/assets/GOLD JADE/GOLD JADE.webp", "/src/assets/GOLD JADE/GOLD JADE1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "012", nameEn: "GREEK WHITE", nameAr: "جريك وايت", images: ["/src/assets/GREEK WHITE/GREEK WHITE.webp", "/src/assets/GREEK WHITE/GREEK WHITE1.webp", "/src/assets/GREEK WHITE/GREEK WHITE2.webp", "/src/assets/GREEK WHITE/GREEK WHITE3.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "013", nameEn: "Laurent White", nameAr: "لوران وايت", images: ["/src/assets/Laurent White/Laurent White.webp", "/src/assets/Laurent White/Laurent White1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "014", nameEn: "MARMO BRUNO PERLA", nameAr: "مارمو برونو بيرلا", images: ["/src/assets/MARMO BRUNO PERLA/MARMO BRUNO PERLA.webp", "/src/assets/MARMO BRUNO PERLA/MARMO BRUNO PERLA1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "015", nameEn: "Patagonia", nameAr: "باتاغونيا", images: ["/src/assets/Patagonia/Patagonia.webp", "/src/assets/Patagonia/Patagonia1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "016", nameEn: "port Laurent", nameAr: "بورت لوران", images: ["/src/assets/port Laurent/port Laurent.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "017", nameEn: "Shakespeare Black", nameAr: "شكسبير بلاك", images: ["/src/assets/Shakespeare Black/Shakespeare Black.webp", "/src/assets/Shakespeare Black/Shakespeare Black1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "018", nameEn: "Statuario Gold", nameAr: "ستاتيواريو جولد", images: ["/src/assets/Statuario Gold/Statuario Gold.webp", "/src/assets/Statuario Gold/Statuario Gold2.webp", "/src/assets/Statuario Gold/Statuario Goldd1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "019", nameEn: "Statuario White", nameAr: "ستاتيواريو وايت", images: ["/src/assets/Statuario White/Statuario White.webp", "/src/assets/Statuario White/Statuario Whitee.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "020", nameEn: "TAJ MAHAL", nameAr: "تاج محل", images: ["/src/assets/TAJ MAHAL/TAJ MAHAL.webp", "/src/assets/TAJ MAHAL/TAJ MAHAL1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "021", nameEn: "TRAVERTINO ROMANO", nameAr: "ترافنتينو رومانو", images: ["/src/assets/TRAVERTINO ROMANO/TRAVERTINO ROMANO.webp", "/src/assets/TRAVERTINO ROMANO/TRAVERTINO ROMANO1.webp", "/src/assets/TRAVERTINO ROMANO/TRAVERTINO ROMANO2.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "022", nameEn: "Wooden", nameAr: "خشبي وودن", images: ["/src/assets/Wooden/Wooden.webp", "/src/assets/Wooden/Wooden1.webp", "/src/assets/Wooden/Wooden2.webp", "/src/assets/Wooden/Wooden3.webp", "/src/assets/Wooden/Wooden4.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" }
];

export function ProductDetail({ variant, hero }: { variant: Variant; hero: string }) {
  const { t, lang } = useI18n();
  const [activeProductIndex, setActiveProductIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const titleKey = variant === "italian" ? "products.italian" : "products.chinese";

  // Filter products based on variant
  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => p.type === variant);
  }, [variant]);

  const activeProduct = activeProductIndex !== null ? filteredProducts[activeProductIndex] : null;

  const handlePrevProduct = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeProductIndex === null) return;
    setActiveProductIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredProducts.length - 1));
    setActiveImageIndex(0);
  };

  const handleNextProduct = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeProductIndex === null) return;
    setActiveProductIndex((prev) => (prev !== null && prev < filteredProducts.length - 1 ? prev + 1 : 0));
    setActiveImageIndex(0);
  };

  // Handle keyboard events inside the lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeProductIndex === null) return;
      if (e.key === "ArrowLeft") {
        if (lang === "ar") {
          handleNextProduct();
        } else {
          handlePrevProduct();
        }
      } else if (e.key === "ArrowRight") {
        if (lang === "ar") {
          handlePrevProduct();
        } else {
          handleNextProduct();
        }
      } else if (e.key === "Escape") {
        setActiveProductIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProductIndex, filteredProducts, lang]);



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
            {filteredProducts.map((p, index) => (
              <div
                key={p.id}
                onClick={() => {
                  setActiveProductIndex(index);
                  setActiveImageIndex(0);
                }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer border border-border/30 hover:border-teal/50"
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
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-muted-foreground">
            {lang === "ar" ? "لا توجد نتائج تطابق بحثك." : "No products match your search."}
          </div>
        )}
      </div>

      {/* Lightbox / Modal Detail View */}
      {activeProductIndex !== null && activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300" onClick={() => setActiveProductIndex(null)}>
          {/* Close button */}
          <button
            onClick={() => setActiveProductIndex(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-teal hover:text-white transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevProduct}
            className="absolute start-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-teal hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
          </button>

          <button
            onClick={handleNextProduct}
            className="absolute end-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-teal hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 rtl:rotate-180" />
          </button>

          {/* Card Modal */}
          <div
            className="w-full max-w-5xl md:h-[75vh] max-h-[700px] flex flex-col bg-gradient-to-br from-[#232529] to-[#0f1012] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 mx-auto relative backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 p-4 md:px-8 md:pt-8 md:pb-5 border-b border-white/10 bg-white/5 shrink-0">
               <div className="flex flex-col gap-2 w-full">
                 <div className="flex items-center justify-between w-full">
                   <div className="flex flex-col text-start w-full">
                     <span className="text-xl md:text-3xl font-black uppercase tracking-wider flex items-center gap-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent drop-shadow-sm">
                       {activeProduct.type === "italian" ? "🇮🇹" : "🇨🇳"} {lang === "ar" ? activeProduct.nameAr : activeProduct.nameEn}
                     </span>
                     <div className="flex items-center gap-3 mt-2">
                       <span className="text-white/50 text-xs md:text-sm font-mono uppercase tracking-widest">
                         KY-{activeProduct.id}
                       </span>
                       <span className="text-teal/90 text-xs md:text-sm font-bold font-mono tracking-widest bg-teal/10 px-3 py-0.5 rounded-full border border-teal/20" dir="ltr">
                         {activeProduct.size}
                       </span>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col md:flex-row flex-1 p-4 md:px-6 md:py-4 gap-4 md:gap-6 overflow-hidden">
              {/* Features (Left side) */}
              <div className="flex md:flex-col gap-3 md:gap-6 md:w-32 justify-center md:justify-start overflow-x-auto md:overflow-y-auto shrink-0 custom-scrollbar pb-2 md:pb-0">
                <div className="flex flex-col items-center text-center gap-1.5 min-w-[70px]">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner flex items-center justify-center text-white/90 hover:scale-110 transition-transform cursor-default">
                    <ShieldCheck className="w-4 h-4 drop-shadow-md" />
                  </div>
                  <span className="text-[9px] md:text-[10px] text-white/70 uppercase max-w-[90px] leading-tight font-medium tracking-wide">{lang === "ar" ? "مقاوم للخدش" : "Scratch Resistant"}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 min-w-[70px]">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner flex items-center justify-center text-white/90 hover:scale-110 transition-transform cursor-default">
                    <Flame className="w-4 h-4 drop-shadow-md" />
                  </div>
                  <span className="text-[9px] md:text-[10px] text-white/70 uppercase max-w-[90px] leading-tight font-medium tracking-wide">{lang === "ar" ? "مقاوم للحرارة" : "High Temp. Resistant"}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 min-w-[70px]">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner flex items-center justify-center text-white/90 hover:scale-110 transition-transform cursor-default">
                    <Droplets className="w-4 h-4 drop-shadow-md" />
                  </div>
                  <span className="text-[9px] md:text-[10px] text-white/70 uppercase max-w-[90px] leading-tight font-medium tracking-wide">{lang === "ar" ? "مقاوم للماء" : "Low Water Absorption"}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 min-w-[70px]">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner flex items-center justify-center text-white/90 hover:scale-110 transition-transform cursor-default">
                    <FlaskConical className="w-4 h-4 drop-shadow-md" />
                  </div>
                  <span className="text-[9px] md:text-[10px] text-white/70 uppercase max-w-[90px] leading-tight font-medium tracking-wide">{lang === "ar" ? "مقاوم للمواد الكيميائية" : "Chemical Resistant"}</span>
                </div>
              </div>

              {/* Product Main Image */}
              <div className="flex-1 flex flex-col items-center justify-center relative min-h-[250px] md:min-h-0 bg-gradient-to-tr from-white/5 to-transparent rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                <img
                  src={imagesGlob[activeProduct.images[activeImageIndex]] || activeProduct.images[activeImageIndex]}
                  alt={lang === "ar" ? activeProduct.nameAr : activeProduct.nameEn}
                  className="absolute inset-0 w-full h-full object-contain p-2 transition-all duration-300"
                />
                
                {activeProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : activeProduct.images.length - 1)); }}
                      className="absolute start-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-teal transition-colors border border-white/10"
                    >
                      <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev < activeProduct.images.length - 1 ? prev + 1 : 0)); }}
                      className="absolute end-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-teal transition-colors border border-white/10"
                    >
                      <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Footer / Interaction Area */}
            <div className="flex flex-col gap-4 p-5 md:px-8 md:pb-6 bg-black/20 border-t border-white/5">
               {/* Thumbnail Strip */}
               {activeProduct.images.length > 1 && (
                 <div className="flex justify-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
                   {activeProduct.images.map((img, idx) => (
                     <button
                       key={img}
                       onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                       className={`relative shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-teal scale-100 opacity-100 shadow-lg shadow-teal/20' : 'border-white/10 scale-95 opacity-50 hover:opacity-100'}`}
                     >
                       <img src={imagesGlob[img] || img} className="w-full h-full object-cover" />
                     </button>
                   ))}
                 </div>
               )}

               {/* Action Area & Certifications */}
               <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
                 <div className="flex items-center gap-4 text-white/40 font-bold text-lg md:text-xl tracking-widest uppercase">
                   <span>NSF</span>
                   <span>ISO</span>
                   <span>CE</span>
                 </div>
                 
                 <a
                   href={`https://wa.me/966546111600?text=${encodeURIComponent(
                     lang === "ar"
                       ? `مرحباً شركة كيان المستقبل، أود الاستفسار عن منتج: ${activeProduct.nameAr} (كود المنتج: KY-${activeProduct.id})`
                       : `Hello Future Kayan, I would like to inquire about the product: ${activeProduct.nameEn} (Product Code: KY-${activeProduct.id})`
                   )}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0f7a6d] text-white py-3 px-8 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,211,102,0.4)] text-sm md:text-base w-full md:w-auto cursor-pointer border border-white/20"
                 >
                   <MessageSquare className="w-5 h-5 fill-white text-white drop-shadow-md" />
                   <span className="drop-shadow-sm">{lang === "ar" ? "طلب استفسار عبر الواتساب" : "Inquire via WhatsApp"}</span>
                 </a>
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
