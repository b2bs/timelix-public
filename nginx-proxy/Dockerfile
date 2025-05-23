FROM nginx:alpine

# Copia la configuració de NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Eliminar certificats SSL (no necessaris amb HTTP)
# No cal copiar timelix.crt ni timelix.key

# Expose només el port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
