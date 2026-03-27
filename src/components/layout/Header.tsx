import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, FileWarning, ChevronDown } from "lucide-react";
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
  { label: "Missions", path: "/missions" },
  { label: "Actualités", path: "/actualites" },
  { label: "Décisions", path: "/decisions" },
  {
    label: "Documents",
    path: "/documents",
  },
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
      {/* Bandeau drapeau tchadien */}
      <div className="flag-stripe" aria-hidden="true" />

      <header className="bg-surface shadow-sm sticky top-0 z-50 border-b border-border">
        <div className="container-page">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo section */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              {/* Armoiries placeholder */}
              <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-[8px] font-bold text-muted-foreground border border-border">
                🇹🇩
              </div>
              {/* Logo CNC */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">CNC</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-primary leading-tight">Conseil National</p>
                  <p className="text-xs text-muted-foreground leading-tight">de la Concurrence</p>
                </div>
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
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
                        isActive(item.path)
                          ? "text-primary bg-muted"
                          : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="w-3 h-3" />
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
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.path)
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
              <Link to="/plainte" className="hidden md:block">
                <Button variant="default" size="sm" className="gap-2">
                  <FileWarning className="w-4 h-4" />
                  Déposer une plainte
                </Button>
              </Link>
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
                    className={`block px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.path)
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
              <Link to="/plainte" onClick={() => setMobileOpen(false)} className="block px-4 pt-3">
                <Button variant="default" className="w-full gap-2">
                  <FileWarning className="w-4 h-4" />
                  Déposer une plainte
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
