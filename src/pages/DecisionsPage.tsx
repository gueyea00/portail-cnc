import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { decisions } from "@/lib/data";
import { Download, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DecisionsPage() {
  const [search, setSearch] = useState("");
  const [annee, setAnnee] = useState("Toutes");
  const [type, setType] = useState("Tous");

  const annees = ["Toutes", "2025", "2024"];
  const types = ["Tous", "decision", "avis", "sanction"];
  const typeLabels: Record<string, string> = { Tous: "Tous", decision: "Décision", avis: "Avis", sanction: "Sanction" };

  const filtered = decisions.filter((d) => {
    const matchSearch = d.objet.toLowerCase().includes(search.toLowerCase()) || d.reference.toLowerCase().includes(search.toLowerCase());
    const matchAnnee = annee === "Toutes" || d.date.startsWith(annee);
    const matchType = type === "Tous" || d.type === type;
    return matchSearch && matchAnnee && matchType;
  });

  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold">Décisions & Jurisprudence</h1>
          <p className="mt-2 opacity-90 text-lg">Consultez les décisions rendues par le CNC</p>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12">
        {/* Filtres */}
        <div className="bg-surface p-4 rounded-lg border border-border mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher une décision..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={annee}
            onChange={(e) => setAnnee(e.target.value)}
            className="px-3 py-2 rounded-md border border-border bg-background text-sm"
          >
            {annees.map((a) => <option key={a} value={a}>{a === "Toutes" ? "Toutes les années" : a}</option>)}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 py-2 rounded-md border border-border bg-background text-sm"
          >
            {types.map((t) => <option key={t} value={t}>{typeLabels[t]}</option>)}
          </select>
        </div>

        {/* Tableau */}
        <div className="bg-surface rounded-lg border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Référence</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Objet</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Secteur</th>
                <th className="text-center px-4 py-3 font-semibold text-foreground">Type</th>
                <th className="text-center px-4 py-3 font-semibold text-foreground">PDF</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.reference} className="border-t border-border hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-primary">{d.reference}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(d.date).toLocaleDateString("fr-FR")}</td>
                  <td className="px-4 py-3 text-foreground">{d.objet}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.secteur}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      d.type === "decision" ? "bg-primary/10 text-primary" :
                      d.type === "avis" ? "bg-green-100 text-green-700" :
                      "bg-orange-100 text-orange-700"
                    }`}>
                      {typeLabels[d.type]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toast.info("Le téléchargement sera disponible prochainement.")}
                      aria-label="Télécharger"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">Aucune décision trouvée.</div>
          )}
        </div>
      </div>
    </div>
  );
}
