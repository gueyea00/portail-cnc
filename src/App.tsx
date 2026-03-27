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

const queryClient = new QueryClient();

const App = () => (
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

