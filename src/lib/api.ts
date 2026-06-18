// Configuration centralisée de l'API
// En production, le frontend appelle directement le backend (CORS configuré)
// En développement, Vite proxy les appels (vite.config.ts)

const isDev = import.meta.env.DEV;

export const API_BASE = isDev
  ? "" // En dev : chemins relatifs → Vite proxy vers le backend
  : "http://188.165.77.237:5003"; // En prod : appel direct au backend

export const apiUrl = (path: string) => `${API_BASE}${path}`;
