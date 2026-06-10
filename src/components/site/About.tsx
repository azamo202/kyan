import aboutImg from "@/assets/about.jpg";
import slabsImg from "@/assets/about2.jpg";
import { useI18n } from "@/i18n/I18nProvider";

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="marble-bg py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-20 md:space-y-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img src={aboutImg} alt="showroom" loading="lazy" width={1200} height={900} className="w-full h-[280px] md:h-[360px] object-cover" />
          </div>
          <div className="text-start space-y-5">
            <h2 className="section-label">{t("about.who")}</h2>
            <p className="text-ink/80 leading-loose text-sm md:text-[15px] tracking-wide">{t("about.whoText")}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="text-start space-y-5 order-2 md:order-1">
            <h2 className="section-label">{t("about.mission")}</h2>
            <p className="text-ink/80 leading-loose text-sm md:text-[15px] tracking-wide">{t("about.missionText")}</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl order-1 md:order-2">
            <img src={slabsImg} alt="marble slabs" loading="lazy" width={1200} height={900} className="w-full h-[280px] md:h-[360px] object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
