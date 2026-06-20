import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ProductDetail } from "@/components/site/ProductDetail";

export const Route = createFileRoute("/products/chinese")({
  head: () => ({
    meta: [
      { title: "البورسلان الصيني | شركة كيان المستقبل للرخام والبورسلان" },
      { name: "description", content: "استكشف مجموعة البورسلان الصيني المتميز وأسطح المطابخ من شركة كيان المستقبل." },
    ],
  }),
  component: ChineseProductsPage,
});

function ChineseProductsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground animate-fade-in">
      <Navbar />
      <div className="pt-20" />
      <ProductDetail variant="chinese" hero="" />
      <Footer />
    </main>
  );
}
