const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// npm install --save mongoose-unique-validator est un plugin

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // unique : true permet de ne pas pouvoir s'inscrire avec la même adresse mail
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); // Applique le plugin mongoose unique validator
module.exports = mongoose.model("User", userSchema);
