import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Construction, ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "قيد الإنشاء | شركة كيان المستقبل للبورسلان" },
      { name: "description", content: "هذه الصفحة قيد الإنشاء حالياً. نعمل على تجهيزها لتلبية متطلباتكم." },
    ],
  }),
  component: UnderConstructionPage,
});

function UnderConstructionPage() {
  const { lang, t } = useI18n();
  const isRtl = lang === "ar";

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-8 bg-white/40 backdrop-blur-md border border-border/50 rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
          {/* Decorative background light */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-teal/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-teal/5 rounded-full blur-2xl pointer-events-none" />

          {/* Animated Icon */}
          <div className="relative z-10 flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-teal/10 text-teal flex items-center justify-center animate-bounce">
              <Construction className="w-10 h-10" />
            </div>
          </div>

          <div className="space-y-3 relative z-10">
            <h1 className="text-2xl md:text-3xl font-black text-ink">
              {isRtl ? "الصفحة قيد الإنشاء" : "Page Under Construction"}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {isRtl 
                ? "نعمل حالياً بكل شغف على تجهيز هذا القسم ليقدم لكم أفضل تجربة استعراض لمنتجات البورسلان الفاخرة لدينا. ترقبونا قريباً!"
                : "We are currently working passionately on preparing this section to offer you the best browsing experience for our luxury porcelain products. Stay tuned!"}
            </p>
          </div>

          <div className="pt-4 relative z-10">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-teal hover:bg-teal-dark text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
            >
              <span>{isRtl ? "العودة للرئيسية" : "Back to Home"}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
