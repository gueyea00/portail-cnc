import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Accueil", path: "/" },
  {
    label: "Présentation",
    path: "/presentation",
    children: [
      { label: "À propos du CNC", path: "/presentation" },
      { label: "Missions & Attributions", path: "/missions" },
    ],
  },
  { label: "Actualités", path: "/actualites" },
  { label: "Documents", path: "/documents" },
  { label: "Galerie", path: "/galerie" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];




export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Bandeau institutionnel supérieur — Couleurs du drapeau (Bleu, Jaune, Rouge) */}
      <div className="relative text-[11px] py-1.5 hidden md:block overflow-hidden">
        {/* Background Stripes */}
        <div className="absolute inset-0 flex">
          <div className="flex-1 bg-[#002664]"></div> {/* Bleu de Prusse */}
          <div className="flex-1 bg-[#FECB00]"></div> {/* Jaune Or */}
          <div className="flex-1 bg-[#C60C30]"></div> {/* Rouge */}
        </div>
        
        {/* Overlay pour la lisibilité si besoin, mais ici on va jouer sur les couleurs de texte */}
        <div className="relative z-10 container-page flex items-center justify-between font-medium">
          <span className="text-white drop-shadow-sm">République du Tchad — Portail officiel du Conseil National de la Concurrence</span>
          <div className="flex items-center gap-4 text-white">
            <span className="flex items-center gap-1.5">
              <span className="opacity-80">07h30 – 15h30</span>
            </span>
            <span className="opacity-50">•</span>
            <span className="flex items-center gap-1.5">
              <span className="opacity-80">N'Djamena, Tchad</span>
            </span>
          </div>
        </div>
      </div>

      <header className="bg-surface shadow-sm sticky top-0 z-50 border-b border-border">
        <div className="w-full px-4 md:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo section â€” Armoiries | Titre | Logo CNC */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              {/* Armoiries du Tchad */}
              <img
                src="/armoiries-tchad.png"
                alt="Armoiries de la République du Tchad"
                className="w-10 h-12 md:w-12 md:h-14 object-contain"
              />

              {/* Séparateur vertical */}
              <div className="hidden sm:block w-px h-10 bg-border mx-1" />

              {/* Texte institutionnel */}
              <div className="hidden sm:block">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground leading-none mb-0.5">République du Tchad</p>
                <p className="text-base font-bold text-primary leading-tight">Conseil National</p>
                <p className="text-sm text-muted-foreground leading-tight">de la Concurrence</p>
              </div>


            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
              {navItems.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={`px-4 py-2 text-base font-medium rounded-md transition-colors flex items-center gap-1.5 ${isActive(item.path)
                        ? "text-primary bg-muted"
                        : "text-foreground hover:text-primary hover:bg-muted"
                        }`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 bg-surface rounded-lg shadow-lg border border-border py-2 min-w-[200px] z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 text-base font-medium rounded-md transition-colors ${isActive(item.path)
                      ? "text-primary bg-muted"
                      : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* CTA + burger */}
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-surface animate-slide-in">
            <nav className="container-page py-4 space-y-1" aria-label="Navigation mobile">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium rounded-md transition-colors ${isActive(item.path)
                      ? "text-primary bg-muted"
                      : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                  >
                    {item.label}
                  </Link>
                  {item.children?.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      onClick={() => setMobileOpen(false)}
                      className="block px-8 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}


