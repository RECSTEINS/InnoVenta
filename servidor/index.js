require('dotenv').config();
const express = require("express");
const http = require('http'); // Importa el módulo http
const cors = require('cors');
const multer = require('multer'); // Importa multer
const path = require('path'); // Para manejar rutas
const routes = require('./routes/endPoints.js');

const app = express();
const httpServer = http.createServer(app);  // Crear el servidor HTTP

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para cada imagen
  },
});
const upload = multer({ storage: storage });

// Endpoint para subir imágenes
app.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No se recibió ningún archivo' });
  }

  const imageUrl = `/uploads/${req.file.filename}`; // Ruta relativa al archivo
  res.send({ url: imageUrl }); // Devuelve la URL de la imagen subida
});

// Servir imágenes estáticas desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas de tu aplicación
app.use('/', routes);

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
httpServer.listen(PORT, () => {
  console.log("El servidor está en el puerto " + PORT);
});

module.exports = app;
