import { Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { FileWarning, ShieldAlert, ClipboardList, MessageSquare, BookOpen, Calendar, ArrowRight, Laptop, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const iconMap: Record<string, React.ReactNode> = {
  FileWarning: <FileWarning className="w-8 h-8" />,
  ShieldAlert: <ShieldAlert className="w-8 h-8" />,
  ClipboardList: <ClipboardList className="w-8 h-8" />,
  MessageSquare: <MessageSquare className="w-8 h-8" />,
  BookOpen: <BookOpen className="w-8 h-8" />,
  Calendar: <Calendar className="w-8 h-8" />,
  Search: <Search className="w-8 h-8" />,
  FileText: <FileText className="w-8 h-8" />,
};

export default function ServicesPage() {
  const { data: pageConfig } = useQuery({
    queryKey: ["parametres"],
    queryFn: () => fetch("/api/parametres").then(res => res.json())
  });

  const { data: servicesApi = [] } = useQuery({
    queryKey: ["services"],
    queryFn: () => fetch("/api/services").then(res => res.json())
  });

  const sortedServices = (servicesApi || []).sort((a: any, b: any) => (a.ordre || 0) - (b.ordre || 0));
  return (
    <div>
      <section className="page-hero">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-4">
            <Laptop className="w-8 h-8 md:w-10 md:h-10 text-gold" />
            {pageConfig?.services_hero_title || "Services en ligne"}
          </h1>
          <p className="mt-2 opacity-90 text-lg">{pageConfig?.services_hero_subtitle || "Accédez à l'ensemble des services du CNC"}</p>
        </div>
      </section>
      <Breadcrumb />

      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedServices.map((s: any) => {
            const isPlaceholder = !s.lien || s.lien === "#";
            const isExternal = s.lien?.startsWith("http");

            return (
              <div key={s.titre} className="bg-surface p-8 rounded-2xl shadow-soft card-hover flex flex-col">
                <div className="w-14 h-14 rounded-lg bg-muted text-primary flex items-center justify-center mb-4">
                  {iconMap[s.icone]}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{s.titre}</h3>
                <p className="text-sm text-muted-foreground flex-1 mb-4">{s.description}</p>
                {isPlaceholder ? (
                  <Button
                    onClick={() => toast.info("Ce service en ligne sera très bientôt disponible.")}
                    variant="outline"
                    size="sm"
                    className="gap-2 w-full cursor-pointer"
                  >
                    Accéder au service
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                ) : isExternal ? (
                  <a href={s.lien} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" size="sm" className="gap-2 w-full">
                      Accéder au service
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </a>
                ) : (
                  <Link to={s.lien} className="w-full">
                    <Button variant="outline" size="sm" className="gap-2 w-full">
                      Accéder au service
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

