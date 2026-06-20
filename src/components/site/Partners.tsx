import { useI18n } from "@/i18n/I18nProvider";

import p2 from "@/assets/Brands/2.webp";
import p3 from "@/assets/Brands/3.webp";
import p4 from "@/assets/Brands/4.webp";
import p5 from "@/assets/Brands/5.webp";
import p6 from "@/assets/Brands/6.webp";
import p7 from "@/assets/Brands/7.webp";
import p8 from "@/assets/Brands/8.webp";
import p9 from "@/assets/Brands/9.webp";
import p10 from "@/assets/Brands/10.webp";
import p11 from "@/assets/Brands/11.webp";
import p12 from "@/assets/Brands/12.webp";
import p13 from "@/assets/Brands/13.webp";
import p14 from "@/assets/Brands/14.webp";
import p15 from "@/assets/Brands/15.webp";
import p16 from "@/assets/Brands/16.webp";
import p17 from "@/assets/Brands/17.webp";

// يمكنك هنا تعديل الروابط الخاصة بكل شريك بكل سهولة
const partners = [
  { img: p2, url: "https://www.instagram.com/diniz_kitchen/" },
  { img: p3, url: "https://www.instagram.com/closets_concept/" },
  { img: p4, url: "#" },
  { img: p5, url: "#" },
  { img: p6, url: "#" },
  { img: p7, url: "#" },
  { img: p8, url: "#" },
  { img: p9, url: "#" },
  { img: p10, url: "#" },
  { img: p11, url: "#" },
  { img: p12, url: "#" },
  { img: p13, url: "#" },
  { img: p14, url: "#" },
  { img: p15, url: "#" },
  { img: p16, url: "#" },
  { img: p17, url: "#" }
];

export function Partners() {
  const { t } = useI18n();
  // تكرار المصفوفة مرتين لضمان حركة لا نهائية وسلسة بدون أي انقطاع
  const doublePartners = [...partners, ...partners];

  return (
    <section id="partners" className="textured-bg py-20 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center px-4 md:px-8 mb-12">
        <span className="section-label">{t("partners.label")}</span>
        <p className="mt-6 text-ink/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">{t("partners.subtitle")}</p>
      </div>

      {/* الشريط المتحرك اللانهائي */}
      <div className="relative w-full overflow-hidden py-8 bg-transparent" dir="ltr">
        <div className="animate-marquee flex gap-12 items-center">
          {doublePartners.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target={p.url === "#" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center justify-center h-16 w-36 shrink-0 transition-all duration-300 hover:scale-120 cursor-pointer"
            >
              <img
                src={p.img}
                alt={`partner-${i}`}
                className="max-h-full max-w-full object-contain pointer-events-none"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
