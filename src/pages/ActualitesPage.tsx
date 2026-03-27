import { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { articles } from "@/lib/data";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["Tous", "communique", "enquete", "evenement"];
const categoryLabels: Record<string, string> = {
  Tous: "Toutes les actualités",
  communique: "Communiqués",
  enquete: "Enquêtes",
  evenement: "Événements",
};

const catBadge = (cat: string) => {
  const categoryColors: Record<string, string> = {
    communique: "bg-green-100 text-green-700",
    enquete: "bg-orange-100 text-orange-700",
    evenement: "bg-purple-100 text-purple-700",
  };
  return categoryColors[cat] || "";
};

export default function ActualitesPage() {
  const [filtre, setFiltre] = useState("Tous");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = filtre === "Tous" ? articles : articles.filter((a) => a.categorie === filtre);
  const totalPages = Math.ceil(filtered.length / perPage);
  const displayed = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
            <Newspaper className="w-8 h-8 md:w-10 md:h-10 text-gold" />
            ActualitÃ©s & CommuniquÃ©s
          </h1>
          <p className="mt-2 opacity-90 text-lg">Suivez l'actualitÃ© du Conseil National de la Concurrence</p>
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
              {categoryLabels[c]}
            </button>
          ))}
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((a) => (
            <div key={a.slug} className="bg-surface rounded-2xl shadow-soft overflow-hidden group flex flex-col border border-border/50 hover:shadow-md transition-all">
              <Link to={`/actualites/${a.slug}`} className="block h-48 overflow-hidden relative">
                <img 
                  src={a.image || "/hero-bg.jpg"} 
                  alt={a.titre} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md bg-white/90 ${
                    a.categorie === 'communique' ? 'text-green-700' :
                    a.categorie === 'enquete' ? 'text-orange-700' : 'text-purple-700'
                  }`}>
                    {categoryLabels[a.categorie]}
                  </span>
                </div>
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(a.date).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
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
      </div>
    </div>
  );
}

