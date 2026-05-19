import { useState } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Camera, Search, X, ChevronLeft, ChevronRight, Download, FileImage, Users, Megaphone, Handshake, CalendarDays, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

type GalerieItem = {
  id: number;
  titre: string;
  description: string;
  date_evenement: string;
  categorie: string;
  image_path: string;
};

const categoriesGalerie = ["Tous", "Réunions du Conseil", "Sessions de sensibilisation", "Partenariats", "Événements", "Enquêtes & Investigations", "Autre"];

const getImgUrl = (path: string | null | undefined, fallback: string) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  return `/${path}`;
};

// Icône par catégorie (Lucide)
const CategorieIcon = ({ cat, className = "w-3.5 h-3.5" }: { cat: string; className?: string }) => {
  if (cat === "Réunions du Conseil") return <Users className={className} />;
  if (cat === "Enquêtes & Investigations") return <Search className={className} />;
  if (cat === "Sessions de sensibilisation") return <Megaphone className={className} />;
  if (cat === "Partenariats") return <Handshake className={className} />;
  if (cat === "Événements") return <CalendarDays className={className} />;
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
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-accent transition-colors p-2 rounded-full hover:bg-white/10"
          aria-label="Fermer"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="absolute -top-12 left-0 text-white/60 text-sm">
          {currentIndex + 1} / {items.length}
        </div>

        <div className={`w-full aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden shadow-2xl`}>
          <img src={getImgUrl(item.image_path, `https://images.unsplash.com/photo-1550000000000?auto=format&fit=crop&q=80&w=1200`)} alt={item.titre} className="absolute inset-0 w-full h-full object-cover" />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <span className="text-xs text-white/60 uppercase tracking-wider">{item.categorie || 'Autre'}</span>
            <h3 className="text-white text-xl font-bold mt-1">{item.titre}</h3>
            <p className="text-white/70 text-sm mt-1">{item.description}</p>
          </div>

          <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {new Date(item.date_evenement).toLocaleDateString("fr-FR")}
          </div>
        </div>

        <button
          onClick={onPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-white hover:text-accent transition-colors p-3 rounded-full hover:bg-white/10"
          aria-label="Précédent"
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

  const { data: pageConfig } = useQuery({
    queryKey: ["parametres"],
    queryFn: () => fetch("/api/parametres").then(res => res.json())
  });

  const { data: galerieItems = [], isLoading } = useQuery({
    queryKey: ["galerie"],
    queryFn: () => fetch("/api/galerie").then(res => res.json())
  });

  const filtered =
    activeFilter === "Tous"
      ? galerieItems
      : galerieItems.filter((g: any) => (g.categorie || 'Autre') === activeFilter);

  const openLightbox = (item: GalerieItem) => {
    const idx = filtered.findIndex((f: any) => f.id === item.id);
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



  return (
    <div>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
            <Camera className="w-8 h-8 md:w-10 md:h-10 text-gold" />
            {pageConfig?.galerie_hero_title || "Galerie institutionnelle"}
          </h1>
          <p className="mt-2 opacity-90 text-lg">{pageConfig?.galerie_hero_subtitle || "Les activités et événements du Conseil National de la Concurrence"}</p>
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all inline-flex items-center gap-1.5 ${activeFilter === cat
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
          {filtered.length} photo{filtered.length > 1 ? "s" : ""} — {activeFilter === "Tous" ? "toutes catégories" : activeFilter}
        </p>

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">Chargement de la galerie...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">Aucune image trouvée.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item: any, i: number) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item)}
                className={`relative h-56 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-muted`}
              >
                <img src={getImgUrl(item.image_path, `https://images.unsplash.com/photo-${1550000000000 + i * 1000000}?auto=format&fit=crop&q=80&w=600`)} alt={item.titre} className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-700" />

                <div className="absolute top-3 left-3 z-10">
                  <span className="text-xs bg-black/50 text-white px-2.5 py-1 rounded-full backdrop-blur-sm font-medium inline-flex items-center gap-1">
                    <CategorieIcon cat={item.categorie || 'Autre'} className="w-3.5 h-3.5 text-gold" />
                    {item.categorie || 'Autre'}
                  </span>
                </div>

                {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 z-0">
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Search className="w-8 h-8 text-white mb-2" />
                  </div>
                </div> */}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <p className="text-white text-sm font-semibold line-clamp-1">{item.titre}</p>
                  <p className="text-white/60 text-xs mt-0.5">
                    {new Date(item.date_evenement).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}


      </div>

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
