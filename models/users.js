const mongoose = require("mongoose");

const userAddressSchema = mongoose.Schema({
  cityName: String,
  latitude: Number,
  longitude: Number,
});

const reviewSchema = mongoose.Schema({
  reviewNote: Number,
  reviewText: String,
});

const userSchema = mongoose.Schema({
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
  userZipCode: Number,
  active: Boolean,
  reviews: [reviewSchema],
  profileStatus: [String],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
