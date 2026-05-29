import { ChevronLeft, ChevronRight, Gem, Shield } from "lucide-react";
import heroImg from "@/assets/hero-kitchen.jpg";
import { useI18n } from "@/i18n/I18nProvider";

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="home" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      <img src={heroImg} alt="Modern luxury kitchen" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1280} />
      <div className="absolute inset-0 bg-black/40" />

      <button aria-label="previous" className="absolute end-3 md:end-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal text-white flex items-center justify-center hover:bg-teal-dark hover:scale-110 transition-all shadow-lg">
        <ChevronRight className="w-5 h-5 rtl:hidden" />
        <ChevronLeft className="w-5 h-5 hidden rtl:block" />
      </button>
      <button aria-label="next" className="absolute start-3 md:start-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal text-white flex items-center justify-center hover:bg-teal-dark hover:scale-110 transition-all shadow-lg">
        <ChevronLeft className="w-5 h-5 rtl:hidden" />
        <ChevronRight className="w-5 h-5 hidden rtl:block" />
      </button>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-white font-black leading-tight tracking-wide drop-shadow-2xl">
          <span className="block text-5xl md:text-7xl lg:text-8xl">{t("hero.title1")}</span>
          <span className="block text-5xl md:text-7xl lg:text-8xl mt-2">
            {t("hero.title2a")} <span className="text-teal">{t("hero.title2b")}</span>
          </span>
        </h1>
        <div className="mt-10 md:mt-12 flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          <a href="#products" className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white px-6 md:px-8 py-3 md:py-3.5 rounded-md font-medium transition-all hover:scale-105 shadow-lg">
            <ChevronLeft className="w-4 h-4 rtl:hidden" />
            <ChevronRight className="w-4 h-4 hidden rtl:block" />
            <span>{t("hero.cta1")}</span>
          </a>
          <a href="#contact" className="text-white font-medium border-b-2 border-teal pb-1 hover:text-teal transition-colors">
            {t("hero.cta2")}
          </a>
        </div>
      </div>

      <FeatureStrip />
    </section>
  );
}

function FeatureStrip() {
  const { t } = useI18n();
  const features = [
    { icon: Gem, title: t("hero.f1.t"), desc: t("hero.f1.d") },
    { icon: TripIcon, title: t("hero.f2.t"), desc: t("hero.f2.d") },
    { icon: Shield, title: t("hero.f3.t"), desc: t("hero.f3.d") },
  ];
  return (
    <div className="absolute bottom-6 md:bottom-10 inset-x-0 px-4 z-10">
      <div className="max-w-5xl mx-auto bg-black/60 backdrop-blur-md rounded-2xl px-4 md:px-8 py-4 md:py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-4 px-2 md:px-6 py-3 md:py-0 justify-center md:justify-start">
              <div className="text-teal shrink-0"><f.icon className="w-9 h-9 md:w-10 md:h-10" /></div>
              <div className="text-start">
                <div className="text-white font-bold text-sm md:text-base">{f.title}</div>
                <div className="text-white/70 text-xs md:text-sm">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TripIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L22 8 L12 14 L2 8 Z" />
      <path d="M2 16 L12 22 L22 16" />
      <path d="M2 12 L12 18 L22 12" />
    </svg>
  );
}
