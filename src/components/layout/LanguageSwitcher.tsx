/**
 * LanguageSwitcher.tsx
 *
 * Menu déroulant qui contrôle Google Translate.
 * Traduit TOUT le contenu (statique + données API/backend).
 */

import { useState } from "react";
import { Globe, Check, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useGoogleTranslate, type SupportedLang } from "@/hooks/useGoogleTranslate";

const languages: { code: SupportedLang; label: string; short: string; flag: string }[] = [
  { code: "fr", label: "Français", short: "FR", flag: "🇫🇷" },
  { code: "en", label: "English",  short: "EN", flag: "🇬🇧" },
  { code: "ar", label: "العربية",  short: "AR", flag: "🇸🇦" },
];

export default function LanguageSwitcher() {
  const { currentLang, changeLanguage } = useGoogleTranslate();
  const [loading, setLoading] = useState(false);

  const current = languages.find((l) => l.code === currentLang) ?? languages[0];

  const handleChange = (lang: SupportedLang) => {
    if (lang === currentLang) return;
    setLoading(true); // restera actif jusqu'au rechargement de page
    changeLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 flex items-center gap-2 hover:bg-muted font-bold text-xs uppercase"
          title="Changer la langue / Change language / تغيير اللغة"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          ) : (
            <Globe className="w-4 h-4 text-primary" />
          )}
          <span className="text-foreground">{current.short}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-44 bg-white/95 backdrop-blur-md border border-border mt-2 shadow-xl z-[60]"
      >
        {/* En-tête */}
        <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border mb-1">
          Langue / Language
        </div>

        {languages.map((lang) => {
          const isActive = currentLang === lang.code;
          return (
            <DropdownMenuItem
              key={lang.code}
              className="flex items-center justify-between cursor-pointer py-2.5 px-3 hover:bg-muted transition-colors"
              onClick={() => handleChange(lang.code)}
            >
              <div className="flex items-center gap-2">
                <span className="text-base leading-none">{lang.flag}</span>
                <span className={`text-sm ${isActive ? "font-bold text-primary" : "text-foreground"}`}>
                  {lang.label}
                </span>
              </div>
              {isActive && <Check className="w-4 h-4 text-primary shrink-0" />}
            </DropdownMenuItem>
          );
        })}

        {/* Note */}
        <div className="px-3 py-1.5 text-[10px] text-muted-foreground border-t border-border mt-1 leading-tight">
          Traduction automatique du contenu
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
