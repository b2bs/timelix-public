Timelix Public

Descripció general

Timelix és una aplicació web per a la gestió d’horaris i el seguiment del temps, desenvolupada com a part d’un projecte de DAW (Desenvolupament d’Aplicacions Web) del curs 2023-2024. Aquest repositori públic conté el codi complet del frontend i backend, així com les configuracions de desplegament amb Kubernetes i un proxy invers Nginx.

Nota: Per a accedir al codi complet del projecte, incloent-hi fitxers sensibles com secrets de base de dades o certificats privats, consulta el repositori privat associat (si tens accés).

Estructura de directoris

backend/

Aquest directori conté el codi complet del backend de Timelix, implementat amb Node.js.





Inclou fitxers com server.js, db.js, i controladors (controller.js) per gestionar lògica de negoci i rutes d’API.

frontend/

Aquest directori conté el codi complet del frontend de Timelix, desenvolupat amb JavaScript (React/Vite).





Inclou components com App.jsx, Login.jsx, Horaris.jsx, i fitxers d’estils (index.css, App.css).



També inclou configuracions com vite.config.js i tailwind.config.js.

k8s/

Aquest directori conté els manifests de Kubernetes per desplegar Timelix en un clúster.





backend/





backend-deployment.yaml: Configuració de desplegament i servei per al backend (port 3000).



frontend/





frontend-deployment.yaml: Configuració de desplegament i servei per al frontend (port 80).



mysql/





gestor_horaris.sql: Script SQL per inicialitzar la base de dades MySQL.



mysql-configmap.yaml: ConfigMap per scripts d’inicialització.



mysql-deployment.yaml: Configuració de desplegament i servei per a MySQL (port 3306).



mysql-pvc.yaml: PersistentVolumeClaim per l’emmagatzematge de dades MySQL amb nfs-client.



Fitxers sensibles (exclosos):





mysql-secret.yaml: Conté credencials de MySQL (no inclòs per seguretat).



jwt-secret.yaml: Conté el secret JWT per autenticació (no inclòs per seguretat).



nginx-proxy/





nginx-proxy-deployment.yaml: Configuració de desplegament i servei per al proxy Nginx, configurat com a NodePort al port 32013 (accessible externament a http://infla.cat:47000).



ingress/





(Actualment buit, reservat per futures configuracions d’Ingress.)

nginx-proxy/

Aquest directori conté la configuració del proxy invers Nginx utilitzat en el desplegament de Kubernetes.





certs/





timelix.crt: Certificat SSL per a Timelix (no utilitzat actualment, ja que el desplegament usa HTTP).



Nota: timelix.key està exclòs del repositori per raons de seguretat.



Dockerfile





Fitxer Dockerfile per construir la imatge del proxy Nginx basada en nginx:alpine.



nginx.conf





Fitxer de configuració per a Nginx, amb upstreams per al backend (backend-service:3000) i frontend (frontend-service:80), i regles de rutes per /api/, /assets/, /timelix.png, i la ruta arrel (/).

.gitignore

Fitxer que especifica quins fitxers i directoris han d’esser ignorats pel control de versions de Git, incloent-hi dependències (node_modules), variables d’entorn (.env), fitxers sensibles (secrets, certificats), i fitxers temporals.

Ús





Prerequisits:





Un clúster Kubernetes (p. ex., el proporcionat per DAW a grup13@10.52.5.102 o grup13@infla.cat:2269).



Imatges Docker per al backend, frontend i Nginx, allotjades en un registre com Harbor (kube0.lacetania.cat/grup13/).



Desplegament:





Aplica els manifests de Kubernetes al directori k8s/:

kubectl apply -f k8s/backend/backend-deployment.yaml
kubectl apply -f k8s/frontend/frontend-deployment.yaml
kubectl apply -f k8s/mysql/mysql-deployment.yaml
kubectl apply -f k8s/mysql/mysql-pvc.yaml
kubectl apply -f k8s/nginx-proxy/nginx-proxy-deployment.yaml



Crea manualment els secrets mysql-secret.yaml i jwt-secret.yaml amb les teves credencials abans del desplegament.



Accés:





Accedeix a l’aplicació externament a http://infla.cat:47000 (per al grup 13).



Internament, usa http://10.52.5.102:32013.

Notes de seguretat





Els fitxers sensibles com mysql-secret.yaml i jwt-secret.yaml estan exclosos d’aquest repositori públic per evitar filtracions de credencials. Si necessites desplegar Timelix, crea aquests fitxers manualment amb les teves credencials.



Els certificats privats (timelix.key) també estan exclosos per raons de seguretat. Aquest desplegament utilitza només HTTP.

Llicència

Aquest projecte és per a finalitats educatives dins del curs DAW 2024-2025. Contacta amb el propietari del repositori per a detalls de llicència.



Última actualització: 23 de maig de 2025
