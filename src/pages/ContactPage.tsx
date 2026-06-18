import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Loader2, Facebook, Linkedin, PhoneCall, Send } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { FadeIn } from "@/components/ui/fade-in";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nom: "", email: "", objet: "", message: "" });

  const { data: parametres } = useQuery({
    queryKey: ["parametres_contact"],
    queryFn: () => fetch("/api/parametres").then(res => res.json())
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.email || !form.message) { toast.error("Veuillez remplir tous les champs obligatoires."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message envoyé avec succès !");
      setForm({ nom: "", email: "", objet: "", message: "" });
    }, 1500);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50";

  const infoItems = [
    { icon: MapPin, label: "Adresse", value: parametres?.contact_adresse || parametres?.footer_adresse || "Avenue Charles de Gaulle, N'Djamena, République du Tchad" },
    { icon: Phone, label: "Téléphone", value: parametres?.contact_telephone || parametres?.footer_telephone || "+235 22 52 XX XX" },
    { icon: Mail, label: "Email", value: parametres?.contact_email || parametres?.footer_email || "contact@cnc-tchad.td" },
    { icon: Clock, label: "Horaires", value: parametres?.horaires_ouverture || "Lundi – Vendredi : 07h30 – 15h30" },
  ];

  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
              <PhoneCall className="w-8 h-8 md:w-10 md:h-10 text-gold" />
              {parametres?.contact_hero_title || "Contact & Accès"}
            </h1>
            <p className="mt-2 opacity-90 text-lg">{parametres?.contact_hero_subtitle || "Prenez contact avec le CNC"}</p>
          </FadeIn>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Infos */}
          <div className="space-y-6">
            <FadeIn delay={100}>
              <div className="bg-surface p-8 rounded-2xl shadow-soft border border-border/50">
                <h2 className="text-xl font-bold text-foreground mb-6">Coordonnées</h2>
                <div className="space-y-5">
                  {infoItems.map(({ icon: Icon, label, value }, i) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{label}</p>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Plan d'accès */}
            <FadeIn delay={200}>
              <div className="overflow-hidden rounded-2xl shadow-soft h-64 border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15444.6468725832!2d15.0441!3d12.1131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10f76527503f1947%3A0xd3f89e1b213b918f!2sAvenue%20Charles%20de%20Gaulle%2C%20N'Djamena!5e0!3m2!1sfr!2std!4v1712762000000!5m2!1sfr!2std"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps - Avenue Charles de Gaulle, N'Djamena"
                ></iframe>
              </div>
            </FadeIn>

            {/* Réseaux sociaux */}
            <FadeIn delay={300}>
              <div className="bg-surface p-6 rounded-2xl shadow-soft border border-border/50">
                <h3 className="font-semibold text-foreground mb-4">Suivez-nous</h3>
                <div className="flex gap-3">
                  <a href={parametres?.lien_facebook || "#"} className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110" aria-label="Facebook">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href={parametres?.lien_linkedin || "#"} className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={parametres?.lien_twitter || "#"} className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110" aria-label="X (Twitter)">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Formulaire */}
          <FadeIn delay={150} direction="left">
            <div className="bg-surface p-8 rounded-2xl shadow-soft border border-border/50 h-fit">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Send className="w-4 h-4 text-primary" />
                </div>
                Envoyez-nous un message
              </h2>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Nom complet *</label>
                  <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Votre nom..." className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="votre@email.com" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Objet</label>
                  <input value={form.objet} onChange={(e) => setForm({ ...form, objet: e.target.value })} placeholder="Sujet de votre message..." className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Message *</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Votre message..." className={inputClass + " resize-none"} />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-12 gap-2 font-semibold shadow-md shadow-primary/20">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...</> : <><Send className="w-4 h-4" /> Envoyer le message</>}
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
