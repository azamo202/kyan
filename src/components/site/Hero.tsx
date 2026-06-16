import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Shield } from "lucide-react";
import heroImg1 from "@/assets/images/Home.jpg";
import heroImg2 from "@/assets/images/Home2.jpg";
import { useI18n } from "@/i18n/I18nProvider";
import { Gem } from 'lucide-react';

export function Hero() {
  const { t } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { img: heroImg1, alt: "Modern luxury kitchen 1" },
    { img: heroImg2, alt: "Modern luxury kitchen 2" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-[100vh] flex items-end justify-center pb-32 md:pb-40 overflow-hidden">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.img}
          alt={slide.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-105"
          }`}
          width={1920}
          height={1280}
        />
      ))}
      <div className="absolute inset-0 bg-black/40" />

      <button
        onClick={nextSlide}
        aria-label="next"
        className="absolute end-3 md:end-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal text-white flex items-center justify-center hover:bg-teal-dark hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 rtl:hidden" />
        <ChevronLeft className="w-5 h-5 hidden rtl:block" />
      </button>
      <button
        onClick={prevSlide}
        aria-label="previous"
        className="absolute start-3 md:start-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal text-white flex items-center justify-center hover:bg-teal-dark hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 rtl:hidden" />
        <ChevronRight className="w-5 h-5 hidden rtl:block" />
      </button>

      <div className="relative z-10 text-center px-4 max-w-4xl flex flex-col items-center mb-0">
        <div className="mb-4 md:mb-5 flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          <a href="#products" className="inline-flex items-center gap-1.5 bg-teal hover:bg-teal-dark text-white px-5 py-2.5 md:px-7 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all hover:scale-105 shadow-md">
            <ChevronLeft className="w-3.5 h-3.5 rtl:hidden" />
            <ChevronRight className="w-3.5 h-3.5 hidden rtl:block" />
            <span>{t("hero.cta1")}</span>
          </a>
          <a href="#contact" className="text-white/90 text-xs md:text-sm font-medium border-b border-teal/40 hover:border-teal pb-0.5 hover:text-white transition-colors">
            {t("hero.cta2")}
          </a>
        </div>
        <h1 className="text-white font-medium leading-tight tracking-wide drop-shadow-md text-lg md:text-2xl lg:text-3xl">
          {t("hero.title1")} {t("hero.title2a")} <span className="text-teal">{t("hero.title2b")}</span>
        </h1>
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
    <div className="absolute bottom-6 md:bottom-10 inset-x-0 px-2 md:px-4 z-10">
      <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-md rounded-2xl md:px-8 py-3 md:py-5 border border-white/5">
        <div className="flex md:grid md:grid-cols-3 overflow-x-auto gap-2 md:gap-0 divide-x-0 md:divide-x divide-white/10 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-3 px-4 md:px-6 py-2 md:py-0 min-w-[260px] md:min-w-0 snap-center justify-start">
              <div className="text-teal/90 shrink-0"><f.icon className="w-8 h-8 md:w-10 md:h-10" /></div>
              <div className="text-start">
                <div className="text-white/90 font-medium text-sm md:text-base mb-0.5">{f.title}</div>
                <div className="text-white/60 text-xs md:text-sm leading-snug">{f.desc}</div>
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
