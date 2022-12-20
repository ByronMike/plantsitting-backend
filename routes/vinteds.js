var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const Vinted = require("../models/vinteds");

router.post("/plant", function (req, res) {
  const newPlant = new Vinted({
    name: req.body.name,
    photo: req.body.photo,
    bio: req.body.bio,
    price: req.body.price,
  });
  newPlant.save().then((newDoc) => {
    res.json({ result: true });
  });
});

router.get("/plant/:id", function (req, res) {
  Vinted.findById(req.params.id).then((plant) => {
    if (plant === null) {
      res.json({ esult: false, description: "pas de plant" });
    } else {
    }
    res.json({ result: true, description: plant });
  });
});

router.get("/plant", function (req, res) {
  Vinted.find().then((plant) => {
    if (plant === null) {
      res.json({ esult: false, description: "pas de plant" });
    } else {
    }
    res.json({ result: true, description: plant });
  });
});

module.exports = router;
