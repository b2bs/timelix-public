# Usem una imatge base de Node.js
FROM node:18-alpine AS builder

# Directori de treball dins del contenidor
WORKDIR /app

# Copiem els fitxers de dependències
COPY package.json package-lock.json ./

# Instal·lem les dependències
RUN npm install --production

# Copiem la resta del codi
COPY . .

# Construïm l'aplicació (si hi ha algun pas de build, sinó aquest pas es pot ometre)
FROM node:18-alpine

WORKDIR /app

# Copiem només les dependències i el codi necessari des de l'etapa anterior
COPY --from=builder /app .

# Expose port (ajusta segons el teu backend, per defecte Express usa 3000)
EXPOSE 3000

# Comanda per iniciar l'aplicació
CMD ["node", "server.js"]
