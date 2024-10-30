# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Elimina node_modules y package-lock.json para asegurarnos de una instalación limpia
RUN rm -rf node_modules package-lock.json && npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila la aplicación Angular para producción
RUN npm run build --configuration=production

# Etapa 2: Servir la aplicación con un servidor Node.js (Express)
FROM node:18 AS production

# Establece el directorio de trabajo
WORKDIR /app

# Instala solo las dependencias necesarias para producción
COPY package*.json ./
RUN npm install --only=production

# Copia los archivos construidos desde la etapa anterior
COPY --from=build /app/dist/abcall-web /app/dist

# Copia el archivo de servidor (server.js)
COPY server.js .

# Exponer el puerto 8080 (Heroku configurará el puerto en producción)
EXPOSE 8080

# Comando para iniciar el servidor de producción
CMD ["node", "server.js"]
