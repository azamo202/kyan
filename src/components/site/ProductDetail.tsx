import { useState, useMemo, useEffect } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { ChevronLeft, ChevronRight, Search, X, MessageSquare, ZoomIn } from "lucide-react";

// Import all 33 images
import img20 from "@/assets/20.png";
import img21 from "@/assets/21.png";
import img22 from "@/assets/22.png";
import img23 from "@/assets/23.png";
import img24 from "@/assets/24.png";
import img25 from "@/assets/25.png";
import img26 from "@/assets/26.png";
import img27 from "@/assets/27.png";
import img28 from "@/assets/28.png";
import img29 from "@/assets/29.png";
import img30 from "@/assets/30.png";
import img31 from "@/assets/31.png";
import img33 from "@/assets/33.png";
import img34 from "@/assets/34.png";
import img35 from "@/assets/35.png";
import img36 from "@/assets/36.png";
import img37 from "@/assets/37.png";
import img38 from "@/assets/38.png";
import img39 from "@/assets/39.png";
import img40 from "@/assets/40.png";
import img41 from "@/assets/41.png";
import img42 from "@/assets/42.png";
import img43 from "@/assets/43.png";
import img44 from "@/assets/44.png";
import img45 from "@/assets/45.png";
import img46 from "@/assets/46.png";
import img47 from "@/assets/47.png";
import img48 from "@/assets/48.png";
import img49 from "@/assets/49.png";
import img50 from "@/assets/50.png";
import img51 from "@/assets/51.png";
import img52 from "@/assets/52.png";
import img323 from "@/assets/323.png";

type Variant = "italian" | "chinese";

interface Product {
  id: string;
  img: string;
  nameAr: string;
  nameEn: string;
  type: Variant;
  tag: "slab" | "vanity" | "countertop";
  finishAr: string;
  finishEn: string;
  size: string;
}

const productsData: Product[] = [
  // Italian Porcelain Slabs
  { id: "20", img: img20, nameAr: "ألواح بورسلان إيطالي رمادي فاخر", nameEn: "Luxury Grey Italian Porcelain Slab", type: "italian", tag: "slab", finishAr: "مطفي ناعم", finishEn: "Soft Matte", size: "160x320 سم" },
  { id: "21", img: img21, nameAr: "بورسلان كلكتا عروق ذهبية", nameEn: "Calacatta Gold Porcelain Slab", type: "italian", tag: "slab", finishAr: "مصقول لامع", finishEn: "Polished", size: "160x320 سم" },
  { id: "22", img: img22, nameAr: "طاولة بورسلان مودرن دائرية", nameEn: "Modern Round Porcelain Table", type: "italian", tag: "slab", finishAr: "مصقول", finishEn: "Polished", size: "حسب الطلب" },
  { id: "23", img: img23, nameAr: "ألواح بورسلان أسود ملكي مصقول", nameEn: "Royal Black Polished Porcelain", type: "italian", tag: "slab", finishAr: "مصقول عالي اللمعان", finishEn: "High Gloss Polished", size: "160x320 سم" },
  { id: "24", img: img24, nameAr: "بورسلان ستاتيواريو كلاسيك", nameEn: "Statuario Classic Porcelain Slab", type: "italian", tag: "slab", finishAr: "مصقول لامع", finishEn: "Polished", size: "160x320 سم" },
  { id: "25", img: img25, nameAr: "تصميم جداري بورسلان بوكماتش متناسق", nameEn: "Bookmatch Porcelain Wall Design", type: "italian", tag: "slab", finishAr: "مصقول عالي اللمعان", finishEn: "High Gloss Polished", size: "320x320 سم" },
  { id: "26", img: img26, nameAr: "بورسلان رمادي داكن ناعم", nameEn: "Soft Dark Grey Porcelain Slab", type: "italian", tag: "slab", finishAr: "مطفي", finishEn: "Matte", size: "120x280 سم" },
  { id: "27", img: img27, nameAr: "بورسلان بيج كلاسيكي دافئ", nameEn: "Classic Warm Beige Porcelain", type: "italian", tag: "slab", finishAr: "مطفي ناعم", finishEn: "Soft Matte", size: "120x240 سم" },
  { id: "28", img: img28, nameAr: "ألواح بورسلان برونزي فاخرة", nameEn: "Luxury Bronze Porcelain Slab", type: "italian", tag: "slab", finishAr: "مطفي ميتاليك", finishEn: "Matte Metallic", size: "160x320 سم" },
  { id: "29", img: img29, nameAr: "بورسلان رمادي عروق بيضاء", nameEn: "Grey Veined White Porcelain", type: "italian", tag: "slab", finishAr: "مصقول", finishEn: "Polished", size: "120x280 سم" },
  { id: "30", img: img30, nameAr: "لوح بورسلان سوبر وايت مصقول", nameEn: "Polished Super White Porcelain", type: "italian", tag: "slab", finishAr: "مصقول عالي اللمعان", finishEn: "High Gloss Polished", size: "160x320 سم" },
  { id: "31", img: img31, nameAr: "بورسلان إسباني رمادي ناعم", nameEn: "Luxury Spanish Soft Grey Porcelain", type: "italian", tag: "slab", finishAr: "مطفي ناعم", finishEn: "Soft Matte", size: "120x260 سم" },
  { id: "33", img: img33, nameAr: "لوح بورسلان ترافنتينو كلاسيكي", nameEn: "Classic Travertine Porcelain Slab", type: "italian", tag: "slab", finishAr: "مطفي محفر", finishEn: "Textured Matte", size: "160x320 سم" },
  { id: "34", img: img34, nameAr: "لوح بورسلان ميتاليك أسود داكن", nameEn: "Metallic Dark Black Porcelain Slab", type: "italian", tag: "slab", finishAr: "مطفي ميتاليك", finishEn: "Matte Metallic", size: "120x280 سم" },
  { id: "35", img: img35, nameAr: "لوح بورسلان أونيكس بلورات زرقاء فاخرة", nameEn: "Luxury Blue Onyx Porcelain", type: "italian", tag: "slab", finishAr: "مصقول كريستال", finishEn: "Crystal Polished", size: "160x320 سم" },
  
  // Italian Sinks / Vanities
  { id: "36", img: img36, nameAr: "مغسلة بورسلان حوض فردي مودرن", nameEn: "Modern Single Basin Porcelain Vanity", type: "italian", tag: "vanity", finishAr: "مطفي", finishEn: "Matte", size: "100x50 سم" },
  { id: "37", img: img37, nameAr: "مغسلة رخامية فاخرة مدمجة بالجدار", nameEn: "Integrated Luxury Wall Marble Sink", type: "italian", tag: "vanity", finishAr: "مصقول", finishEn: "Polished", size: "120x50 سم" },
  { id: "38", img: img38, nameAr: "مغسلة بورسلان رمادية مدمجة عصرية", nameEn: "Modern Grey Integrated Porcelain Vanity", type: "italian", tag: "vanity", finishAr: "مطفي ناعم", finishEn: "Soft Matte", size: "110x50 سم" },
  { id: "39", img: img39, nameAr: "مغسلة بورسلان حوضين معلقة مريحة", nameEn: "Double Basin Wall-Hung Vanity", type: "italian", tag: "vanity", finishAr: "مصقول", finishEn: "Polished", size: "160x50 سم" },
  { id: "40", img: img40, nameAr: "مغسلة بورسلان أسود ذهبي فاخرة", nameEn: "Premium Black & Gold Porcelain Vanity", type: "italian", tag: "vanity", finishAr: "مصقول", finishEn: "Polished", size: "120x55 سم" },
  { id: "41", img: img41, nameAr: "مغسلة بورسلان بيضاء مع أرفف تخزين", nameEn: "White Porcelain Vanity with Shelves", type: "italian", tag: "vanity", finishAr: "مطفي", finishEn: "Matte", size: "90x50 سم" },
  { id: "42", img: img42, nameAr: "مغسلة رخام طبيعي إمبراطور منقوشة", nameEn: "Carved Emperador Natural Marble Vanity", type: "italian", tag: "vanity", finishAr: "مصقول", finishEn: "Polished", size: "100x50 سم" },
  { id: "43", img: img43, nameAr: "مغسلة بورسلان رمادي مع إضاءة LED", nameEn: "Grey Porcelain Vanity with LED Space", type: "italian", tag: "vanity", finishAr: "مطفي ناعم", finishEn: "Soft Matte", size: "120x50 سم" },
  { id: "44", img: img44, nameAr: "مغسلة بورسلان كلاسيكية بيج ناعم", nameEn: "Classic Soft Beige Porcelain Vanity", type: "italian", tag: "vanity", finishAr: "مطفي", finishEn: "Matte", size: "80x50 سم" },
  { id: "323", img: img323, nameAr: "مغسلة بورسلان كيان الفاخرة الخاصة", nameEn: "Kayan Signature Premium Vanity", type: "italian", tag: "vanity", finishAr: "مصقول كريستال", finishEn: "Crystal Polished", size: "140x55 سم" },

  // Chinese Kitchen Countertops
  { id: "45", img: img45, nameAr: "سطح مطبخ بورسلان مقاوم للحرارة والخدش", nameEn: "Heat-Resistant Porcelain Kitchen Countertop", type: "chinese", tag: "countertop", finishAr: "مطفي ناعم", finishEn: "Soft Matte", size: "حسب تصميم المطبخ" },
  { id: "46", img: img46, nameAr: "سطح مطبخ بورسلان كلكتا رمادي فاخر", nameEn: "Calacatta Grey Veined Countertop", type: "chinese", tag: "countertop", finishAr: "مصقول مقاوم للبقع", finishEn: "Stain-Resistant Polished", size: "حسب تصميم المطبخ" },
  { id: "47", img: img47, nameAr: "سطح جزيرة مطبخ بورسلان بتصميم متكامل", nameEn: "Integrated Porcelain Kitchen Island", type: "chinese", tag: "countertop", finishAr: "مطفي", finishEn: "Matte", size: "حسب الطلب" },
  { id: "48", img: img48, nameAr: "سطح عمل مطبخ بورسلان أسود بركان", nameEn: "Black Volcano Porcelain Worktop", type: "chinese", tag: "countertop", finishAr: "مطفي محفر", finishEn: "Textured Matte", size: "حسب تصميم المطبخ" },
  { id: "49", img: img49, nameAr: "سطح مطبخ بورسلان كوارتز رمادي مودرن", nameEn: "Modern Grey Quartz Porcelain Countertop", type: "chinese", tag: "countertop", finishAr: "مطفي", finishEn: "Matte", size: "حسب الطلب" },
  { id: "50", img: img50, nameAr: "سطح مطبخ بورسلان أبيض ثلجي ناصع", nameEn: "Snow White Porcelain Kitchen Surface", type: "chinese", tag: "countertop", finishAr: "مصقول", finishEn: "Polished", size: "حسب تصميم المطبخ" },
  { id: "51", img: img51, nameAr: "سطح مطبخ بورسلان بيج دافئ مقاوم للرطوبة", nameEn: "Moisture-Resistant Beige Porcelain Countertop", type: "chinese", tag: "countertop", finishAr: "مطفي ناعم", finishEn: "Soft Matte", size: "حسب تصميم المطبخ" },
  { id: "52", img: img52, nameAr: "سطح مطبخ بورسلان برونزي بتصميم فاخر", nameEn: "Premium Bronze Porcelain Countertop", type: "chinese", tag: "countertop", finishAr: "مطفي ميتاليك", finishEn: "Matte Metallic", size: "حسب الطلب" }
];

export function ProductDetail({ variant, hero }: { variant: Variant; hero: string }) {
  const { t, lang } = useI18n();
  const [activeTag, setActiveTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [activeProductIndex, setActiveProductIndex] = useState<number | null>(null);

  const titleKey = variant === "italian" ? "products.italian" : "products.chinese";

  // Filter products based on variant, subcategory tag, and search query
  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => {
      // 1. Match current variant
      if (p.type !== variant) return false;

      // 2. Match subcategory tag
      if (activeTag !== "all" && p.tag !== activeTag) return false;

      // 3. Match search query
      const query = searchQuery.trim().toLowerCase();
      if (query !== "") {
        const matchesName = lang === "ar"
          ? p.nameAr.toLowerCase().includes(query)
          : p.nameEn.toLowerCase().includes(query);
        const matchesCode = `ky-${p.id}`.includes(query) || p.id.includes(query);
        return matchesName || matchesCode;
      }

      return true;
    });
  }, [variant, activeTag, searchQuery, lang]);

  const activeProduct = activeProductIndex !== null ? filteredProducts[activeProductIndex] : null;

  const handlePrevProduct = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeProductIndex === null) return;
    setActiveProductIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredProducts.length - 1));
  };

  const handleNextProduct = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeProductIndex === null) return;
    setActiveProductIndex((prev) => (prev !== null && prev < filteredProducts.length - 1 ? prev + 1 : 0));
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

  // Available tags depending on variant
  const availableTags = useMemo(() => {
    if (variant === "italian") {
      return [
        { id: "all", labelAr: "الكل", labelEn: "All" },
        { id: "slab", labelAr: "ألواح البورسلان والرخام", labelEn: "Slabs & Tiles" },
        { id: "vanity", labelAr: "المغاسل الفاخرة", labelEn: "Luxury Vanities" },
      ];
    } else {
      return [
        { id: "all", labelAr: "الكل", labelEn: "All" },
        { id: "countertop", labelAr: "أسطح المطابخ", labelEn: "Kitchen Countertops" },
      ];
    }
  }, [variant]);

  return (
    <section className="bg-white min-h-[50vh] relative">
      {/* Hero banner */}
      <div className="relative h-[300px] md:h-[380px] overflow-hidden">
        <img src={hero} alt={t(titleKey)} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/35" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-white text-3xl md:text-5xl font-black mb-3 drop-shadow-lg">{t(titleKey)}</h1>
          <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-xl">{t("products.desc")}</p>
        </div>
      </div>

      {/* Main Catalog Section */}
      <div className="py-12 md:py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-border/60">
          {/* Subcategory Pills */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {availableTags.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTag(tab.id);
                  setActiveProductIndex(null);
                }}
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                  activeTag === tab.id
                    ? "bg-teal text-white shadow-md shadow-teal/20 scale-105"
                    : "bg-muted text-ink/75 hover:bg-teal/10 hover:text-teal"
                }`}
              >
                {lang === "ar" ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64 order-1 md:order-2">
            <input
              type="text"
              placeholder={lang === "ar" ? "ابحث عن منتج..." : "Search products..."}
              value={searchQuery === " " ? "" : searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveProductIndex(null);
              }}
              className="w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-full border border-border bg-white text-ink focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
              dir="auto"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Counter */}
        <div className="text-start mb-6 text-xs md:text-sm text-muted-foreground">
          {lang === "ar"
            ? `تم العثور على ${filteredProducts.length} منتج`
            : `Found ${filteredProducts.length} products`}
        </div>

        {/* Grid View */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((p, index) => (
              <div
                key={p.id}
                onClick={() => setActiveProductIndex(index)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer border border-border/30 hover:border-teal/50"
              >
                {/* Image */}
                <img
                  src={p.img}
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
            className="w-full max-w-4xl max-h-[90vh] grid md:grid-cols-2 bg-ink rounded-3xl overflow-hidden shadow-2xl p-4 md:p-6 border border-white/10 mx-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Left Image Column */}
            <div className="relative flex items-center justify-center bg-black/40 rounded-2xl overflow-hidden aspect-square md:aspect-auto md:h-[450px]">
              <img
                src={activeProduct.img}
                alt={lang === "ar" ? activeProduct.nameAr : activeProduct.nameEn}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Right Information Column */}
            <div className="flex flex-col justify-between text-start text-white p-3 md:p-6 space-y-6">
              <div className="space-y-4">
                <span className="inline-block text-xs font-semibold bg-teal text-white px-3 py-1 rounded-full">
                  {activeProduct.tag === "vanity" ? (lang === "ar" ? "مغسلة فاخرة" : "Premium Vanity") :
                   activeProduct.tag === "countertop" ? (lang === "ar" ? "سطح مطبخ بورسلان" : "Porcelain Countertop") :
                   (lang === "ar" ? "لوح بورسلان/رخام" : "Porcelain/Marble Slab")}
                </span>

                <div className="text-xs font-mono text-white/50">
                  {lang === "ar" ? "كود المنتج" : "Product Code"}: KY-{activeProduct.id}
                </div>

                <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-snug">
                  {lang === "ar" ? activeProduct.nameAr : activeProduct.nameEn}
                </h2>

                <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-4 text-xs md:text-sm">
                  <div>
                    <span className="block text-white/50 mb-0.5">{lang === "ar" ? "نوع التشطيب" : "Finish Type"}</span>
                    <span className="font-semibold text-white/90">{lang === "ar" ? activeProduct.finishAr : activeProduct.finishEn}</span>
                  </div>
                  <div>
                    <span className="block text-white/50 mb-0.5">{lang === "ar" ? "المقاس المتوفر" : "Available Size"}</span>
                    <span className="font-semibold text-white/90">{activeProduct.size}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <p className="text-xs text-white/70 leading-relaxed">
                  {lang === "ar"
                    ? "جميع منتجاتنا مصنعة بأعلى درجات الجودة، ومقاومة للمياه والخدش والحرارة. يمكنك النقر أدناه للتواصل والاستفسار الفوري حول هذا الموديل."
                    : "All our products are manufactured to the highest standards, ensuring water, scratch, and temperature resistance. Click below to inquire immediately."
                  }
                </p>

                {/* WhatsApp Link */}
                <a
                  href={`https://wa.me/966546111600?text=${encodeURIComponent(
                    lang === "ar"
                      ? `مرحباً شركة كيان المستقبل، أود الاستفسار عن منتج: ${activeProduct.nameAr} (كود المنتج: KY-${activeProduct.id})`
                      : `Hello Future Kayan, I would like to inquire about the product: ${activeProduct.nameEn} (Product Code: KY-${activeProduct.id})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-5 rounded-xl font-bold transition-all hover:scale-[1.01] active:scale-95 shadow-lg shadow-[#25d366]/20 text-center w-full cursor-pointer text-xs md:text-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-white" />
                  <span>{lang === "ar" ? "طلب استفسار عبر الواتساب" : "Inquire via WhatsApp"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
