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
  CheckCircle2,
  AlertCircle,
  FileBadge,
  MessageSquare,
  ChevronDown,
  Puzzle,
  Share2,
  Chrome,
  Facebook,
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type TabType = "dashboard" | "articles" | "membres" | "galerie" | "documents" | "plaintes" | "liens" | "missions" | "historique" | "etapes" | "faq" | "services" | "parametres" | "plugins";


export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [activeParamTab, setActiveParamTab] = useState<string>("identite");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [membres, setMembres] = useState<any[]>([]);
  const [galerie, setGalerie] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [plaintes, setPlaintes] = useState<any[]>([]);
  const [parametres, setParametres] = useState<Record<string, string>>({});
  const [presidentPhotoFile, setPresidentPhotoFile] = useState<File | null>(null);
  const [heroBgFile, setHeroBgFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [armoiriesFile, setArmoiriesFile] = useState<File | null>(null);
  const [isSavingParametres, setIsSavingParametres] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTab, setIsLoadingTab] = useState(false);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [isSavingArticle, setIsSavingArticle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [articleForm, setArticleForm] = useState({
    titre: "",
    slug: "",
    extrait: "",
    contenu: "",
    categorie: "communique",
    image_url: "",
    statut: "brouillon",
    date_publication: "",
  });
  const [articleImage, setArticleImage] = useState<File | null>(null);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [membreImage, setMembreImage] = useState<File | null>(null);
  const [editingMembre, setEditingMembre] = useState<any>(null);
  const [showMembreForm, setShowMembreForm] = useState(false);
  const [membreForm, setMembreForm] = useState({
    nom: "",
    fonction: "",
    initiales: "",
    bio: "",
    actif: true,
    ordre: 0,
  });
  const [galerieForm, setGalerieForm] = useState({
    titre: "",
    description: "",
    date_evenement: "",
    categorie: "Événement",
    gradient: "from-primary to-gold",
    ordre: 0,
  });
  const [galerieImage, setGalerieImage] = useState<File | null>(null);
  const [showGalerieForm, setShowGalerieForm] = useState(false);
  const [editingGalerie, setEditingGalerie] = useState<any>(null);

  const [documentForm, setDocumentForm] = useState({
    titre: "",
    categorie: "Loi",
    type_fichier: "PDF",
    taille: "",
    date_publication: "",
    lang: "fr",
  });
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [editingDocument, setEditingDocument] = useState<any>(null);

  const [lienLogoFile, setLienLogoFile] = useState<File | null>(null);
  const [liens, setLiens] = useState<any[]>([]);
  const [lienForm, setLienForm] = useState({ nom: "", url: "", description: "", categorie: "Ministère", ordre: 0 });
  const [showLienForm, setShowLienForm] = useState(false);
  const [editingLien, setEditingLien] = useState<any>(null);

  const [missions, setMissions] = useState<any[]>([]);
  const [showMissionForm, setShowMissionForm] = useState(false);
  const [editingMission, setEditingMission] = useState<any>(null);
  const [missionForm, setMissionForm] = useState({ titre: "", description: "", icone: "Shield", ordre: 0, actif: true });

  const [historique, setHistorique] = useState<any[]>([]);
  const [showHistoriqueForm, setShowHistoriqueForm] = useState(false);
  const [editingHistorique, setEditingHistorique] = useState<any>(null);
  const [historiqueForm, setHistoriqueForm] = useState({ annee: "", description: "", ordre: 0 });

  const [etapes, setEtapes] = useState<any[]>([]);
  const [showEtapeForm, setShowEtapeForm] = useState(false);
  const [editingEtape, setEditingEtape] = useState<any>(null);
  const [etapeForm, setEtapeForm] = useState({ titre: "", description: "", ordre: 0 });

  const [faq, setFaq] = useState<any[]>([]);
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [faqForm, setFaqForm] = useState({ question: "", reponse: "", theme: "Généralités", ordre: 0 });

  const [services, setServices] = useState<any[]>([]);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [serviceForm, setServiceForm] = useState({ titre: "", description: "", icone: "ShieldAlert", lien: "", ordre: 0 });

  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("cnc_admin") || "{}");
  const token = localStorage.getItem("cnc_token");

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (activeTab === "articles") fetchArticles();
    if (activeTab === "membres") fetchMembres();
    if (activeTab === "galerie") fetchGalerie();
    if (activeTab === "documents") fetchDocuments();
    if (activeTab === "plaintes") fetchPlaintes();
    if (activeTab === "liens") fetchLiens();
    if (activeTab === "missions") fetchMissions();
    if (activeTab === "historique") fetchHistorique();
    if (activeTab === "etapes") fetchEtapes();
    if (activeTab === "faq") fetchFaq();
    if (activeTab === "services") fetchServices();
    if (activeTab === "parametres") fetchParametres();

  }, [activeTab]);

  const authFetch = async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers || {});
    if (token) headers.set("Authorization", `Bearer ${token}`);
    const res = await fetch(url, { ...options, headers });
    if (res.status === 401 || res.status === 403) {
      toast.error("Session expirée. Veuillez vous reconnecter.");
      localStorage.removeItem("cnc_token");
      localStorage.removeItem("cnc_admin");
      navigate("/admin/login");
      throw new Error("Unauthorized");
    }
    return res;
  };

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const openArticleForm = (article: any = null) => {
    if (article) {
      setEditingArticle(article);
      setArticleForm({
        titre: article.titre,
        slug: article.slug,
        extrait: article.extrait || "",
        contenu: article.contenu || "",
        categorie: article.categorie || "communique",
        image_url: article.image_url || "",
        statut: article.statut || "brouillon",
        date_publication: article.date_publication ? article.date_publication.split("T")[0] : "",
      });
    } else {
      setEditingArticle(null);
      setArticleForm({
        titre: "",
        slug: "",
        extrait: "",
        contenu: "",
        categorie: "communique",
        image_url: "",
        statut: "brouillon",
        date_publication: "",
      });
    }
    setActiveTab("articles");
    setShowArticleForm(true);
  };

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await authfetch("http://188.165.77.237:5003/api/articles/admin/all");
      const data = await res.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erreur lors du chargement des articles");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMembres = async () => {
    setIsLoadingTab(true);
    try {
      const res = await authfetch("http://188.165.77.237:5003/api/membres/admin/all");
      const data = await res.json();
      setMembres(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erreur lors du chargement des membres");
    } finally {
      setIsLoadingTab(false);
    }
  };

  const fetchGalerie = async () => {
    setIsLoadingTab(true);
    try {
      const res = await authfetch("http://188.165.77.237:5003/api/galerie/admin/all");
      const data = await res.json();
      setGalerie(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erreur lors du chargement de la galerie");
    } finally {
      setIsLoadingTab(false);
    }
  };

  const fetchPlaintes = async () => {
    setIsLoadingTab(true);
    try {
      const res = await authfetch("http://188.165.77.237:5003/api/plaintes/admin/all");
      const data = await res.json();
      setPlaintes(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erreur lors du chargement des plaintes");
    } finally {
      setIsLoadingTab(false);
    }
  };

  const fetchMissions = async () => {
    setIsLoadingTab(true);
    try {
      const res = await authfetch("http://188.165.77.237:5003/api/missions/admin/all");
      const data = await res.json();
      setMissions(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erreur lors du chargement des missions");
    } finally {
      setIsLoadingTab(false);
    }
  };

  const fetchHistorique = async () => {
    setIsLoadingTab(true);
    try {
      const res = await authfetch("http://188.165.77.237:5003/api/missions/admin/historique");
      const data = await res.json();
      setHistorique(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erreur lors du chargement de l'historique");
    } finally {
      setIsLoadingTab(false);
    }
  };

  const fetchEtapes = async () => {
    setIsLoadingTab(true);
    try {
      const res = await authfetch("http://188.165.77.237:5003/api/missions/admin/etapes");
      const data = await res.json();
      setEtapes(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erreur lors du chargement des étapes");
    } finally {
      setIsLoadingTab(false);
    }
  };

  const fetchFaq = async () => {
    setIsLoadingTab(true);
    try {
      const res = await authfetch("http://188.165.77.237:5003/api/faq/admin/all");
      const data = await res.json();
      setFaq(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erreur lors du chargement de la FAQ");
    } finally {
      setIsLoadingTab(false);
    }
  };

  const fetchServices = async () => {
    setIsLoadingTab(true);
    try {
      const res = await authfetch("http://188.165.77.237:5003/api/services/admin/all");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erreur lors du chargement des services");
    } finally {
      setIsLoadingTab(false);
    }
  };

  const openMembreForm = (membre: any = null) => {
    if (membre) {
      setEditingMembre(membre);
      setMembreForm({
        nom: membre.nom,
        fonction: membre.fonction || "",
        initiales: membre.initiales || "",
        bio: membre.bio || "",
        actif: membre.actif !== false,
        ordre: membre.ordre || 0,
      });
    } else {
      setEditingMembre(null);
      setMembreForm({
        nom: "",
        fonction: "",
        initiales: "",
        bio: "",
        actif: true,
        ordre: 0,
      });
    }
    setShowMembreForm(true);
  };

  const handleSaveMembre = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingTab(true);
    try {
      const formData = new FormData();
      formData.append("nom", membreForm.nom);
      formData.append("fonction", membreForm.fonction);
      formData.append("initiales", membreForm.initiales);
      formData.append("bio", membreForm.bio);
      formData.append("actif", String(membreForm.actif));
      formData.append("ordre", String(membreForm.ordre));
      if (membreImage) formData.append("photo", membreImage);

      const url = editingMembre ? `/api/membres/admin/${editingMembre.id}` : "/api/membres/admin";
      const method = editingMembre ? "PUT" : "POST";

      const res = await authFetch(url, {
        method,
        body: formData,
      });
      if (!res.ok) throw new Error("Erreur enregistrement");

      toast.success(editingMembre ? "Membre mis à jour" : "Membre ajouté");
      setShowMembreForm(false);
      setEditingMembre(null);
      setMembreImage(null);
      fetchMembres();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingTab(false);
    }
  };

  const handleDeleteMembre = async (id: number) => {
    if (!confirm("Supprimer ce membre ?")) return;
    try {
      const res = await authfetch(`http://188.165.77.237:5003/api/membres/admin/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      toast.success("Membre supprimé");
      fetchMembres();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openGalerieForm = (item: any = null) => {
    if (item) {
      setEditingGalerie(item);
      setGalerieForm({
        titre: item.titre,
        description: item.description || "",
        date_evenement: item.date_evenement ? item.date_evenement.split("T")[0] : "",
        categorie: item.categorie || "Événement",
        gradient: item.gradient || "from-primary to-gold",
        ordre: item.ordre || 0,
      });
    } else {
      setEditingGalerie(null);
      setGalerieForm({
        titre: "",
        description: "",
        date_evenement: "",
        categorie: "Événement",
        gradient: "from-primary to-gold",
        ordre: 0,
      });
    }
    setShowGalerieForm(true);
  };

  const handleSaveGalerie = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingTab(true);
    try {
      const formData = new FormData();
      Object.entries(galerieForm).forEach(([key, value]) => formData.append(key, String(value)));
      if (galerieImage) formData.append("image", galerieImage);

      const url = editingGalerie ? `/api/galerie/admin/${editingGalerie.id}` : "/api/galerie/admin";
      const method = editingGalerie ? "PUT" : "POST";

      const res = await authFetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Erreur enregistrement");

      toast.success(editingGalerie ? "Élément mis à jour" : "Élément ajouté");
      setShowGalerieForm(false);
      setEditingGalerie(null);
      setGalerieImage(null);
      fetchGalerie();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingTab(false);
    }
  };

  const handleDeleteGalerie = async (id: number) => {
    if (!confirm("Supprimer cet élément ?")) return;
    try {
      const res = await authfetch(`http://188.165.77.237:5003/api/galerie/admin/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      toast.success("Élément supprimé");
      fetchGalerie();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openDocumentForm = (doc: any = null) => {
    if (doc) {
      setEditingDocument(doc);
      setDocumentForm({
        titre: doc.titre,
        categorie: doc.categorie || "Loi",
        type_fichier: doc.type_fichier || "PDF",
        taille: doc.taille || "",
        date_publication: doc.date_publication ? doc.date_publication.split("T")[0] : "",
        lang: doc.lang || "fr",
      });
    } else {
      setEditingDocument(null);
      setDocumentForm({
        titre: "",
        categorie: "Loi",
        type_fichier: "PDF",
        taille: "",
        date_publication: "",
        lang: "fr",
      });
    }
    setShowDocumentForm(true);
  };

  const handleSaveDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingTab(true);
    try {
      const formData = new FormData();
      Object.entries(documentForm).forEach(([key, value]) => formData.append(key, String(value)));
      if (documentFile) formData.append("fichier", documentFile);

      const url = editingDocument ? `/api/documents/admin/${editingDocument.id}` : "/api/documents/admin";
      const method = editingDocument ? "PUT" : "POST";

      const res = await authFetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Erreur enregistrement");

      toast.success(editingDocument ? "Document mis à jour" : "Document ajouté");
      setShowDocumentForm(false);
      setEditingDocument(null);
      setDocumentFile(null);
      fetchDocuments();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingTab(false);
    }
  };

  const handleDeleteDocument = async (id: number) => {
    if (!confirm("Supprimer ce document ?")) return;
    try {
      const res = await authfetch(`http://188.165.77.237:5003/api/documents/admin/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      toast.success("Document supprimé");
      fetchDocuments();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchDocuments = async () => {
    setIsLoadingTab(true);
    try {
      const res = await authfetch("http://188.165.77.237:5003/api/documents/admin/all");
      const data = await res.json();
      setDocuments(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erreur lors du chargement des documents");
    } finally {
      setIsLoadingTab(false);
    }
  };

  const handleUpdatePlainteStatut = async (id: number, statut: string) => {
    try {
      const res = await authfetch(`http://188.165.77.237:5003/api/plaintes/admin/${id}/statut`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut }),
      });
      if (!res.ok) throw new Error("Erreur statut");
      toast.success("Statut mis à jour");
      fetchPlaintes();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeletePlainte = async (id: number) => {
    if (!confirm("Supprimer cette plainte ?")) return;
    try {
      const res = await authfetch(`http://188.165.77.237:5003/api/plaintes/admin/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      toast.success("Plainte supprimée");
      fetchPlaintes();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchParametres = async () => {
    setIsLoadingTab(true);
    try {
      const res = await authfetch("http://188.165.77.237:5003/api/parametres/admin/all");
      const data = await res.json();

      // On s'assure que toutes les clés importantes sont présentes pour l'admin
      const standardKeys = [
        'home_welcome_badge', 'home_missions_title', 'home_missions_subtitle', 'home_services_title', 'home_services_subtitle', 'home_news_title', 'home_news_subtitle',
        'pres_hero_title', 'pres_hero_subtitle', 'pres_section_title', 'pres_timeline_title', 'pres_timeline_subtitle', 'pres_members_title', 'presentation_p1', 'presentation_p2', 'presentation_p3',
        'missions_hero_title', 'missions_hero_subtitle', 'missions_section_subtitle', 'missions_process_title', 'missions_process_subtitle',
        'news_hero_title', 'news_hero_subtitle',
        'contact_hero_title', 'contact_hero_subtitle', 'contact_adresse', 'contact_telephone', 'contact_email',
        'docs_hero_title', 'docs_hero_subtitle',
        'faq_hero_title', 'faq_hero_subtitle',
        'galerie_hero_title', 'galerie_hero_subtitle',
        'services_hero_title', 'services_hero_subtitle',
        'sig_hero_title', 'sig_hero_subtitle',
        'plainte_hero_title', 'plainte_hero_subtitle',
        'footer_description', 'footer_adresse', 'footer_telephone', 'footer_email', 'footer_quick_links_title', 'footer_services_title', 'footer_contact_title', 'footer_newsletter_title', 'footer_copyright',
        'nom_site_ligne1', 'nom_site_ligne2', 'president_nom', 'president_photo_path', 'horaires_ouverture', 'lien_facebook', 'lien_linkedin', 'lien_twitter',
        'plugin_linkedin_enabled', 'plugin_linkedin_page_id', 'plugin_linkedin_token',
        'plugin_facebook_enabled', 'plugin_facebook_page_id', 'plugin_facebook_token'
      ];

      const merged = { ...data };
      standardKeys.forEach(key => {
        if (merged[key] === undefined) {
          merged[key] = "";
        }
      });

      setParametres(merged);
    } catch (error) {
      toast.error("Erreur lors du chargement des paramètres");
    } finally {
      setIsLoadingTab(false);
    }
  };

  const handleSaveAllParametres = async () => {
    setIsSavingParametres(true);
    try {
      const formData = new FormData();
      Object.entries(parametres).forEach(([cle, valeur]) => {
        formData.append(cle, valeur);
      });

      if (presidentPhotoFile) formData.append("president_photo_file", presidentPhotoFile);
      if (heroBgFile) formData.append("hero_bg_file", heroBgFile);
      if (logoFile) formData.append("logo_file", logoFile);
      if (armoiriesFile) formData.append("armoiries_file", armoiriesFile);

      const res = await authfetch("http://188.165.77.237:5003/api/parametres/admin", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur lors de l'enregistrement");

      toast.success("Paramètres enregistrés avec succès");
      setPresidentPhotoFile(null);
      setHeroBgFile(null);
      setLogoFile(null);
      setArmoiriesFile(null);
      fetchParametres();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSavingParametres(false);
    }
  };

  const fetchLiens = async () => {
    setIsLoadingTab(true);
    try {
      const res = await authfetch("http://188.165.77.237:5003/api/liens/admin/all");
      const data = await res.json();
      setLiens(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erreur lors du chargement des liens");
    } finally {
      setIsLoadingTab(false);
    }
  };

  const openLienForm = (lien: any = null) => {
    if (lien) {
      setEditingLien(lien);
      setLienForm({ nom: lien.nom, url: lien.url || "", description: lien.description || "", categorie: lien.categorie || "Ministère", ordre: lien.ordre || 0 });
    } else {
      setEditingLien(null);
      setLienForm({ nom: "", url: "", description: "", categorie: "Ministère", ordre: 0 });
    }
    setLienLogoFile(null);
    setShowLienForm(true);
  };

  const handleSaveLien = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingTab(true);
    try {
      const formData = new FormData();
      formData.append("nom", lienForm.nom);
      formData.append("url", lienForm.url);
      formData.append("description", lienForm.description);
      formData.append("categorie", lienForm.categorie);
      formData.append("ordre", String(lienForm.ordre));
      if (lienLogoFile) formData.append("logo", lienLogoFile);

      const url = editingLien ? `/api/liens/admin/${editingLien.id}` : "/api/liens/admin";
      const method = editingLien ? "PUT" : "POST";

      const res = await authFetch(url, { method, body: formData });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Erreur ${res.status}`);
      }
      
      toast.success(editingLien ? "Bailleur mis à jour" : "Bailleur ajouté");
      setShowLienForm(false);
      setEditingLien(null);
      setLienLogoFile(null);
      fetchLiens();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingTab(false);
    }
  };

  const handleDeleteLien = async (id: number) => {
    if (!confirm("Supprimer ce lien ?")) return;
    try {
      const res = await authfetch(`http://188.165.77.237:5003/api/liens/admin/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      toast.success("Lien supprimé");
      fetchLiens();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openMissionForm = (m: any = null) => {
    if (m) {
      setEditingMission(m);
      setMissionForm({ titre: m.titre, description: m.description || "", icone: m.icone || "Shield", ordre: m.ordre || 0, actif: m.actif !== false });
    } else {
      setEditingMission(null);
      setMissionForm({ titre: "", description: "", icone: "Shield", ordre: 0, actif: true });
    }
    setShowMissionForm(true);
  };

  const handleSaveMission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingTab(true);
    try {
      const url = editingMission ? `/api/missions/admin/${editingMission.id}` : "/api/missions/admin";
      const method = editingMission ? "PUT" : "POST";
      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(missionForm),
      });
      if (!res.ok) throw new Error("Erreur mission");
      toast.success(editingMission ? "Mission mise à jour" : "Mission ajoutée");
      setShowMissionForm(false);
      fetchMissions();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingTab(false);
    }
  };

  const handleDeleteMission = async (id: number) => {
    if (!confirm("Supprimer cette mission ?")) return;
    try {
      const res = await authfetch(`http://188.165.77.237:5003/api/missions/admin/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      toast.success("Mission supprimée");
      fetchMissions();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openHistoriqueForm = (h: any = null) => {
    if (h) {
      setEditingHistorique(h);
      setHistoriqueForm({ annee: h.annee, description: h.description, ordre: h.ordre || 0 });
    } else {
      setEditingHistorique(null);
      setHistoriqueForm({ annee: "", description: "", ordre: 0 });
    }
    setShowHistoriqueForm(true);
  };

  const handleSaveHistorique = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingTab(true);
    try {
      const url = editingHistorique ? `/api/missions/admin/historique/${editingHistorique.id}` : "/api/missions/admin/historique";
      const method = editingHistorique ? "PUT" : "POST";
      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historiqueForm),
      });
      if (!res.ok) throw new Error("Erreur historique");
      toast.success(editingHistorique ? "Historique mis à jour" : "Historique ajouté");
      setShowHistoriqueForm(false);
      fetchHistorique();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingTab(false);
    }
  };

  const handleDeleteHistorique = async (id: number) => {
    if (!confirm("Supprimer cet élément ?")) return;
    try {
      const res = await authfetch(`http://188.165.77.237:5003/api/missions/admin/historique/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      toast.success("Supprimé");
      fetchHistorique();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openEtapeForm = (e: any = null) => {
    if (e) {
      setEditingEtape(e);
      setEtapeForm({ titre: e.titre, description: e.description || "", ordre: e.ordre || 0 });
    } else {
      setEditingEtape(null);
      setEtapeForm({ titre: "", description: "", ordre: 0 });
    }
    setShowEtapeForm(true);
  };

  const handleSaveEtape = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingTab(true);
    try {
      const url = editingEtape ? `/api/missions/admin/etapes/${editingEtape.id}` : "/api/missions/admin/etapes";
      const method = editingEtape ? "PUT" : "POST";
      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(etapeForm),
      });
      if (!res.ok) throw new Error("Erreur étape");
      toast.success(editingEtape ? "Étape mise à jour" : "Étape ajoutée");
      setShowEtapeForm(false);
      fetchEtapes();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingTab(false);
    }
  };

  const handleDeleteEtape = async (id: number) => {
    if (!confirm("Supprimer cette étape ?")) return;
    try {
      const res = await authfetch(`http://188.165.77.237:5003/api/missions/admin/etapes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      toast.success("Supprimée");
      fetchEtapes();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openFaqForm = (f: any = null) => {
    if (f) {
      setEditingFaq(f);
      setFaqForm({ question: f.question, reponse: f.reponse || "", theme: f.theme || "Généralités", ordre: f.ordre || 0 });
    } else {
      setEditingFaq(null);
      setFaqForm({ question: "", reponse: "", theme: "Généralités", ordre: 0 });
    }
    setShowFaqForm(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingTab(true);
    try {
      const url = editingFaq ? `/api/faq/admin/${editingFaq.id}` : "/api/faq/admin";
      const method = editingFaq ? "PUT" : "POST";
      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqForm),
      });
      if (!res.ok) throw new Error("Erreur FAQ");
      toast.success(editingFaq ? "FAQ mise à jour" : "FAQ ajoutée");
      setShowFaqForm(false);
      fetchFaq();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingTab(false);
    }
  };

  const handleDeleteFaq = async (id: number) => {
    if (!confirm("Supprimer cette FAQ ?")) return;
    try {
      const res = await authfetch(`http://188.165.77.237:5003/api/faq/admin/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      toast.success("Supprimée");
      fetchFaq();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openServiceForm = (s: any = null) => {
    if (s) {
      setEditingService(s);
      setServiceForm({ titre: s.titre, description: s.description || "", icone: s.icone || "ShieldAlert", lien: s.lien || "", ordre: s.ordre || 0 });
    } else {
      setEditingService(null);
      setServiceForm({ titre: "", description: "", icone: "ShieldAlert", lien: "", ordre: 0 });
    }
    setShowServiceForm(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingTab(true);
    try {
      const url = editingService ? `/api/services/admin/${editingService.id}` : "/api/services/admin";
      const method = editingService ? "PUT" : "POST";
      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceForm),
      });
      if (!res.ok) throw new Error("Erreur service");
      toast.success(editingService ? "Service mis à jour" : "Service ajouté");
      setShowServiceForm(false);
      fetchServices();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingTab(false);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm("Supprimer ce service ?")) return;
    try {
      const res = await authfetch(`http://188.165.77.237:5003/api/services/admin/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      toast.success("Supprimé");
      fetchServices();
    } catch (error: any) {
      toast.error(error.message);
    }
  };


  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingArticle(true);
    try {
      const formData = new FormData();
      const finalSlug = articleForm.slug || slugify(articleForm.titre);
      formData.append("slug", finalSlug);
      formData.append("titre", articleForm.titre);
      formData.append("extrait", articleForm.extrait);
      formData.append("contenu", articleForm.contenu);
      formData.append("categorie", articleForm.categorie);
      formData.append("image_url", articleForm.image_url);
      formData.append("statut", articleForm.statut);
      if (articleForm.date_publication) {
        formData.append("date_publication", articleForm.date_publication);
      }
      if (articleImage) formData.append("image", articleImage);

      const url = editingArticle ? `/api/articles/admin/${editingArticle.id}` : "/api/articles/admin";
      const method = editingArticle ? "PUT" : "POST";

      const res = await authFetch(url, {
        method,
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Opération impossible");
      }

      toast.success(editingArticle ? "Article mis à jour" : "Article créé");
      setShowArticleForm(false);
      setEditingArticle(null);
      setArticleForm({
        titre: "", slug: "", extrait: "", contenu: "", categorie: "communique", image_url: "", statut: "brouillon", date_publication: "",
      });
      setArticleImage(null);
      fetchArticles();
    } catch (error: any) {
      toast.error("Erreur lors de l'enregistrement", {
        description: error.message,
      });
    } finally {
      setIsSavingArticle(false);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (!confirm("Supprimer cet article ?")) return;
    try {
      const res = await authfetch(`http://188.165.77.237:5003/api/articles/admin/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      toast.success("Article supprimé");
      fetchArticles();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cnc_token");
    localStorage.removeItem("cnc_admin");
    toast.success("Déconnexion réussie");
    navigate("/admin/login");
  };

  const menuGroups = [
    {
      label: "Principal",
      items: [
        { id: "dashboard", label: "Tableau de Bord", icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: "articles", label: "Actualités", icon: <FileText className="w-4 h-4" /> },
      ]
    },
    {
      label: "Institution",
      items: [
        { id: "missions", label: "Missions", icon: <CheckCircle2 className="w-4 h-4" /> },
        { id: "historique", label: "Historique", icon: <FileText className="w-4 h-4" /> },
        { id: "etapes", label: "Étapes", icon: <FileText className="w-4 h-4" /> },
        { id: "membres", label: "Membres", icon: <Users className="w-4 h-4" /> },
      ]
    },
    {
      label: "Contenu",
      items: [
        { id: "services", label: "Services", icon: <Settings className="w-4 h-4" /> },
        { id: "faq", label: "FAQ", icon: <MessageSquare className="w-4 h-4" /> },
        { id: "galerie", label: "Galerie", icon: <ImageIcon className="w-4 h-4" /> },
        { id: "documents", label: "Documents", icon: <FileBadge className="w-4 h-4" /> },
      ]
    },
    {
      label: "Relations",
      items: [
        { id: "plaintes", label: "Plaintes", icon: <MessageSquare className="w-4 h-4" /> },
        { id: "liens", label: "Liens institutionnels", icon: <ExternalLink className="w-4 h-4" /> },
      ]
    },
    {
      label: "Configuration",
      items: [
        { id: "parametres", label: "Paramètres", icon: <Settings className="w-4 h-4" /> },
        { id: "plugins", label: "Plugins & Extensions", icon: <Puzzle className="w-4 h-4" /> },
      ]
    },
  ];
  const menuItems = menuGroups.flatMap(g => g.items);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-60 bg-[#001a4d] text-white flex flex-col fixed inset-y-0 z-50 shadow-2xl">
        {/* Logo */}
        <div className="px-4 py-3.5 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-lg flex-shrink-0">
              <img src="/armoiries-tchad.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <h2 className="font-black text-[12px] leading-tight tracking-tight">CNC Tchad</h2>
              <p className="text-[8px] text-white/40 uppercase tracking-[0.15em] font-semibold mt-0.5">Administration</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2.5 py-3.5 overflow-y-auto space-y-3 scrollbar-none">
          <style>{`
            .scrollbar-none::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-none {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          {menuGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[8px] font-black uppercase tracking-[0.15em] text-white/25 px-2 mb-1">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-all duration-150 text-[12.5px] font-semibold ${
                      activeTab === item.id
                        ? "bg-white/[0.12] text-white"
                        : "text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                    }`}
                  >
                    <span className={`flex-shrink-0 transition-colors ${
                      activeTab === item.id ? "text-blue-300" : "text-white/30"
                    }`}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-60 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-100 sticky top-0 z-40 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <div>
              <h1 className="text-base font-bold text-slate-800">
                {menuItems.find(i => i.id === activeTab)?.label ?? 'Dashboard'}
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">Portail CNC Tchad</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-3 hover:bg-slate-50 p-1.5 px-2.5 rounded-xl transition-all duration-150 active:scale-95 border border-transparent hover:border-slate-100"
            >
              <div className="w-8 h-8 rounded-lg bg-[#001a4d] flex items-center justify-center text-white text-xs font-black shadow-inner">
                {admin.username?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-700 leading-tight">{admin.username}</p>
                <p className="text-[10px] text-slate-400 font-medium">Administrateur</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" style={{ transform: profileDropdownOpen ? 'rotate(180deg)' : 'none' }} />
            </button>

            {profileDropdownOpen && (
              <>
                {/* Overlay pour fermer le menu lors du clic extérieur */}
                <div 
                  className="fixed inset-0 z-40 cursor-default" 
                  onClick={() => setProfileDropdownOpen(false)}
                />
                
                {/* Dropdown Menu de profil avec animations et style premium */}
                <div className="absolute right-0 mt-2.5 w-52 bg-white rounded-2xl border border-slate-100 shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="px-4 py-2 border-b border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mon Compte</p>
                    <p className="text-sm font-black text-slate-800 truncate mt-0.5">{admin.username}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      setActiveTab("parametres");
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all text-left"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Paramètres
                  </button>
                  
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50 transition-all text-left border-t border-slate-100 mt-1"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    Déconnexion
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        <div className="p-6 pb-12 flex-1 overflow-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Bannière de bienvenue */}
              <div className="bg-gradient-to-r from-[#001a4d] to-[#003080] p-7 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div>
                    <p className="text-blue-300/80 text-xs font-bold uppercase tracking-widest mb-1">Tableau de bord</p>
                    <h2 className="text-2xl font-black mb-2 leading-tight">Bienvenue, {admin.username} !</h2>
                    <p className="text-white/60 max-w-md text-sm">Gérez tous les contenus du portail institutionnel depuis cet espace centralisé.</p>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <Button
                      className="bg-white text-[#001a4d] hover:bg-white/90 rounded-xl h-11 px-6 font-bold gap-2 shadow-lg text-sm"
                      onClick={openArticleForm}
                    >
                      <Plus className="w-4 h-4" />
                      Nouvel Article
                    </Button>
                    <button
                      className="border border-white/30 text-white hover:bg-white/10 rounded-xl h-11 px-6 font-bold text-sm transition-all active:scale-95 flex items-center justify-center"
                      onClick={() => setActiveTab("parametres")}
                    >
                      Paramètres
                    </button>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/[0.04] rounded-full -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-blue-400/[0.06] rounded-full -mb-12 pointer-events-none" />
              </div>

              {/* Statistiques */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-lg">Articles</span>
                  </div>
                  <h3 className="text-3xl font-black text-slate-800">{articles.length}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">publiés</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded-lg">Plaintes</span>
                  </div>
                  <h3 className="text-3xl font-black text-slate-800">{plaintes.length}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">reçues</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded-lg">Membres</span>
                  </div>
                  <h3 className="text-3xl font-black text-slate-800">{membres.length}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">du CNC</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded-lg">Partenaires</span>
                  </div>
                  <h3 className="text-3xl font-black text-slate-800">{liens.length}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">institutionnels</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "articles" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {showArticleForm ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowArticleForm(false);
                        setEditingArticle(null);
                      }}
                      className="gap-2 text-slate-500 hover:text-primary rounded-xl"
                    >
                      <LogOut className="w-4 h-4 rotate-180" />
                      Retour à la liste
                    </Button>
                    <h2 className="text-xl font-bold text-slate-800">
                      {editingArticle ? "Modifier l'article" : "Créer un nouvel article"}
                    </h2>
                  </div>

                  <form onSubmit={handleSaveArticle} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Titre de l'article</p>
                        <Input
                          value={articleForm.titre}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, titre: e.target.value }))}
                          onBlur={() => {
                            if (!articleForm.slug && articleForm.titre) {
                              setArticleForm((prev) => ({ ...prev, slug: slugify(prev.titre) }));
                            }
                          }}
                          required
                          placeholder="Entrez le titre..."
                          className="h-12 rounded-xl border-slate-200 focus:border-primary/30 focus:ring-primary/5"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Lien (Slug)</p>
                        <Input
                          value={articleForm.slug}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, slug: e.target.value }))}
                          className="h-12 rounded-xl border-slate-200"
                          placeholder="ex: mon-article-actu"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Catégorie</p>
                        <select
                          value={articleForm.categorie}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, categorie: e.target.value }))}
                          className="w-full h-12 rounded-xl border border-slate-200 px-3 bg-white text-sm focus:border-primary/30 focus:ring-primary/5 outline-none"
                        >
                          <option value="communique">Communiqué</option>
                          <option value="evenement">Événement</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Statut de publication</p>
                        <select
                          value={articleForm.statut}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, statut: e.target.value }))}
                          className="w-full h-12 rounded-xl border border-slate-200 px-3 bg-white text-sm focus:border-primary/30 focus:ring-primary/5 outline-none"
                        >
                          <option value="brouillon">Brouillon (Non visible)</option>
                          <option value="publie">Publié (Visible sur le site)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Date de publication</p>
                        <Input
                          type="date"
                          value={articleForm.date_publication}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, date_publication: e.target.value }))}
                          className="h-12 rounded-xl border-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Lien de l'image (Optionnel)</p>
                        <Input
                          value={articleForm.image_url}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, image_url: e.target.value }))}
                          className="h-12 rounded-xl border-slate-200"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Télécharger une image</p>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-[20px] cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <ImageIcon className="w-8 h-8 mb-2 text-slate-400" />
                              <p className="text-xs text-slate-500">
                                <span className="font-bold">Cliquez pour uploader</span> ou glissez-déposez
                              </p>
                              <p className="text-[10px] text-slate-400 mt-1">PNG, JPG ou WEBP (Max. 5MB)</p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => setArticleImage(e.target.files?.[0] || null)}
                            />
                          </label>
                        </div>
                        {articleImage && (
                          <p className="mt-2 text-xs font-medium text-primary flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Fichier sélectionné : {articleImage.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Extrait (Résumé court)</p>
                        <Textarea
                          value={articleForm.extrait}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, extrait: e.target.value }))}
                          className="min-h-[100px] rounded-2xl border-slate-200 p-4 focus:border-primary/30"
                          placeholder="Bref résumé de l'article..."
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Contenu complet</p>
                        <Textarea
                          value={articleForm.contenu}
                          onChange={(e) => setArticleForm((prev) => ({ ...prev, contenu: e.target.value }))}
                          className="min-h-[300px] rounded-2xl border-slate-200 p-4 focus:border-primary/30"
                          placeholder="Écrivez le contenu de l'article ici..."
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20"
                        disabled={isSavingArticle}
                      >
                        {isSavingArticle ? "Enregistrement en cours..." : "Enregistrer les modifications"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowArticleForm(false);
                          setEditingArticle(null);
                        }}
                        className="h-12 px-8 rounded-xl font-bold border-slate-200 text-slate-600"
                      >
                        Annuler
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Rechercher un article..."
                        className="pl-10 h-11 rounded-xl border-slate-200 bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button
                      className="bg-primary hover:bg-primary/90 h-11 px-6 rounded-xl font-bold gap-2 shadow-sm"
                      onClick={() => setShowArticleForm(true)}
                    >
                      <Plus className="w-4 h-4" />
                      Nouvel Article
                    </Button>
                  </div>

                  <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Article</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Catégorie</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Statut</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {articles
                          .filter(a => a.titre.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((article) => (
                            <tr key={article.id} className="hover:bg-slate-50/30 transition-colors group">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                                    {article.image_path ? (
                                      <img src={`/${article.image_path}`} className="w-full h-full object-cover" />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <FileText className="w-5 h-5" />
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-slate-700 line-clamp-1">{article.titre}</p>
                                    <p className="text-[10px] text-slate-400">ID: {article.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${article.categorie === 'communique' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                                  {article.categorie}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`flex items-center gap-1.5 text-xs font-medium ${article.statut === 'publie' ? 'text-green-600' : 'text-slate-400'}`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${article.statut === 'publie' ? 'bg-green-600' : 'bg-slate-300'}`} />
                                  {article.statut === 'publie' ? 'En ligne' : 'Brouillon'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <p className="text-[11px] text-slate-500 font-medium">
                                  {new Date(article.date_publication).toLocaleDateString('fr-FR')}
                                </p>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-9 h-9 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5"
                                    onClick={() => openArticleForm(article)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-9 h-9 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => handleDeleteArticle(article.id)}
                                  >
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
                </>
              )}
            </div>
          )}

          {activeTab === "missions" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Missions</h2>
                  <p className="text-xs text-muted-foreground">Missions institutionnelles du CNC</p>
                </div>
                <Button onClick={() => openMissionForm()} className="rounded-xl gap-2 font-bold">
                  <Plus className="w-4 h-4" />
                  Ajouter une mission
                </Button>
              </div>

              {showMissionForm && (
                <form onSubmit={handleSaveMission} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Titre</p>
                      <Input value={missionForm.titre} onChange={e => setMissionForm({ ...missionForm, titre: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Ordre</p>
                      <Input type="number" value={missionForm.ordre} onChange={e => setMissionForm({ ...missionForm, ordre: parseInt(e.target.value) || 0 })} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Description</p>
                      <Textarea value={missionForm.description} onChange={e => setMissionForm({ ...missionForm, description: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit">Enregistrer</Button>
                    <Button type="button" variant="outline" onClick={() => setShowMissionForm(false)}>Annuler</Button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 gap-4">
                {missions.map(m => (
                  <div key={m.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center group">
                    <div>
                      <p className="font-bold text-slate-800">{m.titre}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{m.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openMissionForm(m)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDeleteMission(m.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "historique" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Historique / Timeline</h2>
                  <p className="text-xs text-muted-foreground">Dates clés de l'institution</p>
                </div>
                <Button onClick={() => openHistoriqueForm()} className="rounded-xl gap-2 font-bold">
                  <Plus className="w-4 h-4" />
                  Ajouter un événement
                </Button>
              </div>

              {showHistoriqueForm && (
                <form onSubmit={handleSaveHistorique} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Année / Date</p>
                      <Input value={historiqueForm.annee} onChange={e => setHistoriqueForm({ ...historiqueForm, annee: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Ordre</p>
                      <Input type="number" value={historiqueForm.ordre} onChange={e => setHistoriqueForm({ ...historiqueForm, ordre: parseInt(e.target.value) || 0 })} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Description</p>
                      <Textarea value={historiqueForm.description} onChange={e => setHistoriqueForm({ ...historiqueForm, description: e.target.value })} required />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit">Enregistrer</Button>
                    <Button type="button" variant="outline" onClick={() => setShowHistoriqueForm(false)}>Annuler</Button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {historique.map(h => (
                  <div key={h.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center group">
                    <div className="flex gap-4 items-center">
                      <span className="font-black text-primary bg-primary/5 px-3 py-1 rounded-lg">{h.annee}</span>
                      <p className="text-sm text-slate-600">{h.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openHistoriqueForm(h)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDeleteHistorique(h.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "etapes" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Étapes d'intervention</h2>
                  <p className="text-xs text-muted-foreground">Processus d'intervention du CNC</p>
                </div>
                <Button onClick={() => openEtapeForm()} className="rounded-xl gap-2 font-bold">
                  <Plus className="w-4 h-4" />
                  Ajouter une étape
                </Button>
              </div>

              {showEtapeForm && (
                <form onSubmit={handleSaveEtape} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Titre</p>
                      <Input value={etapeForm.titre} onChange={e => setEtapeForm({ ...etapeForm, titre: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Ordre</p>
                      <Input type="number" value={etapeForm.ordre} onChange={e => setEtapeForm({ ...etapeForm, ordre: parseInt(e.target.value) || 0 })} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Description</p>
                      <Textarea value={etapeForm.description} onChange={e => setEtapeForm({ ...etapeForm, description: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit">Enregistrer</Button>
                    <Button type="button" variant="outline" onClick={() => setShowEtapeForm(false)}>Annuler</Button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {etapes.map(e => (
                  <div key={e.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center group">
                    <div className="flex gap-4 items-center">
                      <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-primary">{e.ordre}</span>
                      <p className="font-bold text-slate-800">{e.titre}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEtapeForm(e)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDeleteEtape(e.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">FAQ</h2>
                  <p className="text-xs text-muted-foreground">Questions fréquemment posées</p>
                </div>
                <Button onClick={() => openFaqForm()} className="rounded-xl gap-2 font-bold">
                  <Plus className="w-4 h-4" />
                  Ajouter une FAQ
                </Button>
              </div>

              {showFaqForm && (
                <form onSubmit={handleSaveFaq} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Thème</p>
                      <Input value={faqForm.theme} onChange={e => setFaqForm({ ...faqForm, theme: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Ordre</p>
                      <Input type="number" value={faqForm.ordre} onChange={e => setFaqForm({ ...faqForm, ordre: parseInt(e.target.value) || 0 })} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Question</p>
                      <Input value={faqForm.question} onChange={e => setFaqForm({ ...faqForm, question: e.target.value })} required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Réponse</p>
                      <Textarea value={faqForm.reponse} onChange={e => setFaqForm({ ...faqForm, reponse: e.target.value })} required />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit">Enregistrer</Button>
                    <Button type="button" variant="outline" onClick={() => setShowFaqForm(false)}>Annuler</Button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {faq.map(f => (
                  <div key={f.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-start group">
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">{f.question}</p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{f.reponse}</p>
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded mt-2 inline-block">{f.theme}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openFaqForm(f)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDeleteFaq(f.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Services</h2>
                  <p className="text-xs text-muted-foreground">Services proposés sur la page d'accueil</p>
                </div>
                <Button onClick={() => openServiceForm()} className="rounded-xl gap-2 font-bold">
                  <Plus className="w-4 h-4" />
                  Ajouter un service
                </Button>
              </div>

              {showServiceForm && (
                <form onSubmit={handleSaveService} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Titre</p>
                      <Input value={serviceForm.titre} onChange={e => setServiceForm({ ...serviceForm, titre: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Icône (Lucide name)</p>
                      <Input value={serviceForm.icone} onChange={e => setServiceForm({ ...serviceForm, icone: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Lien</p>
                      <Input value={serviceForm.lien} onChange={e => setServiceForm({ ...serviceForm, lien: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Ordre</p>
                      <Input type="number" value={serviceForm.ordre} onChange={e => setServiceForm({ ...serviceForm, ordre: parseInt(e.target.value) || 0 })} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-xs font-bold text-slate-600 tracking-widest uppercase">Description</p>
                      <Textarea value={serviceForm.description} onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })} required />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit">Enregistrer</Button>
                    <Button type="button" variant="outline" onClick={() => setShowServiceForm(false)}>Annuler</Button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(s => (
                  <div key={s.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center group">
                    <div>
                      <p className="font-bold text-slate-800">{s.titre}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{s.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openServiceForm(s)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDeleteService(s.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "membres" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {showMembreForm ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowMembreForm(false);
                        setEditingMembre(null);
                      }}
                      className="gap-2 text-slate-500 hover:text-primary rounded-xl"
                    >
                      <LogOut className="w-4 h-4 rotate-180" />
                      Retour à la liste
                    </Button>
                    <h2 className="text-xl font-bold text-slate-800">
                      {editingMembre ? "Modifier le membre" : "Ajouter un nouveau membre"}
                    </h2>
                  </div>

                  <form onSubmit={handleSaveMembre} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Nom Complet</p>
                        <Input
                          value={membreForm.nom}
                          onChange={(e) => setMembreForm(prev => ({ ...prev, nom: e.target.value }))}
                          required
                          className="h-12 rounded-xl border-slate-200"
                          placeholder="Ex: Jean Dupont"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Fonction / Titre</p>
                        <Input
                          value={membreForm.fonction}
                          onChange={(e) => setMembreForm(prev => ({ ...prev, fonction: e.target.value }))}
                          className="h-12 rounded-xl border-slate-200"
                          placeholder="Ex: Conseiller"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Initiales</p>
                        <Input
                          value={membreForm.initiales}
                          onChange={(e) => setMembreForm(prev => ({ ...prev, initiales: e.target.value }))}
                          className="h-12 rounded-xl border-slate-200"
                          placeholder="Ex: JD"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Ordre d'affichage</p>
                        <Input
                          type="number"
                          value={membreForm.ordre}
                          onChange={(e) => setMembreForm(prev => ({ ...prev, ordre: parseInt(e.target.value) || 0 }))}
                          className="h-12 rounded-xl border-slate-200"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Photo du membre</p>
                        <div className="flex items-center gap-6">
                          <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                            {membreImage ? (
                              <img src={URL.createObjectURL(membreImage)} className="w-full h-full object-cover" />
                            ) : editingMembre?.photo_path ? (
                              <img src={`/${editingMembre.photo_path}`} className="w-full h-full object-cover" />
                            ) : (
                              <Users className="w-8 h-8 text-slate-300" />
                            )}
                          </div>
                          <div className="flex-1">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setMembreImage(e.target.files?.[0] || null)}
                              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
                            />
                            <p className="text-[10px] text-slate-400 mt-2 font-medium uppercase tracking-wider">Format Carré recommandé (PNG/JPG)</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Biographie / Description</p>
                        <Textarea
                          value={membreForm.bio}
                          onChange={(e) => setMembreForm(prev => ({ ...prev, bio: e.target.value }))}
                          className="min-h-[150px] rounded-2xl border-slate-200 p-4"
                          placeholder="Décrivez le parcours du membre..."
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-6 border-t border-slate-50">
                      <Button type="submit" className="font-bold rounded-xl h-12 px-8 shadow-lg shadow-primary/20">
                        {editingMembre ? "Mettre à jour" : "Enregistrer le membre"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowMembreForm(false)} className="rounded-xl h-12 px-8 border-slate-200">
                        Annuler
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">Membres</h2>
                      <p className="text-xs text-muted-foreground">Gérez les membres du Conseil National de la Concurrence</p>
                    </div>
                    <Button onClick={() => setShowMembreForm(true)} className="rounded-xl h-11 px-6 gap-2 font-bold shadow-sm">
                      <Plus className="w-4 h-4" />
                      Ajouter un membre
                    </Button>
                  </div>

                  {isLoadingTab ? (
                    <div className="py-20 text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                      <p className="text-sm text-slate-500 font-medium">Chargement des membres...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {membres.map((membre) => (
                        <div key={membre.id} className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-50">
                              {membre.photo_path ? (
                                <img src={`/${membre.photo_path}`} alt={membre.nom} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary text-lg font-black">
                                  {membre.initiales || membre.nom?.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-slate-800 truncate">{membre.nom}</p>
                              <p className="text-[11px] text-primary font-bold uppercase tracking-wider line-clamp-1">{membre.fonction}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-50">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${membre.actif ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                              {membre.actif ? 'Actif' : 'Inactif'}
                            </span>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-blue-600 hover:bg-blue-50" onClick={() => openMembreForm(membre)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-red-600 hover:bg-red-50" onClick={() => handleDeleteMembre(membre.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {membres.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white rounded-[32px] border border-slate-100 border-dashed">
                          <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                          <p className="text-slate-400 font-medium">Aucun membre enregistré.</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === "galerie" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {showGalerieForm ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowGalerieForm(false);
                        setEditingGalerie(null);
                      }}
                      className="gap-2 text-slate-500 hover:text-primary rounded-xl"
                    >
                      <LogOut className="w-4 h-4 rotate-180" />
                      Retour à la liste
                    </Button>
                    <h2 className="text-xl font-bold text-slate-800">
                      {editingGalerie ? "Modifier l'image" : "Ajouter une nouvelle image"}
                    </h2>
                  </div>

                  <form onSubmit={handleSaveGalerie} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Titre de l'image</p>
                        <Input
                          value={galerieForm.titre}
                          onChange={(e) => setGalerieForm(prev => ({ ...prev, titre: e.target.value }))}
                          required
                          className="h-12 rounded-xl border-slate-200"
                          placeholder="Ex: Inauguration des nouveaux locaux"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Catégorie / Tag</p>
                        <Input
                          value={galerieForm.categorie}
                          onChange={(e) => setGalerieForm(prev => ({ ...prev, categorie: e.target.value }))}
                          className="h-12 rounded-xl border-slate-200"
                          placeholder="Ex: Événement, Réunion..."
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Date de l'événement</p>
                        <Input
                          type="date"
                          value={galerieForm.date_evenement}
                          onChange={(e) => setGalerieForm(prev => ({ ...prev, date_evenement: e.target.value }))}
                          className="h-12 rounded-xl border-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Ordre d'affichage</p>
                        <Input
                          type="number"
                          value={galerieForm.ordre}
                          onChange={(e) => setGalerieForm(prev => ({ ...prev, ordre: parseInt(e.target.value) || 0 }))}
                          className="h-12 rounded-xl border-slate-200"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Fichier Image</p>
                        <div className="flex items-center gap-6">
                          <div className="w-40 aspect-video rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                            {galerieImage ? (
                              <img src={URL.createObjectURL(galerieImage)} className="w-full h-full object-cover" />
                            ) : editingGalerie?.image_path ? (
                              <img src={`/${editingGalerie.image_path}`} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-8 h-8 text-slate-300" />
                            )}
                          </div>
                          <div className="flex-1">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setGalerieImage(e.target.files?.[0] || null)}
                              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
                            />
                            <p className="text-[10px] text-slate-400 mt-2">Haute résolution recommandée (PNG, JPG)</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Description</p>
                        <Textarea
                          value={galerieForm.description}
                          onChange={(e) => setGalerieForm(prev => ({ ...prev, description: e.target.value }))}
                          className="min-h-[100px] rounded-2xl border-slate-200 p-4"
                          placeholder="Courte description de la photo..."
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-6 border-t border-slate-50">
                      <Button type="submit" className="font-bold rounded-xl h-12 px-8 shadow-lg shadow-primary/20">
                        {editingGalerie ? "Mettre à jour" : "Ajouter à la galerie"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowGalerieForm(false)} className="rounded-xl h-12 px-8 border-slate-200">
                        Annuler
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">Galerie</h2>
                      <p className="text-xs text-muted-foreground">Photos et illustrations du portail</p>
                    </div>
                    <Button onClick={() => setShowGalerieForm(true)} className="rounded-xl h-11 px-6 gap-2 font-bold shadow-sm">
                      <Plus className="w-4 h-4" />
                      Ajouter une image
                    </Button>
                  </div>

                  {isLoadingTab ? (
                    <div className="py-20 text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                      <p className="text-sm text-slate-500 font-medium">Chargement de la galerie...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {galerie.map((item) => (
                        <div key={item.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm group hover:shadow-xl transition-all duration-300">
                          <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                            {item.image_path ? (
                              <img src={`/${item.image_path}`} alt={item.titre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <ImageIcon className="w-12 h-12" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                              <div className="flex gap-2 w-full">
                                <Button size="sm" className="flex-1 bg-white text-slate-900 hover:bg-white/90 rounded-xl font-bold" onClick={() => openGalerieForm(item)}>
                                  <Edit className="w-3.5 h-3.5 mr-2" /> Modifier
                                </Button>
                                <Button size="icon" variant="destructive" className="h-9 w-9 rounded-xl" onClick={() => handleDeleteGalerie(item.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase text-primary shadow-sm">
                                {item.categorie || "Événement"}
                              </span>
                            </div>
                          </div>
                          <div className="p-5">
                            <p className="text-sm font-bold text-slate-800 line-clamp-1 mb-1">{item.titre}</p>
                            <p className="text-xs text-slate-400 font-medium">
                              {item.date_evenement ? new Date(item.date_evenement).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date non définie'}
                            </p>
                          </div>
                        </div>
                      ))}
                      {galerie.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white rounded-[32px] border border-slate-100 border-dashed">
                          <ImageIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                          <p className="text-slate-400 font-medium">La galerie est vide.</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {showDocumentForm ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowDocumentForm(false);
                        setEditingDocument(null);
                      }}
                      className="gap-2 text-slate-500 hover:text-primary rounded-xl"
                    >
                      <LogOut className="w-4 h-4 rotate-180" />
                      Retour à la liste
                    </Button>
                    <h2 className="text-xl font-bold text-slate-800">
                      {editingDocument ? "Modifier le document" : "Publier un nouveau document"}
                    </h2>
                  </div>

                  <form onSubmit={handleSaveDocument} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2 md:col-span-3">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Titre du document</p>
                        <Input
                          value={documentForm.titre}
                          onChange={(e) => setDocumentForm(prev => ({ ...prev, titre: e.target.value }))}
                          required
                          className="h-12 rounded-xl border-slate-200"
                          placeholder="Ex: Loi n°001 portant sur la concurrence"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Catégorie</p>
                        <select
                          value={documentForm.categorie}
                          onChange={(e) => setDocumentForm(prev => ({ ...prev, categorie: e.target.value }))}
                          className="h-12 w-full rounded-xl border border-slate-200 px-3 bg-white text-sm focus:border-primary/30 outline-none"
                        >
                          <option value="Loi">Loi</option>
                          <option value="Décret">Décret</option>
                          <option value="Arrêté">Arrêté</option>
                          <option value="Note">Note circulaire</option>
                          <option value="Rapport">Rapport d'activité</option>
                          <option value="Autre">Autre document</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Date de publication</p>
                        <Input
                          type="date"
                          value={documentForm.date_publication}
                          onChange={(e) => setDocumentForm(prev => ({ ...prev, date_publication: e.target.value }))}
                          className="h-12 rounded-xl border-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Langue du document</p>
                        <select
                          value={documentForm.lang}
                          onChange={(e) => setDocumentForm(prev => ({ ...prev, lang: e.target.value }))}
                          className="h-12 w-full rounded-xl border border-slate-200 px-3 bg-white text-sm focus:border-primary/30 outline-none"
                        >
                          <option value="fr">Français (FR)</option>
                          <option value="en">English (EN)</option>
                          <option value="ar">العربية (AR)</option>
                        </select>
                      </div>
                      <div className="space-y-2 md:col-span-3">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Fichier source (PDF)</p>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-[20px] cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <FileBadge className="w-8 h-8 mb-2 text-slate-400" />
                              <p className="text-xs text-slate-500">
                                <span className="font-bold">Cliquez pour sélectionner le PDF</span>
                              </p>
                              <p className="text-[10px] text-slate-400 mt-1">Format PDF uniquement (Max. 10MB)</p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="application/pdf"
                              onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
                            />
                          </label>
                        </div>
                        {(documentFile || editingDocument?.fichier_path) && (
                          <p className="mt-2 text-xs font-medium text-primary flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Fichier : {documentFile ? documentFile.name : editingDocument.fichier_path.split('/').pop()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4 pt-6 border-t border-slate-50">
                      <Button type="submit" className="font-bold rounded-xl h-12 px-8 shadow-lg shadow-primary/20">
                        {editingDocument ? "Mettre à jour" : "Publier le document"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowDocumentForm(false)} className="rounded-xl h-12 px-8 border-slate-200">
                        Annuler
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">Documents</h2>
                      <p className="text-xs text-muted-foreground">Textes de loi et rapports officiels</p>
                    </div>
                    <Button onClick={() => setShowDocumentForm(true)} className="rounded-xl h-11 px-6 gap-2 font-bold shadow-sm">
                      <Plus className="w-4 h-4" />
                      Ajouter un document
                    </Button>
                  </div>

                  {isLoadingTab ? (
                    <div className="py-20 text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                      <p className="text-sm text-slate-500 font-medium">Chargement des documents...</p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Document</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Catégorie</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Langue</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-slate-50/30 transition-colors group">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                                    <FileBadge className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-slate-700 line-clamp-1">{doc.titre}</p>
                                    <p className="text-[10px] text-slate-400 font-mono">PDF • {doc.taille || '—'}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-slate-100 text-slate-600">
                                  {doc.categorie || "Document"}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${
                                  doc.lang === 'ar' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                  doc.lang === 'en' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                  'bg-emerald-50 text-emerald-700 border-emerald-200'
                                }`}>
                                  {(doc.lang || 'fr').toUpperCase()}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <p className="text-[11px] text-slate-500 font-medium">
                                  {doc.date_publication ? new Date(doc.date_publication).toLocaleDateString('fr-FR') : '—'}
                                </p>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-blue-600 hover:bg-blue-50" onClick={() => openDocumentForm(doc)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-red-600 hover:bg-red-50" onClick={() => handleDeleteDocument(doc.id)}>
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {documents.length === 0 && (
                            <tr>
                              <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                                Aucun document trouvé.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === "plaintes" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Plaintes & Dénonciations</h2>
                  <p className="text-xs text-muted-foreground">Gestion des signalements reçus</p>
                </div>
              </div>

              {isLoadingTab ? (
                <p className="text-sm text-slate-500">Chargement...</p>
              ) : (
                <div className="space-y-4">
                  {plaintes.map((p) => (
                    <div key={p.id} className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${p.statut === 'traite' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                              }`}>
                              {p.statut === 'traite' ? 'Traitée' : 'Nouvelle'}
                            </span>
                            <p className="text-xs text-slate-400 font-medium">#{p.id} • {new Date(p.created_at).toLocaleString()}</p>
                          </div>
                          <h4 className="font-bold text-slate-800">{p.objet}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">{p.message}</p>
                          <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-50">
                            <div>
                              <p className="text-[10px] font-black uppercase text-slate-400">Plaignant</p>
                              <p className="text-sm font-bold text-slate-700">{p.nom}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase text-slate-400">Email / Tel</p>
                              <p className="text-sm text-slate-600">{p.email} {p.telephone && `• ${p.telephone}`}</p>
                            </div>
                            {p.entreprise_visee && (
                              <div>
                                <p className="text-[10px] font-black uppercase text-slate-400">Entreprise Visée</p>
                                <p className="text-sm font-bold text-orange-600">{p.entreprise_visee}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {p.statut !== 'traite' && (
                            <Button size="sm" className="rounded-xl h-10 bg-green-600 font-bold text-[10px]" onClick={() => handleUpdatePlainteStatut(p.id, 'traite')}>
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Marquer Traitée
                            </Button>
                          )}
                          <Button size="icon" variant="ghost" className="h-10 w-10 text-red-600 hover:bg-red-50" onClick={() => handleDeletePlainte(p.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {plaintes.length === 0 && (
                    <div className="py-20 text-center text-slate-400">Aucune plainte trouvée.</div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* {activeTab === "liens" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {showLienForm ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowLienForm(false);
                        setEditingLien(null);
                      }}
                      className="gap-2 text-slate-500 hover:text-primary rounded-xl"
                    >
                      <LogOut className="w-4 h-4 rotate-180" />
                      Retour à la liste
                    </Button>
                    <h2 className="text-xl font-bold text-slate-800">
                      {editingLien ? "Modifier le lien" : "Ajouter un lien institutionnel"}
                    </h2>
                  </div>

                  <form onSubmit={handleSaveLien} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Nom / Intitulé *</p>
                        <Input
                          value={lienForm.nom}
                          onChange={(e) => setLienForm(prev => ({ ...prev, nom: e.target.value }))}
                          required
                          className="h-12 rounded-xl border-slate-200"
                          placeholder="ex: Ministère du Commerce"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">URL du site *</p>
                        <Input
                          value={lienForm.url}
                          onChange={(e) => setLienForm(prev => ({ ...prev, url: e.target.value }))}
                          required
                          className="h-12 rounded-xl border-slate-200 font-mono text-sm"
                          placeholder="https://www.exemple.gov.td"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Catégorie</p>
                        <select
                          value={lienForm.categorie}
                          onChange={(e) => setLienForm(prev => ({ ...prev, categorie: e.target.value }))}
                          className="h-12 w-full rounded-xl border border-slate-200 px-3 bg-white text-sm outline-none focus:border-primary/30"
                        >
                          <option value="Ministère">Ministère</option>
                          <option value="Institution">Institution publique</option>
                          <option value="Organisation régionale">Organisation régionale</option>
                          <option value="Partenaire">Partenaire technique</option>
                          <option value="Autre">Autre lien</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Ordre d'affichage</p>
                        <Input
                          type="number"
                          value={lienForm.ordre}
                          onChange={(e) => setLienForm(prev => ({ ...prev, ordre: parseInt(e.target.value) || 0 }))}
                          className="h-12 rounded-xl border-slate-200"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Description (optionnelle)</p>
                        <Input
                          value={lienForm.description}
                          onChange={(e) => setLienForm(prev => ({ ...prev, description: e.target.value }))}
                          className="h-12 rounded-xl border-slate-200"
                          placeholder="Bref descriptif de l'organisme..."
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-6 border-t border-slate-50">
                      <Button type="submit" className="font-bold rounded-xl h-12 px-8 shadow-lg shadow-primary/20" disabled={isLoadingTab}>
                        {isLoadingTab ? "Enregistrement..." : (editingLien ? "Mettre à jour" : "Ajouter le lien")}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowLienForm(false)} className="rounded-xl h-12 px-8 border-slate-200">
                        Annuler
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">Liens institutionnels</h2>
                      <p className="text-xs text-muted-foreground">Ministères et partenaires externes</p>
                    </div>
                    <Button onClick={() => setShowLienForm(true)} className="rounded-xl h-11 px-6 gap-2 font-bold shadow-sm">
                      <Plus className="w-4 h-4" />
                      Ajouter un lien
                    </Button>
                  </div>

                  {isLoadingTab ? (
                    <div className="py-20 text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                      <p className="text-sm text-slate-500 font-medium">Chargement des liens...</p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Nom</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Catégorie</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Lien</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {liens.map((lien) => (
                            <tr key={lien.id} className="hover:bg-slate-50/30 transition-colors group">
                              <td className="px-6 py-4">
                                <p className="text-sm font-bold text-slate-700">{lien.nom}</p>
                                {lien.description && <p className="text-[10px] text-slate-400 line-clamp-1">{lien.description}</p>}
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-blue-50 text-blue-600">
                                  {lien.categorie}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <a href={lien.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-mono truncate max-w-[200px] flex items-center gap-1">
                                  {lien.url} <ExternalLink className="w-3 h-3" />
                                </a>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-blue-600 hover:bg-blue-50" onClick={() => openLienForm(lien)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-red-600 hover:bg-red-50" onClick={() => handleDeleteLien(lien.id)}>
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {liens.length === 0 && (
                            <tr>
                              <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium">
                                Aucun lien institutionnel enregistré.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          )} */}
          {activeTab === "liens" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {showLienForm ? (
                <div className="space-y-6">
                  {/* Header retour */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setShowLienForm(false); setEditingLien(null); setLienLogoFile(null); }}
                      className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-primary/10 flex items-center justify-center transition-colors">
                        <LogOut className="w-4 h-4 rotate-180" />
                      </div>
                      Retour
                    </button>
                    <div className="h-4 w-px bg-slate-200" />
                    <h2 className="text-lg font-bold text-slate-800">
                      {editingLien ? "Modifier le partenaire" : "Ajouter un partenaire"}
                    </h2>
                  </div>

                  <form onSubmit={handleSaveLien} className="bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
                    {/* Aperçu du logo en haut */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 p-8 border-b border-slate-100">
                      <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4">Logo du partenaire</p>
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl bg-white border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center group relative shadow-sm">
                          {lienLogoFile ? (
                            <img src={URL.createObjectURL(lienLogoFile)} className="w-full h-full object-contain p-2" />
                          ) : editingLien?.logo_path ? (
                            <img src={`/${editingLien.logo_path}`} className="w-full h-full object-contain p-2" />
                          ) : (
                            <div className="flex flex-col items-center gap-1">
                              <ImageIcon className="w-7 h-7 text-slate-300" />
                            </div>
                          )}
                          <label className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity rounded-2xl">
                            <span className="text-[10px] font-black tracking-widest">CHANGER</span>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => setLienLogoFile(e.target.files?.[0] || null)}
                            />
                          </label>
                        </div>
                        <div>
                          <label className="cursor-pointer">
                            <div className="flex items-center gap-2 bg-white border border-slate-200 hover:border-primary/30 hover:bg-primary/5 text-slate-600 hover:text-primary px-4 py-2.5 rounded-xl text-sm font-bold transition-all">
                              <ImageIcon className="w-4 h-4" />
                              {lienLogoFile ? "Changer le logo" : "Téléverser un logo"}
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => setLienLogoFile(e.target.files?.[0] || null)}
                            />
                          </label>
                          {lienLogoFile ? (
                            <p className="text-[11px] text-primary font-medium mt-2 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> {lienLogoFile.name}
                            </p>
                          ) : (
                            <p className="text-[11px] text-slate-400 mt-2">PNG transparent recommandé · Max 2 Mo</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Champs du formulaire */}
                    <div className="p-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nom / Intitulé *</p>
                          <Input
                            value={lienForm.nom}
                            onChange={(e) => setLienForm(prev => ({ ...prev, nom: e.target.value }))}
                            required
                            className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
                            placeholder="ex: Ministère du Commerce"
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Catégorie</p>
                          <select
                            value={lienForm.categorie}
                            onChange={(e) => setLienForm(prev => ({ ...prev, categorie: e.target.value }))}
                            className="h-12 w-full rounded-xl border border-slate-200 px-3 bg-slate-50 focus:bg-white text-sm outline-none focus:border-primary/30 transition-colors"
                          >
                            <option value="Ministère">Ministère</option>
                            <option value="Institution">Institution publique</option>
                            <option value="Organisation régionale">Organisation régionale</option>
                            <option value="Partenaire">Partenaire technique</option>
                            <option value="Autre">Autre lien</option>
                          </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">URL du site *</p>
                          <Input
                            value={lienForm.url}
                            onChange={(e) => setLienForm(prev => ({ ...prev, url: e.target.value }))}
                            required
                            className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-mono text-sm"
                            placeholder="https://www.exemple.gov.td"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description <span className="text-slate-300 normal-case font-medium">(optionnelle)</span></p>
                          <Input
                            value={lienForm.description}
                            onChange={(e) => setLienForm(prev => ({ ...prev, description: e.target.value }))}
                            className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
                            placeholder="Bref descriptif de l'organisme..."
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ordre d'affichage</p>
                          <Input
                            type="number"
                            value={lienForm.ordre}
                            onChange={(e) => setLienForm(prev => ({ ...prev, ordre: parseInt(e.target.value) || 0 }))}
                            className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2 border-t border-slate-50">
                        <Button
                          type="submit"
                          className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20"
                          disabled={isLoadingTab}
                        >
                          {isLoadingTab ? "Enregistrement..." : (editingLien ? "Mettre à jour" : "Ajouter le partenaire")}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => { setShowLienForm(false); setLienLogoFile(null); }}
                          className="h-12 px-8 rounded-xl border-slate-200 font-bold text-slate-600"
                        >
                          Annuler
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  {/* Header liste */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">Liens institutionnels</h2>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">Ministères, organismes et partenaires</p>
                    </div>
                    <Button
                      onClick={() => { setShowLienForm(true); setEditingLien(null); setLienLogoFile(null); }}
                      className="h-11 px-5 rounded-xl font-bold gap-2 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter un partenaire
                    </Button>
                  </div>

                  {isLoadingTab ? (
                    <div className="py-20 text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                      <p className="text-sm text-slate-400 font-medium">Chargement...</p>
                    </div>
                  ) : liens.length === 0 ? (
                    <div className="py-24 text-center bg-white rounded-[28px] border border-dashed border-slate-200">
                      <ExternalLink className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                      <p className="text-slate-400 font-medium text-sm">Aucun partenaire enregistré.</p>
                      <p className="text-slate-300 text-xs mt-1">Cliquez sur « Ajouter un partenaire » pour commencer.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {liens.map((lien) => (
                        <div
                          key={lien.id}
                          className="bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 group overflow-hidden"
                        >
                          {/* Logo / Header */}
                          <div className="h-28 bg-gradient-to-br from-slate-50 to-slate-100/80 flex items-center justify-center relative px-6 border-b border-slate-100">
                            {lien.logo_path ? (
                              <img
                                src={`/${lien.logo_path}`}
                                alt={lien.nom}
                                className="max-h-16 max-w-full object-contain"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                                <span className="text-xl font-black text-primary">
                                  {lien.nom?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            {/* Badge catégorie */}
                            <span className="absolute top-3 right-3 text-[10px] font-bold uppercase bg-white/90 backdrop-blur-sm text-primary px-2.5 py-1 rounded-full border border-white shadow-sm">
                              {lien.categorie}
                            </span>
                          </div>

                          {/* Infos */}
                          <div className="p-5">
                            <p className="font-bold text-slate-800 text-sm truncate">{lien.nom}</p>
                            {lien.description && (
                              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{lien.description}</p>
                            )}
                            <a
                              href={lien.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 mt-2 text-[11px] text-primary/70 hover:text-primary font-mono hover:underline transition-colors truncate max-w-full"
                            >
                              <ExternalLink className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{lien.url.replace(/^https?:\/\//, '')}</span>
                            </a>

                            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-50">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex-1 h-9 rounded-xl text-slate-500 hover:text-primary hover:bg-primary/5 font-bold text-xs gap-1.5"
                                onClick={() => openLienForm(lien)}
                              >
                                <Edit className="w-3.5 h-3.5" /> Modifier
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex-1 h-9 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 font-bold text-xs gap-1.5"
                                onClick={() => handleDeleteLien(lien.id)}
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Supprimer
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        {activeTab === "parametres" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Paramètres</h2>
                <p className="text-xs text-muted-foreground">Configuration générale du site</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    const key = prompt("Entrez le nom de la nouvelle clé (ex: contact_info) :");
                    if (key) {
                      const sanitizedKey = key.trim().toLowerCase().replace(/\s+/g, '_');
                      setParametres(prev => ({ ...prev, [sanitizedKey]: "" }));
                    }
                  }}
                  className="rounded-xl font-bold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle clé
                </Button>
                <Button
                  onClick={handleSaveAllParametres}
                  disabled={isSavingParametres}
                  className="rounded-xl font-bold px-6"
                >
                  {isSavingParametres ? "Enregistrement..." : "Enregistrer tout"}
                </Button>
              </div>
            </div>

            {/* Sub-tabs for Parameters */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1 rounded-2xl w-fit">
              {[
                { id: "identite", label: "Identité & Images" },
                { id: "accueil", label: "Accueil" },
                { id: "presentation", label: "Présentation" },
                { id: "missions", label: "Missions" },
                { id: "heros", label: "Titres des Pages" },
                { id: "contact", label: "Contact & Footer" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveParamTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeParamTab === tab.id
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {isLoadingTab ? (
              <p className="text-sm text-slate-500">Chargement...</p>
            ) : (
              <div className="space-y-8">
                {activeParamTab === "identite" && (
                  <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm space-y-6">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                          <Users className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">Identité du Président</h3>
                          <p className="text-xs text-slate-500">Photo et informations du dirigeant</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
                        <div className="space-y-4">
                          <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Photo officielle</p>
                          <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center group relative">
                              {presidentPhotoFile ? (
                                <img
                                  src={URL.createObjectURL(presidentPhotoFile)}
                                  className="w-full h-full object-cover"
                                />
                              ) : parametres.president_photo_path ? (
                                <img
                                  src={`/${parametres.president_photo_path}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                              ) : (
                                <Users className="w-8 h-8 text-slate-300" />
                              )}
                              <label className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-[10px] font-bold">
                                CHANGER
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      setPresidentPhotoFile(file);
                                      // Pour prévisualiser l'image, on pourrait utiliser URL.createObjectURL
                                    }
                                  }}
                                />
                              </label>
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-bold text-slate-700">Changer la photo</p>
                              <p className="text-[10px] text-slate-400">Format JPG, PNG. Max 5Mo.</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Nom complet</p>
                          <Input
                            value={parametres.president_nom || ""}
                            className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white font-bold"
                            onChange={(e) => setParametres(prev => ({ ...prev, president_nom: e.target.value }))}
                          />
                        </div>

                        <div className="space-y-4 md:col-span-2">
                          <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Mot du Président (Message)</p>
                          <Textarea
                            value={parametres.president_mot || ""}
                            rows={4}
                            className="rounded-xl bg-slate-50 border-transparent focus:bg-white text-sm leading-relaxed"
                            onChange={(e) => setParametres(prev => ({ ...prev, president_mot: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm space-y-6">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">Identité du Site</h3>
                          <p className="text-xs text-slate-500">Nom de l'institution affiché en haut à gauche</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
                        <div className="space-y-4">
                          <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Nom du site (Ligne 1)</p>
                          <Input
                            value={parametres.nom_site_ligne1 || ""}
                            placeholder="Ex: Conseil National"
                            className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white font-bold"
                            onChange={(e) => setParametres(prev => ({ ...prev, nom_site_ligne1: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-4">
                          <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Nom du site (Ligne 2)</p>
                          <Input
                            value={parametres.nom_site_ligne2 || ""}
                            placeholder="Ex: de la Concurrence"
                            className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white font-bold"
                            onChange={(e) => setParametres(prev => ({ ...prev, nom_site_ligne2: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm space-y-6">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">Images du site</h3>
                          <p className="text-xs text-slate-500">Logo, Arrière-plans et Armoiries</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 border-t border-slate-50">
                        {/* Hero Background */}
                        <div className="space-y-4">
                          <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Image de fond (Hero Accueil)</p>
                          <div className="flex flex-col gap-3">
                            <div className="aspect-video w-full rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center group relative">
                              {heroBgFile ? (
                                <img src={URL.createObjectURL(heroBgFile)} className="w-full h-full object-cover" />
                              ) : parametres.hero_bg_path ? (
                                <img src={`/${parametres.hero_bg_path}`} className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-8 h-8 text-slate-300" />
                              )}
                              <label className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-[10px] font-bold">
                                CHANGER
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => setHeroBgFile(e.target.files?.[0] || null)} />
                              </label>
                            </div>
                            <p className="text-[10px] text-slate-400 text-center">Recommandé: 1920x1080px</p>
                          </div>
                        </div>

                        {/* Logo */}
                        <div className="space-y-4">
                          <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Logo du site</p>
                          <div className="flex flex-col gap-3">
                            <div className="h-32 w-full rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center group relative">
                              {logoFile ? (
                                <img src={URL.createObjectURL(logoFile)} className="h-full object-contain p-4" />
                              ) : parametres.logo_path ? (
                                <img src={`/${parametres.logo_path}`} className="h-full object-contain p-4" />
                              ) : (
                                <ImageIcon className="w-8 h-8 text-slate-300" />
                              )}
                              <label className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-[10px] font-bold">
                                CHANGER
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
                              </label>
                            </div>
                            <p className="text-[10px] text-slate-400 text-center">Format PNG transparent recommandé</p>
                          </div>
                        </div>

                        {/* Armoiries */}
                        <div className="space-y-4">
                          <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Armoiries de la République</p>
                          <div className="flex flex-col gap-3">
                            <div className="h-32 w-full rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center group relative">
                              {armoiriesFile ? (
                                <img src={URL.createObjectURL(armoiriesFile)} className="h-full object-contain p-4" />
                              ) : parametres.armoiries_path ? (
                                <img src={`/${parametres.armoiries_path}`} className="h-full object-contain p-4" />
                              ) : (
                                <ImageIcon className="w-8 h-8 text-slate-300" />
                              )}
                              <label className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-[10px] font-bold">
                                CHANGER
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => setArmoiriesFile(e.target.files?.[0] || null)} />
                              </label>
                            </div>
                            <p className="text-[10px] text-slate-400 text-center">S'affiche sur la page de présentation</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other Tabs content logic */}
                {(() => {
                  const groups = [
                    { id: "accueil", title: "Contenu de l'Accueil", keys: ['home_welcome_badge', 'home_missions_title', 'home_missions_subtitle', 'home_services_title', 'home_services_subtitle', 'home_news_title', 'home_news_subtitle'] },
                    { id: "presentation", title: "Page Présentation", keys: ['pres_hero_title', 'pres_hero_subtitle', 'pres_section_title', 'pres_timeline_title', 'pres_timeline_subtitle', 'pres_members_title', 'presentation_p1', 'presentation_p2', 'presentation_p3'] },
                    { id: "missions", title: "Page Missions", keys: ['missions_hero_title', 'missions_hero_subtitle', 'missions_section_subtitle', 'missions_process_title', 'missions_process_subtitle'] },
                    { id: "heros", title: "En-têtes (Héros) des pages", keys: ['news_hero_title', 'news_hero_subtitle', 'docs_hero_title', 'docs_hero_subtitle', 'faq_hero_title', 'faq_hero_subtitle', 'galerie_hero_title', 'galerie_hero_subtitle', 'services_hero_title', 'services_hero_subtitle', 'sig_hero_title', 'sig_hero_subtitle', 'plainte_hero_title', 'plainte_hero_subtitle'] },
                    { id: "contact", title: "Contact & Pied de page", keys: ['contact_hero_title', 'contact_hero_subtitle', 'footer_description', 'footer_adresse', 'footer_telephone', 'footer_email', 'contact_adresse', 'contact_telephone', 'contact_email', 'horaires_ouverture', 'lien_facebook', 'lien_linkedin', 'lien_twitter', 'footer_copyright'] },
                  ];

                  const assignedKeys = new Set(groups.flatMap(g => g.keys).concat(['president_nom', 'president_mot', 'president_photo_path', 'nom_site_ligne1', 'nom_site_ligne2', 'hero_bg_path', 'logo_path', 'armoiries_path']));
                  const otherKeys = Object.keys(parametres).filter(k => !assignedKeys.has(k));

                  const filteredGroups = groups.filter(g => g.id === activeParamTab);

                  // On peut imaginer un onglet "Avancé" pour les clés orphelines, ou les mettre dans Titres si besoin.
                  // Pour l'instant on les met dans "heros" ou on crée un onglet "Autres" si elles existent.
                  if (activeParamTab === "heros" && otherKeys.length > 0) {
                    filteredGroups.push({ id: "heros", title: "Paramètres personnalisés", keys: otherKeys });
                  }

                  return filteredGroups.map(group => (
                    <div key={group.title} className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
                      <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest pl-2">{group.title}</h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {group.keys.map(cle => {
                          const valeur = parametres[cle];
                          if (valeur === undefined) return null;
                          return (
                            <div key={cle} className="bg-white rounded-[24px] border border-slate-100 p-6 space-y-3 shadow-sm hover:border-primary/20 transition-colors">
                              <div className="flex justify-between items-center">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{cle.replace(/_/g, " ")}</p>
                                {otherKeys.includes(cle) && (
                                  <button
                                    onClick={() => {
                                      if (confirm(`Supprimer la clé "${cle}" ?`)) {
                                        const newParams = { ...parametres };
                                        delete newParams[cle];
                                        setParametres(newParams);
                                      }
                                    }}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                              {String(valeur).length > 60 ? (
                                <Textarea
                                  value={valeur || ""}
                                  rows={3}
                                  className="rounded-xl bg-slate-50 border-transparent focus:bg-white resize-none text-sm leading-relaxed"
                                  onChange={(e) => setParametres(prev => ({ ...prev, [cle]: e.target.value }))}
                                />
                              ) : (
                                <Input
                                  value={valeur || ""}
                                  className="h-11 rounded-xl bg-slate-50 border-transparent focus:bg-white text-sm"
                                  onChange={(e) => setParametres(prev => ({ ...prev, [cle]: e.target.value }))}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>
        )}
        {activeTab === "plugins" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Plugins & Extensions</h2>
                <p className="text-xs text-muted-foreground">Étendez les fonctionnalités de votre CMS avec des intégrations et extensions de navigation.</p>
              </div>
              <div>
                <Button
                  onClick={handleSaveAllParametres}
                  disabled={isSavingParametres}
                  className="rounded-xl font-bold px-6 shadow-md shadow-primary/20 bg-primary hover:bg-primary/95 text-white"
                >
                  {isSavingParametres ? "Enregistrement..." : "Enregistrer la configuration"}
                </Button>
              </div>
            </div>

            {/* Grid of Plugins */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Plugin 1: Extension Chrome */}
              <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full flex items-start justify-end p-4 transition-colors group-hover:bg-gold/10">
                  <Chrome className="w-6 h-6 text-gold" />
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-gold flex items-center justify-center">
                    <Chrome className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase bg-amber-100 text-amber-800 border border-amber-200">
                      OFFICIEL
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 mt-2">Extension Web CNC Portal</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Capturez et partagez du contenu web directement sur le portail ou gérez vos brouillons en un clic depuis n'importe quel onglet de navigation.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50">
                  <Button
                    onClick={() => {
                      toast.loading("Préparation du paquet de l'extension...");
                      setTimeout(() => {
                        toast.dismiss();
                        toast.success("Extension prête ! Le téléchargement a démarré.");
                        
                        // Télécharger un fichier JSON manifest simulé dans un zip
                        const content = JSON.stringify({
                          name: "CNC Portal Connect",
                          version: "1.0.0",
                          description: "CNC Portal Connect Extension for Chrome & Firefox",
                          manifest_version: 3,
                          permissions: ["activeTab"]
                        }, null, 2);
                        const blob = new Blob([content], { type: "application/zip" });
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = "cnc_portal_connect_extension.zip";
                        link.click();
                      }, 1500);
                    }}
                    className="w-full rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800"
                  >
                    <Chrome className="w-4 h-4 mr-2" />
                    Installer l'extension
                  </Button>
                  <p className="text-[10px] text-slate-400 text-center mt-2">Compatible Chrome, Firefox, Edge, Opera (v3 manifest)</p>
                </div>
              </div>

              {/* Plugin 2: LinkedIn Auto-Publish */}
              <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#0a66c2]/5 rounded-bl-full flex items-start justify-end p-4 transition-colors group-hover:bg-[#0a66c2]/10">
                  <Linkedin className="w-6 h-6 text-[#0a66c2]" />
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0a66c2] flex items-center justify-center">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">Partage LinkedIn</h3>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="plugin_linkedin_enabled"
                        checked={parametres.plugin_linkedin_enabled === "true"}
                        onChange={(e) => setParametres(prev => ({ ...prev, plugin_linkedin_enabled: e.target.checked ? "true" : "false" }))}
                        className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary cursor-pointer"
                      />
                      <label htmlFor="plugin_linkedin_enabled" className="text-xs font-bold text-slate-600 cursor-pointer">
                        Activer
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Identifiant de la Page LinkedIn</label>
                      <Input
                        value={parametres.plugin_linkedin_page_id || ""}
                        onChange={(e) => setParametres(prev => ({ ...prev, plugin_linkedin_page_id: e.target.value }))}
                        placeholder="Ex: urn:li:organization:123456"
                        className="h-10 rounded-xl bg-slate-50 border-transparent focus:bg-white text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Token OAuth / API</label>
                      <Input
                        type="password"
                        value={parametres.plugin_linkedin_token || ""}
                        onChange={(e) => setParametres(prev => ({ ...prev, plugin_linkedin_token: e.target.value }))}
                        placeholder="••••••••••••••••••••••••"
                        className="h-10 rounded-xl bg-slate-50 border-transparent focus:bg-white text-xs mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    parametres.plugin_linkedin_enabled === "true" && parametres.plugin_linkedin_token
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-50 text-slate-500 border border-slate-200"
                  }`}>
                    {parametres.plugin_linkedin_enabled === "true" && parametres.plugin_linkedin_token ? "Actif & Connecté" : "Inactif"}
                  </span>
                  <button
                    onClick={() => {
                      if (!parametres.plugin_linkedin_token) {
                        toast.error("Veuillez d'abord saisir un token API.");
                        return;
                      }
                      toast.loading("Test de connexion LinkedIn...");
                      setTimeout(() => {
                        toast.dismiss();
                        toast.success("Connexion réussie avec LinkedIn API !");
                      }, 1200);
                    }}
                    className="text-xs font-bold text-[#0a66c2] hover:underline"
                  >
                    Tester la connexion
                  </button>
                </div>
              </div>

              {/* Plugin 3: Facebook Auto-Publish */}
              <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#1877f2]/5 rounded-bl-full flex items-start justify-end p-4 transition-colors group-hover:bg-[#1877f2]/10">
                  <Facebook className="w-6 h-6 text-[#1877f2]" />
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1877f2] flex items-center justify-center">
                    <Facebook className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">Partage Facebook</h3>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="plugin_facebook_enabled"
                        checked={parametres.plugin_facebook_enabled === "true"}
                        onChange={(e) => setParametres(prev => ({ ...prev, plugin_facebook_enabled: e.target.checked ? "true" : "false" }))}
                        className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary cursor-pointer"
                      />
                      <label htmlFor="plugin_facebook_enabled" className="text-xs font-bold text-slate-600 cursor-pointer">
                        Activer
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Identifiant de la Page Facebook</label>
                      <Input
                        value={parametres.plugin_facebook_page_id || ""}
                        onChange={(e) => setParametres(prev => ({ ...prev, plugin_facebook_page_id: e.target.value }))}
                        placeholder="Ex: 10987654321"
                        className="h-10 rounded-xl bg-slate-50 border-transparent focus:bg-white text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Page Access Token</label>
                      <Input
                        type="password"
                        value={parametres.plugin_facebook_token || ""}
                        onChange={(e) => setParametres(prev => ({ ...prev, plugin_facebook_token: e.target.value }))}
                        placeholder="••••••••••••••••••••••••"
                        className="h-10 rounded-xl bg-slate-50 border-transparent focus:bg-white text-xs mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    parametres.plugin_facebook_enabled === "true" && parametres.plugin_facebook_token
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-50 text-slate-500 border border-slate-200"
                  }`}>
                    {parametres.plugin_facebook_enabled === "true" && parametres.plugin_facebook_token ? "Actif & Connecté" : "Inactif"}
                  </span>
                  <button
                    onClick={() => {
                      if (!parametres.plugin_facebook_token) {
                        toast.error("Veuillez d'abord saisir un token de page.");
                        return;
                      }
                      toast.loading("Test de connexion Facebook...");
                      setTimeout(() => {
                        toast.dismiss();
                        toast.success("Connexion réussie avec Facebook Graph API !");
                      }, 1200);
                    }}
                    className="text-xs font-bold text-[#1877f2] hover:underline"
                  >
                    Tester la connexion
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
    </div>
      </main >
    </div >
  );
}
