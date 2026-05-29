import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react";
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
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Field label={t("contact.name")}><input type="text" placeholder={t("contact.namePh")} className="w-full bg-white border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/40" /></Field>
              <Field label={t("contact.email")}><input type="email" placeholder="example@email.com" className="w-full bg-white border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/40" /></Field>
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
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-teal text-white flex items-center justify-center hover:bg-teal-dark hover:-translate-y-1 transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="text-start">
      <label className="block text-sm text-ink/80 mb-2">{label}</label>
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
