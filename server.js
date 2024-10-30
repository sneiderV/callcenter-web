const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos desde el directorio "dist/browser"
app.use(express.static(path.join(__dirname, 'dist/browser')));

// Redirigir todas las rutas al index.html de Angular
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/browser/index.html'));
});

// Escuchar en el puerto proporcionado por Heroku o en el puerto 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
