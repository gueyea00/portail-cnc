import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1 — Logo & desc */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <span className="font-bold text-sm">CNC</span>
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">Conseil National</p>
                <p className="text-xs opacity-80 leading-tight">de la Concurrence</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Autorité administrative indépendante chargée de veiller au respect des règles de la concurrence
              en République du Tchad.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 — Liens rapides */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Liens rapides</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/presentation" className="hover:opacity-100 transition-opacity">Présentation</Link></li>
              <li><Link to="/missions" className="hover:opacity-100 transition-opacity">Missions</Link></li>
              <li><Link to="/actualites" className="hover:opacity-100 transition-opacity">Actualités</Link></li>
              <li><Link to="/decisions" className="hover:opacity-100 transition-opacity">Décisions</Link></li>
              <li><Link to="/documents" className="hover:opacity-100 transition-opacity">Documents</Link></li>
              <li><Link to="/faq" className="hover:opacity-100 transition-opacity">FAQ</Link></li>
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/plainte" className="hover:opacity-100 transition-opacity">Déposer une plainte</Link></li>
              <li><Link to="/signalement" className="hover:opacity-100 transition-opacity">Signalement anonyme</Link></li>
              <li><Link to="/services" className="hover:opacity-100 transition-opacity">Tous les services</Link></li>
              <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
              <li><Link to="/galerie" className="hover:opacity-100 transition-opacity">Galerie</Link></li>
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Avenue Charles de Gaulle, N'Djamena, Tchad</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+235 22 52 XX XX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>contact@cnc-tchad.td</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Liens institutionnels */}
        <div className="border-t border-primary-foreground/10 mt-8 pt-6">
          <div className="flex flex-wrap justify-center gap-4 text-xs opacity-60 mb-4">
            <a href="#" className="hover:opacity-100 transition-opacity">Ministère du Commerce</a>
            <span>•</span>
            <a href="#" className="hover:opacity-100 transition-opacity">Gouvernement du Tchad</a>
            <span>•</span>
            <a href="#" className="hover:opacity-100 transition-opacity">CEMAC</a>
            <span>•</span>
            <a href="#" className="hover:opacity-100 transition-opacity">UEMOA</a>
          </div>
          <div className="text-center text-xs opacity-60">
            <p>© 2025 Conseil National de la Concurrence — République du Tchad</p>
            <p className="mt-1">Réalisation : Ebenyx Technologies SA-CA</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
