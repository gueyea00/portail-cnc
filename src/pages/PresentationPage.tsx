import Breadcrumb from "@/components/layout/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { Info } from "lucide-react";

const getImgUrl = (path: string | null | undefined, fallback: string) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  return `/${path}`;
};

export default function PresentationPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
            <Info className="w-8 h-8 md:w-10 md:h-10 text-gold" />
            Présentation du CNC
          </h1>
          <p className="mt-2 opacity-90 text-lg">Découvrez le Conseil National de la Concurrence du Tchad</p>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12 space-y-16">

        {/* Présentation officielle */}
        <section className="flex flex-col md:flex-row gap-10 items-start">
          <div className="shrink-0 flex flex-col items-center gap-2 md:pt-2">
            <img
              src="/armoiries-tchad.png"
              alt="Armoiries de la République du Tchad"
              className="w-12 h-14 object-contain"
            />
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground text-center max-w-20 leading-tight">Armoiries du Tchad</p>
          </div>
          <div>
            <h2 className="section-title">Le Conseil National de la Concurrence</h2>
            <div className="prose max-w-none text-foreground leading-relaxed space-y-4">
              <p>
                {presidentData?.presentation_p1 || "Le Conseil National de la Concurrence (CNC) de la République du Tchad est une autorité administrative indépendante chargée de veiller au respect des règles de concurrence sur le marché national."}
              </p>
              <p>
                {presidentData?.presentation_p2 || "Le CNC intervient pour prévenir, détecter et sanctionner les pratiques anticoncurrentielles telles que les ententes illicites, les abus de position dominante et les pratiques restrictives de concurrence."}
              </p>
              <p>
                {presidentData?.presentation_p3 || "Créé dans le cadre des réformes visant à moderniser l'économie tchadienne, le CNC s'est progressivement imposé comme un acteur clé dans la régulation économique."}
              </p>
            </div>
          </div>
        </section>



      </div>

      <section className="bg-muted py-20 border-y border-border">
        <div className="container-page">
          <h2 className="section-title">Dates clés</h2>
          <p className="section-subtitle mb-12">
            Les jalons essentiels de la régulation de la concurrence au Tchad.
          </p>

          <div className="relative">
            {/* Ligne de timeline horizontale (visible sur desktop) */}
            <div className="absolute top-[40px] left-0 right-0 h-1 bg-primary/10 hidden lg:block z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
              {sortedHistory.length === 0 ? (
                <div className="col-span-6 text-center text-muted-foreground italic">Aucune date clé disponible.</div>
              ) : sortedHistory.map((h: any, idx: number) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform mb-6 ring-4 ring-background z-20">
                    {h.annee}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground leading-tight px-2">{h.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container-page py-20">
        {/* Membres */}
        <section>
          <h2 className="section-title">Les membres du Conseil</h2>
          {isLoadingMembres ? (
            <div className="text-center py-10 text-muted-foreground">Chargement des membres...</div>
          ) : activeMembres.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">Aucun membre renseigné.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {activeMembres.map((m: any, idx: number) => (
                <div key={m.id} className="bg-surface p-4 rounded-xl shadow-sm border border-border text-center hover:shadow-md transition-all group flex flex-col h-full">
                  {m.photo_path ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-primary/20 group-hover:border-primary transition-colors shrink-0">
                      <img src={getImgUrl(m.photo_path, "")} alt={m.nom} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 rounded-full ${bgColors[idx % bgColors.length]} text-primary-foreground flex items-center justify-center mx-auto mb-3 shadow-sm text-sm shrink-0`}>
                      <span className="font-bold">{m.initiales || m.nom.substring(0, 2).toUpperCase()}</span>
                    </div>
                  )}
                  <div className="flex-1 flex flex-col items-center justify-start mt-1">
                    <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-tight mb-1">{m.nom}</h3>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold leading-tight">{m.fonction}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
