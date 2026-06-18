import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2, MessageSquareWarning, Upload } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { FadeIn } from "@/components/ui/fade-in";

const formSchema = z.object({
  typeUsager: z.enum(["Consommateur", "Commerçant / Entreprise"], { errorMap: () => ({ message: "Sélectionnez un profil" }) }),
  typeDemande: z.enum(["Plainte", "Déclaration"], { errorMap: () => ({ message: "Sélectionnez le type" }) }),
  nom: z.string().min(2, "Le nom est requis"),
  prenom: z.string().min(2, "Le prénom est requis"),
  qualite: z.string().min(2, "Précisez votre qualité"),
  email: z.string().email("Email invalide"),
  telephone: z.string().regex(/^\d{8,12}$/, "Le numéro doit comporter entre 8 et 12 chiffres"),
  adresse: z.string().min(5, "Adresse requise"),
  objet: z.string().min(5, "L'objet est requis"),
  description: z.string().min(20, "Exposez votre plainte (min. 20 caractères)"),
});

type FormData = z.infer<typeof formSchema>;

export default function PlaintePage() {
  const [fichiers, setFichiers] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  const { data: pageConfig } = useQuery({
    queryKey: ["parametres"],
    queryFn: () => fetch("/api/parametres").then(res => res.json())
  });

  const form = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
      fichiers.forEach((file) => formData.append("fichiers", file));

      const response = await fetch("/api/plaintes", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Erreur lors de l'envoi");

      const resData = await response.json();
      setReference(resData.reference);
      setSubmitted(true);
      toast.success("Demande déposée avec succès !");
    } catch (error) {
      toast.error("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <FadeIn>
        <div className="container-page py-16 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Votre demande a été enregistrée</h2>
          <p className="text-xl font-bold text-primary mb-6">Référence : {reference}</p>
          <Button onClick={() => window.location.reload()}>Nouvelle demande</Button>
        </div>
      </FadeIn>
    );
  }

  const labelClass = "block text-sm font-medium mb-1";
  const inputClass = "w-full p-2 border rounded-md";

  return (
    <div className="bg-surface min-h-screen">
      <section className="page-hero">
        <div className="container-page">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
              <MessageSquareWarning className="w-8 h-8 md:w-10 md:h-10 text-gold" />
              {pageConfig?.plainte_hero_title || "Déposer une plainte ou une déclaration"}
            </h1>
            <p className="mt-2 opacity-90 text-lg">{pageConfig?.plainte_hero_subtitle || "Le CNC est à votre écoute pour toute pratique anticoncurrentielle."}</p>
          </FadeIn>
        </div>
      </section>

      <Breadcrumb />

      <div className="container-page py-12 max-w-3xl mx-auto">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FadeIn delay={100}>
            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-lg font-bold mb-4">Informations générales</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Profil *</label>
                  <select {...form.register("typeUsager")} className={inputClass}>
                    <option value="">Sélectionnez...</option>
                    <option value="Consommateur">Consommateur</option>
                    <option value="Commerçant / Entreprise">Commerçant / Entreprise</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Type *</label>
                  <select {...form.register("typeDemande")} className={inputClass}>
                    <option value="">Sélectionnez...</option>
                    <option value="Plainte">Plainte</option>
                    <option value="Déclaration">Déclaration</option>
                  </select>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-lg font-bold mb-4">Identification</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div><label className={labelClass}>Nom *</label><input {...form.register("nom")} className={inputClass} /></div>
                <div><label className={labelClass}>Prénom *</label><input {...form.register("prenom")} className={inputClass} /></div>
              </div>
              <div className="mb-4"><label className={labelClass}>Qualité (ex: gérant, client) *</label><input {...form.register("qualite")} className={inputClass} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Email *</label><input type="email" {...form.register("email")} className={inputClass} /></div>
                <div><label className={labelClass}>Téléphone (8-12 chiffres) *</label><input {...form.register("telephone")} className={inputClass} /></div>
              </div>
              <div className="mt-4"><label className={labelClass}>Adresse complète *</label><input {...form.register("adresse")} className={inputClass} /></div>
            </div>
          </FadeIn>
          
          <FadeIn delay={300}>
            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-lg font-bold mb-4">Détails de la demande</h3>
              <div className="mb-4"><label className={labelClass}>Objet de la demande *</label><input {...form.register("objet")} className={inputClass} /></div>
              <div>
                <label className={labelClass}>Exposez votre plainte / déclaration *</label>
                <textarea {...form.register("description")} rows={6} className={inputClass} placeholder="Exemple : Je signale une pratique de prix abusifs..." />
                <p className="text-xs text-muted-foreground mt-1">Soyez précis et factuel.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <Button type="submit" disabled={loading} className="w-full h-12 text-lg font-bold shadow-md shadow-primary/20">
              {loading ? <Loader2 className="animate-spin" /> : "Soumettre la demande"}
            </Button>
          </FadeIn>
        </form>
      </div>
    </div>
  );
}

