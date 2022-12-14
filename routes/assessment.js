var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const Sitter = require("../models/sitters");
const User = require("../models/users");

router.get("/aaa", function (req, res, next) {
  console.log("lmk");
  res.json({ title: "Express" });
});
router.post("/bbb", function (req, res, next) {
  console.log(req.body);
  res.json({ title: "Express" });
});

router.post("/test", async (req, res) => {
  console.log(req.body);
  const foundUser = await User.findOne({ token: req.body.userstoken });
  console.log("foundUserr", foundUser);
  // sitters.findOne({ _id: req.body.id }).then((sitters) => {
  Sitter.updateOne(
    { _id: req.body.sitterId },
    {
      $push: {
        reviews: {
          reviewNote: Number(req.body.note),
          reviewText: req.body.text,
          author: mongoose.Types.ObjectId(foundUser._id),
        },
      },
    }
  ).then((data) => {
    console.log(data);
    if (data.modifiedCount > 0) {
      res.json({ result: true });
    } else {
      res.json({ result: true, error: "Comment was not added to DB" });
    }
  });
});

module.exports = router;
