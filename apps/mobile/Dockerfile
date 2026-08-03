# Étape 1 : Image Node
FROM node:20

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers de dépendances
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste du projet
COPY . .

# Étape 6 : Exposer le port Metro bundler
EXPOSE 8081

# Étape 7 : Commande de lancement
CMD ["npm", "start"]
