import React from 'react';
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Scale, BookOpen, Shield, FileText } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export default function ReglementationPage() {
  return (
    <div className="bg-surface min-h-screen">
      <section className="page-hero">
        <div className="container-page">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
              <Scale className="w-8 h-8 md:w-10 md:h-10 text-gold" />
              Réglementation et Textes de loi
            </h1>
            <p className="mt-2 opacity-90 text-lg">Le cadre juridique garantissant une saine concurrence sur le marché tchadien.</p>
          </FadeIn>
        </div>
      </section>
      
      <Breadcrumb />

      <div className="container-page py-16">
        <div className="max-w-4xl mx-auto">
          
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Cadre Juridique</h2>
              <p className="section-subtitle">Le Conseil National de la Concurrence (CNC) est une autorité administrative indépendante instituée par la loi N°014/PR/2015.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Card 1 */}
            <FadeIn delay={100}>
              <div className="bg-background rounded-2xl p-8 border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 group h-full">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Dispositions Légales</h3>
                <p className="text-muted-foreground leading-relaxed">
                  L'ensemble des dispositions est prévu par la loi. La réglementation de la concurrence vise à prévenir les pratiques anticoncurrentielles et à contrôler les concentrations économiques pour assurer un fonctionnement équilibré du marché.
                </p>
              </div>
            </FadeIn>

            {/* Card 2 */}
            <FadeIn delay={200}>
              <div className="bg-background rounded-2xl p-8 border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 group h-full">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Garantie d'équité</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le cadre juridique garantit une saine concurrence sur le marché tchadien. Il protège les entreprises contre les abus de position dominante et les ententes illicites, favorisant ainsi l'innovation et la compétitivité.
                </p>
              </div>
            </FadeIn>

            {/* Card 3 */}
            <FadeIn delay={300} className="md:col-span-2">
              <div className="bg-background rounded-2xl p-8 border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 group h-full">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Dépôt de plainte et procédures</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Conformément au règlement intérieur, tout usager, entreprise ou institution peut déposer une plainte auprès du CNC en cas de suspicion de pratiques anticoncurrentielles.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Les frais exigibles sont fixés par les textes d'application de la loi.</li>
                  <li>Les pièces justificatives requises doivent être dûment complétées.</li>
                  <li>Le CNC garantit la confidentialité des informations sensibles lors de l'instruction.</li>
                </ul>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </div>
  );
}
