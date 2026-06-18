import { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const categories = ["Tous", "communique", "enquete", "evenement"];
const categoryLabels: Record<string, string> = {
  Tous: "Toutes les actualités",
  communique: "Communiqués",
  enquete: "Enquêtes",
  evenement: "Événements",
  autre: "Autre"
};

const getImgUrl = (path: string | null | undefined, fallback: string) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  return `/${path}`;
};

export default function ActualitesPage() {
  const [filtre, setFiltre] = useState("Tous");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const { data: pageConfig } = useQuery({
    queryKey: ["parametres"],
    queryFn: () => fetch("/api/parametres").then(res => res.json())
  });

  const { data: articles = [], isLoading, isError } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await fetch("/api/articles");
      if (!res.ok) throw new Error("Erreur serveur");
      return res.json();
    }
  });

  const filtered = filtre === "Tous" ? articles : articles.filter((a: any) => (a.categorie || 'autre') === filtre);
  const totalPages = Math.ceil(filtered.length / perPage);
  const displayed = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
            <Newspaper className="w-8 h-8 md:w-10 md:h-10 text-gold" />
            {pageConfig?.news_hero_title || "Actualités & Communiqués"}
          </h1>
          <p className="mt-2 opacity-90 text-lg">{pageConfig?.news_hero_subtitle || "Suivez l'actualité du Conseil National de la Concurrence"}</p>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12">
        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setFiltre(c); setPage(1); }}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                filtre === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-surface text-foreground border-border hover:border-primary"
              }`}
            >
              {categoryLabels[c] || c}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            Chargement des actualités...
          </div>
        ) : isError ? (
           <div className="text-center py-20 text-red-500 font-medium">
             Une erreur est survenue lors de la récupération des actualités. Veuillez réessayer plus tard.
           </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">Aucune actualité trouvée.</div>
        ) : (
          <>
            {/* Grille */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed.map((a: any, i: number) => (
                <div key={a.slug || a.id} className="bg-surface rounded-2xl shadow-soft overflow-hidden group flex flex-col border border-border/50 hover:shadow-md transition-all">
                  <Link to={`/actualites/${a.slug}`} className="block h-48 overflow-hidden relative bg-muted">
                    <img 
                      src={getImgUrl(a.image_path || a.image_url, `https://images.unsplash.com/photo-${i%3===0?'1507679799987-c7cf7ee3face':i%3===1?'1557804506-669a67965ba0':'1454165804606-c3d57bc86b40'}?auto=format&fit=crop&q=80&w=800`)}
                      alt={a.titre} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md bg-white/90 ${
                        a.categorie === 'communique' ? 'text-green-700' :
                        a.categorie === 'enquete' ? 'text-orange-700' : 'text-purple-700'
                      }`}>
                        {categoryLabels[a.categorie || 'autre']}
                      </span>
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(a.date_publication || a.created_at).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <h3 className="font-bold text-foreground mb-3 line-clamp-2 text-base leading-snug group-hover:text-primary transition-colors">
                      <Link to={`/actualites/${a.slug}`}>{a.titre}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-5 flex-grow">{a.extrait}</p>
                    <Link to={`/actualites/${a.slug}`} className="text-sm font-semibold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1.5 mt-auto">
                      Lire l'article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      page === i + 1 ? "bg-primary text-primary-foreground" : "bg-surface shadow-sm text-foreground hover:bg-muted"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
