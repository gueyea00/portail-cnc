import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  Bell,
  CheckCircle2,
  AlertCircle,
  FileBadge,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type TabType = "dashboard" | "articles" | "membres" | "galerie" | "documents" | "plaintes" | "parametres";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("cnc_admin") || "{}");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/articles");
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des articles");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cnc_token");
    localStorage.removeItem("cnc_admin");
    toast.success("Déconnexion réussie");
    navigate("/admin/login");
  };

  const menuItems = [
    { id: "dashboard", label: "Tableau de Bord", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "articles", label: "Actualités", icon: <FileText className="w-5 h-5" /> },
    { id: "membres", label: "Membres", icon: <Users className="w-5 h-5" /> },
    { id: "galerie", label: "Galerie", icon: <ImageIcon className="w-5 h-5" /> },
    { id: "documents", label: "Documents", icon: <FileBadge className="w-5 h-5" /> },
    { id: "plaintes", label: "Plaintes", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "parametres", label: "Paramètres", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#002664] text-white flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-lg">
              <img src="/armoiries-tchad.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="font-bold text-sm leading-tight">CNC TCHAD</h2>
              <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                activeTab === item.id 
                ? "bg-white/15 text-white shadow-inner" 
                : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-primary">
                {admin.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold truncate">{admin.username}</p>
                <p className="text-[10px] text-white/50">Administrateur</p>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 hover:text-red-400 transition-all font-medium"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Header Content */}
        <header className="h-20 bg-white border-b border-border sticky top-0 z-40 px-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-xs text-muted-foreground">Gestion du portail CNC Tchad</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="w-5 h-5 text-slate-600" />
              </Button>
            </div>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 text-xs font-bold rounded-xl border-slate-200">
                <ExternalLink className="w-4 h-4" />
                Voir le site
              </Button>
            </a>
          </div>
        </header>

        {/* Dynamic Body Content */}
        <div className="p-8 pb-12 flex-1 overflow-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Articles publiés</p>
                  <h3 className="text-2xl font-bold text-slate-800 mt-1">{articles.length}</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Plaintes reçues</p>
                  <h3 className="text-2xl font-bold text-slate-800 mt-1">12</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Membres du CNC</p>
                  <h3 className="text-2xl font-bold text-slate-800 mt-1">7</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Signalements</p>
                  <h3 className="text-2xl font-bold text-slate-800 mt-1">5</h3>
                </div>
              </div>

              <div className="bg-[#002664] p-8 rounded-[40px] text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-black mb-2 leading-tight tracking-tight">Bienvenue, {admin.username} !</h2>
                    <p className="text-white/70 max-w-md font-medium">Vous pouvez gérer tous les contenus du portail institutionnel depuis cet espace de contrôle centralisé.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <Button className="bg-white text-primary hover:bg-white/90 rounded-2xl h-14 px-8 font-bold gap-2">
                        <Plus className="w-5 h-5" />
                        Nouvel Article
                     </Button>
                     <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-2xl h-14 px-8 font-bold">
                        Paramètres
                     </Button>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
              </div>
            </div>
          )}

          {activeTab === "articles" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="Rechercher un article..." 
                    className="pl-10 h-10 rounded-xl border-slate-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90 h-10 px-6 rounded-xl font-bold gap-2">
                  <Plus className="w-4 h-4" />
                  Nouvel Article
                </Button>
              </div>

              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Aperçu</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Titre</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Catégorie</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Date</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {articles
                      .filter(art => art.titre.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((art) => (
                      <tr key={art.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="w-16 h-10 rounded-lg bg-slate-100 overflow-hidden">
                            <img 
                                src={art.image_path ? `/uploads/articles/${art.image_path.split('/').pop()}` : art.image_url} 
                                alt="" 
                                className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800 line-clamp-1">{art.titre}</p>
                          <p className="text-[10px] text-slate-400 font-mono">/{art.slug}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${
                             art.categorie === 'communique' ? 'bg-green-100 text-green-700' :
                             art.categorie === 'evenement' ? 'bg-blue-100 text-blue-700' :
                             'bg-orange-100 text-orange-700'
                          }`}>
                            {art.categorie}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 font-medium whitespace-nowrap">
                          {new Date(art.date_publication).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-blue-600 hover:bg-blue-50">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-red-600 hover:bg-red-50">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {articles.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                                Aucun article trouvé.
                            </td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab !== "dashboard" && activeTab !== "articles" && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 animate-in zoom-in duration-300">
               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <LayoutDashboard className="w-8 h-8" />
               </div>
               <div className="max-w-sm">
                  <h3 className="text-lg font-bold text-slate-800">Module en cours de migration</h3>
                  <p className="text-sm text-slate-500">Nous terminons l'intégration de cet onglet pour une expérience de gestion optimale sur Vercel.</p>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
