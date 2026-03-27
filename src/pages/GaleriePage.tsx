import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { galerieItems, categoriesGalerie } from "@/lib/data";
import { Camera, X, ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function GaleriePage() {
  const [filtre, setFiltre] = useState("Tous");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filtre === "Tous" ? galerieItems : galerieItems.filter((g) => g.categorie === filtre);

  const openLightbox = (id: number) => setLightbox(id);
  const closeLightbox = () => setLightbox(null);

  const currentItem = galerieItems.find((g) => g.id === lightbox);
  const currentIndex = filtered.findIndex((g) => g.id === lightbox);

  const goNext = () => {
    if (currentIndex < filtered.length - 1) setLightbox(filtered[currentIndex + 1].id);
  };
  const goPrev = () => {
    if (currentIndex > 0) setLightbox(filtered[currentIndex - 1].id);
  };

  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold">Galerie</h1>
          <p className="mt-2 opacity-90 text-lg">Les moments forts du CNC en images</p>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12">
        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categoriesGalerie.map((c) => (
            <button
              key={c}
              onClick={() => setFiltre(c)}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                filtre === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-surface text-foreground border-border hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item.id)}
              className={`relative h-56 rounded-lg bg-gradient-to-br ${item.gradient} cursor-pointer group overflow-hidden`}
            >
              <Camera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white/30" />
              {/* Badge */}
              <span className="absolute top-3 left-3 text-xs bg-black/30 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                {item.categorie}
              </span>
              {/* Overlay hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <Search className="w-6 h-6 text-white mb-2" />
                <p className="text-white text-sm font-medium text-center px-4">{item.titre}</p>
                <p className="text-white/70 text-xs mt-1">{new Date(item.date).toLocaleDateString("fr-FR")}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Documents visuels */}
        <section className="mt-16">
          <h2 className="section-title">Documents visuels</h2>
          <p className="section-subtitle">Téléchargez les visuels institutionnels du CNC</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { titre: "Logo CNC", formats: "PNG, SVG" },
              { titre: "Armoiries officielles", formats: "PNG, SVG" },
              { titre: "Charte graphique CNC", formats: "PDF" },
            ].map((doc) => (
              <div key={doc.titre} className="bg-surface p-6 rounded-lg border border-border text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-muted flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary/50" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{doc.titre}</h3>
                <p className="text-xs text-muted-foreground mb-3">Formats : {doc.formats}</p>
                <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.info("Téléchargement bientôt disponible.")}>
                  <Download className="w-3.5 h-3.5" /> Télécharger
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox */}
      {lightbox !== null && currentItem && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button onClick={closeLightbox} className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors" aria-label="Fermer">
              <X className="w-8 h-8" />
            </button>

            {/* Image */}
            <div className={`w-full h-[60vh] rounded-lg bg-gradient-to-br ${currentItem.gradient} flex items-center justify-center`}>
              <Camera className="w-20 h-20 text-white/30" />
            </div>

            {/* Info */}
            <div className="mt-4 text-center">
              <h3 className="text-white font-semibold text-lg">{currentItem.titre}</h3>
              <p className="text-white/70 text-sm mt-1">{currentItem.description}</p>
              <p className="text-white/50 text-xs mt-1">{new Date(currentItem.date).toLocaleDateString("fr-FR")}</p>
            </div>

            {/* Navigation */}
            {currentIndex > 0 && (
              <button onClick={goPrev} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Précédent">
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {currentIndex < filtered.length - 1 && (
              <button onClick={goNext} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Suivant">
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
