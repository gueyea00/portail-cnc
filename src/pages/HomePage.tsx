import { Link } from "react-router-dom";
import { Shield, GitMerge, Scale, FileText, BarChart3, Users, ArrowRight, Quote, Camera, ExternalLink, PenSquare, Gavel, FileSignature, ShieldAlert, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { useQuery } from "@tanstack/react-query";

const missionsPreview = [
  { titre: "Contrôle des pratiques anticoncurrentielles", desc: "Identifier et sanctionner les ententes et abus de position dominante.", icone: <Shield className="w-8 h-8" /> },
  { titre: "Régulation des concentrations", desc: "Examiner les fusions et acquisitions d'entreprises.", icone: <GitMerge className="w-8 h-8" /> },
  { titre: "Lutte contre la concurrence déloyale", desc: "Combattre les pratiques commerciales abusives.", icone: <Scale className="w-8 h-8" /> },
  { titre: "Avis consultatifs", desc: "Émettre des avis sur les projets de lois et règlements.", icone: <FileText className="w-8 h-8" /> },
  { titre: "Études de marché", desc: "Réaliser des études sectorielles approfondies.", icone: <BarChart3 className="w-8 h-8" /> },
  { titre: "Sensibilisation", desc: "Promouvoir la culture de concurrence loyale.", icone: <Users className="w-8 h-8" /> },
];

const acceRapide = [
  { titre: "Déposer une plainte", desc: "Formulaire en ligne sécurisé", lien: "/plainte", icone: <PenSquare className="w-8 h-8" /> },
  { titre: "Documents officiels", desc: "Lois, rapports et guides", lien: "/documents", icone: <FileSignature className="w-8 h-8" /> },
  { titre: "Signalement anonyme", desc: "Signaler une pratique suspecte", lien: "/signalement", icone: <ShieldAlert className="w-8 h-8" /> },
];

const categorieBadge = (cat: string) => {
  const colors: Record<string, string> = {
    communique: "bg-green-100 text-green-700",
    enquete: "bg-orange-100 text-orange-700",
    evenement: "bg-purple-100 text-purple-700",
  };
  const labels: Record<string, string> = {
    communique: "Communiqué",
    enquete: "Enquête",
    evenement: "Événement",
  };
  const color = colors[cat] || "bg-gray-100 text-gray-700";
  const label = labels[cat] || cat;
  return <span className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}>{label}</span>;
};

const getImgUrl = (path: string | null | undefined, fallback: string) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  return `http://localhost:3000/${path}`;
};

export default function HomePage() {
  const { data: recentArticles = [] } = useQuery({
    queryKey: ["articles", "home"],
    queryFn: () => fetch("http://localhost:3000/api/articles?limit=3").then(res => res.json())
  });

  const { data: galeriePreview = [] } = useQuery({
    queryKey: ["galerie", "home"],
    queryFn: () => fetch("http://localhost:3000/api/galerie").then(res => res.json()).then(data => data.slice(0, 6))
  });

  const { data: presidentData } = useQuery({
    queryKey: ["president"],
    queryFn: () => fetch("http://localhost:3000/api/parametres").then(res => res.json())
  });

  return (
    <div>
      {/* Hero */}
      <section 
        className="text-primary-foreground min-h-[90vh] flex items-center py-16 md:py-24 relative overflow-hidden"
        style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="absolute inset-0 opacity-20 z-0">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-secondary/30 blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-destructive/20 blur-3xl animate-pulse" />
        </div>
        <div className="w-full px-4 md:px-12 relative z-10">
          {/* Informations flottantes sur l'image */}
          <div className="absolute top-0 right-4 md:right-12 hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl shadow-xl">
              <Clock className="w-4 h-4 text-secondary" />
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">Horaires d'ouverture</p>
                <p className="text-xs font-bold text-white">07h30 – 15h30</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl shadow-xl">
              <MapPin className="w-4 h-4 text-destructive" />
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">Siège Social</p>
                <p className="text-xs font-bold text-white">N'Djamena, Tchad</p>
              </div>
            </div>
          </div>

          <FadeIn>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-background/10 rounded-full px-4 py-1.5 text-sm mb-6 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                République du Tchad
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Conseil National de la Concurrence
              </h1>
              <p className="text-lg md:text-2xl opacity-90 mb-10 leading-relaxed font-light">
                Autorité administrative indépendante chargée de veiller au respect des règles de la concurrence
                et de promouvoir un environnement économique juste et transparent au Tchad.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/plainte">
                  <Button size="lg" className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold gap-2 shadow-lg shadow-destructive/20">
                    Déposer une plainte
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Missions */}
      <section className="py-20 bg-muted relative z-20">
        <div className="container-page">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Nos missions</h2>
              <p className="section-subtitle">Garantir une concurrence loyale pour le développement économique du Tchad</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {missionsPreview.map((m, i) => (
              <FadeIn key={m.titre} delay={i * 100}>
                <div className="bg-surface p-8 rounded-xl border border-border card-hover shadow-soft border-t-4 border-t-transparent hover:border-t-secondary transition-all h-full">
                  <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-primary mb-6 shadow-sm">
                    {m.icone}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{m.titre}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={600}>
            <div className="text-center mt-12">
              <Link to="/missions">
                <Button variant="outline" size="lg" className="gap-2 border-border hover:bg-muted">
                  Découvrir toutes nos missions
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>



      {/* Accès rapide */}
      <section className="py-24 bg-primary text-primary-foreground border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
        </div>
        <div className="container-page relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">Nos services en ligne</h2>
              <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">Vos démarches administratives simplifiées et accessibles en tout temps</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {acceRapide.map((s, i) => (
              <FadeIn key={s.titre} delay={i * 100}>
                <Link to={s.lien} className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-secondary/50 transition-all duration-500 group text-center flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:text-secondary group-hover:scale-110 mb-6 transition-all duration-300 shadow-inner">
                    {s.icone}
                  </div>
                  <h3 className="font-bold text-xl text-white mb-3 group-hover:text-secondary transition-colors">{s.titre}</h3>
                  <p className="text-base text-white/70 leading-relaxed">{s.desc}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>



      {/* Mot du Président */}
      <section className="py-20 bg-muted border-t border-border">
        <div className="container-page">
          <FadeIn>
            <div className="max-w-5xl mx-auto">
              <div className="bg-surface rounded-2xl border border-border overflow-hidden md:flex shadow-xl">
                <div className="md:w-2/5 bg-primary p-0 flex flex-col relative overflow-hidden h-[400px] md:h-auto">
                  <img src={getImgUrl(presidentData?.president_photo_path, "/president.jpg")} alt={presidentData?.president_nom || "M. Vissia Baranga"} className="absolute inset-0 w-full h-full object-cover z-0 object-top" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent z-10" />
                  
                  <div className="relative z-20 mt-auto p-8 text-center w-full">
                    <h3 className="text-2xl font-bold text-white mb-1">{presidentData?.president_nom || "M. Vissia Baranga"}</h3>
                    <p className="text-md text-secondary font-medium">{presidentData?.president_titre || "Président du CNC"}</p>
                  </div>
                </div>
                <div className="md:w-3/5 p-10 md:p-12 border-l-4 border-l-secondary relative flex flex-col justify-center">
                  <Quote className="w-16 h-16 text-secondary/20 absolute top-8 left-8" />
                  <blockquote className="text-foreground text-lg md:text-xl italic leading-relaxed mb-8 relative z-10 pt-6 pl-6">
                    « {presidentData?.president_message || "Le Conseil National de la Concurrence œuvre sans relâche pour garantir un marché équitable où chaque opérateur économique peut prospérer dans le respect des règles. Notre mission est de bâtir un environnement de confiance propice au développement économique de notre nation."}  »
                  </blockquote>
                  <div className="relative z-10 pl-6">
                    <Link to="/presentation">
                      <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
                        Lire le message complet
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Actualités récentes */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="container-page">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Actualités récentes</h2>
              <p className="section-subtitle">Les dernières nouvelles du Conseil National de la Concurrence</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentArticles.length === 0 ? (
              <p className="text-center col-span-3 text-muted-foreground">Aucune actualité récente pour le moment.</p>
            ) : (
              recentArticles.map((a: any, i: number) => (
                <FadeIn key={a.slug || a.id} delay={i * 100}>
                  <div className="bg-background rounded-xl border border-border overflow-hidden card-hover shadow-soft h-full flex flex-col">
                    {/* Image cover for news */}
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden group">
                      <img src={getImgUrl(a.image_url, `https://images.unsplash.com/photo-${i===0?'1507679799987-c7cf7ee3face':i===1?'1557804506-669a67965ba0':'1454165804606-c3d57bc86b40'}?auto=format&fit=crop&q=80&w=800`)} alt={a.titre} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-4">
                        {categorieBadge(a.categorie || 'autre')}
                        <span className="text-sm font-medium text-muted-foreground">{(a.date_publication || a.created_at || '').slice(0, 10)}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">{a.titre}</h3>
                      <p className="text-base text-muted-foreground line-clamp-3 mb-6 flex-grow">{a.extrait}</p>
                      <Link to={`/actualites/${a.slug}`} className="text-sm font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-2 mt-auto group">
                        Lire la suite <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))
            )}
          </div>
          <FadeIn delay={300}>
            <div className="text-center mt-12">
              <Link to="/actualites">
                <Button variant="outline" size="lg" className="gap-2 border-border hover:bg-muted">
                  Toutes les actualités
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Galerie aperçu */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="container-page">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Nos activités en images</h2>
              <p className="section-subtitle">Découvrez les moments forts du CNC</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galeriePreview.length === 0 ? (
              <p className="text-center col-span-3 text-muted-foreground">Aucune photo dans la galerie pour le moment.</p>
            ) : (
              galeriePreview.map((item: any, i: number) => (
                <FadeIn key={item.id} delay={i * 50}>
                  <div className={`relative h-56 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group overflow-hidden card-hover shadow-soft`}>
                    <img src={getImgUrl(item.image_path, `https://images.unsplash.com/photo-${1550000000000 + i * 1000000}?auto=format&fit=crop&q=80&w=600`)} alt={item.titre} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    <Camera className="w-12 h-12 text-white/50 group-hover:text-white/0 transition-colors duration-300 relative z-10" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-500 z-0" />
                    <div className="absolute inset-0 flex items-end p-6 z-20">
                      <p className="text-white text-base font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 shadow-sm">{item.titre}</p>
                    </div>
                  </div>
                </FadeIn>
              ))
            )}
          </div>
          <FadeIn delay={300}>
            <div className="text-center mt-12">
              <Link to="/galerie">
                <Button variant="outline" size="lg" className="gap-2 border-border hover:bg-muted">
                  Voir toute la galerie
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-12 bg-muted border-t border-border">
        <div className="container-page">
          <h2 className="text-center text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8">Liens institutionnels</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {["Ministère du Commerce", "Gouvernement du Tchad", "CEMAC", "Union Africaine"].map((p) => (
              <a key={p} href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="w-4 h-4" />
                {p}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
