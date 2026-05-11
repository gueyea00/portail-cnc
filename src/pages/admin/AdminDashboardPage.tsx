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
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type TabType = "dashboard" | "articles" | "membres" | "galerie" | "documents" | "plaintes" | "liens" | "missions" | "historique" | "etapes" | "faq" | "services" | "parametres";


export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [articles, setArticles] = useState<any[]>([]);
  const [membres, setMembres] = useState<any[]>([]);
  const [galerie, setGalerie] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [plaintes, setPlaintes] = useState<any[]>([]);
  const [parametres, setParametres] = useState<Record<string, string>>({});
  const [presidentPhotoFile, setPresidentPhotoFile] = useState<File | null>(null);
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
  });
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [editingDocument, setEditingDocument] = useState<any>(null);

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
      const res = await authFetch("/api/articles/admin/all");
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
      const res = await fetch("/api/membres");
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
      const res = await authFetch("/api/galerie/admin/all");
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
      const res = await authFetch("/api/plaintes/admin/all");
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
      const res = await fetch("/api/missions");
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
      const res = await authFetch("/api/missions/admin/historique");
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
      const res = await authFetch("/api/missions/admin/etapes");
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
      const res = await fetch("/api/faq");
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
      const res = await fetch("/api/services");
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
      const res = await authFetch(`/api/membres/admin/${id}`, { method: "DELETE" });
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
      const res = await authFetch(`/api/galerie/admin/${id}`, { method: "DELETE" });
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
      });
    } else {
      setEditingDocument(null);
      setDocumentForm({
        titre: "",
        categorie: "Loi",
        type_fichier: "PDF",
        taille: "",
        date_publication: "",
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
      const res = await authFetch(`/api/documents/admin/${id}`, { method: "DELETE" });
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
      const res = await fetch("/api/documents");
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
      const res = await authFetch(`/api/plaintes/admin/${id}/statut`, {
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
      const res = await authFetch(`/api/plaintes/admin/${id}`, { method: "DELETE" });
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
      const res = await fetch("/api/parametres");
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
        'nom_site_ligne1', 'nom_site_ligne2', 'president_nom', 'president_photo_path', 'horaires_ouverture', 'lien_facebook', 'lien_linkedin', 'lien_twitter'
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

  const fetchLiens = async () => {
    setIsLoadingTab(true);
    try {
      const res = await fetch("/api/liens");
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
      setLienForm({ nom: lien.nom, url: lien.url, description: lien.description || "", categorie: lien.categorie || "Ministère", ordre: lien.ordre || 0 });
    } else {
      setEditingLien(null);
      setLienForm({ nom: "", url: "", description: "", categorie: "Ministère", ordre: 0 });
    }
    setShowLienForm(true);
  };

  const handleSaveLien = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingTab(true);
    try {
      const url = editingLien ? `/api/liens/admin/${editingLien.id}` : "/api/liens/admin";
      const method = editingLien ? "PUT" : "POST";
      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lienForm),
      });
      if (!res.ok) throw new Error("Erreur enregistrement");
      toast.success(editingLien ? "Lien mis à jour" : "Lien ajouté");
      setShowLienForm(false);
      setEditingLien(null);
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
      const res = await authFetch(`/api/liens/admin/${id}`, { method: "DELETE" });
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
      const url = editingMission ? `/api/missions/${editingMission.id}` : "/api/missions";
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
      const res = await authFetch(`/api/missions/${id}`, { method: "DELETE" });
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
      const res = await authFetch(`/api/missions/admin/historique/${id}`, { method: "DELETE" });
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
      const res = await authFetch(`/api/missions/admin/etapes/${id}`, { method: "DELETE" });
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
      const url = editingFaq ? `/api/faq/${editingFaq.id}` : "/api/faq";
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
      const res = await authFetch(`/api/faq/${id}`, { method: "DELETE" });
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
      const res = await authFetch(`/api/services/admin/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      toast.success("Supprimé");
      fetchServices();
    } catch (error: any) {
      toast.error(error.message);
    }
  };


  const handleSaveAllParametres = async () => {
    setIsSavingParametres(true);
    try {
      const formData = new FormData();
      Object.entries(parametres).forEach(([key, value]) => {
        if (key !== "president_photo_path") {
          formData.append(key, value);
        }
      });
      if (presidentPhotoFile) {
        formData.append("president_photo_file", presidentPhotoFile);
      }

      const res = await authFetch(`/api/parametres/admin`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error("Erreur paramètre");
      toast.success("Paramètres mis à jour");
      fetchParametres();
      setPresidentPhotoFile(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSavingParametres(false);
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
      const res = await authFetch(`/api/articles/admin/${id}`, { method: "DELETE" });
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

  const menuItems = [
    { id: "dashboard", label: "Tableau de Bord", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "articles", label: "Actualités", icon: <FileText className="w-5 h-5" /> },
    { id: "missions", label: "Missions", icon: <CheckCircle2 className="w-5 h-5" /> },
    { id: "historique", label: "Historique", icon: <FileText className="w-5 h-5" /> },
    { id: "etapes", label: "Étapes", icon: <FileText className="w-5 h-5" /> },
    { id: "services", label: "Services", icon: <Settings className="w-5 h-5" /> },
    { id: "faq", label: "FAQ", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "membres", label: "Membres", icon: <Users className="w-5 h-5" /> },
    { id: "galerie", label: "Galerie", icon: <ImageIcon className="w-5 h-5" /> },
    { id: "documents", label: "Documents", icon: <FileBadge className="w-5 h-5" /> },
    { id: "plaintes", label: "Plaintes", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "liens", label: "Liens institutionnels", icon: <ExternalLink className="w-5 h-5" /> },
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

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-4 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeTab === item.id
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
                    <Button
                      className="bg-white text-primary hover:bg-white/90 rounded-2xl h-14 px-8 font-bold gap-2"
                      onClick={openArticleForm}
                    >
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
                <Button
                  className="bg-primary hover:bg-primary/90 h-10 px-6 rounded-xl font-bold gap-2"
                  onClick={() => setShowArticleForm((prev) => !prev)}
                >
                  <Plus className="w-4 h-4" />
                  Nouvel Article
                </Button>
              </div>

              {showArticleForm && (
                <form onSubmit={handleSaveArticle} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">
                    {editingArticle ? "Modifier l'article" : "Nouvel Article"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Titre</p>
                      <Input
                        value={articleForm.titre}
                        onChange={(e) => setArticleForm((prev) => ({ ...prev, titre: e.target.value }))}
                        onBlur={() => {
                          if (!articleForm.slug && articleForm.titre) {
                            setArticleForm((prev) => ({ ...prev, slug: slugify(prev.titre) }));
                          }
                        }}
                        required
                        className="h-11 rounded-xl border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Slug</p>
                      <Input
                        value={articleForm.slug}
                        onChange={(e) => setArticleForm((prev) => ({ ...prev, slug: e.target.value }))}
                        className="h-11 rounded-xl border-slate-200"
                        placeholder="ex: mon-article"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Catégorie</p>
                      <select
                        value={articleForm.categorie}
                        onChange={(e) => setArticleForm((prev) => ({ ...prev, categorie: e.target.value }))}
                        className="h-11 rounded-xl border border-slate-200 px-3 bg-white text-sm"
                      >
                        <option value="communique">Communiqué</option>
                        <option value="evenement">Événement</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Statut</p>
                      <select
                        value={articleForm.statut}
                        onChange={(e) => setArticleForm((prev) => ({ ...prev, statut: e.target.value }))}
                        className="h-11 rounded-xl border border-slate-200 px-3 bg-white text-sm"
                      >
                        <option value="brouillon">Brouillon</option>
                        <option value="publie">Publié</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Date de publication</p>
                      <Input
                        type="date"
                        value={articleForm.date_publication}
                        onChange={(e) => setArticleForm((prev) => ({ ...prev, date_publication: e.target.value }))}
                        className="h-11 rounded-xl border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Image (URL)</p>
                      <Input
                        value={articleForm.image_url}
                        onChange={(e) => setArticleForm((prev) => ({ ...prev, image_url: e.target.value }))}
                        className="h-11 rounded-xl border-slate-200"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Image (fichier)</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setArticleImage(e.target.files?.[0] || null)}
                        className="block w-full text-sm text-slate-600"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Extrait</p>
                      <Textarea
                        value={articleForm.extrait}
                        onChange={(e) => setArticleForm((prev) => ({ ...prev, extrait: e.target.value }))}
                        className="min-h-[80px] rounded-xl border-slate-200"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Contenu</p>
                      <Textarea
                        value={articleForm.contenu}
                        onChange={(e) => setArticleForm((prev) => ({ ...prev, contenu: e.target.value }))}
                        className="min-h-[140px] rounded-xl border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 h-10 px-6 rounded-xl font-bold"
                      disabled={isSavingArticle}
                    >
                      {isSavingArticle ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 px-6 rounded-xl"
                      onClick={() => setShowArticleForm(false)}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              )}

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
                    {Array.isArray(articles) && articles
                      .filter((art) =>
                        String(art.titre || "")
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
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
                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${art.categorie === 'communique' ? 'bg-green-100 text-green-700' :
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
                            <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg text-blue-600 hover:bg-blue-50"
                                onClick={() => openArticleForm(art)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteArticle(art.id)}
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
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Membres</h2>
                  <p className="text-xs text-muted-foreground">Liste des membres actifs</p>
                </div>
                <Button onClick={() => openMembreForm()} className="rounded-xl gap-2 font-bold">
                  <Plus className="w-4 h-4" />
                  Ajouter un membre
                </Button>
              </div>

              {showMembreForm && (
                <form onSubmit={handleSaveMembre} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">
                    {editingMembre ? "Modifier le membre" : "Nouveau Membre"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Nom Complet</p>
                      <Input
                        value={membreForm.nom}
                        onChange={(e) => setMembreForm(prev => ({ ...prev, nom: e.target.value }))}
                        required
                        className="h-11 rounded-xl border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Fonction</p>
                      <Input
                        value={membreForm.fonction}
                        onChange={(e) => setMembreForm(prev => ({ ...prev, fonction: e.target.value }))}
                        className="h-11 rounded-xl border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Initiales</p>
                      <Input
                        value={membreForm.initiales}
                        onChange={(e) => setMembreForm(prev => ({ ...prev, initiales: e.target.value }))}
                        className="h-11 rounded-xl border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Photo</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setMembreImage(e.target.files?.[0] || null)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Biographie</p>
                      <Textarea
                        value={membreForm.bio}
                        onChange={(e) => setMembreForm(prev => ({ ...prev, bio: e.target.value }))}
                        className="min-h-[100px] rounded-xl border-slate-200"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" className="font-bold rounded-xl h-11 px-8">Enregistrer</Button>
                    <Button type="button" variant="outline" onClick={() => setShowMembreForm(false)} className="rounded-xl h-11">Annuler</Button>
                  </div>
                </form>
              )}

              {isLoadingTab ? (
                <p className="text-sm text-slate-500">Chargement...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {membres.map((membre) => (
                    <div key={membre.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm group">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center text-sm font-bold text-slate-500">
                            {membre.photo_path ? (
                              <img src={`/${membre.photo_path}`} alt={membre.nom} className="w-full h-full object-cover" />
                            ) : (
                              (membre.initiales || membre.nom?.charAt(0))
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{membre.nom}</p>
                            <p className="text-xs text-slate-500">{membre.fonction}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" onClick={() => openMembreForm(membre)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => handleDeleteMembre(membre.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {membres.length === 0 && (
                    <div className="text-sm text-slate-500">Aucun membre trouvé.</div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "galerie" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Galerie</h2>
                  <p className="text-xs text-muted-foreground">Images publiées</p>
                </div>
                <Button onClick={() => openGalerieForm()} className="rounded-xl gap-2 font-bold">
                  <Plus className="w-4 h-4" />
                  Ajouter une image
                </Button>
              </div>

              {showGalerieForm && (
                <form onSubmit={handleSaveGalerie} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">
                    {editingGalerie ? "Modifier l'image" : "Nouvelle Image"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Titre</p>
                      <Input
                        value={galerieForm.titre}
                        onChange={(e) => setGalerieForm(prev => ({ ...prev, titre: e.target.value }))}
                        required
                        className="h-11 rounded-xl border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Catégorie</p>
                      <Input
                        value={galerieForm.categorie}
                        onChange={(e) => setGalerieForm(prev => ({ ...prev, categorie: e.target.value }))}
                        className="h-11 rounded-xl border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setGalerieImage(e.target.files?.[0] || null)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Description</p>
                      <Textarea
                        value={galerieForm.description}
                        onChange={(e) => setGalerieForm(prev => ({ ...prev, description: e.target.value }))}
                        className="min-h-[100px] rounded-xl border-slate-200"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" className="font-bold rounded-xl h-11 px-8">Enregistrer</Button>
                    <Button type="button" variant="outline" onClick={() => setShowGalerieForm(false)} className="rounded-xl h-11">Annuler</Button>
                  </div>
                </form>
              )}

              {isLoadingTab ? (
                <p className="text-sm text-slate-500">Chargement...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {galerie.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm group">
                      <div className="h-48 bg-slate-100 relative">
                        {item.image_path ? (
                          <img src={`/${item.image_path}`} alt={item.titre} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                            Pas d'image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="icon" className="bg-white text-primary hover:bg-white/90" onClick={() => openGalerieForm(item)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="destructive" onClick={() => handleDeleteGalerie(item.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-bold text-slate-800 line-clamp-1">{item.titre}</p>
                        <p className="text-xs text-slate-500">{item.categorie || "Événement"}</p>
                      </div>
                    </div>
                  ))}
                  {galerie.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-400">Aucun élément dans la galerie.</div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Documents</h2>
                  <p className="text-xs text-muted-foreground">Documents publiés</p>
                </div>
                <Button onClick={() => openDocumentForm()} className="rounded-xl gap-2 font-bold">
                  <Plus className="w-4 h-4" />
                  Ajouter un document
                </Button>
              </div>

              {showDocumentForm && (
                <form onSubmit={handleSaveDocument} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">
                    {editingDocument ? "Modifier le document" : "Nouveau Document"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Titre du document</p>
                      <Input
                        value={documentForm.titre}
                        onChange={(e) => setDocumentForm(prev => ({ ...prev, titre: e.target.value }))}
                        required
                        className="h-11 rounded-xl border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Catégorie</p>
                      <select
                        value={documentForm.categorie}
                        onChange={(e) => setDocumentForm(prev => ({ ...prev, categorie: e.target.value }))}
                        className="h-11 w-full rounded-xl border border-slate-200 px-3 bg-white text-sm"
                      >
                        <option value="Loi">Loi</option>
                        <option value="Décret">Décret</option>
                        <option value="Arrêté">Arrêté</option>
                        <option value="Note">Note circulaire</option>
                        <option value="Rapport">Rapport</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Fichier (PDF)</p>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" className="font-bold rounded-xl h-11 px-8">Enregistrer</Button>
                    <Button type="button" variant="outline" onClick={() => setShowDocumentForm(false)} className="rounded-xl h-11">Annuler</Button>
                  </div>
                </form>
              )}

              {isLoadingTab ? (
                <p className="text-sm text-slate-500">Chargement...</p>
              ) : (
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Titre</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Catégorie</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Type</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-800">{doc.titre}</p>
                            {doc.fichier_path && (
                              <p className="text-[10px] text-slate-400 font-mono">/{doc.fichier_path.split('/').pop()}</p>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500">{doc.categorie || "—"}</td>
                          <td className="px-6 py-4 text-sm text-slate-500 font-mono">{doc.type_fichier || "PDF"}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" onClick={() => openDocumentForm(doc)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => handleDeleteDocument(doc.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {documents.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium">
                            Aucun document trouvé.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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

          {activeTab === "liens" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Liens institutionnels</h2>
                  <p className="text-xs text-muted-foreground">Ministères, organismes et partenaires</p>
                </div>
                <Button onClick={() => openLienForm()} className="rounded-xl gap-2 font-bold">
                  <Plus className="w-4 h-4" />
                  Ajouter un lien
                </Button>
              </div>

              {showLienForm && (
                <form onSubmit={handleSaveLien} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">
                    {editingLien ? "Modifier le lien" : "Nouveau Lien"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Nom / Intitulé *</p>
                      <Input
                        value={lienForm.nom}
                        onChange={(e) => setLienForm(prev => ({ ...prev, nom: e.target.value }))}
                        required
                        className="h-11 rounded-xl border-slate-200"
                        placeholder="ex: Ministère du Commerce"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">URL *</p>
                      <Input
                        value={lienForm.url}
                        onChange={(e) => setLienForm(prev => ({ ...prev, url: e.target.value }))}
                        required
                        className="h-11 rounded-xl border-slate-200"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Catégorie</p>
                      <select
                        value={lienForm.categorie}
                        onChange={(e) => setLienForm(prev => ({ ...prev, categorie: e.target.value }))}
                        className="h-11 w-full rounded-xl border border-slate-200 px-3 bg-white text-sm"
                      >
                        <option value="Ministère">Ministère</option>
                        <option value="Institution">Institution</option>
                        <option value="Organisation régionale">Organisation régionale</option>
                        <option value="Partenaire">Partenaire</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Ordre d'affichage</p>
                      <Input
                        type="number"
                        value={lienForm.ordre}
                        onChange={(e) => setLienForm(prev => ({ ...prev, ordre: parseInt(e.target.value) || 0 }))}
                        className="h-11 rounded-xl border-slate-200"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Description (optionnelle)</p>
                      <Input
                        value={lienForm.description}
                        onChange={(e) => setLienForm(prev => ({ ...prev, description: e.target.value }))}
                        className="h-11 rounded-xl border-slate-200"
                        placeholder="Courte description..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" className="font-bold rounded-xl h-11 px-8" disabled={isLoadingTab}>
                      {isLoadingTab ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowLienForm(false)} className="rounded-xl h-11">Annuler</Button>
                  </div>
                </form>
              )}

              {isLoadingTab ? (
                <p className="text-sm text-slate-500">Chargement...</p>
              ) : (
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Nom</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Catégorie</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">URL</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Ordre</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {liens.map((lien) => (
                        <tr key={lien.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-800">{lien.nom}</p>
                            {lien.description && <p className="text-xs text-slate-400 mt-0.5">{lien.description}</p>}
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-[10px] font-black uppercase px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                              {lien.categorie}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <a href={lien.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-mono truncate max-w-[200px] block">
                              {lien.url}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 font-medium">{lien.ordre}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" onClick={() => openLienForm(lien)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => handleDeleteLien(lien.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {liens.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                            Aucun lien institutionnel trouvé.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "parametres" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
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

              {isLoadingTab ? (
                <p className="text-sm text-slate-500">Chargement...</p>
              ) : (
                <div className="space-y-8">
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

                  {/* Grouped Parameters */}
                  {(() => {
                    const groups = [
                      { title: "Accueil", keys: ['home_welcome_badge', 'home_missions_title', 'home_missions_subtitle', 'home_services_title', 'home_services_subtitle', 'home_news_title', 'home_news_subtitle'] },
                      { title: "Présentation", keys: ['pres_hero_title', 'pres_hero_subtitle', 'pres_section_title', 'pres_timeline_title', 'pres_timeline_subtitle', 'pres_members_title', 'presentation_p1', 'presentation_p2', 'presentation_p3'] },
                      { title: "Missions", keys: ['missions_hero_title', 'missions_hero_subtitle', 'missions_section_subtitle', 'missions_process_title', 'missions_process_subtitle'] },
                      { title: "Contact & Footer", keys: ['contact_hero_title', 'contact_hero_subtitle', 'footer_description', 'footer_adresse', 'footer_telephone', 'footer_email', 'contact_adresse', 'contact_telephone', 'contact_email', 'horaires_ouverture', 'lien_facebook', 'lien_linkedin', 'lien_twitter'] },
                      { title: "Autres Pages", keys: ['news_hero_title', 'news_hero_subtitle', 'docs_hero_title', 'docs_hero_subtitle', 'faq_hero_title', 'faq_hero_subtitle', 'galerie_hero_title', 'galerie_hero_subtitle', 'services_hero_title', 'services_hero_subtitle', 'sig_hero_title', 'sig_hero_subtitle', 'plainte_hero_title', 'plainte_hero_subtitle'] },
                    ];

                    const assignedKeys = new Set(groups.flatMap(g => g.keys).concat(['president_nom', 'president_mot', 'president_photo_path', 'nom_site_ligne1', 'nom_site_ligne2']));
                    const otherKeys = Object.keys(parametres).filter(k => !assignedKeys.has(k));

                    if (otherKeys.length > 0) {
                      groups.push({ title: "Autres paramètres", keys: otherKeys });
                    }

                    return groups.map(group => (
                      <div key={group.title} className="space-y-4">
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
        </div>
      </main>
    </div>
  );
}
