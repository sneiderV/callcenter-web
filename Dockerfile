# Usa una imagen base que tenga Node.js y Angular CLI
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si lo tienes) para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación Angular
COPY . .

# Exponemos el puerto en el que Angular servirá la aplicación
EXPOSE 4200

# Comando para iniciar el servidor de desarrollo de Angular
CMD ["npm", "start"]
