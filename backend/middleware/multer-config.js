const multer = require("multer"); // Multer permet de gérer les fichiers entrants dans les requêtes HTTP

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  // .disktorage indique qu'on va stocker un fichier avec 3 paramettre
  destination: (req, file, callback) => {
    // destination indique où placer le fichier
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    // filename pour le nom (on indique d'utiliser le nom d'origine, remplacer les espaces par _ et d'avoir un timestamp + extention defini dans la const mimi types)
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
