import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Facebook, Linkedin, Mail, Clock, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

import { useQuery } from "@tanstack/react-query";

export default function Header() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { data: parametres } = useQuery({
    queryKey: ["parametres_header"],
    queryFn: () => fetch("/api/parametres").then(res => res.json())
  });

  const navItems = [
    { label: t("nav.accueil"), path: "/" },
    {
      label: t("nav.presentation"),
      path: "/presentation",
      children: [
        { label: "À propos du CNC", path: "/presentation" },
        { label: "Missions & Attributions", path: "/missions" },
      ],
    },
    { label: t("nav.actualites"), path: "/actualites" },
    { label: t("nav.documents"), path: "/documents" },
    { label: t("nav.galerie"), path: "/galerie" },
    { label: t("Suivi de dossier"), path: "/suivi-projet" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getImgUrl = (path: string | null | undefined, fallback: string) => {
    if (!path) return fallback;
    if (path.startsWith('http')) return path;
    return `/${path}`;
  };

  return (
    <>
      <header className="bg-surface shadow-sm sticky top-0 z-50 flex flex-col">
        {/* Topbar */}
        <div className="bg-[#f8f9fa] border-b border-border px-4 md:px-8 py-2 hidden md:flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              {parametres?.lien_twitter && (
                <a href={parametres.lien_twitter} className="hover:text-primary transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
              {parametres?.lien_facebook && (
                <a href={parametres.lien_facebook} className="hover:text-primary transition-colors"><Facebook className="w-4 h-4" /></a>
              )}
              {parametres?.lien_linkedin && (
                <a href={parametres.lien_linkedin} className="hover:text-primary transition-colors"><Linkedin className="w-4 h-4" /></a>
              )}
              {(!parametres?.lien_twitter && !parametres?.lien_facebook && !parametres?.lien_linkedin) && (
                <>
                  <a href="#" className="hover:text-primary transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-4 h-4" /></a>
                  <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-4 h-4" /></a>
                </>
              )}
            </div>
            <div className="w-px h-4 bg-slate-300"></div>
            <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <Mail className="w-4 h-4 text-primary" />
              <span>{parametres?.contact_email || "contact@cnc-tchad.td"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span>{parametres?.horaires_ouverture || "Lun – Ven 7h30 – 15h30"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Phone className="w-4 h-4 text-primary" />
            <span>{parametres?.contact_telephone || "+235 22 52 12 34"}</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="w-full px-4 md:px-8 border-b border-border">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo section — Armoiries | Titre | Logo CNC */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              {/* Armoiries du Tchad */}
              {/* <img
                src={getImgUrl(parametres?.armoiries_path, "/armoiries-tchad.png")}
                alt="Armoiries de la République du Tchad"
                className="w-10 h-12 md:w-12 md:h-14 object-contain"
              /> */}
              {/* Logo personnalisé si présent */}
              {parametres?.logo_path && (
                <img
                  src={getImgUrl(parametres.logo_path, "")}
                  alt="Logo CNC"
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
              )}
              {/* Texte institutionnel */}
              <div className="hidden sm:block">
                <p className="text-sm md:text-base font-bold text-primary leading-tight">
                  {parametres?.nom_site_ligne1 || "Conseil National"}<br />
                  {parametres?.nom_site_ligne2 || "de la Concurrence"}
                </p>
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
                      onClick={() => navigate(item.path)}
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
            <div className="flex items-center gap-3 sm:gap-4">
              <LanguageSwitcher />

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



