import { useParams, Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ArrowLeft, Calendar, Tag, Share2, Facebook, Linkedin, Twitter, Mail, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { FadeIn } from "@/components/ui/fade-in";

const catLabels: Record<string, string> = {
  communique: "Communiqué",
  enquete: "Enquête",
  evenement: "Événement",
  autre: "Autre"
};

const getImgUrl = (path: string | null | undefined, fallback: string) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  return `/${path}`;
};

export default function ArticleDetailPage() {
  const { slug } = useParams();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const res = await fetch(`/api/articles/${slug}`);
      if (!res.ok) throw new Error("Article non trouvé");
      return res.json();
    }
  });

  const { data: recentArticles = [] } = useQuery({
    queryKey: ["articles", "recent"],
    queryFn: () => fetch("/api/articles?limit=5").then(res => res.json())
  });

  if (isLoading) {
    return (
      <div className="container-page py-32 text-center">
        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground font-medium">Récupération des données...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="text-3xl font-black text-foreground mb-4 font-sans">ARTICLE NON TROUVÉ</h1>
        <p className="text-muted-foreground mb-8">L'article que vous recherchez semble ne plus exister.</p>
        <Link to="/actualites"><Button size="lg" className="rounded-full">Retour au portail</Button></Link>
      </div>
    );
  }

  const recents = recentArticles.filter((a: any) => a.slug !== slug).slice(0, 4);

  return (
    <div className="bg-background">
      {/* 1. En-tête Ebenyx Style — Bannière géante 600px */}
      <section className="relative h-[600px] w-full overflow-hidden flex items-center">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img
            src={getImgUrl(article.image_path || article.image_url, "/hero-bg.jpg")}
            alt={article.titre}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Superposition Dégradé Bleu Tchad (#002664) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002664] via-[#002664]/80 to-transparent z-10" />

        {/* Motif de points (Dot Pattern) */}
        <div className="absolute inset-0 z-20 opacity-20" style={{ backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

        <div className="container-page relative z-30 text-white">
          <FadeIn>
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-secondary text-primary font-black text-[10px] uppercase tracking-[0.2em]">
                  {catLabels[article.categorie || 'autre']}
                </span>
                <span className="w-12 h-[1px] bg-white/30" />
                <span className="text-sm font-medium opacity-80 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  {new Date(article.date_publication || article.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>

              {/* Titre extra-gras 64px */}
              <h1 className="text-4xl md:text-[64px] font-black leading-[1.1] mb-6 drop-shadow-2xl">
                {article.titre}
              </h1>

              {/* Sous-titre en italique */}
              <p className="text-xl md:text-2xl font-light italic text-white/90 leading-relaxed max-w-2xl border-l-2 border-secondary pl-6">
                Explorez les détails de cette actualité majeure concernant le Conseil National de la Concurrence.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Mise en page "News" avec Fil d'Ariane spécialisé */}
      <div className="relative -mt-10 z-40 container-page mb-16 px-4 md:px-0">
        <div className="bg-white p-6 rounded-2xl shadow-2xl border border-primary/5 flex items-center justify-between">
          <div className="font-black text-xs uppercase tracking-widest text-primary flex items-center gap-3">
            <Link to="/" className="hover:text-secondary">ACCUEIL</Link>
            <span className="text-muted-foreground/30">/</span>
            <Link to="/actualites" className="hover:text-secondary">ACTUALITÉS</Link>
            <span className="text-muted-foreground/30">/</span>
            <span className="text-muted-foreground font-medium truncate max-w-[200px]">{article.titre}</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-primary">
            <Share2 className="w-5 h-5" />
            <span className="text-[10px] font-bold">PARTAGER</span>
          </div>
        </div>
      </div>

      <div className="container-page pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Article Content (2/3) */}
          <div className="lg:col-span-8">
            <FadeIn>
              <article>
                {/* 3. Typographie & Lecture — 22px + Lettrine */}
                <div className="prose-ebenx max-w-none">
                  {/* Premier paragraphe avec lettrine (simulé via styles CSS inline pour le premier bloc) */}
                  <div className="text-[22px] leading-[1.8] text-foreground font-medium mb-12 text-justify">
                    <style dangerouslySetInnerHTML={{
                      __html: `
                      .ebenx-content p:first-of-type::first-letter {
                        float: left;
                        font-size: 84px;
                        line-height: 1;
                        font-weight: 900;
                        padding-right: 12px;
                        color: #002664;
                        font-family: serif;
                      }
                    `}} />
                    <div className="ebenx-content whitespace-pre-wrap">
                      {article.contenu || article.extrait}
                    </div>
                  </div>
                </div>

                {/* Tags & Related Info */}
                <div className="mt-16 pt-10 border-t border-border flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-6 py-3 bg-muted rounded-xl text-sm font-bold text-primary">
                    <Tag className="w-4 h-4" />
                    MARCHÉ
                  </div>
                  <div className="flex items-center gap-2 px-6 py-3 bg-muted rounded-xl text-sm font-bold text-primary">
                    <Tag className="w-4 h-4" />
                    RÉGULATION
                  </div>
                  <div className="flex items-center gap-2 px-6 py-3 bg-muted rounded-xl text-sm font-bold text-primary">
                    <Tag className="w-4 h-4" />
                    TCHAD
                  </div>
                </div>
              </article>
            </FadeIn>
          </div>

          {/* 4. Barre Latérale (1/3) */}
          <aside className="lg:col-span-4 space-y-12">

            {/* Social Share Blocks */}
            <div className="bg-surface p-10 rounded-[2.5rem] shadow-soft border border-border">
              <h3 className="text-xl font-black text-primary uppercase tracking-tighter mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-secondary rounded-full" />
                Partager
              </h3>
              <div className="flex gap-4">
                {[
                  { icon: <Facebook className="w-6 h-6" />, label: 'Facebook' },
                  { icon: <Twitter className="w-6 h-6" />, label: 'X' },
                  { icon: <Linkedin className="w-6 h-6" />, label: 'LinkedIn' },
                  { icon: <Mail className="w-6 h-6" />, label: 'Email' }
                ].map((s, idx) => (
                  <button key={idx} className="w-14 h-14 rounded-2xl bg-[#002664]/5 text-[#002664] flex items-center justify-center hover:bg-[#002664] hover:text-white transition-all duration-300 shadow-sm" aria-label={s.label}>
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Posts List */}
            <div className="p-2">
              <h3 className="text-xl font-black text-primary uppercase tracking-tighter mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-secondary rounded-full" />
                À lire aussi
              </h3>
              <div className="space-y-10">
                {recents.map((a: any) => (
                  <Link key={a.slug || a.id} to={`/actualites/${a.slug}`} className="group block">
                    <div className="flex gap-5 items-start">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-soft border border-border">
                        <img
                          src={getImgUrl(a.image_path || a.image_url, "/hero-bg.jpg")}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-secondary tracking-widest uppercase">
                          {catLabels[a.categorie || 'autre']}
                        </span>
                        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {a.titre}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold">
                          <Calendar className="w-3 h-3" />
                          {new Date(a.date_publication || a.created_at).toLocaleDateString("fr-FR")}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
