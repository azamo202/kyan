import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { I18nProvider } from "@/i18n/I18nProvider";
import { Settings } from "lucide-react";



import favIcon from "@/assets/images/18.webp";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "كيان المستقبل للبورسلان | Future Kayan Porcelain" },
      { name: "description", content: "شركة كيان المستقبل، الرائدة في تصنيع وتركيب أحدث تصاميم البورسلان بجودة عالمية. تشكيلات متنوعة من البورسلان الإيطالي والصيني." },
      { name: "keywords", content: "بورسلان, كيان المستقبل, Future Kayan, تركيب بورسلان, بورسلان إيطالي, بورسلان صيني, واجهات بورسلان, مطابخ بورسلان, أرضيات بورسلان, الرياض, السعودية" },
      { name: "author", content: "شركة كيان المستقبل" },
      { property: "og:title", content: "كيان المستقبل للبورسلان | Future Kayan" },
      { property: "og:description", content: "اكتشف الفخامة مع شركة كيان المستقبل للبورسلان. خامات عالمية، تصاميم عصرية، وضمان موثوق." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Future Kayan" },
      { property: "og:image", content: favIcon },
      { name: "twitter:title", content: "كيان المستقبل | Future Kayan" },
      { name: "twitter:description", content: "شركة كيان المستقبل متخصصة في تصنيع وتركيب البورسلان بأعلى معايير الجودة." },
      { name: "twitter:image", content: favIcon },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: favIcon },
      { rel: "apple-touch-icon", href: favIcon },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CNB5GHPVXW"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-CNB5GHPVXW');
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  const isMaintenanceMode = true; // Set to false to disable maintenance mode

  if (isMaintenanceMode) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center" dir="rtl">
        <Settings className="w-24 h-24 text-teal animate-[spin_3s_linear_infinite] mb-8 opacity-90" />
        <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6">
          الموقع تحت الصيانة
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          نقوم حالياً ببعض التحديثات الهامة لتحسين تجربتكم. سنعود للعمل في أقرب وقت ممكن. شكراً لتفهمكم!
        </p>
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        {/* Required: nested routes render here. */}
        <Outlet />
        <WhatsAppButton />
      </I18nProvider>
    </QueryClientProvider>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/966546107600"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#22c35e] transition-all duration-300 hover:scale-110 group"
      aria-label="WhatsApp"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366]/40 animate-ping opacity-75 group-hover:animate-none" />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-7 h-7 fill-current relative z-10">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
    </a>
  );
}

