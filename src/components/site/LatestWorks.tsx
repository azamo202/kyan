import { useRef, useState, useEffect, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const surfacesModules = import.meta.glob("../../assets/اسطح/*", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const countersModules = import.meta.glob("../../assets/كونترات/*", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const washbasinsModules = import.meta.glob("../../assets/مغاسل/*", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const beforeAfterModules = import.meta.glob("../../assets/قبل وبعد/*", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

const surfacesImages = Object.values(surfacesModules);
const countersImages = Object.values(countersModules);
const washbasinsImages = Object.values(washbasinsModules);

type Cat = "all" | "surfaces" | "counters" | "washbasins";

const allImages: { src: string; cat: Cat }[] = [
  ...surfacesImages.map(src => ({ src, cat: "surfaces" as Cat })),
  ...countersImages.map(src => ({ src, cat: "counters" as Cat })),
  ...washbasinsImages.map(src => ({ src, cat: "washbasins" as Cat })),
];

const projectsList: { before: string; after: string; id: number }[] = [];
for (let i = 1; i <= 10; i++) {
  const beforeKey = Object.keys(beforeAfterModules).find(k => k.endsWith(`/${i}.webp`));
  const afterKey = Object.keys(beforeAfterModules).find(k => k.endsWith(`/${i}-${i}.webp`));
  if (beforeKey && afterKey) {
    projectsList.push({ before: beforeAfterModules[beforeKey], after: beforeAfterModules[afterKey], id: i });
  }
}

export function LatestWorks({ tinted = false }: { tinted?: boolean }) {
  const { t, lang } = useI18n();
  const [active, setActive] = useState<Cat>("all");
  const [activeProject, setActiveProject] = useState(0);

  const cats: { id: Cat; label: string }[] = [
    { id: "washbasins", label: t("works.washbasins") },
    { id: "counters", label: t("works.counters") },
    { id: "surfaces", label: t("works.surfaces") },
    { id: "all", label: t("works.all") },
  ];
  const images = active === "all" ? allImages : allImages.filter(i => i.cat === active);
  const orderedCats = lang === "ar" ? [...cats].reverse() : cats;

  const projects = projectsList.map(p => ({
    before: p.before,
    after: p.after,
    title: lang === "ar" ? `مشروع ${p.id}` : `Project ${p.id}`,
  }));

  return (
    <section id="works" className={`${tinted ? "bg-[#eaf6f7]" : "bg-white"} py-16 md:py-20 px-4 md:px-8`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-8 md:mb-10">
          <span className="section-label">{t("works.label")}</span>
          <h2 className="text-2xl md:text-4xl font-black text-ink">{t("works.title")}</h2>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8 md:mb-10">
          {orderedCats.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border transition-colors ${
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
        {projects.length > 0 && (
          <div className="mt-12 md:mt-16 space-y-6">
            <div className="flex flex-wrap justify-center gap-3">
              {projects.map((proj, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveProject(idx)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold border transition-colors ${
                    activeProject === idx
                      ? "bg-teal text-white border-teal shadow-md"
                      : "bg-white text-ink/70 border-border hover:border-teal hover:text-teal"
                  }`}
                >
                  {proj.title}
                </button>
              ))}
            </div>

            <BeforeAfter
              key={activeProject}
              before={projects[activeProject].before}
              after={projects[activeProject].after}
            />
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
const Gallery = memo(function Gallery({ images }: { images: { src: string }[] }) {
  const { lang } = useI18n();
  const isRtl = lang === "ar";
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = useCallback((dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const physicalDir = isRtl ? -dir : dir;
    el.scrollBy({ left: physicalDir * (el.clientWidth * 0.8), behavior: "smooth" });
  }, [isRtl]);

  return (
    <div className="relative">
      <button
        onClick={() => scrollBy(-1)}
        aria-label="prev"
        className="absolute -start-2 md:-start-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-teal text-white flex items-center justify-center shadow-md hover:bg-teal-dark transition-colors"
      >
        <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
      </button>
      <button
        onClick={() => scrollBy(1)}
        aria-label="next"
        className="absolute -end-2 md:-end-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-teal text-white flex items-center justify-center shadow-md hover:bg-teal-dark transition-colors"
      >
        <ChevronRight className="w-5 h-5 rtl:rotate-180" />
      </button>

      <div
        ref={scrollerRef}
        className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative shrink-0 snap-start rounded-2xl overflow-hidden shadow-md w-[260px] md:w-[320px] h-[240px] md:h-[300px]"
          >
            <img
              src={img.src}
              alt="work"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
});

// ─── BeforeAfter ─────────────────────────────────────────────────────────────
// Uses DOM refs only — NO setState during drag to prevent re-renders
const BeforeAfter = memo(function BeforeAfter({ before, after }: { before: string; after: string }) {
  const { t, lang } = useI18n();
  const isRtl = lang === "ar";

  const containerRef = useRef<HTMLDivElement>(null);
  const beforeImgRef = useRef<HTMLImageElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const dragging = useRef(false);
  const posRef = useRef(50);

  // Apply position directly to DOM — no React re-render
  const applyPos = useCallback((pct: number) => {
    posRef.current = pct;
    if (beforeImgRef.current) {
      beforeImgRef.current.style.clipPath = isRtl
        ? `inset(0 0 0 ${pct}%)`
        : `inset(0 ${100 - pct}% 0 0)`;
    }
    if (lineRef.current) {
      lineRef.current.style.left = `${pct}%`;
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${pct}%`;
    }
  }, [isRtl]);

  // Re-apply position when RTL changes
  useEffect(() => {
    applyPos(posRef.current);
  }, [applyPos]);

  const getPos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return 50;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    return (x / rect.width) * 100;
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      applyPos(getPos(clientX));
    };
    const onUp = () => { dragging.current = false; };

    window.addEventListener("mousemove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [applyPos, getPos]);

  const startDrag = useCallback((clientX: number) => {
    dragging.current = true;
    applyPos(getPos(clientX));
  }, [applyPos, getPos]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280px] md:h-[420px] rounded-3xl overflow-hidden shadow-xl select-none touch-none"
      onMouseDown={e => startDrag(e.clientX)}
      onTouchStart={e => startDrag(e.touches[0].clientX)}
    >
      {/* After image (background) */}
      <img src={after} alt={t("works.after")} draggable={false} className="absolute inset-0 w-full h-full object-cover" />

      {/* Before image (clipped) */}
      <img
        ref={beforeImgRef}
        src={before}
        alt={t("works.before")}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: isRtl ? "inset(0 0 0 50%)" : "inset(0 50% 0 0)" }}
      />

      {/* Labels */}
      <div className={`absolute top-3 ${isRtl ? "right-3" : "left-3"} bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full pointer-events-none`}>
        {t("works.before")}
      </div>
      <div className={`absolute top-3 ${isRtl ? "left-3" : "right-3"} bg-teal text-white text-xs px-3 py-1 rounded-full pointer-events-none`}>
        {t("works.after")}
      </div>

      {/* Divider line */}
      <div
        ref={lineRef}
        className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] pointer-events-none"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      />

      {/* Drag handle */}
      <button
        ref={handleRef}
        aria-label="drag"
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center cursor-ew-resize"
        style={{ left: "50%" }}
        onMouseDown={e => { e.stopPropagation(); startDrag(e.clientX); }}
        onTouchStart={e => { e.stopPropagation(); startDrag(e.touches[0].clientX); }}
      >
        <ChevronLeft className="w-4 h-4 text-teal" />
        <ChevronRight className="w-4 h-4 text-teal -ms-1" />
      </button>
    </div>
  );
});
