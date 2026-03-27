import Breadcrumb from "@/components/layout/Breadcrumb";
import { missions } from "@/lib/data";
import { Shield, GitMerge, Scale, FileText, BarChart3, Users, Globe, Heart, Search } from "lucide-react";

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
          <h1 className="text-3xl md:text-4xl font-bold">Missions & Attributions</h1>
          <p className="mt-2 opacity-90 text-lg">Les neuf missions fondamentales du CNC</p>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12">
        <div className="space-y-6">
          {missions.map((m, i) => (
            <div key={m.titre} className="bg-surface p-6 md:p-8 rounded-lg border border-border flex gap-6 items-start">
              <div className="shrink-0 w-14 h-14 rounded-lg bg-muted text-primary flex items-center justify-center">
                {iconMap[m.icone]}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">Mission {i + 1}</span>
                  <h3 className="font-semibold text-foreground text-lg">{m.titre}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline des interventions */}
        <section className="mt-16">
          <h2 className="section-title text-center">Types d'interventions</h2>
          <p className="section-subtitle text-center">Le parcours d'une affaire devant le CNC</p>
          <div className="max-w-2xl mx-auto mt-8">
            {[
              { etape: "1", titre: "Saisine ou auto-saisine", desc: "Le CNC est saisi par plainte, signalement ou se saisit d'office." },
              { etape: "2", titre: "Enquête préliminaire", desc: "Les enquêteurs recueillent les éléments de preuve et auditionnent les parties." },
              { etape: "3", titre: "Instruction contradictoire", desc: "Les parties présentent leurs observations et moyens de défense." },
              { etape: "4", titre: "Délibération", desc: "Le Conseil délibère et rend sa décision en séance plénière." },
              { etape: "5", titre: "Décision et publication", desc: "La décision est notifiée aux parties et publiée au registre du CNC." },
            ].map((e) => (
              <div key={e.etape} className="flex gap-4 mb-6">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{e.etape}</div>
                <div className="pt-1">
                  <h3 className="font-semibold text-foreground">{e.titre}</h3>
                  <p className="text-sm text-muted-foreground">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
