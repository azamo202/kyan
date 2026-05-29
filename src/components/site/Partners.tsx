import { useI18n } from "@/i18n/I18nProvider";
import p2 from "@/assets/2.png";
import p3 from "@/assets/3.png";
import p4 from "@/assets/4.png";
import p5 from "@/assets/5.png";
import p6 from "@/assets/6.png";
import p7 from "@/assets/7.png";
import p8 from "@/assets/8.png";
import p9 from "@/assets/9.png";
import p10 from "@/assets/10.png";
import p11 from "@/assets/11.png";
import p12 from "@/assets/12.png";
import p13 from "@/assets/13.png";
import p14 from "@/assets/14.png";
import p15 from "@/assets/15.png";
import p16 from "@/assets/16.png";
import p17 from "@/assets/17.png";

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
    <section id="partners" className="marble-bg py-20 md:py-24 overflow-hidden">
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
