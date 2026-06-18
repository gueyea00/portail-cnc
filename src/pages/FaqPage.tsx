import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { FadeIn } from "@/components/ui/fade-in";

const themes = ["Tous", "Généralités", "Plaintes", "Procédures", "Sanctions"];

export default function FaqPage() {
  const [filtre, setFiltre] = useState("Tous");
  const [open, setOpen] = useState<number | null>(null);

  const { data: pageConfig } = useQuery({
    queryKey: ["parametres"],
    queryFn: () => fetch("/api/parametres").then(res => res.json())
  });

  const { data: faqApi = [] } = useQuery({
    queryKey: ["faq"],
    queryFn: () => fetch("/api/faq").then(res => res.json())
  });

  const filtered = filtre === "Tous" ? faqApi : faqApi.filter((q: any) => q.theme === filtre);

  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
              <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-gold" />
              {pageConfig?.faq_hero_title || "Foire aux questions"}
            </h1>
            <p className="mt-2 opacity-90 text-lg">{pageConfig?.faq_hero_subtitle || "Trouvez les réponses à vos questions"}</p>
          </FadeIn>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12 max-w-3xl mx-auto">
        {/* Filtres */}
        <FadeIn>
          <div className="flex flex-wrap gap-2 mb-8">
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => { setFiltre(t); setOpen(null); }}
                className={`px-4 py-2 text-sm rounded-full border transition-all ${
                  filtre === t
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                    : "bg-surface text-foreground border-border hover:border-primary hover:shadow-sm"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Accordéon */}
        <div className="space-y-3">
          {filtered.map((q: any, i: number) => (
            <FadeIn key={i} delay={i * 60}>
              <div className={`bg-surface rounded-2xl shadow-sm overflow-hidden border transition-all duration-200 ${open === i ? 'border-primary/30 shadow-md' : 'border-border/50 hover:border-border'}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${open === i ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-foreground text-sm leading-snug">{q.question}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open === i ? "rotate-180 text-primary" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-5 pb-5 pl-16">
                    <p className="text-sm text-muted-foreground leading-relaxed">{q.reponse}</p>
                    <span className="inline-block mt-3 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">{q.theme}</span>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
