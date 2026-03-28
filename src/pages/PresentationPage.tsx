import Breadcrumb from "@/components/layout/Breadcrumb";
import { useQuery } from "@tanstack/react-query";

const getImgUrl = (path: string | null | undefined, fallback: string) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  return `http://localhost:3000/${path}`;
};

export default function PresentationPage() {
  const { data: membres = [], isLoading: isLoadingMembres } = useQuery({
    queryKey: ["membres"],
    queryFn: () => fetch("http://localhost:3000/api/membres").then(res => res.json())
  });

  const { data: presidentData } = useQuery({
    queryKey: ["president"],
    queryFn: () => fetch("http://localhost:3000/api/parametres").then(res => res.json())
  });

  const activeMembres = (membres || []).filter((m: any) => m.actif !== false).sort((a: any, b: any) => (a.ordre || 0) - (b.ordre || 0));

  const bgColors = ["bg-blue-600", "bg-red-600", "bg-yellow-600", "bg-green-600", "bg-purple-600"];

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
                Le Conseil National de la Concurrence (CNC) de la République du Tchad est une <strong>autorité administrative
                  indépendante</strong> chargée de veiller au respect des règles de concurrence sur le marché national.
                Il constitue un pilier essentiel de la régulation économique en garantissant un environnement
                concurrentiel sain, transparent et équitable au bénéfice des entreprises et des consommateurs.
              </p>
              <p>
                Le CNC intervient pour <strong>prévenir, détecter et sanctionner</strong> les pratiques anticoncurrentielles
                telles que les ententes illicites, les abus de position dominante et les pratiques restrictives de
                concurrence. Il contribue également à la promotion d'une culture de concurrence au Tchad et formule
                des avis et recommandations aux pouvoirs publics.
              </p>
              <p>
                Créé dans le cadre des réformes visant à moderniser l'économie tchadienne, le CNC s'est progressivement
                imposé comme un acteur clé dans la régulation économique, contribuant à améliorer la transparence des
                marchés et à renforcer la confiance des investisseurs.
              </p>
            </div>
          </div>
        </section>



        {/* Mot du Président */}
        <section>
          <h2 className="section-title">Mot du Président</h2>
          <div className="bg-surface shadow-soft rounded-2xl overflow-hidden md:flex">
            {/* Carte photo président (pleine largeur) */}
            <div className="md:w-1/3 relative min-h-[400px] overflow-hidden group">
              <img 
                src={getImgUrl(presidentData?.president_photo_path, "/president.jpg")} 
                alt={presidentData?.president_nom || "M. Vissia Baranga"} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 object-top" 
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800'; }}
              />
              {/* Overlay Texte */}
              <div className="absolute inset-x-0 bottom-0 pt-20 pb-8 px-6 bg-gradient-to-t from-primary via-primary/80 to-transparent text-white text-center">
                <p className="text-[10px] uppercase tracking-widest text-gold mb-1 font-bold shadow-sm">{presidentData?.president_titre || "Président du CNC"}</p>
                <h3 className="font-bold text-lg leading-tight mb-1 drop-shadow-md">{presidentData?.president_nom || "M. Vissia Baranga"}</h3>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <blockquote className="text-foreground italic leading-relaxed text-base border-l-4 border-accent pl-5 whitespace-pre-wrap">
                « {presidentData?.president_message || "Le Conseil National de la Concurrence œuvre chaque jour pour garantir un marché équitable, ouvert et dynamique au Tchad. Notre mission est de protéger les entreprises contre les pratiques déloyales et de défendre les intérêts des consommateurs."} »
              </blockquote>
            </div>
          </div>
        </section>


      </div>

      {/* Historique */}
      <section className="bg-muted py-20 border-y border-border">
        <div className="container-page">
          <div className="accent-line" />
          <h2 className="section-title">Historique du CNC</h2>
          <p className="section-subtitle mb-8">
            Depuis sa création, le CNC s'est imposé comme un acteur clé de la régulation économique tchadienne.
          </p>
          <div className="space-y-6 max-w-4xl">
            {[
              { annee: "2015", desc: "Adoption de la Loi N°014/PR/2015 relative à la concurrence en République du Tchad, créant le cadre juridique de la régulation de la concurrence." },
              { annee: "2016", desc: "Publication du Décret N°2016/042 portant organisation et fonctionnement du Conseil National de la Concurrence." },
              { annee: "2017", desc: "Installation officielle du premier Conseil et nomination du Président et des membres par décret présidentiel." },
              { annee: "2018", desc: "Lancement des premières enquêtes sectorielles et adoption du règlement intérieur du CNC." },
              { annee: "2020", desc: "Renforcement des capacités avec le soutien de la CEMAC et des partenaires internationaux." },
              { annee: "2024", desc: "Bilan de 47 enquêtes menées, 12 décisions rendues, 8 avis émis et 15 sessions de sensibilisation organisées sur l'ensemble du territoire." },
            ].map((h) => (
              <div key={h.annee} className="flex gap-6 items-start group">
                <div className="shrink-0 w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  {h.annee}
                </div>
                <div className="pt-2 flex-1 border-l-2 border-primary/20 pl-6 pb-6 border-dotted last:border-none">
                  <p className="text-foreground text-lg leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-page py-20">
        {/* Membres */}
        <section>
          <div className="accent-line" />
          <h2 className="section-title">Les membres du Conseil</h2>
          {isLoadingMembres ? (
            <div className="text-center py-10 text-muted-foreground">Chargement des membres...</div>
          ) : activeMembres.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">Aucun membre renseigné.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeMembres.map((m: any, idx: number) => (
                <div key={m.id} className="bg-surface p-8 rounded-2xl shadow-soft border-t-2 border-gold text-center card-hover overflow-hidden relative">
                  {m.photo_path ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 shadow-md border-4 border-background">
                      <img src={getImgUrl(m.photo_path, "")} alt={m.nom} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className={`w-20 h-20 rounded-full ${bgColors[idx % bgColors.length]} text-primary-foreground flex items-center justify-center mx-auto mb-4 shadow-md`}>
                      <span className="font-bold text-xl">{m.initiales || m.nom.substring(0,2).toUpperCase()}</span>
                    </div>
                  )}
                  <h3 className="font-semibold text-foreground">{m.nom}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{m.fonction}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
