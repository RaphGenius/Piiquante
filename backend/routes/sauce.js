const express = require("express");
const router = express.Router();
/* const Sauce = require("../models/sauce"); */
// On remplace tous nos app. par router
const sauceController = require("../controllers/sauce");

router.post("/", sauceController.createSauce);

router.put("/:id", sauceController.modifySauce);

router.get("/:id", sauceController.getOneSauce);

router.get("/", sauceController.getAllSauce);

router.delete("/:id", sauceController.deleteSauce);

module.exports = router;
