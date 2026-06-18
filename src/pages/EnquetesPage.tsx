import React from 'react';
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Search, Eye, AlertCircle, Building2, Droplets, Zap, Wifi, Gavel } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export default function EnquetesPage() {
  return (
    <div className="bg-surface min-h-screen">
      <section className="page-hero">
        <div className="container-page">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
              <Search className="w-8 h-8 md:w-10 md:h-10 text-gold" />
              Processus et Procédures d'Enquêtes
            </h1>
            <p className="mt-2 opacity-90 text-lg">Modalités d'ouvertures d'enquêtes par le Conseil National de la Concurrence.</p>
          </FadeIn>
        </div>
      </section>

      <Breadcrumb />

      <div className="container-page py-16 space-y-16">
        
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title">Types d'Enquêtes</h2>
            <p className="section-subtitle">Le CNC dispose de plusieurs leviers pour assurer la régulation du marché.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <FadeIn delay={100} className="h-full">
            <div className="p-8 bg-background border border-border hover:border-primary/30 rounded-2xl shadow-sm hover:shadow-xl transition-all group h-full">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-4">Enquête Simple</h2>
              <p className="text-muted-foreground leading-relaxed">Destinée aux vérifications de routine et examens préliminaires de conformité sur le marché national. Elle permet une première approche de régulation.</p>
            </div>
          </FadeIn>

          <FadeIn delay={200} className="h-full">
            <div className="p-8 bg-background border border-border hover:border-primary/30 rounded-2xl shadow-sm hover:shadow-xl transition-all group h-full">
              <div className="w-14 h-14 bg-destructive/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-7 h-7 text-destructive" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-4">Enquête Approfondie</h2>
              <p className="text-muted-foreground leading-relaxed">Déclenchée en cas de soupçons sérieux de pratiques anticoncurrentielles majeures (ententes, abus de position dominante) nécessitant des investigations poussées.</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={300}>
          <section className="bg-muted/50 p-8 md:p-12 rounded-[2rem] max-w-5xl mx-auto border border-border/50">
            <h2 className="text-2xl font-bold mb-8 text-center">Secteurs Prioritaires</h2>
            <p className="mb-8 text-center text-muted-foreground max-w-2xl mx-auto">Bien que le dispositif couvre l'ensemble des domaines d'activités, des enquêtes prioritaires ciblent en permanence les secteurs clés :</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-surface p-6 rounded-xl flex flex-col items-center text-center shadow-sm">
                <Building2 className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold mb-2">Transport</h3>
                <p className="text-xs text-muted-foreground">Régulation des flux de fret et passagers.</p>
              </div>
              <div className="bg-surface p-6 rounded-xl flex flex-col items-center text-center shadow-sm">
                <Zap className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold mb-2">Énergie</h3>
                <p className="text-xs text-muted-foreground">Surveillance de la distribution.</p>
              </div>
              <div className="bg-surface p-6 rounded-xl flex flex-col items-center text-center shadow-sm">
                <Droplets className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold mb-2">Eau</h3>
                <p className="text-xs text-muted-foreground">Contrôle de l'accès équitable.</p>
              </div>
              <div className="bg-surface p-6 rounded-xl flex flex-col items-center text-center shadow-sm">
                <Wifi className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold mb-2">Numérique</h3>
                <p className="text-xs text-muted-foreground">Surveillance des opérateurs et tarifs.</p>
              </div>
            </div>
            <p className="mt-8 text-xs text-center text-muted-foreground italic">* Note : Les hydrocarbures font l'objet d'un suivi réglementé distinct.</p>
          </section>
        </FadeIn>

        <FadeIn delay={400}>
          <section className="max-w-4xl mx-auto border-t border-border pt-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Gavel className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Contrôle Économique</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">Les enquêtes et contrôles sont assistés sur le terrain par des agents dûment désignés. À l'issue de chaque contrôle, une fiche de contrôle économique est émise en <strong>4 exemplaires</strong> originaux.</p>
            
            <div className="p-6 bg-amber-500/10 border-l-4 border-amber-500 text-foreground rounded-r-xl">
              <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Circuit réglementaire des infractions
              </h4>
              <p className="text-sm opacity-90">En cas de constatation d'une infraction avérée, le dossier du délinquant économique est immédiatement transmis au <strong>tribunal compétent</strong> pour traitement judiciaire strict.</p>
            </div>
          </section>
        </FadeIn>

      </div>
    </div>
  );
}
