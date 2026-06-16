import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Products } from "@/components/site/Products";
import { LatestWorks } from "@/components/site/LatestWorks";
import { Partners } from "@/components/site/Partners";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الرئيسية | شركة كيان المستقبل للبورسلان" },
      { name: "description", content: "اكتشف الجودة والفخامة مع شركة كيان المستقبل. المتخصصون في البورسلان الإيطالي والصيني في السعودية والمصممة لتناسب أحدث الديكورات العصرية." },
      { name: "keywords", content: "بورسلان, كيان المستقبل, Future Kayan, بورسلان إيطالي, بورسلان صيني, السعودية, الرياض, واجهات, مطابخ" }
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <LatestWorks />
      <Partners />
      <Contact />
      <Footer />
    </main>
  );
}
