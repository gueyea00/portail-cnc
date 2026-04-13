FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 8080

# Lancer l'initialisation de la DB puis démarrer le serveur
CMD ["sh", "-c", "npm run db:init && npm start"]
