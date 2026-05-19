# Configuration Docker pour CNC Connect Hub

Cette configuration permet de lancer l'application complète (Base de données, Backend et Frontend) avec Docker Compose.

## Prérequis
- Docker
- Docker Compose

## Structure
- **db** : Conteneur PostgreSQL v15 (initialisé avec `schema.sql` et `seed.sql`)
- **backend** : Serveur Node.js (Express) écoutant sur le port 5010
- **frontend** : Serveur Nginx (Production) servant le build React/Vite sur le port 80

## Lancement
Pour construire et démarrer les conteneurs :
```bash
docker-compose up --build -d
```

## Accès
- **Site Public** : [http://188.165.77.237](http://188.165.77.237)
- **Interface Admin** : [http://188.165.77.237/admin](http://188.165.77.237/admin)
- **API Health** : [http://188.165.77.237/api/health](http://188.165.77.237/api/health) (via proxy Nginx) ou [http://188.165.77.237:5010/health](http://188.165.77.237:5010/health) (accès direct)

## Variables d'environnement
Elles sont configurées par défaut dans `docker-compose.yml`. Si vous souhaitez les modifier (ex: mot de passe DB), vous pouvez le faire directement dans ce fichier ou créer un fichier `.env`.

## Volumes
- `pgdata` : Persistance des données PostgreSQL
- `./ccn-backend/uploads` : Dossier partagé pour les uploads d'images et de documents.
