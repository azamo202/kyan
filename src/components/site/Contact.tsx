import { Mail, Phone, MapPin, Instagram, Send } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export function Contact() {
  const { t } = useI18n();
  return (
    <section id="contact" className="py-20 md:py-28 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-14">
          <span className="section-label">{t("contact.label")}</span>
          <h2 className="text-3xl md:text-5xl font-black text-ink">{t("contact.title")}</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-teal/5 border border-teal/20 rounded-3xl p-6 md:p-8">
            <h3 className="text-teal text-xl font-bold mb-6 text-start">{t("contact.send")}</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("تم الإرسال بنجاح!"); }}>
              <Field label={t("contact.name")} required><input type="text" required placeholder={t("contact.namePh")} className="w-full bg-white border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/40" /></Field>
              <Field label={t("contact.email")}><input type="email" placeholder="example@email.com" className="w-full bg-white border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/40" /></Field>
              <Field label={t("contact.phone")} required><input type="tel" required placeholder={t("contact.phonePh")} className="w-full bg-white border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/40" /></Field>
              <Field label={t("contact.message")}><textarea rows={5} placeholder={t("contact.messagePh")} className="w-full bg-white border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 resize-none" /></Field>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-teal hover:bg-teal-dark text-white py-3.5 rounded-lg font-medium transition-all hover:shadow-lg">
                <span>{t("contact.submit")}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-ink text-lg font-bold mb-5 text-start">{t("contact.info")}</h3>
              <div className="space-y-3">
                <InfoRow icon={Mail} label={t("contact.email")} value="info@kayan.com" />
                <InfoRow icon={Phone} label={t("contact.phone")} value="+966 46107600" />
                <InfoRow icon={MapPin} label={t("contact.location")} value={t("contact.locationVal")} />
              </div>
            </div>
            <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-ink text-lg font-bold mb-5 text-start">{t("contact.follow")}</h3>
              <div className="flex gap-3">
                <a href="#" className="w-12 h-12 rounded-xl bg-teal text-white flex items-center justify-center hover:bg-teal-dark hover:-translate-y-1 transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-teal text-white flex items-center justify-center hover:bg-teal-dark hover:-translate-y-1 transition-all">
                  <svg viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
                    <path d="M256 48c-79.8 0-133 50.8-133 116.8 0 28.4 9.1 57.8 25.2 85.8 12.4 21.5 16.4 36.3 13 50.2-2.8 11.4-10.9 22.9-22 31.3-7.7 5.9-10.6 16.2-7.1 25.1 3.4 8.9 12 14.8 21.5 14.8h204.4c9.5 0 18.1-5.9 21.5-14.8 3.5-8.9.6-19.3-7.1-25.1-11-8.4-19.2-19.9-22-31.3-3.4-13.9.2-28.7 13-50.2 16.1-28 25.2-57.4 25.2-85.8C389.6 98.8 336.4 48 256 48z"/>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-teal text-white flex items-center justify-center hover:bg-teal-dark hover:-translate-y-1 transition-all">
                  <svg viewBox="0 0 448 512" fill="currentColor" className="w-5 h-5">
                    <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185 188.31v89.89a72.69 72.69 0 1 0 40.3 65.4V32H315a117.84 117.84 0 0 0 10.07 49.13A116.66 116.66 0 0 0 365 119.56a117.82 117.82 0 0 0 83 34.35v56z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="text-start">
      <label className="block text-sm text-ink/80 mb-2">
        {label}
        {required && <span className="text-red-500 mr-1 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 bg-secondary/40 border border-border rounded-xl p-3">
      <div className="w-10 h-10 rounded-lg bg-teal/10 text-teal flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 text-start">
        <div className="text-xs text-teal mb-0.5">{label}</div>
        <div className="text-sm text-ink font-medium">{value}</div>
      </div>
    </div>
  );
}
