import { useParams, Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { articles } from "@/lib/data";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const catLabels: Record<string, string> = {
  decision: "Décision",
  communique: "Communiqué",
  enquete: "Enquête",
  evenement: "Événement",
};

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Article non trouvé</h1>
        <Link to="/actualites"><Button>Retour aux actualités</Button></Link>
      </div>
    );
  }

  const recents = articles.filter((a) => a.slug !== slug).slice(0, 4);

  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-2xl md:text-3xl font-bold max-w-3xl">{article.titre}</h1>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article */}
          <div className="lg:col-span-2">
            <Link to="/actualites" className="inline-flex items-center gap-2 text-sm text-primary hover:text-secondary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour aux actualités
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" /> {new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                <Tag className="w-3 h-3" /> {catLabels[article.categorie]}
              </span>
            </div>
            <div className="prose max-w-none text-foreground leading-relaxed">
              {article.contenu.split("\n\n").map((p, i) => (
                <p key={i} className="mb-4">{p}</p>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-surface rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Articles récents</h3>
              <ul className="space-y-3">
                {recents.map((a) => (
                  <li key={a.slug}>
                    <Link to={`/actualites/${a.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2">
                      {a.titre}
                    </Link>
                    <p className="text-xs text-muted-foreground/60 mt-0.5">{new Date(a.date).toLocaleDateString("fr-FR")}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Catégories</h3>
              <ul className="space-y-2">
                {Object.entries(catLabels).map(([key, label]) => (
                  <li key={key}>
                    <Link to="/actualites" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
