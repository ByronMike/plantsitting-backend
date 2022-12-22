var express = require("express");
var router = express.Router();

require("../models/connection");
const Sitter = require("../models/sitters");
const User = require("../models/users");
const Service = require("../models/services");

//Route d'inscription d'un plant-sitter
router.post("/newservice", async (req, res) => {
  const foundUser = await User.findOne({ token: req.body.usertoken });
  const foundSitter = await Sitter.findOne({ token: req.body.sittertoken });

  const newService = new Service({
    userID: mongoose.Types.ObjectId(foundUser._id),
    sitterID: mongoose.Types.ObjectId(foundSitter._id),
    equipment: req.body.equipment,
    skills: {
      arrosage: req.body.arrosage,
      entretien: req.body.arrosage,
      traitement: req.body.arrosage,
      autres: req.body.autres,
    },
    plant1: req.body.plant1,
    plant2: req.body.plant2,
    plant3: req.body.plant3,
    tarif1: req.body.tarif1,
    tarif2: req.body.tarif2,
    tarif3: req.body.tarif3,
    location: {
      cityName: req.body.cityName,
      zipCode: req.body.zipCode,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    },
    photoStart: "",
    photoEnd: "",
    date: req.body.date,
  });

  newService.save().then((newDoc) => {
    res.json({ result: true, info: newDoc });
  });
});

//Route d'affichage de tous les sitters

router.get("/allServices", (req, res) => {
  Sitter.find().then((data) => {
    if (data) {
      console.log("data", data);
    } else {
      res.json({
        result: false,
        error: "Il y a aucun services dans la BDD",
      });
    }
  });
});

module.exports = router;
