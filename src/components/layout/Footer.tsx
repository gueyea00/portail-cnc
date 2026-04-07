import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin, Send, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Footer() {
  const { data: parametres } = useQuery({
    queryKey: ["parametres_footer"],
    queryFn: () => fetch("/api/parametres").then(res => res.json())
  });
  return (
    <footer className="bg-primary text-primary-foreground pt-0 pb-8 relative overflow-hidden">

      {/* Abstract SVG Pattern Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-100">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1440 800"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Onde blanche subliminale 1 */}
          <path
            fill="#ffffff"
            fillOpacity="0.1"
            d="M0,320L48,341.3C96,363,192,405,288,416C384,427,480,405,576,373.3C672,341,768,299,864,288C960,277,1056,299,1152,314.7C1248,331,1344,341,1392,346.7L1440,352L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
          ></path>
          {/* Onde blanche subliminale 2 */}
          <path
            fill="#ffffff"
            fillOpacity="0.08"
            d="M0,64L48,106.7C96,149,192,235,288,272C384,309,480,299,576,261.3C672,224,768,160,864,149.3C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
          ></path>
          {/* Onde or subliminale (Accent) */}
          <path
            fill="#F4C200"
            fillOpacity="0.15"
            d="M0,480L48,469.3C96,459,192,437,288,442.7C384,448,480,480,576,501.3C672,523,768,533,864,512C960,491,1056,437,1152,416C1248,395,1344,405,1392,410.7L1440,416L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
          ></path>
        </svg>
      </div>

      <div className="container-page relative z-10 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Col 1 — Logo & Desc */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/armoiries-tchad.png" alt="Armoiries du Tchad" className="w-12 h-14 object-contain bg-white rounded p-1 shadow-sm" />
              <div>
                <p className="font-extrabold text-base leading-tight tracking-wide">Conseil National</p>
                <p className="text-sm text-white/70 leading-tight">de la Concurrence</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Autorité administrative indépendante chargée de veiller au respect des règles de la concurrence en République du Tchad.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-gold hover:text-primary hover:-translate-y-1 transition-all duration-300 shadow-sm" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-gold hover:text-primary hover:-translate-y-1 transition-all duration-300 shadow-sm" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-gold hover:text-primary hover:-translate-y-1 transition-all duration-300 shadow-sm" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 — Liens rapides */}
          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-3">
              Liens rapides
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              {[
                { label: "Présentation", path: "/presentation" },
                { label: "Missions & Attributions", path: "/missions" },
                { label: "Actualités", path: "/actualites" },
                { label: "Ressources & Documents", path: "/documents" },
                { label: "Foire Aux Questions", path: "/faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="group flex items-center gap-2 hover:text-gold transition-colors">
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-3">
              Services
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              {[
                { label: "Déposer une plainte", path: "/plainte" },
                { label: "Signalement anonyme", path: "/signalement" },
                { label: "Tous les services", path: "/services" },
                { label: "Galerie institutionnelle", path: "/galerie" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="group flex items-center gap-2 hover:text-gold transition-colors">
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact & Newsletter */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-6 flex items-center gap-3">
                Contact
              </h3>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex items-start gap-3 group cursor-default">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-primary transition-colors duration-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="pt-1 leading-snug whitespace-pre-line">{parametres?.footer_adresse || "Av. Charles de Gaulle,\nN'Djamena, Tchad"}</span>
                </li>
                <li className="flex items-center gap-3 group cursor-default">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-primary transition-colors duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>{parametres?.footer_telephone || "+235 22 52 XX XX"}</span>
                </li>
                <li className="flex items-center gap-3 group cursor-default">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-primary transition-colors duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>{parametres?.footer_email || "contact@cnc-tchad.td"}</span>
                </li>
              </ul>
            </div>

            {/* Champ Newsletter (Input + Button) */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <p className="text-sm font-semibold mb-3 text-white">S'abonner à la Newsletter</p>
              <form className="relative flex items-center" onSubmit={(e) => { e.preventDefault(); alert("Abonnement réussi !"); }}>
                <input
                  type="email"
                  placeholder="Votre adresse email..."
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-full pl-4 pr-12 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1 w-9 h-9 rounded-full bg-gold text-primary flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-md group"
                  aria-label="S'abonner"
                >
                  <Send className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Ligne de séparation visuelle */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Liens institutionnels & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/50">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3">
            <a href="#" className="hover:text-gold transition-colors">Ministère du Commerce</a>
            <a href="#" className="hover:text-gold transition-colors">Gouvernement du Tchad</a>
            <a href="#" className="hover:text-gold transition-colors">CEMAC</a>
            <a href="#" className="hover:text-gold transition-colors">UEMOA</a>
          </div>
          <div className="text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Conseil National de la Concurrence.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}



