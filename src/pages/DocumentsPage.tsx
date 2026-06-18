import Breadcrumb from "@/components/layout/Breadcrumb";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useGoogleTranslate } from "@/hooks/useGoogleTranslate";
import { FadeIn } from "@/components/ui/fade-in";

const categoriesDocuments = [
  "Lois & Règlements",
  "Rapports annuels",
  "Études économiques",
  "Guides pratiques",
  "Formulaires",
  "Avis"
];

const getFileUrl = (path: string | null | undefined, fallback: string) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  return `/${path}`;
};

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Octect';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Octets', 'Ko', 'Mo', 'Go', 'To'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default function DocumentsPage() {
  const { currentLang } = useGoogleTranslate();
  const { data: pageConfig } = useQuery({
    queryKey: ["parametres"],
    queryFn: () => fetch("/api/parametres").then(res => res.json())
  });

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: () => fetch("/api/documents").then(res => res.json())
  });

  const filteredDocuments = documents.filter((d: any) => {
    const docLang = (d.lang || 'fr').toLowerCase();
    return docLang === currentLang;
  });

  const existingCategories = Array.from(new Set(filteredDocuments.map((d: any) => d.categorie || 'Autre')));
  const orderedCategories = categoriesDocuments.filter(c => existingCategories.includes(c as string));
  existingCategories.forEach(c => {
    if (!orderedCategories.includes(c as string)) orderedCategories.push(c as string);
  });

  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
              <FileText className="w-8 h-8 md:w-10 md:h-10 text-gold" />
              {pageConfig?.docs_hero_title || "Documents officiels"}
            </h1>
            <p className="mt-2 opacity-90 text-lg">{pageConfig?.docs_hero_subtitle || "Lois, règlements, rapports et guides pratiques"}</p>
          </FadeIn>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12 space-y-12">
        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            Chargement des documents...
          </div>
        ) : filteredDocuments.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20 text-muted-foreground">Aucun document n'est disponible pour le moment.</div>
          </FadeIn>
        ) : (
          orderedCategories.map((cat, catIdx) => {
            const docs = filteredDocuments.filter((d: any) => (d.categorie || 'Autre') === cat);
            if (docs.length === 0) return null;
            return (
              <FadeIn key={cat} delay={catIdx * 80}>
                <section>
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {cat}
                  </h2>
                  <div className="space-y-3">
                    {docs.map((d: any, i: number) => (
                      <FadeIn key={d.id} delay={i * 50}>
                        <div className="bg-surface p-5 rounded-2xl shadow-sm border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-sm font-semibold text-foreground truncate">{d.titre}</h3>
                              <p className="text-xs text-muted-foreground mt-0.5 tracking-wide">
                                <span className="font-medium">{new Date(d.date_publication || d.created_at).toLocaleDateString("fr-FR")}</span>
                                {d.taille_fichier ? ` • ${formatBytes(d.taille_fichier)}` : ''}
                                {d.type_fichier ? ` • ${d.type_fichier}` : ' • PDF'}
                              </p>
                            </div>
                          </div>
                          <a href={getFileUrl(d.fichier_path, "#")} target="_blank" rel="noreferrer" className="shrink-0">
                            <Button variant="outline" size="sm" className="gap-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                              <Download className="w-4 h-4" />
                              <span>Télécharger</span>
                            </Button>
                          </a>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </section>
              </FadeIn>
            );
          })
        )}
      </div>
    </div>
  );
}
