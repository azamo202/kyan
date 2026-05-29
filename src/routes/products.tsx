import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ProductDetail } from "@/components/site/ProductDetail";
import { LatestWorks } from "@/components/site/LatestWorks";
import chineseImg from "@/assets/porcelain-chinese.jpg";
import italianImg from "@/assets/porcelain-italian.jpg";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "منتجاتنا | شركة كيان المستقبل للرخام والبورسلان" },
      { name: "description", content: "استكشف أحدث منتجات الرخام والبورسلان الإيطالي والصيني بجودة عالية وتصاميم عصرية. كيان المستقبل توفر أفضل الخيارات لتناسب جميع الاحتياجات والمشاريع." },
      { name: "keywords", content: "منتجات رخام, بورسلان إيطالي, بورسلان صيني, أسطح مطابخ, مغاسل بورسلان, كيان المستقبل, ديكورات الرخام, الرخام الفاخر" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20" />
      <ProductDetail variant="chinese" hero={chineseImg} />
      <ProductDetail variant="italian" hero={italianImg} />
      <Footer />
    </main>
  );
}
