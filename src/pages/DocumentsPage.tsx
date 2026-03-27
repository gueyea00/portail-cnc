import Breadcrumb from "@/components/layout/Breadcrumb";
import { documents, categoriesDocuments } from "@/lib/data";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DocumentsPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold">Documents officiels</h1>
          <p className="mt-2 opacity-90 text-lg">Lois, règlements, rapports et guides pratiques</p>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12 space-y-12">
        {categoriesDocuments.map((cat) => {
          const docs = documents.filter((d) => d.categorie === cat);
          if (docs.length === 0) return null;
          return (
            <section key={cat}>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {cat}
              </h2>
              <div className="space-y-2">
                {docs.map((d) => (
                  <div key={d.titre} className="bg-surface p-4 rounded-lg border border-border flex items-center justify-between gap-4 hover:shadow-sm transition-shadow">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground truncate">{d.titre}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(d.date).toLocaleDateString("fr-FR")} • {d.taille} • {d.type}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 gap-1"
                      onClick={() => toast.info("Le téléchargement sera disponible prochainement.")}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Télécharger</span>
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
