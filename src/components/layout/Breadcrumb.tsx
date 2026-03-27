import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeLabels: Record<string, string> = {
  presentation: "Présentation",
  missions: "Missions & Attributions",
  actualites: "Actualités",
  decisions: "Décisions & Jurisprudence",
  documents: "Documents officiels",
  services: "Services en ligne",
  plainte: "Dépôt de plainte",
  signalement: "Signalement anonyme",
  contact: "Contact",
  faq: "FAQ",
  galerie: "Galerie",
};

export default function Breadcrumb() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Fil d'Ariane" className="container-page py-3">
      <ol className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
        <li>
          <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Accueil</span>
          </Link>
        </li>
        {segments.map((segment, index) => {
          const path = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          const label = routeLabels[segment] || decodeURIComponent(segment);

          return (
            <li key={path} className="flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5" />
              {isLast ? (
                <span className="text-primary font-medium">{label}</span>
              ) : (
                <Link to={path} className="hover:text-primary transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
