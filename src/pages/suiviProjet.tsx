import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Search,
    FileText,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Printer,
    ArrowRight,
    ShieldAlert,
    Info,
    Calendar,
    Building,
    Loader2,
    FileCheck2,
    Lock,
    ArrowLeft,
    Briefcase
} from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

interface PublicPlainte {
    reference: string;
    nom: string;
    prenom: string;
    type_pratique: string;
    entreprise_concernee: string;
    secteur: string;
    statut: string;
    created_at: string;
    updated_at: string;
}

export default function SuiviProjet() {
    const [searchRef, setSearchRef] = useState("");
    const [submittedRef, setSubmittedRef] = useState("");

    const { data: pageConfig } = useQuery({
        queryKey: ["parametres"],
        queryFn: () => fetch("/api/parametres").then(res => res.json())
    });

    // Query to fetch the complaint by reference from MCI Service
    const { data: dossier, isLoading, error, refetch } = useQuery<PublicPlainte>({
        queryKey: ["suiviDossier", submittedRef],
        queryFn: async () => {
            if (!submittedRef) return null;
            // Appel vers le service-mci sur le port 5012
            const res = await fetch(`http://188.165.77.237:5003/v1/dossiers/${submittedRef.trim()}`);
            if (res.status === 404) {
                throw new Error("Aucun dossier trouvé avec cette référence.");
            }
            if (!res.ok) {
                throw new Error("Une erreur est survenue lors de la recherche.");
            }
            const data = await res.json();
            
            // Mapping des champs du service-mci vers l'interface PublicPlainte
            return {
                reference: data.reference,
                nom: data.nom,
                prenom: data.prenom,
                type_pratique: data.sujet,
                entreprise_concernee: data.cible,
                secteur: data.secteur,
                statut: data.status,
                created_at: data.dateCreation,
                updated_at: data.dateCreation // SQLite doesn't have updated_at in the current schema
            };
        },
        enabled: !!submittedRef,
        retry: false
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchRef.trim()) {
            toast.error("Veuillez saisir un numéro de référence.");
            return;
        }
        setSubmittedRef(searchRef.trim());
    };

    const handlePrint = () => {
        window.print();
    };

    // Determine current active step (0-indexed) based on backend status
    const getActiveStep = (status: string | undefined): number => {
        if (!status) return 0;
        const s = status.toLowerCase();
        if (s === "traite" || s === "resolu" || s === "archivé") return 2;
        if (s === "en_cours" || s === "instruction" || s === "analyse") return 1;
        return 0; // "recue" or "nouvelle"
    };

    const activeStep = getActiveStep(dossier?.statut);

    const getStatusLabel = (status: string | undefined): { text: string; color: string; bg: string } => {
        if (!status) return { text: "Inconnu", color: "text-slate-600", bg: "bg-slate-100" };
        const s = status.toLowerCase();
        if (s === "traite" || s === "resolu") {
            return { text: "Dossier Traité / Résolu", color: "text-green-700", bg: "bg-green-100" };
        }
        if (s === "en_cours" || s === "instruction" || s === "analyse") {
            return { text: "En cours d'instruction", color: "text-blue-700", bg: "bg-blue-100" };
        }
        return { text: "Reçu et Enregistré", color: "text-orange-700", bg: "bg-orange-100" };
    };

    const currentStatus = getStatusLabel(dossier?.statut);

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Hero section - no-print during prints */}
            <section className="page-hero bg-gradient-to-r from-primary via-[#0f2e5c] to-primary text-primary-foreground py-16 relative overflow-hidden no-print">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,204,0,0.1),transparent)] pointer-events-none"></div>
                <div className="container-page relative z-10 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight flex flex-col gap-2">
                            {/* <span className="text-gold uppercase tracking-wider text-xs md:text-sm font-bold">Portail Citoyen du Tchad</span> */}
                            <span className="flex items-center justify-center md:justify-start gap-3">
                                <FileCheck2 className="w-8 h-8 md:w-12 md:h-12 text-gold animate-pulse" />
                                Suivi de Dossier & Plainte
                            </span>
                        </h1>
                        <p className="mt-4 opacity-90 text-sm md:text-lg max-w-xl font-light">
                            Recherchez et suivez en temps réel l'état d'avancement des dossiers déposés auprès du Conseil National de la Concurrence.
                        </p>
                    </div>
                </div>
            </section>

            <div className="no-print">
                <Breadcrumb />
            </div>

            <div className="container-page py-12 max-w-4xl">
                {/* Search widget card - no-print */}
                <div className="bg-surface p-6 md:p-8 rounded-[32px] shadow-soft border border-slate-100 mb-8 no-print">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="text-center max-w-xl mx-auto space-y-2">
                            <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                                Saisissez votre numéro de référence
                            </h2>
                            <p className="text-xs md:text-sm text-slate-400">
                                Entrez la référence unique délivrée lors du dépôt en ligne ou physique de votre dossier.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Ex: CNC-2026-ABCD"
                                    value={searchRef}
                                    onChange={(e) => setSearchRef(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm font-semibold tracking-wider placeholder:font-normal uppercase"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="py-4 px-8 rounded-2xl h-auto bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Recherche...
                                    </>
                                ) : (
                                    <>
                                        Rechercher
                                        <ArrowRight className="w-4 h-4 text-gold" />
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Hint */}
                        <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3 max-w-2xl mx-auto border border-slate-100">
                            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <div className="text-xs text-slate-500 leading-relaxed">
                                <span className="font-bold text-slate-700">Où trouver ce numéro ?</span> Il vous a été attribué sur l'écran final de validation de votre plainte, et envoyé par email. Exemple de format : <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-primary font-bold">CNC-2026-XXXX</span>.
                            </div>
                        </div>
                    </form>
                </div>

                {/* Loading Spinner */}
                {isLoading && (
                    <div className="bg-surface py-20 rounded-[32px] border border-slate-100 shadow-soft text-center space-y-4 no-print">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
                        <p className="text-slate-500 text-sm font-medium">Interrogation sécurisée de la base de données du CNC...</p>
                    </div>
                )}

                {/* Error / Not Found State */}
                {error && !isLoading && (
                    <div className="bg-surface p-8 md:p-12 rounded-[32px] border border-red-100 shadow-soft text-center space-y-6 max-w-2xl mx-auto animate-in fade-in duration-300 no-print">
                        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-800">Numéro de référence introuvable</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Nous n'avons trouvé aucun dossier correspondant à la référence <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">"{submittedRef}"</span>.
                                Veuillez vérifier l'orthographe exacte et réessayer.
                            </p>
                        </div>
                        <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 text-left space-y-2">
                            <p className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                                <ShieldAlert className="w-4 h-4" /> Conseils d'écriture :
                            </p>
                            <ul className="text-xs text-slate-600 list-disc list-inside space-y-1 pl-1">
                                <li>Respectez les tirets (ex : CNC-2026-ABCD)</li>
                                <li>Les lettres peuvent être tapées en majuscules ou minuscules</li>
                                <li>Évitez les espaces avant ou après le code</li>
                            </ul>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button variant="outline" className="rounded-xl" onClick={() => setSearchRef(submittedRef)}>
                                Corriger la saisie
                            </Button>
                            <a href="/contact" className="inline-block">
                                <Button className="bg-primary text-primary-foreground rounded-xl w-full">
                                    Contacter le support
                                </Button>
                            </a>
                        </div>
                    </div>
                )}

                {/* Success State - Result Card */}
                {dossier && !isLoading && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
                        {/* Header info bar - for screen and print */}
                        <div className="bg-surface rounded-[32px] border border-slate-100 shadow-soft overflow-hidden">
                            {/* Header with flags and logo - beautiful on screen, essential on print */}
                            <div className="p-6 md:p-8 bg-gradient-to-r from-primary/5 via-slate-50 to-primary/5 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">
                                            Fiche d'avancement de dossier
                                        </h3>
                                        <p className="text-xs text-slate-400 font-mono">
                                            Référence Officielle : {dossier.reference}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 no-print">
                                    <Button
                                        onClick={handlePrint}
                                        variant="outline"
                                        className="rounded-xl gap-2 font-medium hover:bg-slate-50 border-slate-200"
                                    >
                                        <Printer className="w-4 h-4" />
                                        Imprimer la fiche
                                    </Button>
                                    <Button
                                        onClick={() => { setSubmittedRef(""); setSearchRef(""); }}
                                        variant="ghost"
                                        className="rounded-xl gap-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Nouveau suivi
                                    </Button>
                                </div>
                            </div>

                            {/* Dossier details Grid */}
                            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-slate-400 shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Date de dépôt</p>
                                            <p className="text-sm font-semibold text-slate-700">
                                                {dossier.created_at ? new Date(dossier.created_at).toLocaleDateString('fr-FR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                }) : "Non renseignée"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Building className="w-5 h-5 text-slate-400 shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Secteur concerné</p>
                                            <p className="text-sm font-semibold text-slate-700">{dossier.secteur || "Général"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Briefcase className="w-5 h-5 text-slate-400 shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Objet du dossier</p>
                                            <p className="text-sm font-bold text-slate-700">{dossier.type_pratique || "Plainte administrative"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                                    <div className="flex items-center gap-3">
                                        <Lock className="w-5 h-5 text-slate-400 shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Déposant (Identité masquée)</p>
                                            <p className="text-sm font-semibold text-slate-700">
                                                {dossier.prenom} {dossier.nom}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Building className="w-5 h-5 text-slate-400 shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Opérateur mis en cause</p>
                                            <p className="text-sm font-bold text-amber-700">{dossier.entreprise_concernee || "En cours d'identification"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-slate-400 shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Statut Actuel</p>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${currentStatus.bg} ${currentStatus.color} mt-1`}>
                                                {currentStatus.text}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Timeline Stepper */}
                        <div className="bg-surface p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-soft">
                            <h4 className="text-base font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <FileCheck2 className="w-5 h-5 text-primary" />
                                Étapes de traitement du dossier au CNC
                            </h4>

                            {/* Timeline layout */}
                            <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-3 md:gap-4 md:pt-4">
                                {/* Visual line - hidden in mobile, shown in desktop */}
                                <div className="hidden md:block absolute top-[43px] left-[15%] right-[15%] h-[3px] bg-slate-100 z-0">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-500 to-primary transition-all duration-1000"
                                        style={{ width: activeStep === 0 ? '0%' : activeStep === 1 ? '50%' : '100%' }}
                                    />
                                </div>

                                {/* Step 1: Reçu & Enregistré */}
                                <div className="relative mb-8 md:mb-0 text-left md:text-center flex flex-col items-start md:items-center group">
                                    {/* Vertical line for mobile */}
                                    <div className="md:hidden absolute top-[30px] bottom-[-32px] left-[-22px] w-[3px] bg-slate-100 z-0">
                                        <div
                                            className="w-full bg-green-500 transition-all duration-500"
                                            style={{ height: activeStep >= 1 ? '100%' : '0%' }}
                                        />
                                    </div>

                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all duration-500 ${activeStep >= 0
                                        ? "bg-green-500 text-white shadow-lg shadow-green-200"
                                        : "bg-slate-100 text-slate-400"
                                        }`}>
                                        {activeStep >= 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                                    </div>

                                    <div className="mt-2 md:mt-4 space-y-1">
                                        <h5 className="font-bold text-slate-800 text-sm md:text-base">1. Réception & Enregistrement</h5>
                                        <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Validé</p>
                                        <p className="text-xs text-slate-500 leading-relaxed max-w-[240px] mx-auto">
                                            Dossier enregistré sous la référence {dossier.reference} et assigné aux services d'enquêtes du CNC.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 2: Instruction */}
                                <div className="relative mb-8 md:mb-0 text-left md:text-center flex flex-col items-start md:items-center group">
                                    {/* Vertical line for mobile */}
                                    <div className="md:hidden absolute top-[30px] bottom-[-32px] left-[-22px] w-[3px] bg-slate-100 z-0">
                                        <div
                                            className="w-full bg-primary transition-all duration-500"
                                            style={{ height: activeStep >= 2 ? '100%' : '0%' }}
                                        />
                                    </div>

                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all duration-500 ${activeStep >= 1
                                        ? activeStep >= 2
                                            ? "bg-green-500 text-white shadow-lg shadow-green-200"
                                            : "bg-primary text-white shadow-lg shadow-primary-200 animate-pulse"
                                        : "bg-slate-100 text-slate-400 border border-dashed border-slate-200"
                                        }`}>
                                        {activeStep >= 2 ? <CheckCircle2 className="w-5 h-5" /> : "2"}
                                    </div>

                                    <div className="mt-2 md:mt-4 space-y-1">
                                        <h5 className="font-bold text-slate-800 text-sm md:text-base">2. Enquête & Instruction</h5>
                                        <p className={`text-[10px] font-bold uppercase tracking-wider ${activeStep >= 1 ? activeStep >= 2 ? "text-green-600" : "text-primary animate-pulse" : "text-slate-400"}`}>
                                            {activeStep >= 1 ? activeStep >= 2 ? "Validé" : "En cours d'instruction" : "En attente"}
                                        </p>
                                        <p className="text-xs text-slate-500 leading-relaxed max-w-[240px] mx-auto">
                                            Analyse approfondie des pièces justificatives, auditions contradictoires et vérifications de loyauté commerciale.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3: Décision */}
                                <div className="relative text-left md:text-center flex flex-col items-start md:items-center group">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all duration-500 ${activeStep >= 2
                                        ? "bg-green-500 text-white shadow-lg shadow-green-200"
                                        : "bg-slate-100 text-slate-400 border border-dashed border-slate-200"
                                        }`}>
                                        "3"
                                    </div>

                                    <div className="mt-2 md:mt-4 space-y-1">
                                        <h5 className="font-bold text-slate-800 text-sm md:text-base">3. Décision du Collège</h5>
                                        <p className={`text-[10px] font-bold uppercase tracking-wider ${activeStep >= 2 ? "text-green-600" : "text-slate-400"}`}>
                                            {activeStep >= 2 ? "Terminé / Notifié" : "En attente"}
                                        </p>
                                        <p className="text-xs text-slate-500 leading-relaxed max-w-[240px] mx-auto">
                                            Délibération plénière du Collège du CNC, prononcé de la décision réglementaire et notification officielle.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Official seal footer - shown on screen and printable */}
                        <div className="bg-slate-100/50 border border-slate-200 rounded-[32px] p-6 text-center space-y-3 relative overflow-hidden">
                            <div className="absolute top-0 right-0 opacity-5 pointer-events-none translate-x-6 -translate-y-6">
                                <FileCheck2 className="w-48 h-48 text-primary" />
                            </div>
                            <h5 className="text-xs md:text-sm font-bold text-slate-700">Conseil National de la Concurrence du Tchad</h5>
                            <p className="text-[10px] text-slate-400 leading-relaxed max-w-lg mx-auto">
                                Ce document constitue une attestation officielle d'état d'avancement générée électroniquement par le portail du CNC Tchad.
                                Pour toute réclamation, contactez-nous par email à <span className="font-semibold text-slate-600">contact@cnc-tchad.td</span> en mentionnant la référence ci-dessus.
                            </p>
                            <div className="pt-2 flex justify-center gap-1">
                                <span className="w-6 h-1.5 bg-blue-600 rounded-full"></span>
                                <span className="w-6 h-1.5 bg-yellow-500 rounded-full"></span>
                                <span className="w-6 h-1.5 bg-red-600 rounded-full"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
