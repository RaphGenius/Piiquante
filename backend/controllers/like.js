const sauce = require("../models/sauce");

exports.likeSauce = (req, res, next) => {
  sauce
    .findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        console.log("J'aime la sauce!");
        sauce
          .updateOne({
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
          })
          .then(() =>
            res.status(201).json({ message: "Vous avez liker la sauce!" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
      if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        console.log("Je n'aime plus la sauce");
        sauce
          .updateOne({
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
          })
          .then(() =>
            res.status(201).json({ message: "Vous n'aimez plus la sauce ! :(" })
          )
          .catch((error) => res.status(400).json({ message: "ca marche pas" }));
      }
      if (
        !sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
        console.log("J'aime pas la sauce!");
        sauce
          .updateOne({
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
          })
          .then(() =>
            res.status(201).json({ message: "Vous avez disliker la sauce!" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
      if (
        sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        console.log("J'enleve mon dislike");
        sauce
          .updateOne({
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
          })
          .then(() =>
            res.status(201).json({ message: "Finalement j'enlève mon dislike" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
