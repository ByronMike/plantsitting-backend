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
        userbio:
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
          reviewtitle: "Top",
          reviewtext:
            "Super prestation, le plant-sitter s'est bien occupé de mes plantes pendant toute la durée de mes vacances. ",
          createdAt: new Date(),
        },
        rib: "mon rib",
        status: "Plant-Sitter Amateur",
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

//Route d'affichage de tous les sitters

router.get("/allSitters", (req, res) => {
  Sitter.find().then((data) => {
    if (data) {
      console.log("data", data);
    } else {
      res.json({
        result: false,
        error: "Il y a aucun Plant-Sitter dans la BDD",
      });
    }
  });
});

// Route d'affichage listing sitters en fonction des param de choix.

router.post("/listsitters", async (req, res) => {
  const options = {};
  //   const options = {
  //     "skills.arrosage": {
  //       $gte: 50,
  //     },
  //   };

  if (req.body.arrosage === true) {
    options["skills.arrosage"] = {
      $gte: 50,
    };
  }
  if (req.body.entretien === true) {
    options["skills.entretien"] = {
      $gte: 50,
    };
  }
  if (req.body.traitement === true) {
    options["skills.traitement"] = {
      $gte: 50,
    };
  }
  if (req.body.autres === true) {
    options["skills.autre"] = {
      $gte: 50,
    };
  }
  // L’opérateur $match sert pour filtrer les documents d’une collection.

  const matchingSitters = await Sitter.aggregate([
    {
      $match: options,
    },
  ]);

  res.json({ result: true, matchingSitters });

  console.log("test", matchingSitters.result);
});

router.get("/sitterProfile/:token", (req, res) => {
  Sitter.findOne({ token: req.params.token }).then((sitter) => {
    if (!sitter) {
      res.json({ result: false, error: "Sitter not found" });
      return;
    } else {
      res.json({ result: true, sitter });
    }
  });
});

module.exports = router;
