import { Link } from "react-router-dom";
import { Shield, GitMerge, Scale, FileText, BarChart3, Users, ArrowRight, Quote, Camera, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stats, articles, membres, galerieItems } from "@/lib/data";

const missionIcons: Record<string, React.ReactNode> = {
  "Contrôle des pratiques anticoncurrentielles": <Shield className="w-8 h-8" />,
  "Régulation des concentrations économiques": <GitMerge className="w-8 h-8" />,
  "Lutte contre les pratiques commerciales déloyales": <Scale className="w-8 h-8" />,
  "Avis sur les textes législatifs et réglementaires": <FileText className="w-8 h-8" />,
  "Études sectorielles et veille concurrentielle": <BarChart3 className="w-8 h-8" />,
  "Sensibilisation et promotion de la culture de concurrence": <Users className="w-8 h-8" />,
};

const missionsPreview = [
  { titre: "Contrôle des pratiques anticoncurrentielles", desc: "Identifier et sanctionner les ententes et abus de position dominante.", icone: <Shield className="w-8 h-8" /> },
  { titre: "Régulation des concentrations", desc: "Examiner les fusions et acquisitions d'entreprises.", icone: <GitMerge className="w-8 h-8" /> },
  { titre: "Lutte contre la concurrence déloyale", desc: "Combattre les pratiques commerciales abusives.", icone: <Scale className="w-8 h-8" /> },
  { titre: "Avis consultatifs", desc: "Émettre des avis sur les projets de lois et règlements.", icone: <FileText className="w-8 h-8" /> },
  { titre: "Études de marché", desc: "Réaliser des études sectorielles approfondies.", icone: <BarChart3 className="w-8 h-8" /> },
  { titre: "Sensibilisation", desc: "Promouvoir la culture de concurrence loyale.", icone: <Users className="w-8 h-8" /> },
];

const acceRapide = [
  { titre: "Déposer une plainte", desc: "Formulaire en ligne sécurisé", lien: "/plainte", icone: "📝" },
  { titre: "Consulter les décisions", desc: "Jurisprudence du CNC", lien: "/decisions", icone: "⚖️" },
  { titre: "Documents officiels", desc: "Lois, rapports et guides", lien: "/documents", icone: "📄" },
  { titre: "Signalement anonyme", desc: "Signaler une pratique suspecte", lien: "/signalement", icone: "🔒" },
];

const categorieBadge = (cat: string) => {
  const colors: Record<string, string> = {
    decision: "bg-primary/10 text-primary",
    communique: "bg-green-100 text-green-700",
    enquete: "bg-orange-100 text-orange-700",
    evenement: "bg-purple-100 text-purple-700",
  };
  const labels: Record<string, string> = {
    decision: "Décision",
    communique: "Communiqué",
    enquete: "Enquête",
    evenement: "Événement",
  };
  return <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors[cat]}`}>{labels[cat]}</span>;
};

export default function HomePage() {
  const recentArticles = articles.slice(0, 3);
  const galeriePreview = galerieItems.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary-foreground/20 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-accent/30 blur-3xl" />
        </div>
        <div className="container-page relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-accent" />
              République du Tchad
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Conseil National de la Concurrence
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              Autorité administrative indépendante chargée de veiller au respect des règles de la concurrence
              et de promouvoir un environnement économique juste et transparent au Tchad.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/plainte">
                <Button size="lg" className="bg-accent text-foreground hover:bg-accent/90 font-semibold gap-2">
                  Déposer une plainte
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/decisions">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                  Nos décisions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface py-0 relative -mt-6 z-10">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface rounded-xl shadow-lg p-6 border border-border">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">{s.valeur}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Missions */}
      <section className="py-16 bg-background">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="section-title">Nos missions</h2>
            <p className="section-subtitle">Garantir une concurrence loyale pour le développement économique du Tchad</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missionsPreview.map((m) => (
              <div key={m.titre} className="bg-surface p-6 rounded-lg border border-border card-hover">
                <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center text-primary mb-4">
                  {m.icone}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{m.titre}</h3>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/missions">
              <Button variant="outline" className="gap-2">
                Découvrir toutes nos missions
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Actualités récentes */}
      <section className="py-16 bg-surface">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="section-title">Actualités récentes</h2>
            <p className="section-subtitle">Les dernières nouvelles du Conseil National de la Concurrence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentArticles.map((a) => (
              <div key={a.slug} className="bg-background rounded-lg border border-border overflow-hidden card-hover">
                <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-primary/30" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    {categorieBadge(a.categorie)}
                    <span className="text-xs text-muted-foreground">{new Date(a.date).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-sm">{a.titre}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{a.extrait}</p>
                  <Link to={`/actualites/${a.slug}`} className="text-sm font-medium text-primary hover:text-secondary transition-colors inline-flex items-center gap-1">
                    Lire la suite <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/actualites">
              <Button variant="outline" className="gap-2">
                Toutes les actualités
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Accès rapide */}
      <section className="py-16 bg-background">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="section-title">Accès rapide aux services</h2>
            <p className="section-subtitle">Vos démarches en quelques clics</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {acceRapide.map((s) => (
              <Link key={s.titre} to={s.lien} className="bg-surface p-6 rounded-lg border border-border card-hover text-center group">
                <span className="text-3xl mb-3 block">{s.icone}</span>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{s.titre}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mot du Président */}
      <section className="py-16 bg-muted">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="bg-surface rounded-xl border border-border overflow-hidden md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-primary to-secondary p-8 flex flex-col items-center justify-center text-primary-foreground">
                <div className="w-24 h-24 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">IM</span>
                </div>
                <h3 className="font-semibold text-center">M. Ibrahim Mahamat Saleh</h3>
                <p className="text-sm opacity-80 text-center mt-1">Président du CNC</p>
              </div>
              <div className="md:w-2/3 p-8">
                <Quote className="w-8 h-8 text-accent mb-4" />
                <blockquote className="text-foreground italic leading-relaxed mb-6">
                  « Le Conseil National de la Concurrence œuvre sans relâche pour garantir un marché équitable
                  où chaque opérateur économique peut prospérer dans le respect des règles. Notre mission est
                  de bâtir un environnement de confiance propice au développement économique de notre nation. »
                </blockquote>
                <Link to="/presentation">
                  <Button variant="outline" size="sm" className="gap-2">
                    Lire le message complet
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membres du Conseil */}
      <section className="py-16 bg-surface">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="section-title">Les membres du Conseil</h2>
            <p className="section-subtitle">L'équipe dirigeante du CNC</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {membres.map((m) => (
              <div key={m.nom} className="bg-background p-6 rounded-lg border border-border text-center card-hover">
                <div className={`w-16 h-16 rounded-full ${m.couleur} text-primary-foreground flex items-center justify-center mx-auto mb-4`}>
                  <span className="font-bold text-lg">{m.initiales}</span>
                </div>
                <h3 className="font-semibold text-foreground">{m.nom}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.fonction}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/presentation">
              <Button variant="outline" className="gap-2">
                Voir tous les membres
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Galerie aperçu */}
      <section className="py-16 bg-background">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="section-title">Nos activités en images</h2>
            <p className="section-subtitle">Découvrez les moments forts du CNC</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galeriePreview.map((item) => (
              <div key={item.id} className={`relative h-48 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center group overflow-hidden card-hover`}>
                <Camera className="w-10 h-10 text-white/40" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end p-4">
                  <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">{item.titre}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/galerie">
              <Button variant="outline" className="gap-2">
                Voir toute la galerie
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-12 bg-muted border-t border-border">
        <div className="container-page">
          <h2 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">Liens institutionnels</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {["Ministère du Commerce", "Gouvernement du Tchad", "CEMAC", "Union Africaine"].map((p) => (
              <a key={p} href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                {p}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
