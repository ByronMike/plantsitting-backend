var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

//route d'inscription
router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["lastName", "firstName", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // vérifier si l'utilisateur n'a pas déjà été enregistré
  User.findOne({
    email: { $regex: new RegExp(req.body.email, "i") },
  }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        lastName: req.body.lastname,
        firstName: req.body.firstName,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        phoneNumber: 0,
        gender: "",
        userBio: "",
        userPhoto: "",
        userAddress: {
          cityName: "",
          zipCode: "",
          latitude: 0,
          longitude: 0,
        },
        active: true,
        reviews: {
          reviewNote: 10,
          reviewText: "",
        },
        profileStatus: [""],
      });

      newUser.save().then((newDoc) => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      //L'utilisateur existe déjà dans la base de données
      res.json({ result: false, error: "User already exists" });
    }
  });
});

//route de connexion
router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({
    email: { $regex: new RegExp(req.body.email, "i") },
  }).then((data) => {
    if (bcrypt.compareSync(req.body.password, data.password)) {
      res.json({
        result: true,
        token: data.token,
        email: data.email,
      });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

module.exports = router;
