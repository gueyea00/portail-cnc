import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/Layout";
import HomePage from "./pages/HomePage";
import PresentationPage from "./pages/PresentationPage";
import MissionsPage from "./pages/MissionsPage";
import ReglementationPage from "./pages/ReglementationPage";
import EnquetesPage from "./pages/EnquetesPage";
import ActualitesPage from "./pages/ActualitesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import DocumentsPage from "./pages/DocumentsPage";
import ServicesPage from "./pages/ServicesPage";
import PlaintePage from "./pages/PlaintePage";
import SignalementPage from "./pages/SignalementPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import GaleriePage from "./pages/GaleriePage";
import SuiviProjet from "./pages/suiviProjet";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./i18n/config";
import { useGoogleTranslate } from "@/hooks/useGoogleTranslate";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/presentation", element: <PresentationPage /> },
        { path: "/missions", element: <MissionsPage /> },
        { path: "/reglementation", element: <ReglementationPage /> },
        { path: "/enquetes", element: <EnquetesPage /> },
        { path: "/actualites", element: <ActualitesPage /> },
        { path: "/actualites/:slug", element: <ArticleDetailPage /> },
        { path: "/documents", element: <DocumentsPage /> },
        { path: "/services", element: <ServicesPage /> },
        { path: "/suivi-dossier", element: <SuiviProjet /> },
        { path: "/plainte", element: <PlaintePage /> },
        { path: "/signalement", element: <SignalementPage /> },
        { path: "/contact", element: <ContactPage /> },
        { path: "/faq", element: <FaqPage /> },
        { path: "/galerie", element: <GaleriePage /> },
        { path: "/admin/login", element: <AdminLoginPage /> },
        {
          path: "/admin/*",
          element: (
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

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
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

