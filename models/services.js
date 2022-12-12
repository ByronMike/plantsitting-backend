const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
  arrosage: Number,
  entretien: Number,
  traitement: Number,
  autres: Number,
});

const locationSchema = mongoose.Schema({
  cityName: String,
  zipCode: String,
  latitude: Number,
  longitude: Number,
});

const serviceSchema = mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  sitterID: { type: mongoose.Schema.Types.ObjectId, ref: "sitters" },
  equipment: String,
  skills: [skillSchema],
  plant1: Boolean,
  plant2: Boolean,
  plant3: Boolean,
  tarif1: Number,
  tarif2: Number,
  tarif3: Number,
  location: [locationSchema],
  photoStart: String,
  photoEnd: String,
  date: Date,
});

const Service = mongoose.model("services", serviceSchema);

module.exports = Service;
