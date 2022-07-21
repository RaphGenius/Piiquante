const sauce = require("../models/sauce");

exports.likeSauce = (req, res, next) => {
  console.log("je suis dans le controlleur lik,");
  sauce
    .findOne({ _id: req.params.id })
    .then((sauce) => {
      console.log(sauce.likes);
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        console.log("cest vrai!");
        sauce
          .updateOne({
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
          })
          .then(() =>
            res.status(201).json({ message: "Vous avez liker la sauce!" })
          )
          .catch((error) => res.status(400).json({ error }));
      } else {
        console.log("cest faux!");
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
