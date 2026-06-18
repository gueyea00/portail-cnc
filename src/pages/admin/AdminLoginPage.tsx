import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("cnc_token")) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Identifiants incorrects");
      }

      localStorage.setItem("cnc_token", data.token);
      localStorage.setItem("cnc_admin", JSON.stringify(data.admin));
      
      toast.success("Connexion réussie", {
        description: `Bienvenue, ${data.admin.username}`,
      });
      
      navigate("/admin");
    } catch (error: any) {
      toast.error("Erreur de connexion", {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4 relative overflow-hidden">
      {/* Motifs de fond subtils */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#002664]" />
      <div className="absolute top-1 left-0 w-full h-1 bg-[#FECB00]" />
      <div className="absolute top-2 left-0 w-full h-1 bg-[#C60C30]" />
      
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-destructive/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-border overflow-hidden z-10">
        {/* En-tête de la carte */}
        <div className="bg-gradient-to-br from-primary/5 to-transparent p-8 text-center border-b border-border/50">
          <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-3 h-3" />
            Retour au site public
          </Link>
          <div className="w-20 h-20 bg-white rounded-2xl shadow-lg mx-auto mb-4 flex items-center justify-center border border-border">
            <img src="/armoiries-tchad.png" alt="Armoiries Tchad" className="w-14 h-14 object-contain" />
          </div>
          <h1 className="text-xl font-extrabold text-[#002664] leading-tight">
            Conseil National de la Concurrence
          </h1>
          <p className="text-muted-foreground text-sm mt-2 font-medium">Panneau d'Administration</p>
        </div>

        {/* Corps du formulaire */}
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Identifiant</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="admin"
                  className="pl-10 h-11"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 bg-[#002664] text-white hover:bg-[#002664]/90 font-bold transition-all shadow-lg shadow-primary/10"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Connexion en cours...
              </span>
            ) : (
              "Se connecter"
            )}
          </Button>
          
          <div className="pt-4 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              République du Tchad &bull; Portail National
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
