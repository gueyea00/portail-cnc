import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { galerieItems, categoriesGalerie } from "@/lib/data";
import { Camera, Search, X, ChevronLeft, ChevronRight, Download, FileImage, Users, Megaphone, Handshake, CalendarDays, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

type GalerieItem = {
  id: number;
  titre: string;
  description: string;
  date: string;
  categorie: string;
  gradient: string;
};

// IcÃ´ne par catÃ©gorie (Lucide)
const CategorieIcon = ({ cat, className = "w-3.5 h-3.5" }: { cat: string; className?: string }) => {
  if (cat === "RÃ©unions du Conseil") return <Users className={className} />;
  if (cat === "EnquÃªtes & Investigations") return <Search className={className} />;
  if (cat === "Sessions de sensibilisation") return <Megaphone className={className} />;
  if (cat === "Partenariats") return <Handshake className={className} />;
  if (cat === "Ã‰vÃ©nements") return <CalendarDays className={className} />;
  return <LayoutGrid className={className} />;
};

function LightboxModal({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalerieItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[currentIndex];
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermeture */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-accent transition-colors p-2 rounded-full hover:bg-white/10"
          aria-label="Fermer"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Counter */}
        <div className="absolute -top-12 left-0 text-white/60 text-sm">
          {currentIndex + 1} / {items.length}
        </div>

        {/* Image principale (placeholder) */}
        <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center relative overflow-hidden shadow-2xl`}>
          <Camera className="w-20 h-20 text-white/20" />
          {/* Overlay info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <span className="text-xs text-white/60 uppercase tracking-wider">{item.categorie}</span>
            <h3 className="text-white text-xl font-bold mt-1">{item.titre}</h3>
            <p className="text-white/70 text-sm mt-1">{item.description}</p>
          </div>
          {/* Date badge */}
          <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {new Date(item.date).toLocaleDateString("fr-FR")}
          </div>
        </div>

        {/* Navigation prev/next */}
        <button
          onClick={onPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-white hover:text-accent transition-colors p-3 rounded-full hover:bg-white/10"
          aria-label="PrÃ©cÃ©dent"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-white hover:text-accent transition-colors p-3 rounded-full hover:bg-white/10"
          aria-label="Suivant"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

export default function GaleriePage() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeFilter === "Tous"
      ? galerieItems
      : galerieItems.filter((g) => g.categorie === activeFilter);

  const openLightbox = (item: GalerieItem) => {
    const idx = filtered.findIndex((f) => f.id === item.id);
    setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  const documentsVisuels = [
    { titre: "Logo CNC", formats: ["PNG", "SVG"], desc: "Logo officiel du Conseil National de la Concurrence" },
    { titre: "Armoiries du Tchad", formats: ["PNG", "SVG"], desc: "Armoiries officielles de la RÃ©publique du Tchad" },
    { titre: "Charte graphique CNC", formats: ["PDF"], desc: "Guide d'utilisation de l'identitÃ© visuelle du CNC" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-page">
          <div className="accent-line" />
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
            <Camera className="w-8 h-8 md:w-10 md:h-10 text-gold" />
            Galerie institutionnelle
          </h1>
          <p className="mt-2 opacity-90 text-lg">Les activitÃ©s et Ã©vÃ©nements du Conseil National de la Concurrence</p>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12">
        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categoriesGalerie.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all inline-flex items-center gap-1.5 ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-surface shadow-sm text-foreground hover:bg-muted"
              }`}
            >
              {cat !== "Tous" && <CategorieIcon cat={cat} />}
              {cat}
            </button>
          ))}
        </div>

        {/* Compteur */}
        <p className="text-sm text-muted-foreground mb-6 text-center">
          {filtered.length} photo{filtered.length > 1 ? "s" : ""} â€” {activeFilter === "Tous" ? "toutes catÃ©gories" : activeFilter}
        </p>

        {/* Grille galerie */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className={`relative h-56 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center group overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <Camera className="w-10 h-10 text-white/30 group-hover:scale-110 transition-transform duration-300" />

              {/* Badge catÃ©gorie */}
              <div className="absolute top-3 left-3 z-10">
                <span className="text-xs bg-black/50 text-white px-2.5 py-1 rounded-full backdrop-blur-sm font-medium inline-flex items-center gap-1">
                  <CategorieIcon cat={item.categorie} className="w-3.5 h-3.5 text-gold" />
                  {item.categorie}
                </span>
              </div>

              {/* Overlay hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300">
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Search className="w-8 h-8 text-white mb-2" />
                </div>
              </div>

              {/* Info bas */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-semibold line-clamp-1">{item.titre}</p>
                <p className="text-white/60 text-xs mt-0.5">
                  {new Date(item.date).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section Documents visuels */}
        <section className="mt-20 pt-12 border-t border-border">
          <div className="text-center mb-10">
            <div className="accent-line mx-auto" />
            <h2 className="section-title">Documents visuels institutionnels</h2>
            <p className="section-subtitle">Ã‰lÃ©ments graphiques officiels du CNC disponibles en tÃ©lÃ©chargement</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {documentsVisuels.map((doc) => (
              <div key={doc.titre} className="bg-surface shadow-soft rounded-2xl p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <FileImage className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{doc.titre}</h3>
                <p className="text-sm text-muted-foreground mb-4">{doc.desc}</p>
                <div className="flex gap-2 flex-wrap justify-center">
                  {doc.formats.map((fmt) => (
                    <Button key={fmt} variant="outline" size="sm" className="gap-1.5">
                      <Download className="w-3.5 h-3.5" />
                      {fmt}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <LightboxModal
          items={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}

