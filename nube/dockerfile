FROM postgres:14

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=biblioteca2

# Copiar el archivo init.sql desde la carpeta init-data al contenedor
COPY scripts/init.sql /docker-entrypoint-initdb.d/

