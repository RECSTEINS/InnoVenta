const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se cargó ninguna imagen." });
  }

  const imageUrl = `http://localhost:7777/uploads/${req.file.filename}`;
  res.json({ url: imageUrl }); 
};

module.exports = {
  upload,
  uploadImage,
};