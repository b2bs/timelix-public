# Etapa de construcció
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producció amb Nginx
FROM nginx:alpine

# Copiem els fitxers construïts a la carpeta de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiem la configuració personalitzada d'Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
