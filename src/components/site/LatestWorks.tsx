import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import heroImg from "@/assets/hero-kitchen.jpg";
import showroom from "@/assets/about-showroom.jpg";
import slabs from "@/assets/marble-slabs.jpg";
import italian from "@/assets/porcelain-italian.jpg";
import chinese from "@/assets/porcelain-chinese.jpg";

type Cat = "all" | "acrylic" | "wood" | "porcelain" | "granite" | "hpl";
const allImages: { src: string; cat: Cat }[] = [
  { src: heroImg, cat: "porcelain" },
  { src: showroom, cat: "wood" },
  { src: slabs, cat: "granite" },
  { src: italian, cat: "porcelain" },
  { src: chinese, cat: "acrylic" },
  { src: heroImg, cat: "hpl" },
  { src: showroom, cat: "wood" },
  { src: slabs, cat: "porcelain" },
];

export function LatestWorks({ tinted = false }: { tinted?: boolean }) {
  const { t } = useI18n();
  const [active, setActive] = useState<Cat>("all");
  const cats: { id: Cat; label: string }[] = [
    { id: "hpl", label: t("works.hpl") },
    { id: "granite", label: t("works.granite") },
    { id: "porcelain", label: t("works.porcelain") },
    { id: "wood", label: t("works.wood") },
    { id: "acrylic", label: t("works.acrylic") },
    { id: "all", label: t("works.all") },
  ];
  const images = active === "all" ? allImages : allImages.filter(i => i.cat === active);

  return (
    <section id="works" className={`${tinted ? "bg-[#eaf6f7]" : "bg-white"} py-16 md:py-20 px-4 md:px-8`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-8 md:mb-10">
          <span className="section-label">{t("works.label")}</span>
          <h2 className="text-2xl md:text-4xl font-black text-ink">{t("works.title")}</h2>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8 md:mb-10">
          {cats.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border transition-all ${
                active === c.id
                  ? "bg-teal text-white border-teal shadow-md"
                  : "bg-white text-ink/70 border-border hover:border-teal hover:text-teal"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <Gallery images={images} />

        {/* Before/After slider */}
        <div className="mt-12 md:mt-16">
          <BeforeAfter before={showroom} after={heroImg} />
        </div>
      </div>
    </section>
  );
}

function Gallery({ images }: { images: { src: string }[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };
  return (
    <div className="relative">
      <button onClick={() => scrollBy(-1)} aria-label="prev" className="absolute -start-2 md:-start-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-teal text-white flex items-center justify-center shadow-md hover:bg-teal-dark transition-colors">
        <ChevronRight className="w-5 h-5 rtl:hidden" />
        <ChevronLeft className="w-5 h-5 hidden rtl:block" />
      </button>
      <button onClick={() => scrollBy(1)} aria-label="next" className="absolute -end-2 md:-end-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-teal text-white flex items-center justify-center shadow-md hover:bg-teal-dark transition-colors">
        <ChevronLeft className="w-5 h-5 rtl:hidden" />
        <ChevronRight className="w-5 h-5 hidden rtl:block" />
      </button>

      <div ref={scrollerRef} className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((img, i) => (
          <div
            key={i}
            className={`relative shrink-0 snap-start rounded-2xl overflow-hidden shadow-md ${
              i % 3 === 1 ? "w-[200px] md:w-[240px] h-[280px] md:h-[340px]" : "w-[260px] md:w-[320px] h-[200px] md:h-[240px]"
            }`}
          >
            <img src={img.src} alt="work" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

function BeforeAfter({ before, after }: { before: string; after: string }) {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(50);
  const draggingRef = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    setPos((x / rect.width) * 100);
  };

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      updateFromClientX(clientX);
    };
    const up = () => { draggingRef.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280px] md:h-[420px] rounded-3xl overflow-hidden shadow-xl select-none touch-none"
    >
      <img src={after} alt={t("works.after")} className="absolute inset-0 w-full h-full object-cover" />
      <img
        src={before}
        alt={t("works.before")}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />


      {/* Labels */}
      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">{t("works.before")}</div>
      <div className="absolute top-3 right-3 bg-teal text-white text-xs px-3 py-1 rounded-full">{t("works.after")}</div>

      {/* Handle */}
      <div className="absolute inset-y-0 z-10" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="h-full w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
        <button
          onMouseDown={() => { draggingRef.current = true; }}
          onTouchStart={() => { draggingRef.current = true; }}
          aria-label="drag"
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center cursor-ew-resize hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-4 h-4 text-teal" />
          <ChevronRight className="w-4 h-4 text-teal -ml-1" />
        </button>
      </div>
    </div>
  );
}
