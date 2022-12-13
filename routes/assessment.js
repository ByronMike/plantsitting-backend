var express = require("express");
var router = express.Router();

const User = require("../models/users");
const Tweet = require("../models/tweets");
const { checkBody } = require("../modules/checkBody");

router.post("/", (req, res) => {
  if (!checkBody(req.body, ["token", "content"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ token: req.body.token }).then((user) => {
    if (user === null) {
      res.json({ result: false, error: "User not found" });
      return;
    }

    const newTweet = new Tweet({
      author: user._id,
      content: req.body.content,
      createdAt: new Date(),
    });

    newTweet.save().then((newDoc) => {
      res.json({ result: true, tweet: newDoc });
    });
  });
});
