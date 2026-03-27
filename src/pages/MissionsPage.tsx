import Breadcrumb from "@/components/layout/Breadcrumb";
import { missions } from "@/lib/data";
import { Shield, GitMerge, Scale, FileText, BarChart3, Users, Globe, Heart, Search, Target } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-8 h-8" />,
  GitMerge: <GitMerge className="w-8 h-8" />,
  Scale: <Scale className="w-8 h-8" />,
  FileText: <FileText className="w-8 h-8" />,
  BarChart3: <BarChart3 className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Globe: <Globe className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
  Search: <Search className="w-8 h-8" />,
};

export default function MissionsPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
            <Target className="w-8 h-8 md:w-10 md:h-10 text-gold" />
            Missions & Attributions
          </h1>
          <p className="mt-2 opacity-90 text-lg">Les neuf missions fondamentales du CNC</p>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12">
        <div className="space-y-6">
          {missions.map((m, i) => (
            <div key={m.titre} className={`${i % 2 === 0 ? 'bg-surface' : 'bg-muted'} p-6 md:p-8 rounded-2xl shadow-soft flex gap-6 items-start border-t-2 border-transparent hover:border-gold transition-colors`}>
              <div className="shrink-0 w-14 h-14 rounded-lg bg-primary/10 text-gold flex items-center justify-center">
                {iconMap[m.icone]}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-foreground bg-gold px-2 py-0.5 rounded shadow-sm">Mission {i + 1}</span>
                  <h3 className="font-semibold text-foreground text-lg">{m.titre}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flag-stripe mt-16" />
      </div>

      {/* Timeline des interventions */}
      <section className="bg-primary text-primary-foreground py-20 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
        </div>
        <div className="container-page relative z-10">
          <div className="accent-line mx-auto bg-secondary" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-4 text-white">Types d'interventions</h2>
          <p className="text-lg md:text-xl opacity-80 text-center mb-12 max-w-2xl mx-auto">Le parcours d'une affaire devant le Conseil National de la Concurrence</p>
          
          <div className="max-w-3xl mx-auto mt-12 space-y-8">
            {[
              { etape: "1", titre: "Saisine ou auto-saisine", desc: "Le CNC est saisi par plainte, signalement ou se saisit d'office." },
              { etape: "2", titre: "Enquête préliminaire", desc: "Les enquêteurs recueillent les éléments de preuve et auditionnent les parties." },
              { etape: "3", titre: "Instruction contradictoire", desc: "Les parties présentent leurs observations et moyens de défense." },
              { etape: "4", titre: "Délibération", desc: "Le Conseil délibère et rend sa décision en séance plénière." },
              { etape: "5", titre: "Décision et publication", desc: "La décision est notifiée aux parties et publiée au registre du CNC." },
            ].map((e, idx) => (
              <div key={e.etape} className="flex gap-6 group">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-xl border border-white/20 group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                  {e.etape}
                </div>
                <div className="pt-1 flex-1 border-b border-white/10 pb-6 group-last:border-none">
                  <h3 className="font-bold text-xl text-white mb-2">{e.titre}</h3>
                  <p className="text-base text-white/70">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flag-stripe" />
    </div>
  );
}

