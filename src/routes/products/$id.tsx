import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { productsData, imagesGlob } from "@/lib/productsData";

import { useState } from "react";
import { MessageSquare, ShieldCheck, Flame, Droplets, FlaskConical, ArrowLeft, ArrowRight, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = productsData.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.nameAr} | ${product.nameEn} - كيان المستقبل` },
        { name: "description", content: `اكتشف منتج ${product.nameAr} من كيان المستقبل. مقاس ${product.size}.` },
      ],
    };
  },
  component: ProductSinglePage,
});

function ProductSinglePage() {
  const { product } = Route.useLoaderData();
  const { lang } = useI18n();
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground animate-fade-in flex flex-col">
      <Navbar />
      <div className="pt-24 md:pt-32 flex-1 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Back button */}
          <div className="mb-6 md:mb-10">
            <Link
              to="/products/chinese"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              {lang === "ar" ? <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
              <span className="font-medium">{lang === "ar" ? "العودة للمنتجات" : "Back to Products"}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <div 
                className="relative aspect-square md:aspect-[4/3] lg:aspect-square bg-muted rounded-3xl overflow-hidden border border-border shadow-sm flex items-center justify-center p-4 group cursor-pointer"
                onClick={() => setZoomedImageIndex(0)}
              >
                <img
                  src={imagesGlob[product.images[0]] || product.images[0]}
                  alt={lang === "ar" ? product.nameAr : product.nameEn}
                  className="w-full h-full object-contain transition-all duration-500"
                />
                <button 
                  className="absolute bottom-4 end-4 p-3 rounded-full bg-background/80 backdrop-blur shadow-md hover:bg-teal hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                  aria-label="Zoom image"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col pt-2 lg:pt-6">
              
              <div className="flex items-center gap-3 mb-4">
                 <span className="text-teal/90 text-xs md:text-sm font-bold font-mono tracking-widest bg-teal/10 px-3 py-1 rounded-full border border-teal/20" dir="ltr">
                   KY-{product.id}
                 </span>
                 <span className="inline-block text-xs md:text-sm font-semibold bg-foreground text-background px-3 py-1 rounded-full">
                    {product.tag === "vanity" ? (lang === "ar" ? "مغسلة" : "Vanity") :
                     product.tag === "countertop" ? (lang === "ar" ? "سطح مطبخ" : "Countertop") :
                     (lang === "ar" ? "لوح" : "Slab")}
                 </span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 tracking-tight">
                {lang === "ar" ? product.nameAr : product.nameEn}
              </h1>

              <div className="py-6 border-y border-border mb-8">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">{lang === "ar" ? "المقاس" : "Size"}</span>
                  <span className="font-mono text-lg font-bold text-teal" dir="ltr">{product.size}</span>
                </div>
              </div>

              {/* Features grid */}
              <h3 className="text-lg font-bold mb-4">{lang === "ar" ? "المميزات" : "Features"}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                 <div className="flex flex-col items-center justify-center text-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border">
                  <ShieldCheck className="w-8 h-8 text-teal" />
                  <span className="text-xs font-semibold leading-tight">{lang === "ar" ? "مقاوم للخدش" : "Scratch Resistant"}</span>
                 </div>
                 <div className="flex flex-col items-center justify-center text-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border">
                  <Flame className="w-8 h-8 text-teal" />
                  <span className="text-xs font-semibold leading-tight">{lang === "ar" ? "مقاوم للحرارة" : "Heat Resistant"}</span>
                 </div>
                 <div className="flex flex-col items-center justify-center text-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border">
                  <Droplets className="w-8 h-8 text-teal" />
                  <span className="text-xs font-semibold leading-tight">{lang === "ar" ? "مقاوم للماء" : "Low Water Abs."}</span>
                 </div>
                 <div className="flex flex-col items-center justify-center text-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border">
                  <FlaskConical className="w-8 h-8 text-teal" />
                  <span className="text-xs font-semibold leading-tight">{lang === "ar" ? "مقاوم كيميائي" : "Chemical Res."}</span>
                 </div>
              </div>

              {/* Action */}
              <a
                href={`https://wa.me/966546107600?text=${encodeURIComponent(
                  lang === "ar"
                    ? `مرحباً شركة كيان المستقبل، أود الاستفسار عن منتج: ${product.nameAr} (كود المنتج: KY-${product.id})`
                    : `Hello Future Kayan, I would like to inquire about the product: ${product.nameEn} (Product Code: KY-${product.id})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0f7a6d] text-white py-5 px-8 rounded-2xl font-bold transition-all hover:-translate-y-1 hover:shadow-lg shadow-md text-lg w-full"
              >
                <MessageSquare className="w-6 h-6 fill-white text-white drop-shadow-md" />
                <span>{lang === "ar" ? "طلب استفسار عبر الواتساب" : "Inquire via WhatsApp"}</span>
              </a>

            </div>
          </div>

          {/* Room Scenes / Other Images */}
          {product.images.length > 1 && (
            <div className="mt-20 md:mt-32 border-t border-border/50 pt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{lang === "ar" ? "تطبيقات المنتج" : "Product Applications"}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.images.slice(1).map((img, idx) => {
                  const imgSrc = imagesGlob[img] || img;
                  return (
                  <div 
                    key={idx} 
                    className="relative rounded-3xl overflow-hidden bg-muted group cursor-pointer"
                    onClick={() => setZoomedImageIndex(idx + 1)}
                  >
                    <img src={imgSrc} alt="" className="w-full h-full object-cover aspect-[4/3] md:aspect-[3/2] transition-transform duration-700 group-hover:scale-105" />
                    <button 
                      className="absolute bottom-4 end-4 p-3 rounded-full bg-background/80 backdrop-blur shadow-md hover:bg-teal hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                      aria-label="Zoom image"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                )})}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Lightbox Modal */}
      {zoomedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setZoomedImageIndex(null)}>
          <button 
            onClick={() => setZoomedImageIndex(null)}
            className="absolute top-6 end-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {product.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : product.images.length - 1));
                }}
                className="absolute start-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomedImageIndex((prev) => (prev !== null && prev < product.images.length - 1 ? prev + 1 : 0));
                }}
                className="absolute end-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all z-10"
              >
                <ChevronRight className="w-6 h-6 rtl:rotate-180" />
              </button>
            </>
          )}

          <img 
            key={zoomedImageIndex} // Add key to force re-render/animation on change
            src={imagesGlob[product.images[zoomedImageIndex]] || product.images[zoomedImageIndex]} 
            alt="Zoomed product" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </main>
  );
}
