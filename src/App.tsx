import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/Layout";
import HomePage from "./pages/HomePage";
import PresentationPage from "./pages/PresentationPage";
import MissionsPage from "./pages/MissionsPage";
import ActualitesPage from "./pages/ActualitesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import DocumentsPage from "./pages/DocumentsPage";
import ServicesPage from "./pages/ServicesPage";
import PlaintePage from "./pages/PlaintePage";
import SignalementPage from "./pages/SignalementPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import GaleriePage from "./pages/GaleriePage";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./i18n/config";
import { useGoogleTranslate } from "@/hooks/useGoogleTranslate";

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();
  // Google Translate gère la langue de toute la page (statique + dynamique)
  const { currentLang } = useGoogleTranslate();

  useEffect(() => {
    // RTL basé sur la langue Google Translate (priorité) ou i18next
    const activeLang = currentLang || i18n.language;
    const dir = activeLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = activeLang;
  }, [currentLang, i18n.language]);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/presentation" element={<PresentationPage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/actualites" element={<ActualitesPage />} />
            <Route path="/actualites/:slug" element={<ArticleDetailPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/plainte" element={<PlaintePage />} />
            <Route path="/signalement" element={<SignalementPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/galerie" element={<GaleriePage />} />
            
            {/* Interface d'administration intégrée en React */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;

