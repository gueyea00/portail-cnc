import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "fr", label: "Français", short: "FR" },
  { code: "en", label: "English", short: "EN" },
  { code: "ar", label: "العربية", short: "AR" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 px-3 flex items-center gap-2 hover:bg-muted font-bold text-xs uppercase">
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-foreground">{currentLanguage.short}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-white/95 backdrop-blur-md border border-border mt-2 shadow-xl z-[60]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex items-center justify-between cursor-pointer py-2.5 px-3 hover:bg-muted transition-colors"
            onClick={() => i18n.changeLanguage(lang.code)}
          >
            <span className={`text-sm ${i18n.language === lang.code ? "font-bold text-primary" : "text-foreground"}`}>
              {lang.label}
            </span>
            {i18n.language === lang.code && <Check className="w-4 h-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
