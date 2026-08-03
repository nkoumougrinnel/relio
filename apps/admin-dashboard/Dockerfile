# Étape 1 : Build avec Node
FROM node:20 AS build
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du projet
COPY . .

# Build de l’app React Vite
RUN npm run build

# Étape 2 : Serveur Nginx pour le frontend
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
