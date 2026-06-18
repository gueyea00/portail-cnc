import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const themes = ["Tous", "Généralités", "Plaintes", "Procédures", "Sanctions"];

export default function FaqPage() {
  const [filtre, setFiltre] = useState("Tous");
  const [open, setOpen] = useState<number | null>(null);

  const { data: pageConfig } = useQuery({
    queryKey: ["parametres"],
    queryFn: () => fetch("http://188.165.77.237:5003/api/parametres").then(res => res.json())
  });

  const { data: faqApi = [] } = useQuery({
    queryKey: ["faq"],
    queryFn: () => fetch("http://188.165.77.237:5003/api/faq").then(res => res.json())
  });

  const filtered = filtre === "Tous" ? faqApi : faqApi.filter((q: any) => q.theme === filtre);

  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
            <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-gold" />
            {pageConfig?.faq_hero_title || "Foire aux questions"}
          </h1>
          <p className="mt-2 opacity-90 text-lg">{pageConfig?.faq_hero_subtitle || "Trouvez les réponses à vos questions"}</p>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12 max-w-3xl mx-auto">
        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-8">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => { setFiltre(t); setOpen(null); }}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                filtre === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-surface text-foreground border-border hover:border-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Accordéon */}
        <div className="space-y-3">
          {filtered.map((q, i) => (
            <div key={i} className="bg-surface rounded-2xl shadow-sm overflow-hidden mb-4">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-medium text-foreground text-sm">{q.question}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-4 pb-4 pl-12">
                  <p className="text-sm text-muted-foreground leading-relaxed">{q.reponse}</p>
                  <span className="inline-block mt-2 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">{q.theme}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

