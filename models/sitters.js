const mongoose = require("mongoose");

const userAddressSchema = mongoose.Schema({
  cityName: String,
  zipCode: String,
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
  reviewNote: Number,
  reviewText: String,
});

const sitterSchema = mongoose.Schema({
  company: String,
  lastName: String,
  firstName: String,
  email: String,
  password: String,
  token: String,
  phoneNumber: Number,
  gender: String,
  userBio: String,
  userPhoto: String,
  userCity: String,
  userAddress: [userAddressSchema],
  active: Boolean,
  equipment: String,
  skills: [skillSchema],
  tarifs: [tarifSchema],
  rib: String,
  reviews: [reviewSchema],
  status: [Boolean],
});

const Sitter = mongoose.model("sitters", sitterSchema);

module.exports = Sitter;
