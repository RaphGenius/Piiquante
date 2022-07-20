const express = require("express");
const mongoose = require("mongoose");
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const path = require("path");
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

app.use("/api/auth", userRoutes); // L'url de la source est /api/auth et la suite se situe dans userRoutes
app.use("/api/sauces", sauceRoutes); // L'url de la source est /api/sauce et la suite se situe dans sauceRoutes
app.use("/image", express.static(path.join(__dirname, "image")));

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
