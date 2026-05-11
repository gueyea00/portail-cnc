import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Loader2, Facebook, Linkedin, PhoneCall } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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

  const inputClass = "w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
            <PhoneCall className="w-8 h-8 md:w-10 md:h-10 text-gold" />
            {parametres?.contact_hero_title || "Contact & Accès"}
          </h1>
          <p className="mt-2 opacity-90 text-lg">{parametres?.contact_hero_subtitle || "Prenez contact avec le CNC"}</p>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Infos */}
          <div className="space-y-6">
            <div className="bg-surface p-8 rounded-2xl shadow-soft space-y-4">
              <h2 className="text-xl font-bold text-foreground">Coordonnées</h2>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div><p className="text-sm font-medium text-foreground">Adresse</p><p className="text-sm text-muted-foreground whitespace-pre-line">{parametres?.contact_adresse || parametres?.footer_adresse || "Avenue Charles de Gaulle, N'Djamena, République du Tchad"}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div><p className="text-sm font-medium text-foreground">Téléphone</p><p className="text-sm text-muted-foreground">{parametres?.contact_telephone || parametres?.footer_telephone || "+235 22 52 XX XX"}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div><p className="text-sm font-medium text-foreground">Email</p><p className="text-sm text-muted-foreground">{parametres?.contact_email || parametres?.footer_email || "contact@cnc-tchad.td"}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div><p className="text-sm font-medium text-foreground">Horaires</p><p className="text-sm text-muted-foreground">{parametres?.horaires_ouverture || "Lundi – Vendredi : 07h30 – 15h30"}</p></div>
              </div>
            </div>

            {/* Plan d'accès réel */}
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

            {/* Réseaux sociaux */}
            <div className="bg-surface p-8 rounded-2xl shadow-soft">
              <h3 className="font-semibold text-foreground mb-3">Suivez-nous</h3>
              <div className="flex gap-3">
                <a href={parametres?.lien_facebook || "#"} className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
                <a href={parametres?.lien_linkedin || "#"} className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                <a href={parametres?.lien_twitter || "#"} className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="X (anciennement Twitter)">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-surface p-8 rounded-2xl shadow-soft">
            <h2 className="text-xl font-bold text-foreground mb-6">Envoyez-nous un message</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-foreground mb-1">Nom complet *</label><input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} className={inputClass} /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1">Email *</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1">Objet</label><input value={form.objet} onChange={(e) => setForm({ ...form, objet: e.target.value })} className={inputClass} /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1">Message *</label><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className={inputClass} /></div>
              <Button type="submit" disabled={loading} className="w-full gap-2">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...</> : "Envoyer le message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

