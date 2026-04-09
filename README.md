# CNC Connect Hub - Portail du Conseil National de la Concurrence (Tchad)

Ce projet est composé d'un frontend React (Vite) et d'un backend Node.js (Express) avec PostgreSQL.

## Architecture
- **Frontend :** React + TypeScript + Tailwind CSS (Port 8081)
- **Backend :** Node.js + Express (Port 8080)
- **Base de données :** PostgreSQL (Port 5432 / 5436 sur l'hôte)

## Installation Locale

### 1. Prérequis
- Node.js (v20+)
- Docker & Docker Compose (pour la base de données)

### 2. Base de données
Lancez la base de données via Docker :
```bash
docker-compose up -d db
```
*Note : Le port PostgreSQL est mappé sur 5436 pour éviter les conflits locaux.*

### 3. Backend
```bash
cd ccn-backend
npm install
# Créez un fichier .env basé sur .env.example
npm run dev
```

### 4. Frontend
```bash
# À la racine du projet
npm install
npm run dev
```
Le frontend sera accessible sur [http://148.230.124.48:8081](http://148.230.124.48:8081). Les appels API sont automatiquement proxysés vers le VPS à l'adresse **http://148.230.124.48:8080**.

## Déploiement Docker (Complet)
Pour lancer l'ensemble de l'application (Frontend + Backend + DB) :
```bash
docker-compose up --build
```
- Frontend : [http://148.230.124.48](http://148.230.124.48) (Port 80)
- Backend API : [http://148.230.124.48:8080/api](http://148.230.124.48:8080/api)
- Interface Admin : [http://148.230.124.48:8080/admin](http://148.230.124.48:8080/admin)

## Résolution des Conflits
Les conflits suivants ont été résolus :
- **Port 8080 :** Le frontend a été déplacé sur le port 8081 pour éviter le conflit avec le backend.
- **Proxy :** Vite est configuré pour rediriger `/api`, `/admin` et `/uploads` vers le backend.
- **Encodage :** Correction des caractères UTF-8 corrompus (`Ã©` -> `é`).
- **Synchronisation :** Les formulaires (Plaintes) sont connectés à l'API réelle.
