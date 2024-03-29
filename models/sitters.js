const mongoose = require("mongoose");

const useraddressSchema = mongoose.Schema({
  cityname: String,
  zipcode: String,
  latitude: Number,
  longitude: Number,
});

const skillSchema = mongoose.Schema({
  arrosage: Number,
  entretien: Number,
  traitement: Number,
  autres: Number,
});

const tarifSchema = mongoose.Schema({
  tarif1: Number,
  tarif2: Number,
  tarif3: Number,
});

const reviewSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  reviewTote: Number,
  reviewTitle: String,
  reviewText: String,
  createdAt: Date,
});

const sitterSchema = mongoose.Schema({
  company: String,
  lastname: String,
  firstname: String,
  email: String,
  password: String,
  token: String,
  phonenumber: Number,
  gender: String,
  userbio: String,
  userphoto: String,
  useraddress: [useraddressSchema],
  active: Boolean,
  equipment: String,
  skills: [skillSchema],
  tarifs: [tarifSchema],
  rib: String,
  reviews: [reviewSchema],
  status: String,
});

const Sitter = mongoose.model("sitters", sitterSchema);

module.exports = Sitter;
