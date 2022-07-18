const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const app = express();
mongoose
  .connect(
    "mongodb+srv://roger:roger@cluster0.gznafw4.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("./api/sauces", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({ message: "objet créé" });
});
app.use("./api/sauces", (req, res, next) => {
  const sauce = [
    {
      userId: "ztaetaetae",
      name: "Sauce 1",
      manufacturer: "testest",
      description: "Une sauce de ouf malade",
      mainPepper: "",
      imageUrl: "",
      heat: 5,
      likes: 2,
      dislikes: 5,
      usersLiked: [userId],
      userDisliked: [userId],
    },
  ];
});

module.exports = app;
