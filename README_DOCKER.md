# Configuration Docker pour CNC Connect Hub

Cette configuration permet de lancer l'application complète (Base de données, Backend et Frontend) avec Docker Compose.

## Prérequis
- Docker
- Docker Compose

## Structure
- **db** : Conteneur PostgreSQL v15 (initialisé avec `schema.sql` et `seed.sql`)
- **backend** : Serveur Node.js (Express) écoutant sur le port 8080
- **frontend** : Serveur Nginx (Production) servant le build React/Vite sur le port 80

## Lancement
Pour construire et démarrer les conteneurs :
```bash
docker-compose up --build -d
```

## Accès
- **Site Public** : [http://localhost](http://localhost)
- **Interface Admin** : [http://localhost/admin](http://localhost/admin)
- **API Health** : [http://localhost/api/health](http://localhost/api/health) (via proxy Nginx) ou [http://localhost:8080/health](http://localhost:8080/health) (accès direct)

## Variables d'environnement
Elles sont configurées par défaut dans `docker-compose.yml`. Si vous souhaitez les modifier (ex: mot de passe DB), vous pouvez le faire directement dans ce fichier ou créer un fichier `.env`.

## Volumes
- `pgdata` : Persistance des données PostgreSQL
- `./ccn-backend/uploads` : Dossier partagé pour les uploads d'images et de documents.
