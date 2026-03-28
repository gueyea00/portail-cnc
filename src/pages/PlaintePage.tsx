import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, ArrowLeft, ArrowRight, Upload, Loader2, MessageSquareWarning } from "lucide-react";

const etape1Schema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  prenom: z.string().min(2, "Le prénom est requis"),
  qualite: z.string().min(2, "Précisez votre qualité"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(8, "Numéro invalide"),
  adresse: z.string().min(5, "Adresse requise"),
});

const etape2Schema = z.object({
  typePratique: z.string().min(2, "Champ requis"),
  secteur: z.string().min(2, "Champ requis"),
  entreprise: z.string().min(2, "Champ requis"),
  description: z.string().min(20, "Minimum 20 caractères"),
});

type Etape1Data = z.infer<typeof etape1Schema>;
type Etape2Data = z.infer<typeof etape2Schema>;

const etapes = ["Identité", "Nature de la plainte", "Pièces jointes", "Récapitulatif"];

export default function PlaintePage() {
  const [step, setStep] = useState(0);
  const [data1, setData1] = useState<Etape1Data | null>(null);
  const [data2, setData2] = useState<Etape2Data | null>(null);
  const [fichiers, setFichiers] = useState<string[]>([]);
  const [honneur, setHonneur] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  const form1 = useForm<Etape1Data>({ resolver: zodResolver(etape1Schema), defaultValues: data1 || {} });
  const form2 = useForm<Etape2Data>({ resolver: zodResolver(etape2Schema), defaultValues: data2 || {} });

  const onStep1 = form1.handleSubmit((d) => { setData1(d); setStep(1); });
  const onStep2 = form2.handleSubmit((d) => { setData2(d); setStep(2); });

  const onSubmit = async () => {
    if (!honneur) { toast.error("Veuillez cocher la déclaration sur l'honneur."); return; }
    if (!data1 || !data2) return;

    setLoading(true);
    try {
      const response = await fetch("/api/plaintes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: data1.nom,
          prenom: data1.prenom,
          email: data1.email,
          telephone: data1.telephone,
          qualite: data1.qualite,
          type_pratique: data2.typePratique,
          description: data2.description,
          entreprise_concernee: data2.entreprise,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de la plainte");
      }

      const resData = await response.json();
      setReference(resData.reference);
      setSubmitted(true);
      toast.success("Plainte déposée avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div>
        <section className="page-hero"><div className="container-page"><h1 className="text-3xl font-bold">Plainte déposée</h1></div></section>
        <div className="container-page py-16 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Votre plainte a été enregistrée</h2>
          <p className="text-muted-foreground mb-4">Votre numéro de référence :</p>
          <p className="text-2xl font-bold text-primary mb-6">{reference}</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
            Conservez ce numéro pour le suivi de votre dossier. Un accusé de réception vous sera envoyé par email dans un délai de 15 jours ouvrables.
          </p>
          <Button onClick={() => { setSubmitted(false); setStep(0); setData1(null); setData2(null); setFichiers([]); setHonneur(false); }}>
            Déposer une autre plainte
          </Button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary";
  const labelClass = "block text-sm font-medium text-foreground mb-1";
  const errorClass = "text-xs text-destructive mt-1";

  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
            <MessageSquareWarning className="w-8 h-8 md:w-10 md:h-10 text-gold" />
            Dépôt de plainte en ligne
          </h1>
          <p className="mt-2 opacity-90 text-lg">Formulaire sécurisé en 4 étapes</p>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12 max-w-3xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-10">
          {etapes.map((e, i) => (
            <div key={e} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>{i + 1}</div>
                <span className="text-xs text-muted-foreground mt-1 hidden sm:block">{e}</span>
              </div>
              {i < etapes.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Étape 1 */}
        {step === 0 && (
          <form onSubmit={onStep1} className="space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-4">Identité du plaignant</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>Nom *</label><input {...form1.register("nom")} className={inputClass} />{form1.formState.errors.nom && <p className={errorClass}>{form1.formState.errors.nom.message}</p>}</div>
              <div><label className={labelClass}>Prénom *</label><input {...form1.register("prenom")} className={inputClass} />{form1.formState.errors.prenom && <p className={errorClass}>{form1.formState.errors.prenom.message}</p>}</div>
            </div>
            <div><label className={labelClass}>Qualité *</label><input {...form1.register("qualite")} placeholder="Ex: Consommateur, Entreprise..." className={inputClass} />{form1.formState.errors.qualite && <p className={errorClass}>{form1.formState.errors.qualite.message}</p>}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>Email *</label><input type="email" {...form1.register("email")} className={inputClass} />{form1.formState.errors.email && <p className={errorClass}>{form1.formState.errors.email.message}</p>}</div>
              <div><label className={labelClass}>Téléphone *</label><input {...form1.register("telephone")} className={inputClass} />{form1.formState.errors.telephone && <p className={errorClass}>{form1.formState.errors.telephone.message}</p>}</div>
            </div>
            <div><label className={labelClass}>Adresse *</label><input {...form1.register("adresse")} className={inputClass} />{form1.formState.errors.adresse && <p className={errorClass}>{form1.formState.errors.adresse.message}</p>}</div>
            <div className="flex justify-end pt-4">
              <Button type="submit" className="gap-2">Suivant <ArrowRight className="w-4 h-4" /></Button>
            </div>
          </form>
        )}

        {/* Ã‰tape 2 */}
        {step === 1 && (
          <form onSubmit={onStep2} className="space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-4">Nature de la plainte</h2>
            <div><label className={labelClass}>Type de pratique *</label>
              <select {...form2.register("typePratique")} className={inputClass}>
                <option value="">Sélectionnez...</option>
                <option value="Entente illicite">Entente illicite</option>
                <option value="Abus de position dominante">Abus de position dominante</option>
                <option value="Pratique commerciale déloyale">Pratique commerciale déloyale</option>
                <option value="Concentration anticoncurrentielle">Concentration anticoncurrentielle</option>
                <option value="Autre">Autre</option>
              </select>
              {form2.formState.errors.typePratique && <p className={errorClass}>{form2.formState.errors.typePratique.message}</p>}
            </div>
            <div><label className={labelClass}>Secteur d'activité *</label>
              <select {...form2.register("secteur")} className={inputClass}>
                <option value="">Sélectionnez...</option>
                <option value="Télécommunications">Télécommunications</option>
                <option value="Hydrocarbures">Hydrocarbures</option>
                <option value="Agroalimentaire">Agroalimentaire</option>
                <option value="BTP">BTP / Matériaux</option>
                <option value="Santé">Santé / Pharmacie</option>
                <option value="Transport">Transport</option>
                <option value="Commerce">Commerce</option>
                <option value="Banque">Banque / Finance</option>
                <option value="Autre">Autre</option>
              </select>
              {form2.formState.errors.secteur && <p className={errorClass}>{form2.formState.errors.secteur.message}</p>}
            </div>
            <div><label className={labelClass}>Entreprise mise en cause *</label><input {...form2.register("entreprise")} className={inputClass} />{form2.formState.errors.entreprise && <p className={errorClass}>{form2.formState.errors.entreprise.message}</p>}</div>
            <div><label className={labelClass}>Description détaillée *</label><textarea {...form2.register("description")} rows={5} className={inputClass} />{form2.formState.errors.description && <p className={errorClass}>{form2.formState.errors.description.message}</p>}</div>
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(0)} className="gap-2"><ArrowLeft className="w-4 h-4" /> Précédent</Button>
              <Button type="submit" className="gap-2">Suivant <ArrowRight className="w-4 h-4" /></Button>
            </div>
          </form>
        )}

        {/* Étape 3 */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-4">Pièces jointes</h2>
            <p className="text-sm text-muted-foreground mb-4">Ajoutez les documents justificatifs de votre plainte (contrats, factures, échanges de correspondance, etc.)</p>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-2">Glissez-déposez vos fichiers ici ou</p>
              <Button variant="outline" size="sm" onClick={() => { setFichiers([...fichiers, `document_${fichiers.length + 1}.pdf`]); toast.info("Fichier ajouté (simulation)"); }}>
                Parcourir les fichiers
              </Button>
            </div>
            {fichiers.length > 0 && (
              <ul className="space-y-2">
                {fichiers.map((f, i) => (
                  <li key={i} className="flex items-center justify-between bg-surface p-3 rounded border border-border text-sm">
                    <span>{f}</span>
                    <button onClick={() => setFichiers(fichiers.filter((_, j) => j !== i))} className="text-destructive text-xs">Supprimer</button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-2"><ArrowLeft className="w-4 h-4" /> Précédent</Button>
              <Button onClick={() => setStep(3)} className="gap-2">Suivant <ArrowRight className="w-4 h-4" /></Button>
            </div>
          </div>
        )}

        {/* Étape 4 — Récapitulatif */}
        {step === 3 && data1 && data2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Récapitulatif</h2>
            <div className="bg-surface rounded-lg border border-border divide-y divide-border">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-primary mb-2">Identité du plaignant</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-muted-foreground">Nom :</span> {data1.nom}</div>
                  <div><span className="text-muted-foreground">Prénom :</span> {data1.prenom}</div>
                  <div><span className="text-muted-foreground">Email :</span> {data1.email}</div>
                  <div><span className="text-muted-foreground">Tél :</span> {data1.telephone}</div>
                  <div className="col-span-2"><span className="text-muted-foreground">Qualité :</span> {data1.qualite}</div>
                  <div className="col-span-2"><span className="text-muted-foreground">Adresse :</span> {data1.adresse}</div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-primary mb-2">Nature de la plainte</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-muted-foreground">Type :</span> {data2.typePratique}</div>
                  <div><span className="text-muted-foreground">Secteur :</span> {data2.secteur}</div>
                  <div className="col-span-2"><span className="text-muted-foreground">Entreprise :</span> {data2.entreprise}</div>
                  <div className="col-span-2"><span className="text-muted-foreground">Description :</span> {data2.description}</div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-primary mb-2">Pièces jointes</h3>
                <p className="text-sm">{fichiers.length > 0 ? fichiers.join(", ") : "Aucune pièce jointe"}</p>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={honneur} onChange={(e) => setHonneur(e.target.checked)} className="mt-1 accent-primary" />
              <span className="text-sm text-foreground">Je déclare sur l'honneur que les informations fournies sont exactes et que la présente plainte est formulée de bonne foi.</span>
            </label>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)} className="gap-2"><ArrowLeft className="w-4 h-4" /> Précédent</Button>
              <Button onClick={onSubmit} disabled={loading} className="gap-2">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...</> : "Soumettre la plainte"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

