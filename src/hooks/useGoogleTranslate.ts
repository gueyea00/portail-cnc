/**
 * useGoogleTranslate.ts
 *
 * Contrôle Google Translate via le cookie "googtrans" + rechargement de page.
 * C'est l'approche la plus fiable pour un SPA React : Google Translate lit
 * le cookie AU CHARGEMENT et traduit TOUT le contenu (statique + API).
 */

import { useState, useCallback } from "react";

export type SupportedLang = "fr" | "en" | "ar";

const SUPPORTED: SupportedLang[] = ["fr", "en", "ar"];
const LANG_KEY = "cnc_ui_language";

// ── Cookie ────────────────────────────────────────────────────────────────────

function setCookie(lang: SupportedLang) {
  const hosts = [
    window.location.hostname,
    "." + window.location.hostname,
  ];

  // Supprime tous les anciens cookies googtrans
  hosts.forEach((h) => {
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${h}`;
  });
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

  // Écrit le nouveau cookie si ce n'est pas le français (langue source)
  if (lang !== "fr") {
    const val = `/fr/${lang}`;
    document.cookie = `googtrans=${val}; path=/`;
    hosts.forEach((h) => {
      document.cookie = `googtrans=${val}; path=/; domain=${h}`;
    });
  }
}

function readCookie(): SupportedLang | null {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/fr\/([a-z]{2})/);
  const code = m?.[1] as SupportedLang | undefined;
  return code && SUPPORTED.includes(code) ? code : null;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useGoogleTranslate() {
  const [currentLang] = useState<SupportedLang>(() => {
    // Au montage : lit le cookie (après rechargement) ou le localStorage
    const fromCookie = readCookie();
    if (fromCookie) return fromCookie;
    const fromStore = localStorage.getItem(LANG_KEY) as SupportedLang | null;
    return fromStore && SUPPORTED.includes(fromStore) ? fromStore : "fr";
  });

  const changeLanguage = useCallback((lang: SupportedLang) => {
    if (lang === currentLang) return;

    // 1. Mémorise le choix
    localStorage.setItem(LANG_KEY, lang);

    // 2. Écrit le cookie googtrans (lu par Google Translate au chargement)
    setCookie(lang);

    // 3. Rechargement immédiat → Google Translate traduit toute la page
    window.location.reload();
  }, [currentLang]);

  return { currentLang, changeLanguage };
}
