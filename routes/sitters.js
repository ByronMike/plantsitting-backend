var express = require("express");
var router = express.Router();

require("../models/connection");
const Sitter = require("../models/sitters");
const { checkBody } = require("../modules/checkBody");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

//Route d'inscription d'un plant-sitter
router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["lastname", "firstname", "email", "password"])) {
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
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        phonenumber: req.body.phonenumber,
        gender: "Mr",
        userBio:
          "Depuis 2011 je suis passioné de plantes exotiques et surtout la combination avec des fleurs et plantes vivaces.",
        userphoto: "",
        useraddress: {
          cityname: "Marseille",
          zipcode: 13001,
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
          author: "639708e76f11e2a75361c714",
          reviewnote: 10,
          reviewtext: "Top",
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

module.exports = router;
