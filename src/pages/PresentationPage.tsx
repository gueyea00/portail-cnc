import Breadcrumb from "@/components/layout/Breadcrumb";
import { directions, membres } from "@/lib/data";
import { Building2, ArrowRight } from "lucide-react";

export default function PresentationPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold">Présentation du CNC</h1>
          <p className="mt-2 opacity-90 text-lg">Découvrez le Conseil National de la Concurrence du Tchad</p>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12 space-y-16">
        {/* Présentation officielle */}
        <section>
          <h2 className="section-title">Le Conseil National de la Concurrence</h2>
          <div className="prose max-w-none text-foreground leading-relaxed space-y-4">
            <p>Le Conseil National de la Concurrence (CNC) est l'autorité administrative indépendante chargée de veiller au libre jeu de la concurrence et de réguler le fonctionnement des marchés en République du Tchad.</p>
            <p>Créé par la Loi N°014/PR/2015 relative à la concurrence, le CNC a pour vocation de garantir un environnement économique transparent, équitable et propice au développement. Il intervient dans tous les secteurs de l'économie nationale pour prévenir et sanctionner les pratiques anticoncurrentielles.</p>
            <p>Le CNC est doté de pouvoirs d'enquête, de décision et de sanction qui lui permettent d'agir efficacement contre les ententes illicites, les abus de position dominante et les concentrations économiques susceptibles de nuire à la concurrence.</p>
          </div>
        </section>

        {/* Historique */}
        <section>
          <h2 className="section-title">Historique</h2>
          <div className="space-y-6">
            {[
              { annee: "2015", desc: "Adoption de la Loi N°014/PR/2015 relative à la concurrence en République du Tchad, créant le cadre juridique de la régulation de la concurrence." },
              { annee: "2016", desc: "Publication du Décret N°2016/042 portant organisation et fonctionnement du Conseil National de la Concurrence." },
              { annee: "2017", desc: "Installation officielle du premier Conseil et nomination du Président et des membres par décret présidentiel." },
              { annee: "2018", desc: "Lancement des premières enquêtes sectorielles et adoption du règlement intérieur du CNC." },
              { annee: "2020", desc: "Renforcement des capacités avec le soutien de la CEMAC et des partenaires internationaux." },
              { annee: "2024", desc: "Bilan de 47 enquêtes menées, 12 décisions rendues et 15 sessions de sensibilisation organisées." },
            ].map((h) => (
              <div key={h.annee} className="flex gap-4">
                <div className="shrink-0 w-16 h-16 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">{h.annee}</div>
                <div className="pt-2">
                  <p className="text-foreground">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Organigramme */}
        <section>
          <h2 className="section-title">Organisation</h2>
          <p className="section-subtitle">L'organigramme du Conseil National de la Concurrence</p>

          {/* Président */}
          <div className="text-center mb-8">
            <div className="inline-block bg-primary text-primary-foreground rounded-xl p-6 shadow-lg">
              <Building2 className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-bold text-lg">Président du CNC</h3>
              <p className="text-sm opacity-80">M. Ibrahim Mahamat Saleh</p>
            </div>
          </div>

          {/* Directions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {directions.map((d) => (
              <div key={d.titre} className="bg-surface p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-primary text-sm mb-2">{d.titre}</h3>
                <p className="text-sm text-muted-foreground">{d.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Membres */}
        <section>
          <h2 className="section-title">Les membres du Conseil</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {membres.map((m) => (
              <div key={m.nom} className="bg-surface p-6 rounded-lg border border-border text-center">
                <div className={`w-16 h-16 rounded-full ${m.couleur} text-primary-foreground flex items-center justify-center mx-auto mb-4`}>
                  <span className="font-bold text-lg">{m.initiales}</span>
                </div>
                <h3 className="font-semibold text-foreground">{m.nom}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.fonction}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
