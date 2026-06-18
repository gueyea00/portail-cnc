import { useRef } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { Info, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const getImgUrl = (path: string | null | undefined, fallback: string) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  return `/${path}`;
};

export default function PresentationPage() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const scrollTimeline = (direction: "left" | "right") => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({ left: direction === "left" ? -350 : 350, behavior: "smooth" });
    }
  };

  const { data: membres = [], isLoading: isLoadingMembres } = useQuery({
    queryKey: ["membres"],
    queryFn: () => fetch("/api/membres").then(res => res.json())
  });

  const { data: presidentData } = useQuery({
    queryKey: ["president"],
    queryFn: () => fetch("/api/parametres").then(res => res.json())
  });

  const { data: historique = [] } = useQuery({
    queryKey: ["historique"],
    queryFn: () => fetch("/api/missions/historique").then(res => res.json())
  });

  const sortedHistory = Array.isArray(historique) ? [...historique].sort((a: any, b: any) => (a.ordre || 0) - (b.ordre || 0)) : [];
  const activeMembres = (membres || []).filter((m: any) => m.actif !== false).sort((a: any, b: any) => (a.ordre || 0) - (b.ordre || 0));
  const bgColors = ["bg-blue-600", "bg-red-600", "bg-yellow-600", "bg-green-600", "bg-purple-600"];

  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
              <Info className="w-8 h-8 md:w-10 md:h-10 text-gold" />
              {presidentData?.pres_hero_title || "Présentation du CNC"}
            </h1>
            <p className="mt-2 opacity-90 text-lg">{presidentData?.pres_hero_subtitle || "Découvrez le Conseil National de la Concurrence du Tchad"}</p>
          </FadeIn>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12 space-y-16">

        {/* Présentation officielle */}
        <FadeIn>
          <section className="flex flex-col md:flex-row gap-10 items-start">
            <div className="shrink-0 flex flex-col items-center gap-2 md:pt-2">
              <img
                src={getImgUrl(presidentData?.armoiries_path, "/armoiries-tchad.png")}
                alt="Armoiries de la République du Tchad"
                className="w-12 h-14 object-contain"
              />
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground text-center max-w-20 leading-tight">Armoiries du Tchad</p>
            </div>
            <div>
              <h2 className="section-title">{presidentData?.pres_section_title || "Le Conseil National de la Concurrence"}</h2>
              <div className="prose max-w-none text-foreground leading-relaxed space-y-4">
                <p>{presidentData?.presentation_p1 || "Le Conseil National de la Concurrence (CNC) de la République du Tchad est une autorité administrative indépendante chargée de veiller au respect des règles de concurrence sur le marché national."}</p>
                <p>{presidentData?.presentation_p2 || "Le CNC intervient pour prévenir, détecter et sanctionner les pratiques anticoncurrentielles telles que les ententes illicites, les abus de position dominante et les pratiques restrictives de concurrence."}</p>
                <p>{presidentData?.presentation_p3 || "Créé dans le cadre des réformes visant à moderniser l'économie tchadienne, le CNC s'est progressivement imposé comme un acteur clé dans la régulation économique."}</p>
                <p className="font-semibold text-primary">Le Conseil National de la Concurrence compte un total de 16 membres, soit 1 Président et 15 conseillers nommés.</p>
                <p className="text-muted-foreground italic text-sm">Note : Le CNC ne dispose pas encore d'expert attitré en interne.</p>
              </div>
            </div>
          </section>
        </FadeIn>

      </div>

      {/* Timeline */}
      <section className="bg-muted py-20 border-y border-border overflow-hidden">
        <div className="container-page">
          <FadeIn>
            <h2 className="section-title">{presidentData?.pres_timeline_title || "Dates clés"}</h2>
            <p className="section-subtitle mb-12">{presidentData?.pres_timeline_subtitle || "Les jalons essentiels de la régulation de la concurrence au Tchad."}</p>
          </FadeIn>

          <style>{`
            .scrollbar-timeline::-webkit-scrollbar { display: none; }
            .scrollbar-timeline { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          <div className="relative group/timeline">
            <button
              onClick={() => scrollTimeline("left")}
              className="absolute left-[-20px] top-[56px] -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 text-slate-700 hover:text-primary flex items-center justify-center z-30 transition-all hover:scale-105 active:scale-95 group/btn"
              aria-label="Défiler vers la gauche"
            >
              <ChevronLeft className="w-6 h-6 transition-transform group-hover/btn:-translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollTimeline("right")}
              className="absolute right-[-20px] top-[56px] -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 text-slate-700 hover:text-primary flex items-center justify-center z-30 transition-all hover:scale-105 active:scale-95 group/btn"
              aria-label="Défiler vers la droite"
            >
              <ChevronRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-0.5" />
            </button>

            <div className="relative overflow-x-auto pb-6 pt-4 scrollbar-timeline scroll-smooth" ref={timelineRef}>
              <div className="flex items-start gap-12 px-6 relative z-10 min-w-max">
                <div className="absolute top-[40px] left-[152px] right-[152px] h-[3px] bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 z-0 pointer-events-none" />
                {sortedHistory.length === 0 ? (
                  <div className="w-full text-center text-muted-foreground italic py-8">Aucune date clé disponible.</div>
                ) : sortedHistory.map((h: any, idx: number) => (
                  <FadeIn key={idx} delay={idx * 100} direction="up">
                    <div className="flex flex-col items-center group w-64 shrink-0">
                      <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-extrabold text-xl shadow-xl shadow-primary/20 group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300 mb-6 ring-8 ring-muted z-20">
                        {h.annee}
                      </div>
                      <div className="text-center px-4">
                        <p className="text-sm font-semibold text-foreground leading-relaxed group-hover:text-primary transition-colors duration-300">{h.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membres */}
      <div className="container-page py-20">
        <section>
          <FadeIn>
            <h2 className="section-title">{presidentData?.pres_members_title || "Les membres du Conseil"}</h2>
          </FadeIn>
          {isLoadingMembres ? (
            <div className="text-center py-10 text-muted-foreground">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              Chargement des membres...
            </div>
          ) : activeMembres.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">Aucun membre renseigné.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
              {activeMembres.map((m: any, idx: number) => (
                <FadeIn key={m.id} delay={idx * 50} className="h-full">
                  <div className="h-full bg-surface p-4 rounded-xl shadow-sm border border-border text-center hover:shadow-md hover:border-primary/20 hover:-translate-y-1 transition-all group flex flex-col">
                    {m.photo_path ? (
                      <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-primary/20 group-hover:border-primary transition-colors shrink-0">
                        <img src={getImgUrl(m.photo_path, "")} alt={m.nom} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className={`w-16 h-16 rounded-full ${bgColors[idx % bgColors.length]} text-primary-foreground flex items-center justify-center mx-auto mb-3 shadow-sm text-sm shrink-0 group-hover:scale-110 transition-transform`}>
                        <span className="font-bold">{m.initiales || m.nom.substring(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                    <div className="flex-1 flex flex-col items-center justify-start mt-1">
                      <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-tight mb-1">{m.nom}</h3>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold leading-tight">{m.fonction}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
