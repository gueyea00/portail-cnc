import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Loader2, Facebook, Linkedin, Twitter, PhoneCall } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nom: "", email: "", objet: "", message: "" });

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
            Contact & Accès
          </h1>
          <p className="mt-2 opacity-90 text-lg">Prenez contact avec le CNC</p>
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
                <div><p className="text-sm font-medium text-foreground">Adresse</p><p className="text-sm text-muted-foreground">Avenue Charles de Gaulle, N'Djamena, République du Tchad</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div><p className="text-sm font-medium text-foreground">Téléphone</p><p className="text-sm text-muted-foreground">+235 22 52 XX XX</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div><p className="text-sm font-medium text-foreground">Email</p><p className="text-sm text-muted-foreground">contact@cnc-tchad.td</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div><p className="text-sm font-medium text-foreground">Horaires</p><p className="text-sm text-muted-foreground">Lundi â€“ Vendredi : 07h30 â€“ 15h30</p></div>
              </div>
            </div>

            {/* Plan d'accès placeholder */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl shadow-inner h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-primary/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Plan d'accès â€” N'Djamena, Tchad</p>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="bg-surface p-8 rounded-2xl shadow-soft">
              <h3 className="font-semibold text-foreground mb-3">Suivez-nous</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
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

