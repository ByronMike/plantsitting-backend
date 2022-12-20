const mongoose = require("mongoose");

const vintedSchema = mongoose.Schema({
  plantID: { type: mongoose.Schema.Types.ObjectId, ref: "vinted" },
  name: String,
  photo: String,
  bio: String,
  price: Number,
});

const Vinted = mongoose.model("vinteds", vintedSchema);

module.exports = Vinted;
