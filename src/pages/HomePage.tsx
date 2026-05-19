import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Shield, GitMerge, Scale, FileText, BarChart3, Users, ArrowRight, Quote, Camera, ExternalLink, PenSquare, Gavel, FileSignature, ShieldAlert, Clock, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { useQuery } from "@tanstack/react-query";

const missionsPreview = [
  { titre: "Contrôle des pratiques anticoncurrentielles", desc: "Identifier et sanctionner les ententes et abus de position dominante.", icone: <Shield className="w-5 h-5" />, color: "text-primary", bg: "bg-primary", baseColor: "border-primary/30" },
  { titre: "Régulation des concentrations", desc: "Examiner les fusions et acquisitions d'entreprises.", icone: <GitMerge className="w-5 h-5" />, color: "text-primary", bg: "bg-primary", baseColor: "border-primary/30" },
  { titre: "Lutte contre la concurrence déloyale", desc: "Combattre les pratiques commerciales abusives.", icone: <Scale className="w-5 h-5" />, color: "text-primary", bg: "bg-primary", baseColor: "border-primary/30" },
  { titre: "Avis consultatifs", desc: "Émettre des avis sur les projets de lois et règlements.", icone: <FileText className="w-5 h-5" />, color: "text-primary", bg: "bg-primary", baseColor: "border-primary/30" },
  { titre: "Études de marché", desc: "Réaliser des études sectorielles approfondies.", icone: <BarChart3 className="w-5 h-5" />, color: "text-primary", bg: "bg-primary", baseColor: "border-primary/30" },
  { titre: "Sensibilisation", desc: "Promouvoir la culture de concurrence loyale.", icone: <Users className="w-5 h-5" />, color: "text-primary", bg: "bg-primary", baseColor: "border-primary/30" },
];

const iconMap: Record<string, React.ReactNode> = {
  FileWarning: <ShieldAlert className="w-8 h-8" />,
  ShieldAlert: <ShieldAlert className="w-8 h-8" />,
  ClipboardList: <FileText className="w-8 h-8" />,
  MessageSquare: <Quote className="w-8 h-8" />,
  BookOpen: <FileText className="w-8 h-8" />,
  Calendar: <Clock className="w-8 h-8" />,
  Search: <BarChart3 className="w-8 h-8" />,
  FileText: <FileText className="w-8 h-8" />,
  PenSquare: <PenSquare className="w-8 h-8" />,
  FileSignature: <FileSignature className="w-8 h-8" />,
};

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
  return `/${path}`;
};

export default function HomePage() {
  const { t } = useTranslation();
  const { data: recentArticles = [], isLoading: isLoadingArticles, isError: isErrorArticles } = useQuery({
    queryKey: ["articles", "home"],
    queryFn: async () => {
      const res = await fetch("/api/articles?limit=3");
      if (!res.ok) throw new Error("Erreur serveur");
      return res.json();
    }
  });

  const { data: galeriePreview = [] } = useQuery({
    queryKey: ["galerie", "home"],
    queryFn: () => fetch("/api/galerie").then(res => res.json()).then(data => data.slice(0, 6))
  });

  const { data: presidentData } = useQuery({
    queryKey: ["president"],
    queryFn: () => fetch("/api/parametres").then(res => res.json())
  });

  const { data: missionsApi = [] } = useQuery({
    queryKey: ["missions"],
    queryFn: () => fetch("/api/missions").then(res => res.json())
  });

  const { data: servicesApi = [] } = useQuery({
    queryKey: ["services"],
    queryFn: () => fetch("/api/services").then(res => res.json())
  });

  const { data: liens = [] } = useQuery({
    queryKey: ["liens"],
    queryFn: () => fetch("/api/liens").then(res => res.json())
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        // Défile uniquement si les logos débordent de la largeur de l'écran
        setShouldScroll(scrollWidth > clientWidth + 10);
      }
    };

    const timer = setTimeout(checkOverflow, 150);
    window.addEventListener("resize", checkOverflow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [liens]);

  const displayedMissions = missionsApi.slice(0, 6);
  const activeServices = (servicesApi || []).filter((s: any) => s.actif !== false).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section
        className="text-primary-foreground min-h-[90vh] flex items-center py-16 md:py-24 relative overflow-hidden"
        style={{
          backgroundImage: `url('${getImgUrl(presidentData?.hero_bg_path, "/hero-bg.jpg")}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="absolute inset-0 opacity-20 z-0">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-secondary/30 blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-destructive/20 blur-3xl animate-pulse" />
        </div>
        <div className="w-full px-4 md:px-12 relative z-10">
          {/* Informations flottantes sur l'image */}
          <div className="absolute top-0 right-4 md:right-12 hidden md:flex items-center gap-6">
            {/* <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl shadow-xl">
              <div className="text-right font-sans">
                <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">{t("header.hours")}</p>
                <p className="text-xs font-bold text-white">{presidentData?.horaires_ouverture || "07h30 – 15h30"}</p>
              </div>
            </div> */}
            {/* <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl shadow-xl">
              <MapPin className="w-4 h-4 text-destructive" />
              <div className="text-right font-sans">
                <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">{t("header.seat")}</p>
                <p className="text-xs font-bold text-white">{presidentData?.siege_social || "N'Djamena, Tchad"}</p>
              </div>
            </div> */}
          </div>

          <FadeIn>
            <div className="max-w-3xl">

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                {presidentData?.hero_title || t("hero.title")}
              </h1>
              <p className="text-lg md:text-2xl opacity-90 mb-10 leading-relaxed font-light">
                {presidentData?.hero_subtitle || t("hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/plainte">
                  <Button size="lg" className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold gap-2 shadow-lg shadow-destructive/20">
                    {t("hero.cta")}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mot du Président — Nouveau Design Modernisé */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Décorations de fond */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        <div className="container-page relative z-10">
          <FadeIn>
            <div className="max-w-6xl mx-auto">
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center bg-surface rounded-[2.5rem] p-4 lg:p-8 shadow-2xl shadow-primary/10 border border-border">

                {/* Image Section avec découpe décorative */}
                <div className="lg:col-span-5 relative group">
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
                    <img
                      src={getImgUrl(presidentData?.president_photo_path, "/president.png")}
                      alt={presidentData?.president_nom || "M. Vissia Bouranga"}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.src = '/president.png'; }}
                    />
                    {/* Overlay dégradé subtil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Éléments décoratifs flottants */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-3xl -z-0 rotate-12" />
                  <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-primary/20 rounded-full -z-0 animate-pulse" />

                  {/* Badge de fonction flottant */}
                  <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl z-20">
                    <h3 className="text-xl font-bold text-white mb-0.5">{presidentData?.president_nom || "M. Vissia Bouranga"}</h3>
                    <p className="text-sm font-semibold text-secondary uppercase tracking-widest">{presidentData?.president_titre || "Président du CNC"}</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-7 p-8 lg:p-12 relative">
                  <div className="absolute top-0 right-12 opacity-5">
                    <Quote className="w-40 h-40 text-primary" />
                  </div>

                  <div className="space-y-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                      {presidentData?.home_welcome_badge || "Mot de bienvenue"}
                    </div>

                    <div className="relative">
                      <Quote className="w-12 h-12 text-secondary absolute -top-6 -left-4 opacity-50" />
                      <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed italic pl-8">
                        {presidentData?.president_message || "Le Conseil National de la Concurrence œuvre sans relâche pour garantir un marché équitable où chaque opérateur économique peut prospérer dans le respect des règles. Notre mission est de bâtir un environnement de confiance propice au développement économique de notre nation."}
                      </blockquote>
                    </div>

                    {/* <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
                      <Link to="/presentation">
                        <Button size="lg" className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-white font-bold gap-3 shadow-xl shadow-primary/20 group">
                          {t("home.readMore")} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>

                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="w-12 h-[1px] bg-border" />
                        <span className="text-sm font-medium italic">Vision 2025-2030</span>
                      </div>
                    </div> */}
                  </div>
                </div>
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
              <h2 className="section-title">{presidentData?.home_missions_title || "Nos missions"}</h2>
              <p className="section-subtitle">{presidentData?.home_missions_subtitle || "Garantir une concurrence loyale pour le développement économique du Tchad"}</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(displayedMissions.length > 0 ? displayedMissions : missionsPreview).map((m: any, i: number) => {
              const isDynamic = !!m.id;
              const title = m.titre;
              const desc = isDynamic ? m.description : m.desc;
              const icon = isDynamic ? <Shield className="w-5 h-5" /> : m.icone;
              const baseColor = isDynamic ? "border-primary/30" : m.baseColor;
              const bg = isDynamic ? "bg-primary" : m.bg;

              return (
                <FadeIn key={title + i} delay={i * 100}>
                  <div className={`relative bg-surface p-8 pt-10 rounded-[1.5rem] border-2 ${baseColor} hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center mt-6`}>

                    {/* Encoche Concave (Notch) simulée par une forme superposée */}
                    <div className={`absolute -top-[2px] -left-[2px] w-[3.5rem] h-[3.5rem] bg-muted rounded-br-[3.5rem] border-b-2 border-r-2 ${baseColor} z-0 pointer-events-none`} />

                    {/* Icône nichée avec précision dans l'encoche */}
                    <div className={`absolute -top-4 -left-3 w-[3.25rem] h-[3.25rem] rounded-full ${bg} text-white flex items-center justify-center shadow-lg z-10 hover:scale-110 transition-transform`}>
                      {icon}
                    </div>

                    <h3 className="text-lg font-extrabold text-foreground mb-3 leading-snug">{title}</h3>

                    <div className="w-12 h-[2px] bg-border my-1 mb-4 rounded-full" />

                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </FadeIn>
              );
            })}
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



      {/* Nos Services en Ligne — Nouveau Design Modernisé */}
      <section className="py-28 bg-surface relative overflow-hidden border-t border-border">
        {/* Éléments de fond décoratifs */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
        </div>

        <div className="container-page relative z-10">
          <FadeIn>
            <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                  <Shield className="w-4 h-4" />
                  Services Publics
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 leading-tight">
                  {presidentData?.home_services_title || <>Nos <span className="text-primary italic">services</span> en ligne</>}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {presidentData?.home_services_subtitle || "Vos démarches administratives simplifiées, sécurisées et accessibles en tout temps pour un service public plus proche de vous."}
                </p>
              </div>
              <div className="hidden lg:block pb-2">
                <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  <span className="w-12 h-1 bg-primary rounded-full" />
                  Accessibilité
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeServices.length > 0 ? activeServices : acceRapide).map((s: any, i: number) => {
              const isDynamic = !!s.id;
              const title = s.titre;
              const desc = isDynamic ? s.description : s.desc;
              const link = s.lien;
              const icon = isDynamic ? (iconMap[s.icone] || <Shield className="w-8 h-8" />) : s.icone;
              const isPlaceholder = !link || link === "#";
              const isExternal = link?.startsWith("http");

              const CardContent = () => (
                <div className="h-full bg-background rounded-[2rem] p-8 border border-border shadow-soft hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                  {/* Motif de fond stylisé sur la carte */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />

                  <div className="relative z-10 space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner group-hover:rotate-6">
                      {icon}
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-extrabold text-2xl text-foreground group-hover:text-primary transition-colors">{title}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center gap-3 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      Accéder au service
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Ligne d'accent en bas */}
                  <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-primary group-hover:w-full transition-all duration-700" />
                </div>
              );

              return (
                <FadeIn key={title + i} delay={i * 100}>
                  {isPlaceholder ? (
                    <div
                      onClick={() => toast.info("Ce service en ligne sera très bientôt disponible.")}
                      className="group relative block h-full cursor-pointer"
                    >
                      <CardContent />
                    </div>
                  ) : isExternal ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="group relative block h-full">
                      <CardContent />
                    </a>
                  ) : (
                    <Link to={link} className="group relative block h-full">
                      <CardContent />
                    </Link>
                  )}
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>



      {/* Actualités récentes — Nouveau Design Magazine */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container-page">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                  {presidentData?.home_news_title || <>Actualités <span className="text-secondary italic">récentes</span></>}
                </h2>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="h-1 w-20 bg-secondary rounded-full" />
                  <p className="text-muted-foreground font-medium">{presidentData?.home_news_subtitle || "L'essentiel de l'activité du Conseil"}</p>
                </div>
              </div>
              <Link to="/actualites" className="hidden md:block">
                <Button variant="ghost" className="group gap-2 hover:bg-primary/5 text-primary font-bold">
                  Voir tout le blog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {isLoadingArticles ? (
              <div className="col-span-3 py-20 text-center bg-surface rounded-3xl border border-dashed border-border">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground italic">Chargement des actualités...</p>
              </div>
            ) : isErrorArticles || (!Array.isArray(recentArticles) || recentArticles.length === 0) ? (
              <div className="col-span-3 py-20 text-center bg-surface rounded-3xl border-2 border-dashed border-border">
                <p className="text-muted-foreground">{isErrorArticles ? "Une erreur est survenue lors du chargement." : "Aucune actualité disponible pour le moment."}</p>
              </div>
            ) : (
              recentArticles.map((a: any, i: number) => (
                <FadeIn key={a.slug || a.id} delay={i * 100}>
                  <div className="group flex flex-col h-full bg-surface rounded-[2rem] overflow-hidden border border-border shadow-soft hover:shadow-2xl transition-all duration-500">
                    {/* Media Area */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={getImgUrl(a.image_path || a.image_url, `https://images.unsplash.com/photo-${i === 0 ? '1507679799987-c7cf7ee3face' : i === 1 ? '1557804506-669a67965ba0' : '1454165804606-c3d57bc86b40'}?auto=format&fit=crop&q=80&w=800`)}
                        alt={a.titre}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Category Badge Floating */}
                      <div className="absolute top-4 left-4 z-20">
                        {categorieBadge(a.categorie || 'autre')}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                        <Clock className="w-3.5 h-3.5 text-secondary" />
                        <span>{(a.date_publication || a.created_at || '').slice(0, 10)}</span>
                        <span className="mx-2">•</span>
                        <span>5 min de lecture</span>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {a.titre}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-8">
                        {a.extrait}
                      </p>

                      <Link
                        to={`/actualites/${a.slug}`}
                        className="mt-auto inline-flex items-center gap-2 text-sm font-black text-primary group/link"
                      >
                        <span className="relative">
                          Lire l'article
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover/link:w-full transition-all duration-300" />
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))
            )}
          </div>

          <FadeIn delay={400}>
            <div className="mt-16 text-center md:hidden">
              <Link to="/actualites">
                <Button variant="outline" size="lg" className="w-full rounded-full border-primary text-primary font-bold">
                  Explorer toutes les actualités
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Galerie aperçu
      <section className="py-20 bg-surface border-t border-border">
        <div className="container-page">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">Nos activités en images</h2>
              <p className="section-subtitle">Découvrez les moments forts du CNC</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(!Array.isArray(galeriePreview) || galeriePreview.length === 0) ? (
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
      </section> */}

      {/* Partenaires (Bailleurs) - Défilement Infini Fluide */}
      <section className="py-10 bg-white border-t border-b border-slate-100 overflow-hidden relative">
        <div className="container-page mb-6">
          <h2 className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Partenaires & Institutions</h2>
        </div>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-infinite {
            display: flex;
            width: max-content;
            animation: marquee 25s linear infinite;
          }
          .animate-marquee-infinite:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="relative flex items-center overflow-x-hidden w-full" ref={containerRef}>
          {/* Dégradés translucides sur les côtés uniquement si défilement actif */}
          {shouldScroll && (
            <>
              <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
            </>
          )}

          {shouldScroll ? (
            /* Mode Défilement Marquee (Débordement important) */
            <div className="animate-marquee-infinite flex items-center gap-16 py-4">
              {(liens.length > 0 ? liens : [
                { id: 1, nom: "Ministère du Commerce", url: "#" },
                { id: 2, nom: "Gouvernement du Tchad", url: "#" },
                { id: 3, nom: "CEMAC", url: "#" },
                { id: 4, nom: "Union Africaine", url: "#" }
              ]).concat(liens.length > 0 ? liens : [
                { id: 1, nom: "Ministère du Commerce", url: "#" },
                { id: 2, nom: "Gouvernement du Tchad", url: "#" },
                { id: 3, nom: "CEMAC", url: "#" },
                { id: 4, nom: "Union Africaine", url: "#" }
              ]).map((l: any, idx: number) => (
                <a
                  key={`logo-scroll-${l.id || idx}-${idx}`}
                  href={l.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2.5 min-w-[120px] max-w-[180px] transition-all duration-300 transform hover:scale-105 group/logo"
                >
                  <div className="h-12 flex items-center justify-center">
                    {l.logo_path ? (
                      <img
                        src={`/${l.logo_path}`}
                        alt={l.nom}
                        className="max-h-12 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-[10px] font-black text-slate-400 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 uppercase tracking-widest">
                        {l.nom?.slice(0, 3)}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] text-center max-w-[160px] group-hover/logo:text-primary transition-colors whitespace-normal leading-normal">
                    {l.nom}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            /* Mode Statique Centré (Pas de débordement) */
            <div className="flex flex-wrap justify-center items-center gap-12 py-4 w-full px-6">
              {(liens.length > 0 ? liens : [
                { id: 1, nom: "Ministère du Commerce", url: "#" },
                { id: 2, nom: "Gouvernement du Tchad", url: "#" },
                { id: 3, nom: "CEMAC", url: "#" },
                { id: 4, nom: "Union Africaine", url: "#" }
              ]).map((l: any, idx: number) => (
                <a
                  key={`logo-static-${l.id || idx}-${idx}`}
                  href={l.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2.5 transition-all duration-300 transform hover:scale-105 group/logo"
                >
                  <div className="h-12 flex items-center justify-center">
                    {l.logo_path ? (
                      <img
                        src={`/${l.logo_path}`}
                        alt={l.nom}
                        className="max-h-12 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-[10px] font-black text-slate-400 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 uppercase tracking-widest">
                        {l.nom?.slice(0, 3)}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] text-center max-w-[160px] group-hover/logo:text-primary transition-colors whitespace-normal leading-normal">
                    {l.nom}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
