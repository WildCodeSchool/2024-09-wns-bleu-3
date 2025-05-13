FROM node:lts-alpine
RUN apk --no-cache add curl
WORKDIR /app
# Copie des fichiers nécessaires
# COPY package.json package.json
COPY package.json package.json 
RUN npm install
COPY scripts scripts
COPY src src
COPY tsconfig.json tsconfig.json
COPY eslint.config.mjs eslint.config.mjs
# Commande à exécuter pour démarrer le backend
CMD ["npm", "start"]