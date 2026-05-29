import { useI18n } from "@/i18n/I18nProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Variant = "italian" | "chinese";

const tileStyles = [
  { bg: "linear-gradient(135deg, #3d2f28 0%, #2a201b 50%, #4a3a30 100%)", overlay: "radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.08), transparent 60%)" },
  { bg: "linear-gradient(135deg, #f5f1ea 0%, #e8e0d2 50%, #faf6ee 100%)", overlay: "radial-gradient(ellipse at 70% 60%, rgba(180,170,150,0.25), transparent 60%)" },
  { bg: "linear-gradient(135deg, #e8e4dc 0%, #d8d0c2 50%, #f0ead8 100%)", overlay: "radial-gradient(ellipse at 40% 30%, rgba(140,130,110,0.2), transparent 70%)" },
  { bg: "linear-gradient(135deg, #5a5042 0%, #3d3528 50%, #6a5e4a 100%)", overlay: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.06), transparent)" },
  { bg: "linear-gradient(135deg, #8b6a3e 0%, #6a4c28 50%, #a07c4a 100%)", overlay: "repeating-linear-gradient(85deg, rgba(0,0,0,0.1) 0px, transparent 4px, rgba(255,255,255,0.05) 8px)" },
  { bg: "linear-gradient(135deg, #b8b0a4 0%, #9a9286 50%, #c8c0b2 100%)", overlay: "radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.15), transparent 60%)" },
  { bg: "linear-gradient(135deg, #1a1814 0%, #0a0806 50%, #2a2620 100%)", overlay: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.04), transparent)" },
  { bg: "linear-gradient(135deg, #f0ead8 0%, #d8c8a0 50%, #faf2dc 100%)", overlay: "radial-gradient(ellipse at 30% 70%, rgba(120,100,60,0.2), transparent 65%)" },
  { bg: "linear-gradient(135deg, #3a2d20 0%, #221a12 50%, #4a3a28 100%)", overlay: "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.06), transparent)" },
  { bg: "linear-gradient(135deg, #ede4cc 0%, #c8b888 50%, #f5ecd4 100%)", overlay: "radial-gradient(ellipse at 70% 50%, rgba(120,100,60,0.25), transparent 60%)" },
];

export function ProductDetail({ variant, hero }: { variant: Variant; hero: string }) {
  const { t } = useI18n();
  const titleKey = variant === "italian" ? "products.italian" : "products.chinese";
  return (
    <section className="bg-white">
      {/* Hero banner */}
      <div className="relative h-[420px] md:h-[480px] overflow-hidden">
        <img src={hero} alt={t(titleKey)} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto">
          <h1 className="text-white text-4xl md:text-6xl font-black mb-4">{t(titleKey)}</h1>
          <p className="text-white/85 text-sm md:text-base leading-relaxed mb-6 max-w-xl">{t("products.desc")}</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#types" className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white px-5 py-2.5 rounded-md font-medium transition-all shadow-lg">
              <span>{t("products.explore")}</span>
              <ChevronLeft className="w-4 h-4 rtl:hidden" />
              <ChevronRight className="w-4 h-4 hidden rtl:block" />
            </a>
            <a href="/#contact" className="text-white font-medium border-b-2 border-teal pb-1 hover:text-teal transition-colors text-sm">{t("hero.cta2")}</a>
          </div>
        </div>
      </div>

      {/* Types grid */}
      <div id="types" className="py-14 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-10 md:mb-14">
            <span className="section-label">{t("products.types")}</span>
            <h2 className="text-2xl md:text-4xl font-black text-ink">{t("products.chooseTitle")}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {tileStyles.map((s, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="absolute inset-0" style={{ background: s.bg }} />
                <div className="absolute inset-0" style={{ background: s.overlay }} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
                  <div className="bg-black/55 backdrop-blur-sm rounded-md px-3 py-2 text-white text-xs md:text-sm font-medium text-center group-hover:bg-teal/80 transition-colors">
                    Rovere Baio
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
