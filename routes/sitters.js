var express = require("express");
var router = express.Router();

require("../models/connection");
const Sitter = require("../models/sitters");
const { checkBody } = require("../modules/checkBody");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

//route d'inscription d'un plant-sitter
router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["lastName", "firstName", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // vérifier si l'utilisateur n'a pas déjà été enregistré
  Sitter.findOne({
    email: { $regex: new RegExp(req.body.email, "i") },
  }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newSitter = new Sitter({
        company: "myCompanyName",
        lastName: req.body.lastname,
        firstName: req.body.firstname,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        phoneNumber: req.body.phonenumber,
        gender: "Mr",
        userBio:
          "Depuis 2011 je suis passioné de plantes exotiques et surtout la combination avec des fleurs et plantes vivaces.",
        userPhoto: "",
        userAddress: {
          cityName: "Marseille",
          zipCode: 13001,
          latitude: 45.751036,
          longitude: 4.840246,
        },
        active: true,
        equipement: "semi-amateur",
        skills: {
          arrosage: 95,
          entretien: 80,
          traitement: 60,
          autres: 30,
        },
        tarifs: {
          tarif1: 8,
          tarif2: 14,
          tarif3: 18,
        },
        reviews: {
          reviewNote: 10,
          reviewText: "Top",
        },
        rib: "mon rib",
        status: "Plant-Sitter professionnel",
      });

      newSitter.save().then((newDoc) => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      //L'utilisateur existe déjà dans la base de données
      res.json({ result: false, error: "User already exists" });
    }
  });
});

// //route de connexion
// router.post("/signin", (req, res) => {
//   if (!checkBody(req.body, ["email", "password"])) {
//     res.json({ result: false, error: "Missing or empty fields" });
//     return;
//   }

//   User.findOne({
//     email: { $regex: new RegExp(req.body.email, "i") },
//   }).then((data) => {
//     if (bcrypt.compareSync(req.body.password, data.password)) {
//       res.json({
//         result: true,
//         token: data.token,
//         email: data.email,
//       });
//     } else {
//       res.json({ result: false, error: "User not found or wrong password" });
//     }
//   });
// });

module.exports = router;
