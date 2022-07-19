const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const Sauce = require("../models/sauce");
// On remplace tous nos app. par router
const sauceController = require("../controllers/sauce");

router.get("/:id", /* auth, */ sauceController.getOneSauce);
router.post("/", /* auth, */ sauceController.createSauce);

router.put("/:id", /* auth, */ multer, sauceController.modifySauce);

router.get("/", /* auth, */ sauceController.getAllSauce);

router.delete("/:id", /* auth, */ sauceController.deleteSauce);

module.exports = router;
