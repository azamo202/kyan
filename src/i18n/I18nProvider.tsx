import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

const dict: Dict = {
  // nav
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.about": { ar: "من نحن", en: "About" },
  "nav.products": { ar: "منتجاتنا", en: "Products" },
  "nav.partners": { ar: "شركاؤنا", en: "Partners" },
  "nav.contact": { ar: "تواصل معنا", en: "Contact Us" },
  "nav.lang": { ar: "EN", en: "AR" },

  // hero
  "hero.title1": { ar: "جمـال البورسلان", en: "The Beauty of Porcelain" },
  "hero.title2a": { ar: "يـدوم مـع", en: "Lasts with" },
  "hero.title2b": { ar: "كيـان", en: "Kayan" },
  "hero.cta1": { ar: "استكشف أعمالنا", en: "Explore Our Work" },
  "hero.cta2": { ar: "تواصل معنا", en: "Contact Us" },
  "hero.f1.t": { ar: "جودة عالية", en: "High Quality" },
  "hero.f1.d": { ar: "أفخر الخامات العالمية", en: "Finest global materials" },
  "hero.f2.t": { ar: "تصاميم عصرية", en: "Modern Designs" },
  "hero.f2.d": { ar: "تناسب أحدث الاتجاهات", en: "Matching latest trends" },
  "hero.f3.t": { ar: "ضمان موثوق", en: "Reliable Warranty" },
  "hero.f3.d": { ar: "على جميع المنتجات", en: "On all products" },

  // about
  "about.who": { ar: "من نحن", en: "Who We Are" },
  "about.whoText": {
    ar: "شركة كيان المستقبل للبورسلان هي شركة متخصصة في تصنيع وتركيب منتجات البورسلان. تقدم الشركة مجموعة واسعة من المنتجات مثل ألواح البورسلان للمطابخ المغاسل، وأسطح المطابخ. مصنع الشركة مجهز بأحدث الآلات والمعدات المتخصصة، ويعمل به فريق من الفنيين المهرة لضمان تقديم منتجات عالية الجودة تلبي احتياجات العملاء.",
    en: "Future Kayan Porcelain specializes in manufacturing and installing premium porcelain products. We offer a wide range of porcelain slabs for kitchens, vanities, and countertops. Our factory is equipped with the latest specialized machinery and staffed by skilled technicians who deliver products that meet our clients' needs.",
  },
  "about.mission": { ar: "رسالتنا", en: "Our Mission" },
  "about.missionText": {
    ar: "رسالة شركة كيان المستقبل للبورسلان تتمثل في تقديم منتجات عالية الجودة من البورسلان تلبي احتياجات وتوقعات العملاء. تسعى الشركة لتحقيق التميز من خلال الابتكار المستمر واستخدام أحدث التقنيات في التصنيع والتركيب، مع الالتزام بأعلى معايير الجودة وخدمة العملاء.",
    en: "Our mission is to deliver high-quality porcelain products that meet and exceed our customers' expectations. We pursue excellence through continuous innovation, the latest manufacturing and installation technologies, and an unwavering commitment to quality and service.",
  },

  // products listing
  "products.label": { ar: "منتجاتنا", en: "Our Products" },
  "products.title": { ar: "منتجاتنا", en: "Our Products" },
  "products.subtitle": {
    ar: "اكتشف تشكيلاتنا المختارة من أجود أنواع البورسلان بأعلى معايير الجودة والتصميم",
    en: "Discover our curated selection of finest porcelain with the highest standards of quality and design.",
  },
  "products.italian": { ar: "البورسلان الإيطالي", en: "Italian Porcelain" },
  "products.chinese": { ar: "البورسلان الصيني", en: "Chinese Porcelain" },
  "products.desc": {
    ar: "بورسلان عالي الجودة بتصاميم عصرية وتشطيبات متعددة تناسب مختلف الاستخدامات",
    en: "High-quality porcelain with modern designs and multiple finishes suitable for different uses.",
  },
  "products.explore": { ar: "استعرض الأنواع", en: "Browse Types" },
  "products.available": { ar: "نوع متوفر", en: "types available" },
  "products.types": { ar: "الأنواع المتوفرة", en: "Available Types" },
  "products.chooseTitle": { ar: "اختر ما يناسب مساحتك", en: "Pick what fits your space" },

  // partners
  "partners.label": { ar: "شركاؤنا", en: "Our Partners" },
  "partners.subtitle": {
    ar: "نفتخر بثقة نخبة من العلامات التجارية والمشاريع الرائدة التي تشاركنا الالتزام بالجودة والتميز في كل تفصيلة",
    en: "We are proud to be trusted by leading brands and projects that share our commitment to quality and excellence.",
  },

  // works
  "works.label": { ar: "أعمالنا", en: "Our Work" },
  "works.title": { ar: "شاهد أحدث أعمالنا", en: "See Our Latest Work" },
  "works.all": { ar: "الكل", en: "All" },
  "works.surfaces": { ar: "اسطح مطابخ", en: "Kitchen Surfaces" },
  "works.counters": { ar: "كاونترات", en: "Counters" },
  "works.washbasins": { ar: "مغاسل", en: "Washbasins" },
  "works.before": { ar: "قبل التنفيذ", en: "Before" },
  "works.after": { ar: "بعد التنفيذ", en: "After" },
  "works.project1": { ar: "المطبخ الأول", en: "Kitchen 1" },
  "works.project2": { ar: "المطبخ الثاني", en: "Kitchen 2" },
  "works.project3": { ar: "المطبخ الثالث", en: "Kitchen 3" },

  // contact
  "contact.label": { ar: "تواصل معنا", en: "Contact" },
  "contact.title": { ar: "نحن هنا لخدمتكم", en: "We're Here to Help" },
  "contact.subtitle": {
    ar: "يسعدنا الإجابة على استفساراتكم وتقديم أفضل الحلول. لا تترددوا في التواصل معنا.",
    en: "We are happy to answer your questions and offer the best solutions. Don't hesitate to reach out.",
  },
  "contact.send": { ar: "أرسل رسالة", en: "Send a Message" },
  "contact.name": { ar: "الاسم", en: "Name" },
  "contact.namePh": { ar: "اسمك الكامل", en: "Your full name" },
  "contact.email": { ar: "البريد الإلكتروني", en: "Email" },
  "contact.message": { ar: "الرسالة", en: "Message" },
  "contact.messagePh": { ar: "اكتب رسالتك هنا...", en: "Write your message here..." },
  "contact.submit": { ar: "إرسال الرسالة", en: "Send Message" },
  "contact.info": { ar: "معلومات التواصل", en: "Contact Info" },
  "contact.phone": { ar: "الهاتف", en: "Phone" },
  "contact.phonePh": { ar: "05xxxxxxxx", en: "05xxxxxxxx" },
  "contact.location": { ar: "الموقع", en: "Location" },
  "contact.locationVal": { ar: "بنها شارع المناخ، الرياض 14316", en: "Al-Manakh St., Riyadh 14316" },
  "contact.openInMaps": { ar: "فتح في خرائط جوجل", en: "Open in Google Maps" },
  "contact.follow": { ar: "تابعنا على", en: "Follow Us" },

  // footer
  "footer.tagline": {
    ar: "شركة كيان المستقبل للبورسلان هي شركة متخصصة في تصنيع وتركيب منتجات البورسلان.",
    en: "Future Kayan Porcelain — specialists in manufacturing and installing premium porcelain products.",
  },
  "footer.contact": { ar: "معلومات التواصل", en: "Contact Info" },
  "footer.support": { ar: "دعم 24/7", en: "24/7 Support" },
  "footer.inquiries": { ar: "للاستفسارات", en: "Inquiries" },
  "footer.links": { ar: "الروابط", en: "Links" },
  "footer.products": { ar: "منتجاتنا", en: "Our Products" },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict | string) => string; dir: "rtl" | "ltr" };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: string) => (dict[k] ? dict[k][lang] : k);
  const dir = lang === "ar" ? "rtl" : "ltr";

  return <I18nCtx.Provider value={{ lang, setLang, t, dir }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
