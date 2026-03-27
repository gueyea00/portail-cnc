import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle, Loader2, ShieldAlert } from "lucide-react";

export default function SignalementPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ description: "", secteur: "", entreprises: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.description.length < 20) { toast.error("La description doit contenir au moins 20 caractÃ¨res."); return; }
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      toast.success("Signalement enregistrÃ© de maniÃ¨re anonyme.");
    }, 1500);
  };

  if (submitted) {
    return (
      <div>
        <section className="page-hero"><div className="container-page"><h1 className="text-3xl font-bold">Signalement enregistrÃ©</h1></div></section>
        <div className="container-page py-16 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Signalement anonyme enregistrÃ©</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Votre signalement a Ã©tÃ© enregistrÃ© de maniÃ¨re anonyme. Les services du CNC analyseront les informations communiquÃ©es.
          </p>
          <Button onClick={() => { setSubmitted(false); setForm({ description: "", secteur: "", entreprises: "" }); }}>
            Effectuer un autre signalement
          </Button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
            <ShieldAlert className="w-8 h-8 md:w-10 md:h-10 text-gold" />
            Signalement anonyme
          </h1>
          <p className="mt-2 opacity-90 text-lg">Signalez une pratique suspecte en toute confidentialitÃ©</p>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12 max-w-2xl mx-auto">
        <div className="bg-muted/50 border border-border rounded-lg p-4 flex gap-3 mb-8">
          <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            Ce formulaire vous permet de signaler une pratique anticoncurrentielle de maniÃ¨re anonyme.
            Aucune information personnelle n'est requise ni collectÃ©e.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Description de la pratique suspecte *</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} className={inputClass} placeholder="DÃ©crivez la pratique que vous souhaitez signaler..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Secteur d'activitÃ© concernÃ©</label>
            <select value={form.secteur} onChange={(e) => setForm({ ...form, secteur: e.target.value })} className={inputClass}>
              <option value="">SÃ©lectionnez...</option>
              <option>TÃ©lÃ©communications</option>
              <option>Hydrocarbures</option>
              <option>Agroalimentaire</option>
              <option>BTP / MatÃ©riaux</option>
              <option>SantÃ© / Pharmacie</option>
              <option>Transport</option>
              <option>Commerce</option>
              <option>Banque / Finance</option>
              <option>Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Entreprise(s) concernÃ©e(s)</label>
            <input value={form.entreprises} onChange={(e) => setForm({ ...form, entreprises: e.target.value })} className={inputClass} placeholder="Nom des entreprises (optionnel)" />
          </div>
          <div className="pt-4">
            <Button type="submit" disabled={loading} className="w-full gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...</> : "Envoyer le signalement"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

