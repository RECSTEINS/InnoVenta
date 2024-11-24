require('dotenv').config();
const express = require("express");
const http = require('http'); // Importa el módulo http
const app = express();
const routes = require('./routes/endPoints.js');

// Crear el servidor HTTP
const httpServer = http.createServer(app);  // Usar http.createServer

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Rutas
app.use('/', routes);

const PORT = process.env.PORT || 3000;  

httpServer.listen(PORT, () => {
    console.log("El servidor está en el puerto " + PORT);
});

module.exports = app;
