const bcrypt = require("bcrypt"); // npm install --save bcrypt pour installer le package bcrypt, permettant de hasher les mots de passes
const User = require("../models/user");
const jwt = require("jsonwebtoken"); // package permettant la création de token
const cryptojs = require("crypto-js");
exports.signup = (req, res, next) => {
  /*   const emailCrypt = cryptojs
    .HmacSHA256(req.body.email, "SECRET_KEY_MAIL")
    .toString(); */
  bcrypt
    .hash(req.body.password, 10) // .hash(element à hasher, nombre de salage) permet de hasher un élément ciblé
    .then((hash) => {
      // Création de l'utilisateur
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      console.log(user);
      user
        .save() // On enregistre l'utilisateur dans la base de donnée
        .then(() => res.status(201).json({ message: "Utilisateur crée" }))
        .catch((error) => res.status(400).json(console.log(error)));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({
    // Permet de trouver un élément selon un paramètre
    email: req.body.email,
  })
    .then((user) => {
      if (user === null) {
        // Si aucune adresse mail ne correspond
        res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte" });
      } else {
        bcrypt
          .compare(req.body.password, user.password) // .compare est une fonction bcrypt qui compare le hash utilisateur avec le hash stocké
          .then((valide) => {
            if (!valide) {
              // Si cela ne correspond pas
              res
                .status(401)
                .json({ message: "Paire identifiant/mot de passe incorrecte" });
            } else {
              // Si cela correspond, renvoie un userId et un Token
              res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  // .sign permet de creer une token avec 3 argument
                  { userId: user._id }, // 1. on verifie l'userId de l'élement avec l'user._id de l'utilisateur qui fait la demande
                  process.env.SECRETTOKEN, // 2. Le code qui permet de creer un token
                  { expiresIn: "24h" } // 3. Le temps d'expiration du token
                ),
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
