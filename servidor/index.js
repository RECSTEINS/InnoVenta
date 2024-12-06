require('dotenv').config();
const express = require("express");
const http = require('http'); 
const cors = require('cors');
const multer = require('multer');
const path = require('path'); 
const routes = require('./routes/endPoints.js');

const app = express();
const httpServer = http.createServer(app);  


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage: storage });


app.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No se recibió ningún archivo' });
  }

  const imageUrl = `/uploads/${req.file.filename}`; 
  res.send({ url: imageUrl });
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/', routes);


const PORT = process.env.PORT || 3000;


httpServer.listen(PORT, () => {
  console.log("El servidor está en el puerto " + PORT);
});

module.exports = app;