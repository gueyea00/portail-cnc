import { useQuery } from "@tanstack/react-query";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Shield, GitMerge, Scale, FileText, BarChart3, Users, Globe, Heart, Search, Target, CheckCircle, Zap } from "lucide-react";
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
  CheckCircle: <CheckCircle className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
};
export default function MissionsPage() {
  const { data: missionsApi = [] } = useQuery({
    queryKey: ["missions"],
    queryFn: () => fetch("/api/missions").then(res => res.json())
  });
  const { data: etapesApi = [] } = useQuery({
    queryKey: ["etapes-intervention"],
    queryFn: () => fetch("/api/missions/etapes").then(res => res.json())
  });
  const sortedEtapes = Array.isArray(etapesApi) ? [...etapesApi].sort((a: any, b: any) => (a.ordre || 0) - (b.ordre || 0)) : [];
  const { data: pageConfig } = useQuery({
    queryKey: ["parametres"],
    queryFn: () => fetch("/api/parametres").then(res => res.json())
  });
  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
            <Target className="w-8 h-8 md:w-10 md:h-10 text-gold" />
            {pageConfig?.missions_hero_title || "Missions & Attributions"}
          </h1>
          <p className="mt-2 opacity-90 text-lg">{pageConfig?.missions_hero_subtitle || "Les missions fondamentales du CNC"}</p>
        </div>
      </section>
      <Breadcrumb />
      <div className="bg-muted/50 py-16">
        <div className="container-page">
          <p className="section-subtitle mb-12">{pageConfig?.missions_section_subtitle || "Le CNC assure la régulation et le bon fonctionnement des marchés au Tchad."}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(missionsApi.length > 0 ? missionsApi : []).map((m: any, i: number) => (
              <div key={m.titre} className="bg-surface p-6 rounded-[2rem] shadow-soft flex flex-col items-center text-center border-2 border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-300 group">
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-8 h-8">
                    {iconMap[m.icone] || <Shield className="w-8 h-8" />}
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2 block">Mission {i + 1}</span>
                  <h3 className="font-bold text-foreground text-md leading-tight h-12 flex items-center justify-center">{m.titre}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-500">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="bg-surface py-20 border-t border-border">
        <div className="container-page">
          <h2 className="section-title text-center">{pageConfig?.missions_process_title || "Types d'interventions"}</h2>
          <p className="section-subtitle text-center mb-16">{pageConfig?.missions_process_subtitle || "Le parcours d'une affaire devant le Conseil National de la Concurrence"}</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Ligne de connexion sur desktop - Placée derrière (z-0) */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border hidden md:block -translate-y-8 z-0" />
            {sortedEtapes.length === 0 ? (
              <div className="col-span-5 text-center text-muted-foreground italic">Aucun processus défini.</div>
            ) : sortedEtapes.map((e: any, idx: number) => (
              <div key={e.id} className="relative bg-surface p-6 rounded-2xl border border-border flex flex-col items-center text-center hover:shadow-lg transition-all z-10">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4 shadow-lg shadow-primary/20">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-foreground mb-2">{e.titre}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
