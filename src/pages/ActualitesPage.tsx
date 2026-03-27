import { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { articles } from "@/lib/data";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["Tous", "decision", "communique", "enquete", "evenement"];
const catLabels: Record<string, string> = {
  Tous: "Tous",
  decision: "Décisions",
  communique: "Communiqués",
  enquete: "Enquêtes",
  evenement: "Événements",
};

const catBadge = (cat: string) => {
  const colors: Record<string, string> = {
    decision: "bg-primary/10 text-primary",
    communique: "bg-green-100 text-green-700",
    enquete: "bg-orange-100 text-orange-700",
    evenement: "bg-purple-100 text-purple-700",
  };
  return colors[cat] || "";
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
          <h1 className="text-3xl md:text-4xl font-bold">Actualités & Communiqués</h1>
          <p className="mt-2 opacity-90 text-lg">Suivez l'actualité du Conseil National de la Concurrence</p>
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
              {catLabels[c]}
            </button>
          ))}
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((a) => (
            <div key={a.slug} className="bg-surface rounded-lg border border-border overflow-hidden card-hover">
              <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <FileText className="w-12 h-12 text-primary/30" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${catBadge(a.categorie)}`}>
                    {catLabels[a.categorie]}
                  </span>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  page === i + 1 ? "bg-primary text-primary-foreground" : "bg-surface border border-border text-foreground hover:bg-muted"
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
