const Sauce = require("../models/sauce");

exports.createSauce = (req, res, next) => {
  console.log(req.body);
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
exports.modifySauce = (req, res, next) => {
  // permet de modifier une sauce
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // .updateOne permet de modifier un élément selectionné avec son id
    .then(() => res.status(200).json({ message: "object modifié" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  // permet de supprimer une sauce
  Sauce.deleteOne({ _id: req.params.id }) // .deleteOne supprime un élément qu'on cible avec l'id
    .then(res.status(200).json({ message: "Sauce supprimé" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  // Permet de voir une sauce avec son id ////  :id indique à express que c'est dynamique
  Sauce.findOne({ _id: req.params.id }) // .findOne permet de trouver un élément à l'aide d'un paramètre
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  // Permet de voir toutes les sauces
  Sauce.find() // .find permet de retrouver tous les éléments
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status({ error }));
};
