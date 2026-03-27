# Guide de Déploiement sur Vercel - Portail CNC Tchad

Ce guide vous explique comment déployer votre application (Frontend Vite et Backend Node.js) sur Vercel étape par étape.

## 1. Préparation du Projet

Avant de commencer, assurez-vous que votre code est poussé sur un dépôt Git (GitHub, GitLab ou Bitbucket).

### Configuration du Frontend (Vite)
Vercel détectera automatiquement qu'il s'agit d'un projet Vite, mais voici les paramètres à vérifier :
- **Framework Preset :** Vite
- **Build Command :** `npm run build`
- **Output Directory :** `dist`

### Configuration du Backend (Node.js)
Le dossier `ccn-backend` contient votre serveur Node.js. Vercel peut héberger des serveurs Node.js via des **Serverless Functions**.

> [!IMPORTANT]
> Pour que le backend fonctionne sur Vercel, vous avez deux options :
> 1. **Option A (Recommandée) :** Déployer le backend séparément sur une plateforme comme **Render**, **Railway** ou **Heroku**, puis connecter le frontend via une variable d'environnement (ex: `VITE_API_URL`).
> 2. **Option B (Monorepo) :** Configurer Vercel pour gérer les deux dossiers, mais cela demande un fichier `vercel.json` complexe.

---

## 2. Étapes de Déploiement (Frontend)

1. **Création du compte :** Rendez-vous sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub.
2. **Ajouter un projet :** Cliquez sur **"Add New"** > **"Project"**.
3. **Importer le dépôt :** Recherchez votre dépôt `cnc-connect-hub` et cliquez sur **"Import"**.
4. **Configuration :**
   - **Root Directory :** Laissez vide (ou `.` ) si vous déployez le frontend qui est à la racine.
   - **Build & Development Settings :** Laissez les valeurs par défaut (Vite les remplit tout seul).
5. **Variables d'environnement :**
   - Si votre frontend communique avec le backend, ajoutez une variable nommée `VITE_API_URL`.
   - La valeur sera l'URL de votre backend déployé (ex: `https://votre-api.render.com`).
6. **Déployer :** Cliquez sur **"Deploy"**.

---

## 3. Gestion du Backend sur Vercel (Optionnel)

Si vous voulez vraiment mettre le backend sur Vercel, vous devez créer un fichier `vercel.json` à la racine :

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/ccn-backend/src/index.js" }
  ]
}
```
*Note : Cela nécessite que votre fichier `index.js` exporte l'application Express pour que Vercel puisse l'utiliser.*

---

## 4. Conseils Post-Déploiement

- **Domaine personnalisé :** Vous pouvez lier un domaine `.td` (ou autre) dans l'onglet **Settings** > **Domains**.
- **HTTPS :** Vercel génère automatiquement des certificats SSL gratuits pour votre site.
- **Logs :** Consultez l'onglet **Logs** pour déboguer les erreurs de build ou d'exécution.

---

> [!TIP]
> Pour une performance optimale et une facilité de gestion, je vous recommande de déployer le **Frontend sur Vercel** et le **Backend sur Render** (qui gère mieux les serveurs Express persistants).
