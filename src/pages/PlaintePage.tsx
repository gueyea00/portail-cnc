import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2, MessageSquareWarning, User, Mail, Phone, MapPin, FileText, Upload, AlertCircle } from "lucide-react";
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

const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50";
const labelClass = "block text-sm font-semibold text-foreground mb-2";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
      <AlertCircle className="w-3 h-3" /> {message}
    </p>
  );
}

export default function PlaintePage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  const { data: pageConfig } = useQuery({
    queryKey: ["parametres"],
    queryFn: () => fetch("/api/parametres").then(res => res.json())
  });

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const selectedType = watch("typeDemande");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));

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
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <FadeIn direction="none">
          <div className="text-center max-w-md mx-auto bg-background p-12 rounded-3xl shadow-xl border border-border">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Demande enregistrée !</h2>
            <p className="text-muted-foreground mb-4">Votre dossier a été transmis au Conseil National de la Concurrence.</p>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Votre numéro de référence</p>
              <p className="text-2xl font-bold text-primary tracking-widest">{reference}</p>
            </div>
            <p className="text-xs text-muted-foreground mb-6">Conservez ce numéro pour suivre l'avancement de votre dossier.</p>
            <Button onClick={() => window.location.reload()} className="w-full">Déposer une nouvelle demande</Button>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
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

      <div className="container-page py-12">
        <div className="max-w-2xl mx-auto">

          {/* Bannière info */}
          <FadeIn>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-8 flex gap-4 items-start">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-1">Avant de soumettre</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Assurez-vous de disposer de tous les éléments justificatifs de votre plainte. Le CNC garantit la confidentialité de vos informations personnelles lors de l'instruction.
                </p>
              </div>
            </div>
          </FadeIn>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Étape 1 – Type de demande */}
            <FadeIn delay={100}>
              <div className="bg-background rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">1</div>
                  <h3 className="text-base font-bold">Type de demande</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Profil */}
                  <div>
                    <label className={labelClass}>Votre profil *</label>
                    <select {...register("typeUsager")} className={inputClass}>
                      <option value="">Sélectionnez votre profil...</option>
                      <option value="Consommateur">🧑 Consommateur</option>
                      <option value="Commerçant / Entreprise">🏢 Commerçant / Entreprise</option>
                    </select>
                    <FieldError message={errors.typeUsager?.message} />
                  </div>
                  {/* Type */}
                  <div>
                    <label className={labelClass}>Nature de la demande *</label>
                    <div className="grid grid-cols-2 gap-3 mt-0.5">
                      {(["Plainte", "Déclaration"] as const).map((type) => (
                        <label key={type} className={`cursor-pointer flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
                          selectedType === type
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40"
                        }`}>
                          <input type="radio" value={type} {...register("typeDemande")} className="sr-only" />
                          {type === "Plainte" ? "⚠️" : "📋"} {type}
                        </label>
                      ))}
                    </div>
                    <FieldError message={errors.typeDemande?.message} />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Étape 2 – Identité */}
            <FadeIn delay={200}>
              <div className="bg-background rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">2</div>
                  <h3 className="text-base font-bold">Votre identité</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}><User className="w-3.5 h-3.5 inline mr-1.5" />Nom *</label>
                      <input {...register("nom")} placeholder="Votre nom de famille" className={inputClass} />
                      <FieldError message={errors.nom?.message} />
                    </div>
                    <div>
                      <label className={labelClass}><User className="w-3.5 h-3.5 inline mr-1.5" />Prénom *</label>
                      <input {...register("prenom")} placeholder="Votre prénom" className={inputClass} />
                      <FieldError message={errors.prenom?.message} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Qualité / Fonction *</label>
                    <input {...register("qualite")} placeholder="Ex: Gérant, Consommateur, Directeur..." className={inputClass} />
                    <FieldError message={errors.qualite?.message} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}><Mail className="w-3.5 h-3.5 inline mr-1.5" />Email *</label>
                      <input type="email" {...register("email")} placeholder="votre@email.com" className={inputClass} />
                      <FieldError message={errors.email?.message} />
                    </div>
                    <div>
                      <label className={labelClass}><Phone className="w-3.5 h-3.5 inline mr-1.5" />Téléphone *</label>
                      <input {...register("telephone")} placeholder="Ex: 63000000" className={inputClass} />
                      <FieldError message={errors.telephone?.message} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}><MapPin className="w-3.5 h-3.5 inline mr-1.5" />Adresse complète *</label>
                    <input {...register("adresse")} placeholder="Quartier, Avenue, N'Djamena..." className={inputClass} />
                    <FieldError message={errors.adresse?.message} />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Étape 3 – Détails */}
            <FadeIn delay={300}>
              <div className="bg-background rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">3</div>
                  <h3 className="text-base font-bold">Détails de votre demande</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}><FileText className="w-3.5 h-3.5 inline mr-1.5" />Objet *</label>
                    <input {...register("objet")} placeholder="Résumez votre demande en une phrase..." className={inputClass} />
                    <FieldError message={errors.objet?.message} />
                  </div>
                  <div>
                    <label className={labelClass}>Description détaillée *</label>
                    <textarea
                      {...register("description")}
                      rows={6}
                      className={inputClass + " resize-none"}
                      placeholder="Exposez les faits de manière précise et chronologique. Indiquez les noms des entreprises impliquées, les dates, et les preuves dont vous disposez..."
                    />
                    <FieldError message={errors.description?.message} />
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3 h-3" />
                      Soyez précis et factuel. Minimum 20 caractères requis.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Bouton soumettre */}
            <FadeIn delay={400}>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Envoi en cours...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <MessageSquareWarning className="w-5 h-5" />
                    Soumettre ma demande
                  </span>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-3">
                En soumettant ce formulaire, vous acceptez que le CNC traite vos données conformément à sa politique de confidentialité.
              </p>
            </FadeIn>

          </form>
        </div>
      </div>
    </div>
  );
}
