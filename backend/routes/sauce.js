const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// On remplace tous nos app. par router
const sauceController = require("../controllers/sauce");
const sauceLikeCOntroller = require("../controllers/like");

router.get("/", auth, sauceController.getAllSauce); //Avoir toutes les sauces
router.post("/", auth, multer, sauceController.createSauce); // Creer une sauce
router.get("/:id", auth, sauceController.getOneSauce); // Avoir une seule sauce
router.put("/:id", auth, multer, sauceController.modifySauce); // Modifier une sauce
router.delete("/:id", auth, sauceController.deleteSauce); // Supprimer une sauce
router.post("/:id/like", auth, sauceLikeCOntroller.likeSauce); // Liker une sauce

module.exports = router;
